import { Activity, Story, TaskItem, QuizQuestion } from '../types';

export const INITIAL_LOVE_WORDS: string[] = [
  "Seninle vakit geçirmek, günümün en güzel anı.",
  "Fikrin benim için çok değerli, iyi ki paylaştın.",
  "Bu konuda gösterdiğin çabayı görüyor ve gönülden takdir ediyorum.",
  "İyi ki bizim ailemizdensin, varlığın bize güç veriyor.",
  "Bugün sana nasıl yardımcı olabilirim? Yanındayım.",
  "Varlığın ve gülümsemen evimize huzur veriyor.",
  "Hatalarımız olabilir, önemli olan el ele verip birlikte aşabilmemiz.",
  "Senin mutluluğun, hepimizin neşesi.",
  "Bugün seni dinlemek için sabırsızlanıyorum."
];

export const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: 'act-1',
    title: "Duygu Pandomimi (Sessiz Sinema)",
    day: "Pazartesi",
    category: "Oyun",
    duration: "15 Dk",
    iconName: "Smile",
    desc: "Küçük kağıtlara 'mutlu, üzgün, kızgın, şaşırmış, korkmuş, gururlu, kıskanç' gibi duygular yazın. Sırayla kağıt çekip, konuşmadan sadece mimik ve beden diliyle o duyguyu anlatmaya çalışın.",
    rules: [
      "Her oyuncunun anlatmak için 1 dakikası vardır.",
      "Ses çıkarmak ve dudak okutmak kesinlikle yasaktır.",
      "En çok doğru tahmin eden kişi 'Haftanın Duygu Dedektifi' unvanını kazanır."
    ],
    benefit: "Sözel olmayan ipuçlarıyla duyguları tanıma ve ifade etme becerisini geliştirir. Duygularını kelimelere dökmekte zorlanan bireyler ve çocuklar için harika bir köprüdür."
  },
  {
    id: 'act-2',
    title: "Günün En'leri Masası",
    day: "Salı",
    category: "Sohbet",
    duration: "10 Dk",
    iconName: "Sparkles",
    desc: "Akşam yemeğinde veya çay saatinde herkes sırayla gününün 'En komik', 'En zor' ve 'En gurur verici' anını içtenlikle paylaşır.",
    rules: [
      "Konuşan kişinin sözü asla kesilmez ve telefonlar uzakta tutulur.",
      "Yargılamak, eleştirmek veya akıl vermek yasaktır; sadece şefkatle dinlenir.",
      "Gönüllü olmayan kişi zorlanmaz, bir sonraki tura 'pas' diyebilir."
    ],
    benefit: "Aile üyelerinin birbirlerinin günlük yaşantılarından ve hislerinden haberdar olmasını sağlar, aile içi empatiyi güçlendirir."
  },
  {
    id: 'act-3',
    title: "Birlikte Mutfak & Kurabiye Zamanı",
    day: "Çarşamba",
    category: "Etkinlik",
    duration: "45 Dk",
    iconName: "Utensils",
    desc: "Ailecek kolay bir tarif (örneğin tarçınlı kurabiye veya meyveli kek) seçin ve mutfakta iş bölümü yaparak birlikte hazırlayın.",
    rules: [
      "Herkesin somut bir görevi olmalı (karıştırma, dökme, şekil verme).",
      "Mutfak biraz kirlenebilir, temizlik de şarkılar eşliğinde ortak yapılmalıdır.",
      "Eğlenmek ve sohbet etmek esastır; mükemmel pasta ustası olmak şart değil!"
    ],
    benefit: "İş birliği, dayanışma ve ortak üretim hazzını yaşatır. Birlikte hazırlanan yiyeceklerin tadı hafızalarda tatlı anılar bırakır."
  },
  {
    id: 'act-4',
    title: "Ev İçi Sevgi Hazine Avı",
    day: "Perşembe",
    category: "Oyun",
    duration: "30 Dk",
    iconName: "Compass",
    desc: "Evin farklı köşelerine küçük sevgi notları ve ipuçları saklayın. Her ipucu bir sonrakini göstersin ve finalde tüm ailenin paylaşacağı küçük bir sürpriz olsun.",
    rules: [
      "İpuçları tehlikeli veya kırılabilir eşyaların arasına saklanmamalıdır.",
      "Büyükler küçükler için, çocuklar da ebeveynler için küçük teşekkür notları yazabilir.",
      "Birlikte ipuçlarını çözerek ilerlenmelidir."
    ],
    benefit: "Problem çözme ve analitik düşünmeyi teşvik eder; evin her köşesine neşe ve merak duygusu yayar."
  },
  {
    id: 'act-5',
    title: "Aile Albümü ve Hatıra Saati",
    day: "Cuma",
    category: "Sohbet",
    duration: "20 Dk",
    iconName: "Camera",
    desc: "Eski fotoğraf albümlerini veya dijital arşiv fotoğraflarını açın. Anne, baba veya büyükanne-büyükbabaların gençlik anılarını, komik olayları dinleyin.",
    rules: [
      "Herkes bir fotoğraf seçip o an ile ilgili hislerini veya merak ettiği soruyu sorsun.",
      "O dönemin şartları, çocukluk oyunları ve unutulmaz anlar yad edilir."
    ],
    benefit: "Kuşaklar arası bağı perçinler, aidiyet ve köklenme hissi verir. Ailesinin geçmişini bilen çocuklar hayata daha güvenle tutunur."
  },
  {
    id: 'act-6',
    title: "Ev Yapımı Aile Sinema Gecesi",
    day: "Cumartesi",
    category: "Etkinlik",
    duration: "90 Dk",
    iconName: "Film",
    desc: "Ailecek izlenecek sıcak bir aile filmi seçin. Salonu sinemaya çevirin: Işıkları kısın, mısır patlatın ve bilet hazırlayın.",
    rules: [
      "Film seçimi demokratik oylamayla ortak kararlaştırılır.",
      "Film sırasında telefonlar başka bir odada sessizde bekletilir.",
      "Film bittikten sonra 10 dakika 'En çok hangi karakteri sevdik ve neden?' sohbeti yapılır."
    ],
    benefit: "Ortak kültürel paylaşım sağlar. Film üzerine konuşmak farklı bakış açılarını anlamayı ve eleştirel düşünmeyi kolaylaştırır."
  },
  {
    id: 'act-7',
    title: "Huzurlu Sessiz Okuma Saati",
    day: "Pazar",
    category: "Etkinlik",
    duration: "30 Dk",
    iconName: "BookOpen",
    desc: "Televizyon ve telefonları kapatın. Herkes kendi kitabını, 'Aile Dediğin' kitabını veya dergisini alsın. Ilık bir çay eşliğinde sessizlik içinde okuyun.",
    rules: [
      "Süre bitene kadar teknolojik aletlere bakılmaz.",
      "Süre bitiminde herkes okuduğu sayfadan en çok etkilendiği bir cümleyi veya fikri paylaşır."
    ],
    benefit: "Kitap okuma alışkanlığını ortak bir aile ritüeline dönüştürür. Birlikte sessizliği huzurla paylaşabilmek aile bağlarını derinleştirir."
  }
];

