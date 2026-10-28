# 彩票选号助手（colourtickchoosetool）

原生微信小程序合规 MVP，使用 WXML/WXSS/JavaScript，无 npm、无后端。

## 产品合规说明

未成年人勿用、理性购彩；首次进入须勾选成年及同意须知。筛号≠预测、中奖属偶然、不提升中奖概率。AI 辅助仅指本地规则筛选及随机组合，不提供开奖预测或概率提升。禁止代售：不售票、不代购、不支付、不出票、不承诺中奖。购彩仅引导官方线下网点或官方渠道；中国福彩网仅作官方信息了解指引。复制内容带免责水印。各业务页面首屏展示合规条。

## 微信开发者工具导入

1. 安装并打开微信开发者工具，选择「导入项目」。
2. 目录选择 `/workspace/colourtickchoosetool`，编译类型选择小程序。
3. 默认 AppID 为 `touristappid`，可选择测试号/游客模式；若工具或真机调试要求正式身份，将 `project.config.json` 中 `appid` 改为自己的小程序 AppID，并按开发者工具要求登录。无需 npm 构建。
4. 普通编译进入首页，首次启动自动跳转须知。勾选成年与同意后进入三个 Tab。
5. 首页进入选号；生成约20个候选并微调为10个；可复制或查看购彩指引。账本手填支出；我的中设置预算、加载预设和查看日志。

## 目录结构

```text
app.js / app.json / app.wxss
project.config.json / project.private.config.json / sitemap.json
components/disclaimer-bar/   共享首屏合规条
utils/storage.js            本地数据、月度汇总、同一期累计预算检查
utils/mock-history.js       固定种子模拟开奖
utils/stats.js              冷热次数和当前遗漏
utils/engine.js             可复现随机、过滤、拒绝采样和约束检查
utils/format.js             格式化与复制免责水印
pages/notice/               须知及年龄确认
pages/home/                 首页 Tab
pages/generate/             策略、候选、微调定稿、保存预设
pages/guide/                官方购彩信息指引
pages/ledger/               手填账本 Tab
pages/mine/                 设置、预设、日志 Tab
README.md / DEVNOTES.md
```

## Mock 数据与算法

`utils/mock-history.js` 为80期固定种子生成的模拟快乐8历史，每期20个不重复号码，范围1–80，最新在前；**非官方实时数据，不是实际开奖**。冷热取最近 N 期（默认30）；遗漏为距最新一次出现的期数，最新出现记0，从未出现记80（观测上限）。

引擎先按开启的冷热/遗漏过滤1–80；不足10个失败。对过滤池最多拒绝采样6000次，选10个并检验连号、四区上下限。成功后补足候选池（默认20，过滤池不足20时显示实际数目），保证包含一组有效十个号码。相同 seed 和参数结果相同；「再来一组」使用新 seed。失败仅表示过滤不足或有限采样未找到，不保证数学无解。手动定稿必须恰好10个且仍符合开启约束。

金额以分比较；单期上限按同一期号所有记录累计，月预算按本地年月汇总。超限记录/降低预算触发二次确认，继续或取消均写本地日志。生成及复制免费且不产生投注支出，不触发金额预算。

所有数据使用 `wx.getStorageSync/setStorageSync`，存储键前缀 `ct_v1_`。清除小程序本地数据可重置首次须知。

## 交付包

同级目录压缩包：`/workspace/colourtickchoosetool-miniprogram.zip`（不含 `.git`）。可选静态示意页：`preview.html`（非微信运行时）。
