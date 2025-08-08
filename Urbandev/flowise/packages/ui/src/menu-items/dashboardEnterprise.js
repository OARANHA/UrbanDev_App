// assets
import {
    IconChartHistogram,
    IconList,
    IconUsersGroup,
    IconHierarchy,
    IconBuildingStore,
    IconKey,
    IconTool,
    IconLock,
    IconRobot,
    IconSettings,
    IconVariable,
    IconFiles,
    IconTestPipe,
    IconMicroscope,
    IconDatabase,
    IconUserEdit,
    IconFileUpload,
    IconClipboardList,
    IconStack2,
    IconUsers,
    IconLockCheck,
    IconFileDatabase,
    IconShieldLock,
    IconListCheck,
    IconWorld,
    IconBuildingCommunity,
    IconUserShield,
    IconActivity,
    IconReport,
    IconChartBar,
    IconCurrencyDollar,
    IconServer,
    IconDashboard,
    IconAlertCircle,
    IconDeviceDesktopAnalytics,
    IconBrandGoogle,
    IconBrandGithub,
    IconBrandAzure,
    IconCloud,
    IconScale,
    IconGauge,
    IconNetwork
} from '@tabler/icons-react'

// constant
const icons = {
    IconChartHistogram,
    IconHierarchy,
    IconUsersGroup,
    IconBuildingStore,
    IconList,
    IconKey,
    IconTool,
    IconLock,
    IconRobot,
    IconSettings,
    IconVariable,
    IconFiles,
    IconTestPipe,
    IconMicroscope,
    IconDatabase,
    IconUserEdit,
    IconChartHistogram,
    IconFileUpload,
    IconClipboardList,
    IconStack2,
    IconUsers,
    IconLockCheck,
    IconFileDatabase,
    IconShieldLock,
    IconListCheck,
    IconWorld,
    IconBuildingCommunity,
    IconUserShield,
    IconActivity,
    IconReport,
    IconChartBar,
    IconCurrencyDollar,
    IconServer,
    IconDashboard,
    IconAlertCircle,
    IconDeviceDesktopAnalytics,
    IconBrandGoogle,
    IconBrandGithub,
    IconBrandAzure,
    IconCloud,
    IconScale,
    IconGauge,
    IconNetwork
}

// ==============================|| ENTERPRISE DASHBOARD MENU ITEMS ||============================== //

