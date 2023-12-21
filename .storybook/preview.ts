import type { Preview } from "@storybook/vue3";

// 引入重置样式
import "@/style/reset.scss";
// 导入公共样式
import "@/style/index.scss";
// 一定要在main.ts中导入tailwind.css，防止vite每次hmr都会请求src/style/index.scss整体css文件导致热更新慢的问题
import "@/style/tailwind.css";
import "element-plus/dist/index.css";
// 导入字体图标
import "@/assets/iconfont/iconfont.js";
import "@/assets/iconfont/iconfont.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
};

export default preview;
