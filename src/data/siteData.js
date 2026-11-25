export const MASTER = {
  name: 'Татьяна Малыгина',
  brandShort: 'TATIANA MALIGHINA',
  brandSubtitle: 'ПЕРМАНЕНТ И ЛАЗЕР · ЧАДЫР-ЛУНГА',
  role: 'Сертифицированный мастер перманентного макияжа и лазерного удаления',
  academy: 'Обучение Sviato Academy (Святослав Отченаш и Катрин Харута)',
  experience: '18 лет опыта',
  city: 'г. Чадыр-Лунга, Молдова',
  workspaceFormat: 'Кабинет мастера',
  addressNote: 'г. Чадыр-Лунга, ул. Карла Маркса, д. 8 («T studio») · [подтвердить актуальный адрес у клиентки]',
  hoursNote: 'По предварительной записи · [уточнить точные часы работы у клиентки]',
  promo: 'Скидка на 2 и 3 зоны',
  phoneDisplay: '+373 68 473 497',
  phoneLocal: '068473497',
  phoneDigits: '37368473497',
  whatsappUrl: 'https://wa.me/37368473497',
  telegramHandle: 'tatiana_malighina',
  telegramUrl: 'https://t.me/tatiana_malighina',
  instagramHandle: '@tatiana_malighina',
  instagramUrl: 'https://www.instagram.com/tatiana_malighina/',
  facebookNote: '[Уточнить ссылку на Facebook у клиентки]'
};

export const IMAGE_META = {
  'tatiana-smile': { w: 1152, h: 1440, pos: '50% 18%' },
  'tatiana-serene': { w: 1152, h: 1440, pos: '50% 22%' },
  'tatiana-blazer': { w: 964, h: 1440, pos: '50% 18%' },
  'tatiana-pigments': { w: 988, h: 1440, pos: '50% 28%' },
  'tatiana-studio-white': { w: 852, h: 1440, pos: '50% 22%' },
  'tatiana-avatar': { w: 1440, h: 1440, pos: '50% 25%' },
  'brows-kak-svoi': { w: 810, h: 1440, pos: '50% 42%' },
  'brows-lips': { w: 810, h: 1440, pos: '50% 44%' },
  'brows-magic-blonde': { w: 810, h: 1440, pos: '50% 28%' },
  'brows-healed': { w: 1155, h: 1440, pos: '50% 35%' },
  'brows-berry-lips': { w: 1152, h: 1440, pos: '50% 45%' },
  'brows-macro-horizontal': { w: 1440, h: 810, pos: '50% 45%' },
  'lips-aquarelle': { w: 1151, h: 1440, pos: '50% 50%' },
  'lips-coral': { w: 1440, h: 792, pos: '50% 50%' },
  'eyeliner-softliner': { w: 1152, h: 1440, pos: '50% 50%' },
  'eyeliner-interlash': { w: 1155, h: 1440, pos: '50% 50%' },
  'laser-ndyag': { w: 810, h: 1440, pos: '50% 24%' },
  'cheyenne-case': { w: 1440, h: 1433, pos: '50% 50%' },
  'cert-sviato': { w: 1152, h: 1440, pos: '50% 18%' },
  'cert-katrin': { w: 1332, h: 1440, pos: '50% 24%' }
};

