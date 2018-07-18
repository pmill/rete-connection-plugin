let mix = require('laravel-mix');

mix.webpackConfig({
    output: {
        library: 'pmillRete',
        libraryTarget: 'var'
    },
});

mix
    .js('src/index.js', 'dist/index.js')
    .sourceMaps()
    .options({
        uglify: {
            uglifyOptions: {
                output: {
                    ascii_only: true,
                }
            }
        }
});