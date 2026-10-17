# DeckCraft 首页 SEO 修改记录

日期：2026-10-17。以下修改已写入本地代码，尚未部署。

## 元信息与标题

- Title（47 字符）：DeckCraft: Free Online Slide Editor & Downloads
- Meta Description（147 字符）：Use DeckCraft to create slides online for free. Try the browser editor, download the Mac, Windows or Linux app, and learn to edit PowerPoint files.
- H1：DeckCraft slides, create online for free.

## 报告问题对应处理

- Description 过长：从 182 字符缩至 147 字符，移除支持邮箱，将空间用于说明在线编辑、下载与 PowerPoint 文件用途。支持联系方式仍在页脚。
- 需求承接：在首页加入真正的 WebAssembly 编辑器，支持启动空白或示例演示文稿。首屏及页尾主要按钮改为本页 #editor 锚点。编辑器点击后加载，提供启动状态、慢加载反馈、WebGL 兼容模式与独立编辑页入口。
- 长尾表达：在 H2、首屏、介绍、使用步骤与 FAQ 自然使用 DeckCraft online editor、DeckCraft slides、DeckCraft desktop app。保留有意义的段落，不删正常语法词，也不强行重复五词短语。词频榜位置不是交付或排名保证。

## 实际替换的英文正文

### `dc.hero.description`

Create slides with the DeckCraft online editor below, or download the free, open-source desktop app for Mac, Windows, and Linux.

### `dc.about.p2`

The DeckCraft online editor puts slide thumbnails on the left, a canvas in the middle, and formatting tools within reach. If you know PowerPoint, Keynote, or Google Slides, the workspace should feel familiar. Start with a sample presentation on this page, or create a blank deck and build your own story. The source code is open to read, build, and improve, with no subscription required.

### `dc.about.online.title`

DeckCraft online editor and desktop app

### `dc.about.online.body`

Use the DeckCraft online editor on this page without an account or installer. The browser runs the real open-source WebAssembly build, with WebGPU or WebGL2 support. Open presentations from your device and save your work before leaving. For longer editing sessions, the DeckCraft desktop app offers a universal Mac build, Windows installers and portable downloads, plus AppImage, .deb, and .rpm packages for Linux.

### `dc.about.pptx.title`

Edit PowerPoint files with DeckCraft

### `dc.about.who.body`

Use DeckCraft slides for class projects, teaching materials, project updates, and talks. Students can build a presentation without buying another subscription. Teachers can prepare lesson slides on a school laptop. Linux users can choose a native app, while developers can inspect the source. Try your own workflow with a small deck first, especially when exchanging files with PowerPoint users.

### `dc.howto.open.body`

Start the DeckCraft online editor on this page. Choose a blank presentation or the sample deck, then use the editor to open an existing file from your computer.

### `dc.faq.browser.a`

Start the DeckCraft online editor directly on this page by choosing a blank presentation or a sample deck. It runs the actual open-source WebAssembly build, rather than a screenshot or demo animation. Open files from your device and save or export them back to it. A modern desktop browser with WebGPU or WebGL2 works best; the first launch downloads the app.

### `dc.inline.title`

Try the _DeckCraft online editor_

### `dc.inline.body`

Create DeckCraft slides here without leaving the page. Start a blank presentation or explore the sample deck, then open, edit, and save files using the editor toolbar.

### `dc.inline.note`

No account required. Files stay on your device. Save before closing this page. A desktop browser works best.

## 保留与验证

- 保留自引用 canonical、hreflang、Open Graph、Twitter 卡片、图片属性以及 WebSite / SoftwareApplication / HowTo / FAQPage JSON-LD。HowTo 与 FAQ 自动引用同步后的文案。
- 浏览器测得英文全页 DOM 文案约 1,372 词（包括折叠内容和页脚）。不同体检工具对可见文本和词语的切分可能不同。
- pnpm build 和 pnpm exec tsc --noEmit 均通过。已确认首页点击后生成真实编辑器 canvas，地址仍为 /。
- 本记录不代表 Google 排名或体检工具复评分数。Google 建议标题清晰、简洁，并避免关键词堆砌：https://developers.google.com/search/docs/appearance/title-link
