// Every spot on the site that needs a REAL photo (never a generated image:
// these are evidence of real sites, real terminals, real people).
//
// To fill a slot: put the file at public/photos/<file>, write the alt text,
// set ready: true. Until then <PhotoSlot> shows a placeholder with the brief.
// Full shooting brief: docs/PHOTO_SHOTLIST.md

export type PhotoId =
  | 'eagleson-site'
  | 'eagleson-terminal'
  | 'eagleson-vacuum'
  | 'ourea-counter'
  | 'iris-table'
  | 'aegis-bay'
  | 'aegis-vend'
  | 'cael-console';

export type Photo = {
  file: string;
  ready: boolean;
  /** CSS aspect-ratio, e.g. '3 / 2' */
  ratio: string;
  /** minimum export size, px */
  size: string;
  /** what the photo is, shown on the placeholder (Chinese, for the photographer) */
  title: string;
  /** shooting requirements, shown on the placeholder */
  brief: string[];
  /** English alt text, required before ready: true */
  alt: string;
};

export const PHOTOS: Record<PhotoId, Photo> = {
  'eagleson-site': {
    file: 'eagleson-site.webp',
    ready: true,
    ratio: '3 / 2',
    size: '2400 × 1600',
    title: 'Eagleson 洗车场全景',
    brief: [
      '从停车场斜前方拍，能看到几个湾位和店招',
      '傍晚或清晨的暖光，天空占画面上方三分之一',
      '画面里不能有可辨认的车牌和人脸',
    ],
    alt: 'Eagleson Coin Wash in Kanata at dusk: a row of self serve bays lit from inside, an icy lot in front',
  },
  'eagleson-terminal': {
    file: 'eagleson-terminal.webp',
    ready: true,
    ratio: '1 / 1',
    size: '1600 × 1600',
    title: '湾位上的 Aegis Wash 终端',
    brief: ['终端装在湾位里的样子，屏幕亮着', '一只手正在拍卡'],
    alt: 'An Aegis Wash card terminal mounted on a blue steel panel in a wash bay, its screen lit, beside the coin box',
  },
  'eagleson-vacuum': {
    file: 'eagleson-vacuum.webp',
    ready: true,
    ratio: '1 / 1',
    size: '1600 × 1600',
    title: '吸尘站和 Aegis Timer',
    brief: ['吸尘站整体，带上终端和吸管', '能看出它在洗车场旁边'],
    alt: 'The vacuum station at Eagleson Coin Wash, hoses on both sides, its Aegis Timer card terminal lit in orange',
  },
  'ourea-counter': {
    file: 'ourea-counter.webp',
    ready: false,
    ratio: '4 / 5',
    size: '1600 × 2000',
    title: 'Ourea 在真实柜台上',
    brief: [
      '餐厅或小店的柜台，Ourea 收银和顾客屏都在画面里',
      '店员在操作，可以只拍手和侧身',
      '如果是演示环境而不是真实门店，要告诉我，页面上会注明',
    ],
    alt: '',
  },
  'iris-table': {
    file: 'iris-table.webp',
    ready: false,
    ratio: '4 / 5',
    size: '1600 × 2000',
    title: 'Iris 手持机在桌边结账',
    brief: [
      '服务员拿着 Iris 站在餐桌旁，顾客正在付款',
      '浅景深，焦点在手持机上',
      '顾客脸部不入镜，或已签肖像授权',
    ],
    alt: '',
  },
  'aegis-bay': {
    file: 'aegis-bay.webp',
    ready: false,
    ratio: '4 / 5',
    size: '1600 × 2000',
    title: '夜里的自助湾位',
    brief: ['天黑后的洗车湾，灯亮着，没有人', '终端在画面里，屏幕亮着'],
    alt: '',
  },
  'aegis-vend': {
    file: 'aegis-vend.webp',
    ready: false,
    ratio: '4 / 5',
    size: '1600 × 2000',
    title: '售货机上的 Aegis Vend 读卡器',
    brief: [
      '自动售货机正面，读卡器装在投币口旁边',
      '一只手正在拍卡，机器品牌和商标不要入镜',
      '如果还没有真实安装点，告诉我，这一格改用插图',
    ],
    alt: '',
  },
  'cael-console': {
    file: 'cael-console.webp',
    ready: false,
    ratio: '4 / 5',
    size: '1600 × 2000',
    title: 'Cael 后台在笔记本或手机上',
    brief: [
      '拍屏幕上的 Cael：门店列表或终端状态页',
      '真实界面，但遮掉客户名称、金额和任何个人信息',
      '也可以直接给我截图，我来排版',
    ],
    alt: '',
  },
};
