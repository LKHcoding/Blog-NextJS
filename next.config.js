// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.NODE_ENV === 'production',
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = withBundleAnalyzer({
  compress: process.env.NODE_ENV === 'production',
  future: {
    webpack5: true,
  },
  webpack(config) {
    // console.log(config);
    let prod = process.env.NODE_ENV === 'production';
    let plugins = [...config.plugins];
    if (prod) {
      plugins.push(new CompressionPlugin());
    }

    return {
      ...config,
      mode: prod ? 'production' : 'development',
      // devtool: prod ? 'hidden-source-map' : 'eval',
      // devtool: prod ? 'hidden-source-map' : 'source-map',
      devtool: prod ? 'hidden-source-map' : 'inline-source-map',
      plugins,
      // plugins: [
      //   ...config.plugins,
      //   // 배포용일때만 추가
      //   // process.env.NODE_ENV === 'production' && new CompressionPlugin(),
      // ],
    };
  },
});
