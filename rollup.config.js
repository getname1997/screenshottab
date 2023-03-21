import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';
import terser from '@rollup/plugin-terser';
import strip from "@rollup/plugin-strip";
import image from '@rollup/plugin-image';
import alias from '@rollup/plugin-alias';
import copy from 'rollup-plugin-copy'
import path from "path";
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default {
    input: 'src/index.ts', // 打包入口
    output: { // 打包出口
        name: 'index',
        dir: 'dist',
        format: 'es',
    },
    plugins: [ // 打包插件
        resolve(), // 查找和打包node_modules中的第三方模块
        commonjs(), // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
        typescript(), // 解析TypeScript
        copy({
            targets: [
                { src: 'assets/*', dest: 'dist/assets' }
            ]
        }),
        image(),   // 解析图片
        terser(), // 压缩代码
        alias({
            entries: [{find: '@', replacement: path.resolve(__dirname, 'src')}]
        }),
        strip(),  // 去除console.log
    ]
};
