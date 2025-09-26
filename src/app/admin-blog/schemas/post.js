export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}]
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime'
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block'
        },
        {
          type: 'image',
          fields: [
            {
              type: 'text',
              name: 'alt',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility.',
              options: {
                isHighlighted: true
              }
            }
          ]
        },
        {
          type: 'embed'
        }
      ]
    },
    {
      name: 'enableHardcodedText',
      title: 'Enable Hardcoded Text',
      type: 'boolean',
      description: 'Toggle to show/hide hardcoded text on this blog post',
      initialValue: false
    },
    {
      name: 'appStoreUrl',
      title: 'App Store URL',
      type: 'url',
      description: 'Custom App Store download URL for this blog post',
      hidden: ({ parent }) => !parent?.enableHardcodedText
    },
    {
      name: 'playStoreUrl',
      title: 'Play Store URL',
      type: 'url',
      description: 'Custom Google Play Store download URL for this blog post',
      hidden: ({ parent }) => !parent?.enableHardcodedText
    },
    {
      name: 'hardcodedText',
      title: 'Hardcoded Text',
      type: 'array',
      of: [
        {
          type: 'block'
        },
        {
          type: 'image',
          fields: [
            {
              type: 'text',
              name: 'alt',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility.',
              options: {
                isHighlighted: true
              }
            }
          ]
        },
        {
          type: 'embed'
        }
      ],
      description: 'Custom content that will be displayed on this blog post (only shown if enabled above)',
      hidden: ({ parent }) => !parent?.enableHardcodedText,
      initialValue: [
        {
          _type: 'block',
          _key: 'default-text',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'default-text-span',
              text: 'SportSport je na PRIVEE WORLD!\n\nSportSport – najposjećeniji sportski portal i najčitaniji sportski medij u BiH – sada živi i na društvenoj mreži Privee World.\n\nUvijek prvi u trendovima, SportSport vam je sada još bliži! Od ekskluzivnih objava, svježih sportskih priča, do trenutaka koje ne želite propustiti – sve vas čeka na Priveeu.\n\nPrivee World je nova društvena mreža za one koji žele više od običnog skrolanja. Ovdje gledate i kreirate video priče na potpuno drugačiji način – privatno, emotivno i cinematično.\n\nPreuzmite aplikaciju besplatno i uživajte bez ograničenja, a ako odlučite da dijelite svoje sportske priče, ili kreirate svoje životne priče SportSport vas nagrađuje doživotnim (life-time) upgradeom na Priveeu.\n\nPreuzmite aplikaciju ovdje i uđite u svijet gdje sport dobija svoju novu dimenziju!',
              marks: []
            }
          ],
          markDefs: []
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'featuredImage'
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    }
  }
}