# sillycode
npm install sass-loader node-sass -save-dev

build/webpack.base.conf.js中注释:
```
{
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter')
  }
},
```
package.json文件中将:
"lint": "eslint --ext .js,.vue src"
改为:
"lint": "eslint --fix --ext .js,.vue src"
