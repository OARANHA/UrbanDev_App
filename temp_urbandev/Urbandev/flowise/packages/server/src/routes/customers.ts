import { Router } from 'express'
import { body, param, query } from 'express-validator'
import * as Controller from '../controllers/customers/customer.controller'
import { validate } from '../middleware/validate'
import { checkAnyPermission, checkPermission } from '../enterprise/rbac/PermissionCheck'

const router = Router()

// Get all customers
router.get('/', checkAnyPermission('customers:view,customers:update,customers:stats'), Controller.getAllCustomers)

// Get customer by ID
router.get(
    '/:id',
    checkAnyPermission('customers:view,customers:update,customers:delete'),
    param('id').isUUID().withMessage('Invalid customer ID'),
    validate,
    Controller.getCustomer
)

// Get customer details
router.get(
    '/:id/details',
    checkAnyPermission('customers:view,customers:update,customers:stats'),
    param('id').isUUID().withMessage('Invalid customer ID'),
    validate,
    Controller.getCustomerDetails
)

// Get customer stats
router.get('/stats', checkPermission('customers:stats'), Controller.getCustomerStats)

// Create new customer
router.post(
    '/',
    checkPermission('customers:create'),
    body('name').notEmpty().withMessage('Customer name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('company').optional().isString(),
    body('phone').optional().isString(),
    body('website').optional().isURL().withMessage('Website must be a valid URL'),
    body('industry').optional().isString(),
    body('companySize').optional().isString(),
    body('subscriptionPlan').optional().isIn(['basic', 'professional', 'enterprise']),
    body('status').optional().isIn(['active', 'inactive', 'pending']),
    body('monthlyRevenue').optional().isFloat({ min: 0 }),
    body('projectsCount').optional().isInt({ min: 0 }),
    validate,
    Controller.createCustomer
)

// Update customer
router.put(
    '/:id',
    checkPermission('customers:update'),
    param('id').isUUID().withMessage('Invalid customer ID'),
    body('name').optional().notEmpty().withMessage('Customer name cannot be empty'),
    body('email').optional().isEmail().withMessage('Valid email is required'),
    body('company').optional().isString(),
    body('phone').optional().isString(),
    body('website').optional().isURL().withMessage('Website must be a valid URL'),
    body('industry').optional().isString(),
    body('companySize').optional().isString(),
    body('subscriptionPlan').optional().isIn(['basic', 'professional', 'enterprise']),
    body('status').optional().isIn(['active', 'inactive', 'pending']),
    body('monthlyRevenue').optional().isFloat({ min: 0 }),
    body('projectsCount').optional().isInt({ min: 0 }),
    validate,
    Controller.updateCustomer
)

// Delete customer
router.delete(
    '/:id',
    checkPermission('customers:delete'),
    param('id').isUUID().withMessage('Invalid customer ID'),
    validate,
    Controller.deleteCustomer
)

export default router