import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { z } from 'zod'

// material-ui
import { Alert, Box, Button, Divider, Icon, List, ListItemText, OutlinedInput, Stack, Typography, useTheme, IconButton } from '@mui/material'
import { IconCircleCheck, IconExclamationCircle, IconEye, IconEyeOff } from '@tabler/icons-react'

// project imports
import { StyledButton } from '@/ui-component/button/StyledButton'
import { Input } from '@/ui-component/input/Input'
import { BackdropLoader } from '@/ui-component/loading/BackdropLoader'

// API
import accountApi from '@/api/account.api'
import loginMethodApi from '@/api/loginmethod'
import ssoApi from '@/api/sso'
import supabaseApi from '@/api/supabase'

// Hooks
import useApi from '@/hooks/useApi'
import { useConfig } from '@/store/context/ConfigContext'

// utils
import useNotifier from '@/utils/useNotifier'
import { passwordSchema } from '@/utils/validation'

// Icons
import Auth0SSOLoginIcon from '@/assets/images/auth0.svg'
import GithubSSOLoginIcon from '@/assets/images/github.svg'
import GoogleSSOLoginIcon from '@/assets/images/google.svg'
import AzureSSOLoginIcon from '@/assets/images/microsoft-azure.svg'
import { store } from '@/store'
import { loginSuccess } from '@/store/reducers/authSlice'

// ==============================|| Supabase Register ||============================== //

const RegisterSupabaseSchema = z
    .object({
        username: z.string().min(1, 'Nome é obrigatório'),
        email: z.string().min(1, 'Email é obrigatório').email('Endereço de email inválido'),
        password: passwordSchema,
        confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória')
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não coincidem",
        path: ['confirmPassword']
    })

