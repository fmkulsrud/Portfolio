export default {
    name: 'software',
    title: 'Software',
    type: 'document',
    fields: [
        {
            name: 'software',
            title: 'Software',
            type: 'string',
        },
        {
            name: 'slug',
            tilte: 'Slug',
            type: 'slug',
            options: {
                source: 'software'
            }
        }
    ]
}
