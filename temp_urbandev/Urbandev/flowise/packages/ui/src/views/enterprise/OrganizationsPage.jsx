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
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Menu,
    MenuItem
} from '@mui/material'
import {
    IconBuildingCommunity,
    IconUsers,
    IconChartBar,
    IconCurrencyDollar,
    IconSearch,
    IconFilter,
    IconRefresh,
    IconPlus,
    IconDotsVertical,
    IconEdit,
    IconTrash,
    IconEye,
    IconSettings
} from '@tabler/icons-react'

// project imports
import MainCard from '@/ui-component/cards/MainCard'
import { gridSpacing } from '@/store/constant'

// ==============================|| ORGANIZATIONS MANAGEMENT PAGE ||============================== //

const OrganizationsPage = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    
    // Estados
    const [organizations, setOrganizations] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [anchorEl, setAnchorEl] = useState(null)
    const [selectedOrganization, setSelectedOrganization] = useState(null)
    
    // Dados mockados para demonstração
    const mockOrganizations = [
        {
            id: 1,
            name: 'Acme Corporation',
            domain: 'acme.com',
            type: 'enterprise',
            status: 'active',
            usersCount: 45,
            workspacesCount: 12,
            createdAt: '2024-01-15',
            subscription: 'premium',
            billingCycle: 'monthly'
        },
        {
            id: 2,
            name: 'Tech Solutions Ltd',
            domain: 'techsolutions.com',
            type: 'business',
            status: 'active',
            usersCount: 23,
            workspacesCount: 8,
            createdAt: '2024-02-20',
            subscription: 'professional',
            billingCycle: 'annual'
        },
        {
            id: 3,
            name: 'Startup Inc',
            domain: 'startup.io',
            type: 'startup',
            status: 'trial',
            usersCount: 8,
            workspacesCount: 3,
            createdAt: '2024-03-10',
            subscription: 'trial',
            billingCycle: 'monthly'
        }
    ]
    
    useEffect(() => {
        // Simular carregamento de dados
        const loadData = async () => {
            setLoading(true)
            setTimeout(() => {
                setOrganizations(mockOrganizations)
                setLoading(false)
            }, 1000)
        }
        loadData()
    }, [])
    
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
    
    const handleMenuClick = (event, organization) => {
        setAnchorEl(event.currentTarget)
        setSelectedOrganization(organization)
    }
    
    const handleMenuClose = () => {
        setAnchorEl(null)
        setSelectedOrganization(null)
    }
    
    const handleViewOrganization = () => {
        if (selectedOrganization) {
            navigate(`/organizations/${selectedOrganization.id}`)
        }
        handleMenuClose()
    }
    
    const handleEditOrganization = () => {
        if (selectedOrganization) {
            navigate(`/organizations/${selectedOrganization.id}/edit`)
        }
        handleMenuClose()
    }
    
    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'success'
            case 'trial': return 'warning'
            case 'suspended': return 'error'
            default: return 'default'
        }
    }
    
    const getSubscriptionColor = (subscription) => {
        switch (subscription) {
            case 'premium': return 'secondary'
            case 'professional': return 'primary'
            case 'trial': return 'warning'
            default: return 'default'
        }
    }
    
    const filteredOrganizations = organizations.filter(org =>
        org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.domain.toLowerCase().includes(searchTerm.toLowerCase())
    )
    
    const paginatedOrganizations = filteredOrganizations.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    )
    
    if (loading) {
        return (
            <Box sx={{ p: 3 }}>
                <LinearProgress />
                <Typography sx={{ mt: 2 }}>Carregando organizações...</Typography>
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
                                Organizações
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Gerencie todas as organizações da plataforma
                            </Typography>
                        </Box>
                        <Button
                            variant="contained"
                            startIcon={<IconPlus />}
                            onClick={() => navigate('/organizations/create')}
                        >
                            Nova Organização
                        </Button>
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
                                    <IconBuildingCommunity size={24} />
                                </Box>
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                                        {organizations.length}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Total Organizações
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
                                    <IconUsers size={24} />
                                </Box>
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                                        {organizations.reduce((sum, org) => sum + org.usersCount, 0)}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Total Usuários
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
                                    <IconChartBar size={24} />
                                </Box>
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                                        {organizations.reduce((sum, org) => sum + org.workspacesCount, 0)}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Total Workspaces
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
                                    backgroundColor: theme.palette.secondary.main + '15',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: theme.palette.secondary.main
                                }}>
                                    <IconCurrencyDollar size={24} />
                                </Box>
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                                        {organizations.filter(org => org.subscription === 'premium').length}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Premium
                                    </Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                
                {/* Search and Filters */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <TextField
                                    placeholder="Buscar organizações..."
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
                                <Button variant="outlined" startIcon={<IconFilter />}>
                                    Filtros
                                </Button>
                                <Button variant="outlined" startIcon={<IconRefresh />}>
                                    Atualizar
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                
                {/* Organizations Table */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Nome</TableCell>
                                            <TableCell>Domínio</TableCell>
                                            <TableCell>Tipo</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Usuários</TableCell>
                                            <TableCell>Workspaces</TableCell>
                                            <TableCell>Assinatura</TableCell>
                                            <TableCell>Criado em</TableCell>
                                            <TableCell align="right">Ações</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {paginatedOrganizations.map((organization) => (
                                            <TableRow key={organization.id} hover>
                                                <TableCell>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                        {organization.name}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>{organization.domain}</TableCell>
                                                <TableCell>
                                                    <Chip 
                                                        label={organization.type} 
                                                        size="small" 
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Chip 
                                                        label={organization.status} 
                                                        size="small" 
                                                        color={getStatusColor(organization.status)}
                                                    />
                                                </TableCell>
                                                <TableCell>{organization.usersCount}</TableCell>
                                                <TableCell>{organization.workspacesCount}</TableCell>
                                                <TableCell>
                                                    <Chip 
                                                        label={organization.subscription} 
                                                        size="small" 
                                                        color={getSubscriptionColor(organization.subscription)}
                                                    />
                                                </TableCell>
                                                <TableCell>{organization.createdAt}</TableCell>
                                                <TableCell align="right">
                                                    <IconButton
                                                        onClick={(event) => handleMenuClick(event, organization)}
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
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={filteredOrganizations.length}
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
                <MenuItem onClick={handleViewOrganization}>
                    <IconEye size={16} style={{ marginRight: 8 }} />
                    Visualizar
                </MenuItem>
                <MenuItem onClick={handleEditOrganization}>
                    <IconEdit size={16} style={{ marginRight: 8 }} />
                    Editar
                </MenuItem>
                <MenuItem>
                    <IconSettings size={16} style={{ marginRight: 8 }} />
                    Configurações
                </MenuItem>
                <MenuItem>
                    <IconChartBar size={16} style={{ marginRight: 8 }} />
                    Analytics
                </MenuItem>
                <MenuItem>
                    <IconCurrencyDollar size={16} style={{ marginRight: 8 }} />
                    Billing
                </MenuItem>
                <Divider />
                <MenuItem sx={{ color: 'error.main' }}>
                    <IconTrash size={16} style={{ marginRight: 8 }} />
                    Excluir
                </MenuItem>
            </Menu>
        </Box>
    )
}

export default OrganizationsPage