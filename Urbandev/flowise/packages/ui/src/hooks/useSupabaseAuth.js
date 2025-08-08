import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// API
import supabaseApi from '@/api/supabase'
import authApi from '@/api/auth'

// Store
import { loginSuccess, logoutSuccess } from '@/store/reducers/authSlice'
import { store } from '@/store'

const useSupabaseAuth = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [user, setUser] = useState(null)
    
    const authState = useSelector((state) => state.auth)

    const signIn = async (email, password) => {
        setLoading(true)
        setError(null)
        
        try {
            // Try Supabase first
            const response = await supabaseApi.supabaseSignIn({ email, password })
            
            if (response.data) {
                const userData = {
                    ...response.data.user,
                    name: response.data.user.name || response.data.user.email,
                    apiKey: 'supabase-user',
                    isApiKeySet: true
                }
                
                store.dispatch(loginSuccess(userData))
                setUser(userData)
                return userData
            }
        } catch (supabaseError) {
            // Fallback to original auth
            try {
                const response = await authApi.login({ email, password })
                
                if (response.data) {
                    store.dispatch(loginSuccess(response.data))
                    setUser(response.data)
                    return response.data
                }
            } catch (originalError) {
                setError(originalError.response?.data?.message || 'Login failed')
                throw originalError
            }
        } finally {
            setLoading(false)
        }
    }

    const signUp = async (email, password, name) => {
        setLoading(true)
        setError(null)
        
        try {
            const response = await supabaseApi.supabaseSignUp({ email, password, name })
            
            if (response.data) {
                // Store user data but don't log in (email verification required)
                setUser(response.data.user)
                return response.data
            }
        } catch (error) {
            setError(error.response?.data?.error || 'Registration failed')
            throw error
        } finally {
            setLoading(false)
        }
    }

    const signInWithOAuth = async (provider) => {
        try {
            const response = await supabaseApi.supabaseSignInWithOAuth(provider)
            
            if (response.data && response.data.url) {
                // Redirect to OAuth provider
                window.location.href = response.data.url
            }
        } catch (error) {
            setError(error.response?.data?.error || 'OAuth sign in failed')
            throw error
        }
    }

    const signOut = async () => {
        setLoading(true)
        setError(null)
        
        try {
            // Try Supabase sign out first
            await supabaseApi.supabaseSignOut()
        } catch (supabaseError) {
            // If Supabase fails, continue with local logout
            console.warn('Supabase sign out failed, proceeding with local logout')
        } finally {
            // Always dispatch logout success and clear local state
            store.dispatch(logoutSuccess())
            setUser(null)
            setLoading(false)
            navigate('/signin')
        }
    }

    const resetPassword = async (email) => {
        setLoading(true)
        setError(null)
        
        try {
            // Try Supabase reset password first
            await supabaseApi.supabaseResetPassword({ email })
        } catch (supabaseError) {
            // Fallback to original reset password if available
            console.warn('Supabase reset password failed:', supabaseError)
            // You might want to implement fallback logic here
        } finally {
            setLoading(false)
        }
    }

    const updatePassword = async (password) => {
        setLoading(true)
        setError(null)
        
        try {
            await supabaseApi.supabaseUpdatePassword({ password })
        } catch (error) {
            setError(error.response?.data?.error || 'Password update failed')
            throw error
        } finally {
            setLoading(false)
        }
    }

    const updateProfile = async (updates) => {
        setLoading(true)
        setError(null)
        
        try {
            const response = await supabaseApi.supabaseUpdateProfile(updates)
            
            if (response.data) {
                // Update local user state
                const updatedUser = { ...user, ...response.data.user }
                setUser(updatedUser)
                
                // Update store
                store.dispatch(loginSuccess(updatedUser))
                
                return updatedUser
            }
        } catch (error) {
            setError(error.response?.data?.error || 'Profile update failed')
            throw error
        } finally {
            setLoading(false)
        }
    }

    const getCurrentUser = async () => {
        setLoading(true)
        setError(null)
        
        try {
            const response = await supabaseApi.supabaseGetCurrentUser()
            
            if (response.data) {
                const userData = response.data.user
                setUser(userData)
                return userData
            }
        } catch (error) {
            setError(error.response?.data?.error || 'Failed to get user')
            throw error
        } finally {
            setLoading(false)
        }
    }

    // Sync with Redux auth state
    useEffect(() => {
        if (authState.user) {
            setUser(authState.user)
        } else {
            setUser(null)
        }
    }, [authState])

    // Check for existing session on mount
    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await supabaseApi.supabaseGetSession()
                
                if (response.data && response.data.session) {
                    const userResponse = await supabaseApi.supabaseGetCurrentUser()
                    
                    if (userResponse.data) {
                        const userData = {
                            ...userResponse.data.user,
                            name: userResponse.data.user.name || userResponse.data.user.email,
                            apiKey: 'supabase-user',
                            isApiKeySet: true
                        }
                        
                        store.dispatch(loginSuccess(userData))
                        setUser(userData)
                    }
                }
            } catch (error) {
                // No active session or error, continue without authentication
                console.log('No active Supabase session found')
            }
        }

        checkSession()
    }, [])

    return {
        user,
        loading,
        error,
        signIn,
        signUp,
        signInWithOAuth,
        signOut,
        resetPassword,
        updatePassword,
        updateProfile,
        getCurrentUser,
        isAuthenticated: !!user
    }
}

export default useSupabaseAuth