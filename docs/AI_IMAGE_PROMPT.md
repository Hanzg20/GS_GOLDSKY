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
- WATERMARK STRIP, every image: below the picture, add a plain band about 8%
  of the picture's height (1600 x 2000 picture -> generate 1600 x 2160, a
  160 px band at the bottom). The band is one flat colour and empty: white /
  paper cream #FAF8F4 under day images, black #131209 under night images.
  Nothing from the drawing reaches into it; the picture ends on a straight
  horizontal line. Any watermark or signature the generator adds goes in this
  band. The sizes listed per image are the picture without the band: cut the
  band off before exporting the web files.

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

--- BATCH C: the "Which one is your business?" picker on the home page ---
MATCH THE EXISTING SET. Attach these three as style reference images and copy
their look, not the rules in section 2 where the two differ:
    public/images/art/line-ourea.webp   (counter, mountains through window)
    public/images/art/line-iris.webp    (server walking through a dining room)
    public/images/art/line-cael.webp    (clouds over a row of small shops)
What they share, and every new image must have:
- Warm sepia brown ink lines (not black), engraving style: dense parallel and
  curved hatching for all shading, cross hatching in the darkest areas.
- Cream paper ground (#FAF8F4 to #F3EFE7) filling most of the picture; lots
  of open, lightly hatched space, especially sky, walls and floor.
- Soft flat washes only: cream, beige, light grey, and a muted orange
  (#C8661A, also lighter peach tints of it) on a few chosen things: an
  awning, a chair, an apron, sun rays, a lit window. Orange stays under
  about 15% of the picture. No other strong colours, no blue screens.
- Warm daylight or low sun; horizontal hatched sky with fine orange rays.
- One or two people at most, small to mid size, seen from behind or the side,
  faces not detailed, plain work clothes.
- Canadian small town: pines and spruce, low commercial buildings, wide sky,
  snowy peaks in the distance.
- Absolutely no readable text: signs are blank boards or shapes only.
  (Retouch out any letters the generator invents.)
All 1600 x 2000 (4:5) picture, plus the white watermark strip below it
(section 4): generate at 1600 x 2160. The picture is cropped to a tall column on desktop and
a square on phones: keep the subject in the middle 60% of the width and the
middle 70% of the height. Web files: <name>.webp at 1200 x 1500 and
<name>-640.webp at 640 x 800.

[11] scene-fuel     A small self serve fuel station on a highway edge in early
                    morning, seen at an angle like the shop row in line-cael:
                    canopy over two pumps, pines and a snowy peak behind, a
                    hatched sky with fine rays from a low sun. A driver seen
                    from the side holds a card to the pump's reader.
                    Orange on: the canopy edge stripe, the sun rays.
[12] scene-laundry  Inside a small laundromat, drawn like the dining room in
                    line-iris: a row of front loading washers along the wall,
                    one door showing a turning drum, a folding table, a big
                    window with pines and snow outside. A customer seen from
                    behind pays at a small card terminal on the wall.
                    Orange on: a laundry basket, a chair, the window light.
[13] scene-wash     A self serve car wash in daylight seen from the lot: two
                    open bays like the ones in line-cael, a car in one being
                    rinsed with a hand wand by a person seen from behind, a
                    card terminal on a post at the bay entrance, a small
                    shield shaped blank sign by the road, pines behind.
                    Orange on: the bay door trim, the terminal's tap mark.
[14] scene-vend     A vending machine under the porch roof of a small wooden
                    building in late afternoon, pines beside it, snow on the
                    ground. A person seen from the side pays with a phone at
                    the machine's reader. Products are simple shapes, no
                    brands or labels. Orange on: the porch light, the
                    machine's side panel.
[15] scene-firewood A wooden firewood kiosk with a peaked roof at the edge of
                    the pines, split bundles stacked behind its open front, a
                    small card terminal on a post beside it. A customer seen
                    from behind walks off carrying a bundle toward a parked
                    car. Low sun through the trees. Orange on: the sun rays,
                    the bundle ties.
[16] scene-ev       Two slim electric vehicle chargers at the edge of a small
                    town parking lot, a car plugged in, the driver seen from
                    the side tapping a card on the charger. Shops and pines
                    beyond, soft clouds in a hatched sky.
                    Orange on: the charger's tap mark, a shop awning.

==================================================================
6. DO NOT PRODUCE
==================================================================
Do not generate images of the real customer site (Eagleson Coin Wash), real
terminals, real staff or customers. Those will be photographed.

==================================================================
7. ACCEPTANCE CHECK (verify each image before delivering)
==================================================================
[ ] Plain watermark strip at the bottom, nothing drawn in it; cut off for web
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

| 11–16 | `scene-fuel`、`scene-laundry`、`scene-wash`、`scene-vend`、`scene-firewood`、`scene-ev` | 1600 × 2000（生成时 1600 × 2160，含底部白边） | 首页「Which one is your business?」对应的 6 个场景 |

注：分享图要另存一份 PNG，因为部分社交平台不识别 WebP。

## 单张提示词（组 C，一次生成一张）

每段都完整，直接整段复制给豆包等工具，**同时上传 `line-ourea.webp`、`line-iris.webp`、`line-cael.webp` 作为风格参考图**。生成后先把底部白边连同水印裁掉，再检查画面里有没有乱码字。

### [13] scene-wash · Self serve car wash

```
Match the style of the attached reference images exactly: an editorial engraving
style illustration in warm sepia brown ink on cream paper, shading made only with
dense parallel and curved hatching lines, cross hatching in the darkest areas. Soft
flat washes of cream, beige and light grey, with a muted orange (#C8661A) and its
pale peach tints on only a few things. Lots of open, lightly hatched space. No
gradients, no glow, no 3D, no photo realism.

Scene: a self serve car wash in a small Canadian town on a clear day, seen from the
parking lot at a slight angle. Two open wash bays under a low flat roof; in one bay a
person seen from behind rinses a plain car with a hand held spray wand, water
spray drawn as fine lines. A slim card payment terminal stands on a post at the bay
entrance. A small blank shield shaped sign on a post by the driveway. Pines and
spruce behind the building, snowy mountains far away, a wide sky with horizontal
hatching and fine orange sun rays. Orange only on the bay door trim and the small
tap symbol on the terminal.

Rules: absolutely no letters, words, numbers, logos, brand names or licence plates
anywhere; any sign is a blank board. Portrait format 4:5 for the picture. Below the
picture add a plain empty white strip about 8% of the picture's height, with
nothing drawn in it, the picture ending on a straight horizontal line; any
watermark goes in that strip.
```

### [12] scene-laundry · Laundromat

```
Match the style of the attached reference images exactly: an editorial engraving
style illustration in warm sepia brown ink on cream paper, shading made only with
dense parallel and curved hatching lines, cross hatching in the darkest areas. Soft
flat washes of cream, beige and light grey, with a muted orange (#C8661A) and its
pale peach tints on only a few things. Lots of open, lightly hatched space. No
gradients, no glow, no 3D, no photo realism.

Scene: inside a small, quiet laundromat in a Canadian town on a winter morning,
drawn in perspective like the dining room in the reference. A row of front loading
washing machines along the right wall, round doors, one showing clothes turning
inside; a row of dryers stacked above. A folding table with a basket of towels. A
large window on the far wall with pines and snow outside, morning light falling
across the floor. A customer seen from behind stands at a small card payment
terminal mounted on the wall and taps a card. Orange only on the laundry basket, one
plastic chair and the light from the window.

Rules: absolutely no letters, words, numbers, logos, brand names or control panel
text anywhere; machine panels are plain shapes. Portrait format 4:5 for the
picture. Below the picture add a plain empty white strip about 8% of the picture's
height, with nothing drawn in it, the picture ending on a straight horizontal line;
any watermark goes in that strip.
```

### [15] scene-firewood · Firewood and partner machines

```
Match the style of the attached reference images exactly: an editorial engraving
style illustration in warm sepia brown ink on cream paper, shading made only with
dense parallel and curved hatching lines, cross hatching in the darkest areas. Soft
flat washes of cream, beige and light grey, with a muted orange (#C8661A) and its
pale peach tints on only a few things. Lots of open, lightly hatched space. No
gradients, no glow, no 3D, no photo realism.

Scene: a small wooden firewood kiosk with a peaked roof at the edge of a pine forest
beside a country road in Canada, late afternoon, light snow on the ground. Split
firewood bundles tied with cord are stacked on shelves behind its open front. A
slim card payment terminal is fixed to a post beside the kiosk. A customer seen
from behind walks away toward a parked plain car, carrying one bundle. Tall pines
and spruce around, a low sun shining through the trees with fine hatched rays.
Orange only on the sun rays and the cords around the bundles.

Rules: absolutely no letters, words, numbers, logos, brand names, prices or licence
plates anywhere; any sign is a blank board. Portrait format 4:5 for the picture.
Below the picture add a plain empty white strip about 8% of the picture's height,
with nothing drawn in it, the picture ending on a straight horizontal line; any
watermark goes in that strip.
```

### [16] scene-ev · EV charging

```
Match the style of the attached reference images exactly: an editorial engraving
style illustration in warm sepia brown ink on cream paper, shading made only with
dense parallel and curved hatching lines, cross hatching in the darkest areas. Soft
flat washes of cream, beige and light grey, with a muted orange (#C8661A) and its
pale peach tints on only a few things. Lots of open, lightly hatched space. No
gradients, no glow, no 3D, no photo realism.

Scene: two slim electric vehicle charging posts at the edge of a small town parking
lot in Canada, early evening light. A plain compact car is plugged into one of them
with a thick cable. The driver, seen from the side, taps a card on a small reader on
the charging post. Behind the lot, a row of low shops like in the reference, one
with a striped awning, pines and a snowy peak beyond, soft rounded clouds in a sky
of horizontal hatching. Orange only on the small tap symbol on the charger and the
shop awning.

Rules: absolutely no letters, words, numbers, logos, brand names, screens with
text or licence plates anywhere; any sign is a blank board. No glowing lights or
neon. Portrait format 4:5 for the picture. Below the picture add a plain empty
white strip about 8% of the picture's height, with nothing drawn in it, the picture
ending on a straight horizontal line; any watermark goes in that strip.
```

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
