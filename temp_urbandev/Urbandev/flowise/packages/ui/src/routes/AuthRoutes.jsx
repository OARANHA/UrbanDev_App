import { lazy } from 'react'

import Loadable from '@/ui-component/loading/Loadable'
import AuthLayout from '@/layout/AuthLayout'

const ResolveLoginPage = Loadable(lazy(() => import('@/views/auth/login')))
const SignInPage = Loadable(lazy(() => import('@/views/auth/signIn')))
const SignInSupabasePage = Loadable(lazy(() => import('@/views/auth/signInSupabase')))
const RegisterPage = Loadable(lazy(() => import('@/views/auth/register')))
const RegisterSupabasePage = Loadable(lazy(() => import('@/views/auth/registerSupabase')))
const AuthMethodSelector = Loadable(lazy(() => import('@/views/auth/AuthMethodSelector')))
const VerifyEmailPage = Loadable(lazy(() => import('@/views/auth/verify-email')))
const ForgotPasswordPage = Loadable(lazy(() => import('@/views/auth/forgotPassword')))
const ForgotPasswordSupabasePage = Loadable(lazy(() => import('@/views/auth/forgotPasswordSupabase')))
const ResetPasswordPage = Loadable(lazy(() => import('@/views/auth/resetPassword')))
const UnauthorizedPage = Loadable(lazy(() => import('@/views/auth/unauthorized')))
const OrganizationSetupPage = Loadable(lazy(() => import('@/views/organization/index')))
const LicenseExpiredPage = Loadable(lazy(() => import('@/views/auth/expired')))

const AuthRoutes = {
    path: '/',
    element: <AuthLayout />,
    children: [
        {
            path: '/login',
            element: <ResolveLoginPage />
        },
        {
            path: '/signin',
            element: <SignInPage />
        },
        {
            path: '/signin-supabase',
            element: <SignInSupabasePage />
        },
        {
            path: '/register',
            element: <RegisterPage />
        },
        {
            path: '/register-supabase',
            element: <RegisterSupabasePage />
        },
        {
            path: '/auth-select',
            element: <AuthMethodSelector />
        },
        {
            path: '/verify',
            element: <VerifyEmailPage />
        },
        {
            path: '/forgot-password',
            element: <ForgotPasswordPage />
        },
        {
            path: '/forgot-password-supabase',
            element: <ForgotPasswordSupabasePage />
        },
        {
            path: '/reset-password',
            element: <ResetPasswordPage />
        },
        {
            path: '/unauthorized',
            element: <UnauthorizedPage />
        },
        {
            path: '/organization-setup',
            element: <OrganizationSetupPage />
        },
        {
            path: '/license-expired',
            element: <LicenseExpiredPage />
        }
    ]
}

export default AuthRoutes
