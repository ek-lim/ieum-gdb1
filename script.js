const searchInput = document.querySelector("#guide-search");
const cards = [...document.querySelectorAll(".guide-card")];
const emptyState = document.querySelector("#empty-state");
const expandButton = document.querySelector("#expand-all");
const toast = document.querySelector("#toast");
const languageButtons = [...document.querySelectorAll("[data-lang]")];

const ui = {
  ko: {
    title: "숙소 이용 안내",
    searchPlaceholder: "필요한 내용을 검색하세요",
    expand: "전체 펼치기",
    collapse: "전체 접기",
    copied: "비밀번호를 복사했습니다.",
    empty: "검색 결과가 없습니다.",
    ariaLanguage: "언어 선택",
    homeAria: "숙소 이용 안내 처음으로",
  },
  en: {
    title: "Guest Guide",
    searchPlaceholder: "Search this guide",
    expand: "Expand all",
    collapse: "Collapse all",
    copied: "Password copied.",
    empty: "No results found.",
    ariaLanguage: "Language selection",
    homeAria: "Back to the guest guide top",
  },
  zh: {
    title: "住宿指南",
    searchPlaceholder: "搜索需要的信息",
    expand: "全部展开",
    collapse: "全部收起",
    copied: "密码已复制。",
    empty: "没有搜索结果。",
    ariaLanguage: "语言选择",
    homeAria: "返回住宿指南顶部",
  },
  ja: {
    title: "宿泊ガイド",
    searchPlaceholder: "必要な内容を検索",
    expand: "すべて開く",
    collapse: "すべて閉じる",
    copied: "パスワードをコピーしました。",
    empty: "検索結果がありません。",
    ariaLanguage: "言語選択",
    homeAria: "宿泊ガイドの先頭へ",
  },
  es: {
    title: "Guía del alojamiento",
    searchPlaceholder: "Busca lo que necesites",
    expand: "Expandir todo",
    collapse: "Contraer todo",
    copied: "Contraseña copiada.",
    empty: "No se encontraron resultados.",
    ariaLanguage: "Selección de idioma",
    homeAria: "Volver al inicio de la guía",
  },
};

