import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(process.cwd(), 'src/styles')],
    },
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.join(process.cwd(), 'src'),
            '@components': path.join(process.cwd(), 'src/components'),
            '@styles': path.join(process.cwd(), 'src/styles'),
            '@utils': path.join(process.cwd(), 'src/utils'),
            '@hooks': path.join(process.cwd(), 'src/hooks'),
            '@types': path.join(process.cwd(), 'src/types'),
        }
        return config
    },
}

export default nextConfig
