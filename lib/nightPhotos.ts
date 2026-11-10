// Dark theme pictures. The light theme shows the printmaking illustrations
// (components/ArtImage); the dark theme, modelled on starlink.com, shows
// photographs. "Night" is the theme, not the hour: the photos follow the
// page's day (06 sunrise hero, daytime picker, 18 golden hour, 23 night,
// next dawn summit), the same story as the illustrations. Each spot names a file in public/images/night/. Until the file
// exists the spot renders a dark placeholder with its name and size, so a
// missing photo is obvious but the page still reads (components/NightPhoto).
//
// Mood photos only: generic places and hands, never presented as a GoldSky
// customer site. Photos of real deployments stay in lib/photos.ts.
// Full briefs and prompts: docs/NIGHT_PHOTO_BRIEF.md.
export const NIGHT = {
  hero: {
    src: '/images/night/hero.jpg',
    w: 2400,
    h: 1350,
    title: '首页大图 · 06:00 雪山日出下的小镇',
    alt: 'Sunrise behind a snow capped mountain above a small snowy town, a lit cafe, wash bays and a vending machine by the road'
  },
  fuel: {
    src: '/images/night/fuel.jpg',
    w: 1440,
    h: 1800,
    title: '自助加油 · 清晨 6:30',
    alt: 'At first light a driver taps a card on the reader of a fuel pump, snowy mountains behind the station'
  },
  counter: {
    src: '/images/night/counter.jpg',
    w: 1440,
    h: 1800,
    title: '柜台收银 · 早上 7:30',
    alt: 'Morning at a cafe counter: a customer pays with a phone beside the register and customer display, coffee steaming'
  },
  dinein: {
    src: '/images/night/dinein.jpg',
    w: 1440,
    h: 1800,
    title: '堂食 · 中午 12:00',
    alt: 'Lunchtime by a snowy window: a server holds a handheld card terminal out to a guest paying by card'
  },
  wash: {
    src: '/images/night/wash-2.jpg',
    w: 1440,
    h: 1800,
    title: '自助洗车 · 上午 10:00',
    alt: 'A winter morning in a self serve bay: someone pressure washes a slush covered SUV, a card terminal on the wall'
  },
  laundry: {
    src: '/images/night/laundry.jpg',
    w: 1440,
    h: 1800,
    title: '自助洗衣 · 上午 9:30',
    alt: 'A quiet laundromat on a winter morning, a washer turning while a customer pays at the card terminal on the wall'
  },
  firewood: {
    src: '/images/night/firewood.jpg',
    w: 1440,
    h: 1800,
    title: '自助柴火 · 傍晚 19:00',
    alt: 'A wooden firewood kiosk by the pines at dusk, a card terminal on its front, a customer walking off with a bundle'
  },
  ev: {
    src: '/images/night/ev.jpg',
    w: 1440,
    h: 1800,
    title: '电动车充电 · 晚上 20:00',
    alt: 'Snow falling at night as a driver taps a card on the terminal of an EV charger, the car plugged in beside it'
  },
  vend: {
    src: '/images/night/vend.jpg',
    w: 1440,
    h: 1800,
    title: '自助售货 · 傍晚 5:30',
    alt: 'At dusk, someone pays a glowing vending machine with a phone under a porch light'
  },
  sites: {
    src: '/images/night/sites.jpg',
    w: 1440,
    h: 1800,
    title: '多店管理 · 打烊后 21:00',
    alt: 'After closing, an owner checks a sales chart on a laptop, chairs up on the tables behind'
  },
  golden: {
    src: '/images/night/golden.jpg',
    w: 2400,
    h: 1350,
    title: '黄昏 18:00 · 夕阳下的小镇',
    alt: 'Golden hour on the main street, the low sun behind the mountains, two people walking home past lit shops'
  },
  // v1 came back as a fuel station (pumps and hoses): rejected, awaiting v2
  aegis: {
    src: '/images/night/aegis.jpg',
    w: 2560,
    h: 1440,
    title: '无人值守 · 夜间洗车场',
    alt: 'Self serve wash bays lit up at night with nobody around, wet concrete shining',
  },
  summit: {
    src: '/images/night/summit.jpg',
    w: 1440,
    h: 1800,
    title: '开始使用 · 次日黎明的山顶',
    alt: 'A lone figure on a snowy summit above a sea of cloud, a thin line of dawn on the horizon'
  },
  notfound: {
    src: '/images/night/not-found.jpg',
    w: 1600,
    h: 1000,
    title: '404 · 黄昏的空路',
    alt: 'An empty road at dusk running between dark pines, a blank wooden sign by the roadside'
  },
} as const;

export type NightId = keyof typeof NIGHT;
