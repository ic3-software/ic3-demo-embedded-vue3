import {fileURLToPath, URL} from 'node:url'

import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {

    const env = loadEnv(mode, process.cwd(), '');

    return {
        plugins: [
            vue(),
            vuetify({autoImport: true})
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        server: {
            proxy: {
                "/icCube": {
                    target: "https://livedemo.iccube.com/",
                    changeOrigin: true,
                    secure: false
                }
            }
        },
    }
})
