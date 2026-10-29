# 瓷韵数绎

> 把一抔土，交给时间与火。

**AI 赋能的陶瓷文化数字化传播与互动体验平台**。以一只瓷器的一生为线索，把「取土 → 拉坯 → 择釉 → 入窑 → 开窑」五道工序，转译成一段可以亲手走完的数字陶艺旅程。

首页首屏先以「器影长廊」展开十一幅器物影像，再进入 3D 观器，认识瓶口、瓶颈、瓶肩、瓶腹与圈足；随后进入「制器」流程，通过 3D 拉坯、试釉问答、候火计时等小游戏完成五道工序。每过一关落一枚印记，最终在开窑页生成只属于这一次游历的「游器手札」，并可下载为图片。

> 馆藏图像来自 The Met 开放获取计划（CC0），体验中的器物为数字生成，非真实文物。

---

---

## 核心体验

### 1. 识器 · 3D 器物图谱

首页承载一只青瓷刻花梅瓶的 Three.js 模型，腹部饰有青瓷莲纹与缠枝叶片。

- 向下滚动，依次聚焦瓶口、瓶颈、瓶肩、瓶腹、瓶底/圈足；
- 虚线引出的部件标注锚定在真实 3D 模型上，随器物旋转与视角变化实时跟随；
- 当前部件高亮，其余标注自动退后；
- 鼠标移动带来轻微视差，器物保持缓慢自转；花纹经过正面时能清楚看见器物在转；
- 画面底部显示「器身自转」状态；关闭动画偏好时，自动旋转、视差与标注动画停止。

3D 加载失败或 WebGL 不可用时，页面保留 SVG 器物海报与完整文字介绍。

### 2. 制器 · 游器五关

五道工序被组织成一套「游器谱」小游戏系统。每关会落下一枚手印：

| 工序 | 印记 | 小游戏 | 玩法 |
| --- | --- | --- | --- |
| 取土 | 醒 | 揉泥三巡 | 跟随泥团上亮起的记号按压三次，按得越准，泥性越好 |
| 拉坯 | 转 | 三手定型 | 在 3D 轮盘上左右拖动器身，三次塑形后记录手感 |
| 择釉 | 辨 | 试釉三问 | 听一句釉色的话，猜出它来自哪种火候与釉色 |
| 入窑 | 候 | 候火三刻 | 等火色进入保温带时投柴，命中越准，火候越稳 |
| 开窑 | 见 | 五印成谱 | 汇合五枚印记与选择，生成游器手札 |

顶栏的 **游器谱** 入口可以随时打开：

- 查看五关进度与当前任务；
- 回看每一关的得分与落印说明；
- 从任意一关继续；
- 重新开始一次游器。

### 3. 拉坯 · 真实 3D 轮盘

拉坯页不再是静态占位，而是一个可交互的 Three.js 轮盘场景：

- 左右拖动器身，实时改变轮廓半径；
- 提供梅瓶、玉壶春、罐三种器型起点；
- 支持旋转查看、修坯、撤销、重置、滚轮缩放；
- 三次有效拖动后完成本关，记录器型与手数；
- 移动端限制径向分段与像素比，保留流畅度。

### 4. 开窑 · 游器手札

完成五关后，开窑页自动生成一份可下载的「游器手札」：

- 本次器型、釉色、游历时长、手感均分；
- 五枚印记与各关得分；
- 根据釉色与器型生成的称号，例如「梅瓶 · 守青人」；
- 根据实际玩法生成的逐关叙述；
- 下载为 `瓷韵数绎-游器回忆.png`；
- 支持重新生成，或重新开始一次游器。

进度保存在浏览器本地，不上传服务器。

### 5. 器影长廊 · 首页首屏伪 3D 轮播

首页首屏放置一个放大的「器影长廊」：

- 十一张器物影像以旋转透视形成 3D 封面流，首屏即可看到轮播与控制；
- 自动轮播速度放慢，支持左右按钮、圆点与方向键切换；
- 鼠标悬停在器影上时，滚轮即可换下一张，不需要点击；
- 点击卡片可打开大图预览，完整查看图片与器影说明；
- 滚出视口时自动暂停。

---

## 快速开始

### 环境要求

- Node.js **>= 22.23.4**（Astro 7 的要求）
- pnpm **>= 7.1.0**（项目使用 pnpm 10 生成锁文件）
- 支持 WebGL 2 的现代浏览器，推荐 Chrome / Edge / Safari / Firefox 最新版

### 本地运行

```bash
pnpm install
pnpm dev
```

打开 <http://localhost:4321>。

### 构建与预览

```bash
pnpm build
pnpm preview
```

静态站点产物输出到 `dist/`，可部署到任意静态托管平台。

### 类型检查

```bash
pnpm check
```

---

## 页面路由

