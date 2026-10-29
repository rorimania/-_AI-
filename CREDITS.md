# 素材来源与许可

本项目为第九届传智杯参赛作品「瓷韵数绎」。所有外部素材均已本地化，页面运行时不依赖外部图床或 CDN。以下逐项记录来源、许可与用途。素材下载与核对日期：2026-10-27（中国标准时间）。

## 馆藏图像（CC0）

四件图像均来自 [The Metropolitan Museum of Art Open Access](https://www.metmuseum.org/art/collection)，由 Met 以 CC0 1.0 发布。图像仅作器型、釉色与文化背景的参照；体验中的 3D 器物为程序化生成的数字作品，不是藏品复制。

| 文件 | 藏品 | 年代 | 藏品页 | Credit |
| --- | --- | --- | --- | --- |
| `src/assets/references/met-75938-blue-white-meiping.jpg` | Vase in Meiping Shape with Daoist Immortal Zhongli Quan（青花钟离权图梅瓶），景德镇窑 | 15 世纪后半叶 | [75938](https://www.metmuseum.org/art/collection/search/75938) | Purchase, Friends of Asian Art Gifts, 2010 |
| `src/assets/references/met-51050-longquan-celadon-bottle.jpg` | Bottle vase（龙泉窑青釉瓶），龙泉窑，金缮修复 | 13 世纪 | [51050](https://www.metmuseum.org/art/collection/search/51050) | Fletcher Fund, 1934 |
| `src/assets/references/met-51076-jian-hare-fur-bowl.jpg` | Tea Bowl with Hare’s-Fur Decoration（建窑兔毫盏），建窑 | 11–12 世纪 | [51076](https://www.metmuseum.org/art/collection/search/51076) | H. O. Havemeyer Collection, Bequest of Mrs. H. O. Havemeyer, 1929 |
| `src/assets/references/met-460659-jun-jar.jpg` | Jar, Jun ware（钧窑天蓝紫斑罐），钧窑 | 约 13 世纪 | [460659](https://www.metmuseum.org/art/collection/search/460659) | Robert Lehman Collection, 1975 |

许可：CC0 1.0 Universal（公共领域贡献）。CC0 不要求署名；本页与站点页脚仍保留来源，出于对藏品、馆藏机构与摄影者的尊重。

## 环境光（CC0）

- 素材：`studio_small_03` 1K HDR
- 作者/来源：Poly Haven
- 页面：https://polyhaven.com/a/studio_small_03
- 下载文件：`public/assets/hdri/studio_small_03_1k.hdr`
- 许可：CC0 1.0
- 用途：Three.js PMREM 环境光照与釉面反射；加载失败时回退为程序化环境光。

## 器影长廊图片

- 文件：`public/assets/gallery/*-card.jpg`、`public/assets/gallery/*-large.jpg`
- 用途：首页首屏「器影长廊」轮播卡片与点击预览
- 来源：由项目组提供的展示素材，不作为馆藏文物图像使用。
- 备注：如需公开再发布这些图片，请先确认图片授权，并在此补充摄影、生成或版权信息。

## 字体（SIL OFL 1.1）

- Noto Serif SC Variable（Google / Adobe），通过 `@fontsource-variable/noto-serif-sc` 自托管。
- EB Garamond Variable（Georg Duffner / Octavio Pardo），通过 `@fontsource-variable/eb-garamond` 自托管。
- 许可：SIL Open Font License 1.1。

## 程序化生成

- 3D 器型、内外壁、圈足、开片、釉面纹理、纸张颗粒、印章、线描图示与温度/火色反馈，均由项目代码生成，不使用外部 3D 扫描模型或图库纹理。
- 生成式 AI 未用于修改任何馆藏图像。

## 评估但未采用的来源

- **故宫博物院数字文物库** `digicol.dpm.org.cn`、**中国国家博物馆** `chnmuseum.cn`、**上海博物馆** `shanghaimuseum.net`：按各馆条款不可下载，仅用于交互与器型参考，未嵌入。
- **Sketchfab**：许可逐件不同，未采用。若未来采用，只选取明确允许再分发并可署名的模型，并在此登记。
- **Smithsonian 3D**：CC0，本次未找到适合作为核心可形变器物的扫描，未采用。
- **Polycam / Meshroom / Blender / KIRI Engine**：记录为未来自制扫描与减面流程，本项目不依赖。
- **model-viewer**：未采用；3D 统一由 Three.js 控制。

## 二次使用

如转载或再发布本项目，请保留本文件的素材来源与许可说明，并不要将馆藏图像用于暗示馆藏机构对本作品的背书。
