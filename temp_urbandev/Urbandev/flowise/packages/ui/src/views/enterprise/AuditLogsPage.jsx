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
    TextField,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Menu,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Badge,
    Paper,
    Divider
} from '@mui/material'
import {
    IconReport,
    IconSearch,
    IconFilter,
    IconRefresh,
    IconDownload,
    IconDotsVertical,
    IconEye,
    IconUser,
    IconBuildingCommunity,
    IconDeviceDesktop,
    IconShieldLock,
    IconClock,
    IconCalendar,
    IconActivity,
    IconAlertCircle,
    IconCheck,
    IconX
} from '@tabler/icons-react'

// project imports
import MainCard from '@/ui-component/cards/MainCard'
import { gridSpacing } from '@/store/constant'

// ==============================|| AUDIT LOGS PAGE ||============================== //

const AuditLogsPage = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    
    // Estados
    const [auditLogs, setAuditLogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(20)
    const [anchorEl, setAnchorEl] = useState(null)
    const [selectedLog, setSelectedLog] = useState(null)
    const [filterType, setFilterType] = useState('all')
    const [filterAction, setFilterAction] = useState('all')
    const [filterUser, setFilterUser] = useState('all')
    const [dateRange, setDateRange] = useState('7d')
    
    // Dados mockados para demonstração
    const mockAuditLogs = [
        {
            id: 1,
            timestamp: '2024-01-15T10:30:00Z',
            userId: 'user_123',
            userName: 'João Silva',
            userEmail: 'joao.silva@company.com',
            action: 'login',
            resourceType: 'user',
            resourceId: 'user_123',
            description: 'User login successful',
            ipAddress: '192.168.1.100',
            userAgent: 'Chrome/91.0',
            status: 'success',
            severity: 'info',
            workspace: 'Marketing Team',
            organization: 'Acme Corp'
        },
        {
            id: 2,
            timestamp: '2024-01-15T10:35:00Z',
            userId: 'user_456',
            userName: 'Maria Santos',
            userEmail: 'maria.santos@company.com',
            action: 'create',
            resourceType: 'chatflow',
            resourceId: 'chatflow_789',
            description: 'Created new chatflow "Customer Support Bot"',
            ipAddress: '192.168.1.101',
            userAgent: 'Firefox/90.0',
            status: 'success',
            severity: 'info',
            workspace: 'Customer Support',
            organization: 'Acme Corp'
        },
        {
            id: 3,
            timestamp: '2024-01-15T10:40:00Z',
            userId: 'user_789',
            userName: 'Carlos Oliveira',
            userEmail: 'carlos.oliveira@company.com',
            action: 'delete',
            resourceType: 'credential',
            resourceId: 'cred_456',
            description: 'Deleted OpenAI API credential',
            ipAddress: '192.168.1.102',
            userAgent: 'Chrome/91.0',
            status: 'success',
            severity: 'warning',
            workspace: 'Development',
            organization: 'Acme Corp'
        },
        {
            id: 4,
            timestamp: '2024-01-15T10:45:00Z',
            userId: 'user_123',
            userName: 'João Silva',
            userEmail: 'joao.silva@company.com',
            action: 'failed_login',
            resourceType: 'user',
            resourceId: 'user_123',
            description: 'Failed login attempt - invalid password',
            ipAddress: '192.168.1.100',
            userAgent: 'Chrome/91.0',
            status: 'error',
            severity: 'error',
            workspace: 'Marketing Team',
            organization: 'Acme Corp'
        },
        {
            id: 5,
            timestamp: '2024-01-15T10:50:00Z',
            userId: 'user_456',
            userName: 'Maria Santos',
            userEmail: 'maria.santos@company.com',
            action: 'update',
            resourceType: 'workspace',
            resourceId: 'workspace_123',
            description: 'Updated workspace settings',
            ipAddress: '192.168.1.101',
            userAgent: 'Firefox/90.0',
            status: 'success',
            severity: 'info',
            workspace: 'Customer Support',
            organization: 'Acme Corp'
        },
        {
            id: 6,
            timestamp: '2024-01-15T10:55:00Z',
            userId: 'system',
            userName: 'System',
            userEmail: 'system@company.com',
            action: 'sso_login',
            resourceType: 'user',
            resourceId: 'user_999',
            description: 'SSO login via Google',
            ipAddress: '192.168.1.200',
            userAgent: 'Chrome/91.0',
            status: 'success',
            severity: 'info',
            workspace: 'HR Operations',
            organization: 'Acme Corp'
        },
        {
            id: 7,
            timestamp: '2024-01-15T11:00:00Z',
            userId: 'user_789',
            userName: 'Carlos Oliveira',
            userEmail: 'carlos.oliveira@company.com',
            action: 'export',
            resourceType: 'data',
            resourceId: 'export_123',
            description: 'Exported chatflow data',
            ipAddress: '192.168.1.102',
            userAgent: 'Chrome/91.0',
            status: 'success',
            severity: 'warning',
            workspace: 'Development',
            organization: 'Acme Corp'
        },
        {
            id: 8,
            timestamp: '2024-01-15T11:05:00Z',
            userId: 'user_123',
            userName: 'João Silva',
            userEmail: 'joao.silva@company.com',
            action: 'permission_change',
            resourceType: 'role',
            resourceId: 'role_456',
            description: 'Changed user permissions',
            ipAddress: '192.168.1.100',
            userAgent: 'Chrome/91.0',
            status: 'success',
            severity: 'warning',
            workspace: 'Marketing Team',
            organization: 'Acme Corp'
        }
    ]
    
    useEffect(() => {
        loadAuditLogs()
    }, [dateRange, filterType, filterAction, filterUser])
    
    const loadAuditLogs = async () => {
        setLoading(true)
        setTimeout(() => {
            setAuditLogs(mockAuditLogs)
            setLoading(false)
        }, 1000)
    }
    
    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
        setPage(0)
    }
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }
    
    const handleMenuClick = (event, log) => {
        setAnchorEl(event.currentTarget)
        setSelectedLog(log)
    }
    
    const handleMenuClose = () => {
        setAnchorEl(null)
        setSelectedLog(null)
    }
    
    const handleViewDetails = () => {
        if (selectedLog) {
            navigate(`/audit-logs/${selectedLog.id}`)
        }
        handleMenuClose()
    }
    
    const getStatusIcon = (status) => {
        switch (status) {
            case 'success':
                return <IconCheck size={16} color={theme.palette.success.main} />
            case 'error':
                return <IconX size={16} color={theme.palette.error.main} />
            default:
                return <IconAlertCircle size={16} color={theme.palette.warning.main} />
        }
    }
    
    const getStatusColor = (status) => {
        switch (status) {
            case 'success': return 'success'
            case 'error': return 'error'
            case 'warning': return 'warning'
            default: return 'info'
        }
    }
    
    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'error': return 'error'
            case 'warning': return 'warning'
            case 'info': return 'info'
            default: return 'default'
        }
    }
    
    const getActionIcon = (action) => {
        const icons = {
            login: <IconUser size={16} />,
            create: <IconCheck size={16} />,
            update: <IconDeviceDesktop size={16} />,
            delete: <IconX size={16} />,
            failed_login: <IconAlertCircle size={16} />,
            sso_login: <IconShieldLock size={16} />,
            export: <IconDownload size={16} />,
            permission_change: <IconShieldLock size={16} />
        }
        return icons[action] || <IconActivity size={16} />
    }
    
    const formatDateTime = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleString('pt-BR')
    }
    
    const filteredLogs = auditLogs.filter(log => {
        const matchesSearch = searchTerm === '' || 
            log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.workspace.toLowerCase().includes(searchTerm.toLowerCase())
        
        const matchesType = filterType === 'all' || log.resourceType === filterType
        const matchesAction = filterAction === 'all' || log.action === filterAction
        const matchesUser = filterUser === 'all' || log.userId === filterUser
        
        return matchesSearch && matchesType && matchesAction && matchesUser
    })
    
    const paginatedLogs = filteredLogs.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    )
    
    if (loading) {
        return (
            <Box sx={{ p: 3 }}>
                <LinearProgress />
                <Typography sx={{ mt: 2 }}>Carregando logs de auditoria...</Typography>
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
                                Logs de Auditoria
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Monitoramento de atividades e eventos do sistema
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
                                onClick={loadAuditLogs}
                            >
                                Atualizar
                            </Button>
                        </Stack>
                    </Stack>
                </Grid>
                
                {/* Stats Cards */}
                <Grid item xs={12} md={3}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Box sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: '50%',
                                    backgroundColor: theme.palette.primary.main + '15',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: theme.palette.primary.main
                                }}>
                                    <IconReport size={24} />
                                </Box>
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                                        {auditLogs.length}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Total Eventos
                                    </Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                
                <Grid item xs={12} md={3}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Box sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: '50%',
                                    backgroundColor: theme.palette.success.main + '15',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: theme.palette.success.main
                                }}>
                                    <IconCheck size={24} />
                                </Box>
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                                        {auditLogs.filter(log => log.status === 'success').length}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Sucessos
                                    </Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                
                <Grid item xs={12} md={3}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Box sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: '50%',
                                    backgroundColor: theme.palette.error.main + '15',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: theme.palette.error.main
                                }}>
                                    <IconX size={24} />
                                </Box>
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                                        {auditLogs.filter(log => log.status === 'error').length}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Erros
                                    </Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                
                <Grid item xs={12} md={3}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Box sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: '50%',
                                    backgroundColor: theme.palette.warning.main + '15',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: theme.palette.warning.main
                                }}>
                                    <IconAlertCircle size={24} />
                                </Box>
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                                        {auditLogs.filter(log => log.severity === 'warning').length}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Alertas
                                    </Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                
                {/* Filters */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <TextField
                                    placeholder="Buscar logs..."
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    sx={{ flex: 1 }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <IconSearch size={20} />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                
                                <FormControl sx={{ minWidth: 150 }}>
                                    <InputLabel>Tipo</InputLabel>
                                    <Select
                                        value={filterType}
                                        label="Tipo"
                                        onChange={(e) => setFilterType(e.target.value)}
                                    >
                                        <MenuItem value="all">Todos</MenuItem>
                                        <MenuItem value="user">Usuário</MenuItem>
                                        <MenuItem value="chatflow">Chatflow</MenuItem>
                                        <MenuItem value="credential">Credencial</MenuItem>
                                        <MenuItem value="workspace">Workspace</MenuItem>
                                        <MenuItem value="role">Função</MenuItem>
                                        <MenuItem value="data">Dados</MenuItem>
                                    </Select>
                                </FormControl>
                                
                                <FormControl sx={{ minWidth: 150 }}>
                                    <InputLabel>Ação</InputLabel>
                                    <Select
                                        value={filterAction}
                                        label="Ação"
                                        onChange={(e) => setFilterAction(e.target.value)}
                                    >
                                        <MenuItem value="all">Todas</MenuItem>
                                        <MenuItem value="login">Login</MenuItem>
                                        <MenuItem value="create">Criar</MenuItem>
                                        <MenuItem value="update">Atualizar</MenuItem>
                                        <MenuItem value="delete">Excluir</MenuItem>
                                        <MenuItem value="failed_login">Login Falhou</MenuItem>
                                        <MenuItem value="sso_login">SSO Login</MenuItem>
                                        <MenuItem value="export">Exportar</MenuItem>
                                        <MenuItem value="permission_change">Permissão</MenuItem>
                                    </Select>
                                </FormControl>
                                
                                <FormControl sx={{ minWidth: 120 }}>
                                    <InputLabel>Período</InputLabel>
                                    <Select
                                        value={dateRange}
                                        label="Período"
                                        onChange={(e) => setDateRange(e.target.value)}
                                    >
                                        <MenuItem value="1d">24 horas</MenuItem>
                                        <MenuItem value="7d">7 dias</MenuItem>
                                        <MenuItem value="30d">30 dias</MenuItem>
                                        <MenuItem value="90d">90 dias</MenuItem>
                                    </Select>
                                </FormControl>
                                
                                <Button variant="outlined" startIcon={<IconFilter />}>
                                    Mais Filtros
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                
                {/* Audit Logs Table */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Timestamp</TableCell>
                                            <TableCell>Usuário</TableCell>
                                            <TableCell>Ação</TableCell>
                                            <TableCell>Recurso</TableCell>
                                            <TableCell>Descrição</TableCell>
                                            <TableCell>Workspace</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Severidade</TableCell>
                                            <TableCell>IP</TableCell>
                                            <TableCell align="right">Ações</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {paginatedLogs.map((log) => (
                                            <TableRow key={log.id} hover>
                                                <TableCell>
                                                    <Typography variant="body2">
                                                        {formatDateTime(log.timestamp)}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Box>
                                                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                            {log.userName}
                                                        </Typography>
                                                        <Typography variant="caption" color="textSecondary">
                                                            {log.userEmail}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell>
                                                    <Stack direction="row" alignItems="center" spacing={1}>
                                                        {getActionIcon(log.action)}
                                                        <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                                                            {log.action.replace('_', ' ')}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip 
                                                        label={log.resourceType} 
                                                        size="small" 
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="body2" sx={{ maxWidth: 200 }}>
                                                        {log.description}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="body2">
                                                        {log.workspace}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Stack direction="row" alignItems="center" spacing={1}>
                                                        {getStatusIcon(log.status)}
                                                        <Chip 
                                                            label={log.status} 
                                                            size="small" 
                                                            color={getStatusColor(log.status)}
                                                        />
                                                    </Stack>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip 
                                                        label={log.severity} 
                                                        size="small" 
                                                        color={getSeverityColor(log.severity)}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                                                        {log.ipAddress}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <IconButton
                                                        onClick={(event) => handleMenuClick(event, log)}
                                                        size="small"
                                                    >
                                                        <IconDotsVertical size={18} />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            
                            <TablePagination
                                rowsPerPageOptions={[10, 20, 50, 100]}
                                component="div"
                                count={filteredLogs.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                labelRowsPerPage="Linhas por página:"
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            
            {/* Action Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleViewDetails}>
                    <IconEye size={16} style={{ marginRight: 8 }} />
                    Ver Detalhes
                </MenuItem>
                <MenuItem>
                    <IconUser size={16} style={{ marginRight: 8 }} />
                    Ver Usuário
                </MenuItem>
                <MenuItem>
                    <IconBuildingCommunity size={16} style={{ marginRight: 8 }} />
                    Ver Workspace
                </MenuItem>
                <Divider />
                <MenuItem>
                    <IconDownload size={16} style={{ marginRight: 8 }} />
                    Exportar Evento
                </MenuItem>
            </Menu>
        </Box>
    )
}

export default AuditLogsPage