| 路由 | 页面 | 主要内容 |
| --- | --- | --- |
| `/` | 识器 | 首屏器影长廊、3D 观器、器物部件标注、五道工序、馆藏四色 |
| `/create/clay` | 取土 | 揉泥三巡小游戏、泥料配比 |
| `/create/form` | 拉坯 | 3D 轮盘塑形、器型预设、修坯与撤销 |
| `/create/craft` | 择釉 | 试釉三问、四种釉色、馆藏参照 |
| `/create/fire` | 入窑 | 候火三刻、烧成阶段、窑温反馈 |
| `/create/result` | 开窑 | 成品陈列、器物档案、游器手札、回忆卡下载 |
| `/credits` | 素材鸣谢 | 馆藏图像与 HDRI 来源 |

---

## 技术栈

| 层级 | 选型 |
| --- | --- |
| 页面框架 | Astro 7，静态输出 |
| 页面转场 | Astro `ClientRouter` + View Transitions |
| 3D 渲染 | Three.js 0.186，原生封装 |
| 交互脚本 | TypeScript + 原生 DOM / Canvas |
| 字体 | Noto Serif SC Variable、EB Garamond Variable（Fontsource） |
| 状态存储 | `localStorage` |
| 视觉资产 | The Met CC0 馆藏图像、Poly Haven CC0 HDRI |
| 浏览器 QA | Playwright Core + 本机 Chrome |

项目采用 Astro 的静态输出与按需加载策略：Three.js 只在需要 3D 的页面动态载入，攻略页、馆藏页等保持轻量。

---

## 目录结构

```text
.
├─ src/
│  ├─ components/
│  │  ├─ GalleryCarousel.astro    # 伪 3D 器影轮播
│  │  ├─ JourneyHud.astro         # 游器手札抽屉
│  │  ├─ StepRail.astro           # 五关进度与印记
│  │  ├─ VesselPoster.astro       # SVG 器物回退图
│  │  └─ ...
│  ├─ data/
│  │  ├─ site.ts                  # 首页文案、工序、章节、导航
│  │  ├─ crafts.ts                # 四种釉色数据
│  │  ├─ gallery.ts               # 十一张器影与预览文案
│  │  ├─ references.ts            # 馆藏图像数据
│  │  └─ tones.ts                 # 釉色调色板
│  ├─ layouts/
│  │  ├─ BaseLayout.astro
│  │  └─ CreateLayout.astro
│  ├─ lib/
│  │  ├─ journey.ts               # 游器状态、印记、评分与回忆生成
│  │  ├─ home/observatory.ts      # 首页滚动叙事与标注同步
│  │  └─ vessel/
│  │     ├─ profile.ts            # 器物轮廓与器型预设
│  │     ├─ geometry.ts           # Lathe 几何体
│  │     ├─ decoration.ts         # 程序化青瓷莲纹贴图
│  │     ├─ materials.ts          # 釉面材质
│  │     ├─ environment.ts        # 工作室灯光与 HDRI
│  │     ├─ home-scene.ts         # 首页观器 3D
│  │     └─ wheel-scene.ts        # 拉坯轮盘 3D
│  ├─ pages/
│  │  ├─ index.astro
│  │  ├─ create/
│  │  │  ├─ clay.astro
│  │  │  ├─ form.astro
│  │  │  ├─ craft.astro
│  │  │  ├─ fire.astro
│  │  │  └─ result.astro
│  │  └─ credits.astro
│  ├─ scripts/                    # 各页交互与游戏
│  └─ styles/                     # tokens / base / components
├─ public/
│  └─ assets/
│     ├─ hdri/                    # 本地工作室 HDRI
│     └─ gallery/                 # 器影卡片图与预览大图
├─ scripts/                       # QA 截图与交互脚本
├─ 设计文档.md
├─ CREDITS.md
└─ README.md
```

---

## 数据与配置

### 器影长廊图片

首页首屏已经接入 **11 张器影**，全部使用 `public/assets/gallery/` 中的压缩版本：

- `*-card.jpg`：宽 800px，用于轮播卡片；
- `*-large.jpg`：宽 1600px，用于点击预览。

标题、英文名、说明与图片路径统一配置在 `src/data/gallery.ts`：

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

如果需要替换或新增图片：

1. 将原图导出为 `800px` 与 `1600px` 两档 JPEG（建议质量 80–84）；
2. 放进 `public/assets/gallery/`；
3. 在 `src/data/gallery.ts` 中填写 `image` 与 `preview`。

轮播卡片会自动裁切为竖版，预览弹窗保留完整图片。

目录中的 `public/assets/gallery/README.md` 也记录了同样说明。

### 文案与工序