export const INITIAL_STORIES: Story[] = [
  {
    id: 'story-0',
    title: "Önsöz",
    author: "Hümeyra EKMEN",
    isForeword: true,
    content: `
Kıymetli Aileler,

"Aile Dediğin" kitabı, öğrencilerimizin tertemiz yüreklerinden süzülen; aile olmanın sıcaklığını, zorluklarını, samimiyetini ve güzelliklerini anlatan eşsiz hikayelerden oluşuyor. Bu kitap sadece okunup rafa kaldırılmak için değil; üzerinde konuşulmak, birbirimizi daha derinlemesine anlamak ve bağlarımızı güçlendirmek için kaleme alındı.

Modern çağın hızına kapılıp birbirimize vakit ayıramadığımız şu günlerde, bu kitaptaki her bir hikaye, kendi ailenizden bir parça bulabileceğiniz sıcacık birer ayna niteliğindedir. Bir hikayede kendi geçmişinize dalacak, diğerinde çocuklarınızın dünyasına şefkatli bir pencere açacaksınız.

Sizlerden ricamız; bu portalı bir aile rehberi olarak kullanmanızdır. Hikayeleri ailecek, göz teması kurarak, televizyonu ve telefonları bir kenara bırakıp **kitabınızdan** birlikte okuyun. Ardından burada hazırladığımız "Aile Sohbeti" başlıkları ve soruları üzerine çayınızı yudumlarken konuşun.

İletişiminizin, muhabbetinizin ve sevginizin daim olması dileğiyle... Keyifli okumalar ve sıcacık sohbetler dilerim.
    `,
    questions: [],
    chatTopic: "Ailenin hayatımızdaki yeri, sevgi ocağımızın bize kattığı güven ve huzur."
  },
  {
    id: 'story-1',
    title: "Mirasın Gerçek Sahibi",
    author: "Ertuğrul ERDEM",
    content: `
"Mirasın Gerçek Sahibi" hikayesinde, nesiller boyu aktarılan manevi değerlerin ve hatıraların, maddi hiçbir zenginlikle ölçülemeyeceği duygusu işlenir. Dedelerden torunlara kalan en büyük miras; dürüstlük, sevgi, birlikte geçirilen zaman ve kıymetli hayat tecrübeleridir.
    `,
    questions: [
      "Sizce teknoloji ve ekranlar, aile mirası ve kıymetli anıları bize unutturuyor olabilir mi? Neden?",
      "Evimizde büyüklerimizden kalan, maddi değeri olmasa da manevi değeri paha biçilemez hangi eşyalar veya hatıralar var?",
      "Hikayedeki kahraman manevi emaneti neden satmadı? Sizin için hiçbir parayla satılamayacak değerler nelerdir?"
    ],
    chatTopic: "Aile yadigarları, geçmişten günümüze taşıdığımız manevi değerler ve hatıraların hayatımızdaki yeri."
  },
  {
    id: 'story-2',
    title: "Keşke Her Gün Pazar Olsa",
    author: "Büşra ERYİĞİT",
    content: `
Haftanın telaşı, okul ve iş koşturmacası arasında kaybolan zamanın ardından pazar gününün getirdiği o sakin, kahkahalı ve birlikte yapılan uzun kahvaltıların özlemini anlatır. Aile olmanın en saf hali, bir arada olmanın huzurudur.
    `,
    questions: [
      "Hafta içi koşturmacasında birbirimize daha fazla vakit ayırmak için günlük rutinlerimizde ne gibi küçük değişiklikler yapabiliriz?",
      "Sizin evinizde de 'Keşke her gün o gün olsa' dediğiniz özel bir gün, saat veya ritüel var mı?",
      "Ailecek yaptığınız, en çok eğlendiğiniz favori pazar günü etkinliğiniz nedir?"
    ],
    chatTopic: "Hızla akan hayatın içinde aileye bilinçli olarak 'kaliteli zaman' ayırmanın yolları."
  },
  {
    id: 'story-3',
    title: "Duvardaki Saat",
    author: "Eslem Beyza EKMEN",
    content: `
Zamanın nasıl akıp gittiğini, duvarda asılı bir saatin tik-takları eşliğinde fark eden bir ailenin hikayesi... İletişim koptuğunda zaman sanki donar, sevgiyle konuşulduğunda ise anlar sonsuzlaşır.
    `,
    questions: [
      "Evinizde birlikte vakit geçirirken zamanın nasıl geçtiğini unuttuğunuz anlar hangileridir?",
      "Hikayede saat neden durmuş olabilir? Aile bağlarının zayıflaması bir evin ruhunu nasıl etkiler?",
      "Telefon ve ekran kullanımını evde dengede tutmak için ailecek hangi yeni kuralları koyabiliriz?"
    ],
    chatTopic: "Teknolojinin aile içi iletişimi bölmesine izin vermemek ve 'ekransız zaman' dilimleri oluşturmak."
  },
  {
    id: 'story-4',
    title: "Zaman Yolculuğu ve Aile Hasreti",
    author: "Sahra KARAKAYA",
    content: `
Geleceğe ya da geçmişe gitmek isteyen değil; yanında olan ailesinin kıymetini an be an yaşayan insanların hikayesi. En büyük zenginlik, şu an yan yana olabilmektir.
    `,
    questions: [
      "Bir zaman makineniz olsa, ailenizle geçirdiğiniz hangi mutlu anıya geri dönüp o günü tekrar yaşamak isterdiniz? Neden o anı?",
      "Birbirimizin değerini yan yanayken ve bugünü yaşarken bilmek için bugün birbirimize ne söylemek istersiniz?",
      "Gelecekte 'İyi ki yapmışız' diyeceğimiz güzel anıları bugünden oluşturmak için bu hafta sonu ne yapalım?"
    ],
    chatTopic: "Anı yaşamak, sahip olduklarımızın şükrünü bilmek ve aile üyelerine duyulan sevgiyi ertelemeden ifade etmek."
  }
];

