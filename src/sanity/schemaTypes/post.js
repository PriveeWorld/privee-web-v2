import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
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
                    name: 'hide',
                    type: 'boolean',
                    title: 'Hide on Mobile',
                    initialValue: true,
                  },
                ],
                icon: () => '📱',
              },
            ],
          },
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
            {
              name: 'photoCredit',
              type: 'string',
              title: 'Photo Credit',
            },
            {
              name: 'hideOnMobile',
              type: 'boolean',
              title: 'Hide on Mobile',
              description: 'Check this to hide image on mobile devices',
              initialValue: false,
            },
          ],
        },
        {
          type: 'embed',
        },
      ],
    }),
    defineField({
      name: 'enableHardcodedText',
      title: 'Enable Hardcoded Text',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'hardcodedText',
      title: 'Hardcoded Text',
      type: 'text',
      hidden: ({document}) => !document?.enableHardcodedText,
    }),
    defineField({
      name: 'appStoreUrl',
      title: 'App Store URL',
      type: 'url',
      hidden: ({document}) => !document?.enableHardcodedText,
    }),
    defineField({
      name: 'playStoreUrl',
      title: 'Play Store URL',
      type: 'url',
      hidden: ({document}) => !document?.enableHardcodedText,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'featuredImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
