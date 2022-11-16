export default {
    name: 'cv',
    title: 'CV',
    type: 'document',
    fields: [
        {
            name: 'employer',
            title: 'Employer',
            type: 'string',
        },
        {
            name: 'from',
            title: 'From',
            type: 'date',
        },
        {
            name: 'to',
            title: 'To',
            type: 'date',
        },
        {
            name: 'role',
            title: 'Role',
            type: 'string',
        },
        {
            name: 'active',
            title: 'Active',
            type: 'boolean',
        }
    ]
}