const RegisterSupabasePage = () => {
    const theme = useTheme()
    useNotifier()
    const { isEnterpriseLicensed, isCloud, isOpenSource } = useConfig()

    const usernameInput = {
        label: 'Nome completo',
        name: 'username',
        type: 'text',
        placeholder: 'João Silva'
    }

    const passwordInput = {
        label: 'Senha',
        name: 'password',
        type: 'password',
        placeholder: '********'
    }

    const confirmPasswordInput = {
        label: 'Confirmar senha',
        name: 'confirmPassword',
        type: 'password',
        placeholder: '********'
    }

    const emailInput = {
        label: 'Email',
        name: 'email',
        type: 'email',
        placeholder: 'usuario@empresa.com'
    }

    const [params] = useSearchParams()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [username, setUsername] = useState('')
    const [configuredSsoProviders, setConfiguredSsoProviders] = useState([])
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [loading, setLoading] = useState(false)
    const [authError, setAuthError] = useState('')
    const [successMsg, setSuccessMsg] = useState(undefined)

    const registerApi = useApi(accountApi.registerAccount)
    const supabaseRegisterApi = useApi(supabaseApi.supabaseSignUp)
    const ssoLoginApi = useApi(ssoApi.ssoLogin)
    const getDefaultProvidersApi = useApi(loginMethodApi.getDefaultLoginMethods)
    const navigate = useNavigate()

    const register = async (event) => {
        event.preventDefault()
        
        const result = RegisterSupabaseSchema.safeParse({
            username,
            email,
            password,
            confirmPassword
        })
        
        if (result.success) {
            setLoading(true)
            try {
                // Try Supabase registration first
                const body = {
                    email,
                    password,
                    name: username
                }
                await supabaseRegisterApi.request(body)
            } catch (error) {
                // Fallback to original registration if Supabase fails
                if (isEnterpriseLicensed || isCloud) {
                    const formData = new FormData(event.target)
                    const referral = formData.get('referral')
                    
                    const body = {
                        user: {
                            name: username,
                            email,
                            credential: password
                        }
                    }
                    if (referral) {
                        body.user.referral = referral
                    }
                    await registerApi.request(body)
                } else {
                    throw error
                }
            }
        } else {
            const errorMessages = result.error.errors.map((err) => err.message)
            setAuthError(errorMessages.join(', '))
        }
    }

    const signInWithSupabaseOAuth = (provider) => {
        window.location.href = `/api/v1/supabase-auth/oauth/${provider}`
    }

    const signInWithSSO = (ssoProvider) => {
        window.location.href = `/api/v1/${ssoProvider}/login`
    }

    useEffect(() => {
        if (registerApi.error) {
            if (isEnterpriseLicensed) {
                setAuthError(
                    `Erro ao registrar usuário. Entre em contato com o administrador. (${registerApi.error?.response?.data?.message})`
                )
            } else if (isCloud) {
                setAuthError(`Erro ao registrar usuário. Tente novamente.`)
            }
            setLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [registerApi.error])

    useEffect(() => {
        if (supabaseRegisterApi.error) {
            setAuthError(supabaseRegisterApi.error.response?.data?.error || 'Erro ao registrar usuário')
            setLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [supabaseRegisterApi.error])

    useEffect(() => {
        if (!isOpenSource) {
            getDefaultProvidersApi.request()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (ssoLoginApi.data) {
            store.dispatch(loginSuccess(ssoLoginApi.data))
            navigate(location.state?.path || '/chatflows')
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ssoLoginApi.data])

    useEffect(() => {
        if (ssoLoginApi.error) {
            if (ssoLoginApi.error?.response?.status === 401 && ssoLoginApi.error?.response?.data.redirectUrl) {
                window.location.href = ssoLoginApi.error.response.data.redirectUrl
            } else {
                setAuthError(ssoLoginApi.error.message)
            }
        }
    }, [ssoLoginApi.error])

    useEffect(() => {
        if (getDefaultProvidersApi.data && getDefaultProvidersApi.data.providers) {
            //data is an array of objects, store only the provider attribute
            setConfiguredSsoProviders(getDefaultProvidersApi.data.providers.map((provider) => provider))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getDefaultProvidersApi.data])

    useEffect(() => {
        if (registerApi.data) {
            setLoading(false)
            setAuthError(undefined)
            setConfirmPassword('')
            setPassword('')
            setUsername('')
            setEmail('')
            if (isEnterpriseLicensed) {
                setSuccessMsg('Registro bem-sucedido. Você será redirecionado para a página de login em breve.')
            } else if (isCloud) {
                setSuccessMsg('Para completar seu registro, clique no link de verificação que enviamos para seu email.')
            }
            setTimeout(() => {
                navigate('/signin')
            }, 3000)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [registerApi.data])

    useEffect(() => {
        if (supabaseRegisterApi.data) {
            setLoading(false)
            setAuthError(undefined)
            setConfirmPassword('')
            setPassword('')
            setUsername('')
            setEmail('')
            setSuccessMsg('Registro bem-sucedido! Verifique seu email para confirmar sua conta.')
            setTimeout(() => {
                navigate('/signin')
            }, 3000)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [supabaseRegisterApi.data])

    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    maxHeight: '100vh',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '24px'
                }}
            >
                <Stack flexDirection='column' sx={{ width: '480px', gap: 3 }}>
                    {authError && (
                        <Alert icon={<IconExclamationCircle />} variant='filled' severity='error'>
                            {authError.split(', ').length > 0 ? (
                                <List dense sx={{ py: 0 }}>
                                    {authError.split(', ').map((error, index) => (
                                        <ListItemText key={index} primary={error} primaryTypographyProps={{ color: '#fff !important' }} />
                                    ))}
                                </List>
                            ) : (
                                authError
                            )}
                        </Alert>
                    )}
                    {successMsg && (
                        <Alert icon={<IconCircleCheck />} variant='filled' severity='success'>
                            {successMsg}
                        </Alert>
                    )}
                    <Stack sx={{ gap: 1 }}>
                        <Typography variant='h1' sx={{ textAlign: 'center' }}>
                            Criar Conta
                        </Typography>
                        <Typography variant='body2' sx={{ color: theme.palette.grey[600], textAlign: 'center' }}>
                            Junte-se à UrbanDev com autenticação segura via Supabase
                        </Typography>
                        <Typography variant='body2' sx={{ color: theme.palette.text.secondary, textAlign: 'center' }}>
                            Já tem uma conta?{' '}
                            <Link style={{ color: theme.palette.primary.main, fontWeight: 600 }} to='/signin'>
                                Faça login
                            </Link>
                        </Typography>
                    </Stack>
                    
                    <form onSubmit={register} data-rewardful>
                        <Stack sx={{ width: '100%', flexDirection: 'column', alignItems: 'left', justifyContent: 'center', gap: 2 }}>
                            <Box>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Typography>
                                        Nome completo<span style={{ color: 'red' }}>&nbsp;*</span>
                                    </Typography>
                                    <div style={{ flexGrow: 1 }}></div>
                                </div>
                                <Input
                                    inputParam={usernameInput}
                                    onChange={(newValue) => setUsername(newValue)}
                                    value={username}
                                    showDialog={false}
                                />
                                <Typography variant='caption'>
                                    <i>Usado para exibição apenas.</i>
                                </Typography>
                            </Box>
                            
                            <Box>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Typography>
                                        Email<span style={{ color: 'red' }}>&nbsp;*</span>
                                    </Typography>
                                    <div style={{ flexGrow: 1 }}></div>
                                </div>
                                <Input
                                    inputParam={emailInput}
                                    onChange={(newValue) => setEmail(newValue)}
                                    value={email}
                                    showDialog={false}
                                />
                                <Typography variant='caption'>
                                    <i>Use um endereço de email válido. Será usado como login.</i>
                                </Typography>
                            </Box>
                            
                            <Box>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Typography>
                                        Senha<span style={{ color: 'red' }}>&nbsp;*</span>
                                    </Typography>
                                    <div style={{ flexGrow: 1 }}></div>
                                </div>
                                <Input 
                                    inputParam={{
                                        ...passwordInput,
                                        type: showPassword ? 'text' : 'password',
                                        endAdornment: (
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge='end'
                                            >
                                                {showPassword ? <IconEyeOff /> : <IconEye />}
                                            </IconButton>
                                        )
                                    }} 
                                    onChange={(newValue) => setPassword(newValue)} 
                                    value={password} 
                                />
                                <Typography variant='caption'>
                                    <i>
                                        A senha deve ter pelo menos 8 caracteres e conter pelo menos uma letra minúscula, uma letra maiúscula,
                                        um dígito e um caractere especial.
                                    </i>
                                </Typography>
                            </Box>
                            
                            <Box>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Typography>
                                        Confirmar senha<span style={{ color: 'red' }}>&nbsp;*</span>
                                    </Typography>
                                    <div style={{ flexGrow: 1 }}></div>
                                </div>
                                <Input 
                                    inputParam={{
                                        ...confirmPasswordInput,
                                        type: showConfirmPassword ? 'text' : 'password',
                                        endAdornment: (
                                            <IconButton
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                edge='end'
                                            >
                                                {showConfirmPassword ? <IconEyeOff /> : <IconEye />}
                                            </IconButton>
                                        )
                                    }} 
                                    onChange={(newValue) => setConfirmPassword(newValue)} 
                                    value={confirmPassword} 
                                />
                            </Box>

                            <LoadingButton
                                loading={loading}
                                variant='contained'
                                sx={{
                                    borderRadius: 2,
                                    height: 48,
                                    textTransform: 'none',
                                    fontSize: 16,
                                    fontWeight: 600,
                                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                    '&:hover': {
                                        background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`
                                    }
                                }}
                                type='submit'
                                fullWidth
                            >
                                Criar conta com Supabase
                            </LoadingButton>
                        </Stack>
                    </form>

                    {/* OAuth Options with Supabase */}
                    <Stack sx={{ alignItems: 'center', gap: 2 }}>
                        <Divider sx={{ width: '100%', my: 2 }}>
                            <Typography variant='body2' sx={{ color: theme.palette.text.secondary }}>
                                ou cadastre-se com
                            </Typography>
                        </Divider>
                        
                        <Stack sx={{ width: '100%', gap: 2 }}>
                            <Button
                                variant='outlined'
                                sx={{
                                    borderRadius: 2,
                                    height: 48,
                                    textTransform: 'none',
                                    fontSize: 16,
                                    fontWeight: 500,
                                    borderColor: theme.palette.divider,
                                    '&:hover': {
                                        borderColor: theme.palette.primary.main,
                                        backgroundColor: theme.palette.primary.main + '10'
                                    }
                                }}
                                onClick={() => signInWithSupabaseOAuth('google')}
                                startIcon={
                                    <Icon>
                                        <img src={GoogleSSOLoginIcon} alt={'Google'} width={20} height={20} />
                                    </Icon>
                                }
                            >
                                Continuar com Google (Supabase)
                            </Button>
                            
                            <Button
                                variant='outlined'
                                sx={{
                                    borderRadius: 2,
                                    height: 48,
                                    textTransform: 'none',
                                    fontSize: 16,
                                    fontWeight: 500,
                                    borderColor: theme.palette.divider,
                                    '&:hover': {
                                        borderColor: theme.palette.primary.main,
                                        backgroundColor: theme.palette.primary.main + '10'
                                    }
                                }}
                                onClick={() => signInWithSupabaseOAuth('github')}
                                startIcon={
                                    <Icon>
                                        <img src={GithubSSOLoginIcon} alt={'GitHub'} width={20} height={20} />
                                    </Icon>
                                }
                            >
                                Continuar com GitHub (Supabase)
                            </Button>
                        </Stack>
                    </Stack>

                    {/* Traditional SSO Options */}
                    {configuredSsoProviders && configuredSsoProviders.length > 0 && (
                        <Stack sx={{ alignItems: 'center', gap: 2 }}>
                            <Divider sx={{ width: '100%', my: 2 }}>
                                <Typography variant='body2' sx={{ color: theme.palette.text.secondary }}>
                                    ou use SSO tradicional
                                </Typography>
                            </Divider>
                            
                            <Stack sx={{ width: '100%', gap: 2 }}>
                                {configuredSsoProviders.map(
                                    (ssoProvider) =>
                                        ssoProvider === 'google' && (
                                            <Button
                                                key={ssoProvider}
                                                variant='outlined'
                                                sx={{
                                                    borderRadius: 2,
                                                    height: 48,
                                                    textTransform: 'none',
                                                    fontSize: 16,
                                                    fontWeight: 500,
                                                    borderColor: theme.palette.divider,
                                                    '&:hover': {
                                                        borderColor: theme.palette.primary.main,
                                                        backgroundColor: theme.palette.primary.main + '10'
                                                    }
                                                }}
                                                onClick={() => signInWithSSO(ssoProvider)}
                                                startIcon={
                                                    <Icon>
                                                        <img src={GoogleSSOLoginIcon} alt={'GoogleSSO'} width={20} height={20} />
                                                    </Icon>
                                                }
                                            >
                                                Google (SSO)
                                            </Button>
                                        )
                                )}
                                {configuredSsoProviders.map(
                                    (ssoProvider) =>
                                        ssoProvider === 'github' && (
                                            <Button
                                                key={ssoProvider}
                                                variant='outlined'
                                                sx={{
                                                    borderRadius: 2,
                                                    height: 48,
                                                    textTransform: 'none',
                                                    fontSize: 16,
                                                    fontWeight: 500,
                                                    borderColor: theme.palette.divider,
                                                    '&:hover': {
                                                        borderColor: theme.palette.primary.main,
                                                        backgroundColor: theme.palette.primary.main + '10'
                                                    }
                                                }}
                                                onClick={() => signInWithSSO(ssoProvider)}
                                                startIcon={
                                                    <Icon>
                                                        <img src={GithubSSOLoginIcon} alt={'GithubSSO'} width={20} height={20} />
                                                    </Icon>
                                                }
                                            >
                                                GitHub (SSO)
                                            </Button>
                                        )
                                )}
                                {configuredSsoProviders.map(
                                    (ssoProvider) =>
                                        ssoProvider === 'azure' && (
                                            <Button
                                                key={ssoProvider}
                                                variant='outlined'
                                                sx={{
                                                    borderRadius: 2,
                                                    height: 48,
                                                    textTransform: 'none',
                                                    fontSize: 16,
                                                    fontWeight: 500,
                                                    borderColor: theme.palette.divider,
                                                    '&:hover': {
                                                        borderColor: theme.palette.primary.main,
                                                        backgroundColor: theme.palette.primary.main + '10'
                                                    }
                                                }}
                                                onClick={() => signInWithSSO(ssoProvider)}
                                                startIcon={
                                                    <Icon>
                                                        <img src={AzureSSOLoginIcon} alt={'AzureSSO'} width={20} height={20} />
                                                    </Icon>
                                                }
                                            >
                                                Microsoft Azure (SSO)
                                            </Button>
                                        )
                                )}
                                {configuredSsoProviders.map(
                                    (ssoProvider) =>
                                        ssoProvider === 'auth0' && (
                                            <Button
                                                key={ssoProvider}
                                                variant='outlined'
                                                sx={{
                                                    borderRadius: 2,
                                                    height: 48,
                                                    textTransform: 'none',
                                                    fontSize: 16,
                                                    fontWeight: 500,
                                                    borderColor: theme.palette.divider,
                                                    '&:hover': {
                                                        borderColor: theme.palette.primary.main,
                                                        backgroundColor: theme.palette.primary.main + '10'
                                                    }
                                                }}
                                                onClick={() => signInWithSSO(ssoProvider)}
                                                startIcon={
                                                    <Icon>
                                                        <img src={Auth0SSOLoginIcon} alt={'Auth0SSO'} width={20} height={20} />
                                                    </Icon>
                                                }
                                            >
                                                Auth0 (SSO)
                                            </Button>
                                        )
                                )}
                            </Stack>
                        </Stack>
                    )}
                </Stack>
            </Box>
        </>
    )
}

export default RegisterSupabasePage