export const INITIAL_TASKS: TaskItem[] = [
  { id: 1, text: "Akşam yemeği sonrası sofrayı toplamak ve masayı silmek", assignees: [], done: false, category: "Mutfak" },
  { id: 2, text: "Haftalık aile toplantısı için ıhlamur ve kurabiyeleri hazırlamak", assignees: [], done: false, category: "Etkinlik" },
  { id: 3, text: "Günün sevgi sözcüğünü panoya yazmak", assignees: [], done: true, category: "Rutin" },
  { id: 4, text: "Oturma odasındaki kitap ve oyunları düzenlemek", assignees: [], done: false, category: "Düzen" }
];

export const COMMUNICATION_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    sentence: "Beni hiç dinlemiyorsun, sürekli telefonuna bakıyorsun!",
    type: 'sen',
    explanation: "Suçlayıcı ve genelleştiricidir ('hiç', 'sürekli'). Karşı tarafı savunmaya ve tepki vermeye iter.",
    improvedVersion: "Ben konuşurken ekrana baktığında beni önemsemediğini hissediyorum ve üzülüyorum."
  },
  {
    id: 2,
    sentence: "Yemekten sonra sofrayı toplamama yardım ettiğinde kendimi çok değerli ve rahatlamış hissediyorum.",
    type: 'ben',
    explanation: "Mükemmel bir 'Ben Dili' örneğidir. Davranışın olumlu hissini ve değerini açıkça paylaşır."
  },
  {
    id: 3,
    sentence: "Her zaman odanı darmadağınık bırakıyorsun, ne kadar sorumsuz birisin!",
    type: 'sen',
    explanation: "Kişiliğe doğrudan etiket yapıştırır ('sorumsuz') ve genelleme yapar ('her zaman'). İletişimi kilitler.",
    improvedVersion: "Odadaki eşyaları yerde görünce düzen kurmakta zorlanıyorum ve yoruluyorum. Lütfen toplar mısın?"
  },
  {
    id: 4,
    sentence: "Sözün bittiğinde fikrimi söylemek için sabırsızlandım, bitirmeni beklemek bana iyi geldi.",
    type: 'ben',
    explanation: "Kendi duygusunu ve durumunu sakin ve yapıcı şekilde aktarır."
  },
  {
    id: 5,
    sentence: "Sen her şeyi abartıyorsun, amma alıngansın!",
    type: 'sen',
    explanation: "Karşı tarafın duygusunu küçümser ve suçlar.",
    improvedVersion: "Bu durumun seni bu kadar incittiğini fark edememiştim, anlatırsan daha iyi anlamak isterim."
  }
];

export const DEFAULT_MEMBERS = [
  { id: '1', name: 'Anne', role: 'Ebeveyn', avatarColor: 'bg-rose-500' },
  { id: '2', name: 'Baba', role: 'Ebeveyn', avatarColor: 'bg-indigo-500' },
  { id: '3', name: 'Çocuk', role: 'Öğrenci', avatarColor: 'bg-amber-500' }
];
