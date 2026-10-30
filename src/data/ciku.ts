export interface CikuImage {
  src: string;
  card: string;
  alt: string;
}

export interface CikuItem {
  id: string;
  title: string;
  dynasty: string;
  culture: string;
  era: string;
  dimensions: string;
  description: string;
  images: CikuImage[];
  dpmId: string;
  source: string;
}

export interface CikuCategory {
  id: string;
  num: string;
  name: string;
  en: string;
  period: string;
  intro: string;
  cover: string;
  coverAlt: string;
  items: CikuItem[];
}

/** 瓷库 · 十类器物。图像与文字资料来自故宫博物院数字文物库。 */
export const cikuCategories: CikuCategory[] = [
  {
    "id": "red",
    "num": "01",
    "name": "红陶",
    "en": "Red Earthenware",
    "period": "约前 6000 — 前 1900 年",
    "intro": "以氧化气氛烧成，胎体呈红或橙红，是新石器时代最早、最常见的陶器。磁山文化的盂、碗、三足钵与龙山文化的鬶，都还带着泥条盘筑与手捏的痕迹。",
    "cover": "/assets/ciku/hongtao/dpm-227464-01.jpg",
    "coverAlt": "龙山文化红陶鬶（新石器时代 · 龙山文化）图01",
    "items": [
      {
        "id": "dpm-227584",
        "title": "磁山文化红陶盂",
        "dynasty": "新石器时代",
        "culture": "磁山文化",
        "era": "新石器时代 · 磁山文化",
        "dimensions": "高15.3cm 口径15.3cm 底径11.3cm",
        "description": "红陶盂，新石器时代磁山文化，高15.3厘米，口径15.3厘米，底径11.3厘米。 盂（yú音于），撇口，圆筒形腹，平底。夹砂红陶，胎壁较厚，表面粗糙。磁山文化因最初于1972年发现于河北省武安县磁山村而得名。据科学测试，其年代约为公元前6000—前5600年，属于华北地区新石器时代中期文化遗存。盂是一种盛汤浆或饭食的器皿，红陶夹砂能够提高陶器的耐热程度，因此这件红陶盂可能是一件炊器。",
        "images": [
          {
            "src": "/assets/ciku/hongtao/dpm-227584-01.jpg",
            "alt": "磁山文化红陶盂（新石器时代 · 磁山文化）图01",
            "card": "/assets/ciku/hongtao/dpm-227584-01-card.jpg"
          },
          {
            "src": "/assets/ciku/hongtao/dpm-227584-02.jpg",
            "alt": "磁山文化红陶盂（新石器时代 · 磁山文化）图02",
            "card": "/assets/ciku/hongtao/dpm-227584-02-card.jpg"
          }
        ],
        "dpmId": "227584",
        "source": "https://www.dpm.org.cn/collection/ceramic/227584.html"
      },
      {
        "id": "dpm-227560",
        "title": "磁山文化红陶平底碗",
        "dynasty": "新石器时代",
        "culture": "磁山文化",
        "era": "新石器时代 · 磁山文化",
        "dimensions": "高6.7cm，口径18.2cm，底径6.4cm",
        "description": "红陶平底碗，新石器时代磁山文化，高6.7厘米，口径18.2厘米，底径6.4厘米。 碗敞口，口以下渐内收，平底。泥质红陶，胎壁薄厚不均。磁山文化陶器以红陶为主，碗是其中较常见的器形之一。此碗制作工艺明显带有新石器时代中期陶器的特征。 磁山文化因最初于1973年发现于河北省武安县磁山村而得名。据科学测试，其年代约为公元前6000～前5600年，属于华北地区新石器时代中期文化遗存。",
        "images": [
          {
            "src": "/assets/ciku/hongtao/dpm-227560-01.jpg",
            "alt": "磁山文化红陶平底碗（新石器时代 · 磁山文化）图01",
            "card": "/assets/ciku/hongtao/dpm-227560-01-card.jpg"
          },
          {
            "src": "/assets/ciku/hongtao/dpm-227560-02.jpg",
            "alt": "磁山文化红陶平底碗（新石器时代 · 磁山文化）图02",
            "card": "/assets/ciku/hongtao/dpm-227560-02-card.jpg"
          }
        ],
        "dpmId": "227560",
        "source": "https://www.dpm.org.cn/collection/ceramic/227560.html"
      },
      {
        "id": "dpm-227480",
        "title": "齐家文化红陶盉",
        "dynasty": "新石器时代",
        "culture": "齐家文化",
        "era": "新石器时代 · 齐家文化",
        "dimensions": "高15cm，口径9cm，底径5.7cm",
        "description": "红陶盉，新石器时代齐家文化，高15厘米，口径9厘米，底径5.7厘米。 盉（hé音禾），阔颈，溜肩，鼓腹，腹以下内收，平底。一侧置短流，另一侧置宽柄。泥质红陶。器表打磨光滑。据科学测试，齐家文化的年代约为公元前2200～前1900年。 齐家文化系继承马家窑文化发展而来，是黄河上游新石器时代晚期至青铜时代早期的一种文化。主要遗址在青海、甘肃等地。齐家文化陶器独具特色，代表器形主要有双耳大罐等。 盉是一种盛水器，既可以装水来调和酒，也可以用作盥沐的水具。",
        "images": [
          {
            "src": "/assets/ciku/hongtao/dpm-227480-01.jpg",
            "alt": "齐家文化红陶盉（新石器时代 · 齐家文化）图01",
            "card": "/assets/ciku/hongtao/dpm-227480-01-card.jpg"
          },
          {
            "src": "/assets/ciku/hongtao/dpm-227480-02.jpg",
            "alt": "齐家文化红陶盉（新石器时代 · 齐家文化）图02",
            "card": "/assets/ciku/hongtao/dpm-227480-02-card.jpg"
          }
        ],
        "dpmId": "227480",
        "source": "https://www.dpm.org.cn/collection/ceramic/227480.html"
      },
      {
        "id": "dpm-227464",
        "title": "龙山文化红陶鬶",
        "dynasty": "新石器时代",
        "culture": "龙山文化",
        "era": "新石器时代 · 龙山文化",
        "dimensions": "高39cm，口径12cm，足距14cm",
        "description": "红陶鬶，新石器时代龙山文化，高39厘米，口径12厘米，足距14厘米。 鬶（guī音规），唇口，口一侧出鸟喙状长流，长颈，下承以三个袋状足。器身一侧置绳状鋬（pàn音盼）手。口沿下及鋬手上端饰乳钉纹。颈、足衔接处饰凸弦纹。器表打磨光亮。据科学测试，龙山文化的年代约为公元前2500～前2000年。此件红陶鬶造型规整，堪称新石器时代晚期龙山文化红陶的代表作品。 鬶是一种盛水器，造型有点像鸟。这种器形最早出现在山东地区，山东位于东方，那个时候是少昊和太昊的部落，他们以鸟为图腾，所以就不难理解为什么会出现鬶这样形状的器物了。",
        "images": [
          {
            "src": "/assets/ciku/hongtao/dpm-227464-01.jpg",
            "alt": "龙山文化红陶鬶（新石器时代 · 龙山文化）图01",
            "card": "/assets/ciku/hongtao/dpm-227464-01-card.jpg"
          },
          {
            "src": "/assets/ciku/hongtao/dpm-227464-02.jpg",
            "alt": "龙山文化红陶鬶（新石器时代 · 龙山文化）图02",
            "card": "/assets/ciku/hongtao/dpm-227464-02-card.jpg"
          }
        ],
        "dpmId": "227464",
        "source": "https://www.dpm.org.cn/collection/ceramic/227464.html"
      },
      {
        "id": "dpm-227458",
        "title": "磁山文化红陶小口瓶",
        "dynasty": "新石器时代",
        "culture": "磁山文化",
        "era": "新石器时代 · 磁山文化",
        "dimensions": "高23.8cm，口径5.2cm，底径5.6cm",
        "description": "红陶小口瓶，新石器时代磁山文化，高23.8厘米口径5.2厘米底径5.6厘米。 瓶撇口，束颈，颈以下渐广，至腹中部直径最大。腹部置双系，腹以下渐内收，平底。泥质红陶。以手制成型，胎体薄厚不均，具有新石器时代中期陶器的特征。 磁山文化因最初于1972年发现于河北省武安县磁山村而得名。据科学测试，其年代约为公元前6000～前5600年，属于华北地区新石器时代中期文化遗存。从这件小口瓶的陶质和形制分析，可能是一件盛水器。",
        "images": [
          {
            "src": "/assets/ciku/hongtao/dpm-227458-01.jpg",
            "alt": "磁山文化红陶小口瓶（新石器时代 · 磁山文化）图01",
            "card": "/assets/ciku/hongtao/dpm-227458-01-card.jpg"
          },
          {
            "src": "/assets/ciku/hongtao/dpm-227458-02.jpg",
            "alt": "磁山文化红陶小口瓶（新石器时代 · 磁山文化）图02",
            "card": "/assets/ciku/hongtao/dpm-227458-02-card.jpg"
          }
        ],
        "dpmId": "227458",
        "source": "https://www.dpm.org.cn/collection/ceramic/227458.html"
      },
      {
        "id": "dpm-227457",
        "title": "磁山文化红陶三足钵",
        "dynasty": "新石器时代",
        "culture": "磁山文化",
        "era": "新石器时代 · 磁山文化",
        "dimensions": "高8.1cm，口径21.3cm，足距15cm",
        "description": "红陶三足钵，新石器时代磁山文化，高8.1厘米，口径21.3厘米，足距15厘米。 钵敞口，圜（huán音环）底，下承以三足。泥质红陶。此钵制作方法比较原始，系采用泥条盘筑和捏塑法成型，器形欠规整，器壁凹凸不平。此种三足钵是磁山文化陶器中的典型器物。 泥条盘筑法是最古老的陶器制作法之一。将制作陶器的粘土搓成细条状，然后从器底起依次将泥条盘筑成器壁直至器口，再用泥浆把缝隙抹平粘合的过程。为了使器壁均匀结实，人们会进一步一手在器内持陶垫或卵石顶住器壁，一手在器外持陶拍拍打，然后再入窑烧制。尽管如此，器形不规整，器壁不均匀仍是泥条盘筑法制陶的最大特点。",
        "images": [
          {
            "src": "/assets/ciku/hongtao/dpm-227457-01.jpg",
            "alt": "磁山文化红陶三足钵（新石器时代 · 磁山文化）图01",
            "card": "/assets/ciku/hongtao/dpm-227457-01-card.jpg"
          },
          {
            "src": "/assets/ciku/hongtao/dpm-227457-02.jpg",
            "alt": "磁山文化红陶三足钵（新石器时代 · 磁山文化）图02",
            "card": "/assets/ciku/hongtao/dpm-227457-02-card.jpg"
          }
        ],
        "dpmId": "227457",
        "source": "https://www.dpm.org.cn/collection/ceramic/227457.html"
      },
      {
        "id": "dpm-227450",
        "title": "磁山文化红陶盂及支座",
        "dynasty": "新石器时代",
        "culture": "磁山文化",
        "era": "新石器时代 · 磁山文化",
        "dimensions": "通高20厘米",
        "description": "红陶盂及支座，新石器时代磁山文化，通高20厘米。盂：高9.5厘米，口径10.5厘米，底径11.3厘米。支座：10.5厘米。 盂（yú音于），平底，底径略大于口径，口两侧有圆形饰物。夹砂红陶，表面粗糙。支座由三个独立的支架组成，支架上有类似四边形支托，下为圆形圈足。盂可以用来盛放食物与水，当它放到支座上时，就可以被加热。陶土里夹砂能够提高陶器的耐急热、急冷性能。在磁山文化陶器中，支撑炊器的支架颇具特色。 红陶出现较早，在新石器时代早期遗址中已有发现。河北武安磁山文化、河南新郑裴李岗文化等新石器时代中期文化均以烧造红陶为主。夏、商以后，红陶的烧造逐渐衰落。",
        "images": [
          {
            "src": "/assets/ciku/hongtao/dpm-227450-01.jpg",
            "alt": "磁山文化红陶盂及支座（新石器时代 · 磁山文化）图01",
            "card": "/assets/ciku/hongtao/dpm-227450-01-card.jpg"
          },
          {
            "src": "/assets/ciku/hongtao/dpm-227450-02.jpg",
            "alt": "磁山文化红陶盂及支座（新石器时代 · 磁山文化）图02",
            "card": "/assets/ciku/hongtao/dpm-227450-02-card.jpg"
          }
        ],
        "dpmId": "227450",
        "source": "https://www.dpm.org.cn/collection/ceramic/227450.html"
      },
      {
        "id": "dpm-227449",
        "title": "磁山文化红陶深腹双系罐",
        "dynasty": "新石器时代",
        "culture": "磁山文化",
        "era": "新石器时代 · 磁山文化",
        "dimensions": "高14.4cm，口径9.5cm，底径6cm",
        "description": "红陶深腹双系罐，新石器时代磁山文化，高14.4厘米，口径9.5厘米，底径6厘米。 罐撇口，深腹，平底，肩部置双系。通体刻划纹饰，颈部纹饰为正反三角纹，肩、腹部装饰简单的麦穗样纹饰。这样简单的刻划纹饰反映了新石器时代早、中期陶器装饰纹样比较简单的特点。 磁山文化因最初于1972年发现于河北省武安县磁山村而得名。据科学测试，其年代约为公元前6000—前5600年，属于华北地区新石器时代中期文化遗存。罐上的双系是为了悬挂或携带方便而设置的。",
        "images": [
          {
            "src": "/assets/ciku/hongtao/dpm-227449-01.jpg",
            "alt": "磁山文化红陶深腹双系罐（新石器时代 · 磁山文化）图01",
            "card": "/assets/ciku/hongtao/dpm-227449-01-card.jpg"
          },
          {
            "src": "/assets/ciku/hongtao/dpm-227449-02.jpg",
            "alt": "磁山文化红陶深腹双系罐（新石器时代 · 磁山文化）图02",
            "card": "/assets/ciku/hongtao/dpm-227449-02-card.jpg"
          }
        ],
        "dpmId": "227449",
        "source": "https://www.dpm.org.cn/collection/ceramic/227449.html"
      },
      {
        "id": "dpm-226951",
        "title": "齐家文化红陶双耳罐",
        "dynasty": "新石器时代",
        "culture": "齐家文化",
        "era": "新石器时代 · 齐家文化",
        "dimensions": "口径8厘米，足径4.5厘米，高12.2厘米",
        "description": "红陶双耳罐，新石器时代，齐家文化，口径8厘米，足径4.5厘米，高12.2厘米。 罐泥质红陶，手制而成。敞口，束腰，折腹，平底，口沿至腹部有对称的单鋬耳，器身无纹饰。 齐家文化陶器多为素面，彩绘极少。此罐造型优美，设计巧妙，制作精致，具有实用功能。",
        "images": [
          {
            "src": "/assets/ciku/hongtao/dpm-226951-01.jpg",
            "alt": "齐家文化红陶双耳罐（新石器时代 · 齐家文化）图01",
            "card": "/assets/ciku/hongtao/dpm-226951-01-card.jpg"
          }
        ],
        "dpmId": "226951",
        "source": "https://www.dpm.org.cn/collection/ceramic/226951.html"
      },
      {
        "id": "dpm-226734",
        "title": "龙山文化红陶鬹",
        "dynasty": "新石器时代",
        "culture": "龙山文化",
        "era": "新石器时代 · 龙山文化",
        "dimensions": "高39厘米，口径11.9厘米",
        "description": "红陶鬹，高39厘米，口径11.9厘米。 鬹胎为泥质红陶，冲天长流，细长颈，三个大袋足分裆而立，颈与后袋之间附一个麻花状鋬手，便于提拿。器物造型遒劲有力，似挺立之雄鸡。 鬹是龙山文化最具特色的器物种类之一。此鬹为龙山文化陶器中的精品。",
        "images": [
          {
            "src": "/assets/ciku/hongtao/dpm-226734-01.jpg",
            "alt": "龙山文化红陶鬹（新石器时代 · 龙山文化）图01",
            "card": "/assets/ciku/hongtao/dpm-226734-01-card.jpg"
          },
          {
            "src": "/assets/ciku/hongtao/dpm-226734-02.jpg",
            "alt": "龙山文化红陶鬹（新石器时代 · 龙山文化）图02",
            "card": "/assets/ciku/hongtao/dpm-226734-02-card.jpg"
          }
        ],
        "dpmId": "226734",
        "source": "https://www.dpm.org.cn/collection/ceramic/226734.html"
      },
      {
        "id": "dpm-246383",
        "title": "红陶狗",
        "dynasty": "东汉",
        "culture": "",
        "era": "东汉",
        "dimensions": "高16厘米",
        "description": "东汉，高16厘米 狗呈卧姿，两耳竖立，双目圆睁，张口露齿，悠闲中保持着特有的警觉。此类陶狗一般分卧、立两种，多出土于汉代庭院模型之前，显然是起护卫的作用。",
        "images": [],
        "dpmId": "246383",
        "source": "https://www.dpm.org.cn/collection/ceramic/246383.html"
      }
    ]
  },
  {
    "id": "grey",
    "num": "02",
    "name": "灰陶",
    "en": "Grey Earthenware",
    "period": "新石器时代中期 — 商周",
    "intro": "在弱还原气氛中烧成，铁被还原为氧化亚铁，胎色青灰。新石器时代中期出现，商周时成为陶器的主流，纹样从篮纹、绳纹走向刻划三角与弦纹。",
    "cover": "/assets/ciku/huitao/dpm-227472-01.jpg",
    "coverAlt": "灰陶盉（商）图01",
    "items": [
      {
        "id": "dpm-227451",
        "title": "磁山文化灰陶深腹双耳罐",
        "dynasty": "新石器时代",
        "culture": "磁山文化",
        "era": "新石器时代 · 磁山文化",
        "dimensions": "高15.2cm，口径13.8cm，底径6cm",
        "description": "灰陶深腹双耳罐，新石器时代磁山文化，高15.2厘米，口径13.8厘米，底径6厘米。 罐直口，深腹，下腹内收，平底。腹中部有对称的圆形饰物，器身有麻布纹。 磁山文化陶器以红陶为主，也有少量泛灰色的器物，有泥质与夹砂两种。灰陶多出现于新石器时代中期，至新石器时代晚期已成为陶器中的主流产品，夏商周时期更是大量烧造。灰陶的形成是因为陶器在弱还原气氛中烧造，陶土中的氧化铁不能被充分氧化，因而呈现出氧化亚铁的颜色。",
        "images": [
          {
            "src": "/assets/ciku/huitao/dpm-227451-01.jpg",
            "alt": "磁山文化灰陶深腹双耳罐（新石器时代 · 磁山文化）图01",
            "card": "/assets/ciku/huitao/dpm-227451-01-card.jpg"
          },
          {
            "src": "/assets/ciku/huitao/dpm-227451-02.jpg",
            "alt": "磁山文化灰陶深腹双耳罐（新石器时代 · 磁山文化）图02",
            "card": "/assets/ciku/huitao/dpm-227451-02-card.jpg"
          }
        ],
        "dpmId": "227451",
        "source": "https://www.dpm.org.cn/collection/ceramic/227451.html"
      },
      {
        "id": "dpm-227481",
        "title": "灰陶刻划三角纹双系罐",
        "dynasty": "商",
        "culture": "",
        "era": "商",
        "dimensions": "高14.5cm，口径10.1cm，足径9.4cm",
        "description": "灰陶刻划三角纹双系罐，商，高14.5厘米，口径10.1厘米，足径9.4厘米。 罐撇口，短颈，溜肩，鼓腹，腹以下渐内收，圈足外撇，底部微向外凸。腹部对称置双系，系中间有一小圆孔。腹部刻划正反三角纹饰。 此罐造型古朴，装饰简练，堪称商代灰陶中的典型作品。 灰陶的形成是因为陶器在弱还原气氛中烧造，陶土中的氧化铁不能被充分氧化，因而呈现出氧化亚铁的颜色。灰陶于新石器时代中期已经出现，商代有较大发展，产量很大。",
        "images": [
          {
            "src": "/assets/ciku/huitao/dpm-227481-01.jpg",
            "alt": "灰陶刻划三角纹双系罐（商）图01",
            "card": "/assets/ciku/huitao/dpm-227481-01-card.jpg"
          },
          {
            "src": "/assets/ciku/huitao/dpm-227481-02.jpg",
            "alt": "灰陶刻划三角纹双系罐（商）图02",
            "card": "/assets/ciku/huitao/dpm-227481-02-card.jpg"
          }
        ],
        "dpmId": "227481",
        "source": "https://www.dpm.org.cn/collection/ceramic/227481.html"
      },
      {
        "id": "dpm-227472",
        "title": "灰陶盉",
        "dynasty": "商",
        "culture": "",
        "era": "商",
        "dimensions": "高12.3cm，口径8.2cm，足距4.8cm",
        "description": "灰陶盉，商，高12.3厘米，口径8.2厘米，足距4.8厘米。 盉（hé音禾）直口微外撇，肩部一侧置管状流，对应一侧为牺首形柄。圜底，下承以三足。肩、腹部分别饰二、四道弦纹。 此件灰陶盉为商代遗物，其造型规整，胎质较细腻，肩、腹部装饰简单的弦纹。整个器物显得造型古朴，装饰简练。 盉是古代的盛酒器，或说是古人调和酒、水的器具，在商代的陶器和青铜器中都可见到。盉的基本造型是深腹，圆口，前有流，后有柄。 灰陶的形成是因为陶器在弱还原气氛中烧造，陶土中的氧化铁不能被充分氧化，因而呈现出氧化亚铁的颜色。灰陶于新石器时代中期已经出现，商代有较大发展，产量很大。",
        "images": [
          {
            "src": "/assets/ciku/huitao/dpm-227472-01.jpg",
            "alt": "灰陶盉（商）图01",
            "card": "/assets/ciku/huitao/dpm-227472-01-card.jpg"
          },
          {
            "src": "/assets/ciku/huitao/dpm-227472-02.jpg",
            "alt": "灰陶盉（商）图02",
            "card": "/assets/ciku/huitao/dpm-227472-02-card.jpg"
          }
        ],
        "dpmId": "227472",
        "source": "https://www.dpm.org.cn/collection/ceramic/227472.html"
      },
      {
        "id": "dpm-246378",
        "title": "灰陶狗",
        "dynasty": "东汉",
        "culture": "",
        "era": "东汉",
        "dimensions": "高15厘米",
        "description": "东汉，高15厘米 狗灰陶制成，呈快走状。可以看出，此时工匠对动物形体的把握已经相当成熟。狗的身体结构塑造准确，肌肉有力，是一只成年犬。1951年于河南辉县百泉出土。",
        "images": [],
        "dpmId": "246378",
        "source": "https://www.dpm.org.cn/collection/ceramic/246378.html"
      }
    ]
  },
  {
    "id": "white",
    "num": "03",
    "name": "白陶",
    "en": "White Earthenware",
    "period": "新石器时代晚期 — 商",
    "intro": "用纯度较高的陶土制胎，经约一千摄氏度焙烧，胎质洁白细腻。新石器时代晚期出现，商代后期达到鼎盛，常以饕餮、云雷、回纹仿刻青铜礼器。",
    "cover": "/assets/ciku/baitao/dpm-227471-01.jpg",
    "coverAlt": "白陶刻饕餮纹双系壶（商）图01",
    "items": [
      {
        "id": "dpm-227463",
        "title": "大汶口文化白陶双系壶",
        "dynasty": "新石器时代",
        "culture": "大汶口文化",
        "era": "新石器时代 · 大汶口文化",
        "dimensions": "高19cm，口径8.8cm，底径6cm",
        "description": "白陶双系壶，新石器时代大汶口文化，高19厘米，口径8.8厘米，底径6厘米。 壶口微撇，圆肩，腹以下内收，平底。胎较薄。此件器物造型特别，主要是肩、腹部一侧压成扁平状，在腹部中间一侧置两个圆系，两个圆系中间又有一个小乳钉装饰。据科学测试，大汶口文化的年代约为公元前4000～前2200年。 白陶出现于新石器时代晚期，距今约5000年。所用原料系纯度较高的陶土，成型后，入窑经约1000℃窑温焙烧而成。",
        "images": [
          {
            "src": "/assets/ciku/baitao/dpm-227463-01.jpg",
            "alt": "大汶口文化白陶双系壶（新石器时代 · 大汶口文化）图01",
            "card": "/assets/ciku/baitao/dpm-227463-01-card.jpg"
          },
          {
            "src": "/assets/ciku/baitao/dpm-227463-02.jpg",
            "alt": "大汶口文化白陶双系壶（新石器时代 · 大汶口文化）图02",
            "card": "/assets/ciku/baitao/dpm-227463-02-card.jpg"
          }
        ],
        "dpmId": "227463",
        "source": "https://www.dpm.org.cn/collection/ceramic/227463.html"
      },
      {
        "id": "dpm-227562",
        "title": "白陶刻几何纹瓿",
        "dynasty": "商",
        "culture": "",
        "era": "商",
        "dimensions": "高20cm，口径18.6cm，足径15cm",
        "description": "白陶刻几何纹瓿，商，高20厘米，口径18.6厘米，足径15厘米。 瓿（bù音不）唇口外卷，溜肩，鼓腹，腹下渐收，近足处外撇，圈足。通体雕刻纹饰，以精细的回纹作地衬托几何纹，主次分明，错落有致，显得格外庄重精美。 白陶早在新石器时代晚期就已出现。至商代，由于烧成温度提高，原料的淘洗亦较精细，致使白陶质地更加洁白细腻。商代早期白陶器形以鬹（guī音归）、盉（hé音禾）、爵为主，纹饰有人字形纹、拍印的绳纹和附加堆纹等。商代中期，器物增加了豆、罐、钵等，其装饰除少数绳纹外，以素面磨光为多。商代后期是白陶烧制的鼎盛期，在黄河流域的商代晚期遗址与墓葬中均发现不少白陶，其中以河南安阳殷墟出土的白陶最…",
        "images": [
          {
            "src": "/assets/ciku/baitao/dpm-227562-01.jpg",
            "alt": "白陶刻几何纹瓿（商）图01",
            "card": "/assets/ciku/baitao/dpm-227562-01-card.jpg"
          },
          {
            "src": "/assets/ciku/baitao/dpm-227562-02.jpg",
            "alt": "白陶刻几何纹瓿（商）图02",
            "card": "/assets/ciku/baitao/dpm-227562-02-card.jpg"
          }
        ],
        "dpmId": "227562",
        "source": "https://www.dpm.org.cn/collection/ceramic/227562.html"
      },
      {
        "id": "dpm-227471",
        "title": "白陶刻饕餮纹双系壶",
        "dynasty": "商",
        "culture": "",
        "era": "商",
        "dimensions": "高22cm，口径9.2cm，足径9.2cm",
        "description": "白陶刻饕餮纹双系壶，商，高22厘米，口径9.2厘米，足径9.2厘米。 壶口微内收，口以下渐广，下腹饱满，圈足。肩对称置圆孔系。与系对应的圈足上有两个圆孔。通体雕刻饕餮（tāotiè音涛帖）纹，图案清晰，雕刻技法娴熟。堪称商代晚期白陶的代表作。这件白陶壶原本破碎，现已修复。 白陶早在新石器时代晚期就已出现。至商代，由于烧成温度提高，原料的淘洗亦较精细，致使白陶质地更加洁白细腻。商代早期白陶器形以鬹（guī音归）、盉（hé音禾）、爵为主，纹饰有人字形纹、拍印的绳纹和附加堆纹等。商代中期，器物增加了豆、罐、钵等，其装饰除少数绳纹外，以素面磨光为多。商代后期是白陶烧制的鼎盛期，在黄河流域的商代…",
        "images": [
          {
            "src": "/assets/ciku/baitao/dpm-227471-01.jpg",
            "alt": "白陶刻饕餮纹双系壶（商）图01",
            "card": "/assets/ciku/baitao/dpm-227471-01-card.jpg"
          },
          {
            "src": "/assets/ciku/baitao/dpm-227471-02.jpg",
            "alt": "白陶刻饕餮纹双系壶（商）图02",
            "card": "/assets/ciku/baitao/dpm-227471-02-card.jpg"
          }
        ],
        "dpmId": "227471",
        "source": "https://www.dpm.org.cn/collection/ceramic/227471.html"
      },
      {
        "id": "dpm-227470",
        "title": "白陶刻纹豆",
        "dynasty": "商",
        "culture": "",
        "era": "商",
        "dimensions": "高12.5cm，口径22.7cm，足径15.2cm",
        "description": "白陶刻纹豆，商，高12.5厘米，口径22.7厘米，足径15.2厘米。 豆浅腹，口沿较宽。口以下渐内收，下承以喇叭形高足。通体雕刻纹饰。口下雕刻凸弦纹，腹部雕刻仿青铜器上的云雷纹，高足中部雕刻钱纹，上下分别雕刻变形回纹和饕餮（tāotiè音涛帖）纹作辅助纹饰。修坯精细，形体线条刚劲有力。 白陶早在新石器时代晚期就已出现。至商代，由于烧成温度提高，原料的淘洗亦较精细，致使白陶质地更加洁白细腻。商代早期白陶器形以鬹（guī音归）、盉（hé音禾）、爵为主，纹饰有人字形纹、拍印的绳纹和附加堆纹等。商代中期，器物增加了豆、罐、钵等，其装饰除少数绳纹外，以素面磨光为多。商代后期是白陶烧制的鼎盛期，在…",
        "images": [
          {
            "src": "/assets/ciku/baitao/dpm-227470-01.jpg",
            "alt": "白陶刻纹豆（商）图01",
            "card": "/assets/ciku/baitao/dpm-227470-01-card.jpg"
          },
          {
            "src": "/assets/ciku/baitao/dpm-227470-02.jpg",
            "alt": "白陶刻纹豆（商）图02",
            "card": "/assets/ciku/baitao/dpm-227470-02-card.jpg"
          }
        ],
        "dpmId": "227470",
        "source": "https://www.dpm.org.cn/collection/ceramic/227470.html"
      },
      {
        "id": "dpm-227120",
        "title": "白陶雕刻饕餮纹双耳壶",
        "dynasty": "商",
        "culture": "",
        "era": "商",
        "dimensions": "高22.1厘米，口径9.1厘米，足径8.9厘米",
        "description": "白陶雕刻饕餮纹双耳壶，商，高22.1厘米，口径9.1厘米，足径8.9厘米。 器敛口，腹微鼓，圈足，口下安双耳，足上有对称双孔。器身通体刻划饕餮纹。 此器出土于河南省安阳市。其无论造型或纹饰，均模仿当时的青铜器，是商代白陶的典型器物。",
        "images": [
          {
            "src": "/assets/ciku/baitao/dpm-227120-01.jpg",
            "alt": "白陶雕刻饕餮纹双耳壶（商）图01",
            "card": "/assets/ciku/baitao/dpm-227120-01-card.jpg"
          }
        ],
        "dpmId": "227120",
        "source": "https://www.dpm.org.cn/collection/ceramic/227120.html"
      }
    ]
  },
  {
    "id": "black",
    "num": "04",
    "name": "黑陶",
    "en": "Black Earthenware",
    "period": "新石器时代晚期 · 龙山文化",
    "intro": "龙山文化的代表。烧成后期封窑渗碳，碳素渗入胎体，器表漆黑如墨；快轮拉坯让器壁薄而匀，薄如蛋壳，是史前制陶技术的高峰。",
    "cover": "/assets/ciku/heitao/dpm-226982-01.jpg",
    "coverAlt": "龙山文化黑陶单把杯（新石器时代 · 龙山文化）图01",
    "items": [
      {
        "id": "dpm-227559",
        "title": "龙山文化黑陶双系壶",
        "dynasty": "新石器时代",
        "culture": "龙山文化",
        "era": "新石器时代 · 龙山文化",
        "dimensions": "高11.5cm，口径6.5cm，足径8.2cm",
        "description": "黑陶双系壶，新石器时代龙山文化，高11.5厘米，口径6.5厘米，足径8.2厘米。 壶口微外撇，口沿两边置双系。长颈，下部渐广，至肩凸起，扁腹，圈足。足上镂有八个小孔。底外凸。造型规整，胎薄体轻，表面经过打磨，光泽可鉴。据科学测试，龙山文化的年代约为公元前2400—前2000年。 龙山文化是我国新石器时代晚期的一种文化，因1928年首次发现于山东章丘龙山镇而得名。龙山文化陶器以砂质黑陶和泥质黑灰陶数量最多，陶器的制法虽然还在使用手制，但快轮拉坯的使用已很普遍，因此器物形体较为规整，胎体明显变薄。 黑陶与灰陶的烧造方法一样，均采用强还原气氛烧成。之所以会呈现黑色，是因为在烧成后期将窑停火…",
        "images": [
          {
            "src": "/assets/ciku/heitao/dpm-227559-01.jpg",
            "alt": "龙山文化黑陶双系壶（新石器时代 · 龙山文化）图01",
            "card": "/assets/ciku/heitao/dpm-227559-01-card.jpg"
          },
          {
            "src": "/assets/ciku/heitao/dpm-227559-02.jpg",
            "alt": "龙山文化黑陶双系壶（新石器时代 · 龙山文化）图02",
            "card": "/assets/ciku/heitao/dpm-227559-02-card.jpg"
          }
        ],
        "dpmId": "227559",
        "source": "https://www.dpm.org.cn/collection/ceramic/227559.html"
      },
      {
        "id": "dpm-227469",
        "title": "龙山文化黑陶双系罐",
        "dynasty": "新石器时代",
        "culture": "龙山文化",
        "era": "新石器时代 · 龙山文化",
        "dimensions": "高26.0cm，口径19.5cm，底径10.5cm",
        "description": "黑陶双系罐，新石器时代龙山文化，高26.0厘米，口径19.5厘米，底径10.5厘米。 罐撇口，圆唇，束颈，溜肩，鼓腹，腹以下渐内收，平底。胎体较薄，表面打磨光亮。通体饰五道弦纹。据科学测试，龙山文化的年代约为公元前2400～前2000年。 龙山文化是我国新石器时代晚期的一种文化，因1928年首次发现于山东章丘龙山镇而得名。龙山文化陶器以砂质黑陶和泥质黑灰陶数量最多，陶器的制法虽然还在使用手制，但快轮拉坯的使用已很普遍，因此器物形体较为规整，胎体明显变薄。 黑陶与灰陶的烧造方法一样，均采用强还原气氛烧成。之所以会呈现黑色，是因为在烧成后期将窑停火封门，在窑顶孔上浇水，燃料中的碳素与蒸气…",
        "images": [
          {
            "src": "/assets/ciku/heitao/dpm-227469-01.jpg",
            "alt": "龙山文化黑陶双系罐（新石器时代 · 龙山文化）图01",
            "card": "/assets/ciku/heitao/dpm-227469-01-card.jpg"
          },
          {
            "src": "/assets/ciku/heitao/dpm-227469-02.jpg",
            "alt": "龙山文化黑陶双系罐（新石器时代 · 龙山文化）图02",
            "card": "/assets/ciku/heitao/dpm-227469-02-card.jpg"
          }
        ],
        "dpmId": "227469",
        "source": "https://www.dpm.org.cn/collection/ceramic/227469.html"
      },
      {
        "id": "dpm-226982",
        "title": "龙山文化黑陶单把杯",
        "dynasty": "新石器时代",
        "culture": "龙山文化",
        "era": "新石器时代 · 龙山文化",
        "dimensions": "口径8厘米，足径8厘米，高12.5厘米",
        "description": "黑陶单把杯，新石器时代，口径8厘米，足径8厘米，高12.5厘米。 杯呈筒形，腹间微收，平底，杯身一侧有扁形把，便于持拿。杯为轮制而成，杯身均匀地分布三道弦纹。 此杯具有龙山文化黑陶的典型特点，器表漆黑如墨，器壁薄如蛋壳，反映出当时制陶技术已达到较高的水平。",
        "images": [
          {
            "src": "/assets/ciku/heitao/dpm-226982-01.jpg",
            "alt": "龙山文化黑陶单把杯（新石器时代 · 龙山文化）图01",
            "card": "/assets/ciku/heitao/dpm-226982-01-card.jpg"
          }
        ],
        "dpmId": "226982",
        "source": "https://www.dpm.org.cn/collection/ceramic/226982.html"
      },
      {
        "id": "dpm-226952",
        "title": "黑陶高柄杯",
        "dynasty": "新石器时代",
        "culture": "龙山文化",
        "era": "新石器时代 · 龙山文化",
        "dimensions": "口径7厘米，足径6厘米，高15厘米",
        "description": "黑陶高柄杯，新石器时代，龙山文化，口径7厘米，足径6厘米，高15厘米。 杯敞口，束腰，高柄足外撇，平底。杯身有凸出的弦纹为饰，高柄中空，柄外壁镂三孔。因采用了轮制方法，器壁较薄，素面磨光，配以镂空等多种工艺手法，制作十分考究，是一件精致的饮酒用具，一般在高等级的贵族墓中出土，做礼器。",
        "images": [],
        "dpmId": "226952",
        "source": "https://www.dpm.org.cn/collection/ceramic/226952.html"
      }
    ]
  },
  {
    "id": "painted",
    "num": "05",
    "name": "彩陶",
    "en": "Painted Earthenware",
    "period": "约前 5000 — 前 2000 年",
    "intro": "在红陶胎上用黑、红彩描绘纹样，再入窑烧成。仰韶的鱼纹与几何纹、马家窑的漩涡纹与蛙纹，把水边的生活和信仰画进了器物。",
    "cover": "/assets/ciku/caitao/dpm-227055-01.jpg",
    "coverAlt": "仰韶文化彩陶几何纹盆（新石器时代 · 仰韶文化半坡类型）图01",
    "items": [
      {
        "id": "dpm-227462",
        "title": "马家窑文化彩陶漩涡菱形几何纹双系壶",
        "dynasty": "新石器时代",
        "culture": "马家窑文化半山类型",
        "era": "新石器时代 · 马家窑文化半山类型",
        "dimensions": "高37.7cm，口径13.8cm，底径14cm",
        "description": "彩陶漩涡菱形几何纹双系壶，新石器时代马家窑文化半山类型，高37.7厘米，口径13.8厘米，底径14厘米。 壶唇口，直颈，口部置两个对称乳钉装饰，溜肩，鼓腹，腹中部对称置双系。下腹陡收，平底。以红、黑两种色彩描绘纹饰，里口用黑彩描绘弧形纹；颈部以黑彩描绘连弧纹两周；肩、腹部主题纹饰用红、黑两彩描绘漩涡纹四组，漩涡纹内为菱形几何纹；肩部粗弦线及漩涡连线，边缘饰细密的锯齿纹。胎质细腻，表面打磨光滑。据科学测试，马家窑文化半山类型彩陶的年代约为公元前2600～前2300年。 彩陶出现于6000多年前，是在烧造红陶的基础上，在黄河流域自东向西发展起来的。此件彩陶属于马家窑文化半山类型。半山类型彩…",
        "images": [
          {
            "src": "/assets/ciku/caitao/dpm-227462-01.jpg",
            "alt": "马家窑文化彩陶漩涡菱形几何纹双系壶（新石器时代 · 马家窑文化半山类型）图01",
            "card": "/assets/ciku/caitao/dpm-227462-01-card.jpg"
          },
          {
            "src": "/assets/ciku/caitao/dpm-227462-02.jpg",
            "alt": "马家窑文化彩陶漩涡菱形几何纹双系壶（新石器时代 · 马家窑文化半山类型）图02",
            "card": "/assets/ciku/caitao/dpm-227462-02-card.jpg"
          }
        ],
        "dpmId": "227462",
        "source": "https://www.dpm.org.cn/collection/ceramic/227462.html"
      },
      {
        "id": "dpm-227460",
        "title": "青莲岗文化彩陶钵",
        "dynasty": "新石器时代",
        "culture": "青莲岗文化",
        "era": "新石器时代 · 青莲岗文化",
        "dimensions": "高11.2cm，口径14.5cm，底径7cm",
        "description": "彩陶钵，新石器时代青莲岗文化，高11.2厘米，口径14.5厘米，底径7厘米。 钵圆唇，宽肩，肩以下陡收，平底。泥质红陶。器物表面施白色陶衣。肩部以褐彩留白二方连续叶纹装饰，每五片叶子组成一椭圆形图案，共五组。叶纹下饰褐彩圆点纹一周。据科学测试，青莲岗文化的年代约为公元前5400～4400年。 青莲岗文化属于新石器时代中期文化，因最初在江苏淮安青莲岗发现而得名。该文化主要分布在鲁中南和苏北，出土陶器主要有鼎、釜、甑等炊器，豆、碗、钵等饮食器。其彩陶多用红、褐、紫彩描绘纹饰。纹饰有双弧线纹、水波纹、八卦纹、十字纹及圆点纹等。 此件由江苏邱县四户公社大墩子出土。",
        "images": [
          {
            "src": "/assets/ciku/caitao/dpm-227460-01.jpg",
            "alt": "青莲岗文化彩陶钵（新石器时代 · 青莲岗文化）图01",
            "card": "/assets/ciku/caitao/dpm-227460-01-card.jpg"
          },
          {
            "src": "/assets/ciku/caitao/dpm-227460-02.jpg",
            "alt": "青莲岗文化彩陶钵（新石器时代 · 青莲岗文化）图02",
            "card": "/assets/ciku/caitao/dpm-227460-02-card.jpg"
          }
        ],
        "dpmId": "227460",
        "source": "https://www.dpm.org.cn/collection/ceramic/227460.html"
      },
      {
        "id": "dpm-227459",
        "title": "马家窑文化彩陶水波纹钵",
        "dynasty": "新石器时代",
        "culture": "马家窑文化马家窑类型",
        "era": "新石器时代 · 马家窑文化马家窑类型",
        "dimensions": "高11cm，口径22.5cm，底径10cm",
        "description": "彩陶水波纹钵，新石器时代马家窑文化马家窑类型，高11厘米，口径22.5厘米，底径10厘米。 钵圆唇外卷，束颈，口沿以下渐广，平底。泥质红陶。口沿及腹部均以黑彩描绘简单的水波纹。 马家窑文化主要分布在甘肃、青海地区，属于新石器时代晚期文化。马家窑类型陶器据科学测试，其年代约为公元前3100～前2700年。新石器时代的先民通常选择在水边南向的台地上聚居，水波纹是他们日常所见河水的图案化表现。",
        "images": [
          {
            "src": "/assets/ciku/caitao/dpm-227459-01.jpg",
            "alt": "马家窑文化彩陶水波纹钵（新石器时代 · 马家窑文化马家窑类型）图01",
            "card": "/assets/ciku/caitao/dpm-227459-01-card.jpg"
          },
          {
            "src": "/assets/ciku/caitao/dpm-227459-02.jpg",
            "alt": "马家窑文化彩陶水波纹钵（新石器时代 · 马家窑文化马家窑类型）图02",
            "card": "/assets/ciku/caitao/dpm-227459-02-card.jpg"
          }
        ],
        "dpmId": "227459",
        "source": "https://www.dpm.org.cn/collection/ceramic/227459.html"
      },
      {
        "id": "dpm-227055",
        "title": "仰韶文化彩陶几何纹盆",
        "dynasty": "新石器时代",
        "culture": "仰韶文化半坡类型",
        "era": "新石器时代 · 仰韶文化半坡类型",
        "dimensions": "高16.4cm，口径37.4cm",
        "description": "彩陶几何纹盆，新石器时代仰韶文化半坡类型，高16.4厘米，口径37.4厘米。 盆折沿，深直腹，圜底。泥质红陶。口沿及外腹部均以黑彩描绘纹饰，口沿上描绘以点定位的水波纹，腹部描绘两层三角形几何纹，两层三角形纹饰的大小及形状相同，但方向相反。可能是由鱼纹逐渐抽象演变而来。此彩陶盆的造型和纹饰具有新石器时代仰韶文化半坡类型（约公元前4800～前3900年）彩陶的典型特征。 鱼纹是仰韶文化半坡类型彩陶中的常见纹饰，著名的西安半坡人面鱼纹彩陶盆描绘的就是一个人脸口衔鱼的形象，可见鱼和半坡人们生活的联系。",
        "images": [
          {
            "src": "/assets/ciku/caitao/dpm-227055-01.jpg",
            "alt": "仰韶文化彩陶几何纹盆（新石器时代 · 仰韶文化半坡类型）图01",
            "card": "/assets/ciku/caitao/dpm-227055-01-card.jpg"
          },
          {
            "src": "/assets/ciku/caitao/dpm-227055-02.jpg",
            "alt": "仰韶文化彩陶几何纹盆（新石器时代 · 仰韶文化半坡类型）图02",
            "card": "/assets/ciku/caitao/dpm-227055-02-card.jpg"
          }
        ],
        "dpmId": "227055",
        "source": "https://www.dpm.org.cn/collection/ceramic/227055.html"
      },
      {
        "id": "dpm-226958",
        "title": "马家窑文化彩陶弦纹瓶",
        "dynasty": "新石器时代",
        "culture": "马家窑文化马家窑类型",
        "era": "新石器时代 · 马家窑文化马家窑类型",
        "dimensions": "口径8厘米，足径6.5厘米，高21.5厘米",
        "description": "彩陶弦纹瓶，口径8厘米，足径6.5厘米，高21.5厘米。 瓶陶质，敞口，束颈，鼓腹，腹下渐收，平底。器表光滑，上腹部彩绘弦纹六周，纹饰简洁明快，朴素大方，有很强的装饰性。此类弦纹是马家窑文化中马家窑类型彩陶的常见纹饰。",
        "images": [
          {
            "src": "/assets/ciku/caitao/dpm-226958-01.jpg",
            "alt": "马家窑文化彩陶弦纹瓶（新石器时代 · 马家窑文化马家窑类型）图01",
            "card": "/assets/ciku/caitao/dpm-226958-01-card.jpg"
          }
        ],
        "dpmId": "226958",
        "source": "https://www.dpm.org.cn/collection/ceramic/226958.html"
      },
      {
        "id": "dpm-226871",
        "title": "彩陶漩涡纹双耳罐",
        "dynasty": "新石器时代",
        "culture": "马家窑文化半山类型",
        "era": "新石器时代 · 马家窑文化半山类型",
        "dimensions": "高37厘米，口径10厘米",
        "description": "彩陶漩涡纹双耳罐，新石器时代马家窑文化半山类型，高37厘米，口径10厘米。 罐小口，圆腹，腹侧安双环耳，平底。胎呈暗红色。肩及上腹部以宽肥的黑彩条带和细窄的锯齿状条带构成漩涡纹，利用弧线的起伏旋转表现河水奔腾向前的韵律感。这种将柔和的弧线和醒目的圆点相结合构成二方连续的装饰带，是马家窑文化的典型构图方式。",
        "images": [
          {
            "src": "/assets/ciku/caitao/dpm-226871-01.jpg",
            "alt": "彩陶漩涡纹双耳罐（新石器时代 · 马家窑文化半山类型）图01",
            "card": "/assets/ciku/caitao/dpm-226871-01-card.jpg"
          }
        ],
        "dpmId": "226871",
        "source": "https://www.dpm.org.cn/collection/ceramic/226871.html"
      },
      {
        "id": "dpm-226821",
        "title": "彩陶钵",
        "dynasty": "新石器时代",
        "culture": "马家窑文化马家窑类型",
        "era": "新石器时代 · 马家窑文化马家窑类型",
        "dimensions": "高9.6厘米，口径21.3厘米",
        "description": "彩陶钵，马家窑文化马家窑类型，高9.6厘米，口径21.3厘米。 钵敛口，折沿，鼓腹，腹以下渐敛，小平底。橙黄色泥质陶，表面打磨光滑。钵内、外及口沿均以黑彩描绘纹饰。钵内饰以底为中心的漩涡纹，外壁为波浪纹，口沿为三组菱形网格纹。此器造型饱满，图案线条流畅，是马家窑类型彩陶的典型器。 马家窑文化的突出特点是彩陶特别发达，而且可以分为马家窑、半山、马厂三个类型，分别代表三个发展时期。马家窑类型彩陶造型有壶、罐、瓶、钵、盆等，多为细泥橙黄色陶，器表打磨光滑，多以黑彩描绘条带纹、圆点纹、波纹、漩涡纹、方格纹、人面纹、蛙纹、舞蹈纹等，构图严谨，笔法娴熟。图案设计采用以点定位的方法，使画面充分展开…",
        "images": [
          {
            "src": "/assets/ciku/caitao/dpm-226821-01.jpg",
            "alt": "彩陶钵（新石器时代 · 马家窑文化马家窑类型）图01",
            "card": "/assets/ciku/caitao/dpm-226821-01-card.jpg"
          }
        ],
        "dpmId": "226821",
        "source": "https://www.dpm.org.cn/collection/ceramic/226821.html"
      },
      {
        "id": "dpm-226721",
        "title": "马家窑文化彩陶蛙纹壶",
        "dynasty": "新石器时代",
        "culture": "马家窑文化马厂类型",
        "era": "新石器时代 · 马家窑文化马厂类型",
        "dimensions": "高40cm，口径13cm，底径11cm",
        "description": "彩陶蛙纹壶，新石器时代马家窑文化马厂类型，高42厘米，口径13.1厘米。 壶泥质红陶，口外侈，薄唇，球形腹，小平底，腹部两侧对称置双系。于橙红色陶衣上以黑彩描绘变形蛙纹。图案线条流畅，富于变化，与造型协调一致。据科学测试，马家窑文化马厂类型彩陶的年代约为公元前2200～前2000年。 变形蛙纹作为马家窑文化马厂类型彩陶上常见的装饰纹样之一，体现了远古人们对于繁衍生殖的渴望。青蛙产下许多卵，孵出许多蝌蚪，正是繁衍旺盛的象征。",
        "images": [
          {
            "src": "/assets/ciku/caitao/dpm-226721-01.jpg",
            "alt": "马家窑文化彩陶蛙纹壶（新石器时代 · 马家窑文化马厂类型）图01",
            "card": "/assets/ciku/caitao/dpm-226721-01-card.jpg"
          },
          {
            "src": "/assets/ciku/caitao/dpm-226721-02.jpg",
            "alt": "马家窑文化彩陶蛙纹壶（新石器时代 · 马家窑文化马厂类型）图02",
            "card": "/assets/ciku/caitao/dpm-226721-02-card.jpg"
          }
        ],
        "dpmId": "226721",
        "source": "https://www.dpm.org.cn/collection/ceramic/226721.html"
      }
    ]
  },
  {
    "id": "painted-burial",
    "num": "06",
    "name": "彩绘陶",
    "en": "Painted Pottery",
    "period": "新石器时代晚期 — 汉",
    "intro": "陶器烧成后再以颜料彩绘，纹样浮于表面，不入胎釉。战国秦汉的彩绘陶多为明器，黑红相间，流云龙凤，是另一套关于来世的想象。",
    "cover": "/assets/ciku/caihuitao/dpm-227442-01.jpg",
    "coverAlt": "凸雕龙凤纹彩绘陶壶（西汉）图01",
    "items": [
      {
        "id": "dpm-226953",
        "title": "彩绘陶方壶",
        "dynasty": "汉",
        "culture": "",
        "era": "汉",
        "dimensions": "口边长11.5厘米，足边长12.6厘米，高39厘米",
        "description": "彩绘陶方壶，汉，口边长11.5厘米，足边长12.6厘米，高39厘米。 壶口部与足底皆为方形，四角攒尖方盖，壶身两侧各有一铺耳。通体饰以黑、红彩为主色调的图案，颈与腹部皆绘流云纹，并以菱格纹条带相间。 此件方壶的造型和彩绘纹饰均仿照同时期的漆方壶而作。此类彩绘陶器在战国和西汉墓葬中出土较多，可能是专用于殉葬的明器。",
        "images": [
          {
            "src": "/assets/ciku/caihuitao/dpm-226953-01.jpg",
            "alt": "彩绘陶方壶（汉）图01",
            "card": "/assets/ciku/caihuitao/dpm-226953-01-card.jpg"
          }
        ],
        "dpmId": "226953",
        "source": "https://www.dpm.org.cn/collection/ceramic/226953.html"
      },
      {
        "id": "dpm-227442",
        "title": "凸雕龙凤纹彩绘陶壶",
        "dynasty": "西汉",
        "culture": "",
        "era": "西汉",
        "dimensions": "通高64cm，口径21cm，足径24cm",
        "description": "凸雕龙凤纹彩绘陶壶，西汉，通高64厘米，口径21厘米，足径24厘米。 壶撇口，粗颈，圆腹，腹部对称置双环形系，高圈足。通体彩绘装饰。口沿下绘一周三角纹。颈部在三角纹内绘云纹。腹部用三周凸起弦纹划分上下两部分装饰带，上为凸雕龙、虎、凤相互追逐于流云之间，色彩绚丽，线条流畅婉转，画面生动活泼。下为彩绘缠枝花纹。圈足上绘弦纹3道。 此壶色彩丰富，使用红、绿、蓝、黑、白、黄等彩。颜色鲜艳，历经两千多年，依然光彩夺目。 彩绘陶始于新石器时代晚期，主要在灰陶上做画，有的使用红、黑、黄、白、赭等彩直接绘画在陶器表面，也有的在涂有白或黄色的地色上，再用各种颜色进行绘制。战国、秦汉时期是彩绘陶的发展繁…",
        "images": [
          {
            "src": "/assets/ciku/caihuitao/dpm-227442-01.jpg",
            "alt": "凸雕龙凤纹彩绘陶壶（西汉）图01",
            "card": "/assets/ciku/caihuitao/dpm-227442-01-card.jpg"
          },
          {
            "src": "/assets/ciku/caihuitao/dpm-227442-02.jpg",
            "alt": "凸雕龙凤纹彩绘陶壶（西汉）图02",
            "card": "/assets/ciku/caihuitao/dpm-227442-02-card.jpg"
          }
        ],
        "dpmId": "227442",
        "source": "https://www.dpm.org.cn/collection/ceramic/227442.html"
      },
      {
        "id": "dpm-246376",
        "title": "陶母子狗",
        "dynasty": "北朝",
        "culture": "",
        "era": "北朝",
        "dimensions": "高9厘米",
        "description": "北朝，高9厘米 母狗蹲卧，双耳下垂；小狗前足扬起，抓扶母亲的颈部，母子亲密无间。 魏晋南北朝时的动物雕塑与秦汉时相比在性质上有了一定的变化，以更多地反映社会生活内容替代了原有的礼仪功能。这对母子狗折射的便是雕塑者对生活的热爱。",
        "images": [],
        "dpmId": "246376",
        "source": "https://www.dpm.org.cn/collection/ceramic/246376.html"
      }
    ]
  },
  {
    "id": "glazed-pottery",
    "num": "07",
    "name": "釉陶",
    "en": "Lead-glazed Pottery",
    "period": "西汉 — 东汉",
    "intro": "汉代低温铅釉陶，约七百度焙烧，釉面光亮透明，以绿、黄褐为主。它让陶器第一次有了玻璃般的表面，也为后来的釉色实验铺路。",
    "cover": "/assets/ciku/youtao/dpm-227004-01.jpg",
    "coverAlt": "绿釉铺首耳陶壶（东汉）图01",
    "items": [
      {
        "id": "dpm-227129",
        "title": "酱釉划花水波纹铺首耳陶壶",
        "dynasty": "西汉",
        "culture": "",
        "era": "西汉",
        "dimensions": "高35.3cm，口径13.5cm，足径14.3cm",
        "description": "酱釉划花水波纹铺首耳陶壶，西汉，高35.3厘米，口径13.5厘米，足径14.3厘米。 壶撇口，束颈，溜肩，鼓腹，圈足外撇。肩部对称塑贴铺首。壶身刻划弦纹数道。壶外通体施酱黄色釉，釉色浓郁古朴，反映出当时崇尚朴实自然的艺术格调。 此陶壶仿铜壶造型烧造，釉层清澈透明，釉面光亮可鉴，花纹具有汉代独特的装饰风格，体现出汉代釉陶艺术所取得的成就。 汉代釉陶属于低温铅釉，多以绿、黄褐或棕红色为主，釉面的光泽较强。经科学测试结果表明，其着色剂主要为氧化铜和氧化铁，釉中含适量的铜便呈现美丽的翠绿色，含适量的铁则呈现黄褐或棕红色。釉陶是在氧化气氛中经700℃左右的低温焙烧而成。",
        "images": [
          {
            "src": "/assets/ciku/youtao/dpm-227129-01.jpg",
            "alt": "酱釉划花水波纹铺首耳陶壶（西汉）图01",
            "card": "/assets/ciku/youtao/dpm-227129-01-card.jpg"
          },
          {
            "src": "/assets/ciku/youtao/dpm-227129-02.jpg",
            "alt": "酱釉划花水波纹铺首耳陶壶（西汉）图02",
            "card": "/assets/ciku/youtao/dpm-227129-02-card.jpg"
          }
        ],
        "dpmId": "227129",
        "source": "https://www.dpm.org.cn/collection/ceramic/227129.html"
      },
      {
        "id": "dpm-227004",
        "title": "绿釉铺首耳陶壶",
        "dynasty": "东汉",
        "culture": "",
        "era": "东汉",
        "dimensions": "高25.5cm，口径13cm，足径15cm",
        "description": "绿釉铺首耳陶壶，东汉，高25.5厘米，口径13厘米，足径15厘米。 壶撇口，长颈，溜肩，肩部置对称铺首，扁圆腹，腹下承以外撇八方高圈足。通体施低温铅绿釉，釉呈瓜皮绿色。器身刻划弦纹数道。 此壶造型模仿同时期的青铜器，是随葬用品。 在我国，低温铅釉的发明比青釉要晚得多，但在汉代已相当普遍。它的特点是釉面光泽强，表面平整光滑，釉层清澈透明，犹如玻璃一样，但硬度比较低，容易出现划痕，化学稳定性较差。传统的低温色釉的主要品种有绿、黄、蓝、红、紫等多种。",
        "images": [
          {
            "src": "/assets/ciku/youtao/dpm-227004-01.jpg",
            "alt": "绿釉铺首耳陶壶（东汉）图01",
            "card": "/assets/ciku/youtao/dpm-227004-01-card.jpg"
          },
          {
            "src": "/assets/ciku/youtao/dpm-227004-02.jpg",
            "alt": "绿釉铺首耳陶壶（东汉）图02",
            "card": "/assets/ciku/youtao/dpm-227004-02-card.jpg"
          }
        ],
        "dpmId": "227004",
        "source": "https://www.dpm.org.cn/collection/ceramic/227004.html"
      }
    ]
  },
  {
    "id": "proto-porcelain",
    "num": "08",
    "name": "原始瓷",
    "en": "Proto-porcelain",
    "period": "商 — 汉",
    "intro": "商代至汉代，以瓷石制胎、施石灰釉，经一千二百度高温焙烧。它是陶向瓷过渡的产物：胎体已经烧结，釉层薄而不匀，却是中国瓷器真正的起点。",
    "cover": "/assets/ciku/yuanshici/dpm-227425-01.jpg",
    "coverAlt": "原始瓷青釉弦纹罐（商）图01",
    "items": [
      {
        "id": "dpm-227425",
        "title": "原始瓷青釉弦纹罐",
        "dynasty": "商",
        "culture": "",
        "era": "商",
        "dimensions": "高31.4cm，口径20cm，底径9.3cm",
        "description": "原始瓷青釉弦纹罐，商，高31.4厘米，口径20厘米，底径9.3厘米。 罐口外折，短颈，溜肩，肩以下内收，平底。肩与腹部的过度有明显的折角。口内外饰弦纹，其中肩部饰凸起弦纹及锯齿纹共10道。表面施青釉，釉层薄而不匀。 原始青瓷出现于约3000年前的商代，历经西周、春秋、战国、汉代，它是从陶向瓷过渡时期的产物，系从印纹硬陶发展而来。其制法是用瓷石制胎，器表施石灰釉，经1200℃高温焙烧而成。胎体烧结后呈灰白或褐色，器表有玻璃质釉层。胎体吸水率低，敲击时能发出清脆的声音。原始青瓷上的釉都呈青色，这是由于釉中含有适量氧化铁所致。原始青瓷最初发现于河南郑州二里岗下层文化遗址与湖北黄陂盘龙城商代中…",
        "images": [
          {
            "src": "/assets/ciku/yuanshici/dpm-227425-01.jpg",
            "alt": "原始瓷青釉弦纹罐（商）图01",
            "card": "/assets/ciku/yuanshici/dpm-227425-01-card.jpg"
          },
          {
            "src": "/assets/ciku/yuanshici/dpm-227425-02.jpg",
            "alt": "原始瓷青釉弦纹罐（商）图02",
            "card": "/assets/ciku/yuanshici/dpm-227425-02-card.jpg"
          }
        ],
        "dpmId": "227425",
        "source": "https://www.dpm.org.cn/collection/ceramic/227425.html"
      },
      {
        "id": "dpm-226741",
        "title": "原始瓷青釉划花双系罐",
        "dynasty": "西周",
        "culture": "",
        "era": "西周",
        "dimensions": "高13.1cm，口径8.4cm，底径8.3cm",
        "description": "原始瓷青釉划花双系罐，西周，高13.1厘米，口径8.4厘米，底径8.3厘米。 罐敛口，折腹，束腰，圈足。肩两侧各置一横系。肩部刻划水波纹及弦纹。罐身施青釉。此罐的造型如同鱼篓，小口，大腹，以增其容积。这是西周早期原始青瓷器的造型特征。 此罐出土于河南省洛阳地区。 原始青瓷出现于约3000年前的商代，历经西周、春秋、战国、汉代，它是从陶向瓷过渡时期的产物，系从印纹硬陶发展而来。西周时原始青瓷的制作工艺有所提高，出土范围更加广阔。江南地区原始青瓷的出土量及器形比北方黄河流域多且丰富。西周时，釉已成为瓷器的必要组成部分，不仅起隔水、利于清洁的作用，而且有装饰器物使之美观的功能。釉是一种玻璃…",
        "images": [],
        "dpmId": "226741",
        "source": "https://www.dpm.org.cn/collection/ceramic/226741.html"
      },
      {
        "id": "dpm-227441",
        "title": "原始瓷青釉鐎斗",
        "dynasty": "战国",
        "culture": "",
        "era": "战国",
        "dimensions": "高10.3cm，口径16cm，足距12.5cm",
        "description": "原始瓷青釉鐎斗，战国，高10.3厘米，口径16厘米，足距12.5厘米。 鐎（jiāo音交）斗仿青铜器造型，腹部置横柄一个，底下承以三足。腹上部饰弦纹2周，器内外施青釉。 鐎斗，又称“刁斗”，盛行于汉、晋。常与形状如钵、胎壁较厚、口沿置对称半环形双鼻的火盆共存，说明鐎斗被搁置于火盆上，盆中加放炭火即可用来温食，应是模仿“暖锅”而作。外出途中可作温食用具，军旅多用之。唐诗中有“行人刁斗风沙暗”句。 原始青瓷出现于约3000年前的商代，历经西周、春秋、战国、汉代，它是从陶向瓷过渡时期的产物，系从印纹硬陶发展而来。",
        "images": [
          {
            "src": "/assets/ciku/yuanshici/dpm-227441-01.jpg",
            "alt": "原始瓷青釉鐎斗（战国）图01",
            "card": "/assets/ciku/yuanshici/dpm-227441-01-card.jpg"
          }
        ],
        "dpmId": "227441",
        "source": "https://www.dpm.org.cn/collection/ceramic/227441.html"
      },
      {
        "id": "dpm-227440",
        "title": "原始瓷青釉水波纹盖鼎",
        "dynasty": "战国",
        "culture": "",
        "era": "战国",
        "dimensions": "高19cm，口径19cm，足距17cm",
        "description": "原始瓷青釉水波纹盖鼎，战国，高19厘米，口径19厘米，足距17厘米。 鼎仿同时期青铜器造型，口沿下对称置双耳。直腹，平底，下承以外撇三足。器表施青釉，胎色灰白。鼎附圆形盖，盖顶中央置一小系，四周对称分布三个小纽。盖面施青釉，以三道弦纹为装饰带，其间刻划简单的水波纹。 鼎最早是煮食用的陶质炊具，首见于新石器时代河南新郑裴李岗和河北武安磁山文化遗址，仰韶、龙山、屈家岭、马家滨、良渚文化等新石器时代遗址中也都有发现。商周时代的鼎多为青铜制品，并逐渐成为祭祀、征伐、丧葬等活动中陈设的一种礼器。战国至汉代出现铅釉陶和原始青瓷鼎，仿青铜器式样，多做随葬品。",
        "images": [
          {
            "src": "/assets/ciku/yuanshici/dpm-227440-01.jpg",
            "alt": "原始瓷青釉水波纹盖鼎（战国）图01",
            "card": "/assets/ciku/yuanshici/dpm-227440-01-card.jpg"
          }
        ],
        "dpmId": "227440",
        "source": "https://www.dpm.org.cn/collection/ceramic/227440.html"
      },
      {
        "id": "dpm-227426",
        "title": "原始瓷刻竖条纹双系罐",
        "dynasty": "战国",
        "culture": "",
        "era": "战国",
        "dimensions": "高14cm，口径8.8cm，足径12.2cm",
        "description": "原始瓷刻竖条纹双系罐，战国，高14厘米，口径8.8厘米，足径12.2厘米。 罐圆口，溜肩，圆腹，平底，肩部对称置双系，每个系均由两个互相粘连的桥形纽组成。胎色黄白，仅在肩部有极薄的黄釉，肩部以下刻一周竖条纹。 原始青瓷出现于约3000年前的商代，历经西周、春秋、战国、汉代，它是从陶向瓷过渡时期的产物，系从印纹硬陶发展而来。战国时期原始青瓷生产得到较大发展，无论数量、质量还是生产范围，都是前代所无法企及的。从器物出土情况和窑址调查看，原始青瓷产区以长江以南为主，其中以浙江的江山、绍兴、萧山等地窑址较为集中。",
        "images": [
          {
            "src": "/assets/ciku/yuanshici/dpm-227426-01.jpg",
            "alt": "原始瓷刻竖条纹双系罐（战国）图01",
            "card": "/assets/ciku/yuanshici/dpm-227426-01-card.jpg"
          },
          {
            "src": "/assets/ciku/yuanshici/dpm-227426-02.jpg",
            "alt": "原始瓷刻竖条纹双系罐（战国）图02",
            "card": "/assets/ciku/yuanshici/dpm-227426-02-card.jpg"
          }
        ],
        "dpmId": "227426",
        "source": "https://www.dpm.org.cn/collection/ceramic/227426.html"
      },
      {
        "id": "dpm-227127",
        "title": "原始瓷青釉双系瓿",
        "dynasty": "战国",
        "culture": "",
        "era": "战国",
        "dimensions": "高16.5厘米口径12.0厘米底径12.0厘米",
        "description": "原始瓷青釉双系瓿，战国，高16.5厘米口径12.0厘米底径12.0厘米。瓿直口，短颈，溜肩，鼓腹，腹下缓收，平底。肩部对称置小圆系。浅灰色胎，胎质细腻坚致，内、外施青黄色釉，外壁施釉不到底，釉层较薄且不均匀。肩部和腹部均刻划竖条纹。浙江省德清县亭子桥窑址曾出土同类器（参见浙江省文物考古研究所、德清县博物馆编著：《德清亭子桥战国原始瓷窑址发掘报告》，文物出版社，2011年）。",
        "images": [],
        "dpmId": "227127",
        "source": "https://www.dpm.org.cn/collection/ceramic/227127.html"
      },
      {
        "id": "dpm-226820",
        "title": "原始瓷青釉印水波纹提梁盉",
        "dynasty": "战国",
        "culture": "",
        "era": "战国",
        "dimensions": "高17.7厘米，口径7厘米",
        "description": "原始瓷青釉提梁盉，高17.7厘米，口径7厘米。 盉直口，圆腹，平底，下承以三兽形足，流为兽头状，壶体另一侧饰一卷曲短尾。提梁为弓形，顶部两端饰有锯齿形棱脊，肩、腹部饰以四道连续的水波纹。器物造型古朴端庄，釉色青中泛黄，施釉均匀，纹饰简洁明快，富有动感。 原始瓷出现于商前期，盛行于春秋战国时期。战国以前，由于当时工艺技术水平低下，原料处理未经精细的过滤、淘洗、捏练、陈磨等工艺过程，器物造型简单，胎体多有裂纹，釉色很不稳定。战国时期，原始瓷的制作有了长足的进步，其烧结性能和器表施釉等方面均有很大发展，器形规整，釉层厚薄均匀，釉色青黄，造型多仿当时的青铜器，有尊、鼎、簋、盉、豆、钟等，纹饰多…",
        "images": [],
        "dpmId": "226820",
        "source": "https://www.dpm.org.cn/collection/ceramic/226820.html"
      },
      {
        "id": "dpm-226889",
        "title": "原始瓷青釉划花双系壶",
        "dynasty": "西汉",
        "culture": "",
        "era": "西汉",
        "dimensions": "高32.5cm，口径14.2cm，底径13.6cm",
        "description": "原始瓷青釉划花双系壶，西汉，高32.5厘米，口径14.2厘米，底径13.6厘米。 壶撇口，长颈，溜肩，肩部对称置双系，鼓腹，平底略内凹。通体施青釉。肩部以划花变形凤鸟纹装饰。颈、肩及腹部划有弦纹5道。 此壶造型敦厚古朴，纹饰简练，釉厚而色深，是典型的西汉原始青瓷向东汉成熟青瓷过渡期的产物。 原始青瓷出现于约3000年前的商代，历经西周、春秋、战国、汉代，它是从陶向瓷过渡时期的产物，系从印纹硬陶发展而来。其制法是用瓷石制胎，器表施石灰釉，经1200℃高温焙烧而成。胎体烧结后呈灰白或褐色，器表有玻璃质釉层。胎体吸水率低，敲击时能发出清脆的声音。原始青瓷上的釉都呈青色，这是由于釉中含有适量…",
        "images": [
          {
            "src": "/assets/ciku/yuanshici/dpm-226889-01.jpg",
            "alt": "原始瓷青釉划花双系壶（西汉）图01",
            "card": "/assets/ciku/yuanshici/dpm-226889-01-card.jpg"
          },
          {
            "src": "/assets/ciku/yuanshici/dpm-226889-02.jpg",
            "alt": "原始瓷青釉划花双系壶（西汉）图02",
            "card": "/assets/ciku/yuanshici/dpm-226889-02-card.jpg"
          }
        ],
        "dpmId": "226889",
        "source": "https://www.dpm.org.cn/collection/ceramic/226889.html"
      }
    ]
  },
  {
    "id": "underglaze",
    "num": "09",
    "name": "釉下彩",
    "en": "Underglaze Decoration",
    "period": "东晋",
    "intro": "在素坯上以褐彩点画，再罩青釉一次烧成。东晋越窑的褐斑与鸡首壶上的点睛之笔，是釉下彩最早的成熟面貌。",
    "cover": "/assets/ciku/youxiacai/dpm-226966-01.jpg",
    "coverAlt": "青釉褐彩鸡首壶（东晋）图01",
    "items": [
      {
        "id": "dpm-226966",
        "title": "青釉褐彩鸡首壶",
        "dynasty": "东晋",
        "culture": "",
        "era": "东晋",
        "dimensions": "口径5.5厘米，高15.4厘米",
        "description": "青釉褐彩鸡首壶，东晋，口径5.5厘米，高15.4厘米。 壶盘口，鸡首状短流，鼓腹，平底，俗称“鸡首壶”。肩部两侧有桥形系，并有一弧形柄连接口沿。通体施青釉，壶口与鸡首处点缀褐彩，有画龙点睛之妙。 鸡首壶始见于西晋，与羊首壶同类。早期壶的流口多为实心，不能出水。至东晋时期，流口疏通，成为这一时期南方的主要日用瓷器之一。",
        "images": [
          {
            "src": "/assets/ciku/youxiacai/dpm-226966-01.jpg",
            "alt": "青釉褐彩鸡首壶（东晋）图01",
            "card": "/assets/ciku/youxiacai/dpm-226966-01-card.jpg"
          }
        ],
        "dpmId": "226966",
        "source": "https://www.dpm.org.cn/collection/ceramic/226966.html"
      },
      {
        "id": "dpm-226884",
        "title": "青釉褐斑羊头壶",
        "dynasty": "东晋",
        "culture": "浙江青瓷窑",
        "era": "东晋 · 浙江青瓷窑",
        "dimensions": "高23.8厘米，口径10.8厘米，底径10.8厘米",
        "description": "青釉褐斑羊头壶，高23.8厘米，口径10.8厘米，底径10.8厘米。 壶口浅盘式，细颈，球形腹，平底。肩部一侧置羊头形流，相对一侧置曲柄，另外两侧各置一横系。通体施青绿色釉，底部无釉。在壶口沿、羊头及系上均涂点褐斑。肩部暗划弦纹2道。 此壶的精彩之处在于羊头形壶流，羊口微张，颌下一绺胡须，双目外凸，双角向后弯曲，双睛涂点褐彩，颇具神韵。六朝时期的青瓷壶常以动物的头部作流，除羊头外，还有鸡头、虎头、鹰头等。 青瓷发展到东晋时期，装饰上呈现出新的特点。西晋青瓷上盛行的带状印纹或刻纹此时已基本消失，代之以刻划的弦纹，或者光素无纹饰，形成简洁朴素的风格。但西晋晚期出现的褐斑装饰至东晋时却大为…",
        "images": [
          {
            "src": "/assets/ciku/youxiacai/dpm-226884-01.jpg",
            "alt": "青釉褐斑羊头壶（东晋 · 浙江青瓷窑）图01",
            "card": "/assets/ciku/youxiacai/dpm-226884-01-card.jpg"
          }
        ],
        "dpmId": "226884",
        "source": "https://www.dpm.org.cn/collection/ceramic/226884.html"
      },
      {
        "id": "dpm-226827",
        "title": "越窑系青釉褐斑四系壶",
        "dynasty": "东晋",
        "culture": "越窑系",
        "era": "东晋 · 越窑系",
        "dimensions": "高17.9厘米，口径8.4厘米",
        "description": "青釉褐斑四系壶，高17.9厘米，口径8.4厘米。 壶洗口，长颈，丰肩，鼓腹，腹下内收，平底。底部无釉，有支烧痕迹。肩部刻划弦纹2道，四面分别饰一横向系。外口凸起弦纹1道，器身施半截釉，釉色青黄，散布有垂淌的褐斑。 此器为东晋时期所制，褐色彩斑装饰面积较大，形态千变万化，或似泼墨，或似树叶，装饰效果绮丽，十分罕见，属于南方青瓷越窑系。 此壶于1954年由故宫著名陶瓷专家陈万里先生捐献。",
        "images": [
          {
            "src": "/assets/ciku/youxiacai/dpm-226827-01.jpg",
            "alt": "越窑系青釉褐斑四系壶（东晋 · 越窑系）图01",
            "card": "/assets/ciku/youxiacai/dpm-226827-01-card.jpg"
          }
        ],
        "dpmId": "226827",
        "source": "https://www.dpm.org.cn/collection/ceramic/226827.html"
      }
    ]
  },
  {
    "id": "coloured-glaze",
    "num": "10",
    "name": "颜色釉",
    "en": "Coloured Glaze",
    "period": "战国 — 隋",
    "intro": "不借纹样，只让釉色自己说话。从原始青瓷到德清窑黑釉、北朝铅黄绿彩，再到隋代白釉，釉在窑火里完成了中国瓷器最初的色谱。",
    "cover": "/assets/ciku/yanseyou/dpm-227434-01.jpg",
    "coverAlt": "青釉莲花尊（其一）（北朝）图01",
    "items": [
      {
        "id": "dpm-227506",
        "title": "原始瓷青釉四系洗",
        "dynasty": "战国",
        "culture": "",
        "era": "战国",
        "dimensions": "高6.8cm，口径21.3cm，底径16.2cm",
        "description": "青釉原始瓷青釉四系洗，战国，高6.8厘米，口径21.3厘米，底径16.2厘米。 洗圆口内敛，弧腹，平底。灰白色胎。口沿下对称置四系。器里和口沿可见斑驳不匀的青釉。 洗有两种用途，一是盥洗器具，相当于盆。从汉至清代一直烧造，其中以宋、元时的磁州窑系和明、清时景德镇窑产量最大。二是文房用具，用于洗笔，故称笔洗。此洗应为盥洗器具。 原始青瓷出现于约3000年前的商代，历经西周、春秋、战国、汉代，它是从陶向瓷过渡时期的产物，系从印纹硬陶发展而来。其制法是用瓷石制胎，器表施石灰釉，经1200℃高温焙烧而成。胎体烧结后呈灰白或褐色，器表有玻璃质釉层。胎体吸水率低，敲击时能发出清脆的声音。原始青瓷…",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-227506-01.jpg",
            "alt": "原始瓷青釉四系洗（战国）图01",
            "card": "/assets/ciku/yanseyou/dpm-227506-01-card.jpg"
          },
          {
            "src": "/assets/ciku/yanseyou/dpm-227506-02.jpg",
            "alt": "原始瓷青釉四系洗（战国）图02",
            "card": "/assets/ciku/yanseyou/dpm-227506-02-card.jpg"
          }
        ],
        "dpmId": "227506",
        "source": "https://www.dpm.org.cn/collection/ceramic/227506.html"
      },
      {
        "id": "dpm-227468",
        "title": "原始瓷青釉划花双系罐",
        "dynasty": "西汉",
        "culture": "",
        "era": "西汉",
        "dimensions": "高31.5cm 口径8.3cm 足径16.5cm",
        "description": "原始瓷青釉划花双系罐，西汉，高31.5厘米，口径8.3厘米，足径16.5厘米。 罐口平沿，无颈，溜肩，鼓腹，胫部渐收，平底微内凹。肩上对称置长方耳并套活环。外壁施青釉至腹。腹部凸弦纹带内刻凤鸟纹。双耳刻划兽面纹。 此罐器形饱满，线条流畅，是西汉原始青瓷的代表作。 原始青瓷出现于约3000年前的商代，历经西周、春秋、战国、汉代，它是从陶向瓷过渡时期的产物，系从印纹硬陶发展而来。其制法是用瓷石制胎，器表施石灰釉，经1200℃高温焙烧而成。胎体烧结后呈灰白或褐色，器表有玻璃质釉层。胎体吸水率低，敲击时能发出清脆的声音。原始青瓷上的釉都呈青色，这是由于釉中含有适量氧化铁所致。原始青瓷与陶器虽…",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-227468-01.jpg",
            "alt": "原始瓷青釉划花双系罐（西汉）图01",
            "card": "/assets/ciku/yanseyou/dpm-227468-01-card.jpg"
          },
          {
            "src": "/assets/ciku/yanseyou/dpm-227468-02.jpg",
            "alt": "原始瓷青釉划花双系罐（西汉）图02",
            "card": "/assets/ciku/yanseyou/dpm-227468-02-card.jpg"
          }
        ],
        "dpmId": "227468",
        "source": "https://www.dpm.org.cn/collection/ceramic/227468.html"
      },
      {
        "id": "dpm-227467",
        "title": "青釉堆塑五联瓷罐",
        "dynasty": "东汉",
        "culture": "",
        "era": "东汉",
        "dimensions": "高46.5cm 口径6.4cm 底径16.5cm",
        "description": "青釉堆塑五联瓷罐，东汉，高46.5厘米，口径6.4厘米，底径16.5厘米。 五联罐主体为三节葫芦形。施青釉至腹部，其下流釉数道。上腹为两节葫芦形，周围堆塑四个小罐。束腰处塑贴熊、龟和蜥蜴等。下腹有4道弦纹。胫部渐收，平底。 五联罐始烧于东汉，多出土于江南地区，是随葬用的冥器。早期器形简单，很少见有堆塑。后来，装饰日渐繁复，堆塑很多人物、动物。到了西晋演变成谷仓罐，具有很高的艺术价值。谷仓罐是对汉代所流行的五联罐随葬的继承和变革,主要是为了死者在另一个世界丰衣足食，能最大限度地满足灵魂的需求。",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-227467-01.jpg",
            "alt": "青釉堆塑五联瓷罐（东汉）图01",
            "card": "/assets/ciku/yanseyou/dpm-227467-01-card.jpg"
          },
          {
            "src": "/assets/ciku/yanseyou/dpm-227467-02.jpg",
            "alt": "青釉堆塑五联瓷罐（东汉）图02",
            "card": "/assets/ciku/yanseyou/dpm-227467-02-card.jpg"
          }
        ],
        "dpmId": "227467",
        "source": "https://www.dpm.org.cn/collection/ceramic/227467.html"
      },
      {
        "id": "dpm-227466",
        "title": "青釉刻花三足瓷樽",
        "dynasty": "东汉",
        "culture": "",
        "era": "东汉",
        "dimensions": "高23cm 口径17.7cm 足距15cm",
        "description": "青釉刻花三足瓷樽，东汉，高23厘米，口径17.7厘米，足距15厘米。 樽口内敛，圆桶形器身，直壁，平底，下承以人形三足。附圆盖，盖顶中央置一系，周围置3纽。灰白色胎。盖面刻水波和花叶纹，器身两侧塑贴铺首并刻花草纹。 此樽出土于广州东郊红花岗。 樽是一种温酒用具，流行于汉晋时期，主要为铅绿釉或黄釉陶器。整器应附盖，其中博山形盖较常见。隋至南宋有较精致的白瓷或青瓷制品，以故宫博物院收藏的宋汝窑樽最为著名。",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-227466-01.jpg",
            "alt": "青釉刻花三足瓷樽（东汉）图01",
            "card": "/assets/ciku/yanseyou/dpm-227466-01-card.jpg"
          },
          {
            "src": "/assets/ciku/yanseyou/dpm-227466-02.jpg",
            "alt": "青釉刻花三足瓷樽（东汉）图02",
            "card": "/assets/ciku/yanseyou/dpm-227466-02-card.jpg"
          }
        ],
        "dpmId": "227466",
        "source": "https://www.dpm.org.cn/collection/ceramic/227466.html"
      },
      {
        "id": "dpm-227465",
        "title": "青釉刻纹镂空瓷簋",
        "dynasty": "东汉",
        "culture": "",
        "era": "东汉",
        "dimensions": "通高18cm 口径27.5cm 足径16.8cm",
        "description": "青釉刻纹镂空瓷簋，东汉，通高18厘米，口径27.5厘米，足径16.8厘米。 簋（guǐ音轨）圆形，附盖。口沿微外撇，弧腹，高圈足稍外撇。胎色灰白。通体施釉，釉色青中泛褐。盖顶置环形纽，纽上套圆环。盖面刻花叶和三角纹。口沿镂空小圆孔一周并刻划树枝纹。腹部刻菱形纹。 此件器物出土于广州东郊三育路羊山。 簋为盛食器，功能相当于大碗，以陶质、青铜质或瓷质较为常见。新石器时代大溪文化、良渚文化、昙石山文化以及夏、商、西周遗址和墓葬中均有出土。早期陶簋一般为侈口，圆腹，圈足，有的有双耳。商代中期开始，器形演变为敛口，折沿，深腹，圜底，圈足，有的则为敞口，卷沿，斜腹。商代始见原始青瓷簋，三国至西晋…",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-227465-01.jpg",
            "alt": "青釉刻纹镂空瓷簋（东汉）图01",
            "card": "/assets/ciku/yanseyou/dpm-227465-01-card.jpg"
          },
          {
            "src": "/assets/ciku/yanseyou/dpm-227465-02.jpg",
            "alt": "青釉刻纹镂空瓷簋（东汉）图02",
            "card": "/assets/ciku/yanseyou/dpm-227465-02-card.jpg"
          }
        ],
        "dpmId": "227465",
        "source": "https://www.dpm.org.cn/collection/ceramic/227465.html"
      },
      {
        "id": "dpm-227455",
        "title": "原始瓷青釉瓷匜",
        "dynasty": "战国",
        "culture": "",
        "era": "战国",
        "dimensions": "高8.4cm 口径16.5cm 底径7.7cm",
        "description": "原始瓷青釉瓷匜，战国，高8.4厘米，口径16.5厘米，底径7.7厘米。 匜（yí音仪）圆口，弧腹，小平底。口沿一侧置一圆系，另一侧置流。内外施青釉，釉层较薄。 匜为古代盥器，是盥洗时浇水的用具，有陶、青铜和瓷制品。陶制品常出现在新石器时代至西汉的墓葬中。新石器时代嵩泽文化遗址中出土的直腹圜底匜、河南郑州春秋墓葬中出土的仿青铜式样的匜较为少见。战国以后圆盘形匜较流行。",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-227455-01.jpg",
            "alt": "原始瓷青釉瓷匜（东汉）图01",
            "card": "/assets/ciku/yanseyou/dpm-227455-01-card.jpg"
          },
          {
            "src": "/assets/ciku/yanseyou/dpm-227455-02.jpg",
            "alt": "原始瓷青釉瓷匜（东汉）图02",
            "card": "/assets/ciku/yanseyou/dpm-227455-02-card.jpg"
          }
        ],
        "dpmId": "227455",
        "source": "https://www.dpm.org.cn/collection/ceramic/227455.html"
      },
      {
        "id": "dpm-227454",
        "title": "绿釉陶狗",
        "dynasty": "东汉",
        "culture": "釉陶",
        "era": "东汉 · 釉陶",
        "dimensions": "高29.7cm 长27cm 宽16cm",
        "description": "绿釉陶狗，东汉，高29.7厘米，长27厘米，宽16厘米。 犬通体施绿釉。头部较大，身体短小，两只耳朵弯曲向前，双目圆睁怒视前方，张嘴狂吠，犬齿外露彰显凶猛。其四肢短小，矫健有力，显示出一种自然写实的美感。 东汉中期，随葬的家畜、家禽等陶俑的数量较以前增多。 陶犬身上的绿釉是因为含氧化铜的石灰釉在氧化气氛中呈现出绿色。我国传统的绿釉都是以铜作着色剂，属于铜绿釉。",
        "images": [],
        "dpmId": "227454",
        "source": "https://www.dpm.org.cn/collection/ceramic/227454.html"
      },
      {
        "id": "dpm-227453",
        "title": "绿釉弦纹熊足陶仓",
        "dynasty": "东汉",
        "culture": "",
        "era": "东汉",
        "dimensions": "高24.5cm 口径5.7cm 足距7.8cm",
        "description": "绿釉弦纹熊足陶仓，东汉，高24.5厘米，口径5.7厘米，足距7.8厘米。 陶仓顶部呈伞状，圆桶身，平底，下承以三熊形足。通体施绿釉。仓顶均匀分布20条放射状凸线纹，其间用波线示意出叠压的瓦纹。器身饰3组凸弦纹。 汉代墓中随葬陶器的数量和品种大大超过了以往各代墓内随葬的陶器，其中一部分是实用器，但绝大多数是专为随葬烧制的陶冥器。陶仓即为随葬冥器，始见于战国、秦代墓葬出土物，汉武帝前后盛行，与灶、井、炉等配套使用。",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-227453-01.jpg",
            "alt": "绿釉弦纹熊足陶仓（东汉）图01",
            "card": "/assets/ciku/yanseyou/dpm-227453-01-card.jpg"
          },
          {
            "src": "/assets/ciku/yanseyou/dpm-227453-02.jpg",
            "alt": "绿釉弦纹熊足陶仓（东汉）图02",
            "card": "/assets/ciku/yanseyou/dpm-227453-02-card.jpg"
          }
        ],
        "dpmId": "227453",
        "source": "https://www.dpm.org.cn/collection/ceramic/227453.html"
      },
      {
        "id": "dpm-227452",
        "title": "绿釉凸花狩猎纹陶壶",
        "dynasty": "东汉",
        "culture": "",
        "era": "东汉",
        "dimensions": "高25cm，口径9.8cm，底径10.2cm",
        "description": "绿釉凸花狩猎纹陶壶，东汉，高25厘米，口径9.8厘米，底径10.2厘米。 壶撇口，粗颈，鼓腹，胫部渐收，平底。灰白色胎。通体施绿釉，釉色匀净光亮。腹部凸雕狩猎纹，可见林中飞奔的龙、虎、羊等。 战国至汉代的工艺品上流行使用狩猎纹，表现的内容为宴乐、弋射、采桑、狩猎以及水陆攻战等题材，反映了当时的社会生活状况。汉代的陶器上多采用凸雕的方法装饰这些纹样。 含氧化铜的石灰釉在氧化气氛中呈现出绿色。我国传统的绿釉都是以氧化铜作着色剂，属于铜绿釉。",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-227452-01.jpg",
            "alt": "绿釉凸花狩猎纹陶壶（东汉）图01",
            "card": "/assets/ciku/yanseyou/dpm-227452-01-card.jpg"
          },
          {
            "src": "/assets/ciku/yanseyou/dpm-227452-02.jpg",
            "alt": "绿釉凸花狩猎纹陶壶（东汉）图02",
            "card": "/assets/ciku/yanseyou/dpm-227452-02-card.jpg"
          }
        ],
        "dpmId": "227452",
        "source": "https://www.dpm.org.cn/collection/ceramic/227452.html"
      },
      {
        "id": "dpm-227092",
        "title": "青釉刻划弦纹双系瓷壶",
        "dynasty": "东汉",
        "culture": "",
        "era": "东汉",
        "dimensions": "高24.5cm，口径11.5cm，底径9cm",
        "description": "青釉刻划弦纹双系瓷壶，东汉，高24.5厘米，口径11.5厘米，底径9厘米。 壶洗口，束颈，溜肩，鼓腹，腹以下渐敛，平底。肩部置对称竖系。通体内外施青釉，外壁施釉不到底。颈、肩部刻划水波纹，腹部刻划密集的弦纹。 这件青釉双系壶胎体较薄，釉层匀净光洁，属于刚从原始瓷中脱离出来的质量更高一筹的青釉器，堪称我国最早的瓷器。 这种青釉瓷器在烧结性能和器表施釉等各方面都比原始青瓷有了较大进步，但与成熟的青瓷相比仍有一定的差距。",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-227092-01.jpg",
            "alt": "青釉刻划弦纹双系瓷壶（东汉）图01",
            "card": "/assets/ciku/yanseyou/dpm-227092-01-card.jpg"
          },
          {
            "src": "/assets/ciku/yanseyou/dpm-227092-02.jpg",
            "alt": "青釉刻划弦纹双系瓷壶（东汉）图02",
            "card": "/assets/ciku/yanseyou/dpm-227092-02-card.jpg"
          }
        ],
        "dpmId": "227092",
        "source": "https://www.dpm.org.cn/collection/ceramic/227092.html"
      },
      {
        "id": "dpm-226707",
        "title": "青釉堆塑谷仓罐（其一）",
        "dynasty": "三国吴",
        "culture": "",
        "era": "三国吴",
        "dimensions": "高46.4cm，口径11.3cm，底径13.5cm",
        "description": "青釉堆塑谷仓罐，三国吴，高46.4厘米，口径11.3厘米，底径13.5厘米。 谷仓上半部堆塑多种饰物：有三层崇楼居中，一层两侧各有一条狗把门，楼檐之上有栖息的鸟和觅食的老鼠。崇楼两侧各立一亭阙，阙下有八位侍仆各执不同的乐器，正聚精会神地演奏乐曲。谷仓顶部堆塑五只相连的罐子，大罐居中，一鼠正从罐口爬出。四小罐分列大罐四角，周围簇拥着引颈觅食的雀鸟。谷仓的下半部为一完整的青瓷罐形，罐肩部其余部位塑贴一龟驮碑，碑上刻“永安三年时富且洋（祥）宜公卿多子孙寿命长千意（亿）万岁未见英（殃）”24字。龟之周围塑贴人物及鹿、猪、龟、鱼等动物，其间还夹杂刻划狗、鱼、龙等纹饰，另有“飞”、“鹿”、“句…",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-226707-01.jpg",
            "alt": "青釉堆塑谷仓罐（其一）（三国）图01",
            "card": "/assets/ciku/yanseyou/dpm-226707-01-card.jpg"
          },
          {
            "src": "/assets/ciku/yanseyou/dpm-226707-02.jpg",
            "alt": "青釉堆塑谷仓罐（其一）（三国）图02",
            "card": "/assets/ciku/yanseyou/dpm-226707-02-card.jpg"
          },
          {
            "src": "/assets/ciku/yanseyou/dpm-226707-03.jpg",
            "alt": "青釉堆塑谷仓罐（其一）（三国）图03",
            "card": "/assets/ciku/yanseyou/dpm-226707-03-card.jpg"
          }
        ],
        "dpmId": "226707",
        "source": "https://www.dpm.org.cn/collection/ceramic/226707.html"
      },
      {
        "id": "dpm-227659",
        "title": "青釉鱼篓尊",
        "dynasty": "西晋",
        "culture": "",
        "era": "西晋",
        "dimensions": "高17.3厘米，口横12厘米，口纵13厘米，底径12.5厘米",
        "description": "青釉鱼篓尊，西晋，高17.3厘米，口横12厘米，口纵13厘米，底径12.5厘米。 尊椭圆口，平沿，深腹，平底，胎灰色，施青釉，施釉不均匀，颈部刻网格纹，下方饰一周绳索纹。",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-227659-01.jpg",
            "alt": "青釉鱼篓尊（晋）图01",
            "card": "/assets/ciku/yanseyou/dpm-227659-01-card.jpg"
          }
        ],
        "dpmId": "227659",
        "source": "https://www.dpm.org.cn/collection/ceramic/227659.html"
      },
      {
        "id": "dpm-227658",
        "title": "青釉狮形插器",
        "dynasty": "西晋",
        "culture": "",
        "era": "西晋",
        "dimensions": "高8.2厘米，口径2.5厘米，底径8.9厘米",
        "description": "青釉狮形插器，西晋，高8.2厘米，口径2.5厘米，底径8.9厘米。 器型为卧狮形，昂首挺胸，双耳立起，背部安装一圆桶形插管。灰白色胎，通体施青釉。采用捏塑、模贴与细密线条刻划结合，形象生动，是集实用与玩赏为一体的艺术珍品。",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-227658-01.jpg",
            "alt": "青釉狮形插器（晋）图01",
            "card": "/assets/ciku/yanseyou/dpm-227658-01-card.jpg"
          }
        ],
        "dpmId": "227658",
        "source": "https://www.dpm.org.cn/collection/ceramic/227658.html"
      },
      {
        "id": "dpm-227147",
        "title": "萧山窑青釉划莲瓣纹盘",
        "dynasty": "晋",
        "culture": "萧山窑",
        "era": "晋 · 萧山窑",
        "dimensions": "高4.5厘米，口径24.2厘米，足径9.6厘米",
        "description": "萧山窑青釉划莲瓣纹盘，晋，高4.5厘米，口径24.2厘米，足径9.6厘米。 盘敞口，浅弧壁，圈足。通体施青釉。盘心有四个较大的支钉痕，内壁刻划一周莲瓣纹，纹饰清晰简练，自然流畅。从盘心至口沿处还刻划了四组弦纹。 萧山窑所处位置在战国时期是越国故地，是浙江原始青瓷产地之一，南朝继续烧制瓷器，其特点是胎色灰白，釉面青黄，其中莲瓣纹饰产品具有佛教艺术色彩，反映了当时佛教在我国已经得到广泛的传播。",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-227147-01.jpg",
            "alt": "萧山窑青釉划莲瓣纹盘（晋 · 萧山窑）图01",
            "card": "/assets/ciku/yanseyou/dpm-227147-01-card.jpg"
          }
        ],
        "dpmId": "227147",
        "source": "https://www.dpm.org.cn/collection/ceramic/227147.html"
      },
      {
        "id": "dpm-227657",
        "title": "青釉鸡头壶（其一）",
        "dynasty": "西晋",
        "culture": "",
        "era": "西晋",
        "dimensions": "高15.5厘米，口径10.7厘米，底径8厘米",
        "description": "青釉鸡头壶，西晋，高15.5厘米，口径10.7厘米，底径8厘米。 壶圆口，短直颈，流肩，鼓腹，近底急收，平底。施青釉，胎灰白色。肩部两侧各贴鸡首和鸡尾，期间有四个横系和铺首。 鸡首、鸡尾纯粹只是一种装饰，鸡首短小无颈、实心尖嘴，且与腹部不相通，此类器物多集中在浙江、江苏两省的孙吴、西晋墓葬中出土。 鸡首壶，也称“天鸡壶”、“鸡头壶”，始见于东吴末期，两晋至南朝初期流行，东晋中晚期，各种动物造型器皿消失不见，青瓷器形趋向简化，惟独鸡首壶的造型和装饰手法日益丰富。",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-227657-01.jpg",
            "alt": "青釉鸡头壶（其一）（西晋）图01",
            "card": "/assets/ciku/yanseyou/dpm-227657-01-card.jpg"
          }
        ],
        "dpmId": "227657",
        "source": "https://www.dpm.org.cn/collection/ceramic/227657.html"
      },
      {
        "id": "dpm-227478",
        "title": "青釉堆塑谷仓罐（其二）",
        "dynasty": "西晋",
        "culture": "",
        "era": "西晋",
        "dimensions": "高42cm 腹围72cm 底径15cm",
        "description": "青釉堆塑谷仓罐，西晋，高42厘米，腹围72厘米，底径15厘米。 谷仓罐由上下两部分组成。上半部为两层楼阁加堆塑装饰。上层中间立一楼阁，四角各立一阙，四面各有一跪俑；下层四角亦各有一阙，两面各有一牌坊，另两面各有两跪俑。下半部为一罐，腹部塑贴三组骑兽人和三组舞俑。通体施青釉。平底。 谷仓罐流行于三国（吴）、西晋时期，有陶、瓷制品，是由东汉的五联罐演变而来，是当时的随葬用品。其雕塑复杂，楼阁、飞禽、动物、乐舞杂技是其主要表现内容，着重表现豪门贵族生前居住的城堡式楼阁建筑以及奢华的生活场面。",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-227478-01.jpg",
            "alt": "青釉堆塑谷仓罐（其二）（西晋）图01",
            "card": "/assets/ciku/yanseyou/dpm-227478-01-card.jpg"
          },
          {
            "src": "/assets/ciku/yanseyou/dpm-227478-02.jpg",
            "alt": "青釉堆塑谷仓罐（其二）（西晋）图02",
            "card": "/assets/ciku/yanseyou/dpm-227478-02-card.jpg"
          }
        ],
        "dpmId": "227478",
        "source": "https://www.dpm.org.cn/collection/ceramic/227478.html"
      },
      {
        "id": "dpm-227477",
        "title": "青釉鸡头壶（其二）",
        "dynasty": "西晋",
        "culture": "",
        "era": "西晋",
        "dimensions": "高9cm 口径4.5cm 底径5.2cm",
        "description": "青釉鸡头壶，西晋，高9厘米，口径4.5厘米，底径5.2厘米。 壶盘口，短颈，鼓腹，近底渐收，平底。外壁施青釉至下腹。肩部一侧置鸡头流，另一侧贴鸡尾。头尾之间对称置双系。 鸡头壶出现于三国（吴）晚期，以壶嘴做成鸡头状而得名。一般是在小盘口壶的肩部一面贴鸡头，另一面贴鸡尾，头尾前后对称。西晋时的鸡头壶短小无颈，有的鸡头是纯粹的装饰，为实心，有的作为壶嘴，可通。 青釉是我国瓷器最早的颜色釉，出现于南方。青釉瓷器一直是中国瓷器的主要产品，历经了东汉、六朝、唐、宋、元、明和清不绝。所谓“青釉”，颜色并不是纯粹的青，而是具有黄、绿、青等几种颜色，但多少总能泛出青绿色。我国历代的青釉都是以氧化铁作…",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-227477-01.jpg",
            "alt": "青釉鸡头壶（其二）（西晋）图01",
            "card": "/assets/ciku/yanseyou/dpm-227477-01-card.jpg"
          },
          {
            "src": "/assets/ciku/yanseyou/dpm-227477-02.jpg",
            "alt": "青釉鸡头壶（其二）（西晋）图02",
            "card": "/assets/ciku/yanseyou/dpm-227477-02-card.jpg"
          }
        ],
        "dpmId": "227477",
        "source": "https://www.dpm.org.cn/collection/ceramic/227477.html"
      },
      {
        "id": "dpm-227476",
        "title": "青釉印花双系罐",
        "dynasty": "西晋",
        "culture": "",
        "era": "西晋",
        "dimensions": "高16cm 口径17cm 足径15.6cm",
        "description": "青釉印花双系罐，西晋，高16厘米，口径17厘米，足径15.6厘米。 罐口内敛，两面各置一绳状耳，圆肩，硕腹，近底内收，实足外撇，平底。通体施青釉。肩部弦纹带内印网格纹，弦纹的下方印倒三角纹，以模印横竖网纹装饰。 网纹又称网格纹、方格纹，是陶瓷装饰的原始纹样之一。网纹起源于新石器时代仰韶文化彩陶器，是史前新石器时代渔猎生活在原始制陶及审美意识上的反映。东汉至六朝前期的青瓷上，网纹盛行。东晋以后网纹不再流行。明清瓷器上作为边饰，网纹偶有出现。",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-227476-01.jpg",
            "alt": "青釉印花双系罐（西晋）图01",
            "card": "/assets/ciku/yanseyou/dpm-227476-01-card.jpg"
          },
          {
            "src": "/assets/ciku/yanseyou/dpm-227476-02.jpg",
            "alt": "青釉印花双系罐（西晋）图02",
            "card": "/assets/ciku/yanseyou/dpm-227476-02-card.jpg"
          }
        ],
        "dpmId": "227476",
        "source": "https://www.dpm.org.cn/collection/ceramic/227476.html"
      },
      {
        "id": "dpm-226964",
        "title": "越窑系青釉印花三兽足洗",
        "dynasty": "西晋",
        "culture": "越窑系",
        "era": "西晋 · 越窑系",
        "dimensions": "高9cm，口径20.7cm，足距15.7cm",
        "description": "青釉印花三兽足洗，西晋，高9厘米，口径20.7厘米，足距15.7厘米。 洗折沿，深腹，平底，下承以三兽足。器外壁模印网纹一周，上下戳印圆圈纹，网纹带上又均匀分布6尊模印塑贴佛像。洗沿刻划条形羽状纹饰。洗内底刻划太阳纹、水波纹和羽毛纹。此器内外施青黄色釉，釉面有侵蚀剥落的现象。 洗是当时主要的生活器皿之一，类似后世的脸盆。此洗属南方越窑系青瓷，它借鉴和吸收了青铜器的纹饰和造型，是西晋时期流行的样式。以佛像作为装饰，反映了当时佛教已在中国得到广泛的传播。模印塑贴是陶瓷装饰的技法之一，工序是先模印出花纹，然后用泥浆粘贴在坯体上，花纹凸起，具有立体效果。",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-226964-01.jpg",
            "alt": "越窑系青釉印花三兽足洗（西晋 · 越窑系）图01",
            "card": "/assets/ciku/yanseyou/dpm-226964-01-card.jpg"
          },
          {
            "src": "/assets/ciku/yanseyou/dpm-226964-02.jpg",
            "alt": "越窑系青釉印花三兽足洗（西晋 · 越窑系）图02",
            "card": "/assets/ciku/yanseyou/dpm-226964-02-card.jpg"
          }
        ],
        "dpmId": "226964",
        "source": "https://www.dpm.org.cn/collection/ceramic/226964.html"
      },
      {
        "id": "dpm-226954",
        "title": "青釉双系兽面纹扁壶",
        "dynasty": "西晋",
        "culture": "",
        "era": "西晋",
        "dimensions": "口径4.2厘米，最大腹径18厘米，高14厘米",
        "description": "青釉双系兽面纹扁壶，西晋，口径4.2厘米，最大腹径18厘米，高14厘米。 壶小直口，肩上有两小系，器身呈扁椭圆形，平底微内凹。通体施青釉，双系之间印圆圈带状装饰，中间贴塑一兽头，这是西晋时期普遍采用的一种装饰方法。扁圆的形体和设计巧妙的双系使之既实用又便于携带。",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-226954-01.jpg",
            "alt": "青釉双系兽面纹扁壶（西晋）图01",
            "card": "/assets/ciku/yanseyou/dpm-226954-01-card.jpg"
          }
        ],
        "dpmId": "226954",
        "source": "https://www.dpm.org.cn/collection/ceramic/226954.html"
      },
      {
        "id": "dpm-226950",
        "title": "青釉镂空双系罐",
        "dynasty": "西晋",
        "culture": "",
        "era": "西晋",
        "dimensions": "通高17.7cm，口径12.3cm，足径14cm",
        "description": "青釉镂空双系罐，西晋，通高17.7㎝，口径12.3㎝，足径14㎝。 罐直口，鼓腹，足外撇。口两端贴半环形绳系。通体施青釉，腹上部满饰镂孔。 南方的青瓷制作水平到西晋时有了很大提高，掌握了还原焰的烧制技术，青釉色彩较稳定，胎质细腻，胎色灰白。除印贴、镂孔等装饰手法外，西晋的壶、罐、尊、洗类器物的肩部和口沿多饰装饰带，以细密的几何图案为主。此器釉厚处色调较深，釉薄处则浅淡，整体效果晶莹明澈。",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-226950-01.jpg",
            "alt": "青釉镂空双系罐（西晋）图01",
            "card": "/assets/ciku/yanseyou/dpm-226950-01-card.jpg"
          }
        ],
        "dpmId": "226950",
        "source": "https://www.dpm.org.cn/collection/ceramic/226950.html"
      },
      {
        "id": "dpm-226898",
        "title": "越窑系青釉印纹豆",
        "dynasty": "西晋",
        "culture": "越窑系",
        "era": "西晋 · 越窑系",
        "dimensions": "高9.3厘米，口径16.8厘米，足径11.9厘米",
        "description": "青釉印纹豆，高9.3厘米，口径16.8厘米，足径11.9厘米。 豆敛口，扁圆腹，高圈足。通体施青釉，足内无釉。器口外沿凸起一道弦纹，外壁模印网格纹，上下分别戳印圈点纹一周，腹部两侧相对贴塑兽首衔环，近足处凸起两道弦纹。 此器属于南方青瓷越窑系，其釉色匀净，造型端庄古朴，纹饰清晰、简略、自然，是早期青瓷的佳作。",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-226898-01.jpg",
            "alt": "越窑系青釉印纹豆（西晋 · 越窑系）图01",
            "card": "/assets/ciku/yanseyou/dpm-226898-01-card.jpg"
          },
          {
            "src": "/assets/ciku/yanseyou/dpm-226898-02.jpg",
            "alt": "越窑系青釉印纹豆（西晋 · 越窑系）图02",
            "card": "/assets/ciku/yanseyou/dpm-226898-02-card.jpg"
          }
        ],
        "dpmId": "226898",
        "source": "https://www.dpm.org.cn/collection/ceramic/226898.html"
      },
      {
        "id": "dpm-226857",
        "title": "青釉印纹双系壶",
        "dynasty": "西晋",
        "culture": "",
        "era": "西晋",
        "dimensions": "高26.6厘米，口径14.9厘米，底径11.2厘米",
        "description": "青釉印纹双系壶，高26.6厘米，口径14.9厘米，底径11.2厘米。 壶盘口，束颈，丰肩，鼓腹渐敛，平底。通体施青釉。外口凸起弦纹，肩部堆贴兽面衔环装饰，两侧各立双系。肩部模印网纹，网纹上下各戳印小菊花纹一周。 双系壶在西晋时期较为多见，是当时盛水的器皿。此壶造型庄重规整，釉色匀净，其兽面衔环装饰和模印网纹都是西晋时期青瓷的流行纹饰。",
        "images": [],
        "dpmId": "226857",
        "source": "https://www.dpm.org.cn/collection/ceramic/226857.html"
      },
      {
        "id": "dpm-226856",
        "title": "青釉羊",
        "dynasty": "西晋",
        "culture": "",
        "era": "西晋",
        "dimensions": "高13.5cm，长15.0cm，宽11cm",
        "description": "青釉羊，西晋，高13.5厘米，长15.0厘米，宽11厘米。 羊作卧姿，四足屈于腹下，昂首张口，双卷角后盘，颌下有须，羊首顶有一圆孔以插物，背部饰对称的线条纹，腹部两侧用戳印纹和篦花纹刻划羽翼，臀部上端贴附短尾。通体施青绿釉，釉色莹润，四足支烧处无釉。 此种器物自三国至东晋都有烧造，但东晋以后的制作较为粗糙。它的用途是作为随葬的冥器。羊在中国古代被视为祥瑞动物，羊形青瓷成为一时风尚。 青釉是我国瓷器最早的颜色釉，出现于南方。青釉瓷器一直是中国瓷器的主要产品，历经了东汉、六朝、唐、宋、元、明和清不绝。所谓“青釉”，颜色并不是纯粹的青，而是具有黄、绿、青等几种颜色，但多少总能泛出青绿色。我…",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-226856-01.jpg",
            "alt": "青釉羊（西晋）图01",
            "card": "/assets/ciku/yanseyou/dpm-226856-01-card.jpg"
          },
          {
            "src": "/assets/ciku/yanseyou/dpm-226856-02.jpg",
            "alt": "青釉羊（西晋）图02",
            "card": "/assets/ciku/yanseyou/dpm-226856-02-card.jpg"
          }
        ],
        "dpmId": "226856",
        "source": "https://www.dpm.org.cn/collection/ceramic/226856.html"
      },
      {
        "id": "dpm-226830",
        "title": "青釉四系鸟纽盖缸",
        "dynasty": "西晋",
        "culture": "",
        "era": "西晋",
        "dimensions": "通高9.3厘米，口径8.2厘米，足径8.2厘米",
        "description": "青釉四系鸟纽盖缸，通高9.3厘米，口径8.2厘米，足径8.2厘米。 盖缸敛口，扁圆鼓腹，圈足外撇，肩部四面各饰一条形系。外壁模印菱形锦地网格纹，间饰划线弦纹。盖圆形，盖口可以合于缸口内。盖面饰3周凹陷的宽弦纹，盖顶雕塑一对小鸟，情态活泼可爱，展翅翘尾相对而立，栩栩如生。器物内外皆施青釉，圈足内素胎无釉。 此器为西晋时期所制，属于南方青瓷越窑系，造型新颖别致，反映出当时工匠们高超的制瓷技艺。",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-226830-01.jpg",
            "alt": "青釉四系鸟纽盖缸（西晋）图01",
            "card": "/assets/ciku/yanseyou/dpm-226830-01-card.jpg"
          }
        ],
        "dpmId": "226830",
        "source": "https://www.dpm.org.cn/collection/ceramic/226830.html"
      },
      {
        "id": "dpm-226829",
        "title": "越窑系青釉双系罐",
        "dynasty": "西晋",
        "culture": "越窑系",
        "era": "西晋 · 越窑系",
        "dimensions": "高23.8厘米，口径21.4厘米，底径13.7厘米",
        "description": "青釉双系罐，高23.8厘米，口径21.4厘米，底径13.7厘米。 罐短直口，丰肩，鼓腹，腹下内敛，平底。罐内及外壁通施青釉，釉色微黄。肩饰模印网格纹，上下戳印圈点纹，其间用弦线间隔。肩部左右两侧塑有双系，系面印锦纹。肩前后两侧分别贴塑兽耳衔环装饰。 此器为西晋时期所制，属于南方青瓷越窑系，釉面莹润光洁，纹饰简练。",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-226829-01.jpg",
            "alt": "越窑系青釉双系罐（西晋 · 越窑系）图01",
            "card": "/assets/ciku/yanseyou/dpm-226829-01-card.jpg"
          }
        ],
        "dpmId": "226829",
        "source": "https://www.dpm.org.cn/collection/ceramic/226829.html"
      },
      {
        "id": "dpm-226828",
        "title": "越窑系青釉双系卣",
        "dynasty": "西晋",
        "culture": "越窑系",
        "era": "西晋 · 越窑系",
        "dimensions": "高23.7厘米，口径11.7-10.6厘米，底径16.4厘米",
        "description": "青釉双系卣，高23.7厘米，口径11.7-10.6厘米，底径16.4厘米。 卣直口，短颈，平肩，垂腹，腹下饱满，圈足外撇，通体呈扁圆形状。卣的肩部前后两面各贴塑兽首，其下各立一系。肩左右两边分别塑有龙首系，龙鼻下卷构成圆环。两对系大小相间，形成稳重平衡之美。施青釉，釉面匀净，微黄。外壁上部印纹饰4组：中间为4行菱形模印纹饰一周，其上下分别戳印圈点纹，最下方由一周山形纹托起上部图案。器壁的菱形纹饰与圈足外壁上模印的3行菱形图案相对应。 此器为西晋时期所制，属于南方青瓷越窑系，其整体纹饰规整，和谐古朴，上下呼应。此卣仿青铜器提梁卣烧造，卣上面的龙首系具有悬挂提梁的作用，因此又被称作提梁卣。",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-226828-01.jpg",
            "alt": "越窑系青釉双系卣（西晋 · 越窑系）图01",
            "card": "/assets/ciku/yanseyou/dpm-226828-01-card.jpg"
          }
        ],
        "dpmId": "226828",
        "source": "https://www.dpm.org.cn/collection/ceramic/226828.html"
      },
      {
        "id": "dpm-226768",
        "title": "青釉戳印圆圈纹人骑辟邪",
        "dynasty": "西晋",
        "culture": "",
        "era": "西晋",
        "dimensions": "高27.7厘米",
        "description": "青釉戳印圆圈纹人骑辟邪，西晋，高27.7厘米。 骑辟邪人头戴高帽，目视前方，骑于伏卧的狮形辟邪背上。人脸上暗刻络腮胡须，人、辟邪身上均戳印圆圈纹。骑兽人所戴高帽中空，辟邪龇牙咧嘴、怒目圆睁。通体施青釉。此烛台是西晋时期浙江地区越窑制品，造型新颖，物像刻画生动，堪称西晋青瓷中较为少见的精品。 辟邪系中国古代传说中的一种神兽，似狮而带翼。《急就篇》曰：“射鬾、辟邪除群凶。”唐代颜师古注曰：“射鬾、辟邪皆神兽名……辟邪，言能辟御妖邪也。”可见辟邪之意是驱走邪秽、祓除不祥。烛台做成辟邪形，倾注的就是古人的此种用意。",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-226768-01.jpg",
            "alt": "青釉戳印圆圈纹人骑辟邪（西晋）图01",
            "card": "/assets/ciku/yanseyou/dpm-226768-01-card.jpg"
          }
        ],
        "dpmId": "226768",
        "source": "https://www.dpm.org.cn/collection/ceramic/226768.html"
      },
      {
        "id": "dpm-227479",
        "title": "青釉圆槅",
        "dynasty": "东晋",
        "culture": "",
        "era": "东晋",
        "dimensions": "高4.5cm 口径21.1cm 底径22.6cm",
        "description": "青釉圆槅，东晋，高4.5厘米，口径21.1厘米，底径22.6厘米。 槅（gé音格）呈圆形，直口，平底。底有红色支烧痕。内分九格，其中中心三等分，外周六等分。通体施青釉。 槅也称“格子盘”、“果盒”等。江西南昌晋墓出土的一件长方形漆槅，底写“吴氏槅”，形状与三国两晋时的长方形瓷槅相同，因此而定名。瓷槅流行于三国、两晋及南北朝时期，时代特征明显。三国、两晋时期的槅多呈长方形，内分一大格八小格，初期是平底，稍后变为方圈足。东晋以后出现圆形槅，内圈三格，外圈七格。南朝以后，圆形槅内格数减少。",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-227479-01.jpg",
            "alt": "青釉圆槅（东晋）图01",
            "card": "/assets/ciku/yanseyou/dpm-227479-01-card.jpg"
          },
          {
            "src": "/assets/ciku/yanseyou/dpm-227479-02.jpg",
            "alt": "青釉圆槅（东晋）图02",
            "card": "/assets/ciku/yanseyou/dpm-227479-02-card.jpg"
          }
        ],
        "dpmId": "227479",
        "source": "https://www.dpm.org.cn/collection/ceramic/227479.html"
      },
      {
        "id": "dpm-227433",
        "title": "青釉唾壶",
        "dynasty": "东晋",
        "culture": "",
        "era": "东晋",
        "dimensions": "高14cm 口径10cm 底径8.5cm",
        "description": "青釉唾壶，东晋，高14厘米，口径10厘米，底径8.5厘米。 唾壶洗口，短颈，垂腹，平底。里外满施青釉，底有支烧痕。 唾壶又称“唾盂”、“渣斗”、“唾器”，为古代贵族宴饮时盛放唾弃鱼骨或兽骨的容器。安徽阜阳双古堆西汉汝阴侯墓所出漆唾器的底部署“女阴侯唾器六年女阴库訢工延造”等铭文。瓷质唾壶始自东汉，三国、两晋时颇为流行。三国至西晋时的造型多为撇口、扁腹、高圈足。东晋时则渐成盘口、垂肩、圆腹、平底或假圈足。",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-227433-01.jpg",
            "alt": "青釉唾壶（东晋）图01",
            "card": "/assets/ciku/yanseyou/dpm-227433-01-card.jpg"
          },
          {
            "src": "/assets/ciku/yanseyou/dpm-227433-02.jpg",
            "alt": "青釉唾壶（东晋）图02",
            "card": "/assets/ciku/yanseyou/dpm-227433-02-card.jpg"
          }
        ],
        "dpmId": "227433",
        "source": "https://www.dpm.org.cn/collection/ceramic/227433.html"
      },
      {
        "id": "dpm-227428",
        "title": "青釉褐斑四系壶",
        "dynasty": "东晋",
        "culture": "",
        "era": "东晋",
        "dimensions": "高17.9cm 口径8.4cm 底径8.7cm",
        "description": "青釉褐斑四系壶，东晋，高17.9厘米，口径8.4厘米，底径8.7厘米。 壶盘口，细颈，溜肩，肩上置四系，圆腹，平底。肩部刻划数道弦纹。通体施青釉，盘口和肩部涂点褐色斑纹。此器堪称东晋青釉褐斑瓷器中的典型器。 西晋晚期开始出现青瓷上涂点褐斑的装饰手法，至东晋时大为流行。它是使用一种含铁较多的“紫金土”点彩在青釉上，，然后烧制而成，属于一次烧成的低温釉上彩。这些褐斑排列或随意，或有一定的规律，为单调的青釉增加了色彩，具有较好的装饰效果。",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-227428-01.jpg",
            "alt": "青釉褐斑四系壶（东晋）图01",
            "card": "/assets/ciku/yanseyou/dpm-227428-01-card.jpg"
          },
          {
            "src": "/assets/ciku/yanseyou/dpm-227428-02.jpg",
            "alt": "青釉褐斑四系壶（东晋）图02",
            "card": "/assets/ciku/yanseyou/dpm-227428-02-card.jpg"
          }
        ],
        "dpmId": "227428",
        "source": "https://www.dpm.org.cn/collection/ceramic/227428.html"
      },
      {
        "id": "dpm-227427",
        "title": "青釉鸡头壶（其三）",
        "dynasty": "东晋",
        "culture": "",
        "era": "东晋",
        "dimensions": "高20.5cm 口径7cm 底径12.7cm",
        "description": "青釉鸡头壶，东晋，高20.5厘米，口径7厘米，底径12.7厘米。 壶洗口、细颈、丰肩、鼓腹、平底微内凹。肩部一侧置鸡头形流，流口与腹部相通，另一侧置曲柄。与流、柄呈十字交叉的肩部对称置桥形系，桥形系处刻划一道弦纹围绕壶肩。通体施青釉。 鸡头壶是三国至隋代瓷器中常见的造型，但各时期的鸡头壶均具有特点。总的来说，随着时代的演进，鸡头壶的形体是从矮胖向瘦高发展。与三国、西晋鸡头壶相比，东晋鸡头壶上鸡头的口部由三国、西晋时期的尖嘴变成圆孔形，鸡头也由三国、西晋时期紧贴壶肩而变为颈部立起。三国、西晋鸡头壶上紧贴壶肩的鸡尾在东晋鸡头壶上变为曲柄。在装饰上，三国、西晋时期流行的在壶上模印纹饰的做法已…",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-227427-01.jpg",
            "alt": "青釉鸡头壶（其三）（东晋）图01",
            "card": "/assets/ciku/yanseyou/dpm-227427-01-card.jpg"
          },
          {
            "src": "/assets/ciku/yanseyou/dpm-227427-02.jpg",
            "alt": "青釉鸡头壶（其三）（东晋）图02",
            "card": "/assets/ciku/yanseyou/dpm-227427-02-card.jpg"
          }
        ],
        "dpmId": "227427",
        "source": "https://www.dpm.org.cn/collection/ceramic/227427.html"
      },
      {
        "id": "dpm-227200",
        "title": "德清窑黑釉鸡头壶（其一）",
        "dynasty": "东晋",
        "culture": "德清窑",
        "era": "东晋 · 德清窑",
        "dimensions": "高18cm，口径7.9cm，底径10cm",
        "description": "德清窑黑釉鸡头壶，东晋，高18厘米，口径7.9厘米，底径10厘米。 壶盘口，短颈，溜肩，鼓腹。肩部一侧饰鸡头形流，流内有孔与壶身相通，流嘴呈筒状，鸡冠高耸，双目圆睁。与鸡首相对的一侧饰一弯形圆柄，上下分别与口沿、肩部相接，便于握持。肩部另外两侧各饰一桥形系，可穿绳提携。壶施黑釉，釉层丰厚，釉面滋润透澈，色黑如漆，匀净无瑕。外壁施釉不到底，近足处露出褐色的胎体。底部无釉，有五个较大的支钉烧痕。 此器制作端正，各部位比例协调，尤其是以鸡首装饰壶体，给人一种视觉上的美感。 鸡头壶是南北方早期瓷器的主要造型之一。始见于三国末年，流行于两晋至隋，因壶肩部塑鸡头而得名。烧制的瓷窑有越窑、瓯窑、福…",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-227200-01.jpg",
            "alt": "德清窑黑釉鸡头壶（其一）（东晋 · 德清窑）图01",
            "card": "/assets/ciku/yanseyou/dpm-227200-01-card.jpg"
          },
          {
            "src": "/assets/ciku/yanseyou/dpm-227200-02.jpg",
            "alt": "德清窑黑釉鸡头壶（其一）（东晋 · 德清窑）图02",
            "card": "/assets/ciku/yanseyou/dpm-227200-02-card.jpg"
          }
        ],
        "dpmId": "227200",
        "source": "https://www.dpm.org.cn/collection/ceramic/227200.html"
      },
      {
        "id": "dpm-227056",
        "title": "德清窑黑釉唾壶",
        "dynasty": "东晋",
        "culture": "德清窑",
        "era": "东晋 · 德清窑",
        "dimensions": "高9.9厘米，口径8.9厘米，底径9.4厘米",
        "description": "德清窑黑釉唾壶，东晋，高9.9厘米，口径8.9厘米，底径9.4厘米。 唾壶盘口，束颈，扁圆腹，平底略上凹。外壁施黑釉，釉不及底。因釉层在高温熔融状态下产生垂流，致使器物下部积釉处釉层较厚，堆积欲滴。釉面滋润，开有片纹。 唾壶亦称唾器，属于卫生洁具。安徽阜阳双古堆西汉汝阴侯墓曾出土署“女阴侯唾器”铭的漆唾器。瓷质唾壶始见于东汉，三国、两晋时开始流行。东晋时期以青釉唾壶较为多见，黑釉唾壶少见。东晋时期烧黑釉瓷的瓷窑以浙江德清窑最为著名，经科学化验其黑釉中三氧化二铁含量达8％左右，故烧成后，釉面产生色黑如漆的效果。从这件唾壶的胎釉特征看，亦应属于德清窑制品。",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-227056-01.jpg",
            "alt": "德清窑黑釉唾壶（东晋 · 德清窑）图01",
            "card": "/assets/ciku/yanseyou/dpm-227056-01-card.jpg"
          }
        ],
        "dpmId": "227056",
        "source": "https://www.dpm.org.cn/collection/ceramic/227056.html"
      },
      {
        "id": "dpm-226826",
        "title": "越窑系青釉龟形砚滴",
        "dynasty": "东晋",
        "culture": "越窑系",
        "era": "东晋 · 越窑系",
        "dimensions": "高5.8厘米，口径2.4厘米，腹径4.9-4.7厘米",
        "description": "青釉龟形砚滴，高5.8厘米，口径2.4厘米，腹径4.9-4.7厘米。 砚滴为乌龟形状，龟首昂起，颈部刻划螺旋纹。龟背前小后大，有圆形的小直口可以盛水，龟腹平坦，刻划十瓣莲花装饰，通体施青釉不到底。 这件砚滴为东晋时期所制，属于南方青瓷越窑系，造型生动，工艺精湛，不失为一件精美的古代文房用具。",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-226826-01.jpg",
            "alt": "越窑系青釉龟形砚滴（东晋 · 越窑系）图01",
            "card": "/assets/ciku/yanseyou/dpm-226826-01-card.jpg"
          }
        ],
        "dpmId": "226826",
        "source": "https://www.dpm.org.cn/collection/ceramic/226826.html"
      },
      {
        "id": "dpm-226825",
        "title": "德清窑黑釉鸡头壶（其二）",
        "dynasty": "东晋",
        "culture": "德清窑",
        "era": "东晋 · 德清窑",
        "dimensions": "高17厘米，口径7厘米，底径9.3厘米",
        "description": "德清窑黑釉鸡头壶，高17厘米，口径7厘米，底径9.3厘米。 壶洗口，细颈，圆腹，平底。肩部一侧雕塑一凸起的鸡头形流，相对一侧饰安一曲柄，柄连于肩、口之间，另外两侧各饰一桥形系。壶身里外施釉，外壁釉不到底。釉色黑如漆。 此壶为东晋时期所制，器形完整，风格古朴，釉色莹润匀净，是不可多得的德清窑上品。",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-226825-01.jpg",
            "alt": "德清窑黑釉鸡头壶（其二）（东晋 · 德清窑）图01",
            "card": "/assets/ciku/yanseyou/dpm-226825-01-card.jpg"
          }
        ],
        "dpmId": "226825",
        "source": "https://www.dpm.org.cn/collection/ceramic/226825.html"
      },
      {
        "id": "dpm-227661",
        "title": "青釉六系盖罐",
        "dynasty": "南朝",
        "culture": "",
        "era": "南朝",
        "dimensions": "口径21.9厘米，底径14.5厘米",
        "description": "青釉六系盖罐，南朝，口径21.9厘米，底径14.5厘米。 罐盖直壁弧顶，盖顶置一方形纽，罐身直口，溜肩，弧腹，近底处渐收，通体施灰白色釉，器身流釉，肩部两道弦纹处设有两个横形系和四道竖形系。 在罐壶一类的器皿上用双系或四系，以点、斜线、或直线做装饰，以便取得于协调的效果，是这南朝一时期器物的普遍用法。",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-227661-01.jpg",
            "alt": "青釉六系盖罐（南朝）图01",
            "card": "/assets/ciku/yanseyou/dpm-227661-01-card.jpg"
          }
        ],
        "dpmId": "227661",
        "source": "https://www.dpm.org.cn/collection/ceramic/227661.html"
      },
      {
        "id": "dpm-227660",
        "title": "青釉弦纹带托三足灯",
        "dynasty": "南朝",
        "culture": "",
        "era": "南朝",
        "dimensions": "口径9.8厘米，底径15厘米，高9厘米",
        "description": "青釉弦纹带托三足灯，南朝，口径9.8厘米，底径15厘米，高9厘米。 灯由灯碗、盘形底座两部分组成。上部灯碗敞口，圆唇，直壁，内置矮柱形烛插口，底承三撇足，承柱中空，下粗上细。足下有敞口盘状托，托盘作宽沿，腹壁斜收，内底平坦。灯碗外壁中上部刻画两道弦纹。浅灰黄胎，胎质较粗，通体施青黄釉，釉层光亮，釉面有密集小开片，盘托外壁口沿流釉不到底，。 在六朝的灯盏中，南北朝的制品已不再采用三国两晋时期那种复杂的雕塑形式，而趋向简略实用，此器具有朴素实用的特点。",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-227660-01.jpg",
            "alt": "青釉弦纹带托三足灯（南朝）图01",
            "card": "/assets/ciku/yanseyou/dpm-227660-01-card.jpg"
          }
        ],
        "dpmId": "227660",
        "source": "https://www.dpm.org.cn/collection/ceramic/227660.html"
      },
      {
        "id": "dpm-227443",
        "title": "青釉六系盘口瓶",
        "dynasty": "南朝",
        "culture": "",
        "era": "南朝",
        "dimensions": "高39.4cm 口径14.7cm 底径11.7cm",
        "description": "青釉六系盘口瓶，南朝，高39.4厘米，口径14.7厘米，底径11.7厘米。 瓶盘口，长颈，溜肩，圆腹，平底。肩部十字对称分布一组单系和一组双系。内外施青釉，釉不到底，釉色青中泛黄。 南朝时，青釉瓷器的造型更趋于实用。此器较东晋时盘口瓶的盘口加大，颈亦增高，腹部变得更加修长，其各部位的比例协调，形体线条过度柔和，造型优美。其重心较低，放置平稳，使用时比较省力。",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-227443-01.jpg",
            "alt": "青釉六系盘口瓶（南朝）图01",
            "card": "/assets/ciku/yanseyou/dpm-227443-01-card.jpg"
          },
          {
            "src": "/assets/ciku/yanseyou/dpm-227443-02.jpg",
            "alt": "青釉六系盘口瓶（南朝）图02",
            "card": "/assets/ciku/yanseyou/dpm-227443-02-card.jpg"
          }
        ],
        "dpmId": "227443",
        "source": "https://www.dpm.org.cn/collection/ceramic/227443.html"
      },
      {
        "id": "dpm-227435",
        "title": "青釉鸡头龙柄壶",
        "dynasty": "南朝",
        "culture": "",
        "era": "南朝",
        "dimensions": "高34.4cm 口径10.5cm 底径13.5cm",
        "description": "青釉鸡头龙柄壶，南朝，高34.4厘米，口径10.5厘米，底径13.5厘米。 壶洗口，细颈，丰肩，鼓腹下敛，平底。外底有支烧痕。肩部一侧置鸡头形流，相对一侧的口、肩之间置龙形柄。肩部另两侧对称置桥形系。通体施青釉，有流釉现象，釉面开细碎纹片。 此器舒展修长的形体，配置挺胸昂首的鸡头流与引颈伏首的龙柄，一展南朝鸡头壶秀丽、生动的风韵。是一件南朝风格较明显的青瓷器。 鸡头壶上出现龙首柄始于东晋中晚期，有的还在柄的上端饰熊纹。南朝时，鸡头壶由浑圆变为瘦长，鸡颈加高，鸡冠高耸，龙首曲柄加长。",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-227435-01.jpg",
            "alt": "青釉鸡头龙柄壶（南朝）图01",
            "card": "/assets/ciku/yanseyou/dpm-227435-01-card.jpg"
          },
          {
            "src": "/assets/ciku/yanseyou/dpm-227435-02.jpg",
            "alt": "青釉鸡头龙柄壶（南朝）图02",
            "card": "/assets/ciku/yanseyou/dpm-227435-02-card.jpg"
          }
        ],
        "dpmId": "227435",
        "source": "https://www.dpm.org.cn/collection/ceramic/227435.html"
      },
      {
        "id": "dpm-226858",
        "title": "青釉鸡头壶（其四）",
        "dynasty": "南朝",
        "culture": "",
        "era": "南朝",
        "dimensions": "高24.4厘米，口径8.8厘米，底径10.7厘米",
        "description": "青釉鸡头壶，高24.4厘米，口径8.8厘米，底径10.7厘米。 壶洗口，长颈，丰肩，直腹下敛，平底，底有支烧痕。肩部一侧雕塑鸡首流，相对一侧为一弧柄，另外两侧各饰一桥形系。肩部刻弦纹两周，并刻双层覆莲瓣纹。器通体施青釉，外壁施釉不到底，有垂釉现象，釉色青黄，有细小的开片。 南朝时期的鸡头壶与两晋时期相比造型变得高大，肩部由溜肩演变成为丰肩，直腹。南北朝时期北方制瓷业的兴起受到了南方制瓷业一定的影响，以鸡头作流的壶在北方也开始出现。这件以莲花瓣纹作装饰的鸡头壶表现出南北青瓷相融合的时代特征。",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-226858-01.jpg",
            "alt": "青釉鸡头壶（其四）（南朝）图01",
            "card": "/assets/ciku/yanseyou/dpm-226858-01-card.jpg"
          }
        ],
        "dpmId": "226858",
        "source": "https://www.dpm.org.cn/collection/ceramic/226858.html"
      },
      {
        "id": "dpm-227444",
        "title": "铅褐釉印花人物纹扁瓶",
        "dynasty": "北朝",
        "culture": "",
        "era": "北朝",
        "dimensions": "高12.2cm 口径3.1cm 足径4.9cm",
        "description": "铅褐釉印花人物纹扁瓶，北朝，高12.2厘米，口径3.1厘米，足径4.9厘米。 瓶呈扁圆形，上窄下宽，略似杏核。敞口，短颈，假圈足。通体施褐绿色低温铅釉，釉层光亮。肩部对称置圆形鼻纽，以便穿绳携带。颈与肩相接部分有一周联珠纹。腹部两面均模印5人一组的胡腾乐舞图案。中央一人于莲座上翩翩起舞，右二人一吹奏横笛，一人打拍。左二人，一执琵琶弹奏，一人双手击钹。五人均深目高鼻，身穿窄袖长衫，腰间系带，脚蹬长靴，是当时西域人的形象。 北朝时我国与中亚、西域诸国往来较多，关系比较密切，因此，西域的一些装饰图案如联珠纹、忍冬纹等就出现在瓷器上，成为一种常见的纹饰，西域人物也成为瓷器的装饰题材,这些都反映…",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-227444-01.jpg",
            "alt": "铅褐釉印花人物纹扁瓶（北朝）图01",
            "card": "/assets/ciku/yanseyou/dpm-227444-01-card.jpg"
          },
          {
            "src": "/assets/ciku/yanseyou/dpm-227444-02.jpg",
            "alt": "铅褐釉印花人物纹扁瓶（北朝）图02",
            "card": "/assets/ciku/yanseyou/dpm-227444-02-card.jpg"
          }
        ],
        "dpmId": "227444",
        "source": "https://www.dpm.org.cn/collection/ceramic/227444.html"
      },
      {
        "id": "dpm-227434",
        "title": "青釉莲花尊（其一）",
        "dynasty": "北朝",
        "culture": "",
        "era": "北朝",
        "dimensions": "高67cm 口径19cm 足径20cm",
        "description": "青釉莲花尊，北朝，高67厘米，口径19厘米，足径20厘米。 尊侈口，束颈，腹部硕大，腹下渐收，圈足外撇。釉色青绿。周身遍布纹饰，以莲花为主题。从口部到颈部的纹饰以弦纹分隔为三层，最上一层贴印6个不同姿态的飞天，中间一层饰宝相花纹，下层贴印团龙图案。颈肩部饰6个条形系。腹部装饰上覆下仰的莲瓣，上部覆莲分为三层，层层叠压，依次延伸，其中第三层莲花瓣尖向外翘起，第二层与第三层莲瓣之间贴印菩提叶一周。下部仰莲分为两层，莲瓣丰满肥硕。足部也堆塑覆莲瓣两层。 这是1948年河北景县北魏封氏墓群出土的四件青釉仰覆莲花尊之一。形体高大，气魄雄伟。它综合了雕刻、刻划、模印贴花等装饰方法，特别是腹部，采用…",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-227434-01.jpg",
            "alt": "青釉莲花尊（其一）（北朝）图01",
            "card": "/assets/ciku/yanseyou/dpm-227434-01-card.jpg"
          },
          {
            "src": "/assets/ciku/yanseyou/dpm-227434-02.jpg",
            "alt": "青釉莲花尊（其一）（北朝）图02",
            "card": "/assets/ciku/yanseyou/dpm-227434-02-card.jpg"
          }
        ],
        "dpmId": "227434",
        "source": "https://www.dpm.org.cn/collection/ceramic/227434.html"
      },
      {
        "id": "dpm-226793",
        "title": "青釉刻划忍冬纹单柄壶",
        "dynasty": "北朝",
        "culture": "",
        "era": "北朝",
        "dimensions": "高21.3厘米口径11厘米足径12厘米",
        "description": "青釉刻划忍冬纹单柄壶，北朝，高21.3厘米口径11厘米足径12厘米 壶口出沿、短颈、溜肩、鼓腹，底下承以饼形实足。肩部两侧对称置竖系，另一侧置管状短流，与流相对一侧置一弯曲手柄。形体饱满、浑圆。胎体厚重，呈灰白色。壶内外均施釉，釉色青绿，釉层透明，釉的玻璃质感较强，釉面开细碎片纹。 壶通体刻划花装饰，纹饰共分3层，肩部及腹下部分别为仰、覆莲瓣纹，仰、覆莲瓣纹之间为忍冬纹，纹饰之间以弦纹相隔。图案层次清晰，装饰技法娴熟。 佛教自东汉传入中国以后，至南北朝时期趋于兴盛，反映在瓷器装饰方面，这一时期瓷器上非常流行莲花、莲瓣、忍冬等纹饰，时代特征鲜明。 此器物由故宫博物院研究员，近代享誉世…",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-226793-01.jpg",
            "alt": "青釉刻划忍冬纹单柄壶（北朝）图01",
            "card": "/assets/ciku/yanseyou/dpm-226793-01-card.jpg"
          }
        ],
        "dpmId": "226793",
        "source": "https://www.dpm.org.cn/collection/ceramic/226793.html"
      },
      {
        "id": "dpm-226778",
        "title": "青釉莲花尊（其二）",
        "dynasty": "北朝",
        "culture": "",
        "era": "北朝",
        "dimensions": "高67厘米，口径19厘米，足径20厘米",
        "description": "青釉莲花尊，高67厘米，口径19厘米，足径20厘米。 尊撇口、长颈、鼓腹、高足中空外撇。肩、颈相接处置6个由双股泥条做成的竖系。通体纹饰达11层：颈部3层，自上而下依次为塑贴的飞天、宝相花及团龙纹，纹饰之间以凸弦纹相隔；肩、腹部以塑贴加雕刻技法装饰主题纹饰，由3层覆莲瓣、2层仰莲瓣、1层菩提树叶组合而成，莲瓣肥硕，瓣尖翘起；胫部雕刻2层覆莲瓣纹，瓣尖亦翘起。通体施青绿色釉，釉的玻璃质感较强，釉层开片。圈足内素胎无釉。 此尊为1948年河北景县封氏、祖氏墓群出土的四件莲花尊之一。其形体高大，气魄雄伟，集塑贴、模印、雕刻等多种装饰技法于一体，纹饰华缛精美，令人叹为观止。尊上的莲瓣、团花、飞…",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-226778-01.jpg",
            "alt": "青釉莲花尊（其二）（北朝）图01",
            "card": "/assets/ciku/yanseyou/dpm-226778-01-card.jpg"
          }
        ],
        "dpmId": "226778",
        "source": "https://www.dpm.org.cn/collection/ceramic/226778.html"
      },
      {
        "id": "dpm-226731",
        "title": "铅黄釉绿彩莲瓣纹罐",
        "dynasty": "北朝",
        "culture": "",
        "era": "北朝",
        "dimensions": "高23.5cm，口径7.7cm，足径8.4cm",
        "description": "铅黄釉绿彩莲瓣纹罐，北朝，高23.5厘米，口径7.7厘米，足径8.4厘米。 罐直口，短颈、溜肩，肩部有四弓形系，腹下渐收敛，实足，底略内凹。口部及下腹部各刻弦纹一周，肩部刻弦纹数道，四系之下刻忍冬纹一周，腹部刻下覆莲瓣纹。器身上半部施黄色透明釉，又于八等分处各施绿彩一道，下部露胎。 此罐胎质洁白，造型工整，釉色突破了单一色彩，更富装饰性，为丰富多彩的唐三彩工艺开创了先河。忍冬纹与莲瓣纹组合是佛教艺术的装饰题材。此罐有确切年代可考，其造型和纹饰对研究北齐时期的宗教观念及艺术等均有重要意义。 此罐1958年出土于河南省濮阳李云墓。李云为北齐车骑将军。据出土墓志记载，该墓为李云夫妇合葬墓…",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-226731-01.jpg",
            "alt": "铅黄釉绿彩莲瓣纹罐（北朝）图01",
            "card": "/assets/ciku/yanseyou/dpm-226731-01-card.jpg"
          },
          {
            "src": "/assets/ciku/yanseyou/dpm-226731-02.jpg",
            "alt": "铅黄釉绿彩莲瓣纹罐（北朝）图02",
            "card": "/assets/ciku/yanseyou/dpm-226731-02-card.jpg"
          }
        ],
        "dpmId": "226731",
        "source": "https://www.dpm.org.cn/collection/ceramic/226731.html"
      },
      {
        "id": "dpm-227456",
        "title": "青釉模印塑贴四系罐",
        "dynasty": "隋",
        "culture": "",
        "era": "隋",
        "dimensions": "高17.7cm 口径9.6cm 底径9cm",
        "description": "青釉模印塑贴四系罐，隋，高17.7厘米，口径9.6厘米，底径9厘米。 罐直口，圆唇，短颈，圆鼓腹，平底微外撇。肩部对称置四个双股泥条制成的系，四系之间塑贴团花纹样。其下饰凸起的弦纹。腹上部塑贴团花、草叶、团龙、兽面等间隔排列的四种纹样。其下饰一条凸起的弦纹，将罐身等分为两部分。灰白色胎，胎体厚重结实。器内满釉，器外施釉不到底，罐下部有泪痕状釉垂至器足。釉色淡青泛黄，积釉处呈青褐色。釉的玻璃质感较强，釉面有细小开片。 此罐采用模印贴花技法装饰，即用模子先印好浮雕状的纹饰，再用胎浆水粘贴于未上釉的坯体上，然后施釉入窑烧成。纹饰具有很强的立体效果，犹如浅浮雕，这种装饰工艺在隋瓷中极为少见。从…",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-227456-01.jpg",
            "alt": "青釉模印塑贴四系罐（隋）图01",
            "card": "/assets/ciku/yanseyou/dpm-227456-01-card.jpg"
          },
          {
            "src": "/assets/ciku/yanseyou/dpm-227456-02.jpg",
            "alt": "青釉模印塑贴四系罐（隋）图02",
            "card": "/assets/ciku/yanseyou/dpm-227456-02-card.jpg"
          }
        ],
        "dpmId": "227456",
        "source": "https://www.dpm.org.cn/collection/ceramic/227456.html"
      },
      {
        "id": "dpm-227446",
        "title": "青釉盘口瓶",
        "dynasty": "隋",
        "culture": "",
        "era": "隋",
        "dimensions": "高32.5cm 口径6.6cm 足径9.2cm",
        "description": "青釉盘口瓶，隋，高32.5厘米，口径6.6厘米，足径9.2厘米。 瓶盘口，短颈，溜肩，长圆腹，圈足。瓶身施半截青绿釉，釉层透明，釉面有细碎开片，釉向下垂流，形成一种特殊的自然装饰效果。 从此瓶的造型、胎质与釉色上看，都具有隋代青瓷的典型风格。 青瓷是隋代瓷器生产的主要产品，一般胎质较为细腻，瓷化程度良好。在器形方面，基本上继承了南北朝造型，但又有所变化，并创造了一些新的器形。常见器物有盘口壶、鸡头壶、瓶、高足盘、带系罐、碗、尊、灯和烛台等日常生活用具。盘口瓶由北朝时洗口瓶演变而来，特征为盘口，短颈，平底。与北朝的洗口瓶相比，主要变化是颈变细长，腹径阔大，略呈椭圆形，且有单体双体之分。",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-227446-01.jpg",
            "alt": "青釉盘口瓶（隋）图01",
            "card": "/assets/ciku/yanseyou/dpm-227446-01-card.jpg"
          },
          {
            "src": "/assets/ciku/yanseyou/dpm-227446-02.jpg",
            "alt": "青釉盘口瓶（隋）图02",
            "card": "/assets/ciku/yanseyou/dpm-227446-02-card.jpg"
          }
        ],
        "dpmId": "227446",
        "source": "https://www.dpm.org.cn/collection/ceramic/227446.html"
      },
      {
        "id": "dpm-227445",
        "title": "白釉高足杯",
        "dynasty": "隋",
        "culture": "",
        "era": "隋",
        "dimensions": "高10.2cm 口径5cm 足径4.4cm",
        "description": "白釉高足杯，隋，高10.2厘米，口径5厘米，足径4.4厘米。 杯敛口，鼓腹，高足外撇。里外满施白釉，足边无釉，釉面开细碎片纹。 这件白釉高足杯，造型新颖，釉质洁白细润，与北朝时的初期白瓷比较，已可看出是真正的白瓷了。 白瓷虽然在北朝时期已经开始出现，但真正烧制成功则在隋代。与北朝相比，隋代白釉瓷器的烧制工艺技术有了长足的进步。隋代白瓷的烧造成功，为唐代白釉瓷器的发展奠定了坚实的基础。",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-227445-01.jpg",
            "alt": "白釉高足杯（隋）图01",
            "card": "/assets/ciku/yanseyou/dpm-227445-01-card.jpg"
          }
        ],
        "dpmId": "227445",
        "source": "https://www.dpm.org.cn/collection/ceramic/227445.html"
      },
      {
        "id": "dpm-227112",
        "title": "青釉印花高足盘",
        "dynasty": "隋",
        "culture": "淮南窑",
        "era": "隋 · 淮南窑",
        "dimensions": "高12.5cm，口径27.5cm，足径14.5cm",
        "description": "青釉印花高足盘，隋，高12.5厘米，口径27.5厘米，足径14.5厘米。 盘为浅式，直口微外撇，盘心坦平刻划弦纹二周，有印花装饰，并有5个支钉痕，下承以空心喇叭状高足。内外施青釉，外壁仅施半截釉，足底露胎。 此件高足盘釉色偏黄，从其胎釉特征看，应属安徽淮南窑制品。 高足盘是南北方瓷窑普遍烧造的器物。从考古发掘资料看，高足盘最早见于北朝，北齐天统三年（567年）墓葬中即出土青釉高足盘。这种器物在隋代比较流行，隋代的绘画、壁画上都有所见。目前发现隋代烧造高足盘的瓷窑有河北的贾壁窑，河南的安阳窑、巩义窑，安徽的淮南窑，湖南的湘阴窑，四川的邛窑等。上述瓷窑主要烧造青釉高足盘，釉色淡青而透明…",
        "images": [
          {
            "src": "/assets/ciku/yanseyou/dpm-227112-01.jpg",
            "alt": "青釉印花高足盘（隋 · 淮南窑）图01",
            "card": "/assets/ciku/yanseyou/dpm-227112-01-card.jpg"
          },
          {
            "src": "/assets/ciku/yanseyou/dpm-227112-02.jpg",
            "alt": "青釉印花高足盘（隋 · 淮南窑）图02",
            "card": "/assets/ciku/yanseyou/dpm-227112-02-card.jpg"
          }
        ],
        "dpmId": "227112",
        "source": "https://www.dpm.org.cn/collection/ceramic/227112.html"
      }
    ]
  }
];
