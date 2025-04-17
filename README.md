<h1 align="center">
JDM 收據管理系統
</h1>

## 簡介
本專案參考 `admin3`，`admin3` 是一個基於 `Nuxt 3` 的後台管理模板，使用最新的`Nuxt 3`、`TypeScript`、`Vue 3`、`Pinia`、`Element-Plus`、`Unocss` 等主流技術。
**示範網址：:** [https://admin3.netlify.app/](https://admin3.netlify.app/)
**教學文件：:** [https://admin3.netlify.app/doc/guide](https://admin3.netlify.app/doc/guide)
**Github：** [https://github.com/vampirefan/admin3](https://github.com/vampirefan/admin3)
**Gitee：** [https://gitee.com/vampirefan/admin3](https://gitee.com/vampirefan/admin3)

## 環境架構
- Nuxt 3， `Node.js` 版本要 `>16.11`, 集成 `Vue 3`
- TypeScript, 擁抱 `any`, 用起來再說。
- pinia, 狀態管理
- vueuse, 可覆用的函數式模組
- eslint, ["@antfu/eslint-config"], 不必再配置 `prettier`

## UI 框架
- Element-Plus
- unocss, ["@unocss/nuxt"]
  - tailwind preset
  - iconify, ["@iconify-json/carbon", "@iconify-json/ep", "@iconify-json/logos", "@iconify-json/twemoji"]

# 建議 VSCode Plugins
- Vue - Official (vue 開發協助工具)
- ESLint (javascript 編輯風格檢查與自動排版)

## 開發
```sh
# 從 git 下載原始碼
clone
# 如果沒有開啟 yarn，請使用管理員模式運行以下命令以開啟使用 yarn (Node 版本需要先切換到 20.10.0)
corepack enable
# 安裝套件(在專案根資料夾下)
yarn install
# 啟動(在專案根資料夾下)
yarn dev
```

## node 版本管理 nvm
node 版本更迭迅速，所以安裝 nvm 以便於開發環境中用在來管理版本並快速切換
[安裝 nvm 環境，Node.js 開發者必學（Windows、Mac 均適用）](https://www.casper.tw/development/2022/01/10/install-nvm/)
```sh
# 查看可安裝版本
nvm list available
# 查看本機安裝狀態
nvm list
# 安裝指定版本
nvm install 20.10.0
# 切換至指定版本
nvm use 20.10.0
```
nvm 管理的 node 實際執行檔路徑會放在 C:\Users\<Username>\AppData\Roaming\nvm\v20.10.0\node.exe
