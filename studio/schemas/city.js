export default {
    name: 'city',
    title: 'City',
    type: 'document',
    fields: [
        {
            name: 'city',
            title: 'City',
            type: 'string'
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'city',
                maxLength: 32,
            }
        },
        {
            name: 'population',
            title: 'Population',
            type: 'string'
        }
    ]
}