export const PIGMENT_SWATCHES = [
  {
    id: 'espresso',
    name: 'Тёмный эспрессо',
    gradient: 'linear-gradient(135deg, #4f3630 0%, #2a1a16 100%)',
    zone: 'Брови · волосковая «Как свои»',
    description: 'Минеральные краски Елены Нечаевой: глубокий естественный тон, выцветает мягко без синевы.'
  },
  {
    id: 'chestnut',
    name: 'Тёплый каштан',
    gradient: 'linear-gradient(135deg, #865d4a 0%, #583a2c 100%)',
    zone: 'Брови · Magic Shading',
    description: 'Палитра BB Pigments / PODIUM: деликатная пудровая дымка без резких границ.'
  },
  {
    id: 'mineral-taupe',
    name: 'Русый минерал',
    gradient: 'linear-gradient(135deg, #a6846d 0%, #765945 100%)',
    zone: 'Брови · для блондинок и русых',
    description: 'Мягкий нейтрально-русый оттенок с плавным выходом в полупрозрачный остаток через 1,5–2 года.'
  },
  {
    id: 'dusty-rose',
    name: 'Пыльная роза',
    gradient: 'linear-gradient(135deg, #cb9193 0%, #9b6062 100%)',
    zone: 'Губы · Aquarelle Lips',
    description: 'Акварельный розовато-нюдовый тон строго по природному контуру губ.'
  },
  {
    id: 'berry-silk',
    name: 'Ягодный шёлк',
    gradient: 'linear-gradient(135deg, #a65261 0%, #6f2d39 100%)',
    zone: 'Губы · насыщенный заживший цвет',
    description: 'Выразительный ягодно-коралловый оттенок, который освежает лицо без помады.'
  },
  {
    id: 'graphite-lash',
    name: 'Мягкий графит',
    gradient: 'linear-gradient(135deg, #3c373c 0%, #171417 100%)',
    zone: 'Веки · Soft Liner и межресничка',
    description: 'Глубокий пигмент для межресничного пространства и стрелки с мягкой растушёвкой.'
  }
];

