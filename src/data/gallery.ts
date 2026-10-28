export interface GallerySlide {
  id: string;
  title: string;
  en: string;
  era: string;
  note: string;
  glyph: string;
  tone: string;
  toneSoft: string;
  /**
   * Leave empty until the image is ready. Drop a file into
   * `public/assets/gallery/` and set e.g. `/assets/gallery/meiping.jpg`.
   */
  image?: string;
  alt?: string;
}

export const gallerySlides: GallerySlide[] = [
  {
    id: 'meiping',
    title: '梅瓶',
    en: 'Meiping',
    era: '宋 · 金',
    note: '丰肩，修长。肩线一缓，器物就安静下来。',
    glyph: '梅',
    tone: '#8fa89a',
    toneSoft: '#e2e9e1',
    image: '',
    alt: '梅瓶的器影',
  },
  {
    id: 'yuhuchun',
    title: '玉壶春',
    en: 'Yuhuchun',
    era: '元 · 明',
    note: '撇口，垂腹。像一滴停在空中的水。',
    glyph: '春',
    tone: '#7f9dbb',
    toneSoft: '#e3ebf2',
    image: '',
    alt: '玉壶春瓶的器影',
  },
  {
    id: 'danping',
    title: '胆瓶',
    en: 'Gall-bladder',
    era: '宋 · 金',
    note: '长颈，圆腹。一把收束的线条。',
    glyph: '胆',
    tone: '#a98b5f',
    toneSoft: '#f0e9dc',
    image: '',
    alt: '胆瓶的器影',
  },
  {
    id: 'hulu',
    title: '葫芦瓶',
    en: 'Gourd',
    era: '明 · 清',
    note: '两节相叠，器形里藏着一点圆融。',
    glyph: '葫',
    tone: '#9d7e9d',
    toneSoft: '#eee4ed',
    image: '',
    alt: '葫芦瓶的器影',
  },
  {
    id: 'guaner',
    title: '贯耳瓶',
    en: 'Handled',
    era: '宋 · 官窑',
    note: '双耳贯耳，线条从礼器里来。',
    glyph: '耳',
    tone: '#b27a5e',
    toneSoft: '#f0e1d8',
    image: '',
    alt: '贯耳瓶的器影',
  },
];