- 首页章节：`src/data/site.ts` 中的 `chapters`
- 五道工序：`src/data/site.ts` 中的 `steps`
- 釉色、窑温与描述：`src/data/crafts.ts`
- 游器关卡、印记与称号：`src/lib/journey.ts`

修改器物部件范围时，需要同时检查 `src/lib/vessel/profile.ts` 中的 `PART_RANGES`。

### 游器进度

游器状态保存在：

```text
localStorage: ciyun:journey:v1
```

包含：

- 开始时间与最后更新时间；
- 五关得分、落印说明与游戏元数据；
- 器型起点与塑形手数；
- 所选釉色。

所有数据仅保留在当前设备，清理浏览器站点数据即可重置。

---

## 3D 与交互实现

### 首页观器

`observatory.ts` 将滚动位置归一化为 `-1 → 4` 的连续状态：

- `-1`：全景；
- `0`：瓶口；
- `1`：瓶颈；
- `2`：瓶肩；
- `3`：瓶腹；
- `4`：瓶底/圈足。

状态通过 `ciyun:observe` 事件发送给 Three.js 场景，场景同步更新相机、器物旋转、部件高亮与边界环。

场景还会把五处部件在屏幕上的实际投影坐标通过 `ciyun:vessel-anchors` 回传给 DOM，虚线标注因此能跟随模型，而不是固定贴图。

瓶身莲纹由 `decoration.ts` 程序化绘制为透明贴图，再映射到腹部装饰带；器物以稳定的速度持续自转，因此即使不滚动，也能从花纹的位移辨认出 3D 旋转。

### 拉坯轮盘

`wheel-scene.ts` 以「半径关于高度的轮廓函数」为编辑对象：

- 拖动时修改邻近控制点半径；
- 通过钳制与轻度平滑保护轮廓；
- 每次变化重建 LatheGeometry；
- 场景在页面不可见时暂停渲染；
- 页面切换时释放几何体、材质、纹理与 WebGL 上下文。

### 渐进增强

- 3D 不可用时保留 `VesselPoster` SVG 回退；
- 游戏操作都有文字提示与即时状态反馈；
- 非用户触发的动画在 `prefers-reduced-motion` 下关闭；
- 轮播与游器谱支持键盘操作。

---

## 无障碍与性能

- `prefers-reduced-motion: reduce`：关闭自动旋转、自动轮播、脉冲与部分装饰动画。
- 轮播支持左右方向键、Home / End。
- 游器谱支持键盘打开、关闭与 Esc 收起。
- 画布均提供 `aria-hidden`，关键信息同时存在于文本内容中。
- 首页 3D 场景在页面不可见时暂停；移动端降低径向分段与 DPR。
- Three.js 与 3D 场景按需动态加载，避免所有页面承担渲染成本。
- 字体与 HDRI 均随项目本地提供，不依赖外部 CDN。

构建时 Vite 会提示 Three.js 相关 chunk 超过 500 kB。该 chunk 只在 3D 页面加载，不影响纯内容页面的首屏。

---

## 开发校验

```bash
pnpm check   # TypeScript / Astro 检查
pnpm build   # 生产构建
```

当前检查结果为 **0 errors**，`pnpm build` 可成功生成 7 个静态页面。

仓库中的 `scripts/qa-*.mjs` 提供 Playwright 截图与交互检查脚本，运行时需要：

1. 先启动开发服务器；
2. 本机安装 Chrome；
3. 脚本中默认使用 Windows Chrome 路径，其他系统请修改 `executablePath`。

---

## 已知限制与后续计划

- [x] 首页 3D 观器与器物部件虚线标注
- [x] 五关引导型小游戏
- [x] 拉坯页真实 3D 轮盘
- [x] 游器手札生成与图片下载
- [x] 伪 3D 器影轮播
- [x] 器影长廊接入 11 张器物图片
- [ ] 为器影图片补充馆藏 / 摄影来源说明
- [ ] 将自定义拉坯轮廓持久化并用于开窑成品
- [ ] 文物数据与 AI 实验室扩展
- [ ] 跨设备同步游器手札

> AI 能力在当前版本中为架构与产品层的预留项，核心体验优先保证数字陶艺流程完整、可运行、可展示。

---

## 素材与版权

- 馆藏图像：The Metropolitan Museum of Art Open Access，CC0。
- 工作室 HDRI：Poly Haven，CC0。
- 字体：Noto Serif SC、EB Garamond，通过 Fontsource 使用。
- 器影长廊照片：由项目组提供，仅用于本次参赛展示。
- 页面中的 3D 器物、釉色与游器手札为数字生成；器影长廊照片为项目组提供的展示素材。

完整来源与授权说明见 [CREDITS.md](CREDITS.md)。

本项目用于第九届传智杯参赛展示。第三方素材遵循其各自授权；项目代码与数字生成内容的使用请与项目作者联系。
