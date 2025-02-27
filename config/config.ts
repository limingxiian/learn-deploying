// config/config.ts
import { defineConfig } from 'umi';
import routes from './route.config';

export default defineConfig({
    alias: {
      '@': 'src', // 核心配置：@ 指向 src 目录
    },
    // 基础配置
    npmClient: 'yarn', // 包管理器 (npm/yarn/pnpm)
    publicPath: '/public/', // 静态资源路径
    outputPath: 'dist', // 构建输出目录

    // 路由配置
    routes,
  
    // 插件配置
    plugins: [
        '@umijs/plugins/dist/antd'
    ],

    antd: {
        // 以下是可选配置
        import: true,          // 自动按需引入 antd 组件
        style: 'less',         // 使用 less 作为样式预处理器（默认）
        dark: false,           // 关闭暗黑模式
        compact: false,        // 关闭紧凑主题
        configProvider: {},    // 可配置 Ant Design 的 ConfigProvider
        // theme: {               // 自定义主题变量
        //   'primary-color': '#1890ff',
        //   'border-radius-base': '4px',
        // },
    },

    vite: {
        esbuild: {
            // 启用实时 ESLint
            loader: 'tsx',
            include: ['src/**/*.ts', 'src/**/*.tsx']
        }
    },

    // 代理配置（开发环境）
    proxy: {
        '/api': {
            target: 'https://api.example.com',
            changeOrigin: true,
            pathRewrite: { '^/api': '' },
        }
    },

    // // 国际化配置
    // locale: {
    //     default: 'zh-CN',
    //     baseNavigator: true,
    // },

    // 主题配置
    theme: {
        '@primary-color': '#1890ff',
    },

    // 额外功能配置
    // dva: {}, // 启用 dva 状态管理
    // mfsu: { strategy: 'normal' }, // 启用 MFSU 加速
    // ssr: {}, // 服务端渲染配置
    title: 'Learn Umi', // 页面标题
    // dynamicImport: {}, // 按需加载
    // qiankun: {}, // 微前端配置
    // mock: {},  // Mock 配置

  // Webpack 定制
//   chainWebpack(config) {
//     config.resolve.alias.set('@components', '@/components');
//   },

    // 环境变量
    define: {
        'process.env.API_ENV': process.env.API_ENV || 'dev',
    }
});