import dashboard from './dashboard'
import dashboardEnterprise from './dashboardEnterprise'

// Detectar se está em modo Enterprise
const isEnterprise = process.env.REACT_APP_PLATFORM_TYPE === 'ENTERPRISE' || 
                   process.env.NEXT_PUBLIC_PLATFORM_TYPE === 'enterprise' ||
                   window.localStorage?.getItem('platformType') === 'enterprise'

// ==============================|| DYNAMIC MENU ITEMS ||============================== //

export const menuItems = {
    items: isEnterprise ? [dashboardEnterprise] : [dashboard]
}

// Exportar para uso em outros componentes
export const isEnterpriseMode = isEnterprise

// Função para alternar entre modos (útil para desenvolvimento)
export const toggleEnterpriseMode = () => {
    if (typeof window !== 'undefined') {
        const currentMode = window.localStorage.getItem('platformType')
        const newMode = currentMode === 'enterprise' ? 'simple' : 'enterprise'
        window.localStorage.setItem('platformType', newMode)
        window.location.reload()
    }
}

// Exportar ambos os menus para uso manual se necessário
export { dashboard, dashboardEnterprise }

export default menuItems