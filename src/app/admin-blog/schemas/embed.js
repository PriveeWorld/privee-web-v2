export default {
  name: 'embed',
  type: 'object',
  title: 'Embed',
  fields: [
    {
      name: 'type',
      type: 'string',
      title: 'Type',
      options: {
        list: [
          { title: 'Privee', value: 'privee' }
        ]
      }
    },
    {
      name: 'url',
      type: 'url',
      title: 'URL'
    }
  ]
} 