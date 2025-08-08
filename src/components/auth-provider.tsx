'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

interface AuthUser {
  id: string
  email?: string
  user_metadata?: {
    full_name?: string
    name?: string
    avatar_url?: string
    picture?: string
  }
}

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  error: string | null
  isConfigured: boolean
  signIn: (email: string, password: string) => Promise<{ error: { message: string } | null }>
  signInWithGoogle: () => Promise<{ error: { message: string } | null }>
  signUp: (email: string, password: string) => Promise<{ error: { message: string } | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isConfigured, setIsConfigured] = useState(false)

  useEffect(() => {
    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    const configured = !!(supabaseUrl && supabaseAnonKey && 
      !supabaseUrl.includes('placeholder') && 
      !supabaseAnonKey.includes('placeholder'))
    
    setIsConfigured(configured)

    if (!configured) {
      setLoading(false)
      return
    }

    const supabase = createClient()

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
  }

  const signIn = async (email: string, password: string) => {
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      setError(error.message)
      return { error: { message: error.message } }
    }
    return { error: null }
  }

  const signInWithGoogle = async () => {
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    })
    if (error) {
      setError(error.message)
      return { error: { message: error.message } }
    }
    return { error: null }
  }

  const signUp = async (email: string, password: string) => {
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    })
    if (error) {
      setError(error.message)
      return { error: { message: error.message } }
    }
    return { error: null }
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, isConfigured, signIn, signInWithGoogle, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}