/** @type {import('next').NextConfig} */
const nextConfig = {
    // https://firebasestorage.googleapis.com/v0/b/joblong-b7616.appspot.com/o/companies%2Famzon-1686574798358.jpg?alt=media&token=73ad2635-de72-4e2e-8435-bf574b7c50c0
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                // port: '6969',
                pathname: '/*/**',
            },
        ],
    },
};

module.exports = nextConfig;
