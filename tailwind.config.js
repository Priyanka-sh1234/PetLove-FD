// tailwind.config.js
module.exports = {
  theme: {
    // extend: {
    //   colors: {
    //     'amber-400': '#fbbf24',
    //     'blue-500': '#3b82f6',
    //     'gray-500': '#6b7280',
    //   },
    //   animation: {
    //     'border-transition': 'borderTransition 5s infinite', // Apply border-transition animation
    //   },
    //   keyframes: {
    //     borderTransition: {
    //       '0%': { borderColor: '#fbbf24' }, // amber-400
    //       '33%': { borderColor: '#3b82f6' }, // blue-500
    //       '66%': { borderColor: '#6b7280' }, // gray-500
    //       '100%': { borderColor: '#fbbf24' }, // amber-400
    //     },
    //   },
    // },
    extend: {
      animation: {
        'fade-in-up': 'fadeInUp 0.9s ease-out',
        'slide-in-up': 'slideInUp 0.9s ease-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(40px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
    }
  },
  plugins: [],
}