export const SERVICES = [
  {
    slug: 'brows-kak-svoi',
    index: '01',
    title: 'Брови в волосковой технике «Как свои»',
    shortTitle: 'Брови «Как свои»',
    tag: 'Флагманская услуга',
    description:
      'Аппаратная прорисовка каждого отдельного волоска по природному росту. Скрывает пробелы, шрамы и алопецию; выполняется минеральными красками Елены Нечаевой на аппарате Cheyenne — со временем просто мягко светлеет без синевы.',
    highlights: [
      'Естественная объёмная текстура вместо плотной полосы',
      'Минеральные краски Елены Нечаевой и аппарат Cheyenne',
      'Обязательная коррекция через 4–6 недель'
    ],
    price: 'Уточняется у мастера',
    duration: '[Уточнить длительность у клиентки]',
    image: 'brows-kak-svoi',
    imageAlt: 'Волосковая техника бровей «Как свои» в исполнении Татьяны Малыгиной',
    instagramUrl: 'https://www.instagram.com/tatiana_malighina/reel/DcRikj0oODg/',
    featured: true
  },
  {
    slug: 'brows-magic-shading',
    index: '02',
    title: 'Пудровые брови Magic Shading',
    shortTitle: 'Пудровые Magic Shading',
    tag: 'Техника Sviato Academy',
    description:
      'Деликатное послойное напыление с индивидуальной плотностью и мягким переходом оттенка без шаблонов. Носится 1,5–2 года (в зависимости от типа кожи и ухода) и равномерно сходит в полупрозрачный остаток.',
    highlights: [
      'Техника Sviato Academy под ваш тип кожи',
      'Пигменты BB Pigments, PODIUM Collection и краски Елены Нечаевой',
      'Мягкий заживший результат без «фломастерных» границ'
    ],
    price: 'Уточняется у мастера',
    duration: '[Уточнить длительность у клиентки]',
    image: 'brows-magic-blonde',
    imageAlt: 'Пудровые брови Magic Shading — работа Татьяны Малыгиной',
    instagramUrl: 'https://www.instagram.com/tatiana_malighina/reel/CosVYXFjJxz/',
    featured: false
  },
  {
    slug: 'lips',
    index: '03',
    title: 'Акварельные губы Aquarelle Lips',
    shortTitle: 'Акварельные губы',
    tag: 'Без выхода за контур',
    description:
      'Нежное акварельное заполнение или аккуратное перекрытие старого оттенка. Татьяна работает строго в пределах природного контура губ, чтобы сохранить естественную текстуру кожи вокруг рта; стойкость результата — 1,5–2 года.',
    highlights: [
      'Акварельная укладка пигмента без грубого контура',
      'Аппликационная анестезия для комфортного сеанса',
      'Действуют акции: скидка на 2 и 3 зоны'
    ],
    price: 'Уточняется у мастера',
    duration: '[Уточнить длительность у клиентки]',
    image: 'lips-aquarelle',
    imageAlt: 'Перманентный макияж губ Aquarelle Lips от Татьяны Малыгиной',
    instagramUrl: 'https://www.instagram.com/tatiana_malighina/p/Cn7e6l7tgR0/',
    featured: false
  },
  {
    slug: 'eyeliner',
    index: '04',
    title: 'Стрелки Soft Liner и межресничка',
    shortTitle: 'Стрелки Soft Liner',
    tag: 'Выразительный взгляд',
    description:
      'Межресничный контур или стрелка с мягкой дымчатой тенью Soft Liner. Небольшой отёк спадает за 1 день, заживление занимает 4–5 дней, после чего ширина линии визуально уменьшается примерно на 40%. Стойкость — 1,5–2 года.',
    highlights: [
      'Быстрое заживление за 4–5 дней',
      'Ощущается мягче, чем процедура на губах',
      'Чёткая памятка подготовки (без линз и наращённых ресниц)'
    ],
    price: 'Уточняется у мастера',
    duration: '[Уточнить длительность у клиентки]',
    image: 'eyeliner-softliner',
    imageAlt: 'Макро стрелки Soft Liner с мягкой растушёвкой — Татьяна Малыгина',
    instagramUrl: 'https://www.instagram.com/tatiana_malighina/p/CxF0G9ttKqk/',
    featured: false
  },
  {
    slug: 'laser-removal',
    index: '05',
    title: 'Лазерное удаление тату и татуажа Nd:YAG',
    shortTitle: 'Лазерное удаление Nd:YAG',
    tag: 'Однокристальный лазер',
    description:
      'Точечное удаление старого перманентного макияжа (брови, губы, веки) и татуировок на однокристальном лазере Nd:YAG с технологией Q-Switch. Разрушает пигмент без повреждения родных волосков и риска рубцов; выводится через лимфу за 4–6 недель.',
    highlights: [
      'Однокристальный лазер Nd:YAG Q-Switch',
      'Временный фростинг проходит через 15–30 минут',
      'Волоски бровей и кожа остаются целыми'
    ],
    price: 'Уточняется у мастера',
    duration: '[Уточнить длительность у клиентки]',
    image: 'laser-ndyag',
    imageAlt: 'Татьяна Малыгина за работой на однокристальном лазере Nd:YAG Q-Switch',
    instagramUrl: 'https://www.instagram.com/tatiana_malighina/reel/De7ZSnkILaX/',
    featured: false
  },
  {
    slug: 'correction',
    index: '06',
    title: 'Коррекция перманентного макияжа',
    shortTitle: 'Коррекция (4–6 недель)',
    tag: 'Закрепление оттенка',
    description:
      'Обязательный плановый визит через 4–6 недель после первичной процедуры для выравнивания остатка пигмента и точной доработки формы, а также бережное обновление цвета.',
    highlights: [
      'Проводится строго через 4–6 недель после заживления',
      'Фиксация оттенка и мягкости перехода',
      'Продлевает срок носки перманента до 1,5–2 лет'
    ],
    price: 'Уточняется у мастера',
    duration: '[Уточнить длительность у клиентки]',
    image: 'brows-lips',
    imageAlt: 'Перманентный макияж бровей и губ — результат работы Татьяны Малыгиной',
    instagramUrl: 'https://www.instagram.com/tatiana_malighina/reel/DLDdv_Str4a/',
    featured: false
  }
];

