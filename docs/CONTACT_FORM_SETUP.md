# 联系表单配置说明

网站上所有「Talk to our team」表单都提交到 `/api/contact`（代码在 `functions/api/contact.ts`），流程：

1. 访客点提交 → 后台检查内容（必填项、邮箱格式、防垃圾）
2. 存进 Cloudflare D1 数据库（表 `enquiries`，第一次提交时自动建表）
3. 通过 Resend 发一封邮件到 info@goldsky.ca，**直接点「回复」就是回给访客**
4. 页面显示「已收到」

**没配置完之前**表单照常可用：后台会告诉页面「暂不可用」，页面自动改为打开访客的邮件软件（就是现在的做法）。所以下面三步可以分开做，做完一步生效一步。

---

## 第 1 步：D1 数据库（存记录）

1. Cloudflare 后台 → **Storage & Databases → D1** → **Create**，名字填 `goldsky-enquiries`
2. 打开网站的 Pages 项目 → **Settings → Bindings** → **Add → D1 database**
   - Variable name：`DB`（必须是这三个大写字母）
   - D1 database：选 `goldsky-enquiries`
3. 生产环境（Production）和预览环境（Preview）都要加

做完这一步，表单提交就会存进数据库，页面显示「已收到」——但还不会发邮件。

**查看询问记录：** D1 → `goldsky-enquiries` → **Console**，运行：

```sql
SELECT id, created_at, name, business, site, email, phone, page, emailed, message
FROM enquiries ORDER BY id DESC LIMIT 50;
```

`emailed` 为 0 的行表示邮件没发成功，需要手动跟进。时间是 UTC（比渥太华早 4–5 小时）。

## 第 2 步：Resend（发邮件）

1. 在 resend.com 注册账号
2. **Domains → Add Domain**，填 `goldsky.ca`
3. Resend 会列出几条 DNS 记录（一条 `resend._domainkey` 的 TXT，`send` 子域名下的一条 MX 和一条 TXT）。
   - 可以点 Resend 提供的 Cloudflare 一键配置，或者到 Cloudflare → goldsky.ca → **DNS** 手动添加
   - **这些记录都在 `send` 子域名和 `resend._domainkey` 上，不会动根域名的 MX，Zoho 邮箱照常收信**
   - 如果 Cloudflare 里加的是 CNAME/TXT，代理状态选 **DNS only（灰色云朵）**
4. 等 Resend 显示 **Verified**（通常几分钟）
5. **API Keys → Create API Key**，权限选 **Sending access**，域名选 goldsky.ca。复制密钥（只显示一次）
6. Pages 项目 → **Settings → Variables and Secrets** → **Add**：
   - 类型选 **Secret**，名字 `RESEND_API_KEY`，值粘贴密钥
   - Production 和 Preview 都加

可选变量（不填就用默认值）：

| 名字 | 默认值 | 用途 |
|---|---|---|
| `CONTACT_TO` | `info@goldsky.ca` | 询问发到哪个邮箱 |
| `CONTACT_FROM` | `GoldSky website <website@goldsky.ca>` | 发件人，必须是 Resend 验证过的域名 |

## 第 3 步：Turnstile（防垃圾，建议做）

1. Cloudflare 后台 → **Turnstile** → **Add widget**
   - Hostnames：`goldsky.ca`，以及 Pages 预览域名（`xxx.pages.dev`）
   - Widget mode：**Managed**
2. 得到两个值：**Site Key**（公开的）和 **Secret Key**（保密的）
3. Pages 项目 → **Settings → Variables and Secrets**：
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY` = Site Key，类型 **Plaintext**（构建时写进页面，必须是这个名字）
   - `TURNSTILE_SECRET` = Secret Key，类型 **Secret**
4. **两个都加好后重新部署一次**（Deployments → 最新一次 → Retry deployment），Site Key 是构建时才写进页面的

注意：只加了 `TURNSTILE_SECRET` 而没有 Site Key 时，后台会拒绝所有提交。两个要一起加。

正常访客基本看不到验证框；只有被判断为可疑时才会出现一个勾选框。

---

## 生效检查

1. 打开 goldsky.ca 任意页面底部的表单，用自己的邮箱填一份提交
2. 页面应显示「Thank you, it is on its way to our team.」
3. info@goldsky.ca 收到邮件，点回复，收件人是你填的邮箱
4. D1 Console 里能查到这条，`emailed = 1`

如果页面打开了邮件软件，说明后台还没配好：D1 和 Resend 都没生效。到 Pages 项目 → **Functions** 标签页看日志（Real-time logs），错误会以 `resend` 或 `d1` 开头打印出来。

## 说明

- 本地 `npm run dev` 没有这个后台，表单会走打开邮件软件的备用方式，这是正常的
- 后台只接受来自 goldsky.ca、`*.pages.dev` 预览和本机的提交
- 每条询问会记下提交的页面（如 `/case-studies`）和国家代码，方便知道客户从哪里来
