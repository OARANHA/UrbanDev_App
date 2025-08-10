import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// material-ui
import { 
    Box, 
    Card, 
    CardContent, 
    Stack, 
    Typography, 
    Button, 
    useTheme, 
    Divider,
    Alert,
    IconButton
} from '@mui/material'
import { IconArrowLeft, IconShield, IconDatabase, IconBrandGoogle, IconBrandGithub } from '@tabler/icons-react'

// project imports
import MainCard from '@/ui-component/cards/MainCard'

// ==============================|| Auth Method Selector ||============================== //

const AuthMethodSelector = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    const [selectedMethod, setSelectedMethod] = useState(null)

    const authMethods = [
        {
            id: 'supabase',
            title: 'Autenticação Supabase',
            description: 'Segurança moderna com OAuth 2.0, gerenciamento de sessões avançado e suporte a múltiplos provedores',
            icon: <IconShield size={48} color={theme.palette.primary.main} />,
            features: [
                'Login com Google, GitHub e Microsoft',
                'Verificação de email integrada',
                'Recuperação de senha segura',
                'Sessões persistentes',
                'Proteção contra CSRF'
            ],
            primaryColor: theme.palette.primary.main,
            secondaryColor: theme.palette.secondary.main
        },
        {
            id: 'traditional',
            title: 'Autenticação Tradicional',
            description: 'Sistema de autenticação clássico com suporte a SSO empresarial e gerenciamento local',
            icon: <IconDatabase size={48} color={theme.palette.info.main} />,
            features: [
                'SSO com Auth0, Azure, Google, GitHub',
                'Gerenciamento de usuários local',
                'Integração com sistemas existentes',
                'Controle de acesso granular',
                'Audit logging completo'
            ],
            primaryColor: theme.palette.info.main,
            secondaryColor: theme.palette.success.main
        }
    ]

    const handleMethodSelect = (methodId) => {
        setSelectedMethod(methodId)
        
        // Navigate to appropriate auth page after a short delay
        setTimeout(() => {
            if (methodId === 'supabase') {
                navigate('/signin-supabase')
            } else {
                navigate('/signin')
            }
        }, 300)
    }

    const handleBack = () => {
        setSelectedMethod(null)
    }

    return (
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
            <Card sx={{ maxWidth: 800, width: '100%', borderRadius: 3, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                <CardContent sx={{ p: selectedMethod ? 4 : 6 }}>
                    <Stack sx={{ gap: 4 }}>
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
                                    Escolha seu método de autenticação
                                </Typography>
                                <Typography variant='body1' sx={{ color: theme.palette.text.secondary }}>
                                    Selecione o método de autenticação que melhor atende às suas necessidades
                                </Typography>
                            </Stack>
                        </Stack>

                        {/* Back Button (when method is selected) */}
                        {selectedMethod && (
                            <Button
                                variant='text'
                                onClick={handleBack}
                                startIcon={<IconArrowLeft />}
                                sx={{
                                    alignSelf: 'flex-start',
                                    color: theme.palette.primary.main,
                                    fontWeight: 500
                                }}
                            >
                                Voltar
                            </Button>
                        )}

                        {/* Auth Methods Grid */}
                        {!selectedMethod && (
                            <Stack sx={{ gap: 3 }}>
                                {authMethods.map((method) => (
                                    <Card
                                        key={method.id}
                                        sx={{
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            border: `2px solid transparent`,
                                            '&:hover': {
                                                borderColor: method.primaryColor + '40',
                                                transform: 'translateY(-2px)',
                                                boxShadow: `0 8px 24px ${method.primaryColor}20`
                                            }
                                        }}
                                        onClick={() => handleMethodSelect(method.id)}
                                    >
                                        <CardContent sx={{ p: 4 }}>
                                            <Stack sx={{ gap: 3 }}>
                                                <Stack direction='row' sx={{ alignItems: 'center', gap: 3 }}>
                                                    {method.icon}
                                                    <Stack sx={{ flex: 1 }}>
                                                        <Typography variant='h5' sx={{ fontWeight: 600, color: method.primaryColor }}>
                                                            {method.title}
                                                        </Typography>
                                                        <Typography variant='body2' sx={{ color: theme.palette.text.secondary }}>
                                                            {method.description}
                                                        </Typography>
                                                    </Stack>
                                                </Stack>
                                                
                                                <Divider />
                                                
                                                <Stack sx={{ gap: 2 }}>
                                                    <Typography variant='subtitle2' sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                                                        Recursos principais:
                                                    </Typography>
                                                    <Stack sx={{ gap: 1 }}>
                                                        {method.features.map((feature, index) => (
                                                            <Stack key={index} direction='row' sx={{ alignItems: 'center', gap: 1 }}>
                                                                <Box
                                                                    sx={{
                                                                        width: 6,
                                                                        height: 6,
                                                                        borderRadius: '50%',
                                                                        backgroundColor: method.primaryColor
                                                                    }}
                                                                />
                                                                <Typography variant='body2' sx={{ color: theme.palette.text.secondary }}>
                                                                    {feature}
                                                                </Typography>
                                                            </Stack>
                                                        ))}
                                                    </Stack>
                                                </Stack>
                                                
                                                <Button
                                                    variant='outlined'
                                                    sx={{
                                                        alignSelf: 'flex-start',
                                                        borderRadius: 2,
                                                        borderColor: method.primaryColor,
                                                        color: method.primaryColor,
                                                        '&:hover': {
                                                            backgroundColor: method.primaryColor + '10',
                                                            borderColor: method.primaryColor
                                                        }
                                                    }}
                                                >
                                                    Continuar com {method.title}
                                                </Button>
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Stack>
                        )}

                        {/* Method Selected Confirmation */}
                        {selectedMethod && (
                            <Stack sx={{ alignItems: 'center', textAlign: 'center', gap: 2 }}>
                                <Alert 
                                    severity='info' 
                                    sx={{ 
                                        width: '100%',
                                        '& .MuiAlert-message': { width: '100%' }
                                    }}
                                >
                                    <Stack sx={{ alignItems: 'center', gap: 1, width: '100%' }}>
                                        <Typography variant='h6' sx={{ fontWeight: 600 }}>
                                            Redirecionando...
                                        </Typography>
                                        <Typography variant='body2'>
                                            Você será redirecionado para a página de {selectedMethod === 'supabase' ? 'Supabase' : 'autenticação tradicional'} em instantes.
                                        </Typography>
                                    </Stack>
                                </Alert>
                                
                                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                                    {selectedMethod === 'supabase' && (
                                        <>
                                            <Button
                                                variant='contained'
                                                startIcon={<IconBrandGoogle />}
                                                sx={{
                                                    borderRadius: 2,
                                                    background: '#4285f4',
                                                    '&:hover': { background: '#357ae8' }
                                                }}
                                                onClick={() => navigate('/signin-supabase')}
                                            >
                                                Google
                                            </Button>
                                            <Button
                                                variant='contained'
                                                startIcon={<IconBrandGithub />}
                                                sx={{
                                                    borderRadius: 2,
                                                    background: '#333',
                                                    '&:hover': { background: '#24292e' }
                                                }}
                                                onClick={() => navigate('/signin-supabase')}
                                            >
                                                GitHub
                                            </Button>
                                        </>
                                    )}
                                    
                                    <Button
                                        variant='outlined'
                                        onClick={() => selectedMethod === 'supabase' ? navigate('/signin-supabase') : navigate('/signin')}
                                    >
                                        Usar Email e Senha
                                    </Button>
                                </Box>
                            </Stack>
                        )}

                        {/* Footer */}
                        <Stack sx={{ alignItems: 'center', gap: 1 }}>
                            <Typography variant='body2' sx={{ color: theme.palette.text.secondary }}>
                                Precisa de ajuda?{' '}
                                <Typography
                                    component='span'
                                    sx={{ 
                                        color: theme.palette.primary.main, 
                                        fontWeight: 500,
                                        cursor: 'pointer',
                                        '&:hover': { textDecoration: 'underline' }
                                    }}
                                    onClick={() => window.open('https://docs.urbandev.com', '_blank')}
                                >
                                    Consulte nossa documentação
                                </Typography>
                            </Typography>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    )
}

export default AuthMethodSelector