export const PACKAGES = [
  {
    slug: 'brows-kak-svoi',
    title: 'Перманент 1 зоны',
    badge: 'Индивидуально',
    price: 'Уточняется у мастера',
    note: 'Брови «Как свои» / Magic Shading, губы или веки на выбор',
    image: 'brows-kak-svoi',
    imageAlt: 'Волосковая техника бровей «Как свои»',
    features: [
      'Очная консультация и подбор пигмента',
      'Аппликационная анестезия перед процедурой',
      'Аппарат Cheyenne и сертифицированные краски',
      'Подробная памятка ухода на 1–7 дни'
    ],
    ctaLabel: 'Выбрать 1 зону',
    featured: false
  },
  {
    slug: 'two-zones',
    title: 'Комплекс «Две или три зоны»',
    badge: 'Выгода из профиля',
    price: 'Действует скидка',
    note: 'Подтверждённая акция: скидка на 2 и 3 зоны + бонус «приведи подругу»',
    image: 'brows-berry-lips',
    imageAlt: 'Комплексное преображение: пудровые брови и акварельные губы',
    features: [
      'Скидка при записи сразу на две зоны',
      'Дополнительная скидка на комплекс из трёх зон',
      'Единая цветовая гармония бровей, губ и век',
      'Скидка на любую зону по акции «приведи подругу»'
    ],
    ctaLabel: 'Оформить по акции',
    featured: true
  },
  {
    slug: 'laser-removal',
    title: 'Лазерное удаление Nd:YAG',
    badge: 'Однокристальный Q-Switch',
    price: 'Уточняется у мастера',
    note: 'Чистое осветление старого татуажа и татуировок без рубцов',
    image: 'laser-ndyag',
    imageAlt: 'Лазерное удаление тату и татуажа в кабинете Татьяны Малыгиной',
    features: [
      'Однокристальный лазер Nd:YAG Q-Switch',
      'Щадящее действие без повреждения волосков',
      'Естественное выведение пигмента за 4–6 недель',
      'Возможность последующего перекрытия в технике ПМ'
    ],
    ctaLabel: 'Записаться на лазер',
    featured: false
  }
];

