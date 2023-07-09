/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        swcPlugins: [
            ["next-superjson-plugin", {}]
        ]
    },
    images:{
        domains:[
            "avatars.githubusercontent.com",
            "lh3.googleusercontent.com"
        ]
    },typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
      }
}

module.exports = nextConfig
