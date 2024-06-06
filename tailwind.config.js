/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            fontSize: '0.875rem',
            lineHeight: '1.25rem',
            maxWidth: '100ch',
            color: 'var(--tw-prose-body)',
            '[class~="lead"]': {
              color: 'var(--tw-prose-lead)',
              fontSize: '0.875rem',
              lineHeight: '1.25rem',
              marginTop: '0.375rem',
              marginBottom: '0.625rem'
            },

            a: {
              color: 'var(--tw-prose-links)',
              textDecoration: 'underline',
              fontWeight: '500'
            },
            strong: {
              color: 'var(--tw-prose-bold)',
              fontWeight: '600'
            },
            'a strong': {
              color: 'inherit'
            },
            'blockquote strong': {
              color: 'inherit'
            },

            'ol > li::marker': {
              fontWeight: '400',
              color: 'var(--tw-prose-counters)'
            },
            'ul > li::marker': {
              fontWeight: '400',
              color: 'var(--tw-prose-bullets)'
            },
            hr: {
              borderColor: 'var(--tw-prose-hr)',
              borderTopWidth: 1
            },
            blockquote: {
              fontWeight: '500',
              fontStyle: 'italic',
              color: 'var(--tw-prose-quotes)',
              borderLeftWidth: '0.25rem',
              borderLeftColor: 'var(--tw-prose-quote-borders)',
              quotes: '"\\201C""\\201D""\\2018""\\2019"'
            },
            'blockquote p:first-of-type::before': {
              content: 'open-quote'
            },
            'blockquote p:last-of-type::after': {
              content: 'close-quote'
            },

            h1: {
              color: 'var(--tw-prose-headings)',
              fontWeight: '600'
            },
            'h1 strong': {
              fontWeight: '600',
              color: 'inherit'
            },

            h2: {
              color: 'var(--tw-prose-headings)',
              fontWeight: '600'
            },
            'h2 strong': {
              fontWeight: '600',
              color: 'inherit'
            },

            h3: {
              color: 'var(--tw-prose-headings)',
              fontWeight: '600'
            },
            'h3 strong': {
              fontWeight: '600',
              color: 'inherit'
            },

            h4: {
              color: 'var(--tw-prose-headings)',
              fontWeight: '600'
            },
            'h4 strong': {
              fontWeight: '600',
              color: 'inherit'
            },

            p: {
              fontWeight: '400',
              color: 'var(--tw-prose-headings)'
            },
            'p strong': {
              fontWeight: '600',
              color: 'inherit'
            }
          }
        }
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        bounce: 'bounce 2s infinite',
      },
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
