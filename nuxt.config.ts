// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    strict: true
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Gims',
      meta: [
        {
          name: 'Gims',
          content: 'Gims'
        }
      ],

      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap'
        }
      ],
      bodyAttrs: {
        class: 'cloudedvoy-ui'
      }
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' }
  },
  modules: ['@nuxtjs/apollo', 'nuxt-vuefire', '@nuxtjs/tailwindcss'],
  tailwindcss: {
    // Options
  },
  ssr: false,
  components: [
    {
      global: true,
      path: '~/components',
      extensions: ['.vue'],
      pathPrefix: false
    }
  ],
  vuefire: {
    // debug: process.env.NODE_ENV !== 'production',
    // isTokenAutoRefreshEnabled: true,
    auth: {
      enabled: true
    },
    config: {
      apiKey: 'AIzaSyAXma9S9x19lXpu9GpYvHtqHt5zVNeUmTE',
      authDomain: 'gims-51260.firebaseapp.com',
      projectId: 'gims-51260',
      storageBucket: 'gims-51260.appspot.com',
      messagingSenderId: '785581755519',
      appId: '1:785581755519:web:038b2279e6fbf7d6dc434a'
    }
  }
})
