// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.NODE_ENV === 'production',
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = withBundleAnalyzer({
  compress: process.env.NODE_ENV === 'production',
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  webpack(config) {
    let isProd = process.env.NODE_ENV === 'production';
    let plugins = [...config.plugins];
    if (isProd) {
      plugins.push(new CompressionPlugin());
    }
    config.resolve.modules.push(__dirname);

    return {
      ...config,
      mode: isProd ? 'production' : 'development',
      // devtool: prod ? 'hidden-source-map' : 'eval',
      // devtool: prod ? 'hidden-source-map' : 'source-map',
      devtool: isProd ? 'hidden-source-map' : 'inline-source-map',
      plugins,
      // plugins: [
      //   ...config.plugins,
      //   // 배포용일때만 추가
      //   // process.env.NODE_ENV === 'production' && new CompressionPlugin(),
      // ],
    };
  },
});