const dashboardEnterprise = {
    id: 'dashboard-enterprise',
    title: '',
    type: 'group',
    children: [
        {
            id: 'dashboard-enterprise',
            title: 'Dashboard Enterprise',
            type: 'item',
            url: '/dashboard-enterprise',
            icon: icons.IconDashboard,
            breadcrumbs: true,
            permission: 'dashboard:view'
        },
        {
            id: 'enterprise-overview',
            title: '',
            type: 'group',
            children: [
                {
                    id: 'chatflows',
                    title: 'Chatflows',
                    type: 'item',
                    url: '/chatflows',
                    icon: icons.IconHierarchy,
                    breadcrumbs: true,
                    permission: 'chatflows:view'
                },
                {
                    id: 'agentflows',
                    title: 'Agentflows',
                    type: 'item',
                    url: '/agentflows',
                    icon: icons.IconUsersGroup,
                    breadcrumbs: true,
                    permission: 'agentflows:view'
                },
                {
                    id: 'assistants',
                    title: 'Assistants',
                    type: 'item',
                    url: '/assistants',
                    icon: icons.IconRobot,
                    breadcrumbs: true,
                    permission: 'assistants:view'
                },
                {
                    id: 'executions',
                    title: 'Executions',
                    type: 'item',
                    url: '/executions',
                    icon: icons.IconListCheck,
                    breadcrumbs: true,
                    permission: 'executions:view'
                }
            ]
        },
        {
            id: 'enterprise-workspaces',
            title: 'Workspace Management',
            type: 'group',
            children: [
                {
                    id: 'workspaces',
                    title: 'Workspaces',
                    type: 'item',
                    url: '/workspaces',
                    icon: icons.IconStack2,
                    breadcrumbs: true,
                    permission: 'workspace:view'
                },
                {
                    id: 'workspace-analytics',
                    title: 'Workspace Analytics',
                    type: 'item',
                    url: '/workspace-analytics',
                    icon: icons.IconDeviceDesktopAnalytics,
                    breadcrumbs: true,
                    permission: 'workspace:analytics'
                },
                {
                    id: 'workspace-reports',
                    title: 'Workspace Reports',
                    type: 'item',
                    url: '/workspace-reports',
                    icon: icons.IconReport,
                    breadcrumbs: true,
                    permission: 'workspace:reports'
                }
            ]
        },
        {
            id: 'enterprise-organizations',
            title: 'Organization Management',
            type: 'group',
            children: [
                {
                    id: 'organizations',
                    title: 'Organizations',
                    type: 'item',
                    url: '/organizations',
                    icon: icons.IconBuildingCommunity,
                    breadcrumbs: true,
                    permission: 'organization:view'
                },
                {
                    id: 'organization-analytics',
                    title: 'Organization Analytics',
                    type: 'item',
                    url: '/organization-analytics',
                    icon: icons.IconChartBar,
                    breadcrumbs: true,
                    permission: 'organization:analytics'
                },
                {
                    id: 'organization-billing',
                    title: 'Billing & Subscriptions',
                    type: 'item',
                    url: '/organization-billing',
                    icon: icons.IconCurrencyDollar,
                    breadcrumbs: true,
                    permission: 'organization:billing'
                }
            ]
        },
        {
            id: 'enterprise-users',
            title: 'User & Access Management',
            type: 'group',
            children: [
                {
                    id: 'users',
                    title: 'Users',
                    type: 'item',
                    url: '/users',
                    icon: icons.IconUsers,
                    breadcrumbs: true,
                    permission: 'users:manage'
                },
                {
                    id: 'roles',
                    title: 'Roles & Permissions',
                    type: 'item',
                    url: '/roles',
                    icon: icons.IconUserShield,
                    breadcrumbs: true,
                    permission: 'roles:manage'
                },
                {
                    id: 'user-activity',
                    title: 'User Activity',
                    type: 'item',
                    url: '/user-activity',
                    icon: icons.IconActivity,
                    breadcrumbs: true,
                    permission: 'users:activity'
                }
            ]
        },
        {
            id: 'enterprise-security',
            title: 'Security & Compliance',
            type: 'group',
            children: [
                {
                    id: 'sso-config',
                    title: 'SSO Configuration',
                    type: 'item',
                    url: '/sso-config',
                    icon: icons.IconShieldLock,
                    breadcrumbs: true,
                    permission: 'sso:manage'
                },
                {
                    id: 'sso-providers',
                    title: 'SSO Providers',
                    type: 'item',
                    url: '/sso-providers',
                    icon: icons.IconWorld,
                    breadcrumbs: true,
                    permission: 'sso:providers'
                },
                {
                    id: 'login-activity',
                    title: 'Login Activity',
                    type: 'item',
                    url: '/login-activity',
                    icon: icons.IconClipboardList,
                    breadcrumbs: true,
                    permission: 'loginActivity:view'
                },
                {
                    id: 'audit-logs',
                    title: 'Audit Logs',
                    type: 'item',
                    url: '/audit-logs',
                    icon: icons.IconReport,
                    breadcrumbs: true,
                    permission: 'audit:view'
                },
                {
                    id: 'security-events',
                    title: 'Security Events',
                    type: 'item',
                    url: '/security-events',
                    icon: icons.IconAlertCircle,
                    breadcrumbs: true,
                    permission: 'security:view'
                }
            ]
        },
        {
            id: 'enterprise-tools',
            title: 'Tools & Resources',
            type: 'group',
            children: [
                {
                    id: 'marketplaces',
                    title: 'Marketplaces',
                    type: 'item',
                    url: '/marketplaces',
                    icon: icons.IconBuildingStore,
                    breadcrumbs: true,
                    permission: 'templates:marketplace,templates:custom'
                },
                {
                    id: 'tools',
                    title: 'Tools',
                    type: 'item',
                    url: '/tools',
                    icon: icons.IconTool,
                    breadcrumbs: true,
                    permission: 'tools:view'
                },
                {
                    id: 'credentials',
                    title: 'Credentials',
                    type: 'item',
                    url: '/credentials',
                    icon: icons.IconLock,
                    breadcrumbs: true,
                    permission: 'credentials:view'
                },
                {
                    id: 'variables',
                    title: 'Variables',
                    type: 'item',
                    url: '/variables',
                    icon: icons.IconVariable,
                    breadcrumbs: true,
                    permission: 'variables:view'
                },
                {
                    id: 'apikey',
                    title: 'API Keys',
                    type: 'item',
                    url: '/apikey',
                    icon: icons.IconKey,
                    breadcrumbs: true,
                    permission: 'apikeys:view'
                },
                {
                    id: 'document-stores',
                    title: 'Document Stores',
                    type: 'item',
                    url: '/document-stores',
                    icon: icons.IconFiles,
                    breadcrumbs: true,
                    permission: 'documentStores:view'
                }
            ]
        },
        {
            id: 'enterprise-analytics',
            title: 'Analytics & Intelligence',
            type: 'group',
            children: [
                {
                    id: 'enterprise-analytics',
                    title: 'Enterprise Analytics',
                    type: 'item',
                    url: '/enterprise-analytics',
                    icon: icons.IconChartBar,
                    breadcrumbs: true,
                    permission: 'analytics:view'
                },
                {
                    id: 'business-intelligence',
                    title: 'Business Intelligence',
                    type: 'item',
                    url: '/business-intelligence',
                    icon: icons.IconDeviceDesktopAnalytics,
                    breadcrumbs: true,
                    permission: 'bi:view'
                },
                {
                    id: 'datasets',
                    title: 'Datasets',
                    type: 'item',
                    url: '/datasets',
                    icon: icons.IconDatabase,
                    breadcrumbs: true,
                    display: 'feat:datasets',
                    permission: 'datasets:view'
                },
                {
                    id: 'evaluators',
                    title: 'Evaluators',
                    type: 'item',
                    url: '/evaluators',
                    icon: icons.IconTestPipe,
                    breadcrumbs: true,
                    display: 'feat:evaluators',
                    permission: 'evaluators:view'
                },
                {
                    id: 'evaluations',
                    title: 'Evaluations',
                    type: 'item',
                    url: '/evaluations',
                    icon: icons.IconMicroscope,
                    breadcrumbs: true,
                    display: 'feat:evaluations',
                    permission: 'evaluations:view'
                }
            ]
        },
        {
            id: 'enterprise-system',
            title: 'System & Monitoring',
            type: 'group',
            children: [
                {
                    id: 'system-health',
                    title: 'System Health',
                    type: 'item',
                    url: '/system-health',
                    icon: icons.IconGauge,
                    breadcrumbs: true,
                    permission: 'system:health'
                },
                {
                    id: 'system-metrics',
                    title: 'System Metrics',
                    type: 'item',
                    url: '/system-metrics',
                    icon: icons.IconChartHistogram,
                    breadcrumbs: true,
                    permission: 'system:metrics'
                },
                {
                    id: 'resource-usage',
                    title: 'Resource Usage',
                    type: 'item',
                    url: '/resource-usage',
                    icon: icons.IconServer,
                    breadcrumbs: true,
                    permission: 'system:resources'
                },
                {
                    id: 'logs',
                    title: 'System Logs',
                    type: 'item',
                    url: '/logs',
                    icon: icons.IconList,
                    breadcrumbs: true,
                    display: 'feat:logs',
                    permission: 'logs:view'
                },
                {
                    id: 'network-monitor',
                    title: 'Network Monitor',
                    type: 'item',
                    url: '/network-monitor',
                    icon: icons.IconNetwork,
                    breadcrumbs: true,
                    permission: 'system:network'
                }
            ]
        },
        {
            id: 'enterprise-compliance',
            title: 'Compliance & Governance',
            type: 'group',
            children: [
                {
                    id: 'compliance-dashboard',
                    title: 'Compliance Dashboard',
                    type: 'item',
                    url: '/compliance-dashboard',
                    icon: icons.IconScale,
                    breadcrumbs: true,
                    permission: 'compliance:view'
                },
                {
                    id: 'data-governance',
                    title: 'Data Governance',
                    type: 'item',
                    url: '/data-governance',
                    icon: icons.IconDatabase,
                    breadcrumbs: true,
                    permission: 'governance:view'
                },
                {
                    id: 'audit-reports',
                    title: 'Audit Reports',
                    type: 'item',
                    url: '/audit-reports',
                    icon: icons.IconReport,
                    breadcrumbs: true,
                    permission: 'audit:reports'
                },
                {
                    id: 'risk-assessment',
                    title: 'Risk Assessment',
                    type: 'item',
                    url: '/risk-assessment',
                    icon: icons.IconAlertCircle,
                    breadcrumbs: true,
                    permission: 'risk:view'
                }
            ]
        },
        {
            id: 'enterprise-settings',
            title: 'Settings & Configuration',
            type: 'group',
            children: [
                {
                    id: 'enterprise-settings',
                    title: 'Enterprise Settings',
                    type: 'item',
                    url: '/enterprise-settings',
                    icon: icons.IconSettings,
                    breadcrumbs: true,
                    permission: 'settings:enterprise'
                },
                {
                    id: 'account',
                    title: 'Account Settings',
                    type: 'item',
                    url: '/account',
                    icon: icons.IconUserEdit,
                    breadcrumbs: true,
                    display: 'feat:account'
                },
                {
                    id: 'notifications',
                    title: 'Notifications',
                    type: 'item',
                    url: '/notifications',
                    icon: icons.IconAlertCircle,
                    breadcrumbs: true,
                    permission: 'notifications:manage'
                },
                {
                    id: 'integrations',
                    title: 'Integrations',
                    type: 'item',
                    url: '/integrations',
                    icon: icons.IconCloud,
                    breadcrumbs: true,
                    permission: 'integrations:manage'
                }
            ]
        }
    ]
}

export default dashboardEnterprise