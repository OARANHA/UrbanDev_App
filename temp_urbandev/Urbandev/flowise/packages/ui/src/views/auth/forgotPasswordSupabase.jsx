import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

// material-ui
import { Stack, useTheme, Typography, Box, Alert, Button, Card, CardContent } from '@mui/material'
import { IconExclamationCircle, IconCircleCheck, IconArrowLeft } from '@tabler/icons-react'
import { LoadingButton } from '@mui/lab'

// project imports
import MainCard from '@/ui-component/cards/MainCard'
import { Input } from '@/ui-component/input/Input'

// Hooks
import useApi from '@/hooks/useApi'

// API
import supabaseApi from '@/api/supabase'
import accountApi from '@/api/account.api'

// utils
import useNotifier from '@/utils/useNotifier'

// ==============================|| Forgot Password Supabase ||============================== //

const ForgotPasswordSchema = z.object({
    email: z.string().min(1, 'Email é obrigatório').email('Endereço de email inválido')
})

const ForgotPasswordSupabasePage = () => {
    const theme = useTheme()
    useNotifier()
    const navigate = useNavigate()

    const emailInput = {
        label: 'Email',
        name: 'email',
        type: 'email',
        placeholder: 'seu.email@empresa.com'
    }

    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [authError, setAuthError] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const supabaseResetPasswordApi = useApi(supabaseApi.supabaseResetPassword)
    const originalResetPasswordApi = useApi(accountApi.forgotPassword)

    const handleResetPassword = async (event) => {
        event.preventDefault()
        
        const result = ForgotPasswordSchema.safeParse({ email })
        
        if (!result.success) {
            setAuthError(result.error.errors[0].message)
            return
        }

        setLoading(true)
        setAuthError('')
        setSuccessMessage('')

        try {
            // Try Supabase reset password first
            await supabaseResetPasswordApi.request({ email })
        } catch (error) {
            // Fallback to original reset password
            try {
                await originalResetPasswordApi.request({ email })
            } catch (fallbackError) {
                setAuthError('Erro ao enviar email de redefinição de senha. Tente novamente.')
                setLoading(false)
                return
            }
        }
    }

    useEffect(() => {
        if (supabaseResetPasswordApi.data) {
            setLoading(false)
            setSuccessMessage('Email de redefinição de senha enviado com sucesso! Verifique sua caixa de entrada.')
            setEmail('')
        }
    }, [supabaseResetPasswordApi.data])

    useEffect(() => {
        if (originalResetPasswordApi.data) {
            setLoading(false)
            setSuccessMessage('Email de redefinição de senha enviado com sucesso! Verifique sua caixa de entrada.')
            setEmail('')
        }
    }, [originalResetPasswordApi.data])

    useEffect(() => {
        if (supabaseResetPasswordApi.error) {
            setLoading(false)
            setAuthError(supabaseResetPasswordApi.error.response?.data?.error || 'Erro ao enviar email de redefinição de senha.')
        }
    }, [supabaseResetPasswordApi.error])

    useEffect(() => {
        if (originalResetPasswordApi.error) {
            setLoading(false)
            setAuthError(originalResetPasswordApi.error.response?.data?.message || 'Erro ao enviar email de redefinição de senha.')
        }
    }, [originalResetPasswordApi.error])

    return (
        <>
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}22 0%, ${theme.palette.secondary.main}22 100%)`,
                    p: 2
                }}
            >
                <Card sx={{ maxWidth: 500, width: '100%', borderRadius: 3, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                    <CardContent sx={{ p: 4 }}>
                        <Stack sx={{ gap: 3 }}>
                            {/* Header */}
                            <Stack sx={{ alignItems: 'center', textAlign: 'center', gap: 2 }}>
                                <Box
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: '50%',
                                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontSize: 32,
                                        fontWeight: 'bold'
                                    }}
                                >
                                    UD
                                </Box>
                                <Stack sx={{ gap: 1 }}>
                                    <Typography variant='h2' sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                                        UrbanDev
                                    </Typography>
                                    <Typography variant='h4' sx={{ fontWeight: 600 }}>
                                        Esqueceu sua senha?
                                    </Typography>
                                    <Typography variant='body1' sx={{ color: theme.palette.text.secondary }}>
                                        Não se preocupe! Enviaremos um link para redefinir sua senha.
                                    </Typography>
                                </Stack>
                            </Stack>

                            {/* Messages */}
                            {authError && (
                                <Alert icon={<IconExclamationCircle />} variant='filled' severity='error'>
                                    {authError}
                                </Alert>
                            )}
                            
                            {successMessage && (
                                <Alert icon={<IconCircleCheck />} variant='filled' severity='success'>
                                    {successMessage}
                                </Alert>
                            )}

                            {/* Form */}
                            {!successMessage && (
                                <form onSubmit={handleResetPassword}>
                                    <Stack sx={{ width: '100%', flexDirection: 'column', alignItems: 'left', justifyContent: 'center', gap: 3 }}>
                                        <Box sx={{ p: 0 }}>
                                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                <Typography sx={{ fontWeight: 600, mb: 1 }}>
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
                                            <Typography variant='body2' sx={{ color: theme.palette.grey[600], mt: 1 }}>
                                                Digite o email associado à sua conta e enviaremos um link para redefinir sua senha.
                                            </Typography>
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
                                            Enviar link de redefinição
                                        </LoadingButton>
                                    </Stack>
                                </form>
                            )}

                            {/* Back to Login */}
                            <Stack sx={{ alignItems: 'center', gap: 1 }}>
                                <Button
                                    variant='text'
                                    onClick={() => navigate('/signin')}
                                    startIcon={<IconArrowLeft />}
                                    sx={{
                                        color: theme.palette.primary.main,
                                        fontWeight: 500,
                                        textTransform: 'none'
                                    }}
                                >
                                    Voltar para o login
                                </Button>
                            </Stack>

                            {/* Additional Help */}
                            <Stack sx={{ alignItems: 'center', gap: 1 }}>
                                <Typography variant='body2' sx={{ color: theme.palette.text.secondary, textAlign: 'center' }}>
                                    Não recebeu o email? Verifique sua pasta de spam ou{' '}
                                    <Button
                                        variant='text'
                                        onClick={handleResetPassword}
                                        disabled={loading}
                                        sx={{
                                            color: theme.palette.primary.main,
                                            fontWeight: 500,
                                            p: 0,
                                            minWidth: 'auto',
                                            textTransform: 'none'
                                        }}
                                    >
                                        tente novamente
                                    </Button>
                                </Typography>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
            </Box>
        </>
    )
}

export default ForgotPasswordSupabasePage