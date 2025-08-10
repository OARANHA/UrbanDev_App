import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

// material-ui
import {
    Grid,
    Box,
    Card,
    CardContent,
    Typography,
    Stack,
    Button,
    LinearProgress,
    Alert,
    Chip,
    useTheme,
    IconButton,
    Tooltip,
    Tabs,
    Tab,
    Paper,
    Badge,
    Divider
} from '@mui/material'
import {
    IconChartLine,
    IconUsers,
    IconBuildingStore,
    IconStack2,
    IconShieldLock,
    IconActivity,
    IconRefresh,
    IconTrendingUp,
    IconTrendingDown,
    IconClock,
    IconWorld,
    IconKey,
    IconUserCheck,
    IconAlertCircle,
    IconCurrencyDollar,
    IconServer,
    IconDatabase,
    IconDownload,
    IconFilter,
    IconSettings
} from '@tabler/icons-react'

// project imports
import MainCard from '@/ui-component/cards/MainCard'
import { gridSpacing } from '@/store/constant'

// Hooks
import useApi from '@/hooks/useApi'

// API
import { dashboardApi } from '@/api/dashboard'

// ==============================|| ENTERPRISE DASHBOARD PAGE ||============================== //

const DashboardEnterprise = () => {
    const theme = useTheme()
    const customization = useSelector((state) => state.customization)
    
    // Estados
    const [stats, setStats] = useState({
        overview: {
            totalWorkspaces: 0,
            activeWorkspaces: 0,
            totalOrganizations: 0,
            enterpriseOrganizations: 0,
            totalUsers: 0,
            activeUsers: 0,
            ssoUsers: 0,
            systemHealth: 100
        },
        security: {
            totalLogins: 0,
            ssoLogins: 0,
            securityEvents: 0,
            auditActivities: 0,
            complianceScore: 100
        },
        business: {
            totalRevenue: 0,
            mrrGrowth: 0,
            customerRetention: 0,
            workspaceUtilization: 0
        },
        performance: {
            avgResponseTime: 0,
            uptime: 99.9,
            errorRate: 0,
            activeSessions: 0
        }
    })
    
    const [recentActivity, setRecentActivity] = useState([])
    const [topWorkspaces, setTopWorkspaces] = useState([])
    const [ssoStats, setSsoStats] = useState([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [activeTab, setActiveTab] = useState(0)
    
    // APIs
    const getEnterpriseStatsApi = useApi(dashboardApi.getEnterpriseStats)
    const getRecentActivityApi = useApi(dashboardApi.getRecentActivity)
    const getTopWorkspacesApi = useApi(dashboardApi.getTopWorkspaces)
    const getSSOStatsApi = useApi(dashboardApi.getSSOStats)
    
    const loadEnterpriseData = async () => {
        try {
            setRefreshing(true)
            
            // Carregar dados em paralelo
            const [enterpriseStats, activities, workspaces, ssoData] = await Promise.all([
                getEnterpriseStatsApi.request(),
                getRecentActivityApi.request(15),
                getTopWorkspacesApi.request(5),
                getSSOStatsApi.request()
            ])
            
            // Atualizar estatísticas
            if (enterpriseStats?.data) {
                setStats(enterpriseStats.data)
            }
            
            // Atualizar atividades recentes
            if (activities?.data?.activities) {
                const formattedActivities = activities.data.activities.map(activity => ({
                    id: activity.id,
                    type: activity.type,
                    name: activity.description,
                    time: dashboardApi.formatDateTime(activity.timestamp),
                    status: activity.action === 'executed' ? 'success' : 
                           activity.action === 'created' ? 'success' :
                           activity.action === 'updated' ? 'info' :
                           activity.action === 'deleted' ? 'error' : 'default',
                    user: activity.user,
                    workspace: activity.workspace,
                    organization: activity.organization,
                    metadata: activity.metadata
                }))
                setRecentActivity(formattedActivities)
            }
            
            // Atualizar top workspaces
            if (workspaces?.data) {
                setTopWorkspaces(workspaces.data)
            }
            
            // Atualizar estatísticas SSO
            if (ssoData?.data) {
                setSsoStats(ssoData.data)
            }
            
            setLoading(false)
            setRefreshing(false)
        } catch (error) {
            console.error('Erro ao carregar dashboard enterprise:', error)
            setLoading(false)
            setRefreshing(false)
        }
    }
    
    useEffect(() => {
        loadEnterpriseData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    // Enterprise Stat Card Component
    const EnterpriseStatCard = ({ title, value, icon, color, subtitle, trend, trendValue, badge }) => {
        const formatValue = (val) => {
            if (typeof val === 'number' && val >= 1000000) {
                return (val / 1000000).toFixed(1) + 'M'
            } else if (typeof val === 'number' && val >= 1000) {
                return (val / 1000).toFixed(1) + 'K'
            } else if (typeof val === 'number' && val % 1 !== 0) {
                return val.toFixed(1)
            }
            return val?.toString() || '0'
        }
        
        return (
            <Card sx={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
                {badge && (
                    <Badge 
                        badgeContent={badge} 
                        color="secondary" 
                        sx={{ 
                            position: 'absolute', 
                            top: 12, 
                            right: 12,
                            '& .MuiBadge-badge': { fontSize: '0.75rem' }
                        }}
                    />
                )}
                <CardContent sx={{ p: 3 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h4" color="textSecondary" gutterBottom sx={{ fontWeight: 500 }}>
                                {title}
                            </Typography>
                            <Typography variant="h2" sx={{ fontWeight: 700, color: color || theme.palette.primary.main, mb: 1 }}>
                                {formatValue(value)}
                            </Typography>
                            {subtitle && (
                                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                                    {subtitle}
                                </Typography>
                            )}
                            {trend && (
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    {trend === 'up' ? (
                                        <IconTrendingUp size={16} color={theme.palette.success.main} />
                                    ) : trend === 'down' ? (
                                        <IconTrendingDown size={16} color={theme.palette.error.main} />
                                    ) : (
                                        <IconTrendingUp size={16} color={theme.palette.warning.main} />
                                    )}
                                    <Typography 
                                        variant="body2" 
                                        sx={{ 
                                            fontWeight: 600,
                                            color: trend === 'up' ? 'success.main' : 
                                                   trend === 'down' ? 'error.main' : 'warning.main'
                                        }}
                                    >
                                        {trendValue}
                                    </Typography>
                                </Stack>
                            )}
                        </Box>
                        <Box
                            sx={{
                                width: 56,
                                height: 56,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: (color || theme.palette.primary.main) + '15',
                                color: color || theme.palette.primary.main,
                                fontSize: 24
                            }}
                        >
                            {icon}
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
        )
    }
    
    // Activity Item Component
    const ActivityItem = ({ item }) => {
        const getStatusColor = (status) => {
            switch (status) {
                case 'success': return 'success'
                case 'error': return 'error'
                case 'info': return 'info'
                case 'warning': return 'warning'
                default: return 'default'
            }
        }
        
        const getActivityIcon = (type) => {
            const icons = {
                workspace: '🏢',
                organization: '🏢',
                user: '👤',
                sso: '🔐',
                login: '🔑',
                security: '🛡️',
                audit: '📋',
                chatflow: '🤖',
                execution: '▶️'
            }
            return icons[type] || '📝'
        }
        
        return (
            <Paper sx={{ p: 2, mb: 1, backgroundColor: theme.palette.background.paper }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Box sx={{ color: theme.palette.text.secondary }}>
                        {getActivityIcon(item.type)}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {item.name}
                        </Typography>
                        <Stack direction="row" spacing={2} sx={{ mt: 0.5 }}>
                            <Typography variant="caption" color="textSecondary">
                                {item.time}
                            </Typography>
                            {item.workspace && (
                                <Typography variant="caption" color="primary">
                                    {item.workspace}
                                </Typography>
                            )}
                            {item.organization && (
                                <Typography variant="caption" color="secondary">
                                    {item.organization}
                                </Typography>
                            )}
                            {item.user && (
                                <Typography variant="caption" color="info">
                                    {item.user}
                                </Typography>
                            )}
                        </Stack>
                    </Box>
                    <Chip 
                        label={item.status} 
                        size="small" 
                        color={getStatusColor(item.status)}
                        sx={{ fontSize: '0.75rem', fontWeight: 500 }}
                    />
                </Stack>
            </Paper>
        )
    }
    
    // Workspace Card Component
    const WorkspaceCard = ({ workspace }) => {
        return (
            <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 2 }}>
                    <Stack spacing={2}>
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {workspace.name}
                            </Typography>
                            {workspace.organization && (
                                <Typography variant="caption" color="textSecondary">
                                    {workspace.organization}
                                </Typography>
                            )}
                        </Box>
                        
                        <Divider />
                        
                        <Stack spacing={1}>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="body2" color="textSecondary">Usuários</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {workspace.userCount || 0}
                                </Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="body2" color="textSecondary">Chatflows</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {workspace.chatflowCount || 0}
                                </Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="body2" color="textSecondary">Execuções</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {workspace.executionCount || 0}
                                </Typography>
                            </Stack>
                        </Stack>
                        
                        {workspace.status && (
                            <Chip 
                                label={workspace.status} 
                                size="small" 
                                color={workspace.status === 'active' ? 'success' : 'default'}
                                sx={{ alignSelf: 'flex-start' }}
                            />
                        )}
                    </Stack>
                </CardContent>
            </Card>
        )
    }
    
    // SSO Stats Component
    const SSOStatCard = ({ provider, stats }) => {
        return (
            <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 2 }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Box sx={{ 
                            width: 40, 
                            height: 40, 
                            borderRadius: '50%', 
                            backgroundColor: theme.palette.primary.main + '15',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 20
                        }}>
                            {provider === 'google' ? 'G' : 
                             provider === 'github' ? 'G' :
                             provider === 'azure' ? 'A' :
                             provider === 'supabase' ? 'S' : '🔐'}
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, textTransform: 'capitalize' }}>
                                {provider}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {stats?.logins || 0} logins
                            </Typography>
                        </Box>
                        <Chip 
                            label={stats?.users || 0 + ' users'} 
                            size="small" 
                            color="primary"
                        />
                    </Stack>
                </CardContent>
            </Card>
        )
    }
    
    // Tab Panel Component
    const TabPanel = ({ children, value, index, ...other }) => (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`enterprise-tabpanel-${index}`}
            aria-labelledby={`enterprise-tab-${index}`}
            {...other}
        >
            {value === index && children}
        </div>
    )
    
    if (loading) {
        return (
            <Box sx={{ p: 3 }}>
                <LinearProgress />
            </Box>
        )
    }
    
    return (
        <Box sx={{ p: 3 }}>
            <Stack spacing={3}>
                {/* Header */}
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                        <Typography variant="h2" sx={{ fontWeight: 700, mb: 1 }}>
                            Dashboard Enterprise
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            Visão corporativa completa do seu ecossistema urbanDev
                        </Typography>
                    </Box>
                    <Stack direction="row" spacing={1}>
                        <IconButton 
                            onClick={loadEnterpriseData}
                            disabled={refreshing}
                            sx={{ 
                                backgroundColor: theme.palette.primary.main + '10',
                                '&:hover': { backgroundColor: theme.palette.primary.main + '20' }
                            }}
                        >
                            <IconRefresh />
                        </IconButton>
                        <IconButton 
                            sx={{ 
                                backgroundColor: theme.palette.secondary.main + '10',
                                '&:hover': { backgroundColor: theme.palette.secondary.main + '20' }
                            }}
                        >
                            <IconDownload />
                        </IconButton>
                        <IconButton 
                            sx={{ 
                                backgroundColor: theme.palette.info.main + '10',
                                '&:hover': { backgroundColor: theme.palette.info.main + '20' }
                            }}
                        >
                            <IconFilter />
                        </IconButton>
                    </Stack>
                </Stack>
                
                {/* Enterprise Stats Cards */}
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} sm={6} md={3}>
                        <EnterpriseStatCard
                            title="Total Workspaces"
                            value={stats.overview.totalWorkspaces}
                            icon={<IconStack2 />}
                            color={theme.palette.primary.main}
                            subtitle={`${stats.overview.activeWorkspaces} ativos`}
                            trend="up"
                            trendValue="+12%"
                            badge="NEW"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <EnterpriseStatCard
                            title="Organizações"
                            value={stats.overview.totalOrganizations}
                            icon={<IconBuildingStore />}
                            color={theme.palette.secondary.main}
                            subtitle={`${stats.overview.enterpriseOrganizations} enterprise`}
                            trend="up"
                            trendValue="+8%"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <EnterpriseStatCard
                            title="Usuários"
                            value={stats.overview.totalUsers}
                            icon={<IconUsers />}
                            color={theme.palette.success.main}
                            subtitle={`${stats.overview.ssoUsers} via SSO`}
                            trend="up"
                            trendValue="+15%"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <EnterpriseStatCard
                            title="Saúde do Sistema"
                            value={stats.overview.systemHealth}
                            icon={<IconServer />}
                            color={theme.palette.info.main}
                            subtitle="Uptime"
                            trend="stable"
                            trendValue="99.9%"
                        />
                    </Grid>
                </Grid>
                
                {/* Tabs */}
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
                        <Tab label="Visão Geral" id="enterprise-tab-0" />
                        <Tab label="Segurança" id="enterprise-tab-1" />
                        <Tab label="Workspaces" id="enterprise-tab-2" />
                        <Tab label="Business" id="enterprise-tab-3" />
                    </Tabs>
                </Box>
                
                {/* Tab Panels */}
                <TabPanel value={activeTab} index={0}>
                    <Stack spacing={3}>
                        {/* Performance & Security Row */}
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} md={8}>
                                <Card>
                                    <CardContent sx={{ p: 3 }}>
                                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                            Atividades Recentes
                                        </Typography>
                                        <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
                                            {recentActivity.length > 0 ? (
                                                recentActivity.map((activity, index) => (
                                                    <ActivityItem key={index} item={activity} />
                                                ))
                                            ) : (
                                                <Typography variant="body2" color="textSecondary" align="center" sx={{ py: 4 }}>
                                                    Nenhuma atividade recente
                                                </Typography>
                                            )}
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Card>
                                    <CardContent sx={{ p: 3 }}>
                                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                            Estatísticas SSO
                                        </Typography>
                                        <Stack spacing={2}>
                                            {ssoStats.length > 0 ? (
                                                ssoStats.map((sso, index) => (
                                                    <SSOStatCard key={index} provider={sso.provider} stats={sso.stats} />
                                                ))
                                            ) : (
                                                <Typography variant="body2" color="textSecondary" align="center" sx={{ py: 4 }}>
                                                    Nenhum dado SSO disponível
                                                </Typography>
                                            )}
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Stack>
                </TabPanel>
                
                <TabPanel value={activeTab} index={1}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} sm={6} md={3}>
                            <EnterpriseStatCard
                                title="Total Logins"
                                value={stats.security.totalLogins}
                                icon={<IconKey />}
                                color={theme.palette.primary.main}
                                subtitle={`${stats.security.ssoLogins} via SSO`}
                                trend="up"
                                trendValue="+23%"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <EnterpriseStatCard
                                title="Eventos de Segurança"
                                value={stats.security.securityEvents}
                                icon={<IconShieldLock />}
                                color={theme.palette.error.main}
                                subtitle="Últimos 7 dias"
                                trend="down"
                                trendValue="-5%"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <EnterpriseStatCard
                                title="Atividades Auditadas"
                                value={stats.security.auditActivities}
                                icon={<IconActivity />}
                                color={theme.palette.info.main}
                                subtitle="Total auditado"
                                trend="up"
                                trendValue="+18%"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <EnterpriseStatCard
                                title="Compliance Score"
                                value={stats.security.complianceScore}
                                icon={<IconUserCheck />}
                                color={theme.palette.success.main}
                                subtitle="Porcentagem"
                                trend="stable"
                                trendValue="100%"
                            />
                        </Grid>
                    </Grid>
                </TabPanel>
                
                <TabPanel value={activeTab} index={2}>
                    <Grid container spacing={gridSpacing}>
                        {topWorkspaces.length > 0 ? (
                            topWorkspaces.map((workspace, index) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                    <WorkspaceCard workspace={workspace} />
                                </Grid>
                            ))
                        ) : (
                            <Grid item xs={12}>
                                <Card>
                                    <CardContent sx={{ p: 6, textAlign: 'center' }}>
                                        <IconStack2 size={48} color={theme.palette.text.secondary} />
                                        <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
                                            Nenhum workspace encontrado
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Crie workspaces para começar a usar os recursos Enterprise
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )}
                    </Grid>
                </TabPanel>
                
                <TabPanel value={activeTab} index={3}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} sm={6} md={3}>
                            <EnterpriseStatCard
                                title="Receita Total"
                                value={stats.business.totalRevenue}
                                icon={<IconCurrencyDollar />}
                                color={theme.palette.success.main}
                                subtitle="MRR"
                                trend="up"
                                trendValue="+12%"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <EnterpriseStatCard
                                title="Crescimento MRR"
                                value={stats.business.mrrGrowth}
                                icon={<IconTrendingUp />}
                                color={theme.palette.primary.main}
                                subtitle="Mensal"
                                trend="up"
                                trendValue="+8%"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <EnterpriseStatCard
                                title="Retenção Clientes"
                                value={stats.business.customerRetention}
                                icon={<IconUserCheck />}
                                color={theme.palette.info.main}
                                subtitle="Porcentagem"
                                trend="stable"
                                trendValue="95%"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <EnterpriseStatCard
                                title="Utilização Workspaces"
                                value={stats.business.workspaceUtilization}
                                icon={<IconDatabase />}
                                color={theme.palette.warning.main}
                                subtitle="Ativos"
                                trend="up"
                                trendValue="+15%"
                            />
                        </Grid>
                    </Grid>
                </TabPanel>
            </Stack>
        </Box>
    )
}

export default DashboardEnterprise