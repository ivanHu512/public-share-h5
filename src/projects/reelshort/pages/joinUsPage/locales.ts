/**
 * en - 英语；es - 西班牙语; pt - 葡萄牙语; th - 泰语;
 * in- 印尼语; de - 德语; fr-法语; hi - 印地语; fil - 菲律宾语;
 * tr - 土耳其语; ja - 日语; ko - 韩语; ru - 俄语; zh - 中文;
 */
import _ from 'lodash'
import defaultLangText from '../../locales'

const langText: any = {
  en: {
    headline: 'Join Us',
    title: 'Join ReelShort',
    subhead:
      "ReelShort is seeking innovative and passionate individuals to help shape the future of short series. If you're dedicated to creating impactful stories that resonate with a global female audience, we'd love for you to join our team. Together, we can collaborate, innovate, and leave a lasting mark in the world of short series.",
    copy_suc: 'Copied, paste to email contact us',
    copy_fail: 'Copy failed',
    label_text: 'Join us now: ',
    apply_here: 'Apply Here'
  },
  es: {
    headline: 'únete a ReelShort',
    title: 'Únete a ReelShort',
    subhead:
      'ReelShort busca personas innovadoras y apasionadas para ayudar a dar forma al futuro de las series cortas. Si te dedicas a crear historias impactantes que resuenen en una audiencia femenina global, nos encantaría que te unieras a nuestro equipo. Juntos podemos colaborar, innovar y dejar una huella duradera en el mundo de las series cortas.',
    label_text: 'Únete a nosotros ahora: ',
    apply_here: 'Aplica aquí'
  },
  pt: {
    headline: 'Junte-se ao ReelShort',
    title: 'Junte-se ao ReelShort',
    subhead:
      'O ReelShort está buscando pessoas inovadoras e apaixonadas para ajudar a moldar o futuro das séries curtas. Se você se dedica a criar histórias impactantes que ressoam com o público feminino global, adoraríamos ter você na nossa equipe. Juntos, podemos colaborar, inovar e deixar uma marca duradoura no mundo das séries curtas.',
    label_text: 'Junte-se a nós agora: ',
    apply_here: 'Inscreva-se aqui'
  },
  th: {
    headline: 'เข้าร่วม ReelShort',
    title: 'เข้าร่วม ReelShort',
    subhead:
      'ReelShort กำลังมองหาผู้ที่มีความคิดสร้างสรรค์และความหลงใหลในการร่วมสร้างสรรค์อนาคตของซีรีส์สั้นไปด้วยกัน หากคุณทุ่มเทในการสร้างเรื่องราวที่ทรงพลังและเชื่อมโยงกับผู้ชมเพศหญิงทั่วโลก เราอยากให้คุณมาร่วมเป็นส่วนหนึ่งของทีมเรา มาร่วมกันสร้างสรรค์ นำเสนอไอเดียใหม่ๆ และสร้างความเปลี่ยนแปลงในโลกของซีรีส์สั้นด้วยกันเถอะ',
    label_text: 'เข้าร่วมกับเราตอนนี้: ',
    apply_here: 'สมัครที่นี่'
  },
  in: {
    headline: 'Bergabunglah dengan ReelShort',
    title: 'Bergabunglah dengan ReelShort',
    subhead:
      'ReelShort mencari individu-individu yang inovatif dan bersemangat untuk membantu membentuk masa depan serial pendek. Jika Anda berdedikasi untuk menciptakan cerita yang luar biasa yang beresonansi dengan penonton wanita global, kami ingin Anda bergabung dengan tim kami. Bersama-sama, kita bisa berkolaborasi, berinovasi, dan meninggalkan jejak yang abadi di dunia serial pendek.',
    label_text: 'Bergabunglah dengan kami sekarang: ',
    apply_here: 'Lamar di sini'
  },
  de: {
    headline: 'ReelShort beitreten',
    title: 'Werde Mitglied bei ReelShort!',
    subhead:
      'ReelShort sucht innovative und leidenschaftliche Menschen, die die Zukunft von Kurzserien mitgestalten wollen. Wenn du dich dafür einsetzt, beeindruckende Geschichten zu kreieren, die ein weltweites weibliches Publikum ansprechen, würden wir uns freuen, wenn du Teil unseres Teams wirst. Gemeinsam können wir zusammenarbeiten, innovativ sein und einen bleibenden Eindruck in der Welt der Kurzserien hinterlassen.',
    label_text: 'Treten Sie uns jetzt bei: ',
    apply_here: 'Jetzt bewerben'
  },
  fr: {
    headline: 'Rejoindre ReelShort',
    title: 'Rejoignez ReelShort',
    subhead:
      "ReelShort recherche des personnes créatives et passionnées pour contribuer à façonner l'avenir des séries courtes. Si vous avez à cœur de donner vie à des histoires captivantes qui résonnent auprès d'un public féminin international, nous serions ravis que vous rejoigniez notre équipe. Ensemble, nous pouvons innover, coopérer et apporter une contribution durable au secteur des séries courtes.",
    label_text: 'Rejoignez-nous dès maintenant : ',
    apply_here: 'Postulez ici'
  },
  hi: {
    headline: 'हमारे साथ जुड़ें',
    title: 'ReelShort में शामिल हों',
    subhead:
      'ReelShort नवोन्मेषी और उत्साही व्यक्तियों की तलाश कर रहा है जो शॉर्ट सीरीज के भविष्य को आकार देने में मदद कर सकें। यदि आप वैश्विक महिला दर्शकों के साथ गूंजने वाली प्रभावशाली कहानियाँ बनाने के लिए समर्पित हैं, तो हम चाहते हैं कि आप हमारी टीम में शामिल हों। मिलकर, हम सहयोग कर सकते हैं, नवाचार कर सकते हैं, और शॉर्ट सीरीज की दुनिया में एक स्थायी छाप छोड़ सकते हैं।',
    label_text: 'अभी हमारे साथ जुड़ें: ',
    apply_here: 'यहाँ आवेदन करें'
  },
  fil: {
    headline: 'Sumali sa Amin',
    title: 'Sumali sa ReelShort',
    subhead:
      'Ang ReelShort ay naghahanap ng mga makabago at masigasig na indibidwal upang makatulong sa paghubog ng hinaharap ng maikling serye. Kung ikaw ay nakatuon sa paglikha ng mga makabuluhang kwento na umuugong sa pandaigdigang babaeng audience, nais naming makasama ka sa aming koponan. Sama-sama, maaari tayong mag-collaborate, mag-innovate, at mag-iwan ng pangmatagalang marka sa mundo ng maikling serye.',
    label_text: 'Sumali sa amin ngayon: ',
    apply_here: 'Mag-apply dito'
  },
  tr: {
    headline: 'Bize Katılın',
    title: "ReelShort'a Katılın",
    subhead:
      'ReelShort, kısa dizilerin geleceğini şekillendirmeye yardımcı olacak yenilikçi ve tutkulu bireyler arıyor. Küresel kadın izleyicilerle rezonansa giren etkili hikayeler yaratmaya adanmışsanız, ekibimize katılmanızı çok isteriz. Birlikte, işbirliği yapabilir, yenilikler geliştirebilir ve kısa diziler dünyasında kalıcı bir iz bırakabiliriz.',
    label_text: 'Şimdi bize katılın: ',
    apply_here: 'Buradan başvurun'
  },
  ja: {
    headline: 'ご参加ください',
    title: 'ReelShortチームに参加しよう',
    subhead:
      'ReelShortチームは、ショートドラマ制作の未来を共に切り拓く、創造性と情熱溢れる新しい仲間を募集しています！ストーリーテリングに情熱を燃やし、世界中の女性視聴者に深い感動を与える作品作りに携わりたいという方、私たちと一緒に働きませんか？共に革新を起こし、協力し合い、ショートドラマの世界に、あなただけの足跡を残しましょう！',
    label_text: '今すぐ参加：',
    apply_here: 'こちらから応募'
  },
  ko: {
    headline: 'ReelShort와 함께하기',
    title: 'ReelShort와 함께 하세요',
    subhead:
      'ReelShort는 단편 시리즈의 미래를 형성하는 데 도움이 되는 혁신적이고 열정적인 분들을 찾고 있습니다. 전 세계 여성 청중에게 공감을 불러일으키는 영향력 있는 스토리를 만드는 데 전념하고 계신다면 저희 팀에 합류해 주세요. 함께 협력하고 혁신하며 단편 시리즈의 세계에 오래도록 남을 흔적을 남길 수 있습니다.',
    label_text: '지금 함께하세요: ',
    apply_here: '여기에서 지원하세요'
  },
  ru: {
    headline: 'Карьерные возможности',
    title: 'Присоединяйтесь к команде ReelShort!',
    subhead:
      'Команда ReelShort ищет новые таланты, которые горят свои делом и полны захватывающих идей будущих коротких сериалов. Если вы любите рассказывать истории и хотите, чтобы ваше творение увидел весь мир, присоединяйтесь к нам! Вместе мы оставим след в истории!',
    label_text: 'Присоединяйтесь к нам сейчас: ',
    apply_here: 'Подать заявку здесь'
  },
  'zh-TW': {
    headline: '加入我們',
    title: '加入ReelShort',
    subhead:
      'ReelShort正在尋找創新且充滿熱情的人才來幫助塑造短劇的未來。如果您致力於創作能與全球女性觀眾共鳴的有影響力的故事，我們希望您能加入我們的團隊。讓我們一起合作、創新，在短劇世界中留下持久的印記。',
    label_text: '立即加入我們：',
    apply_here: '點此申請'
  },
  it: {
    headline: 'Unisciti a Noi',
    title: 'Unisciti al team di ReelShort',
    subhead:
      'Il team di ReelShort sta cercando nuovi membri creativi e appassionati per guidare insieme il futuro della creazione di cortometraggi. Se ami raccontare storie e desideri avere un impatto profondo sulle spettatrici di tutto il mondo, unisciti a noi! Insieme possiamo innovare, collaborare e lasciare il nostro segno nel mondo dei cortometraggi.',
    copy_suc: "Copiato, incolla nell'email per contattarci",
    copy_fail: 'Copia fallita',
    label_text: 'Unisciti a noi ora: ',
    apply_here: 'Candidati ora'
  },
  ar: {
    headline: 'انضم إلينا',
    title: 'انضم إلى ReelShort',
    subhead: `تسعى ReelShort إلى جذب أفراد مبتكرين ومتحمسين للمساعدة في تشكيل مستقبل المسلسلات القصيرة.إذا كنت مكرسًا لإنشاء قصص مؤثرة تتناغم مع جمهور نسائي عالمي، فنحن نحب أن تنضم إلى فريقنا.معًا، يمكننا التعاون والابتكار وترك بصمة دائمة في عالم المسلسلات القصيرة.`,
    copy_suc: 'تم النسخ، قم بلصقها في البريد الإلكتروني للتواصل معنا',
    copy_fail: 'فشل النسخ',
    label_text: 'انضم إلينا الآن: ',
    apply_here: 'قدم الآن'
  },
  pl: {
    headline: 'Dołącz Do Nas',
    title: 'Dołącz Do ReelShort',
    subhead: `ReelShort poszukuje pomysłowych i pełnych zaangażowania osób, które pomogą kształtować przyszłość seriali krótkometrażowych. Jeśli Twoim celem jest tworzenie angażujących historii, które rezonują z globalną żeńską publicznością, chcielibyśmy zobaczyć Cię w naszym zespole. Razem możemy współpracować, wprowadzać innowacje i pozostawić trwały ślad w świecie seriali krótkometrażowych.`,
    copy_suc: 'Skopiuj, wklej do wiadomości kontaktu z nami',
    copy_fail: 'Kopiowanie nie powiodło się',
    label_text: 'Dołącz do nas:',
    apply_here: 'Aplikuj Tutaj'
  },
  ro: {
    headline: 'Alătură-te nouă',
    title: 'Alătură-te ReelShort',
    subhead:
      'ReelShort caută persoane inovatoare și pasionate pentru a contribui la modelarea viitorului serialelor scurte. Dacă ești dedicat creării de povești cu impact care rezonează cu un public feminin global, ne-ar plăcea să te alături echipei noastre. Împreună, putem colabora, inova și lăsa o amprentă durabilă în lumea serialelor scurte.',
    copy_suc: 'Copiat, lipește în e-mail pentru a ne contacta.',
    copy_fail: 'Copiere eșuată',
    label_text: 'Alătură-te acum:',
    apply_here: 'Aplică aici'
  },
  cs: {
    headline: 'Přidejte se k nám',
    title: 'Připojte se k ReelShortu',
    subhead: `ReelShort hledá inovativní a vášnivé lidi, kteří by pomohli utvářet budoucnost krátkých seriálů. Pokud se věnujete tvorbě působivých příběhů, které osloví ženské publikum po celém světě, rádi vás přijmeme do našeho týmu. Společně můžeme spolupracovat, inovovat a zanechat trvalou stopu ve světě krátkých seriálů.`,
    copy_suc: 'Zkopírováno, vložit do e-mailu, kontaktujte nás',
    copy_fail: 'Kopírování se nezdařilo',
    label_text: 'Přidejte se k nám nyní:',
    apply_here: 'Přihlaste se zde'
  },
  bg: {
    headline: 'Присъединете се към нас',
    title: 'Присъединете се към ReelShort',
    subhead: `ReelShort търси иновативни и страстни хора, които да помогнат за оформянето на бъдещето на късометражните сериали. Ако сте отдадени на създаването на въздействащи истории, които резонират с глобална женска аудитория, ще се радваме да се присъедините към нашия екип. Заедно можем да си сътрудничим, да внедряваме иновации и да оставим трайна следа в света на късометражните сериали.`,
    copy_suc: 'Копирано, поставете в имейл, за да се свържете с нас',
    copy_fail: 'Копирането не бе успешно',
    label_text: 'Присъединете се към нас сега:',
    apply_here: 'Кандидатствайте тук'
  },
  vi: {
    headline: 'Přidejte se k nám',
    title: 'Připojte se k ReelShortu',
    subhead: `ReelShort hledá inovativní a vášnivé lidi, kteří bởi pomohli utvářet budoucnost krátkých seriálů. Pokud se věnujete tvorbě působivých příběhů, které osloví ženské publikum po celém světě, rádi vás přijmeme do našeho tímu. Společně můžeme spolupracovat, inovovat a zanechat trvalou stopu ve světě krátkých seriálů.`,
    copy_suc: 'Zkopírováno, vložit do e-mailu, liên hệ với bạn',
    copy_fail: 'Kopírování se nezdařilo',
    label_text: 'Přidejte se k nám nyní:',
    apply_here: 'Přihlaste se zde'
  }
}

export default langText

const currentLangText = _.merge({}, langText, defaultLangText)
export const i18n = (key: string, ...args: string[]): string => {
  const lang = localStorage?.getItem?.('lang') || 'en'
  let translatedText = currentLangText[lang]?.[key] || currentLangText.en[key]

  // 替换特殊表示符 $1, $2, ...
  args.forEach((arg, index) => {
    const placeholder = `$${index + 1}`
    translatedText = translatedText?.replace(placeholder, arg)
  })

  return translatedText
}
