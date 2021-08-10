
```ts
ng add @ngneat/tailwind
i Using package manager: npm
√ Found compatible package version: @ngneat/tailwind@7.0.3.
√ Package information loaded.

The package @ngneat/tailwind@7.0.3 will be installed and executed.
Would you like to proceed? Yes
√ Package successfully installed.
"NgAdd" schema is using the keyword "id" which its support is deprecated. Use "$id" for schema ID.
? Would you like to enable Tailwind JIT (preview feature)? Yes
? Would you like to enable dark mode? media
? What @tailwindcss plugins do you want to enable? aspect-ratio, forms, line-clamp, typography
    ✅️ Added @tailwindcss/aspect-ratio@0.2.1
    ✅️ Added @tailwindcss/line-clamp@0.2.1
    ✅️ Added @tailwindcss/typography@0.4.1
    ✅️ Added tailwindcss@2.2.6
    ✅️ Added @tailwindcss/forms@0.3.3
    ✅️ Installed dependencies
CREATE tailwind.config.js (570 bytes)
UPDATE package.json (1366 bytes)
UPDATE src/styles.scss (1791 bytes)
√ Packages installed successfully.
```

- Next perform the below steps if you use a css pre-processor (https://tailwindcss.com/docs/using-with-preprocessors#using-sass-less-or-stylus)
- create `postcss.config.js` in the root folder
```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```


## Try if it is working
- `app.component.html`
```html
<button mat-raised-button class="mr-2">Basic</button>
```

- It didn't work out for me. Looks like we need something more if we selected scss for styling.
```sh
npm i @angular-builders/custom-webpack postcss-loader -D
```
- create a custom webpack.config.js file at root and include postcss-loader configuration in it.
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            ident: 'postcss',
            syntax: 'postcss-scss',
            plugins: [
              require('postcss-import'),
              require('tailwindcss'),
              require('autoprefixer'),
            ],
          },
        },
      },
    ],
  },
};
```
- Next update the angular.json to build using with custom webpack config
```sh
ng config projects.practice-material.architect.build.builder @angular-builders/custom-webpack:browser
ng config projects.practice-material.architect.build.options.customWebpackConfig.path webpack.config.js
ng config projects.practice-material.architect.serve.builder @angular-builders/custom-webpack:dev-server
ng config projects.practice-material.architect.serve.options.customWebpackConfig.path webpack.config.js
```

## Get Tailwind intellisence in vs code
- install the extension `Tailwind CSS Intellisence` by Brad Cornes

## Reference
> https://trungk18.com/experience/configure-tailwind-css-with-angular/angular
> https://github.com/ngneat/tailwind
> https://www.angularjswiki.com/angular/angular-tailwind-css/
