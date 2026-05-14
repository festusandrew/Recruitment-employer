import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [
        // The React and Tailwind plugins are both required for Make, even if
        // Tailwind is not being actively used – do not remove them
        react(),
        tailwindcss(),
        {
            name: 'strip-version',
            resolveId(source, importer, options) {
                if (source.includes('@') && !source.startsWith('./') && !source.startsWith('../') && !source.startsWith('@/')) {
                    if (source.startsWith('@')) {
                        const secondAt = source.indexOf('@', 1);
                        if (secondAt !== -1) {
                            return this.resolve(source.substring(0, secondAt), importer, Object.assign({ skipSelf: true }, options));
                        }
                    } else {
                        const firstAt = source.indexOf('@');
                        if (firstAt !== -1) {
                            return this.resolve(source.substring(0, firstAt), importer, Object.assign({ skipSelf: true }, options));
                        }
                    }
                }
                return null;
            }
        }
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src/app'),
        },
    },
})
