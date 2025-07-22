// 単位ID（値）を基準としたラベルマップ
export const unitIdToLabelMap: Record<string, string> = {
  percent: '%',
  wariai: '割',
  min: '分',
  hour: '時間',
  sec: '秒',
  times: '回',
  rotation: '回転',
  set: 'セット',
  koma: 'コマ',
  lesson: 'レッスン',
  session: 'セッション',
  action: 'アクション',
  column: '列',
  row: '行',
  cell: 'セル',
  table: 'テーブル',
  tableSheet: 'シート',
  frame: '枠',
  grid: 'グリッド',
  matrix: '行列',
  location: '箇所',
  part: '部分',
  point: '点',
  entry: '項目',
  section: '節',
  area: '領域',
  range: '範囲',
  score: '点数',
  page: 'ページ',
  chapter: '章',
  word: '語',
  separateWord: '単語',
  char: '文字',
  case: '件',
  item: '品目',
  piece: '品',
  mm: 'mm',
  cm: 'cm',
  m: 'm',
  km: 'km',
  inch: 'インチ',
  feet: 'フィート',
  yard: 'ヤード',
  mile: 'マイル',
  step: '歩',
  steps: 'ステップ',
  song: '曲',
  video: '動画',
  post: '投稿',
  tweet: 'ツイート',
  check: 'チェック',
  task: '作業',
  book: '冊',
  book_item: '本',
  animal: '匹',
  unit: '個',
  generic: 'つ',
  stage: '段',
  level: 'レベル',
  sheet: '枚',
  person: '人',
  group: '連',
  kind: '種',
  kind_type: '種類',
  yen: '円',
  dollar: 'ドル',
  euro: 'ユーロ',
  mg: 'mg',
  g: 'g',
  kg: 'kg',
  ml: 'ml',
  l: 'l',
  t: 'トン',
  oz: 'オンス',
  lb: 'ポンド',
  carat: 'カラット',
  kl: 'kL',
  tbsp: '大さじ',
  tsp: '小さじ',
  sho: '升', // Added 'sho' as it's a traditional Japanese unit not present in your current map.
  go: '合',
  barrel: 'バレル',
  gallon: 'ガロン',
  celsius: '℃',
  cup: '杯',
  zen: '膳',
  pair: '組',
  vs: '対',
}

export const unitLabelToIdMap: Record<string, string> = Object.fromEntries(
  Object.entries(unitIdToLabelMap).map(([id, label]) => [label, id])
)

