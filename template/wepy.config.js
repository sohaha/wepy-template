const path = require('path')
const LessPluginAutoPrefix = require('less-plugin-autoprefix')
var prod = process.env.NODE_ENV === 'production'

module.exports = {
  wpyExt: '.wpy',
  build: {
    web: {
      htmlTemplate: path.join('src', 'index.template.html'),
      htmlOutput: path.join('web', 'index.html'),
      jsOutput: path.join('web', 'index.js')
    }
  },
  resolve: {
    alias: {
      counter: path.join(__dirname, 'src/components/counter'),
      '@': path.join(__dirname, 'src')
    },
    modules: ['node_modules']
  },
  eslint: false,
  compilers: {
    less: {
      compress: true,
    },
    /*sass: {
      outputStyle: 'compressed'
    },*/
    babel: {
      sourceMap: true,
      presets: ['env'],
      plugins: [
        'transform-class-properties',
        'transform-decorators-legacy',
        'transform-object-rest-spread',
        'transform-export-extensions',
        'syntax-export-extensions',
      ]
    }
  },
  plugins: {},
  appConfig: {
    noPromiseAPI: ['createSelectorQuery']
  }
}

if (prod) {
  delete module.exports.compilers.babel.sourcesMap
  module.exports.compilers['less'] = { compress: true, plugins: [new LessPluginAutoPrefix({ browsers: ['ie > 8', 'Android >= 4.0', 'iOS >= 8', 'last 8 versions'] })] }
  module.exports.plugins = {
    uglifyjs: {
      filter: /\.js$/,
      config: {
        compress: {
          warnings: false,
          drop_console: true,
          collapse_vars: true,
          reduce_vars: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
          negate_iife: false
        }
      }
    },
    filemin: {
      filter: /\.(json|wxml|xml)$/
    },
    imagemin: {
      filter: /\.(jpg|png|jpeg)$/,
      config: {
        jpg: {
          quality: 80
        },
        png: {
          quality: 80
        }
      }
    }
  }
}
