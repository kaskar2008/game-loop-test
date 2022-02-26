import vueJsx from '@vitejs/plugin-vue-jsx'

export default {
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  },
  plugins: [
    vueJsx(),
  ],
}
