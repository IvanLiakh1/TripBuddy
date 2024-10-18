import { defineConfig } from 'cypress';

import webpackConfig from './Config/webpack.config.js';

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {},
    },

    component: {
        devServer: {
            framework: 'react',
            bundler: 'webpack',
            webpackConfig: webpackConfig,
        },
    },
});
