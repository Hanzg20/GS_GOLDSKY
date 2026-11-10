# GoldSky image style

One visual language for every image on goldsky.ca: the illustrations drawn in
code (`components/art`) and any photo or generated image added later.

**Idea:** old guardians watching over everyday Canadian business. The name is the
picture: a gold sky over a small town at the end of the day.

## Palette (same tokens as `tailwind.config.ts`)

| Role | Token | Hex | Use |
|---|---|---|---|
| Paper | `paper` / `paper.deep` | #FAF8F4 / #F3EFE7 | Canvas, sky |
| Mass | `paper.edge` | #EAE4D8 | Mountains, walls, anything that needs weight |
| Ink | `ink` | #1F1D1A | Every outline |
| Soft ink | `ink.mute` | #6F695F | Hatching, distant lines |
| Accent | `brand` | #C8661A | **One element per image**: the sun, a seal, a tap mark |
| Cool hint | `sky` | #6E8FA6 | Water or evening sky only, under 10% of the image |

## Drawing rules (code illustrations)

- Outlines 1.5px ink, round caps and joins, `vector-effect: non-scaling-stroke`.
- Shade with parallel hatching (1px soft ink), never with gradients or blur.
- One orange accent per illustration. If two things want to be orange, pick one.
- No text, numbers or logos inside an illustration.
- No glowing screens, circuits, holograms, neon, floating UI or robot hands.
- Every illustration sits in a frame: `rounded-2xl`, 1px `line` border, `paper-grain`.
- Every illustration has an `aria-label` that says what it shows.

## Product line symbols

From the GS-SSP naming manual. Same stroke and frame everywhere; the seal
carries the Chinese name and is the accent.

| Line | Symbol | Seal | Scene |
|---|---|---|---|
| Ourea | Mountain | 山 | Counter in morning light, mountains behind |
| Iris | Rainbow | 虹 | Server walking a handheld to the table |
| Aegis | Shield | 盾 | Wash bay lit at night, no one there, still running |
| Apex | Summit | 峰 | The beaver looking over the town |
| Cael | Cloud | 云 | Clouds over several small shops, one thread of light linking them |

## Photos and generated images

- **Generated images set the mood only.** Never use them as evidence: a case
  study, a real site, a real terminal or a real customer must be photographed.
- Real photos get the same grade: warm white balance, lifted blacks, fine grain,
  muted saturation, orange kept as the only strong colour.
- Sizes: hero 16:9, product cards 4:5, case studies 3:2. Export WebP under 300KB.

Prompt template (keep the second half fixed, change only the scene):

```
[scene], editorial illustration with a film photography feel,
golden hour light, warm cream and terracotta palette with a hint of
slate blue, fine grain, paper texture, calm and humane, generous
negative space, Canadian small town setting, no text, no logos,
no glowing screens, no neon --ar 3:2
```
