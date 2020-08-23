import path from 'path';
import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: `${pkg.directories.dist}/${pkg.name}.cjs.js`,
      format: 'cjs',
      banner: `/* === Version: ${pkg.version} === */`,
    },
    {
      file: `${pkg.directories.dist}/${pkg.name}.es.js`,
      format: 'es',
      banner: `/* === Version: ${pkg.version} === */`,
    },
    {
      name: 'Tezize',
      file: `${pkg.directories.dist}/${pkg.name}.min.js`,
      format: 'iife',
      plugins: [terser()],
      compact: true,
      banner: `/* === Version: ${pkg.version} === */`,
      globals: { crypto: 'crypto', buffer: 'buffer' },
    },
  ],
  watch: {
    include: ['src/**'],
    exclude: ['node_modules/**'],
  },
  plugins: [
    resolve({ preferBuiltins: true, browser: true }),
    commonjs(),
    babel({ babelHelpers: 'bundled' }),
    globals({ buffer: true }),
    builtins(),
    typescript({
      tsconfig: path.resolve(__dirname, './tsconfig.json'),
      useTsconfigDeclarationDir: true,
    }),
  ],
};
