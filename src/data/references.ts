import type { ImageMetadata } from 'astro';
import blueWhiteImage from '../assets/references/met-75938-blue-white-meiping.jpg';
import celadonImage from '../assets/references/met-51050-longquan-celadon-bottle.jpg';
import jianImage from '../assets/references/met-51076-jian-hare-fur-bowl.jpg';
import junImage from '../assets/references/met-460659-jun-jar.jpg';

export interface Reference {
  id: 'blue-white' | 'celadon' | 'jian' | 'jun';
  index: string;
  titleZh: string;
  titleEn: string;
  dateZh: string;
  mediumZh: string;
  source: string;
  page: string;
  metId: number;
  creditLine: string;
  image: ImageMetadata;
  alt: string;
}

export const references: Reference[] = [
  {
    id: 'blue-white',
    index: '01',
    titleZh: '青花钟离权图梅瓶',
    titleEn: 'Vase in Meiping Shape with Daoist Immortal Zhongli Quan',
    dateZh: '明 · 十五世纪后半叶',
    mediumZh: '景德镇窑 · 釉下钴蓝',
    source: 'The Met · CC0',
    page: 'https://www.metmuseum.org/art/collection/search/75938',
    metId: 75938,
    creditLine: 'Purchase, Friends of Asian Art Gifts, 2010',
    image: blueWhiteImage,
    alt: '青花钟离权图梅瓶，明代十五世纪后半叶，景德镇窑，白地钴蓝人物纹',
  },
  {
    id: 'celadon',
    index: '02',
    titleZh: '龙泉窑青釉瓶',
    titleEn: 'Bottle vase',
    dateZh: '元 · 十三世纪',
    mediumZh: '龙泉窑 · 青釉 · 金缮修复',
    source: 'The Met · CC0',
    page: 'https://www.metmuseum.org/art/collection/search/51050',
    metId: 51050,
    creditLine: 'Fletcher Fund, 1934',
    image: celadonImage,
    alt: '龙泉窑青釉瓶，元代十三世纪，淡青釉，口沿有金色修缮',
  },
  {
    id: 'jian',
    index: '03',
    titleZh: '建窑兔毫盏',
    titleEn: 'Tea Bowl with Hare’s-Fur Decoration',
    dateZh: '北宋 · 十一至十二世纪',
    mediumZh: '建窑 · 铜氧化物釉',
    source: 'The Met · CC0',
    page: 'https://www.metmuseum.org/art/collection/search/51076',
    metId: 51076,
    creditLine: 'H. O. Havemeyer Collection, Bequest of Mrs. H. O. Havemeyer, 1929',
    image: jianImage,
    alt: '建窑兔毫盏，北宋十一至十二世纪，黑釉碗，釉面有褐色兔毫纹',
  },
  {
    id: 'jun',
    index: '04',
    titleZh: '钧窑天蓝紫斑罐',
    titleEn: 'Jar, Jun ware',
    dateZh: '金元 · 约十三世纪',
    mediumZh: '钧窑 · 天蓝釉 · 紫斑',
    source: 'The Met · CC0',
    page: 'https://www.metmuseum.org/art/collection/search/460659',
    metId: 460659,
    creditLine: 'Robert Lehman Collection, 1975',
    image: junImage,
    alt: '钧窑天蓝紫斑罐，约十三世纪，天蓝釉面带有紫红色窑变斑',
  },
];

export const referenceById = Object.fromEntries(
  references.map((reference) => [reference.id, reference]),
) as Record<Reference['id'], Reference>;