export const PORTFOLIO_ITEMS = [
  {
    id: 'p1',
    category: 'brows',
    categoryLabel: 'Брови «Как свои»',
    title: 'Волосковая техника «Как свои»',
    caption: 'Приподнятый излом для открытого взгляда и воздушные волоски без плотной забивки.',
    image: 'brows-kak-svoi',
    alt: 'Брови в волосковой технике «Как свои» от Татьяны Малыгиной',
    instagramUrl: 'https://www.instagram.com/tatiana_malighina/reel/DcRikj0oODg/'
  },
  {
    id: 'p2',
    category: 'brows',
    categoryLabel: 'Брови + Губы',
    title: 'Гармония бровей и нежных губ',
    caption: 'Выверенная форма бровей и деликатный натуральный оттенок без перегруженности.',
    image: 'brows-lips',
    alt: 'Клиентка с аккуратными бровями и мягким перманентом губ',
    instagramUrl: 'https://www.instagram.com/tatiana_malighina/reel/DLDdv_Str4a/'
  },
  {
    id: 'p3',
    category: 'brows',
    categoryLabel: 'Magic Shading',
    title: 'Пудровые брови для блондинки',
    caption: 'Мягкий тёпло-русый оттенок в технике Magic Shading без рыжины и жёсткого контура.',
    image: 'brows-magic-blonde',
    alt: 'Клиентка с мягкими пудровыми бровями Magic Shading',
    instagramUrl: 'https://www.instagram.com/tatiana_malighina/reel/CosVYXFjJxz/'
  },
  {
    id: 'p4',
    category: 'brows',
    categoryLabel: 'Заживший результат',
    title: 'Зажившие пудровые брови',
    caption: 'Естественный остаток пигмента после заживления — мягкое обрамление взгляда.',
    image: 'brows-healed',
    alt: 'Улыбающаяся клиентка с зажившими бровями',
    instagramUrl: 'https://www.instagram.com/tatiana_malighina/p/CmznTUStYkj/'
  },
  {
    id: 'p5',
    category: 'brows',
    categoryLabel: 'Две зоны',
    title: 'Пудровые брови и ягодные губы',
    caption: 'Комплекс двух зон с чистым балансом тёплого шатена и сочного оттенка губ.',
    image: 'brows-berry-lips',
    alt: 'Клиентка после перманента бровей и ягодного оттенка губ',
    instagramUrl: 'https://www.instagram.com/tatiana_malighina/p/CmMxfAHtRCc/'
  },
  {
    id: 'p6',
    category: 'brows',
    categoryLabel: 'Архитектура Elan',
    title: 'Природный изгиб и укладка бровей',
    caption: 'Детальный макро-кадр оформленных бровей с сохранением каждого природного волоска.',
    image: 'brows-macro-horizontal',
    alt: 'Макро оформленной брови и зелёно-карих глаз',
    instagramUrl: 'https://www.instagram.com/tatiana_malighina/p/Cm3mXv1tgVz/'
  },
  {
    id: 'p7',
    category: 'lips',
    categoryLabel: 'Aquarelle Lips',
    title: 'Акварельные губы без выхода за контур',
    caption: 'Бархатный кораллово-розовый тон строго по естественной кромке губ.',
    image: 'lips-aquarelle',
    alt: 'Макро перманента губ Aquarelle Lips',
    instagramUrl: 'https://www.instagram.com/tatiana_malighina/p/Cn7e6l7tgR0/'
  },
  {
    id: 'p8',
    category: 'lips',
    categoryLabel: 'Губы',
    title: 'Нежный кораллово-розовый оттенок губ',
    caption: 'Сочный, но полупрозрачный цвет, выравнивающий тон губ после заживления.',
    image: 'lips-coral',
    alt: 'Горизонтальное макро нежных кораллово-розовых губ',
    instagramUrl: 'https://www.instagram.com/tatiana_malighina/reel/CmhiOm1ItuP/'
  },
  {
    id: 'p9',
    category: 'eyeliner',
    categoryLabel: 'Soft Liner',
    title: 'Стрелка с мягкой растушёвкой Soft Liner',
    caption: 'Симметричная дымчатая тень вдоль века — без отёка уже через 1 день.',
    image: 'eyeliner-softliner',
    alt: 'Макро двух глаз со стрелкой с мягкой растушёвкой Soft Liner',
    instagramUrl: 'https://www.instagram.com/tatiana_malighina/p/CxF0G9ttKqk/'
  },
  {
    id: 'p10',
    category: 'eyeliner',
    categoryLabel: 'Межресничка',
    title: 'Межресничный контур и пудровая бровь',
    caption: 'Аккуратное заполнение межресничного пространства делает ресницы визуально гуще.',
    image: 'eyeliner-interlash',
    alt: 'Макро межресничного контура и пудровой брови',
    instagramUrl: 'https://www.instagram.com/tatiana_malighina/p/CnFqTWQtBMp/'
  },
  {
    id: 'p11',
    category: 'laser',
    categoryLabel: 'Лазер Nd:YAG',
    title: 'Удаление старого перманента Nd:YAG Q-Switch',
    caption: 'Процедура в защитных очках на однокристальном лазере в кабинете Татьяны.',
    image: 'laser-ndyag',
    alt: 'Татьяна Малыгина проводит процедуру лазерного удаления Nd:YAG',
    instagramUrl: 'https://www.instagram.com/tatiana_malighina/reel/De7ZSnkILaX/'
  },
  {
    id: 'p12',
    category: 'process',
    categoryLabel: 'Оборудование',
    title: 'Немецкий аппарат Cheyenne Unlimited',
    caption: 'Точный ход иглы без лишней травматизации кожи для волосковой и акварельной техник.',
    image: 'cheyenne-case',
    alt: 'Кейс и аппарат Cheyenne для перманентного макияжа',
    instagramUrl: 'https://www.instagram.com/tatiana_malighina/reel/DaSI5CHIAM5/'
  }
];

