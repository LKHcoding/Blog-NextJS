// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.NODE_ENV === 'production',
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = withBundleAnalyzer({
  compress: true,
  future: {
    webpack5: true,
  },
  webpack(config) {
    // console.log(config);
    let prod = process.env.NODE_ENV === 'production';
    return {
      ...config,
      mode: prod ? 'production' : 'development',
      devtool: prod ? 'hidden-source-map' : 'eval',
      plugins: [
        ...config.plugins,
        // 배포용일때만 추가
        process.env.NODE_ENV === 'production' && new CompressionPlugin(),
      ],
    };
  },
});
