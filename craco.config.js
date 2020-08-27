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
  babel: {
    plugins: [
      [
        'babel-plugin-import',
        {
          libraryName: '@material-ui/core',
          libraryDirectory: 'esm',
          camel2DashComponentName: false,
        },
        'core',
      ],
      [
        'babel-plugin-import',
        {
          libraryName: '@material-ui/icons',
          libraryDirectory: 'esm',
          camel2DashComponentName: false,
        },
        'icons',
      ],
      [
        'babel-plugin-import',
        {
          libraryName: '@material-ui/lab',
          libraryDirectory: 'esm',
          camel2DashComponentName: false,
        },
        'lab',
      ],
      ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
    ],
  },
}
