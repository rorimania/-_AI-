import type { ToneName } from './tones';

export interface GlazeSpec {
  base: string;
  accent: string;
  roughness: number;
  metalness: number;
  clearcoat: number;
  pattern: 'celadon' | 'cobalt' | 'hare' | 'flambe';
}

export interface Craft {
  id: 'longquan' | 'qinghua' | 'jian' | 'jun';
  name: string;
  subtitle: string;
  temp: number;
  tempLabel: string;
  atmosphere: string;
  character: string;
  note: string;
  swatch: string;
  tone: ToneName;
  referenceId: 'celadon' | 'blue-white' | 'jian' | 'jun';
  glaze: GlazeSpec;
}

export const crafts: Craft[] = [
  {
    id: 'longquan',
    name: '龙泉青瓷',
    subtitle: '梅子青',
    temp: 1280,
    tempLabel: '1280°C',
    atmosphere: '还原焰',
    character: '温润 · 沉静',
    note: '釉色如春水初生，温润而不喧哗。',
    swatch:
      'radial-gradient(circle at 34% 28%, #eef4ec 0%, #c9dbce 28%, #8fae9c 58%, #587767 100%)',
    tone: 'celadon',
    referenceId: 'celadon',
    glaze: {
      base: '#b7cdc0',
      accent: '#6b8d7d',
      roughness: 0.24,
      metalness: 0.02,
      clearcoat: 1,
      pattern: 'celadon',
    },
  },
  {
    id: 'qinghua',
    name: '青花钴蓝',
    subtitle: '釉下青花',
    temp: 1320,
    tempLabel: '1320°C',
    atmosphere: '氧化焰',
    character: '清透 · 分明',
    note: '白地青花，一笔一世界。',
    swatch:
      'radial-gradient(circle at 34% 28%, #fdfaf1 0%, #efe9da 38%, #8eabc5 64%, #315e87 100%)',
    tone: 'qinghua',
    referenceId: 'blue-white',
    glaze: {
      base: '#f2eee2',
      accent: '#2f5d8a',
      roughness: 0.16,
      metalness: 0,
      clearcoat: 1,
      pattern: 'cobalt',
    },
  },
  {
    id: 'jian',
    name: '建盏兔毫',
    subtitle: '铁釉兔毫',
    temp: 1300,
    tempLabel: '1300°C',
    atmosphere: '强还原',
    character: '深沉 · 流动',
    note: '一盏玄色，火痕如丝。',
    swatch:
      'radial-gradient(circle at 34% 28%, #9a7a58 0%, #55412f 30%, #281f18 64%, #0d0b09 100%)',
    tone: 'jian',
    referenceId: 'jian',
    glaze: {
      base: '#2a211a',
      accent: '#9b744c',
      roughness: 0.12,
      metalness: 0.08,
      clearcoat: 1,
      pattern: 'hare',
    },
  },
  {
    id: 'jun',
    name: '钧窑窑变',
    subtitle: '天蓝紫斑',
    temp: 1290,
    tempLabel: '1290°C',
    atmosphere: '还原焰',
    character: '变幻 · 偶然',
    note: '入窑一色，出窑万彩。',
    swatch:
      'radial-gradient(circle at 68% 64%, rgba(137, 88, 127, 0.72) 0 14%, transparent 15%), radial-gradient(circle at 34% 28%, #edf3ee 0%, #c2d4cd 32%, #a486a2 64%, #6d4f70 100%)',
    tone: 'jun',
    referenceId: 'jun',
    glaze: {
      base: '#b9cdc6',
      accent: '#8c6388',
      roughness: 0.28,
      metalness: 0.02,
      clearcoat: 0.9,
      pattern: 'flambe',
    },
  },
];

export const craftById = Object.fromEntries(crafts.map((craft) => [craft.id, craft])) as Record<
  Craft['id'],
  Craft
>;

export const defaultCraft = crafts[1];