export const REELS_ITEMS = [
  {
    id: 'reel-brows-kak-svoi',
    title: 'Волосковая «Как свои»',
    subtitle: 'Воздушные волоски без плотной маски',
    video: '/videos/reel-brows-kak-svoi.mp4',
    poster: '/images/brows-kak-svoi.jpg',
    url: 'https://www.instagram.com/tatiana_malighina/reel/DcRikj0oODg/',
    letterboxed: false
  },
  {
    id: 'reel-magic-shading',
    title: 'Пудровые Magic Shading',
    subtitle: 'Мягкий объём и плавный переход',
    video: '/videos/reel-magic-shading.mp4',
    poster: '/images/brows-magic-blonde.jpg',
    url: 'https://www.instagram.com/tatiana_malighina/reel/CosVYXFjJxz/',
    letterboxed: false
  },
  {
    id: 'reel-lips-coral',
    title: 'Акварельные губы',
    subtitle: 'Нежный кораллово-розовый тон',
    video: '/videos/reel-lips-coral.mp4',
    poster: '/images/lips-coral.jpg',
    url: 'https://www.instagram.com/tatiana_malighina/reel/CmhiOm1ItuP/',
    letterboxed: false
  },
  {
    id: 'reel-brows-lips',
    title: 'Брови и мягкие губы',
    subtitle: 'Комплексный естественный образ',
    video: '/videos/reel-brows-lips.mp4',
    poster: '/images/brows-lips.jpg',
    url: 'https://www.instagram.com/tatiana_malighina/reel/DLDdv_Str4a/',
    letterboxed: false
  },
  {
    id: 'reel-tatiana-pigments',
    title: 'Палитра пигментов',
    subtitle: 'Подбор минеральных красок под тон кожи',
    video: '/videos/reel-tatiana-pigments.mp4',
    poster: '/images/tatiana-pigments.jpg',
    url: 'https://www.instagram.com/tatiana_malighina/reel/C9A1wiBN9g5/',
    letterboxed: true
  },
  {
    id: 'reel-tatiana-studio',
    title: 'Мастер Татьяна Малыгина',
    subtitle: 'Опыт 18 лет · Чадыр-Лунга',
    video: '/videos/reel-tatiana-studio.mp4',
    poster: '/images/tatiana-blazer.jpg',
    url: 'https://www.instagram.com/tatiana_malighina/reel/CuNZzWEtGxj/',
    letterboxed: true
  },
  {
    id: 'reel-cheyenne',
    title: 'Аппарат Cheyenne',
    subtitle: 'Немецкая точность в работе с кожей',
    video: '/videos/reel-cheyenne.mp4',
    poster: '/images/cheyenne-case.jpg',
    url: 'https://www.instagram.com/tatiana_malighina/reel/DaSI5CHIAM5/',
    letterboxed: false
  }
];

export const TRUST_PILLARS = [
  {
    number: '01',
    title: '18 лет практики',
    text: 'Многолетний подтверждённый опыт и международные сертификаты Sviato Academy (Святослав Отченаш, Катрин Харута).'
  },
  {
    number: '02',
    title: 'Естественность без шаблонов',
    text: 'Волосковая техника «Как свои», пудровая Magic Shading и акварель строго по природному контуру.'
  },
  {
    number: '03',
    title: 'Cheyenne и Nd:YAG Q-Switch',
    text: 'Аппарат Cheyenne, минеральные краски Елены Нечаевой, BB Pigments и однокристальный лазер Nd:YAG.'
  },
  {
    number: '04',
    title: 'Бережное сопровождение',
    text: 'Аппликационная анестезия, чёткие правила ухода 1–7 дня, контроль заживления и коррекция через 4–6 недель.'
  }
];

export const PROCESS_STEPS = [
  {
    step: 'ШАГ 01',
    title: 'Заявка и консультация',
    description:
      'Вы выбираете услугу и ориентировочное время на сайте, после чего отправляете готовый текст заявки в WhatsApp или Telegram. Татьяна лично согласовывает дату и отвечает на вопросы.',
    image: 'tatiana-smile'
  },
  {
    step: 'ШАГ 02',
    title: 'Подбор формы и пигмента',
    description:
      'Перед сеансом рисуется индивидуальная архитектура без шаблонов и подбирается оттенок из минеральных или гибридных палитр под ваш тон кожи.',
    image: 'tatiana-pigments'
  },
  {
    step: 'ШАГ 03',
    title: 'Комфортная процедура',
    description:
      'При перманентном макияже используется аппликационная анестезия (при необходимости добавляется повторно); работа идёт на аппарате Cheyenne или лазере Nd:YAG.',
    image: 'tatiana-studio-white'
  },
  {
    step: 'ШАГ 04',
    title: 'Заживление 1–7 дней',
    description:
      'Первые 1–7 дней зону не мочим, исключаем сауну и спорт. При лазерном удалении фростинг сходит за 15–30 минут, а пигмент выводится через лимфу за 4–6 недель.',
    image: 'brows-healed'
  },
  {
    step: 'ШАГ 05',
    title: 'Коррекция через 4–6 недель',
    description:
      'На контрольном визите мастер оценивает заживший оттенок (стойкость ПМ 1,5–2 года) и дорабатывает мелкие детали для ровного результата.',
    image: 'brows-kak-svoi'
  }
];

