import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api/v1'

// Enterprise Dashboard API Service
class DashboardEnterpriseApi {
    constructor() {
        this.api = axios.create({
            baseURL: `${API_BASE_URL}/dashboard/enterprise`,
            headers: {
                'Content-Type': 'application/json'
            }
        })

        // Add request interceptor for authentication
        this.api.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token')
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`
                }
                return config
            },
            (error) => {
                return Promise.reject(error)
            }
        )

        // Add response interceptor for error handling
        this.api.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    // Redirect to login if unauthorized
                    window.location.href = '/signin'
                }
                return Promise.reject(error)
            }
        )
    }

    // Enterprise Dashboard Statistics
    async getEnterpriseStats() {
        try {
            const response = await this.api.get('/stats')
            return response.data.data
        } catch (error) {
            console.error('Error fetching enterprise stats:', error)
            throw error
        }
    }

    async getOverviewStats() {
        try {
            const response = await this.api.get('/stats/overview')
            return response.data.data
        } catch (error) {
            console.error('Error fetching enterprise overview stats:', error)
            throw error
        }
    }

    async getSecurityStats() {
        try {
            const response = await this.api.get('/stats/security')
            return response.data.data
        } catch (error) {
            console.error('Error fetching security stats:', error)
            throw error
        }
    }

    async getBusinessStats() {
        try {
            const response = await this.api.get('/stats/business')
            return response.data.data
        } catch (error) {
            console.error('Error fetching business stats:', error)
            throw error
        }
    }

    // Workspace Statistics
    async getWorkspaceStats(filters = {}) {
        try {
            const params = new URLSearchParams()
            Object.keys(filters).forEach(key => {
                if (filters[key] !== undefined && filters[key] !== null) {
                    params.append(key, filters[key])
                }
            })

            const response = await this.api.get(`/workspaces?${params.toString()}`)
            return response.data.data
        } catch (error) {
            console.error('Error fetching workspace stats:', error)
            throw error
        }
    }

    async getTopWorkspaces(limit = 5) {
        try {
            const response = await this.api.get(`/workspaces/top?limit=${limit}`)
            return response.data.data
        } catch (error) {
            console.error('Error fetching top workspaces:', error)
            throw error
        }
    }

    async getWorkspaceGrowth(period = '30d') {
        try {
            const response = await this.api.get(`/workspaces/growth?period=${period}`)
            return response.data.data
        } catch (error) {
            console.error('Error fetching workspace growth:', error)
            throw error
        }
    }

    // Organization Statistics
    async getOrganizationStats(filters = {}) {
        try {
            const params = new URLSearchParams()
            Object.keys(filters).forEach(key => {
                if (filters[key] !== undefined && filters[key] !== null) {
                    params.append(key, filters[key])
                }
            })

            const response = await this.api.get(`/organizations?${params.toString()}`)
            return response.data.data
        } catch (error) {
            console.error('Error fetching organization stats:', error)
            throw error
        }
    }

    async getTopOrganizations(limit = 5) {
        try {
            const response = await this.api.get(`/organizations/top?limit=${limit}`)
            return response.data.data
        } catch (error) {
            console.error('Error fetching top organizations:', error)
            throw error
        }
    }

    // User Statistics
    async getUserStats(filters = {}) {
        try {
            const params = new URLSearchParams()
            Object.keys(filters).forEach(key => {
                if (filters[key] !== undefined && filters[key] !== null) {
                    params.append(key, filters[key])
                }
            })

            const response = await this.api.get(`/users?${params.toString()}`)
            return response.data.data
        } catch (error) {
            console.error('Error fetching user stats:', error)
            throw error
        }
    }

    async getUserGrowth(period = '30d') {
        try {
            const response = await this.api.get(`/users/growth?period=${period}`)
            return response.data.data
        } catch (error) {
            console.error('Error fetching user growth:', error)
            throw error
        }
    }

    async getActiveUsersCount() {
        try {
            const response = await this.api.get('/users/active/count')
            return response.data.data
        } catch (error) {
            console.error('Error fetching active users count:', error)
            throw error
        }
    }

    // SSO Statistics
    async getSSOStats() {
        try {
            const response = await this.api.get('/sso/stats')
            return response.data.data
        } catch (error) {
            console.error('Error fetching SSO stats:', error)
            throw error
        }
    }

    async getSSOLoginStats(period = '7d') {
        try {
            const response = await this.api.get(`/sso/logins?period=${period}`)
            return response.data.data
        } catch (error) {
            console.error('Error fetching SSO login stats:', error)
            throw error
        }
    }

    async getSSOProviderStats() {
        try {
            const response = await this.api.get('/sso/providers')
            return response.data.data
        } catch (error) {
            console.error('Error fetching SSO provider stats:', error)
            throw error
        }
    }

    // Security & Audit Statistics
    async getSecurityStats() {
        try {
            const response = await this.api.get('/security/stats')
            return response.data.data
        } catch (error) {
            console.error('Error fetching security stats:', error)
            throw error
        }
    }

    async getAuditActivities(filters = {}) {
        try {
            const params = new URLSearchParams()
            Object.keys(filters).forEach(key => {
                if (filters[key] !== undefined && filters[key] !== null) {
                    params.append(key, filters[key])
                }
            })

            const response = await this.api.get(`/security/audit?${params.toString()}`)
            return response.data.data
        } catch (error) {
            console.error('Error fetching audit activities:', error)
            throw error
        }
    }

    async getSecurityEvents(period = '7d') {
        try {
            const response = await this.api.get(`/security/events?period=${period}`)
            return response.data.data
        } catch (error) {
            console.error('Error fetching security events:', error)
            throw error
        }
    }

    async getLoginActivity(filters = {}) {
        try {
            const params = new URLSearchParams()
            Object.keys(filters).forEach(key => {
                if (filters[key] !== undefined && filters[key] !== null) {
                    params.append(key, filters[key])
                }
            })

            const response = await this.api.get(`/security/login-activity?${params.toString()}`)
            return response.data.data
        } catch (error) {
            console.error('Error fetching login activity:', error)
            throw error
        }
    }

    // Business Statistics
    async getBusinessStats() {
        try {
            const response = await this.api.get('/business/stats')
            return response.data.data
        } catch (error) {
            console.error('Error fetching business stats:', error)
            throw error
        }
    }

    async getRevenueStats(period = '30d') {
        try {
            const response = await this.api.get(`/business/revenue?period=${period}`)
            return response.data.data
        } catch (error) {
            console.error('Error fetching revenue stats:', error)
            throw error
        }
    }

    async getCustomerStats() {
        try {
            const response = await this.api.get('/business/customers')
            return response.data.data
        } catch (error) {
            console.error('Error fetching customer stats:', error)
            throw error
        }
    }

    async getComplianceStats() {
        try {
            const response = await this.api.get('/business/compliance')
            return response.data.data
        } catch (error) {
            console.error('Error fetching compliance stats:', error)
            throw error
        }
    }

    // System Health & Performance
    async getSystemHealth() {
        try {
            const response = await this.api.get('/system/health')
            return response.data.data
        } catch (error) {
            console.error('Error fetching system health:', error)
            throw error
        }
    }

    async getPerformanceMetrics() {
        try {
            const response = await this.api.get('/system/performance')
            return response.data.data
        } catch (error) {
            console.error('Error fetching performance metrics:', error)
            throw error
        }
    }

    async getResourceUsage() {
        try {
            const response = await this.api.get('/system/resources')
            return response.data.data
        } catch (error) {
            console.error('Error fetching resource usage:', error)
            throw error
        }
    }

    // Analytics & Trends
    async getAnalytics(period = '7d', metrics = 'all') {
        try {
            const response = await this.api.get(`/analytics?period=${period}&metrics=${metrics}`)
            return response.data.data
        } catch (error) {
            console.error('Error fetching analytics:', error)
            throw error
        }
    }

    async getTrends(period = '30d', metric = 'users') {
        try {
            const response = await this.api.get(`/analytics/trends?period=${period}&metric=${metric}`)
            return response.data.data
        } catch (error) {
            console.error('Error fetching trends:', error)
            throw error
        }
    }

    async getComparisonData(currentPeriod, previousPeriod, metrics = 'all') {
        try {
            const params = new URLSearchParams({
                currentPeriod,
                previousPeriod,
                metrics
            })
            const response = await this.api.get(`/analytics/comparison?${params.toString()}`)
            return response.data.data
        } catch (error) {
            console.error('Error fetching comparison data:', error)
            throw error
        }
    }

    // Activity Timeline (Enterprise)
    async getActivityTimeline(filters = {}) {
        try {
            const { limit = 50, offset = 0, type, workspaceId, organizationId, startDate, endDate } = filters
            
            const params = new URLSearchParams()
            params.append('limit', limit.toString())
            params.append('offset', offset.toString())
            
            if (type) params.append('type', type)
            if (workspaceId) params.append('workspaceId', workspaceId)
            if (organizationId) params.append('organizationId', organizationId)
            if (startDate) params.append('startDate', startDate)
            if (endDate) params.append('endDate', endDate)

            const response = await this.api.get(`/activity?${params.toString()}`)
            return response.data.data
        } catch (error) {
            console.error('Error fetching activity timeline:', error)
            throw error
        }
    }

    async getRecentActivity(limit = 10) {
        try {
            const response = await this.api.get(`/activity/recent?limit=${limit}`)
            return response.data.data
        } catch (error) {
            console.error('Error fetching recent activity:', error)
            throw error
        }
    }

    // Utility methods for data formatting
    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M'
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K'
        }
        return num.toString()
    }

    formatPercentage(value) {
        return `${value.toFixed(1)}%`
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(amount)
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
    }

    formatDateTime(dateString) {
        return new Date(dateString).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    // Data aggregation helpers
    aggregateByPeriod(data, period = 'daily') {
        const aggregated = {}
        
        data.forEach(item => {
            const date = new Date(item.date)
            let key
            
            switch (period) {
                case 'weekly':
                    const weekStart = new Date(date)
                    weekStart.setDate(date.getDate() - date.getDay())
                    key = weekStart.toISOString().split('T')[0]
                    break
                case 'monthly':
                    key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
                    break
                default:
                    key = item.date
            }
            
            if (!aggregated[key]) {
                aggregated[key] = {
                    date: key,
                    value: 0,
                    count: 0
                }
            }
            
            aggregated[key].value += item.value || 0
            aggregated[key].count += 1
        })
        
        return Object.values(aggregated).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    }

    calculateGrowthRate(current, previous) {
        if (previous === 0) return current > 0 ? 100 : 0
        return ((current - previous) / previous) * 100
    }

    getActivityIcon(type) {
        const icons = {
            workspace: '🏢',
            organization: '🏢',
            user: '👤',
            sso: '🔐',
            login: '🔑',
            security: '🛡️',
            audit: '📋',
            chatflow: '🤖',
            execution: '▶️',
            customer: '👥',
            revenue: '💰',
            system: '⚙️'
        }
        return icons[type] || '📝'
    }

    getActivityColor(type) {
        const colors = {
            workspace: 'primary',
            organization: 'secondary',
            user: 'info',
            sso: 'success',
            login: 'warning',
            security: 'error',
            audit: 'default',
            chatflow: 'primary',
            execution: 'success',
            customer: 'info',
            revenue: 'success',
            system: 'default'
        }
        return colors[type] || 'default'
    }
}

// Export singleton instance
export const dashboardEnterpriseApi = new DashboardEnterpriseApi()

// Export class for custom instances if needed
export default DashboardEnterpriseApi