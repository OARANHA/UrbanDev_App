import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
    Divider,
    TextField,
    InputAdornment,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    DatePicker
} from '@mui/material'
import {
    IconDeviceDesktopAnalytics,
    IconChartLine,
    IconUsers,
    IconActivity,
    IconClock,
    IconTrendingUp,
    IconTrendingDown,
    IconRefresh,
    IconDownload,
    IconFilter,
    IconCalendar,
    IconSearch,
    IconStack2,
    IconRobot,
    IconListCheck
} from '@tabler/icons-react'

// project imports
import MainCard from '@/ui-component/cards/MainCard'
import { gridSpacing } from '@/store/constant'

// ==============================|| WORKSPACE ANALYTICS PAGE ||============================== //

const WorkspaceAnalyticsPage = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    
    // Estados
    const [analytics, setAnalytics] = useState({
        overview: {
            totalWorkspaces: 0,
            activeWorkspaces: 0,
            totalUsers: 0,
            activeUsers: 0,
            totalChatflows: 0,
            totalExecutions: 0
        },
        usage: {
            executionsToday: 0,
            executionsThisWeek: 0,
            executionsThisMonth: 0,
            avgResponseTime: 0,
            successRate: 0,
            errorRate: 0
        },
        topWorkspaces: [],
        userActivity: [],
        executionTrends: []
    })
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [timeRange, setTimeRange] = useState('7d')
    const [selectedWorkspace, setSelectedWorkspace] = useState('all')
    const [activeTab, setActiveTab] = useState(0)
    
    // Dados mockados para demonstração
    const mockAnalytics = {
        overview: {
            totalWorkspaces: 45,
            activeWorkspaces: 38,
            totalUsers: 234,
            activeUsers: 189,
            totalChatflows: 567,
            totalExecutions: 12890
        },
        usage: {
            executionsToday: 342,
            executionsThisWeek: 2341,
            executionsThisMonth: 8934,
            avgResponseTime: 1.2,
            successRate: 98.5,
            errorRate: 1.5
        },
        topWorkspaces: [
            { id: 1, name: 'Marketing Team', users: 12, chatflows: 23, executions: 2341, growth: 15 },
            { id: 2, name: 'Sales Department', users: 8, chatflows: 18, executions: 1876, growth: 8 },
            { id: 3, name: 'Customer Support', users: 15, chatflows: 31, executions: 1654, growth: 22 },
            { id: 4, name: 'Development', users: 6, chatflows: 12, executions: 987, growth: -5 },
            { id: 5, name: 'HR Operations', users: 4, chatflows: 8, executions: 543, growth: 12 }
        ],
        userActivity: [
            { date: '2024-01-01', activeUsers: 145, executions: 890 },
            { date: '2024-01-02', activeUsers: 156, executions: 1023 },
            { date: '2024-01-03', activeUsers: 178, executions: 1156 },
            { date: '2024-01-04', activeUsers: 167, executions: 1087 },
            { date: '2024-01-05', activeUsers: 189, executions: 1234 },
            { date: '2024-01-06', activeUsers: 201, executions: 1345 },
            { date: '2024-01-07', activeUsers: 194, executions: 1298 }
        ]
    }
    
    useEffect(() => {
        loadAnalytics()
    }, [timeRange, selectedWorkspace])
    
    const loadAnalytics = async () => {
        setRefreshing(true)
        setTimeout(() => {
            setAnalytics(mockAnalytics)
            setLoading(false)
            setRefreshing(false)
        }, 1000)
    }
    
    const handleRefresh = () => {
        loadAnalytics()
    }
    
    const handleTimeRangeChange = (event) => {
        setTimeRange(event.target.value)
    }
    
    const handleWorkspaceChange = (event) => {
        setSelectedWorkspace(event.target.value)
    }
    
    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue)
    }
    
    const StatCard = ({ title, value, subtitle, icon, color, trend, trendValue }) => {
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
            <Card sx={{ height: '100%' }}>
                <CardContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h4" color="textSecondary" gutterBottom>
                                {title}
                            </Typography>
                            <Typography variant="h2" sx={{ fontWeight: 700, color: color || theme.palette.primary.main, mb: 1 }}>
                                {formatValue(value)}
                            </Typography>
                            {subtitle && (
                                <Typography variant="body2" color="textSecondary">
                                    {subtitle}
                                </Typography>
                            )}
                            {trend && (
                                <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
                                    {trend === 'up' ? (
                                        <IconTrendingUp size={16} color={theme.palette.success.main} />
                                    ) : (
                                        <IconTrendingDown size={16} color={theme.palette.error.main} />
                                    )}
                                    <Typography 
                                        variant="body2" 
                                        sx={{ 
                                            fontWeight: 600,
                                            color: trend === 'up' ? 'success.main' : 'error.main'
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
    
    if (loading) {
        return (
            <Box sx={{ p: 3 }}>
                <LinearProgress />
                <Typography sx={{ mt: 2 }}>Carregando analytics...</Typography>
            </Box>
        )
    }
    
    return (
        <Box sx={{ p: 3 }}>
            <Grid container spacing={gridSpacing}>
                {/* Header */}
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                        <Box>
                            <Typography variant="h3" sx={{ fontWeight: 600 }}>
                                Workspace Analytics
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Análise detalhada do uso e desempenho dos workspaces
                            </Typography>
                        </Box>
                        <Stack direction="row" spacing={1}>
                            <Button
                                variant="outlined"
                                startIcon={<IconDownload />}
                            >
                                Exportar
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<IconRefresh />}
                                onClick={handleRefresh}
                                disabled={refreshing}
                            >
                                {refreshing ? 'Atualizando...' : 'Atualizar'}
                            </Button>
                        </Stack>
                    </Stack>
                </Grid>
                
                {/* Filters */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <FormControl sx={{ minWidth: 200 }}>
                                    <InputLabel>Período</InputLabel>
                                    <Select
                                        value={timeRange}
                                        label="Período"
                                        onChange={handleTimeRangeChange}
                                    >
                                        <MenuItem value="1d">Últimas 24 horas</MenuItem>
                                        <MenuItem value="7d">Últimos 7 dias</MenuItem>
                                        <MenuItem value="30d">Últimos 30 dias</MenuItem>
                                        <MenuItem value="90d">Últimos 90 dias</MenuItem>
                                        <MenuItem value="1y">Último ano</MenuItem>
                                    </Select>
                                </FormControl>
                                
                                <FormControl sx={{ minWidth: 200 }}>
                                    <InputLabel>Workspace</InputLabel>
                                    <Select
                                        value={selectedWorkspace}
                                        label="Workspace"
                                        onChange={handleWorkspaceChange}
                                    >
                                        <MenuItem value="all">Todos os Workspaces</MenuItem>
                                        <MenuItem value="active">Apenas Ativos</MenuItem>
                                        <MenuItem value="inactive">Apenas Inativos</MenuItem>
                                    </Select>
                                </FormControl>
                                
                                <TextField
                                    placeholder="Buscar..."
                                    sx={{ flex: 1 }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <IconSearch size={20} />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                
                                <Button variant="outlined" startIcon={<IconFilter />}>
                                    Mais Filtros
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                
                {/* Overview Stats */}
                <Grid item xs={12} md={3}>
                    <StatCard
                        title="Total Workspaces"
                        value={analytics.overview.totalWorkspaces}
                        subtitle={`${analytics.overview.activeWorkspaces} ativos`}
                        icon={<IconStack2 />}
                        color={theme.palette.primary.main}
                        trend="up"
                        trendValue="+5%"
                    />
                </Grid>
                
                <Grid item xs={12} md={3}>
                    <StatCard
                        title="Usuários Ativos"
                        value={analytics.overview.activeUsers}
                        subtitle={`${analytics.overview.totalUsers} total`}
                        icon={<IconUsers />}
                        color={theme.palette.success.main}
                        trend="up"
                        trendValue="+12%"
                    />
                </Grid>
                
                <Grid item xs={12} md={3}>
                    <StatCard
                        title="Chatflows"
                        value={analytics.overview.totalChatflows}
                        subtitle="Total criados"
                        icon={<IconRobot />}
                        color={theme.palette.warning.main}
                        trend="up"
                        trendValue="+8%"
                    />
                </Grid>
                
                <Grid item xs={12} md={3}>
                    <StatCard
                        title="Execuções Hoje"
                        value={analytics.usage.executionsToday}
                        subtitle="Taxa de sucesso: {analytics.usage.successRate}%"
                        icon={<IconListCheck />}
                        color={theme.palette.secondary.main}
                        trend="up"
                        trendValue="+15%"
                    />
                </Grid>
                
                {/* Tabs */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Tabs value={activeTab} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tab label="Visão Geral" icon={<IconDeviceDesktopAnalytics />} iconPosition="start" />
                                <Tab label="Top Workspaces" icon={<IconStack2 />} iconPosition="start" />
                                <Tab label="Atividade de Usuários" icon={<IconActivity />} iconPosition="start" />
                                <Tab label="Tendências" icon={<IconChartLine />} iconPosition="start" />
                            </Tabs>
                        </CardContent>
                    </Card>
                </Grid>
                
                {/* Tab Content */}
                {activeTab === 0 && (
                    <>
                        {/* Usage Metrics */}
                        <Grid item xs={12} md={4}>
                            <Card>
                                <CardContent>
                                    <Stack spacing={2}>
                                        <Typography variant="h6">Métricas de Uso</Typography>
                                        <Stack spacing={1}>
                                            <Stack direction="row" justifyContent="space-between">
                                                <Typography variant="body2">Execuções esta semana</Typography>
                                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                    {analytics.usage.executionsThisWeek.toLocaleString()}
                                                </Typography>
                                            </Stack>
                                            <Stack direction="row" justifyContent="space-between">
                                                <Typography variant="body2">Execuções este mês</Typography>
                                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                    {analytics.usage.executionsThisMonth.toLocaleString()}
                                                </Typography>
                                            </Stack>
                                            <Stack direction="row" justifyContent="space-between">
                                                <Typography variant="body2">Tempo médio de resposta</Typography>
                                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                    {analytics.usage.avgResponseTime}s
                                                </Typography>
                                            </Stack>
                                            <Stack direction="row" justifyContent="space-between">
                                                <Typography variant="body2">Taxa de sucesso</Typography>
                                                <Typography variant="body2" sx={{ fontWeight: 600, color: 'success.main' }}>
                                                    {analytics.usage.successRate}%
                                                </Typography>
                                            </Stack>
                                            <Stack direction="row" justifyContent="space-between">
                                                <Typography variant="body2">Taxa de erro</Typography>
                                                <Typography variant="body2" sx={{ fontWeight: 600, color: 'error.main' }}>
                                                    {analytics.usage.errorRate}%
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                        
                        <Grid item xs={12} md={8}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" sx={{ mb: 2 }}>
                                        Atividade Recente
                                    </Typography>
                                    <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="body2" color="textSecondary">
                                            Gráfico de atividade seria exibido aqui
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </>
                )}
                
                {activeTab === 1 && (
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    Top Workspaces por Uso
                                </Typography>
                                <Stack spacing={2}>
                                    {analytics.topWorkspaces.map((workspace, index) => (
                                        <Paper key={workspace.id} sx={{ p: 2 }}>
                                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                <Box>
                                                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                                        {index + 1}. {workspace.name}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        {workspace.users} usuários • {workspace.chatflows} chatflows
                                                    </Typography>
                                                </Box>
                                                <Stack direction="row" alignItems="center" spacing={2}>
                                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                        {workspace.executions.toLocaleString()}
                                                    </Typography>
                                                    <Chip 
                                                        label={`${workspace.growth > 0 ? '+' : ''}${workspace.growth}%`}
                                                        size="small"
                                                        color={workspace.growth > 0 ? 'success' : 'error'}
                                                    />
                                                </Stack>
                                            </Stack>
                                        </Paper>
                                    ))}
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                )}
                
                {activeTab === 2 && (
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    Atividade de Usuários
                                </Typography>
                                <Box sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Typography variant="body2" color="textSecondary">
                                        Gráfico de atividade de usuários seria exibido aqui
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                )}
                
                {activeTab === 3 && (
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    Tendências de Execução
                                </Typography>
                                <Box sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Typography variant="body2" color="textSecondary">
                                        Gráfico de tendências seria exibido aqui
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                )}
            </Grid>
        </Box>
    )
}

export default WorkspaceAnalyticsPage