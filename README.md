# 康宁大药房 · 药品电商小程序（演示项目）

一个**开箱即跑**的原生微信小程序示例，覆盖药品电商常用功能：
**登录、商品列表/搜索/分类、商品详情、购物车、下单结算、订单管理、个人中心**。

- 数据层为本地 mock + `wx.setStorageSync` 持久化，**无需后端**即可跑通完整购药流程
- 真实项目接入后端时，只需替换 `utils/store.js` 内的读写实现（接口化），页面调用方式不变
- 附带 `preview.html`：浏览器直接打开即可预览交互（无需微信开发者工具）

## 目录结构

```
medicine-mall-miniprogram/
├── app.js / app.json / app.wxss    全局配置与公共样式
├── project.config.json             项目配置（appid 为测试号 touristappid）
├── sitemap.json
├── preview.html                    浏览器预览版（双击打开）
├── utils/
│   ├── data.js                     商品 / 分类 / 活动位 mock 数据
│   └── store.js                    购物车 / 订单 / 用户 / 地址 的本地状态管理
└── pages/
    ├── index/          首页：搜索、分类筛选、活动位、商品双列瀑布
    ├── detail/         详情：价格、适应症/用法/注意、处方药提示、加购/立即购买
    ├── cart/           购物车：勾选、步进器、删除、全选、满99包邮提示、结算
    ├── order-confirm/  确认订单：地址、清单、处方上传、备注、运费与合计
    ├── order/          订单：全部/待付款/待发货/待收货/已完成，支付/取消/发货/收货
    ├── mine/           我的：登录态、订单角标快捷入口、功能菜单、退出登录
    └── login/          登录：头像选择、昵称、手机号校验、协议勾选
```

## 如何运行

1. 打开微信开发者工具 → 导入项目 → 选择本目录（`medicine-mall-miniprogram`）
2. AppID 选「测试号」即可（`project.config.json` 已配置 `touristappid`）
3. 编译运行，全流程可用：
   - 首页加购 → 购物车勾选 → 结算（未登录会先跳登录页）
   - 含处方药的订单必须先「上传处方」才能提交（演示 `wx.chooseMedia`）
   - 提交订单 → 订单页「去支付」→「模拟发货」→「确认收货」

> 快速看效果：直接双击 `preview.html`，用浏览器操作同样的流程。

## 已实现的关键逻辑

| 功能 | 说明 |
| --- | --- |
| 登录态 | `wx.setStorageSync` 保存用户；未登录点结算自动拦截并跳登录，登录后返回 |
| 购物车 | 本地数组 `{id, count, selected}`，渲染时与商品数据合并；角标实时同步 |
| 处方药 | 商品标 `rx` 字段；详情页提示、购物车顶部提示、结算强制上传处方 |
| 订单流转 | unpaid → undelivered → shipping → done / canceled，含「模拟发货」演示按钮 |
| 运费规则 | 满 99 包邮，否则加 8 元，结算页自动计算 |
| 手机号脱敏 | 「我的」页展示 `138****6688` 格式，不泄露完整号码 |

## 上线前需要替换 / 补充的内容

**必须完成（合规）**
1. 取得《药品经营许可证》《互联网药品信息服务资格证书》，并完成平台类目报备
2. 接入真实支付（`wx.requestPayment` + 后端下单签名），当前「去支付」为模拟弹窗
3. 处方药对接互联网医院 / 处方流转平台，实现「处方上传 → 药师审核」真实链路
4. 商品、价格、厂家、批准文号等全部为示例数据，需替换为真实 SKU

**建议补充**
- 后端接口化：登录（`wx.login` + 手机号解密）、商品、购物车、订单全部落服务端
- 商品图片：当前用「渐变色 + emoji」占位，替换为 `swiper` 轮播 + 真实图片
- 收货地址：接入 `wx.chooseAddress` 或自建地址簿页
- 优惠券、问诊、客服：页面已留入口，按需接微信客服消息或第三方问诊服务
- 隐私协议：在 `app.json` 中配置 `__usePrivacyCheck__` 并补充隐私政策弹窗

---

## 部署到 GitHub Pages

### 能部署什么、不能部署什么

| 内容 | 能否部署到 Pages | 说明 |
| --- | --- | --- |
| 小程序本体（`pages/*.wxml` 等） | ❌ 不能 | Pages 只能托管静态网页，小程序必须由微信客户端/开发者工具运行，无法通过网址打开 |
| `preview.html`（网页版演示） | ✅ 可以 | 纯静态单文件，无外部依赖，可直接托管 |
| 若要「网页版小程序」 | ✅ 需改造 | 用 uni-app / Taro 重写并编译为 H5，才是一个可独立访问的 Web 应用 |

本项目已把 `preview.html` 复制到 `docs/index.html`，并加了 `.nojekyll`（防止 Jekyll 处理），**开箱即可部署**。

### 三步上线

```bash
cd medicine-mall-miniprogram
git init
git add .
git commit -m "feat: 药品电商小程序示例"
git branch -M main
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git push -u origin main
```

然后在 GitHub 仓库页面：
**Settings → Pages → Build and deployment → Source 选 `Deploy from a branch` → Branch 选 `main`、目录选 `/docs` → Save**

等 1～2 分钟，访问 `https://<你的用户名>.github.io/<仓库名>/` 即可看到界面演示。

### 注意事项

- **必须是公开仓库**（免费账号的 Pages 只支持 public 仓库）
- Pages 站点强制 HTTPS，首次签发证书可能要等几分钟
- 国内访问 `*.github.io` 可能不稳定，需要稳定访问可换 Gitee Pages / Vercel / Cloudflare Pages（都是同一份 `docs` 目录直接上传）
- `docs/index.html` 与根目录 `preview.html` 内容相同，改完预览记得同步：
  `cp preview.html docs/index.html`
- 页面里的商品、价格、资质全是示例数据，公开展示无隐私风险；如后续接入真实数据，注意不要提交密钥