// 単位正規化マップ（ひらがな or カタカナなど → 単位ID）
export const unitMap: Record<string, string> = {
  // 単位からの逆引き
  ...unitLabelToIdMap,

  // 時間系
  ふん: 'min',
  ぶん: 'min',
  ぷん: 'min',
  じかん: 'hour',
  びょう: 'sec',
  じ: 'hour', // Added
  びょー: 'sec', // Added
  ふ: 'min', // Added

  // 回数系
  かい: 'times',
  かいてん: 'rotation',
  せっと: 'set',
  こま: 'koma',
  れっすん: 'lesson',
  せっしょん: 'session',
  あくしょん: 'action',
  セット: 'set', // Added common katakana

  // 表系
  れつ: 'column',
  からむ: 'column',
  ぎょう: 'row',
  ろう: 'row',
  せる: 'cell',
  ます: 'cell',
  ひょう: 'table',
  てーぶる: 'table',
  しーと: 'tableSheet',
  わく: 'frame',
  ぐりっど: 'grid',
  ぎょうれつ: 'matrix',
  ぎょーれつ: 'matrix',
  まとりっくす: 'matrix',
  しーつ: 'tableSheet', // Added
  ぐりど: 'grid', // Added

  // 箇所・点・項目系
  かしょ: 'location',
  ばしょ: 'location',
  ところ: 'location',
  ろけーしょん: 'location',
  ぱーと: 'part',
  ぶ: 'part',
  てん: 'point',
  ぽいんと: 'point',
  こうもく: 'entry',
  もく: 'entry',
  えんとりー: 'entry',
  せつ: 'section',
  せくしょん: 'section',
  りょういき: 'area',
  えりあ: 'area',
  はんい: 'range',
  れんじ: 'range',
  てんすう: 'score',
  すこあ: 'score',
  ぱーつ: 'part', // Added
  ろけ: 'location', // Added
  えんとり: 'entry', // Added

  // 量・知識系
  ぺーじ: 'page',
  p: 'page',
  しょう: 'chapter',
  ご: 'word',
  たんご: 'separateWord',
  もじ: 'char',
  けん: 'case',
  ひんもく: 'item',
  しな: 'piece',
  ちゃぷたー: 'chapter', // Added
  たん: 'separateWord', // Added

  // 長さ・距離・歩数の単位拡張
  きろ: 'km',
  きろめーとる: 'km',
  km: 'km',
  ＫＭ: 'km', // Added full-width KM
  キロ: 'km',
  キロメートル: 'km',
  '㌖': 'km',
  ｍ: 'm', // Added full-width m
  '㍍': 'm',
  めーとる: 'm',
  メートル: 'm',
  せんち: 'cm',
  せんちめーとる: 'cm',
  ｃｍ: 'cm', // Added full-width cm
  センチ: 'cm',
  センチメートル: 'cm',
  みり: 'mm',
  みりめーとる: 'mm',
  ｍｍ: 'mm', // Added full-width mm
  ミリ: 'mm',
  ミリメートル: 'mm',
  いんち: 'inch',
  いんちめーとる: 'inch',
  インチ: 'inch',
  インチメートル: 'inch',
  in: 'inch',
  '″': 'inch',
  ふぃーと: 'feet',
  ふっと: 'feet',
  フィート: 'feet',
  フィートル: 'feet', // Typo
  ft: 'feet',
  '′': 'feet',
  やーど: 'yard',
  ヤード: 'yard',
  yd: 'yard',
  まいる: 'mile',
  マイル: 'mile',
  mi: 'mile',
  m: 'm', // Ensure basic English ones are also mapped if they aren't already covered by unitLabelToIdMap
  cm: 'cm',
  mm: 'mm',

  // 歩数
  ほ: 'step',
  ぽ: 'step',
  すてっぷ: 'steps',

  // コンテンツ・投稿
  きょく: 'song',
  どうが: 'video',
  とうこう: 'post',
  ついーと: 'tweet',
  ちぇっく: 'check',
  さぎょう: 'task',

  // 📚 日常系
  さつ: 'book',
  ほん: 'book_item',
  ひき: 'animal',
  ぴき: 'animal',
  びき: 'animal',
  こ: 'unit',
  つ: 'generic',
  だん: 'stage',
  れべる: 'level',
  まい: 'sheet',
  にん: 'person',
  かた: 'person',
  れん: 'group',
  しゅ: 'kind',
  しゅるい: 'kind_type',
  ぐみ: 'group', // Added
  しゅもく: 'kind_type', // Added (likely typo/alternative for "種類")

  // 💰 通貨系
  えん: 'yen',
  どる: 'dollar',
  ゆーろ: 'euro',
  $: 'dollar', // Added common symbol
  '€': 'euro', // Added common symbol
  '¥': 'yen', // Added common symbol (though typically for CNY/JPY)

  // 💪 重さ・容量系
  '㎎': 'mg',
  みりぐらむ: 'mg',
  えむじー: 'mg',
  ぐらむ: 'g',
  ぐらむす: 'g',
  じー: 'g',
  '㎏': 'kg',
  きろぐらむ: 'kg',
  けーじー: 'kg',
  '㌧': 't',
  とん: 't',
  とんす: 't',
  おんす: 'oz',
  おんすず: 'oz',
  ぽんど: 'lb',
  えるびー: 'lb',
  からっと: 'carat',
  みりりっとる: 'ml',
  ml: 'ml',
  える: 'l',
  りっとる: 'l',
  りっとるす: 'l',
  きろりっとる: 'kl',
  けーえる: 'kl',
  おおさじ: 'tbsp',
  おおさじいち: 'tbsp',
  てーぶるすぷーん: 'tbsp',
  こさじ: 'tsp',
  てぃーすぷーん: 'tsp',
  ごう: 'go',
  ばれる: 'barrel',
  がろん: 'gallon',
  mg: 'mg', // Ensure basic English ones are also mapped
  g: 'g',
  kg: 'kg',
  l: 'l',
  t: 't',
  oz: 'oz',
  lb: 'lb',
  リットル: 'l', // Added common katakana
  ミリリットル: 'ml', // Added common katakana
  キロリットル: 'kl', // Added common katakana

  // 🌡️ 温度系
  ど: 'celsius',
  度: 'celsius', // Added common kanji
  摂氏: 'celsius', // Added Celsius kanji
  '℃': 'celsius', // Added degree Celsius symbol

  // 📊 割合・歩合系
  ぱーせんと: 'percent',
  ぱー: 'percent',
  わり: 'wariai',
  パーセント: 'percent', // Added common katakana
  パー: 'percent', // Added common katakana
  '%': 'percent', // Added percent symbol
  '％': 'percent',

  // 🥤 飲食系
  こっぷ: 'cup',
  はい: 'cup',
  ぱい: 'cup',
  かっぷ: 'cup',
  ぜん: 'zen',
  カップ: 'cup', // Added common katakana

  // 👥 その他助数詞
  くみ: 'pair',
  たい: 'vs',

  // 助数詞の一般的な表記ゆれ
  コ: 'unit', // カタカナ
  ツ: 'generic', // カタカナ
  マイ: 'sheet', // カタカナ
  ニン: 'person', // カタカナ
  サツ: 'book', // カタカナ
  ホン: 'book_item', // カタカナ
  ヒキ: 'animal', // カタカナ
  エン: 'yen', // カタカナ
  グラム: 'g', // カタカナ
  キログラム: 'kg', // カタカナ
  // "リットル": 'l', // カタカナ
  ミリグラム: 'mg', // カタカナ
  // "ミリリットル": 'ml', // カタカナ
  トン: 't', // カタカナ

  // 英語の略称を小文字でも追加
  MM: 'mm',
  CM: 'cm',
  M: 'm',
  KM: 'km',
  IN: 'inch',
  FT: 'feet',
  YD: 'yard',
  MI: 'mile',
  MG: 'mg',
  G: 'g',
  KG: 'kg',
  ML: 'ml',
  L: 'l',
  T: 't',
  OZ: 'oz',
  LB: 'lb',
  KL: 'kl',
  TBS: 'tbsp', // Common short form for tablespoon
  TSP: 'tsp',
  GAL: 'gallon', // Common short form for gallon
  C: 'celsius', // Common for Celsius
}
