export type ToneName = 'celadon' | 'qinghua' | 'jian' | 'jun';

export interface TonePalette {
  a: string;
  b: string;
  c: string;
  d: string;
  e: string;
  rimA: string;
  rimB: string;
  rimC: string;
  edge: string;
}

export const tonePalettes: Record<ToneName, TonePalette> = {
  celadon: {
    a: '#fcf8f0',
    b: '#f0e9db',
    c: '#dde4d8',
    d: '#cbd7c9',
    e: '#b9c9bb',
    rimA: '#f8f2e7',
    rimB: '#d5d9cb',
    rimC: '#aab8a9',
    edge: '#45584d',
  },
  qinghua: {
    a: '#fdfaf2',
    b: '#f6f1e5',
    c: '#ece7d9',
    d: '#dfe4df',
    e: '#cfd9d2',
    rimA: '#fbf6ec',
    rimB: '#e3ded1',
    rimC: '#c3cec5',
    edge: '#3b5a70',
  },
  jian: {
    a: '#745d46',
    b: '#51402f',
    c: '#362a20',
    d: '#221b15',
    e: '#15110d',
    rimA: '#8a6f52',
    rimB: '#4a3a2c',
    rimC: '#211a15',
    edge: '#7a6248',
  },
  jun: {
    a: '#f4f3ec',
    b: '#e4ebe4',
    c: '#c9d9d2',
    d: '#bab4bf',
    e: '#9c7f9a',
    rimA: '#f0efe7',
    rimB: '#c9d9d2',
    rimC: '#9c7f9a',
    edge: '#5d4b5d',
  },
};
