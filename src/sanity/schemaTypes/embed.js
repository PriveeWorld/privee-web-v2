import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'embed',
  title: 'Embed',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'URL or Embed Code',
      type: 'text',
      description: 'Paste the embed code or URL (supports YouTube, Vimeo, Instagram, Facebook, Twitter, Privee)',
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'YouTube', value: 'youtube'},
          {title: 'Vimeo', value: 'vimeo'},
          {title: 'Instagram', value: 'instagram'},
          {title: 'Facebook', value: 'facebook'},
          {title: 'Twitter', value: 'twitter'},
          {title: 'Privee', value: 'privee'},
        ],
      },
    }),
  ],
  preview: {
    select: {
      url: 'url',
      type: 'type',
    },
    prepare(selection) {
      const {url, type} = selection
      return {
        title: `${type || 'Embed'} - ${url?.substring(0, 50) || 'No URL'}...`,
      }
    },
  },
})
