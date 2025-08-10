import React from 'react'

// Enhanced Dashboard (Simplificado)
import DashboardEnhanced from './DashboardEnhanced'

// Enterprise Dashboard
import DashboardEnterprise from './DashboardEnterprise'

// Importar utilitário de modo
import { isEnterpriseMode } from '@/menu-items'

// ==============================|| DYNAMIC DASHBOARD PAGE ||============================== //

const DashboardPage = () => {
    // Renderizar o dashboard apropriado baseado no modo
    return isEnterpriseMode ? <DashboardEnterprise /> : <DashboardEnhanced />
}

export default DashboardPage