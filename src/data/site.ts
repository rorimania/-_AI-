export interface Chapter {
  id: 'mouth' | 'neck' | 'shoulder' | 'belly' | 'foot';
  num: string;
  title: string;
  en: string;
  copy: string;
  range: [number, number];
}

export interface Step {
  n: number;
  name: string;
  en: string;
  copy: string;
  href: string;
  icon: 'clay' | 'wheel' | 'glaze' | 'kiln' | 'vessel';
}

export const chapters: Chapter[] = [
  {
    id: 'mouth',
    num: '01',
    title: '瓶口',
    en: 'Mouth',
    copy: '器物顶部开口，决定盛装与气息。唇口的一线厚薄，是手的分寸。',
    range: [0.88, 1],
  },
  {
    id: 'neck',
    num: '02',
    title: '瓶颈',
    en: 'Neck',
    copy: '连接口与身。收放之间，线条是否舒展，全看这一段。',
    range: [0.76, 0.88],
  },
  {
    id: 'shoulder',
    num: '03',
    title: '瓶肩',
    en: 'Shoulder',
    copy: '瓶颈向瓶腹的转折。肩线一缓一急，器物的性格便不同。',
    range: [0.58, 0.76],
  },
  {
    id: 'belly',
    num: '04',
    title: '瓶腹',
    en: 'Belly',
    copy: '器物的主体。容纳容量，也容纳视觉的重量。',
    range: [0.2, 0.58],
  },
  {
    id: 'foot',
    num: '05',
    title: '瓶底 · 圈足',
    en: 'Foot',
    copy: '支撑与稳定。圈足的高度与修整，是器物最后的体面。',
    range: [0, 0.2],
  },
];

export const steps: Step[] = [
  {
    n: 1,
    name: '取土',
    en: 'Clay',
    copy: '高岭土与瓷石相遇。揉去气泡，也揉进耐性。',
    href: '/create/clay',
    icon: 'clay',
  },
  {
    n: 2,
    name: '拉坯',
    en: 'Form',
    copy: '轮盘转动，手与水让泥找到自己的重心。',
    href: '/create/form',
    icon: 'wheel',
  },
  {
    n: 3,
    name: '择釉',
    en: 'Glaze',
    copy: '釉是火前的承诺。青、蓝、黑、紫，各有各的命数。',
    href: '/create/craft',
    icon: 'glaze',
  },
  {
    n: 4,
    name: '入窑',
    en: 'Fire',
    copy: '温度改变一切。土在火里，成为器。',
    href: '/create/fire',
    icon: 'kiln',
  },
  {
    n: 5,
    name: '开窑',
    en: 'Reveal',
    copy: '窑门打开之前，没有人知道全部的答案。',
    href: '/create/result',
    icon: 'vessel',
  },
];

export const stepRail = steps.map((step) => ({
  n: step.n,
  name: step.name,
  href: step.href,
}));

export const navLinks = [
  { label: '识器', href: '/#observe', match: 'home' },
  { label: '工序', href: '/#process', match: 'process' },
  { label: '馆藏', href: '/#collection', match: 'collection' },
  { label: '器影', href: '/#gallery', match: 'gallery' },
  { label: '制器', href: '/create/clay', match: 'create' },
];

export const hero = {
  eyebrow: '数字陶艺 · 交互体验',
  title: ['把一抔土，', '交给时间与火。'],
  lead: '从取土、拉坯、择釉，到入窑、开窑。用数字之手，走完一只瓷器的一生。',
  meta: ['五道工序', '四种釉色', '一只器物'],
};
