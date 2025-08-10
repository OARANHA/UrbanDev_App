import client from './client'

// Supabase Auth API
const supabaseSignUp = (body) => client.post(`/supabase-auth/signup`, body)
const supabaseSignIn = (body) => client.post(`/supabase-auth/signin`, body)
const supabaseSignInWithOAuth = (provider) => client.get(`/supabase-auth/oauth/${provider}`)
const supabaseSignOut = () => client.post(`/supabase-auth/signout`)
const supabaseGetCurrentUser = () => client.get(`/supabase-auth/user`)
const supabaseGetSession = () => client.get(`/supabase-auth/session`)
const supabaseUpdateProfile = (body) => client.put(`/supabase-auth/profile`, body)
const supabaseResetPassword = (body) => client.post(`/supabase-auth/reset-password`, body)
const supabaseUpdatePassword = (body) => client.put(`/supabase-auth/password`, body)

export default {
    supabaseSignUp,
    supabaseSignIn,
    supabaseSignInWithOAuth,
    supabaseSignOut,
    supabaseGetCurrentUser,
    supabaseGetSession,
    supabaseUpdateProfile,
    supabaseResetPassword,
    supabaseUpdatePassword
}