export const PREP_CHECKLIST = [
  'За 1 день до процедуры исключить кофе, алкоголь, энергетики, газированные напитки и препараты с аспирином.',
  'На приём желательно приходить без декоративной косметики в зоне проведения процедуры.',
  'Перед перманентом век снять контактные линзы и наращённые ресницы; противопоказания — конъюнктивит и родинки в межресничном пространстве.',
  'Ламинирование ресниц можно делать за неделю до процедуры век, но нельзя в течение 1 месяца после неё.'
];

export const PUBLIC_REVIEWS = [
  {
    author: '@moscaliuc_olga',
    context: 'Комментарий под работой по перманенту бровей и век',
    quote: '«Спасибо за преображение!»',
    image: 'eyeliner-interlash',
    url: 'https://www.instagram.com/tatiana_malighina/p/CnFqTWQtBMp/'
  },
  {
    author: '@mariia.kioroglo',
    context: 'Комментарий под портретом мастера',
    quote: '«Потрясающе, Татьяна!»',
    image: 'tatiana-smile',
    url: 'https://www.instagram.com/tatiana_malighina/p/Cw_J4HNNFXk/'
  }
];

export const FAQ_ITEMS = [
  {
    question: 'Больно ли делать перманентный макияж?',
    answer:
      'Татьяна использует аппликационную анестезию и при дискомфорте добавляет её повторно. По ощущениям это лёгкое покалывание или царапанье; брови и веки обычно переносятся мягче, чем губы.'
  },
  {
    question: 'Сколько держится перманентный макияж и как он сходит?',
    answer:
      'В среднем 1,5–2 года в зависимости от возраста, типа кожи (на сухой держится дольше, на жирной быстрее), активности, загара и соблюдения ухода. Минеральные краски Елены Нечаевой и пигменты Sviato Academy светлеют мягко, без синего или серого оттенка.'
  },
  {
    question: 'Чем волосковая техника «Как свои» отличается от Magic Shading?',
    answer:
      'В технике «Как свои» мастер аппаратом прорисовывает каждый отдельный волосок по направлению роста (отлично маскирует пробелы и шрамы). Magic Shading создаёт воздушную пудровую тень с мягким переходом интенсивности.'
  },
  {
    question: 'Как ухаживать за зоной в первые 1–7 дней?',
    answer:
      'Первые 1–7 дней зону не мочат, не трогают руками и не сдирают корочки, наносят тонкий слой рекомендованного крема 1–2 раза в день, исключают сауну и спортзал, а после заживления используют SPF-защиту.'
  },
  {
    question: 'Как работает лазерное удаление Nd:YAG Q-Switch?',
    answer:
      'Однокристальный лазер Nd:YAG Q-Switch точечно дробит частицы пигмента, не повреждая кожу и родные волоски, что исключает рубцы. Фростинг проходит через 15–30 минут, покраснение спадает в первые сутки, а пигмент выводится через лимфу за 4–6 недель.'
  },
  {
    question: 'Что нужно сделать перед процедурой на веках или губах?',
    answer:
      'За сутки отказаться от кофе, алкоголя, энергетиков и препаратов с аспирином. Перед стрелками снять контактные линзы и наращённые ресницы. Подробные уточнения Татьяна всегда даёт при согласовании записи в мессенджере.'
  },
  {
    question: 'Означает ли отправка формы на сайте, что время уже забронировано?',
    answer:
      'Нет. Сайт формирует предварительную заявку для отправки в WhatsApp или Telegram Татьяны. Окончательную дату и время мастер подтверждает лично в переписке.'
  }
];
