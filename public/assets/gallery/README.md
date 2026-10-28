# 器影长廊图片

首页首屏器影长廊已接入 11 张图片。

每件器物保留两个尺寸：

- `*-card.jpg`：宽 800px，用于轮播卡片；
- `*-large.jpg`：宽 1600px，用于点击预览。

图片在 `src/data/gallery.ts` 中配置：

```ts
{
  id: 'dragon-vase',
  title: '青花云龙纹瓶',
  // ...
  image: '/assets/gallery/dragon-vase-card.jpg',
  preview: '/assets/gallery/dragon-vase-large.jpg',
  alt: '人物与青花云龙纹大瓶',
}
```

## 替换或新增

1. 把原图导出为 `800px` 和 `1600px` 两档 JPEG（建议质量 80–84）；
2. 复制到本目录；
3. 在 `src/data/gallery.ts` 中填写对应的 `image` 与 `preview`；
4. 如果要新增器物，直接向 `gallerySlides` 数组追加一项即可，轮播数量会自动更新。

轮播卡片会自动裁切为竖版，点击卡片后的预览会保留完整画面。
