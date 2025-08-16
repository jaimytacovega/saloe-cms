import { defineConfig } from 'vite'
import jsconfigPaths from 'vite-jsconfig-paths'
import { getInputPaths, getPlugin, getURLPath } from 'saloe/vite'
import { isProdEnv } from 'saloe/util'


const inputPaths = await getInputPaths({
    sources: [
        'shared',
        'features',
    ],
    metaUrl: import.meta.url,
})

export default defineConfig({
    define: {
        __ENV__: `'${process.env.ENV}'`,
        __BUILD_TIME__: `'${new Date().toISOString()}'`,
        __APP_NAME__: `'saloe-cms'`,
    },
    plugins: [
        jsconfigPaths(),
        getPlugin(),
    ],
    build: {
        outDir: './dist',
        manifest: true,
        emptyOutDir: true,
        minify: isProdEnv({ env: process.env }),
        rollupOptions: {
            input: {
                ...inputPaths,
                // 'sw.worker': getURLPath({ metaUrl: import.meta.url, path: '/src/workers/service/ServiceWorker' }),
            },
            output: {
                entryFileNames: `[name].js`,
                chunkFileNames: `[name].js`,
                assetFileNames: `[name].[ext]`,
            },
        }
    },
})