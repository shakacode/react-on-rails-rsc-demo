// React Server Components webpack configuration
// Creates the RSC bundle based on the server webpack config

const { default: serverWebpackConfig, extractLoader } = require('./serverWebpackConfig');

const configureRsc = () => {
  // Pass true to skip RSCWebpackPlugin — RSC bundle doesn't need it
  const rscConfig = serverWebpackConfig(true);

  // Rename entry to rsc-bundle
  const rscEntry = {
    'rsc-bundle': rscConfig.entry['server-bundle'],
  };
  rscConfig.entry = rscEntry;

  // Add RSC loader before the JS loader (babel-loader or swc-loader)
  const { rules } = rscConfig.module;
  rules.forEach((rule) => {
    if (Array.isArray(rule.use)) {
      const jsLoader = extractLoader(rule, 'babel-loader') || extractLoader(rule, 'swc-loader');
      if (jsLoader) {
        rule.use.push({
          loader: 'react-on-rails-rsc/WebpackLoader',
        });
      }
    }
  });

  // Add react-server condition for RSC-aware module resolution
  rscConfig.resolve = {
    ...rscConfig.resolve,
    conditionNames: ['react-server', '...'],
    alias: {
      ...rscConfig.resolve?.alias,
      'react-dom/server': false,
    },
  };

  rscConfig.output.filename = 'rsc-bundle.js';

  return rscConfig;
};

module.exports = configureRsc;
