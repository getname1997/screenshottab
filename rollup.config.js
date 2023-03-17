import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';
import terser  from '@rollup/plugin-terser';
import strip from "@rollup/plugin-strip";
import image from '@rollup/plugin-image';
import path from "path";
export default {
    input: 'src/index.ts', // 打包入口
    output: { // 打包出口
        dir: 'dist',
        format: 'es',
    },
    plugins: [ // 打包插件
        resolve(), // 查找和打包node_modules中的第三方模块
        commonjs(), // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
        typescript(), // 解析TypeScript
        terser(),
        image(),
        // strip(),
    ]
};
