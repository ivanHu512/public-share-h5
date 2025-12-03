/**
 * en - 英语；es - 西班牙语; pt - 葡萄牙语; th - 泰语;
 * in- 印尼语; de - 德语; fr-法语; hi - 印地语; fil - 菲律宾语;
 * tr - 土耳其语; ja - 日语; ko - 韩语; ru - 俄语; zh - 中文;
 */
import _ from 'lodash'
import defaultLangText from '../../locales'

const langText: any = {
  en: {
    title: 'Content Collaboration',
    dear: 'To Our Prospective Partner:',
    desc: "Greetings! \nThank you for your interest in ReelShort! We're constantly seeking outstanding partners to help us expand the realm of short series. If you're interested in collaborating, here are some potential areas where we can work together:",
    copyright_title: '1. Short Series Licensing:',
    copyright_desc:
      " If you possess the rights to exceptional short series that you'd like to showcase to a wider audience, let's discuss featuring them on ReelShort. Please reach out to us at ",
    script_title: '2. Short Series Scriptwriting:',
    script_desc:
      "If you're passionate about crafting compelling scripts for short series content, we'd be thrilled to explore a collaboration. Feel free to contact us at ",
    translate_title: '3. Subtitle Localization: ',
    translate_desc:
      "To make our short series accessible to a global audience, we're looking for partners who can help us with subtitle translation. If you're interested, please send us an email at ",
    short_dub_title: '4. Drama dubbing cooperation: ',
    short_dub_des:
      'If you are interested in drama video dubbing and translation cooperation, please contact us at ',
    film_title: '5. Original English Short Series Production:',
    film_desc:
      "If you have the expertise and resources to produce high-quality Original English short series, we'd be excited to explore a partnership. Reach out to us at ",
    business_title: '6. Advertising and Sponsorship: ',
    business_desc:
      "If you're interested in promoting your brand or running advertisements on ReelShort, we'd be happy to discuss the opportunities with you. Please get in touch with us at ",
    wishes: 'Best regards,',
    team: 'ReelShort Team',
    copy_suc: 'Copied, paste to email contact us',
    copy_fail: 'Copy failed'
  },
  es: {
    title: 'Conviértete en socio',
    dear: 'A nuestro posible socio:',
    desc: '¡Saludos! \n¡Gracias por su interés en ReelShort! Buscamos constantemente socios destacados que nos ayuden a expandir el ámbito de las series cortas. Si está interesado en colaborar, aquí hay algunas áreas potenciales donde podemos trabajar juntos:',
    copyright_title: '1. Licencia de series cortas: ',
    copyright_desc:
      'Si posee los derechos de series cortas excepcionales que le gustaría mostrar a una audiencia más amplia, analicemos cómo presentarlas en ReelShort. Comuníquese con nosotros en ',
    script_title: '2. Escritura de guiones para series cortas: ',
    script_desc:
      'Si le apasiona crear guiones atractivos para contenido de series cortas, nos encantaría hablar de una colaboración. No dude en contactarnos en ',
    translate_title: '3. Localización de subtítulos: ',
    translate_desc:
      'Para que nuestras series cortas sean accesibles a una audiencia global, estamos buscando socios que puedan ayudarnos con la traducción de subtítulos. Si está interesado, envíenos un correo electrónico a ',
    short_dub_title: '4. Cooperación en doblaje de historias: ',
    short_dub_des:
      'Si estás interesado en el doblaje de videos dramáticos y su traducción, contáctanos en ',
    film_title: '5. Producción de series cortas originales en inglés:',
    film_desc:
      'Si tiene la experiencia y los recursos para producir series cortas originales en inglés de alta calidad, nos encantaría hablar de una asociación. Comuníquese con nosotros en ',
    business_title: '6. Publicidad y patrocinio:  ',
    business_desc:
      'Si está interesado en promocionar su marca o publicar anuncios en ReelShort, estaremos encantados de analizar las opciones con usted. Póngase en contacto con nosotros en ',
    wishes: 'Atentamente,',
    team: 'Equipo ReelShort'
  },
  pt: {
    title: 'Torne-se um parceiro',
    dear: 'Aos nossos possíveis parceiros:',
    desc: 'Saudações! \nAgradecemos pelo seu interesse no ReelShort! Estamos constantemente buscando parceiros de excelência para nos ajudar a expandir o catálogo de séries curtas. Se você estiver interessado em colaborar, aqui estão algumas áreas nas quais podemos trabalhar juntos:',
    copyright_title: '1. Licenciamento de séries curtas:',
    copyright_desc:
      'Se você possui os direitos de séries curtas excepcionais que gostaria de exibir para um público mais amplo, podemos pensar em apresentá-las no ReelShort. Entre em contato conosco através do email ',
    script_title: '2. Roteiro de séries curtas: ',
    script_desc:
      'Se você é apaixonado por criar roteiros atraentes para conteúdo de séries curtas, ficaríamos felizes em organizar uma colaboração. Sinta-se à vontade para entrar em contato conosco através do email ',
    translate_title: '3. Localização de legendas: ',
    translate_desc:
      'Para tornar nossas séries curtas acessíveis a um público global, estamos procurando parceiros que podem nos ajudar na tradução de legendas. Se você estiver interessado, envie um e-mail para ',
    short_dub_title: '4.Cooperação para dublagem das histórias: ',
    short_dub_des:
      'Se você estiver interessado em dublagem das histórias em vídeo e em ajudar na tradução, entre em contato conosco através do email ',
    film_title: '5. Produção de séries curtas originais em inglês: ',
    film_desc:
      'Se você tem a experiência e recursos para produzir séries curtas originais em inglês de alta qualidade, ficaríamos felizes em estabelecer uma parceria. Entre em contato conosco através do email ',
    business_title: '6. Publicidade e patrocínio: ',
    business_desc:
      'Se você estiver interessado em promover sua marca ou anunciar no ReelShort, ficaremos felizes em discutir as oportunidades que temos com você. Entre em contato conosco através do email ',
    wishes: 'Atenciosamente,',
    team: 'Equipe ReelShort'
  },
  th: {
    title: 'เข้าร่วมเป็นพันธมิตร',
    dear: 'ถึงพันธมิตรที่มีศักยภาพของเรา:',
    desc: 'สวัสดี! \nขอขอบคุณที่สนใจใน ReelShort! เรากำลังมองหาพันธมิตรที่โดดเด่นอย่างต่อเนื่อง เพื่อช่วยให้เราขยายซีรีส์สั้นให้เข้าถึงผู้คนได้มากยิ่งขึ้น หากคุณสนใจร่วมงานกับเรา นี่คือบางด้านที่เราอาจทำงานร่วมกันได้:',
    copyright_title: '1. การอนุญาตให้ใช้สิทธิ์ซีรีส์สั้น:',
    copyright_desc:
      'หากคุณถือสิทธิ์ในซีรีส์สั้นที่ยอดเยี่ยมและต้องการนำเสนอให้กับผู้ชมในวงกว้าง มาพูดคุยกันเกี่ยวกับการนำซีรีส์ของคุณมาฉายบน ReelShort กันเถอะ โปรดติดต่อเราที่ ',
    script_title: '2. การเขียนบทซีรีส์สั้น:',
    script_desc:
      'หากคุณมีความหลงใหลในการสร้างสรรค์บทที่น่าติดตามสำหรับเนื้อหาซีรีส์สั้น เราจะยินดีอย่างยิ่งที่จะสำรวจโอกาสในการร่วมงานกับคุณ ติดต่อเราได้ที่ ',
    translate_title: '3. การแปลคำบรรยาย:',
    translate_desc:
      'เพื่อให้ผู้ชมทั่วโลกสามารถเข้าถึงซีรีส์สั้นของเราได้ เรากำลังมองหาพันธมิตรที่สามารถช่วยเราในการแปลคำบรรยายได้ หากคุณสนใจโปรดส่งอีเมลถึงเราที่ ',
    short_dub_title: '4.ความร่วมมือในการพากย์ละคร: ',
    short_dub_des:
      'หากคุณสนใจความร่วมมือในการพากย์และแปลละครวิดีโอ โปรดติดต่อเราที่ ',
    film_title: '5. การผลิตซีรีส์สั้นภาษาอังกฤษต้นฉบับ: ',
    film_desc:
      'หากคุณมีความเชี่ยวชาญและทรัพยากรในการผลิตซีรีส์สั้นภาษาอังกฤษต้นฉบับคุณภาพสูง เรายินดีที่จะสำรวจความร่วมมือกันกับคุณ ติดต่อเราได้ที่ ',
    business_title: '6. การโฆษณาและการสนับสนุน:',
    business_desc:
      'หากคุณต้องการโปรโมตแบรนด์ของคุณหรือลงโฆษณาบน ReelShort เราจะยินดีอย่างยิ่งที่จะพูดคุยถึงโอกาสในการร่วมงานกัน โปรดติดต่อเราที่ ',
    wishes: 'ขอแสดงความนับถือ',
    team: 'ทีมงาน ReelShort'
  },
  in: {
    title: 'Menjadi Mitra',
    dear: 'Kepada Calon Mitra Kami:',
    desc: 'Salam! \nTerima kasih atas ketertarikan Anda kepada ReelShort! Kami terus mencari mitra yang luar biasa untuk membantu kami memperluas ranah serial pendek. Jika Anda tertarik untuk berkolaborasi, berikut ini adalah beberapa area potensial di mana kita dapat bekerja sama:',
    copyright_title: '1. Lisensi Serial Pendek:',
    copyright_desc:
      'Jika Anda memiliki hak atas serial pendek luar biasa yang ingin Anda tampilkan kepada audiens yang lebih luas, mari kita diskusikan untuk menampilkannya di ReelShort. Silakan hubungi kami di ',
    script_title: '2. Penulisan Naskah Serial Pendek:',
    script_desc:
      'Jika Anda menyukai dalam pembuatan naskah yang menarik untuk konten serial pendek, kami akan sangat senang untuk menjajaki kolaborasi. Jangan ragu untuk menghubungi kami di ',
    translate_title: '3. Terjemahan Subtitle:',
    translate_desc:
      'Agar serial pendek kami dapat diakses oleh audiens global, kami mencari mitra yang dapat membantu kami dalam penerjemahan subtitle. Jika Anda tertarik, silakan kirimkan email kepada kami di ',
    short_dub_title: '4.Kerja sama mengisi suara drama: ',
    short_dub_des:
      'Jika Anda tertarik dengan kerja sama mengisi suara video drama dan penerjemahan, silakan hubungi kami di ',
    film_title: '5. Produksi Serial Pendek Bahasa Inggris Asli:',
    film_desc:
      'Jika Anda memiliki keahlian dan sumber daya untuk memproduksi serial pendek berbahasa Inggris asli berkualitas tinggi, kami akan sangat senang untuk menjajaki kerja sama. Hubungi kami di ',
    business_title: '6. Iklan dan Sponsor:',
    business_desc:
      'Jika Anda tertarik untuk mempromosikan merek Anda atau menjalankan iklan di ReelShort, kami akan dengan senang hati mendiskusikan peluang dengan Anda. Silakan hubungi kami di ',
    wishes: 'Hormat kami,',
    team: 'Tim ReelShort'
  },
  de: {
    title: 'Partner werden',
    dear: 'An unseren potenziellen Partner:',
    desc: 'Viele Grüße! \nVielen Dank für dein Interesse an ReelShort! Wir sind ständig auf der Suche nach außergewöhnlichen Partnern, die uns dabei helfen, die Welt der Kurzfilme zu erweitern. Wenn du an einer Zusammenarbeit interessiert bist, findest du hier einige mögliche Bereiche, in denen wir zusammenarbeiten können:',
    copyright_title: '1. Lizenzierung von Kurzserien:',
    copyright_desc:
      'Wenn du die Rechte an einer außergewöhnlichen Kurzserie besitzt, die du gerne einem größeren Publikum vorstellen möchtest, können wir darüber sprechen, sie auf ReelShort zu veröffentlichen. Bitte melde dich bei uns unter ',
    script_title: '2. Drehbuchschreiben für Kurzserien:',
    script_desc:
      'Wenn du mit Leidenschaft fesselnde Drehbücher für Kurzserien schreibst, würden wir uns über eine Zusammenarbeit freuen. Kontaktiere uns unter ',
    translate_title: '3. Untertitel-Lokalisierung:',
    translate_desc:
      'Um unsere Kurzserien einem weltweiten Publikum zugänglich zu machen, suchen wir nach Partnern, die uns bei der Übersetzung von Untertiteln helfen können. Wenn du Interesse hast, schick uns bitte eine E-Mail an ',
    short_dub_title: '4. Zusammenarbeit bei der Synchronisation von Dramen: ',
    short_dub_des:
      'Wenn du an einer Zusammenarbeit bei der Synchronisation und Übersetzung von Videos interessiert bist, kontaktiere uns bitte unter ',
    film_title: '5. Produktion von Kurzserien im englischen Original:',
    film_desc:
      'Wenn du über das Know-how und die Ressourcen verfügst, um qualitativ hochwertige englische Kurzserien zu produzieren, würden wir uns über eine Partnerschaft freuen. Melde dich bei uns unter ',
    business_title: '6. Werbung und Sponsoring:',
    business_desc:
      'Wenn du daran interessiert bist, für deine Marke zu werben oder Werbung auf ReelShort zu schalten, würden wir uns freuen, mit dir über die Möglichkeiten zu sprechen. Bitte melde dich bei uns unter ',
    wishes: 'Mit freundlichen Grüßen,',
    team: 'ReelShort Team'
  },
  fr: {
    title: 'Devenir partenaire',
    dear: 'Chers partenaires potentiels :',
    desc: "Bonjour ! \nNous vous remercions de l'intérêt que vous portez à ReelShort ! Nous sommes constamment à la recherche de partenaires exceptionnels pour nous aider à développer le secteur des séries en format court. Si vous souhaitez vous joindre à nous, voici quelques domaines dans lesquels nous pourrions travailler ensemble: ",
    copyright_title: '1. Licences de séries courtes: ',
    copyright_desc:
      "Si vous possédez les droits de séries courtes remarquables que vous aimeriez présenter à un public plus large, nous pourrions discuter de la possibilité de les publier sur ReelShort. Veuillez nous contacter à l'adresse suivante: ",
    script_title: '2. Écriture de scénarios de séries courtes: ',
    script_desc:
      "Si vous êtes enthousiaste à l'idée de concocter des scénarios captivants pour des séries courtes, nous serions ravis d'envisager une collaboration. N'hésitez pas à nous contacter à l'adresse ",
    translate_title: '3. Localisation des sous-titres: ',
    translate_desc:
      "Afin de rendre nos séries courtes accessibles à un public international, nous recherchons des partenaires pouvant nous aider à traduire les sous-titres. Si cela vous intéresse, envoyez-nous un courriel à l'adresse ",
    short_dub_title: '4. Collaboration en matière de doublage : ',
    short_dub_des:
      "si vous êtes intéressé par une collaboration pour le doublage et la traduction de fictions, veuillez nous contacter à l'adresse suivante: ",
    film_title: '5. Production de séries courtes originales en anglais: ',
    film_desc:
      "Si vous disposez de l'expertise et des ressources nécessaires pour produire des séries courtes originales en anglais de haute qualité, nous serions ravis d'envisager un partenariat. Contactez-nous à l'adresse ",
    business_title: '6. Publicité et parrainage: ',
    business_desc:
      "Si vous souhaitez promouvoir votre marque ou diffuser des publicités sur ReelShort, nous serions ravis de discuter avec vous des différentes opportunités. Veuillez nous contacter à l'adresse suivante: ",
    wishes: 'Meilleures salutations,',
    team: "L'équipe de ReelShort"
  },
  hi: {
    title: 'सामग्री सहयोग',
    dear: 'प्रिय सहयोगी,',
    desc: 'नमस्ते! \nReelShort प्लेटफ़ॉर्म में आपकी रुचि और समर्थन के लिए धन्यवाद। लघु-नाटकों के विकास को और बेहतर ढंग से बढ़ावा देने के लिए, हम आपको निम्नलिखित क्षेत्रों में सहयोग के लिए आमंत्रित करते हैं:',
    copyright_title: '1. लघु-नाटक कॉपीराइट सहयोग: ',
    copyright_desc:
      'यदि आपके पास उच्च गुणवत्ता वाले लघु-नाटकों के कॉपीराइट हैं और आप उन्हें ReelShort प्लेटफ़ॉर्म पर प्रकाशित करना चाहते हैं, तो कृपया ईमेल के माध्यम से संपर्क करें: ',
    script_title: '2. लघु-नाटक पटकथा लेखन: ',
    script_desc:
      'यदि आप लघु-नाटकों की पटकथा लेखन में रुचि रखते हैं, तो कृपया ईमेल के माध्यम से संपर्क करें: ',
    translate_title: '3. उपशीर्षक अनुवाद सहयोग:',
    translate_desc:
      'यदि आप लघु-नाटक वीडियो के उपशीर्षक अनुवाद में रुचि रखते हैं, तो कृपया ईमेल के माध्यम से संपर्क करें: ',
    short_dub_title: '4. लघु-नाटक डबिंग सहयोग:',
    short_dub_des:
      'यदि आप लघु-नाटक वीडियो की डबिंग अनुवाद में रुचि रखते हैं, तो कृपया ईमेल के माध्यम से संपर्क करें: ',
    film_title: '5. अंग्रेज़ी लघु-नाटक की शूटिंग सहयोग:',
    film_desc:
      'यदि आपके पास अंग्रेज़ी लघु-नाटकों की शूटिंग करने की क्षमता है, तो हम आपके साथ सहयोग करने के लिए उत्सुक हैं। कृपया ईमेल के माध्यम से संपर्क करें: ',
    business_title: '6. व्यावसायिक विज्ञापन सहयोग:',
    business_desc:
      'यदि आप ReelShort प्लेटफ़ॉर्म पर विज्ञापन डालना या ब्रांड प्रचार करना चाहते हैं, तो कृपया ईमेल के माध्यम से संपर्क करें:',
    wishes: 'शुभकामनाएँ,',
    team: 'ReelShort टीम'
  },
  fil: {
    title: 'Pakikipagtulungan sa Nilalaman',
    dear: 'Mahal na Kasosyo,',
    desc: 'Kamusta! \nMaraming salamat sa iyong interes at suporta sa ReelShort platform. Upang higit na mapalago ang maikling drama content, taos-puso naming iniimbitahan ang mga nais makipag-collaborate na makipagtulungan sa amin sa mga sumusunod na larangan:',
    copyright_title: '1. Pag-collaborate sa Copyright ng Maikling Drama:',
    copyright_desc:
      'Kung ikaw ay may mataas na kalidad na copyright ng maikling drama at nais itong i-publish sa ReelShort platform para sa mas malawak na exposure, mangyaring makipag-ugnayan sa amin sa pamamagitan ng email: ',
    script_title: '2. Pagsusulat ng Script ng Maikling Drama:',
    script_desc:
      'Kung interesado kang makipag-collaborate sa pagsusulat ng script ng maikling drama, mangyaring makipag-ugnayan sa amin sa pamamagitan ng email: ',
    translate_title: '3. Pag-collaborate sa Pagsasalin ng Subtitles:',
    translate_desc:
      'Kung interesado kang makipag-collaborate sa pagsasalin ng subtitles ng maikling drama videos, mangyaring makipag-ugnayan sa amin sa pamamagitan ng email: ',
    short_dub_title: '4.Pag-collaborate sa Dubbing ng Maikling Drama:',
    short_dub_des:
      'Kung interesado kang makipag-collaborate sa dubbing ng maikling drama videos, mangyaring makipag-ugnayan sa amin sa pamamagitan ng email: ',
    film_title: '5.Pag-collaborate sa Paggawa ng English Maikling Drama:',
    film_desc:
      'Kung may kakayahan kang mag-produce ng mga English maikling drama projects, inaasahan namin ang pakikipag-collaborate sa iyo. Mangyaring makipag-ugnayan sa amin sa pamamagitan ng email: ',
    business_title: '6. Pag-collaborate sa Business Advertising:',
    business_desc:
      'Kung nais mong maglagay ng advertisement o magsagawa ng brand promotion sa ReelShort platform, mangyaring makipag-ugnayan sa amin sa pamamagitan ng email: ',
    wishes: 'Lubos na gumagalang,',
    team: 'ReelShort Team'
  },
  tr: {
    title: 'İçerik İşbirliği',
    dear: 'Sayın İş Ortağı,',
    desc: 'Merhaba! \nReelShort platformuna olan ilginiz ve desteğiniz için teşekkür ederiz. Kısa drama içeriklerini daha iyi bir şekilde teşvik etmek amacıyla, aşağıdaki işbirliği alanlarında bizimle birlikte çalışmak isteyen iş ortaklarını samimiyetle davet ediyoruz:',
    copyright_title: '1. Kısa Drama Telif Hakkı İşbirliği:',
    copyright_desc: `Yüksek kaliteli kısa drama telif haklarına sahipseniz ve ReelShort platformunda yayınlamak ve daha fazla görünürlük elde etmek istiyorsanız, lütfen e-posta yoluyla bizimle iletişime geçin: `,
    script_title: '2. Kısa Drama Senaryo Yazımı:',
    script_desc:
      'Kısa drama senaryolarının yazımı konusunda işbirliği yapmak istiyorsanız, lütfen e-posta yoluyla bizimle iletişime geçin: ',
    translate_title: '3. Altyazı Çeviri İşbirliği: ',
    translate_desc:
      'Kısa drama videolarının altyazı çevirisi konusunda işbirliği yapmak istiyorsanız, lütfen e-posta yoluyla bizimle iletişime geçin: ',
    short_dub_title: '4.Kısa Drama Dublaj İşbirliği:',
    short_dub_des:
      'Kısa drama videolarının dublaj çevirisi konusunda işbirliği yapmak istiyorsanız, lütfen e-posta yoluyla bizimle iletişime geçin: ',
    film_title: '5. İngilizce Kısa Drama Çekim İşbirliği:',
    film_desc:
      'Ingilizce kısa drama projelerinin çekimlerini üstlenme kapasiteniz varsa, sizinle işbirliği yapmayı dört gözle bekliyoruz. Lütfen e-posta yoluyla bizimle iletişime geçin: ',
    business_title: '6.Ticari Reklam İşbirliği:',
    business_desc:
      'ReelShort platformunda reklam vermek veya marka tanıtımı yapmak istiyorsanız, lütfen e-posta yoluyla bizimle iletişime geçin: ',
    wishes: 'Saygılarımızla,',
    team: 'ReelShort Ekibi'
  },
  ja: {
    title: 'コンテンツ・コラボレーション',
    dear: 'パートナーの皆様、',
    desc: 'いつもお世話になっております。 \nこの度は、ReelShortプラットフォームへのご関心とご支援を賜りまして、誠にありがとうございます。短編ドラマの更なる発展を目指しております。下記の分野においてご協力いただける方を募集しております。',
    copyright_title: '1. 短編ドラマの著作権協力　',
    copyright_desc: `質の高い短編ドラマの著作権をお持ちで、ReelShortプラットフォームで公開し、より多くの露出を希望される方は、ご連絡ください。メールアドレス：`,
    script_title: '2. 短編ドラマの脚本執筆',
    script_desc:
      '短編ドラマの脚本執筆にご興味のある方は、ご連絡ください。メールアドレス：',
    translate_title: '3. 字幕翻訳協力',
    translate_desc:
      '短編ドラマの字幕翻訳にご興味のある方は、ご連絡ください。メールアドレス：',
    short_dub_title: '4. 吹き替え翻訳協力：',
    short_dub_des:
      'ショートビデオの吹き替え翻訳にご興味のある方は下記メールにご連絡ください： ',
    film_title: '5. 英語短編ドラマの撮影協力',
    film_desc:
      '英語短編ドラマの撮影プロジェクトに対応できる方も大歓迎です。ご連絡ください。メールアドレス：',
    business_title: '6. ビジネス広告協力',
    business_desc:
      'ReelShortプラットフォームで広告を出稿したり、ブランド広告を展開したい方は、ご連絡ください。メールアドレス：',
    wishes: '引き続き、何卒よろしくお願い申し上げます。',
    team: 'ReelShortチーム一同'
  },
  ko: {
    title: '파트너 되기',
    dear: '잠재적 파트너분께',
    desc: '안녕하세요! \nReelShort에 관심을 가져주셔서 감사합니다! 저희는 단편 시리즈의 영역을 확장하는 데 도움을 줄 뛰어난 파트너를 끊임없이 찾고 있습니다. 협업에 관심이 있으시다면, 저희가 함께 작업할 수 있는 잠재적인 분야는 다음과 같습니다.',
    copyright_title: '1. 단편 시리즈 라이선싱: ',
    copyright_desc: `더 많은 청중에게 선보이고 싶은 뛰어난 단편 시리즈의 권리를 보유하고 계시다면, ReelShort에 시리즈를 소개하는 것에 대해 논의해 보고 싶습니다. `,
    copyright_supplement: ' 으로 문의해 주세요.',
    script_title: '2. 단편 시리즈 대본 쓰기:',
    script_desc:
      '단편 시리즈 콘텐츠를 위한 설득력 있는 대본을 만드는 데 열정이 있으시다면, 협업에 대하여 논의해보고 싶습니다. ',
    script_supplement: ' 으로 문의해 주세요.',
    translate_title: '3. 자막 현지화:',
    translate_desc:
      '단편 시리즈를 전 세계 청중이 접할 수 있도록 자막 번역을 도와줄 파트너를 찾고 있습니다. 관심이 있으시면 ',
    translate_supplement: ' 으로 이메일을 보내주세요.',
    short_dub_title: '4. 드라마 더빙 협력: ',
    short_dub_des: '드라마 영상 더빙 및 번역 협력에 관심이 있으시면 ',
    short_dub_des_supplement: ' 으로 문의해 주세요.',
    film_title: '5. 오리지널 영어 단편 시리즈 제작:',
    film_desc:
      '고품질 오리지널 영어 단편 시리즈를 제작할 전문성과 리소스가 있다면 파트너십에 대해 논의해 보고 싶습니다. ',
    film_supplement: ' 으로 문의하세요.',
    business_title: '6. 광고 및 스폰서십:',
    business_desc:
      'ReelShort에서 브랜드를 홍보하거나 광고를 게재하는 데 관심이 있다면, 이 기회에 대해 논의해 보고 싶습니다. ',
    business_supplement: ' 으로 문의하세요.',
    wishes: '감사합니다.',
    team: 'ReelShort 팀'
  },
  ru: {
    title: 'Сотрудничество по контенту',
    dear: 'Уважаемые партнёры,',
    desc: 'Здравствуйте! \nБлагодарим вас за внимание и поддержку платформы ReelShort. Для более эффективного развития  индрустрии минутных сериалов, мы с удовольствием приглашаем заинтересованные стороны к сотрудничеству с нами в следующих областях:',
    copyright_title: '1. Сотрудничество по правам на короткие сериалы: ',
    copyright_desc: `Если у вас есть действительные права на короткие сериалы, и вы хотите опубликовать их на платформе ReelShort для получения большего охвата, пожалуйста, свяжитесь с нами по электронной почте: `,
    script_title: '2. Написание сценариев для коротких сериалов: ',
    script_desc:
      'Если вы заинтересованы в сотрудничестве по написанию сценариев для коротких сериалов, пожалуйста, свяжитесь с нами по электронной почте: ',
    translate_title: '3. Сотрудничество по переводу субтитров: ',
    translate_desc:
      'Если вы заинтересованы в сотрудничестве по переводу субтитров для видео минутных сериалов, пожалуйста, свяжитесь с нами по электронной почте: ',
    short_dub_title: '4. Сотрудничество в области дубляжа коротких сериалов: ',
    short_dub_des:
      'Если вы заинтересованы в сотрудничестве в области перевода дубляжа минутных сериалов, свяжитесь с нами по электронной почте: ',
    film_title:
      '5. Сотрудничество по съёмке коротких сериалов на английском языке: ',
    film_desc:
      'Если вы способны реализовать проекты по съёмке коротких драм на английском языке, мы также весьма заинтересованы в сотрудничестве с вами. Пожалуйста, свяжитесь с нами по электронной почте: ',
    business_title: '6. Сотрудничество по рекламе: ',
    business_desc:
      'Если вы хотите размещать рекламу или продвигать бренд на платформе ReelShort, пожалуйста, свяжитесь с нами по электронной почте: ',
    wishes: 'С уважением,',
    team: 'Команда ReelShort'
  },
  'zh-TW': {
    title: '內容合作',
    dear: '親愛的潛在夥伴，',
    desc: '您好！ \n感謝您對ReelShort的興趣！我們不斷尋求優秀的夥伴來幫助我們擴展短劇的領域。如果您有興趣合作，以下是我們可以共同合作的一些潛在領域：',
    copyright_title: '1. 短劇版權： ',
    copyright_desc: `如果您擁有希望向更廣泛觀眾展示的優秀短劇版權，我們可以討論在ReelShort上展示它們。請通過信箱聯繫我們：`,
    script_title: '2. 短劇劇本創作：',
    script_desc:
      '如果您對撰寫引人入勝的短劇劇本充滿熱情，我們將非常樂意探索合作的可能性。請通過信箱與我們聯絡：',
    translate_title: '3. 字幕本地化：',
    translate_desc:
      '為了使我們的短劇能夠被全球觀眾所接受，我們正在尋找可以幫助我們進行字幕翻譯的夥伴。如果您感興趣，請發送電子郵件至 ',
    short_dub_title: '4. 短劇配音合作：',
    short_dub_des: '如果您對短劇影片 配音翻譯有合作意向，請透過信箱聯絡：',
    film_title: '5. 原創英文短劇製作：',
    film_desc:
      '如果您擁有製作高品質原創英文短劇的專業知識和資源，我們很高興探索合作的機會。請通過信箱與我們聯絡：',
    business_title: '6. 廣告和贊助：',
    business_desc:
      '如果您有興趣推廣您的品牌或在ReelShort上投放廣告，我們很樂意討論相關機會。請通過信箱與我們聯絡：',
    wishes: '此致',
    team: 'ReelShort 團隊'
  },
  it: {
    title: 'Collaborazione sui Contenuti',
    dear: 'Gentili partner,',
    desc: "Ciao! \nGrazie per l'attenzione e il supporto che avete dimostrato nei confronti della piattaforma ReelShort. Per promuovere meglio lo sviluppo dei contenuti di cortometraggi, invitiamo cordialmente i partner interessati a collaborare con noi per espandere insieme i seguenti ambiti di cooperazione:",
    copyright_title:
      "1. Collaborazione sui diritti d'autore dei cortometraggi: ",
    copyright_desc:
      "Se possedete i diritti d'autore di cortometraggi di alta qualità e desiderate pubblicarli su ReelShort per ottenere maggiore visibilità, vi invitiamo a contattarci via email: ",
    script_title: '2. Scrittura di sceneggiature per cortometraggi: ',
    script_desc:
      'Se siete interessati a collaborare sulla scrittura di sceneggiature per cortometraggi, vi preghiamo di contattarci via email: ',
    translate_title: '3. Collaborazione nella traduzione dei sottotitoli: ',
    translate_desc:
      'Se siete interessati a collaborare nella traduzione dei sottotitoli per i cortometraggi, vi preghiamo di contattarci via email: ',
    short_dub_title: '4. Collaborazione nel doppiaggio dei cortometraggi: ',
    short_dub_des:
      'Se siete interessati a collaborare nel doppiaggio e nella traduzione dei cortometraggi, vi preghiamo di contattarci via email: ',
    film_title:
      '5. Collaborazione nella produzione di cortometraggi in inglese: ',
    film_desc:
      'Se siete in grado di gestire progetti di produzione di cortometraggi in inglese, saremo lieti di collaborare con voi. Vi preghiamo di contattarci via email: ',
    business_title: '6. Collaborazione nella pubblicità commerciale: ',
    business_desc:
      'Se desiderate pubblicizzare o promuovere un brand su ReelShort, vi preghiamo di contattarci via email: ',
    wishes: 'Cordiali saluti,',
    team: 'Il team di ReelShort',
    copy_suc: "Copiato, incolla nell'email per contattarci",
    copy_fail: 'Copia fallita'
  },
  ar: {
    title: 'التعاون في المحتوى',
    dear: 'إلى شريكنا المحتمل:',
    desc: 'تحياتنا! \nشكراً لاهتمامك بـ ReelShort!\nنحن نبحث باستمرار عن شركاء متميزين لمساعدتنا في توسيع مجال السلاسل القصيرة. إذا كنت مهتمًا بالتعاون، فإليك بعض المجالات المحتملة التي يمكننا العمل معًا فيها:',
    copyright_title: '1. ترخيص السلاسل القصيرة:',
    copyright_desc:
      'إذا كنت تمتلك حقوق السلاسل القصيرة الاستثنائية التي ترغب في عرضها لجمهور أوسع، دعونا نناقش عرضها على ReelShort. يرجى الاتصال بنا على ',
    script_title: '2. كتابة سيناريو السلاسل القصيرة:',
    script_desc:
      'إذا كنت شغوفًا بصياغة سيناريوهات مثيرة للمحتوى القصير، سنكون متحمسين لاستكشاف التعاون.ا تتردد في الاتصال بنا على ',
    translate_title: '3. الترجمة المصاحبة:',
    translate_desc:
      'لجعل سلاسلنا القصيرة متاحة لجمهور عالمي، نحن نبحث عن شركاء يمكنهم مساعدتنا في ترجمة الترجمة المصاحبة.إذا كنت مهتمًا، يرجى إرسال بريد إلكتروني إلى ',
    short_dub_title: '4. التعاون في دبلجة الدراما:',
    short_dub_des:
      'إذا كنت مهتمًا بتعاون دبلجة الفيديو والترجمة للدراما، يرجى الاتصال بنا على ',
    film_title: '5. إنتاج سلاسل قصيرة باللغة الإنجليزية الأصلية:',
    film_desc:
      'إذا كان لديك الخبرة والموارد لإنتاج سلاسل قصيرة باللغة الإنجليزية الأصلية عالية الجودة، سنكون متحمسين لاستكشاف شراكة. تواصل معنا على ',
    business_title: '6. الإعلانات والرعاية:',
    business_desc:
      'إذا كنت مهتمًا بالترويج لعلامتك التجارية أو تشغيل الإعلانات على ReelShort، سنكون سعداء بمناقشة الفرص معك. يرجى التواصل معنا عبر ',
    wishes: 'مع أطيب التحيات،',
    team: 'فريق ReelShort',
    copy_suc: 'تم النسخ، قم بلصقها في البريد الإلكتروني للتواصل معنا',
    copy_fail: 'فشل النسخ'
  },
  pl: {
    title: 'Współpraca',
    dear: 'Do Naszego Potencjalnego Partnera:',
    desc: 'Witamy! \nDziękujemy za zainteresowanie platformą ReelShort! Nieustannie poszukujemy wyjątkowych partnerów, którzy pomogą nam rozszerzyć świat krótkometrażowych seriali. Jeśli jesteś zainteresowany/a, oto kilka potencjalnych obszarów, w których możemy podjąć współpracę:',
    copyright_title: '1. Licencjonowanie Seriali Krótkometrażowych:',
    copyright_desc:
      'Jeśli masz prawa do wyjątkowych krótkich seriali, które chcesz pokazać szerszej publiczności, skontaktujmy się z Tobą, aby omówić ich emisję na platformie ReelShort. Skontaktuj się z nami pod adresem ',
    script_title: '2. Pisanie Scenariuszy Seriali Krótkometrażowych:',
    script_desc:
      'Jeśli pasjonujesz się pisaniem wciągających scenariuszy do seriali krótkometrażowych, z przyjemnością omówimy możliwość współpracy. Skontaktuj się z nami pod adresem ',
    translate_title: '3. Lokalizacja Napisów:',
    translate_desc:
      'Aby nasze seriale krótkometrażowe były dostępne dla globalnej publiczności, szukamy partnerów, którzy mogą nam pomóc w tłumaczeniu napisów. Jeśli jesteś zainteresowany/a, wyślij wiadomość e-mail na adresem ',
    short_dub_title: '4. Współpraca W Dubbingowaniu Seriali:',
    short_dub_des:
      'Jeśli interesuje Cię współpraca w zakresie dubbingu i tłumaczenia seriali, skontaktuj się z nami pod adresem: ',
    film_title:
      '5. Produkcja Oryginalnych, Anglojęzycznych Seriali Krótkometrażowych:',
    film_desc:
      'Jeśli masz wiedzę i zasoby do produkcji wysokiej jakości, oryginalnych, anglojęzycznych seriali krótkometrażowych, a z chęcią omówimy współpracę. Skontaktuj się z nami pod adresem ',
    business_title: '6. Reklama i Sponsorzy:',
    business_desc:
      'Jeśli jesteś zainteresowany/a promowaniem swojej marki lub wyświetlaniem reklam na ReelShort, z przyjemnością omówimy z Tobą dostępne możliwości. Skontaktuj się z nami pod adresem ',
    wishes: 'Z poważaniem',
    team: 'Zespół ReelShort',
    copy_suc: 'Skopiuj, wklej do wiadomości kontaktu z nami',
    copy_fail: 'Kopiowanie nie powiodło się'
  },
  ro: {
    title: 'Colaborare de conținut',
    dear: 'Către potențialul nostru partener:',
    desc: 'Salutări! \nÎți mulțumim pentru interesul acordat în ReelShort! Căutăm în permanență parteneri remarcabili care să ne ajute să extindem domeniul serialelor scurte. Dacă ești interesat să colaborăm, iată câteva domenii potențiale în care putem lucra împreună:',
    copyright_title: '1. Licențiere pentru seriale scurte:',
    copyright_desc:
      'Dacă deți drepturile pentru seriale scurte excepționale pe care dorești să le prezentați unui public mai larg, hai să discutăm despre prezentarea lor pe ReelShort. Te rugăm să ne contactezi la ',
    script_title: '2. Scrierea scenariilor pentru seriale scurte:',
    script_desc:
      'Dacă ești pasionat de crearea unor scenarii convingătoare pentru conținut de seriale scurte, am fi încântați să explorăm o colaborare. Nu ezita să ne contactezi la ',
    translate_title: '3. Localizare subtitrări:',
    translate_desc:
      'Pentru a face serialele noastre scurte accesibile unui public global, căutăm parteneri care ne pot ajuta cu traducerea subtitrărilor. Dacă ești interesat, te rugăm să ne trimiteți un e-mail la ',
    short_dub_title: '4. Cooperare în dublajul dramelor:',
    short_dub_des:
      'Dacă ești interesat de o cooperare în dublajul și traducerea dramelor video, te rugăm să ne contactezi la ',
    film_title: '5. Producție de seriale scurte originale în limba engleză:',
    film_desc:
      'Dacă ai experiența și resursele necesare pentru a produce seriale scurte originale în limba engleză de înaltă calitate, am fi încântați să explorăm un parteneriat. Contactează-ne la ',
    business_title: '6. Publicitate și sponsorizare:',
    business_desc:
      'Dacă ești interesat să îți promovezi marca sau să difuzezi reclame pe ReelShort, vom fi bucuroși să discutăm oportunitățile cu tine. Te rugăm să ne contactezi la ',
    wishes: 'Cu cele mai bune gânduri,',
    team: 'Echipa ReelShort',
    copy_suc: 'Copiat, lipește în e-mail pentru a ne contacta.',
    copy_fail: 'Copiere nereușită'
  },
  cs: {
    title: 'Spolupráce na obsahu',
    dear: 'Našemu potenciálnímu partnerovi:',
    desc: 'Zdravím! \nDěkujeme za váš zájem o ReelShort! Neustále hledáme vynikající partnery, kteří by nám pomohli rozšířit oblast krátkých seriálů. Pokud máte zájem o spolupráci, zde je několik potenciálních oblastí, ve kterých bychom mohli spolupracovat:',
    copyright_title: '1. Licencování krátkých sérií:',
    copyright_desc:
      'Pokud vlastníte práva na výjimečné krátké seriály, které byste chtěli představit širšímu publiku, prodiskutujme jejich uvedení na ReelShort. Kontaktujte nás prosím na adrese',
    script_title: '2. Scénáře krátkých seriálů:',
    script_desc:
      'Pokud vás vášní je tvorba poutavých scénářů pro krátké seriály, rádi prozkoumáme možnost spolupráce. Neváhejte nás kontaktovat na adrese',
    translate_title: '3. Lokalizace titulků:',
    translate_desc:
      'Abychom zpřístupnili naše krátké seriály globálnímu publiku, hledáme partnery, kteří by nám mohli pomoci s překladem titulků. V případě zájmu nám prosím napište e-mail na adresu',
    short_dub_title: '4. Spolupráce na dabingu dramatických pořadů:',
    short_dub_des:
      'Pokud máte zájem o spolupráci v oblasti dabingu a překladu dramatických videí, kontaktujte nás prosím na adrese',
    film_title: '5. Původní anglická krátká série:',
    film_desc:
      'Pokud máte odborné znalosti a zdroje k produkci vysoce kvalitních krátkých seriálů v originální angličtině, rádi s vámi probereme možnost partnerství. Kontaktujte nás na adrese',
    business_title: '6. Reklama a sponzorství:',
    business_desc:
      'Pokud máte zájem o propagaci vaší značky nebo o spouštění reklamy na ReelShort, rádi s vámi probereme tyto možnosti. Kontaktujte nás prosím na adrese',
    wishes: 'S pozdravem,',
    team: 'Tým ReelShort',
    copy_suc: 'Zkopírováno, vložit do e-mailu, kontaktujte nás',
    copy_fail: 'Kopírování se nezdařilo'
  },
  bg: {
    title: 'Сътрудничество по съдържание',
    dear: 'До нашия потенциален партньор:',
    desc: 'Здравейте! \nБлагодарим ви за интереса към ReelShort! Ние непрекъснато търсим изключителни партньори, които да ни помогнат да разширим сферата на късометражните сериали. Ако се интересувате от сътрудничество, ето някои потенциални области, в които можем да работим заедно:',
    copyright_title: '1. Лицензиране на кратки серии:',
    copyright_desc:
      'Ако притежавате правата върху изключителни кратки сериали, които бихте искали да покажете на по-широка аудитория, нека обсъдим представянето им в ReelShort. Моля, свържете се с нас на',
    script_title: '2. Писане на сценарии за късометражни сериали:',
    script_desc:
      'Ако сте страстни в създаването на завладяващи сценарии за кратки сериали, ще се радваме да обсъдим възможността за сътрудничество. Не се колебайте да се свържете с нас на',
    translate_title: '3. Локализация на субтитрите:',
    translate_desc:
      'За да направим кратките ни поредици достъпни за световна аудитория, търсим партньори, които могат да ни помогнат с превода на субтитри. Ако проявявате интерес, моля, изпратете ни имейл на',
    short_dub_title: '4. Сътрудничество при дублажа на драматични сериали:',
    short_dub_des:
      'Ако се интересувате от сътрудничество в дублажа и превода на видео драми, моля, свържете се с нас на',
    film_title: '5. Оригинална английска късометражна сериализация:',
    film_desc:
      'Ако имате експертизата и ресурсите да създавате висококачествени кратки сериали на оригинален английски език, ще се радваме да проучим възможността за партньорство. Свържете се с нас на',
    business_title: '6. Реклама и спонсорство:',
    business_desc:
      'Ако се интересувате от популяризиране на вашата марка или пускане на реклами в ReelShort, ще се радваме да обсъдим възможностите с вас. Моля, свържете се с нас на',
    wishes: 'С най-добри пожелания,',
    team: 'Екип на ReelShort',
    copy_suc: 'Копирано, поставете в имейл, за да се свържете с нас',
    copy_fail: 'Копирането не бе успешно'
  },
  vi: {
    title: 'Spolupráce na obsahu',
    dear: 'Có thể có đối tác tiềm năng:',
    desc: 'Zdravím! \nHãy giải quyết vấn đề này bằng cách sử dụng ReelShort! Neustále hledáme vynikající đối tác, kteří bởi nám pomohli rozšířit oblast krátkých seriálů. Bạn có thể tham khảo ý kiến ​​của mình, bạn có thể có nhiều khả năng làm việc đó, và kterých bychom mohli spolupracovat:',
    copyright_title: '1. Giấy phép cấp phép:',
    copyright_desc:
      'Bạn có thể thực hiện một số công việc liên quan đến công việc của mình, sau đó bạn có thể tìm thấy công cụ xuất bản, sản phẩm của bạn sẽ được cung cấp cho ReelShort. Liên hệ với lợi ích và địa chỉ',
    script_title: '2. Kịch bản krátkých nối tiếp:',
    script_desc:
      'Pokud vás vášní je tvorba poutavých scénářů pro krátké seriály, rádi prozkoumáme možnost spolupráce. Không cần liên hệ với địa chỉ',
    translate_title: '3. Lokalizace titulků:',
    translate_desc:
      'Abychom zpřístupnili naše krátké seriály globálnímu publiku, hledáme đối tác, kteří bởi nám mohli pomoci s překladem titulků. V případě zájmu nám proím napište e-mail na adresu',
    short_dub_title: '4. Spolupráce na dabingu kịch tínhkých pořadů:',
    short_dub_des:
      'Bạn có thể tham khảo ý kiến ​​​​và làm nổi bật một vở kịch kịch tính bằng video, bạn có thể tham khảo ý kiến ​​của mình',
    film_title: '5. Původní anglická krátká série:',
    film_desc:
      'Pokud máte odborné znalosti a zdroje k produkci vysoce kvalitních krátkých seriálů v originalální angličtině, rádi s vámi thăm dò đối tác možnoství. Liên hệ với địa chỉ',
    business_title: '6. Reklama a sponzorství:',
    business_desc:
      'Bạn có thể tham khảo hoặc tuyên truyền và không cần phải quảng cáo cho ReelShort, nhưng tôi đã cố gắng hết sức để làm điều đó. Liên hệ với lợi ích và địa chỉ',
    wishes: 'S pozdravem,',
    team: 'Tým ReelShort',
    copy_suc: 'Zkopírováno, vložit do e-mailu, liên hệ với bạn',
    copy_fail: 'Kopírování se nezdařilo'
  }
}

export default langText

const currentLangText = _.merge({}, langText, defaultLangText)
export const i18n = (key: string, ...args: string[]): string => {
  const lang = localStorage.getItem('lang') || 'en'
  let translatedText = currentLangText[lang]?.[key] || currentLangText.en[key]

  // 替换特殊表示符 $1, $2, ...
  args.forEach((arg, index) => {
    const placeholder = `$${index + 1}`
    translatedText = translatedText?.replace(placeholder, arg)
  })

  return translatedText
}
