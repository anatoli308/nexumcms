export const dashboardDrawerWidth = 272;
export const dashboardTopbarHeight = 64;

export const dashboardBrand = {
    logoSrcLight: '/brand/nexum-logo-dark.png',
    logoSrcDark: '/brand/nexum-logo-light.png',
    markSrcLight: '/brand/nexum-monogram-dark.png',
    markSrcDark: '/brand/nexum-monogram-light.png',
    name: 'NEXUM CMS',
    environmentLabel: 'Starter'
};

export const dashboardNavigation = [
    { key: 'dashboard', label: 'Dashboard', icon: 'solar:widget-5-outline' },
    { key: 'content', label: 'Content', icon: 'solar:document-text-outline' },
    { key: 'media', label: 'Media', icon: 'solar:gallery-outline' },
    { key: 'workflow', label: 'Workflow', icon: 'mdi:source-branch' },
    { key: 'delivery', label: 'Delivery', icon: 'solar:plain-outline' },
    { key: 'iam', label: 'IAM', icon: 'solar:shield-user-outline' },
    { key: 'settings', label: 'Settings', icon: 'solar:settings-outline' }
];

export const dashboardTopActions = [
    { key: 'alerts', label: 'Alerts', icon: 'solar:bell-outline' },
    { key: 'inbox', label: 'Inbox', icon: 'solar:mailbox-outline' },
    { key: 'help', label: 'Help', icon: 'solar:question-circle-outline' }
];

export const dashboardViewsBySection = {
    dashboard: ['Overview', 'Activity'],
    content: ['Entries', 'Content Types'],
    media: ['Library', 'Metadata'],
    workflow: ['Approvals', 'Versions'],
    delivery: ['Channels', 'Publish Jobs'],
    iam: ['Users', 'Roles and Permissions'],
    settings: ['System', 'Integrations']
};

export const dashboardSectionMeta = {
    dashboard: {
        description: 'Enterprise shell with clear domain boundaries and a reusable workspace frame.',
        nextSlice: 'Create domain contracts for Content, Media, Workflow, Delivery, and IAM.'
    },
    content: {
        description: 'Model entries and content types with strict validation and reusable schemas.',
        nextSlice: 'Add ContentType and Entry services with DTO mapping and status transitions.'
    },
    media: {
        description: 'Manage assets centrally with metadata, references, and revision-aware updates.',
        nextSlice: 'Build MediaAsset service with usage tracking and rendition pipeline hooks.'
    },
    workflow: {
        description: 'Control review, approval, and publish flow through explicit state transitions.',
        nextSlice: 'Implement WorkflowDefinition, Task queue, and transition guard services.'
    },
    delivery: {
        description: 'Publish to channels with preview, scheduling, and delivery-safe orchestration.',
        nextSlice: 'Introduce DeliveryChannel and PublishJob services with retry-safe execution.'
    },
    iam: {
        description: 'Isolate identity, roles, permissions, and policy checks in one bounded domain.',
        nextSlice: 'Add Role, Permission, and policy evaluator services with audit logging.'
    },
    settings: {
        description: 'Centralize platform-level options, integrations, and operational configuration.',
        nextSlice: 'Add Settings service with revision history and environment-aware validation.'
    }
};

export const dashboardStats = [
    { label: 'Open Tasks', value: '12' },
    { label: 'Pending Approvals', value: '7' },
    { label: 'Domain Modules', value: '6' }
];

export const dashboardQuickActions = [
    {
        title: 'Define service boundaries',
        description: 'Lock domain boundaries before adding controllers or persistence details.',
        actionLabel: 'Plan'
    },
    {
        title: 'Connect UI module',
        description: 'Attach the selected section as its own workspace without changing shell behavior.',
        actionLabel: 'Open'
    },
    {
        title: 'Verify IAM and workflow',
        description: 'Ensure permissions and state transitions are considered before first endpoints.',
        actionLabel: 'Review'
    }
];

export const dashboardRecentActivity = [
    { title: 'Homepage spring campaign', detail: 'Updated 18 minutes ago' },
    { title: 'Career landing page', detail: 'Metadata and route updated' },
    { title: 'Product detail X200', detail: 'Asset references synchronized' },
    { title: 'Editor role profile', detail: 'Permission matrix drafted' }
];
