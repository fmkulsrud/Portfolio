export default {
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'details',
            title: 'Details',
            type: 'blockContent',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 36,
            }
        },
        {
            name: 'heroimg',
            title: 'Hero image',
            type: 'image'
        }, 
        
        {
            name: 'shortProjectPitch',
            title: 'Short project pitch',
            type: 'blockContent'
        },
        
        // {
        //     name: 'tools',
        //     title: 'Tools',
        //     type: 'array',
        //     of: [
        //         {
        //             type: 'reference',
        //             to: [
        //                 {type: 'software'}
        //             ]
        //         }
        //     ]
        // },
        {
            name: 'role',
            title: 'Role',
            type: 'string',
        },
        {
            name: 'team',
            title: 'Project members',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [
                        {type:'projectmembers'}
                    ]
                }

            ]
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
            name: 'shortdescription',
            title: 'Brief',
            type: 'blockContent'
        },
        {
            name: 'problem',
            title: 'The Problem',
            type: 'blockContent'
        },
        {
            name: 'userReasearch',
            title: 'User Research',
            type: 'blockContent',
        },
        {
            name: 'researchimg',
            title: 'User reasearch image',
            type: 'image',
        },
        {
            name: 'comeptitor',
            title: 'Competitor analysis',
            type: 'blockContent',
        },
        {
            name: 'competitorimage',
            title: 'Competitor analysis images',
            type: 'array',
            of: [{type: 'image'}],
        },
        {
            name: 'targetGroupsContainer',
            title: 'Target groups',
            type: 'blockContent',
        },
        {
            name: 'personas',
            title: 'Personas',
            type: 'blockContent',
        },
        {
            name: 'personasGallery',
            title: 'Personas Images',
            type: 'array',
            of: [{type: 'image'}]
        },
        {
            name: 'findings',
            title: 'Findings',
            type: 'blockContent',
        },
        {
            name: 'findingsGallery',
            title: 'Findings gallery',
            type: 'array',
            of: [{type: 'image'}]
        },
        {
            name: 'userflow',
            title: 'User flow',
            type: 'blockContent',
        },
        {
            name: 'userflowImg',
            title: 'User flow image',
            type: 'image',
        },
        {
            name: 'informationarch',
            title: 'Information architecture',
            type: 'image',
        },
        {
            name: 'moodboard',
            title: 'Moodboard Content',
            type: 'blockContent',
        },
        {
            name: 'wireframeDescription',
            title: 'Short wireframe description',
            type: 'blockContent',
        },
        {
            name: 'wireframegallery',
            title: 'Wireframe Gallery',
            type: 'array',
            of: [{type:'image'}]
        },
        {
            name: 'styleContent',
            title: 'Style Content',
            type: 'blockContent',
        },
        {
            name: 'styleguide',
            title: 'Style guide',
            type: 'array',
            of: [{type:'image'}]
        },
        {
            name: 'icons',
            title: 'Icons Content',
            type: 'blockContent'
        },
        {
            name: 'iconsImg',
            title: 'Icons images',
            type: 'array',
            of: [{type:'image'}]
        },
        {
            name: 'hifiprototypeimg',
            title: 'Hi-fi prototype cover',
            type: 'image'
        },
        {
            name:'hifiprototype',
            title: 'Hi-fi prototype',
            type: 'blockContent',
        },
        {
            name: 'hifigallery',
            title: 'Hi-fi prototype gallery',
            type: 'array',
            of: [{type: 'image'}]
        },
        {
            name: 'usertesting',
            title: 'User testing results',
            type: 'blockContent',
        },
        {
            name: 'reflection',
            title: 'Your own reflection',
            type: 'blockContent',
        },
        {
            name: 'discoverFigma',
            title: 'Discover content',
            type: 'blockContent'
        },
        {
            name: 'figmalink',
            title: 'Figma link',
            type: 'string',
        }
       
    ]
}