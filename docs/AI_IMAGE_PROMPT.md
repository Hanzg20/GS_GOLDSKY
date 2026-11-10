# goldsky.ca AI 配图提示词

把下面「复制给 AI 的提示词」整段交给生成图片的 AI（Midjourney、Higgsfield、GPT 图像、Firefly 等）。
它只负责**氛围插图**；`PHOTO_SHOTLIST.md` 里的 6 张实拍照片**不能用 AI 生成**。

风格依据：`IMAGE_STYLE.md`。交付后放进项目，告诉 Claude 替换页面上的插图。

---

## 复制给 AI 的提示词

```
You are the illustrator for goldsky.ca, the website of GoldSky Technologies, a small
Ottawa company that builds payment and store tools (the GS-SSP platform) for Canadian
restaurants, shops and self serve sites such as car washes and vending machines.
Produce the illustrations listed below. Follow every rule in this brief exactly.

==================================================================
1. CONCEPT
==================================================================
"Old guardians watching over everyday Canadian business."
The company name is the picture: a GOLD SKY over a small Canadian town at the end
or start of the day. The five product lines are named after mythic guardians and
each has a symbol that should appear naturally in the landscape, never as an icon
pasted on top:
  - Ourea  = mountain   (a steady peak behind the town)
  - Iris   = rainbow    (faint arcs in the sky)
  - Aegis  = shield     (a small shield shaped sign at the self serve car wash)
  - Apex   = summit     (the highest snow capped point)
  - Cael   = cloud      (soft clouds over the town)
Mood: calm, humane, warm, quietly confident. 70% humanistic, 20% technology,
10% other. It should feel like an editorial illustration in a quality magazine,
not like a tech startup.

==================================================================
2. STYLE (identical for every image)
==================================================================
- Medium: fine line ink illustration in the manner of a copperplate engraving or
  woodcut print, on warm cream paper. Shading ONLY with parallel hatching lines.
- Lines: dark warm ink, even weight, round line ends. Distant things in lighter ink.
- Flat colour fills, no gradients, no airbrush, no soft glow, no blur, no bloom.
- Visible but subtle paper grain.
- Palette (use these colours only):
    Paper cream    #FAF8F4   main background / sky
    Paper deep     #F3EFE7   secondary fills
    Mass beige     #EAE4D8   mountains, walls, anything with weight
    Ink            #1F1D1A   all outlines
    Soft ink       #6F695F   hatching, distant lines
    Accent orange  #C8661A   EXACTLY ONE element per image (the sun, a lit
                             window, a tap mark). Nothing else is orange.
    Slate blue     #6E8FA6   optional, under 10% of the image, water or
                             evening sky only
  Night images swap the scheme: background #131209 to #161410, lines #EDE6D6,
  fills #1C1A14 / #2B2820, hatching #9C9384, still exactly one orange accent.
- Setting: recognisably Canadian: pine and spruce, low commercial buildings,
  wide sky, Canadian Shield rock or Rockies style peaks, small town main street.
- People, if any: small, seen from behind or side, no detailed faces.

==================================================================
3. NEVER INCLUDE
==================================================================
- Any text, letters, numbers, signage wording, logos, watermarks, signatures
- Real brands or recognisable products (car makes, terminal brands, chemicals)
- Licence plates
- Neon, glowing screens, holograms, circuit patterns, floating UI panels,
  data streams, robots or robot hands, blue tech light
- 3D render look, photorealism, glossy plastic, lens flare
- Gradient skies or gradient backgrounds
- More than one orange element

==================================================================
4. FILE RULES
==================================================================
- Master files: PNG, sRGB, at least the size listed, no transparency unless stated.
- Web files: WebP, sRGB, quality 80, at exactly the size listed.
  Size limit per web file: 300 KB (hero desktop: 450 KB).
- Naming: lowercase, ASCII, words joined by hyphens, no spaces:
      <page>-<subject>[-<variant>].<ext>
  Masters add a version: <page>-<subject>[-<variant>]-v<N>.png
  Example: home-hero-panorama-desktop.webp / home-hero-panorama-desktop-v1.png
- Folders (create them exactly like this):
      deliver/
        masters/        all PNG masters, every version kept
        web/            final WebP files only, no version suffix
        contact-sheet.png   all final images side by side, labelled by file name
- Do not crop away the safe zones described per image.

==================================================================
5. IMAGES TO PRODUCE
==================================================================
Make image 1 first. Once it is approved, use it as the style reference
(same seed / style reference image) for every other image so the set matches.

--- BATCH A: used on the home page now ---

[1] home-hero-panorama-desktop
    Size 2400 x 1000 (12:5).  Shown full width under the headline.
    A wide panorama at sunrise. A LARGE orange sun (about 20% of image width)
    half risen behind a distant ridge, right of centre: the single accent.
    Left: a tall snow capped mountain (Ourea + Apex) with hatched slopes;
    faint rainbow arcs (Iris) in the sky to its left.
    Along the ground line, left to right: a pine, a small restaurant with a
    striped awning, a gabled house, a self serve car wash with three open bays,
    a small shield shaped sign on a post (Aegis), pines, a vacuum station with
    its hose, a vending kiosk, more pines. Soft clouds (Cael) top left and right,
    two or three birds. Ground below: horizontal hatching and a faint road
    converging toward the car wash.
    Sky above the sun: horizontal hatching lines like an engraving.
    Safe zone: keep 4% clear on every edge; nothing important in the bottom 12%.

[2] home-hero-panorama-mobile
    Size 1200 x 1500 (4:5).  Same scene recomposed for phones, not a crop:
    sun upper right, mountain upper left, town compressed to restaurant,
    car wash, shield sign and pines. Same palette and line weight as [1].

[3] home-aegis-night
    Size 2080 x 1600 (13:10).  Night palette.
    A self serve car wash at night, no one there, still working. Crescent moon
    upper right, small cross shaped stars. A large faint shield outline in the
    sky above the building, drawn in hatching, like a guardian watching over it.
    The building has two bays; the left bay is lit with a soft warm orange light
    (the single accent) with an ordinary small car inside under a spray boom;
    the right bay is dark with hatching. A payment terminal on a post at the
    right, its screen showing only a simple contactless symbol in pale ink.
    Ground hatching at the bottom.

[4] share-og
    Size 1200 x 630 (1.91:1).  Social sharing image.
    A simplified version of [1]: sun, mountain, car wash, shield sign.
    Keep the LEFT 55% calm and empty (plain cream with very light hatching):
    the title will be added there afterwards. No text in the image itself.

[5] not-found
    Size 1600 x 1000 (8:5).  For the 404 page.
    A quiet country road at dusk curving between pines toward a small town on
    the horizon, a simple wooden signpost with blank arrow boards pointing back
    toward the town. Low orange sun on the horizon is the accent.

--- BATCH B: for the product line pages (coming next) ---
All 1600 x 2000 (4:5). Each scene features its guardian symbol subtly.

[6] line-ourea      Morning light on a restaurant counter, a countertop
                    terminal and a small customer facing screen on it, a
                    mountain visible through the window. Accent: the sunlit
                    window.
[7] line-iris       A server, seen from behind, walking a handheld terminal to
                    a table; a faint rainbow arc implied by the curve of the
                    room or a window. Accent: one orange element on the table.
[8] line-aegis      Same world as [3] but closer: one wash bay at night with
                    the terminal on its post. Night palette. Accent: the
                    terminal's tap mark.
[9] line-apex       Seen from a high summit at dawn: the whole small town
                    below, tiny and orderly. Accent: the sun.
[10] line-cael      Clouds over several small shops spread across the
                    landscape, one fine thread of orange light linking them
                    (the single accent).

==================================================================
6. DO NOT PRODUCE
==================================================================
Do not generate images of the real customer site (Eagleson Coin Wash), real
terminals, real staff or customers. Those will be photographed.

==================================================================
7. ACCEPTANCE CHECK (verify each image before delivering)
==================================================================
[ ] Exact size and aspect ratio      [ ] Exactly one orange element
[ ] Palette colours only             [ ] No text, logos, plates, brands
[ ] Hatching for shading, no gradients or glow
[ ] Line weight matches image [1]    [ ] Safe zones respected
[ ] File name and folder correct     [ ] Web file under the size limit
```

