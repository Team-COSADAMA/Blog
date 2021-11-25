export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'COSADAMA Blog',
    htmlAttrs: {
      lang: 'ko'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'COSADAMA Blog: Welcome to CSDM Tech Blog!' },
      { name: 'format-detection', content: 'telephone=no' },
      // Twitter
      // Test on: https://cards-dev.twitter.com/validator
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      { hid: 'twitter:site', name: 'twitter:site', content: '@ChoPeniel' },
      {
        hid: 'twitter:url',
        name: 'twitter:url',
        content: 'https://www.blog.cosadama.com'
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'COSADAMA Blog'
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content:
          'COSADAMA Blog: Welcome to CSDM Tech Blog!'
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: 'https://www.blog.cosadama.com/not-yet-generated.png'
      },

      // Open Graph
      // Test on: https://developers.facebook.com/tools/debug/
      { hid: 'og:site_name', property: 'og:site_name', content: 'COSADAMA Blog' },
      { hid: 'og:type', property: 'og:type', content: 'Blog' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://www.blog.cosadama.com'
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'COSADAMA Blog'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'COSADAMA Blog: Welcome to CSDM Tech Blog!'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://www.blog.cosadama.com/not-yet-generated.png'
      },
      {
        hid: 'og:image:secure_url',
        property: 'og:image:secure_url',
        content: 'https://www.blog.cosadama.com/not-yet-generated.png'
      },
      {
        hid: 'og:image:alt',
        property: 'og:image:alt',
        content: 'COSADAMA Blog'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      {
        hid: 'canonical',
        rel: 'canonical',
        href: `https://www.blog.cosadama.com`
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    //https://github.com/dword-design/nuxt-content-git
    'nuxt-content-git',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
  ],

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
