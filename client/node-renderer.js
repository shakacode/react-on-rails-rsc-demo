const path = require('path');
const { reactOnRailsProNodeRenderer } = require('react-on-rails-pro-node-renderer');

const { env } = process;

const config = {
  serverBundleCachePath: path.resolve(__dirname, '../.node-renderer-bundles'),
  port: Number(env.RENDERER_PORT) || 3800,
  logLevel: env.RENDERER_LOG_LEVEL || 'info',

  // See value in /config/initializers/react_on_rails_pro.rb
  password: env.RENDERER_PASSWORD || 'devPassword',

  // Number of Node.js worker threads for SSR rendering
  // Set NODE_RENDERER_CONCURRENCY env var to override (e.g., for production tuning)
  workersCount: env.NODE_RENDERER_CONCURRENCY != null ? Number(env.NODE_RENDERER_CONCURRENCY) : 3,

  supportModules: true,
  additionalContext: { URL, AbortController },
  stubTimers: false,
  replayServerAsyncOperationLogs: true,
};

if (env.CI) {
  config.workersCount = 2;
}

reactOnRailsProNodeRenderer(config);