---

## 交付后放到项目哪里

| AI 交付的 | 放到项目里 |
|---|---|
| `deliver/web/*.webp` | `public/images/art/` |
| `deliver/masters/*.png` | 不进项目（文件太大），存到网盘或 `D:\MYAPP\goldsky-art-masters\` |
| `deliver/contact-sheet.png` | 发给 Claude 先审核 |

## 文件清单速查

| # | 文件名 | 尺寸 | 用在哪里 |
|---|---|---|---|
| 1 | `home-hero-panorama-desktop.webp` | 2400 × 1000 | 首页大图（桌面） |
| 2 | `home-hero-panorama-mobile.webp` | 1200 × 1500 | 首页大图（手机） |
| 3 | `home-aegis-night.webp` | 2080 × 1600 | 首页 Aegis 夜景区 |
| 4 | `share-og.webp`（另导一份 `share-og.png`） | 1200 × 630 | 微信、LinkedIn 等分享预览图 |
| 5 | `not-found.webp` | 1600 × 1000 | 404 页面 |
| 6–10 | `line-ourea.webp` 等 5 张 | 1600 × 2000 | 各产品线页面（下一步改版） |

注：分享图要另存一份 PNG，因为部分社交平台不识别 WebP。

## 接入记录

**2026-11-08，第一批（豆包生成，v1）**

母版已经改名，存放在 `D:\MYAPP\goldsky-art-masters\`，不放进项目。

| 图 | 状态 | 用在哪里 |
|---|---|---|
| `line-ourea` | ✅ 已接入 | 首页「Which one is your business?」→ Quick service counter |
| `line-iris` | ✅ 已接入 | 同上 → Dine in restaurant |
| `line-cael` | ✅ 已接入 | 同上 → Several sites |
| `line-apex` | ✅ 已接入 | 首页「Getting started」三步旁边 |
| `line-aegis`、`home-aegis-night` | ⏳ 待修 | 吸尘站画成了加油机；机器面板上有假字；夜景横图里有车牌和枫叶盾牌 |
| `home-hero-panorama-desktop`、`-mobile` | ⏳ 待修 | 招牌是乱码；吸尘站像加油机 |
| `share-og`、`not-found` | ⏳ 待修 | 招牌上有乱码 "DESLIVE WASHER"，路牌上有 "OLIVE" |

**处理方式**：每张都往画框内侧裁一圈，顺带去掉「豆包 AI 生成」水印；没有画框的 `line-iris` 改为裁掉底边。

**网页文件**：每张导出两个尺寸，`<name>.webp`（1200 × 1500）和 `<name>-640.webp`。因为插图在页面上最宽只显示约 320px，这两个尺寸足够，不需要 1600 × 2000。细线版画很难压缩，`line-apex.webp` 约 410KB，其余都在 350KB 以内；1x 屏幕只会加载 640 版，约 100 到 150KB。

**2026-11-08，修图和第二批**

我自己修了第一批里的三张图，抹掉乱码字和车牌号，修好的母版存为 `*-v2.png`：
- `share-og`：已接入，作为分享图 `public/images/art/share-og.jpg`，`app/layout.tsx` 的 openGraph 和 twitter 都指向它。
- `not-found`：已接入新建的 404 页面 `app/not-found.tsx`。
- `home-aegis-night` v2：修好后被第二批的版本替换。

第二批（豆包生成）的母版存为 `batch2/*-v3.png`：
- 只采用了 `home-aegis-night`，已接入首页 Aegis 区。这张没有枫叶、车牌和文字，终端屏幕上是感应支付标志。没有画框，水印在画面底部，所以往下裁掉一条，再保持 13:10 的比例。
- 其余 9 张没有采用。原因有三条：
  - 画风变软了，有喷枪式的光晕和彩色彩虹，和第一批放在一起不统一；
  - 有 3 张直接把 "Apex"、"Cael"、"Ourea" 写进了画面；
  - 首页大图和 `line-aegis` 里的机器仍然像加油机或充电桩。
