const nextConfig = {
    distDir: 'build',

    async rewrites() {
        return [{
            source: "/api/:path*",
            destination: "https://gifexplorer-backend-nullptr.app.secoder.net/:path*",
        }];
    }
};

module.exports = nextConfig;