const translations = {
  "숙소 이용 안내": {
    en: "Guest Guide",
    zh: "住宿指南",
    ja: "宿泊ガイド",
    es: "Guía del alojamiento",
  },
  "강풀만화거리 근처의 따뜻한 하루": {
    en: "A warm stay near Kang Full Cartoon Street",
    zh: "在姜草漫画街附近度过温暖的一天",
    ja: "カンプル漫画通り近くで過ごす、あたたかな一日",
    es: "Una estadía cálida cerca de Kang Full Cartoon Street",
  },
  "지하1층 · 강풀만화거리 근처의 따뜻한 하루": {
    en: "A warm stay near Kang Full Cartoon Street",
    zh: "地下1层 · 在姜草漫画街附近度过温暖的一天",
    ja: "地下1階 · カンプル漫画通り近くで過ごす、あたたかな一日",
    es: "Una estadía cálida cerca de Kang Full Cartoon Street",
  },
  "Guest Guide · Welcome": {
    en: "Guest Guide · Welcome",
    zh: "住宿指南 · 欢迎",
    ja: "宿泊ガイド · ようこそ",
    es: "Guía para huéspedes · Bienvenida",
  },
  "편안한 머무름을 위한 숙소 안내": {
    en: "A Helpful Guide for a Comfortable Stay",
    zh: "让您舒适入住的住宿指南",
    ja: "快適にお過ごしいただくための宿泊ガイド",
    es: "Guía del alojamiento para una estadía cómoda",
  },
  "체크인부터 주변 산책 코스까지, 필요한 순간에 살짝 열어보는 작은 안내서예요.": {
    en: "A small guide to open whenever you need it, from check-in to nearby walks.",
    zh: "从入住到周边散步路线，需要时随时查看的小指南。",
    ja: "チェックインから近くのお散歩先まで、必要な時にそっと開ける小さなガイドです。",
    es: "Una pequeña guía para consultar cuando la necesites: desde el check-in hasta paseos cercanos.",
  },
  "비상": {
    en: "Emergency",
    zh: "紧急",
    ja: "緊急",
    es: "Emergencia",
  },
  "쓰레기": {
    en: "Trash",
    zh: "垃圾",
    ja: "ごみ",
    es: "Basura",
  },
  "주변": {
    en: "Nearby",
    zh: "周边",
    ja: "周辺",
    es: "Alrededores",
  },
  "🔑 체크인": {
    en: "🔑 Check-in",
    zh: "🔑 入住",
    ja: "🔑 チェックイン",
    es: "🔑 Check-in",
  },
  "도어락 비밀번호는 체크인 1시간 전에 전송됩니다.": {
    en: "The door lock code will be sent 1 hour before check-in.",
    zh: "门锁密码将在入住前1小时发送。",
    ja: "ドアロックの暗証番号はチェックイン1時間前にお送りします。",
    es: "El código de la cerradura se enviará 1 hora antes del check-in.",
  },
  "🚗 주차": {
    en: "🚗 Parking",
    zh: "🚗 停车",
    ja: "🚗 駐車",
    es: "🚗 Estacionamiento",
  },
  "건물 주차장 1대 가능, 1분 거리에 공영주차장이 있습니다.": {
    en: "One car can park in the building lot. A public parking lot is also 1 minute away.",
    zh: "楼内停车场可停1辆车，步行1分钟处也有公共停车场。",
    ja: "建物の駐車場に1台駐車できます。徒歩1分の場所に公共駐車場もあります。",
    es: "Se puede estacionar 1 auto en el edificio. También hay un estacionamiento público a 1 minuto.",
  },
  "건물 주차는 불가하며, 근처 성내전통시장 공영주차장을 이용해주세요.": {
    en: "Parking is not available in the building. Please use the nearby Seongnae Traditional Market public parking lot.",
    zh: "本楼无法停车，请使用附近的城内传统市场公共停车场。",
    ja: "建物内の駐車はできません。近くの城内伝統市場公共駐車場をご利用ください。",
    es: "No hay estacionamiento disponible en el edificio. Por favor usa el estacionamiento público de Seongnae Traditional Market, que está cerca.",
  },
  "🔑 입·퇴실": {
    en: "🔑 Check-in & Check-out",
    zh: "🔑 入住与退房",
    ja: "🔑 チェックイン・チェックアウト",
    es: "🔑 Check-in y check-out",
  },
  "도어락 사용법": {
    en: "Door Lock",
    zh: "门锁使用方法",
    ja: "ドアロックの使い方",
    es: "Uso de la cerradura",
  },
  "체크인 1시간 전 비밀번호를 전송해드립니다.": {
    en: "The password will be sent 1 hour before check-in.",
    zh: "入住前1小时会发送密码。",
    ja: "チェックイン1時間前に暗証番号をお送りします。",
    es: "Te enviaremos el código 1 hora antes del check-in.",
  },
  "주차 안내": {
    en: "Parking",
    zh: "停车说明",
    ja: "駐車案内",
    es: "Estacionamiento",
  },
  "건물 주차장에 1대 주차가 가능합니다. 주차장 앞 도로에도 주차가 유연한 편이며, 1분 거리에 공영주차장도 있습니다.": {
    en: "One car can park in the building parking lot. Street parking near the lot is often flexible, and a public parking lot is 1 minute away.",
    zh: "楼内停车场可停1辆车。停车场前方道路停车也相对灵活，步行1分钟处还有公共停车场。",
    ja: "建物の駐車場に1台駐車できます。駐車場前の道路も比較的停めやすく、徒歩1分の場所に公共駐車場もあります。",
    es: "Se puede estacionar 1 auto en el estacionamiento del edificio. La calle frente al estacionamiento suele ser flexible y también hay un estacionamiento público a 1 minuto.",
  },
  "건물 주차는 불가능합니다. 차량 이용 시 근처 성내전통시장 공영주차장을 이용해주세요.": {
    en: "Parking is not available in the building. If you are coming by car, please use the nearby Seongnae Traditional Market public parking lot.",
    zh: "本楼无法停车。如驾车前来，请使用附近的城内传统市场公共停车场。",
    ja: "建物内の駐車はできません。お車でお越しの場合は、近くの城内伝統市場公共駐車場をご利用ください。",
    es: "No se puede estacionar en el edificio. Si vienes en auto, por favor usa el estacionamiento público cercano de Seongnae Traditional Market.",
  },
  "공영주차장 지도": {
    en: "Public Parking Map",
    zh: "公共停车场地图",
    ja: "公共駐車場の地図",
    es: "Mapa del estacionamiento público",
  },
  "성내전통시장 공영주차장 지도 보기": {
    en: "View Seongnae Traditional Market Public Parking Map",
    zh: "查看城内传统市场公共停车场地图",
    ja: "城内伝統市場公共駐車場の地図を見る",
    es: "Ver mapa del estacionamiento público de Seongnae Traditional Market",
  },
  "짐 보관": {
    en: "Luggage Storage",
    zh: "行李寄存",
    ja: "荷物預かり",
    es: "Guardado de equipaje",
  },
  "기본적으로 제공하지 않습니다.": {
    en: "This is generally not provided.",
    zh: "原则上不提供行李寄存。",
    ja: "基本的には対応していません。",
    es: "Por lo general, no ofrecemos este servicio.",
  },
  "📶 기본 시설 사용법": {
    en: "📶 Basic Facilities",
    zh: "📶 基本设施使用方法",
    ja: "📶 基本設備の使い方",
    es: "📶 Uso de servicios básicos",
  },
  "체크인 메시지를 확인해주세요": {
    en: "Please check your check-in message",
    zh: "请查看入住消息",
    ja: "チェックインメッセージをご確認ください",
    es: "Por favor revisa el mensaje de check-in",
  },
  "현재 인터넷이 수리 중입니다. 이용에 불편을 드려 죄송합니다.": {
    en: "The internet is currently being repaired. We apologize for the inconvenience.",
    zh: "目前网络正在维修中。给您带来不便，非常抱歉。",
    ja: "現在インターネットは修理中です。ご不便をおかけして申し訳ありません。",
    es: "El internet está actualmente en reparación. Disculpa las molestias.",
  },
  "에어컨": {
    en: "Air Conditioner",
    zh: "空调",
    ja: "エアコン",
    es: "Aire acondicionado",
  },
  "침실1과 거실에 위치해 있으며, 리모콘으로 조작 가능합니다.": {
    en: "Air conditioners are located in Bedroom 1 and the living room, and can be operated with the remote controls.",
    zh: "空调位于卧室1和客厅，可使用遥控器操作。",
    ja: "寝室1とリビングにあり、リモコンで操作できます。",
    es: "Hay aire acondicionado en el dormitorio 1 y en la sala; se controla con los controles remotos.",
  },
  "에어컨은 거실에만 있으며, 리모콘으로 조작 가능합니다. 기본적으로 지하라서 비교적 시원한 편입니다.": {
    en: "The air conditioner is only in the living room and can be operated with the remote control. Since this unit is in the basement, it is generally fairly cool.",
    zh: "空调仅在客厅，可使用遥控器操作。由于房源位于地下，通常会比较凉爽。",
    ja: "エアコンはリビングのみにあり、リモコンで操作できます。地下のお部屋のため、基本的に比較的涼しいです。",
    es: "El aire acondicionado está solo en la sala y se controla con el control remoto. Como el alojamiento está en el sótano, normalmente se mantiene bastante fresco.",
  },
  "보일러": {
    en: "Boiler",
    zh: "锅炉",
    ja: "ボイラー",
    es: "Caldera",
  },
  "안방에 있는 중앙 조절 장치로 조작되며, 온수 사용시 필히 작동해야 합니다.": {
    en: "It is controlled by the central controller in the main bedroom. Please turn it on when using hot water.",
    zh: "通过主卧内的中央控制器操作。使用热水时请务必开启。",
    ja: "主寝室にある中央コントローラーで操作します。お湯を使う時は必ず作動させてください。",
    es: "Se controla desde el panel central del dormitorio principal. Debe estar encendida para usar agua caliente.",
  },
  "헤어드라이어": {
    en: "Hair Dryer",
    zh: "吹风机",
    ja: "ヘアドライヤー",
    es: "Secador de cabello",
  },
  "헤어드라이어는 침실1 협탁에 비치되어 있습니다.": {
    en: "The hair dryer is in the bedside table in Bedroom 1.",
    zh: "吹风机放在卧室1的床头柜里。",
    ja: "ヘアドライヤーは寝室1のサイドテーブルにあります。",
    es: "El secador de cabello está en la mesa de noche del dormitorio 1.",
  },
  "헤어드라이어는 침실2 화장대 서랍 안에 비치되어 있습니다.": {
    en: "The hair dryer is inside the vanity drawer in Bedroom 2.",
    zh: "吹风机放在卧室2梳妆台抽屉内。",
    ja: "ヘアドライヤーは寝室2の化粧台の引き出しの中にあります。",
    es: "El secador de cabello está dentro del cajón del tocador del dormitorio 2.",
  },
  "세탁기·건조기": {
    en: "Washer & Dryer",
    zh: "洗衣机与烘干机",
    ja: "洗濯機・乾燥機",
  },
  "세탁기": {
    en: "Washer",
    zh: "洗衣机",
    ja: "洗濯機",
    es: "Lavadora",
  },
  "세탁기와 건조기를 사용하실 수 있습니다. 세탁기는 'AI 맞춤세탁' 모드 사용을 권장드립니다.": {
    en: "You may use the washer and dryer. For the washer, we recommend using the 'AI Custom Wash' mode.",
    zh: "您可以使用洗衣机和烘干机。洗衣机建议使用“AI 맞춤세탁”模式。",
    ja: "洗濯機と乾燥機をご利用いただけます。洗濯機は「AI 맞춤세탁」モードの使用をおすすめします。",
    es: "Puedes usar la lavadora y la secadora. Recomendamos usar el modo 'AI Custom Wash'.",
  },
  "세탁기를 사용하실 수 있습니다. 전원을 누른 뒤 동작 버튼을 누르면 시작됩니다. 모드 설정도 가능하지만, 전원을 켜면 기본적으로 '청정세탁' 모드로 설정됩니다.": {
    en: "You may use the washer. Press Power, then press Start to begin. You can change the mode, but when powered on it is set to the default 'Clean Wash' mode.",
    zh: "您可以使用洗衣机。按下电源键后，再按启动键即可开始。也可以设置模式，但开机后默认设置为“清净洗涤”模式。",
    ja: "洗濯機をご利用いただけます。電源を押してからスタートボタンを押すと開始します。モード設定も可能ですが、電源を入れると基本的に「清浄洗濯」モードに設定されています。",
    es: "Puedes usar la lavadora. Presiona el botón de encendido y luego el botón de inicio para comenzar. También puedes cambiar el modo, pero al encenderla queda configurada por defecto en 'Clean Wash'.",
  },
  "제습기": {
    en: "Dehumidifier",
    zh: "除湿机",
    ja: "除湿機",
    es: "Deshumidificador",
  },
  "제습기는 물통을 비우면 자동으로 동작하게 되어 있습니다.": {
    en: "The dehumidifier is set to run automatically once the water tank is emptied.",
    zh: "除湿机在清空水箱后会自动运行。",
    ja: "除湿機は、水タンクを空にすると自動で作動するようになっています。",
    es: "El deshumidificador volverá a funcionar automáticamente después de vaciar y colocar el tanque de agua.",
  },
  "제습기 사용 안내": {
    en: "How to Use the Dehumidifiers",
    zh: "除湿机使用说明",
    ja: "除湿機の使い方",
    es: "Uso del deshumidificador",
  },
  "숙소에는 제습기 2대가 있습니다. 물통이 가득 차면 아래 사진의 물통을 비운 뒤 다시 끼워주세요.": {
    en: "There are 2 dehumidifiers in the unit. When a tank is full, please empty the water tank shown in the photos below and place it back in.",
    zh: "房源内有2台除湿机。水箱满时，请按照下方照片清空水箱后再装回。",
    ja: "室内には除湿機が2台あります。水タンクがいっぱいになったら、下の写真の水タンクを空にしてから戻してください。",
    es: "Hay 2 deshumidificadores en el alojamiento. Si el tanque se llena, vacía el tanque indicado en las fotos y vuelve a colocarlo.",
  },
  "물통을 비워주세요 / Empty tank": {
    en: "Empty the water tank",
    zh: "请清空水箱",
    ja: "水タンクを空にしてください",
    es: "Vacía el tanque / Empty tank",
  },
  "제습기 1번: 아래쪽 물통을 당겨 비워주세요.": {
    en: "Dehumidifier 1: Pull out and empty the lower water tank.",
    zh: "除湿机1：请拉出下方水箱并清空。",
    ja: "除湿機1：下部の水タンクを引き出して空にしてください。",
    es: "Deshumidificador 1: tira del tanque inferior y vacíalo.",
  },
  "제습기 2번: 아래쪽 물통을 비운 뒤 다시 끼워주세요.": {
    en: "Dehumidifier 2: Empty the lower water tank, then place it back in.",
    zh: "除湿机2：请清空下方水箱后再装回。",
    ja: "除湿機2：下部の水タンクを空にしてから戻してください。",
    es: "Deshumidificador 2: vacía el tanque inferior y vuelve a colocarlo.",
  },
  "전원 / Power": {
    en: "Power",
    zh: "电源",
    ja: "電源",
    es: "Encendido / Power",
  },
  "LED 표시 / LED display": {
    en: "LED display",
    zh: "LED显示",
    ja: "LED表示",
    es: "Pantalla LED / LED display",
  },
  "전원버튼을 누르면 작동합니다. 물통이 가득 차면 LED가 FL로 바뀌며, 물을 비우고 전원버튼을 한 번 꾹 눌러주면 다시 작동합니다.": {
    en: "Press the power button to start. When the water tank is full, the LED changes to FL. Empty the tank, then press and hold the power button once to restart.",
    zh: "按下电源键即可运行。水箱满时，LED会显示FL。清空水箱后，长按一次电源键即可重新运行。",
    ja: "電源ボタンを押すと作動します。水タンクが満水になるとLEDがFLに変わります。水を捨てた後、電源ボタンを一度長押しすると再び作動します。",
    es: "Presiona el botón de encendido para usarlo. Cuando el tanque está lleno, la pantalla LED cambia a FL; vacía el agua y mantén presionado el botón de encendido una vez para que vuelva a funcionar.",
  },
  "물통비움 / Empty tank light": {
    en: "Empty tank light",
    zh: "水箱清空指示灯",
    ja: "水タンク満水ランプ",
    es: "Luz de tanque lleno / Empty tank light",
  },
  "물통이 가득 차면 '물통비움' 부분에 빨간 불이 들어옵니다. 물을 비우고 다시 끼우면 바로 다시 작동합니다.": {
    en: "When the water tank is full, the 'Empty Tank' area lights up red. Empty the tank and place it back in; it will restart right away.",
    zh: "水箱满时，“水箱清空”位置会亮红灯。清空水箱并装回后，会立即重新运行。",
    ja: "水タンクが満水になると「水タンク満水」部分に赤いランプが点灯します。水を捨てて戻すと、すぐに再び作動します。",
    es: "Cuando el tanque está lleno, se enciende una luz roja en '물통비움'. Vacía el agua y vuelve a colocarlo; funcionará de nuevo enseguida.",
  },
  "세탁기 사용 안내": {
    en: "How to Use the Washer",
    zh: "洗衣机使用说明",
    ja: "洗濯機の使い方",
    es: "Uso de la lavadora",
  },
  "숙소의 세탁기와 건조대를 이용해 빨래를 하실 수 있습니다. 건조가 더 필요하거나 큰 빨래가 있을 때는 근처 빨래방도 이용하실 수 있습니다.": {
    en: "You may use the washer and drying rack in the unit. If you need stronger drying or have larger laundry, nearby laundromats are also available.",
    zh: "您可以使用房源内的洗衣机和晾衣架。如需更强烘干或清洗大件衣物，也可以使用附近的自助洗衣店。",
    ja: "室内の洗濯機と物干し台をご利用いただけます。しっかり乾燥させたい場合や大きな洗濯物がある場合は、近くのコインランドリーも利用できます。",
    es: "Puedes lavar ropa usando la lavadora y el tendedero del alojamiento. Si necesitas más secado o tienes prendas grandes, también puedes usar una lavandería cercana.",
  },
  "코스 선택 / Course Select": {
    en: "Course Select",
    zh: "洗涤程序选择",
    ja: "コース選択",
    es: "Selección de ciclo / Course Select",
  },
  "표준세탁 / Standard Wash": {
    en: "Standard Wash",
    zh: "标准洗涤",
    ja: "標準洗濯",
    es: "Lavado estándar / Standard Wash",
  },
  "전원을 켜면 기본적으로 청정세탁 모드로 설정됩니다. 필요하면 코스를 선택한 뒤 동작 버튼을 눌러주세요.": {
    en: "When powered on, the washer is set to Clean Wash by default. If needed, select a course, then press the Start button.",
    zh: "开机后默认设置为清净洗涤模式。如有需要，请选择洗涤程序后按启动键。",
    ja: "電源を入れると基本的に清浄洗濯モードに設定されています。必要に応じてコースを選び、スタートボタンを押してください。",
    es: "Al encenderla, queda configurada por defecto en el modo Clean Wash. Si lo necesitas, selecciona un ciclo y luego presiona el botón de inicio.",
  },
  "이 통을 열어주세요 / Open this drawer": {
    en: "Open this drawer",
    zh: "请打开这个抽屉",
    ja: "この引き出しを開けてください",
    es: "Abre este cajón / Open this drawer",
  },
  "세제함을 열면 세제와 섬유유연제를 넣는 칸이 보입니다.": {
    en: "When you open the detergent drawer, you will see the compartments for detergent and fabric softener.",
    zh: "打开洗涤剂盒后，可以看到放洗涤剂和柔顺剂的格子。",
    ja: "洗剤ケースを開けると、洗剤と柔軟剤を入れる場所が見えます。",
    es: "Al abrir el cajón, verás los compartimentos para detergente y suavizante.",
  },
  "세제 / Detergent": {
    en: "Detergent",
    zh: "洗涤剂",
    ja: "洗剤",
    es: "Detergente / Detergent",
  },
  "섬유유연제 / Fabric softener": {
    en: "Fabric softener",
    zh: "柔顺剂",
    ja: "柔軟剤",
    es: "Suavizante / Fabric softener",
  },
  "왼쪽에는 세제, 오른쪽에는 섬유유연제를 넣어주세요.": {
    en: "Please put detergent on the left and fabric softener on the right.",
    zh: "请将洗涤剂放入左侧，柔顺剂放入右侧。",
    ja: "左側に洗剤、右側に柔軟剤を入れてください。",
    es: "Coloca el detergente a la izquierda y el suavizante a la derecha.",
  },
  "근처 빨래방": {
    en: "Nearby Laundromats",
    zh: "附近自助洗衣店",
    ja: "近くのコインランドリー",
    es: "Lavanderías cercanas",
  },
  "워시팡팡무인셀프빨래방 성내점": {
    en: "Wash Pangpang Unmanned Self Laundromat Seongnae Branch",
    zh: "Wash Pangpang无人自助洗衣店 城内店",
    ja: "ウォッシュパンパン無人セルフランドリー 城内店",
    es: "Wash Pangpang Self Laundry Seongnae",
  },
  "카드 사용이 가능합니다.": {
    en: "Cards are accepted.",
    zh: "可以使用银行卡。",
    ja: "カード利用が可能です。",
    es: "Aceptan tarjeta.",
  },
  "24시셀프빨래방": {
    en: "24-Hour Self Laundromat",
    zh: "24小时自助洗衣店",
    ja: "24時間セルフランドリー",
    es: "24-hour Self Laundry",
  },
  "현금만 가능한 것으로 알고 있습니다.": {
    en: "As far as we know, cash only is accepted.",
    zh: "据我们了解，仅可使用现金。",
    ja: "現金のみ利用可能と聞いています。",
    es: "Según sabemos, solo aceptan efectivo.",
  },
  "🛁 욕실": {
    en: "🛁 Bathroom",
    zh: "🛁 浴室",
    ja: "🛁 バスルーム",
    es: "🛁 Baño",
  },
  "온수 나오는 데 걸리는 시간": {
    en: "How Long Hot Water Takes",
    zh: "热水需要多久",
    ja: "お湯が出るまでの時間",
    es: "Tiempo para que salga agua caliente",
  },
  "보일러를 켠 경우, 2분 안에 온수가 나옵니다. 온수가 나오지 않을 경우 보일러 작동 여부를 확인해주세요.": {
    en: "When the boiler is on, hot water should come out within 2 minutes. If it does not, please check whether the boiler is running.",
    zh: "锅炉开启后，2分钟内会出热水。如果没有热水，请确认锅炉是否已开启。",
    ja: "ボイラーをつけている場合、2分以内にお湯が出ます。出ない場合はボイラーが作動しているかご確認ください。",
  },
  "보일러를 켠 경우, 2분 안에 온수가 나옵니다. 온수가 나오지 않을 경우 보일러 작동 여부를 확인해주세요. (입구 보일러함 내에 있습니다.)": {
    en: "When the boiler is on, hot water should come out within 2 minutes. If it does not, please check whether the boiler is running. It is inside the boiler cabinet by the entrance.",
    zh: "锅炉开启后，2分钟内会出热水。如果没有热水，请确认锅炉是否已开启。锅炉位于入口处的锅炉柜内。",
    ja: "ボイラーをつけている場合、2分以内にお湯が出ます。出ない場合はボイラーが作動しているかご確認ください。入口のボイラー収納内にあります。",
    es: "Si la caldera está encendida, el agua caliente sale en menos de 2 minutos. Si no sale agua caliente, revisa si la caldera está funcionando. (Está dentro del gabinete de la caldera en la entrada).",
  },
  "욕실 환풍기": {
    en: "Bathroom Fan",
    zh: "浴室换气扇",
    ja: "浴室換気扇",
    es: "Extractor del baño",
  },
  "욕실 스위치를 켜면 자동으로 작동됩니다.": {
    en: "It turns on automatically with the bathroom switch.",
    zh: "打开浴室开关后会自动运行。",
    ja: "浴室のスイッチを入れると自動で作動します。",
    es: "Se enciende automáticamente al prender el interruptor del baño.",
  },
  "세면대 물빠짐 주의사항": {
    en: "Sink Drain Note",
    zh: "洗手池排水注意事项",
    ja: "洗面台の排水について",
    es: "Cuidado con el desagüe del lavabo",
  },
  "휴지 외 이물질을 세면대, 하수구와 변기에 넣지 않도록 유의해주세요. 물티슈와 음식물은 넣지 말아주세요.": {
    en: "Please do not put anything other than toilet paper into the sink, drains, or toilet. Wet wipes and food waste should not be flushed or drained.",
    zh: "请不要将纸巾以外的异物放入洗手池、下水口或马桶。请勿投入湿纸巾和食物。",
    ja: "トイレットペーパー以外の異物を洗面台、排水口、トイレに流さないでください。ウェットティッシュや食べ物は入れないでください。",
    es: "Por favor no pongas objetos extraños en el lavabo, desagüe o inodoro. No tires toallitas húmedas ni comida.",
  },
  "변기 사용 주의사항": {
    en: "Toilet Use Note",
    zh: "马桶使用注意事项",
    ja: "トイレ使用時の注意",
    es: "Cuidado al usar el inodoro",
  },
  "변기에는 화장지를 비롯해 이물질을 넣지 않도록 특별히 유의 부탁드립니다.": {
    en: "Please take extra care not to put foreign objects, including toilet paper, into the toilet.",
    zh: "请特别注意，不要将包括卫生纸在内的异物投入马桶。",
    ja: "トイレットペーパーを含め、異物をトイレに入れないよう特にご注意ください。",
    es: "Te pedimos tener especial cuidado de no tirar papel higiénico ni otros objetos en el inodoro.",
  },
  "🍽️ 주방": {
    en: "🍽️ Kitchen",
    zh: "🍽️ 厨房",
    ja: "🍽️ キッチン",
    es: "🍽️ Cocina",
  },
  "식기·조리도구": {
    en: "Dishes & Cookware",
    zh: "餐具与厨具",
    ja: "食器・調理器具",
    es: "Vajilla y utensilios de cocina",
  },
  "주방 싱크대 가운데 하부장 각 서랍에 수저, 그릇, 조리도구가 들어 있습니다. 각 서랍에 이름이 붙어 있습니다. 접시 및 와인잔, 컵 등은 상부장에 진열되어 있습니다.": {
    en: "Cutlery, bowls, and cooking tools are in the drawers of the lower cabinet under the middle of the kitchen sink. Each drawer is labeled. Plates, wine glasses, and cups are in the upper cabinets.",
    zh: "餐具、碗和厨具放在厨房水槽中间下柜的各个抽屉里。每个抽屉都有标签。盘子、酒杯和杯子等放在上柜。",
    ja: "スプーン、箸、器、調理器具はキッチンシンク中央下の収納引き出しに入っています。各引き出しに名前が貼ってあります。お皿、ワイングラス、カップなどは上部収納にあります。",
  },
  "주방 싱크대 가운데 하부장 각 서랍에 수저, 그릇, 조리도구가 들어 있습니다. 접시 및 와인잔, 컵 등은 상부장에 진열되어 있습니다.": {
    en: "Cutlery, bowls, and cooking tools are in the drawers of the lower cabinet under the middle of the kitchen sink. Plates, wine glasses, and cups are in the upper cabinets.",
    zh: "餐具、碗和厨具放在厨房水槽中间下柜的各个抽屉里。盘子、酒杯和杯子等放在上柜。",
    ja: "スプーン、箸、器、調理器具はキッチンシンク中央下の収納引き出しに入っています。お皿、ワイングラス、カップなどは上部収納にあります。",
    es: "Los cubiertos, platos y utensilios de cocina están en los cajones del mueble inferior central bajo el fregadero. Los platos, copas de vino y vasos están en los gabinetes superiores.",
  },
  "냉장고": {
    en: "Refrigerator",
    zh: "冰箱",
    ja: "冷蔵庫",
    es: "Refrigerador",
  },
  "자유롭게 사용 가능합니다. 다만 음식물을 넣어 더러워지지 않도록 배려 부탁드립니다.": {
    en: "You may use it freely. Please be careful not to leave food spills or mess inside.",
    zh: "可自由使用。请注意不要因放入食物而弄脏冰箱。",
    ja: "自由にご利用いただけます。食べ物で汚れないようご配慮ください。",
    es: "Puedes usarlo libremente. Solo te pedimos cuidar que los alimentos no ensucien el interior.",
  },
  "싱크대 옆 두 개의 쓰레기통에는 각각 일반쓰레기와 재활용쓰레기를 버리실 수 있습니다. 구분해서 버려주시면 체크아웃 후 분리배출하겠습니다.": {
    en: "The two bins next to the sink are for general waste and recyclables. If you separate them there, we will dispose of them after check-out.",
    zh: "水槽旁的两个垃圾桶分别用于一般垃圾和可回收垃圾。请分类投放，退房后我们会进行分类处理。",
    ja: "シンク横の2つのごみ箱は、一般ごみとリサイクルごみ用です。分けて捨てていただければ、チェックアウト後に分別して出します。",
    es: "Junto al fregadero hay dos basureros: uno para basura general y otro para reciclaje. Si los separas, nosotros los sacaremos después del check-out.",
  },
  "음식물 처리 주의사항": {
    en: "Food Waste Note",
    zh: "厨余垃圾注意事项",
    ja: "生ごみ処理について",
    es: "Cuidado con los restos de comida",
  },
  "싱크대 오른쪽 하부장에 밀폐가 가능한 음식물쓰레기통이 있습니다. 싱크대에 음식물을 흘려버려 배관이 막히지 않도록 유의 부탁드립니다.": {
    en: "There is a sealable food waste bin in the lower cabinet on the right side of the sink. Please do not wash food scraps down the sink, as this may clog the pipes.",
    zh: "水槽右侧下柜内有可密封的厨余垃圾桶。请不要将食物残渣倒入水槽，以免堵塞管道。",
    ja: "シンク右側の下部収納に密閉できる生ごみ用ごみ箱があります。配管詰まり防止のため、食べ物をシンクに流さないでください。",
  },
  "상부장 오른쪽에 밀폐가 가능한 음식물쓰레기통이 있습니다. 싱크대에 음식물을 흘려버려 배관이 막히지 않도록 유의 부탁드립니다.": {
    en: "There is a sealable food waste bin in the right side of the upper cabinet. Please do not wash food scraps down the sink, as this may clog the pipes.",
    zh: "右侧上柜内有可密封的厨余垃圾桶。请不要将食物残渣倒入水槽，以免堵塞管道。",
    ja: "上部収納の右側に密閉できる生ごみ用ごみ箱があります。配管詰まり防止のため、食べ物をシンクに流さないでください。",
    es: "En el gabinete superior derecho hay un contenedor hermético para restos de comida. Por favor evita tirar comida por el fregadero para que no se tape la tubería.",
  },
  "♻️ 분리수거 & 쓰레기": {
    en: "♻️ Recycling & Trash",
    zh: "♻️ 垃圾分类与处理",
    ja: "♻️ 分別・ごみ",
    es: "♻️ Reciclaje y basura",
  },
  "분리수거 방법": {
    en: "How to Separate Trash",
    zh: "垃圾分类方法",
    ja: "分別方法",
    es: "Cómo separar la basura",
  },
  "한국에서는 재활용이 가능한 종이, PET, 캔 등의 재활용쓰레기와 재활용이 불가능한 일반쓰레기, 음식물쓰레기로 구분하여 배출합니다.": {
    en: "In Korea, trash is separated into recyclables such as paper, PET bottles, and cans; general waste that cannot be recycled; and food waste.",
    zh: "在韩国，垃圾分为可回收垃圾（纸、PET瓶、易拉罐等）、不可回收的一般垃圾以及厨余垃圾。",
    ja: "韓国では、紙・PETボトル・缶などのリサイクルごみ、リサイクルできない一般ごみ、生ごみに分けて出します。",
  },
  "한국에서는 재활용이 가능한 종이, 플라스틱(PET), 캔, 유리 등은 별도 봉투 없이 배출이 가능합니다. 일반쓰레기와 음식물쓰레기는 각각 종량제 봉투를 사용해주세요.": {
    en: "In Korea, recyclable paper, plastic (PET), cans, glass, and similar items can be disposed of without a separate paid bag. Please use the designated paid bags for general waste and food waste.",
    zh: "在韩国，可回收的纸类、塑料(PET)、易拉罐、玻璃等无需另装专用袋即可投放。一般垃圾和厨余垃圾请分别使用指定收费垃圾袋。",
    ja: "韓国では、リサイクル可能な紙、プラスチック(PET)、缶、ガラスなどは指定袋なしで出せます。一般ごみと生ごみは、それぞれ指定ごみ袋をご利用ください。",
    es: "En Corea, el papel, plástico (PET), latas y vidrio reciclables pueden sacarse sin una bolsa especial. Para basura general y restos de comida, usa las bolsas oficiales correspondientes.",
  },
  "쓰레기 배출 장소": {
    en: "Trash Disposal Area",
    zh: "垃圾投放地点",
    ja: "ごみ出し場所",
    es: "Lugar para sacar la basura",
  },
  "쓰레기는 건물 주차부지 옆, 아래 사진의 장소에 배출할 수 있습니다.": {
    en: "Trash can be placed next to the building parking area, at the spot shown in the photo below.",
    zh: "垃圾可投放在建筑停车区域旁、下方照片所示的位置。",
    ja: "ごみは建物の駐車スペース横、下の写真の場所に出せます。",
    es: "Puedes dejar la basura junto al área de estacionamiento del edificio, en el lugar que se muestra en la foto.",
  },
  "종량제 봉투 위치": {
    en: "Paid Trash Bag Locations",
    zh: "收费垃圾袋位置",
    ja: "指定ごみ袋の場所",
    es: "Ubicación de las bolsas oficiales",
  },
  "일반쓰레기용 하늘색 종량제 봉투는 하부장 오른쪽에, 음식물쓰레기용 노란색 종량제 봉투는 상부장 위쪽에 있습니다.": {
    en: "The sky-blue paid bags for general waste are on the right side of the lower cabinet. The yellow paid bags for food waste are above the upper cabinet.",
    zh: "一般垃圾用的天蓝色收费垃圾袋在下柜右侧。厨余垃圾用的黄色收费垃圾袋在上柜上方。",
    ja: "一般ごみ用の水色の指定ごみ袋は下部収納の右側に、生ごみ用の黄色い指定ごみ袋は上部収納の上にあります。",
    es: "Las bolsas oficiales celestes para basura general están en el lado derecho del mueble inferior. Las bolsas amarillas para restos de comida están arriba del gabinete superior.",
  },
  "음식물쓰레기 보관 팁": {
    en: "Food Waste Storage Tip",
    zh: "厨余垃圾保存小提示",
    ja: "生ごみ保管のコツ",
    es: "Consejo para guardar restos de comida",
  },
  "밀폐가 가능한 통에 쓰레기봉투를 씌워두어 채우고 버리셔도 됩니다. 냉동실을 음식 보관용으로 사용하지 않으신다면 여름철 벌레가 꼬이지 않도록 음식물쓰레기 봉투를 냉동실에 보관했다가 모아서 밖으로 배출하셔도 됩니다.": {
    en: "You may line the sealable bin with a trash bag, fill it, and take it out. If you are not using the freezer to store food, you may keep the food waste bag in the freezer during summer to help prevent insects, then take it outside when ready.",
    zh: "您可以在可密封垃圾桶内套上垃圾袋，装满后再拿出去丢。如果不把冷冻室用于存放食物，夏季也可以将厨余垃圾袋暂时放入冷冻室，避免招虫，之后集中带到室外投放。",
    ja: "密閉できる容器にごみ袋をかけて、たまったら出していただいても大丈夫です。冷凍庫を食品保管用として使わない場合は、夏場の虫対策として生ごみ袋を冷凍庫に保管し、まとめて外に出すこともできます。",
    es: "Puedes colocar la bolsa dentro del contenedor hermético, llenarla y luego sacarla. Si no usas el congelador para guardar comida, en verano también puedes guardar allí la bolsa de restos de comida para evitar insectos y sacarla cuando se acumule.",
  },
  "쓰레기 배출 장소 / Trash disposal area": {
    en: "Trash disposal area",
    zh: "垃圾投放地点",
    ja: "ごみ出し場所",
    es: "Lugar para sacar la basura / Trash disposal area",
  },
  "건물 주차부지 옆, 사진에 표시된 공간에 분리수거와 종량제 봉투를 배출해주세요.": {
    en: "Please place recyclables and paid trash bags in the marked area next to the building parking space.",
    zh: "请将可回收垃圾和收费垃圾袋投放到建筑停车区域旁照片标示的位置。",
    ja: "建物の駐車スペース横、写真で示した場所にリサイクルごみと指定ごみ袋を出してください。",
    es: "Por favor deja el reciclaje y las bolsas oficiales en el espacio señalado en la foto, junto al área de estacionamiento del edificio.",
  },
  "장박 손님 배출 안내": {
    en: "For Longer Stays",
    zh: "长住客人垃圾投放说明",
    ja: "長期滞在のお客様へ",
  },
  "직접 쓰레기 배출이 필요하신 경우 일반쓰레기와 음식물쓰레기를 배출하기 위한 종량제 봉투를 별도 문의해주세요. 재활용쓰레기와 종량제봉투에 담긴 일반쓰레기 및 음식물쓰레기는 1층 '담아내다덮밥' 옆 공간에 배출합니다.": {
    en: "If you need to take out trash during a longer stay, please ask separately for official bags for general and food waste. Recyclables and bagged general/food waste can be placed in the area next to 'Damanaeda Deopbap' on the 1st floor.",
    zh: "如长住期间需要自行丢垃圾，请另行咨询用于一般垃圾和厨余垃圾的专用垃圾袋。可回收垃圾以及装入专用袋的一般垃圾、厨余垃圾，请投放至1楼“담아내다덮밥”旁边区域。",
    ja: "長期滞在中にご自身でごみ出しが必要な場合は、一般ごみ・生ごみ用の指定ごみ袋について別途お問い合わせください。リサイクルごみと指定袋に入れた一般ごみ・生ごみは、1階「담아내다덮밥」横のスペースに出します。",
  },
  "직접 쓰레기 배출이 필요하신 경우 일반쓰레기와 음식물쓰레기를 배출하기 위한 종량제 봉투를 별도 문의해주세요. 재활용쓰레기와 종량제봉투에 담긴 일반쓰레기 및 음식물쓰레기는 건물 입구 왼쪽에 배출합니다.": {
    en: "If you need to take out trash during a longer stay, please ask separately for official bags for general and food waste. Recyclables and bagged general/food waste should be placed on the left side of the building entrance.",
    zh: "如长住期间需要自行丢垃圾，请另行咨询用于一般垃圾和厨余垃圾的专用垃圾袋。可回收垃圾以及装入专用袋的一般垃圾、厨余垃圾，请投放至建筑入口左侧。",
    ja: "長期滞在中にご自身でごみ出しが必要な場合は、一般ごみ・生ごみ用の指定ごみ袋について別途お問い合わせください。リサイクルごみと指定袋に入れた一般ごみ・生ごみは、建物入口の左側に出してください。",
  },
  "🧯 비상·안전": {
    en: "🧯 Emergency & Safety",
    zh: "🧯 紧急与安全",
    ja: "🧯 緊急・安全",
    es: "🧯 Emergencia y seguridad",
  },
  "긴급 상황에서는 112(범죄신고), 119(응급구조) 또는 체크인 메시지로 별도 전달된 호스트 연락처로 연락해주세요.": {
    en: "In an emergency, please call 112 for police, 119 for emergency rescue, or the host contact shared separately in your check-in message.",
    zh: "紧急情况下，请拨打112报警、119急救，或联系入住消息中另行提供的房东联系方式。",
    ja: "緊急時は、犯罪通報は112、救急は119、またはチェックインメッセージで別途お伝えしたホスト連絡先へご連絡ください。",
    es: "En una emergencia, llama al 112 (policía), al 119 (emergencias médicas/bomberos) o al contacto del anfitrión que se envió por separado en el mensaje de check-in.",
  },
  "소화기": {
    en: "Fire Extinguisher",
    zh: "灭火器",
    ja: "消火器",
    es: "Extintor",
  },
  "입구 안내": {
    en: "Entrance Guide",
    zh: "入口说明",
    ja: "入口案内",
    es: "Entrada",
  },
  "입구에 들어서면 왼쪽에는 보일러 및 소화기함, 오른쪽에는 신발장이 있습니다.": {
    en: "When you enter, the boiler and fire extinguisher cabinet are on the left, and the shoe cabinet is on the right.",
    zh: "进入入口后，左侧是锅炉和灭火器柜，右侧是鞋柜。",
    ja: "入口に入ると、左側にボイラーと消火器収納、右側に靴箱があります。",
    es: "Al entrar, a la izquierda están la caldera y el gabinete del extintor; a la derecha está el zapatero.",
  },
  "입구 계단 아래에 위치해 있으며, 각 방과 거실에는 화재경보기가 설치되어 있습니다.": {
    en: "It is located under the entrance stairs. Fire alarms are installed in each room and the living room.",
    zh: "位于入口楼梯下方。各房间和客厅都安装有火灾警报器。",
    ja: "入口階段の下にあります。各部屋とリビングには火災報知器が設置されています。",
  },
  "소화기는 입구 왼쪽 장 안에 비치되어 있으며, 각 방과 거실에는 화재경보기가 설치되어 있습니다.": {
    en: "The fire extinguisher is inside the cabinet on the left side of the entrance. Fire alarms are installed in each room and the living room.",
    zh: "灭火器放在入口左侧柜子内。各房间和客厅都安装有火灾警报器。",
    ja: "消火器は入口左側の収納内にあります。各部屋とリビングには火災報知器が設置されています。",
    es: "El extintor está dentro del gabinete a la izquierda de la entrada. Hay detectores de incendio en cada habitación y en la sala.",
  },
  "실내화": {
    en: "Indoor Slippers",
    zh: "室内拖鞋",
    ja: "室内スリッパ",
    es: "Pantuflas de interior",
  },
  "신발장에는 실내화가 비치되어 있습니다. 실내에서는 실내화 이용을 부탁드립니다.": {
    en: "Indoor slippers are provided in the shoe cabinet. Please use the slippers indoors.",
    zh: "鞋柜内备有室内拖鞋。请在室内使用拖鞋。",
    ja: "靴箱に室内スリッパをご用意しています。室内ではスリッパをご利用ください。",
    es: "Hay pantuflas en el zapatero. Por favor úsalas dentro del alojamiento.",
  },
  "신발장 옆 우드장 왼쪽 문을 열면 위쪽 칸 안쪽에 위치해 있습니다. 필요시에만 작동해주세요.": {
    en: "Open the left door of the wooden cabinet next to the shoe cabinet. It is inside the upper compartment. Please use it only when necessary.",
    zh: "打开鞋柜旁木柜的左侧门，位于上方隔层内。仅在必要时操作。",
    ja: "靴箱横の木製収納の左扉を開けると、上段の内側にあります。必要な時のみ操作してください。",
  },
  "가스 밸브 위치": {
    en: "Gas Valve",
    zh: "燃气阀位置",
    ja: "ガスバルブの位置",
    es: "Ubicación de la válvula de gas",
  },
  "가스렌지 옆에 위치해 있습니다.": {
    en: "It is located next to the gas stove.",
    zh: "位于燃气灶旁边。",
    ja: "ガスコンロの横にあります。",
    es: "Está junto a la cocina de gas.",
  },
  "🧺 소모품 & 비품": {
    en: "🧺 Supplies & Amenities",
    zh: "🧺 消耗品与备品",
    ja: "🧺 消耗品・備品",
    es: "🧺 Consumibles y artículos",
  },
  "수건 및 여분 화장지": {
    en: "Towels & Extra Toilet Paper",
    zh: "毛巾与备用卫生纸",
    ja: "タオル・予備トイレットペーパー",
    es: "Toallas y papel higiénico extra",
  },
  "욕실 내 수건장에 비치되어 있습니다.": {
    en: "They are stored in the towel cabinet inside the bathroom.",
    zh: "放置在浴室内的毛巾柜中。",
    ja: "浴室内のタオル収納にあります。",
    es: "Están en el mueble de toallas del baño.",
  },
  "부족할 때": {
    en: "If You Need More",
    zh: "不足时",
    ja: "不足している場合",
    es: "Si falta algo",
  },
  "필요한 물품이 부족할 경우 별도 문의해주세요.": {
    en: "If any supplies are running low, please contact us separately.",
    zh: "如有物品不足，请另行联系。",
    ja: "必要な物が足りない場合は、別途お問い合わせください。",
    es: "Si necesitas algún artículo adicional, por favor avísanos.",
  },
  "🌙 생활 규칙": {
    en: "🌙 House Rules",
    zh: "🌙 住宿规则",
    ja: "🌙 ハウスルール",
    es: "🌙 Reglas de la casa",
  },
  "늦은 시간에는 이웃을 배려하여 소음을 자제해주세요.": {
    en: "Please keep noise down late at night out of consideration for neighbors.",
    zh: "夜间请顾及邻居，尽量避免噪音。",
    ja: "夜遅い時間は近隣の方への配慮として、騒音をお控えください。",
    es: "Por favor mantén bajo el ruido por la noche para respetar a los vecinos.",
  },
  "객실 내 흡연은 절대 금지입니다.": {
    en: "Smoking is strictly prohibited inside the unit.",
    zh: "室内严禁吸烟。",
    ja: "室内での喫煙は絶対に禁止です。",
    es: "Está estrictamente prohibido fumar dentro del alojamiento.",
  },
  "반려동물은 동반하실 수 없습니다.": {
    en: "Pets are not allowed.",
    zh: "不可携带宠物。",
    ja: "ペットの同伴はできません。",
    es: "No se permiten mascotas.",
  },
  "☕ 주변 편의시설": {
    en: "☕ Nearby Conveniences",
    zh: "☕ 周边便利设施",
    ja: "☕ 周辺施設",
    es: "☕ Servicios cercanos",
  },
  "성내전통시장": {
    en: "Seongnae Traditional Market",
    zh: "城内传统市场",
    ja: "城内伝統市場",
    es: "Seongnae Traditional Market",
  },
  "도보 1분": {
    en: "1 minute on foot",
    zh: "步行1分钟",
    ja: "徒歩1分",
    es: "A 1 minuto caminando",
  },
  "GS25 천호옛길점": {
    en: "GS25 Cheonho Yetgil",
    zh: "GS25 Cheonho Yetgil",
    ja: "GS25 Cheonho Yetgil",
    es: "GS25 Cheonho Yetgil",
  },
  "도보 3분, 서울 강동구 천호옛12길 55": {
    en: "3 minutes on foot, 55 Cheonho-yet 12-gil, Gangdong-gu, Seoul",
    zh: "步行3分钟，首尔江东区千户옛12街55",
    ja: "徒歩3分、ソウル江東区千戸イェッ12ギル55",
    es: "A 3 minutos caminando, 55 Cheonho-yet 12-gil, Gangdong-gu, Seúl",
  },
  "이마트 천호점": {
    en: "emart Cheonho Branch",
    zh: "易买得千户店",
    ja: "emart 千戸店",
    es: "Emart Cheonho",
  },
  "도보 10분, 천호역 5번출구": {
    en: "10 minutes on foot, Cheonho Station Exit 5",
    zh: "步行10分钟，千户站5号出口",
    ja: "徒歩10分、千戸駅5番出口",
    es: "A 10 minutos caminando, salida 5 de la estación Cheonho",
  },
  "스타약국": {
    en: "Star Pharmacy",
    zh: "Star药局",
    ja: "スター薬局",
    es: "Star Pharmacy",
  },
  "일요일 영업 약국, 02-470-7904": {
    en: "Open on Sundays, 02-470-7904",
    zh: "周日营业药局，02-470-7904",
    ja: "日曜営業の薬局、02-470-7904",
    es: "Farmacia abierta los domingos, 02-470-7904",
  },
  "근처 맛집·카페": {
    en: "Nearby Restaurants & Cafes",
    zh: "附近餐厅与咖啡馆",
    ja: "近くの飲食店・カフェ",
    es: "Restaurantes y cafés cercanos",
  },
  "김치돼학교": {
    en: "Kimchi Dwaehakgyo",
    zh: "Kimchi Dwaehakgyo",
    ja: "Kimchi Dwaehakgyo",
    es: "Kimchi Dwaehakgyo",
  },
  "같은 건물 1층, 김치찌개": {
    en: "1st floor of the same building, kimchi stew",
    zh: "同一栋楼1层，泡菜锅",
    ja: "同じ建物の1階、キムチチゲ",
    es: "1er piso del mismo edificio, estofado de kimchi",
  },
  "담아내다덮밥": {
    en: "Damanaeda Deopbap",
    zh: "Damanaeda Deopbap",
    ja: "Damanaeda Deopbap",
    es: "Damanaeda Deopbap",
  },
  "같은 건물 1층, 덮밥": {
    en: "1st floor of the same building, rice bowls",
    zh: "同一栋楼1层，盖饭",
    ja: "同じ建物の1階、丼もの",
    es: "1er piso del mismo edificio, bowls de arroz",
  },
  "탁이담": {
    en: "Takidam",
    zh: "Takidam",
    ja: "Takidam",
    es: "Takidam",
  },
  "아이들이나 어르신들도 편안하게 즐길 수 있는 맑은 곰탕집입니다. 홀이 좁은 편이라 여러 명이 함께 가실 때는 예약을 추천드려요. 0507-1359-8617": {
    en: "A clear gomtang soup place that children and older guests can enjoy comfortably. The dining area is small, so a reservation is recommended for larger groups. 0507-1359-8617",
    zh: "这是一家清爽的牛骨汤店，孩子和长辈也能轻松享用。店内座位较少，多人前往时建议预约。0507-1359-8617",
    ja: "お子さまやご年配の方も食べやすい、澄んだコムタンのお店です。店内はやや狭いので、人数が多い場合は予約をおすすめします。0507-1359-8617",
    es: "Un lugar de gomtang claro y suave, cómodo también para niños y personas mayores. El salón es pequeño, así que si van varias personas recomendamos reservar. 0507-1359-8617",
  },
  "승룡이네집": {
    en: "Seungryonginejip",
    zh: "Seungryonginejip",
    ja: "Seungryonginejip",
    es: "Seungryonginejip",
  },
  "숙소가 위치한 '강풀만화거리'답게 만화책을 천천히 즐길 수 있는 카페입니다. 산책하다가 잠깐 쉬어가기 좋아요.": {
    en: "A cafe where you can browse comic books, fitting for Kang Full Cartoon Street where the stay is located. It is a nice place to rest during a walk.",
    zh: "正如住宿所在的“姜草漫画街”一样，这是一家可以慢慢看漫画书的咖啡馆。散步途中小憩很合适。",
    ja: "宿のある「カンプル漫画通り」らしく、漫画本をゆっくり楽しめるカフェです。散歩の途中に少し休むのにぴったりです。",
    es: "Como corresponde a la zona de Kang Full Cartoon Street, es un café donde puedes disfrutar cómics con calma. Es agradable para descansar un momento durante un paseo.",
  },
  "주가네쌀떡볶이": {
    en: "Jugane Ssal Tteokbokki",
    zh: "Jugane Ssal Tteokbokki",
    ja: "Jugane Ssal Tteokbokki",
    es: "Jugane Ssal Tteokbokki",
  },
  "깔끔하게 매운 소스와 딱 알맞게 쪄진 떡의 조화가 참 좋은 곳입니다. 가능하다면 노란밥과 함께 드셔보시길 추천드려요.": {
    en: "A lovely balance of clean, spicy sauce and perfectly steamed rice cakes. If you can, try it together with the yellow rice.",
    zh: "干净利落的辣酱和蒸得恰到好处的年糕搭配得很好。如果可以，推荐搭配黄饭一起吃。",
    ja: "すっきり辛いソースと、ちょうどよく蒸されたお餅の相性がとても良いお店です。できれば黄色いご飯と一緒に召し上がってみてください。",
    es: "Un sitio muy rico por la combinación de una salsa picante y limpia con pasteles de arroz cocidos justo en su punto. Si puedes, te recomendamos probarlo con el arroz amarillo.",
  },
  "래빗도넛": {
    en: "Rabbit Donut",
    zh: "Rabbit Donut",
    ja: "Rabbit Donut",
    es: "Rabbit Donut",
  },
  "트렌디한 도넛을 다양하게 즐길 수 있는 곳입니다. 쫄깃한 식감보다는 포실하고 부드러운 스타일을 좋아하신다면 잘 맞으실 거예요.": {
    en: "A place with a fun variety of trendy doughnuts. If you prefer a fluffy, soft style rather than a chewy texture, this should suit you well.",
    zh: "这里可以品尝多种时髦的甜甜圈。如果您喜欢松软绵密而不是有嚼劲的口感，应该会很合适。",
    ja: "トレンド感のあるドーナツをいろいろ楽しめるお店です。もちもちより、ふんわり柔らかい食感がお好きな方に合うと思います。",
    es: "Un lugar con varios donuts modernos. Si te gustan más esponjosos y suaves que chiclosos, probablemente te va a encantar.",
  },
  "💬 호스트 연락 & 문제 해결": {
    en: "💬 Host Contact & Help",
    zh: "💬 房东联系与问题处理",
    ja: "💬 ホスト連絡・困った時",
    es: "💬 Contacto del anfitrión y ayuda",
  },
  "호스트 연락처는 체크인 메시지로 별도 전달드립니다.": {
    en: "The host contact will be shared separately in your check-in message.",
    zh: "房东联系方式会在入住消息中另行提供。",
    ja: "ホスト連絡先はチェックインメッセージで別途お伝えします。",
    es: "El contacto del anfitrión se enviará por separado en el mensaje de check-in.",
  },
  "비상 상황의 경우 별도 전달된 연락처로 전화주세요. 그 외 일상적인 문의는 오전 9시부터 오후 7시까지 에어비앤비 메시지 또는 문자로 보내주시면 가능한 빠르게 답신드리겠습니다.": {
    en: "In an emergency, please call the contact shared separately. For everyday questions, please send an Airbnb message or text between 9:00 AM and 7:00 PM, and we will reply as soon as possible.",
    zh: "如遇紧急情况，请拨打另行提供的联系方式。其他日常问题请在上午9点至晚上7点之间通过Airbnb消息或短信联系我们，我们会尽快回复。",
    ja: "緊急時は別途お伝えした連絡先へお電話ください。その他の日常的なお問い合わせは、午前9時から午後7時までにAirbnbメッセージまたはSMSでお送りいただければ、できるだけ早く返信します。",
    es: "En caso de emergencia, llama al número de contacto enviado por separado. Para consultas normales, envía un mensaje por Airbnb o SMS entre las 9:00 a. m. y las 7:00 p. m.; responderemos lo antes posible.",
  },
  "즐거운 시간 보내세요. 필요한 내용은 검색하거나 각 섹션을 펼쳐 확인하실 수 있습니다. ✨": {
    en: "We hope you have a lovely stay. You can search or open each section whenever you need something. ✨",
    zh: "祝您入住愉快。需要时可以搜索，或展开各个部分查看。✨",
    ja: "どうぞ楽しい時間をお過ごしください。必要な内容は検索したり、各セクションを開いて確認できます。✨",
    es: "Que tengas una estadía muy agradable. Puedes buscar lo que necesites o abrir cada sección para revisarla. ✨",
  },
};

