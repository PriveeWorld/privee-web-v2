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
          { title: 'Privee', value: 'privee' },
          { title: 'YouTube', value: 'youtube' },
          { title: 'Vimeo', value: 'vimeo' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'Twitter/X', value: 'twitter' }
        ]
      }
    },
    {
      name: 'url',
      type: 'string',
      title: 'URL or Embed Code',
      description: 'Paste either the URL or the full iframe embed code',
      validation: Rule => Rule.custom((value) => {
        if (!value) return true; // Allow empty values
        
        // Check if it's an iframe code
        if (value.includes('<iframe') && value.includes('src="')) {
          const srcMatch = value.match(/src="([^"]+)"/);
          if (srcMatch && srcMatch[1]) {
            try {
              new URL(srcMatch[1]);
              return true;
            } catch (e) {
              return 'Invalid URL in iframe code';
            }
          }
          return 'Invalid iframe code format';
        }
        
        // Check if it's a direct URL
        try {
          new URL(value);
          return true;
        } catch (e) {
          return 'Please enter a valid URL or iframe embed code';
        }
      })
    }
  ]
} 