'use strict';
const Gulp = require('gulp');
const Gutil = require('gulp-util');
const Webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let executionCount = 0;

Gulp.task('webpack', (callback) => {
/*
    const plugins = [
        new config.optimization.splitChunks({
            name: 'core',
            filename: '../core.min.js',
            minSize: 2
        }),
        new Webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': `"${process.env.NODE_ENV}"`
            }
        })
    ];
*/
    let devtool = 'source-map';

/*
    if (process.env.NODE_ENV === 'production') {
        plugins.push(new Webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        }));

        devtool = 'cheap-module-source-map';
    }
*/
    const config = {
        watch: global.isWatching,
        entry: './src/client/index.js',
        output: {
            path: path.resolve(__dirname,'./../dist/'),
            filename: 'bundle.js',
            sourceMapFilename: 'bundle.map.js',
        },
        resolve: {
            extensions: ['*', '.js', '.jsx']
        },
        module: {
            rules: [{
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                // query: {
                //     presets: ['react', 'es2015']
                // }
            }]
        },
        devtool,
        plugins: [new HtmlWebpackPlugin({
            hash: true,
            title: 'Find a Hafiz',
            template: './src/client/index.html'

        })]
    };

    Webpack(config, (err, stats) => {

        if (err) {
            throw new Gutil.PluginError('webpack', err);
        }

        Gutil.log('[webpack]', stats.toString({
            colors: true,
            chunkModules: false
        }));

        if (executionCount === 0) {
            callback();
        }

        executionCount += 1;
    });
});