let toastTimer;
let currentLang = localStorage.getItem("guest-guide-lang") || "ko";
if (!ui[currentLang]) currentLang = "ko";

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 1800);
}

function normalise(text) {
  return text.toLowerCase().replace(/\s+/g, "");
}

function rememberOriginalText() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  nodes.forEach((node) => {
    const text = node.nodeValue.trim();
    if (text) node.parentElement.dataset.koText = text;
  });
}

function translateText(koText, lang) {
  if (lang === "ko") return koText;
  return translations[koText]?.[lang] || koText;
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("guest-guide-lang", lang);
  document.documentElement.lang = lang;
  document.title = ui[lang].title;
  searchInput.placeholder = ui[lang].searchPlaceholder;
  emptyState.textContent = ui[lang].empty;
  document.querySelector(".language-switcher").setAttribute("aria-label", ui[lang].ariaLanguage);
  document.querySelector(".brand").setAttribute("aria-label", ui[lang].homeAria);

  document.querySelectorAll("[data-ko-text]").forEach((element) => {
    element.textContent = translateText(element.dataset.koText, lang);
  });

  languageButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.lang === lang));
  });

  updateExpandButton();
  filterCards();
}

function updateExpandButton() {
  const hasClosed = cards.some((card) => !card.hidden && !card.open);
  expandButton.textContent = hasClosed ? ui[currentLang].expand : ui[currentLang].collapse;
}

function filterCards() {
  const query = normalise(searchInput.value);
  let visibleCount = 0;

  cards.forEach((card) => {
    const haystack = normalise(`${card.textContent} ${card.dataset.tags || ""}`);
    const isMatch = !query || haystack.includes(query);
    card.hidden = !isMatch;
    if (isMatch) {
      visibleCount += 1;
      if (query) card.open = true;
    }
  });

  emptyState.hidden = visibleCount > 0;
  updateExpandButton();
}

rememberOriginalText();
setLanguage(currentLang);

searchInput.addEventListener("input", filterCards);

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

expandButton.addEventListener("click", () => {
  const hasClosed = cards.some((card) => !card.hidden && !card.open);
  cards.forEach((card) => {
    if (!card.hidden) card.open = hasClosed;
  });
  updateExpandButton();
});

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const value = button.dataset.copy;
    try {
      await navigator.clipboard.writeText(value);
      showToast(ui[currentLang].copied);
    } catch {
      showToast(value);
    }
  });
});

document.querySelectorAll(".guide-card").forEach((card) => {
  card.addEventListener("toggle", updateExpandButton);
});
