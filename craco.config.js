module.exports = {
  eslint: {
    configure: {
      rules: {
        'no-unused-vars': [
          1,
          {
            args: 'all',
            varsIgnorePattern: '^_',
            argsIgnorePattern: '^_',
            ignoreRestSiblings: true,
          },
        ],
      },
    },
  },
  webpack: {
    configure: {
      optimization: {
        runtimeChunk: true,
      },
    },
  },
  babel: {
    plugins: [
      [
        'babel-plugin-transform-imports',
        {
          '@material-ui/core': {
            transform: '@material-ui/core/esm/${member}',
            preventFullImport: true,
          },

          '@material-ui/icons': {
            transform: '@material-ui/icons/esm/${member}',
            preventFullImport: true,
          },
          '@material-ui/lab': {
            transform: '@material-ui/lab/esm/${member}',
            preventFullImport: true,
          },
        },
      ],
    ],
  },
}
