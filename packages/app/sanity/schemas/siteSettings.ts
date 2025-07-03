import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: () => '⚙️',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      initialValue: 'BeatsChain',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      initialValue: 'Decentralized marketplace for beat creators and artists',
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        defineField({
          name: 'twitter',
          title: 'Twitter/X',
          type: 'url',
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
        }),
        defineField({
          name: 'discord',
          title: 'Discord',
          type: 'url',
        }),
        defineField({
          name: 'telegram',
          title: 'Telegram',
          type: 'url',
        }),
      ],
    }),
    defineField({
      name: 'platformSettings',
      title: 'Platform Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'platformFee',
          title: 'Platform Fee (%)',
          type: 'number',
          validation: (Rule) => Rule.min(0).max(10),
          initialValue: 2.5,
        }),
        defineField({
          name: 'maxUploadSize',
          title: 'Max Upload Size (MB)',
          type: 'number',
          validation: (Rule) => Rule.min(1).max(100),
          initialValue: 50,
        }),
        defineField({
          name: 'allowedFileTypes',
          title: 'Allowed File Types',
          type: 'array',
          of: [{ type: 'string' }],
          initialValue: ['mp3', 'wav', 'flac'],
        }),
        defineField({
          name: 'featuredGenres',
          title: 'Featured Genres',
          type: 'array',
          of: [{ type: 'string' }],
          initialValue: ['Hip Hop', 'Trap', 'Amapiano', 'Afrobeats', 'House'],
        }),
        defineField({
          name: 'minimumPrice',
          title: 'Minimum Beat Price (ETH)',
          type: 'number',
          validation: (Rule) => Rule.min(0.001),
          initialValue: 0.001,
        }),
        defineField({
          name: 'maximumPrice',
          title: 'Maximum Beat Price (ETH)',
          type: 'number',
          validation: (Rule) => Rule.min(0.001),
          initialValue: 10.0,
        }),
        defineField({
          name: 'defaultRoyalty',
          title: 'Default Royalty (%)',
          type: 'number',
          validation: (Rule) => Rule.min(0).max(50),
          initialValue: 5,
        }),
      ],
    }),
    defineField({
      name: 'maintenanceMode',
      title: 'Maintenance Mode',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'registrationOpen',
      title: 'Registration Open',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: (Rule) => Rule.max(60),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          validation: (Rule) => Rule.max(160),
        }),
        defineField({
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
    defineField({
      name: 'analytics',
      title: 'Analytics',
      type: 'object',
      fields: [
        defineField({
          name: 'googleAnalyticsId',
          title: 'Google Analytics ID',
          type: 'string',
        }),
        defineField({
          name: 'facebookPixelId',
          title: 'Facebook Pixel ID',
          type: 'string',
        }),
        defineField({
          name: 'gtmId',
          title: 'Google Tag Manager ID',
          type: 'string',
          placeholder: 'GTM-XXXXXXX',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
        subtitle: 'Global site configuration',
      }
    },
  },
})