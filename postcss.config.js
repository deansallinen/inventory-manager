const tailwindcss = require('tailwindcss');
const purgecss = require('postcss-purgecss');

module.exports = {
  plugins: [
    tailwindcss('./tailwind.config.js'),
    process.env.NODE_ENV === 'production' &&
      purgecss({
        content: ['./src/**/*.js'],
        css: ['./src/**/*.css'],
      }),
    require('autoprefixer'),
  ],
};
