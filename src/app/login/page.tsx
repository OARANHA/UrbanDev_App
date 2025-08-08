'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/components/auth-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Icons } from '@/components/ui/icons'
import Link from 'next/link'
import { Sparkles, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/dashboard'
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check system preference for dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  const { user, loading: authLoading, error: authError, isConfigured, signIn, signInWithGoogle, signUp } = useAuth()

  // Redirect if already authenticated
  if (user && !authLoading) {
    router.push(redirectTo)
    return null
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const { error } = await signIn(email, password)

    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Login successful! Redirecting...')
      setTimeout(() => {
        router.push(redirectTo)
      }, 1000)
    }
    setLoading(false)
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    setMessage(null)

    const { error } = await signInWithGoogle()

    if (error) {
      setMessage(error.message)
    }
    setLoading(false)
  }

  const handleSignUp = async () => {
    setLoading(true)
    setMessage(null)

    const { error } = await signUp(email, password)

    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Check your email for the confirmation link!')
    }
    setLoading(false)
  }

  if (authLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${isDark ? 'dark bg-gray-950' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className={`mt-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Carregando...</p>
        </div>
      </div>
    )
  }

  if (!isConfigured) {
    return (
      <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${isDark ? 'dark bg-gray-950' : 'bg-gray-50'}`}>
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-blue-700 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>UrbanDev</span>
            </div>
          </div>

          <Card className={`transition-colors duration-300 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <CardHeader>
              <CardTitle className={`text-center text-2xl ${isDark ? 'text-white' : 'text-gray-900'}`}>Configuração Necessária</CardTitle>
              <CardDescription className={`text-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                O Supabase não está configurado corretamente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive">
                <AlertDescription>
                  {authError || 'Supabase não está configurado. Por favor, configure as variáveis de ambiente NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY.'}
                </AlertDescription>
              </Alert>
              
              <div className="mt-6 space-y-4">
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <h4 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Passos para configurar:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                      Crie um projeto no <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-600 underline">Supabase</a>
                    </li>
                    <li className={isDark ? 'text-gray-300' : 'text-gray-600'}>Obtenha as credenciais do projeto</li>
                    <li className={isDark ? 'text-gray-300' : 'text-gray-600'}>Configure as variáveis de ambiente no arquivo .env</li>
                    <li className={isDark ? 'text-gray-300' : 'text-gray-600'}>Reinicie o servidor de desenvolvimento</li>
                  </ol>
                </div>
                
                <div className={`p-4 rounded-lg border ${isDark ? 'bg-yellow-900/20 border-yellow-700' : 'bg-yellow-50 border-yellow-200'}`}>
                  <h4 className={`font-medium mb-2 ${isDark ? 'text-yellow-300' : 'text-yellow-800'}`}>Variáveis necessárias:</h4>
                  <div className={`text-sm font-mono space-y-1 ${isDark ? 'text-yellow-300' : 'text-yellow-700'}`}>
                    <div>NEXT_PUBLIC_SUPABASE_URL=</div>
                    <div>NEXT_PUBLIC_SUPABASE_ANON_KEY=</div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => window.location.reload()}
                className="w-full bg-gradient-to-r from-orange-500 to-blue-700 hover:from-orange-600 hover:to-blue-800 text-white"
              >
                Tentar Novamente
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${isDark ? 'dark bg-gray-950' : 'bg-gray-50'}`}>
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-blue-700 rounded-lg flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <span className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>UrbanDev</span>
          </div>
          <p className={`mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Entre na sua conta para acessar a plataforma
          </p>
        </div>

        <Card className={`transition-colors duration-300 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <CardHeader className="space-y-1">
            <CardTitle className={`text-2xl text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>Bem-vindo de volta</CardTitle>
            <CardDescription className={`text-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Entre com seu email e senha para continuar
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <CardContent className="space-y-4">
              {authError && (
                <Alert variant="destructive">
                  <AlertDescription>{authError}</AlertDescription>
                </Alert>
              )}
              
              {message && !authError && (
                <Alert>
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className={isDark ? 'text-gray-200' : 'text-gray-700'}>Email</Label>
                <div className="relative">
                  <Icons.mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={`pl-10 transition-colors duration-300 ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className={isDark ? 'text-gray-200' : 'text-gray-700'}>Senha</Label>
                <div className="relative">
                  <Icons.lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={`pl-10 pr-10 transition-colors duration-300 ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-blue-700 hover:from-orange-600 hover:to-blue-800 text-white"
                disabled={loading}
              >
                {loading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Entrar
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className={`w-full border-t ${isDark ? 'border-gray-600' : 'border-gray-300'}`} />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className={`px-2 ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'}`}>
                    Ou continue com
                  </span>
                </div>
              </div>
              
              <Button
                type="button"
                variant="outline"
                className={`w-full transition-colors duration-300 ${isDark ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                onClick={handleGoogleLogin}
                disabled={loading}
              >
                <Icons.google className="mr-2 h-4 w-4" />
                Google
              </Button>
              
              <div className={`text-center text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Não tem uma conta?{' '}
                <button
                  type="button"
                  onClick={handleSignUp}
                  className="font-medium text-orange-500 hover:text-orange-600 transition-colors"
                  disabled={loading}
                >
                  Registre-se gratuitamente
                </button>
              </div>
            </CardFooter>
          </form>
        </Card>
        
        <div className={`text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <Link href="/" className={`hover:${isDark ? 'text-gray-200' : 'text-gray-700'} transition-colors`}>
            ← Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  )
}