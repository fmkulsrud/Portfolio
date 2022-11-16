export default {
    name: 'about',
    //name må ikke inholde capslocks
    title: 'About Me',
    //title kan inholde mellom rom, store bokstaver etc.
    type: 'document',
    fields: [
        {
            name: 'fullname',
            title: 'Full name',
            type: 'string',
        },
        {
            name: 'age',
            title: 'Age',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug', 
            type: 'slug',
            options: {
                source: 'fullname',
                maxLength: 32,
            }
        },
        {
            name: 'portrait',
            title: 'Portrait',
            type: 'image',
        },
        {
            name: 'bio',
            title: 'Biography',
            type: 'blockContent'
        }
    ]
}