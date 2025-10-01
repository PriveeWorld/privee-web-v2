import {defineType} from 'sanity'

export default defineType({
  name: 'textBlock',
  title: 'Text Block',
  type: 'block',
  of: [
    {
      type: 'block',
      marks: {
        annotations: [
          {
            name: 'hideOnMobile',
            type: 'object',
            title: 'Hide on Mobile',
            fields: [
              {
                name: 'enabled',
                type: 'boolean',
                title: 'Hide on Mobile',
                description: 'Hide this text on mobile devices',
              },
            ],
          },
        ],
      },
    },
  ],
})
