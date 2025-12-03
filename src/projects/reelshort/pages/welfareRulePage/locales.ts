/**
 * en - 英语；es - 西班牙语; pt - 葡萄牙语; th - 泰语;
 * in- 印尼语; de - 德语; fr-法语; hi - 印地语; fil - 菲律宾语;
 * tr - 土耳其语; ja - 日语; ko - 韩语; ru - 俄语; zh - 中文;
 */
import _ from 'lodash'
import defaultLangText from '../../locales'

const langText: any = {
  en: {
    pageTitle: 'Activity Rules',
    activityDescriptionTitle: '1. Activity Description',
    activityDescriptionDesc1:
      'Reelshort will periodically launch various benefit activities, where users can participate and complete tasks to earn rewards.',
    activityDescriptionDesc2:
      'The reward coins obtained from completing tasks can be used to unlock paid series.',
    participationMethodTitle: '2. Participation Method',
    participationMethodDesc:
      'The Activities are open to all registered users of Reelshort.',
    activityDetailsTitle: '3. Activity Details',
    activityDetailsCheckIn: 'Check-in',
    activityDetailsCheckInDesc:
      'Check-in rewards can be claimed starting at 0:00 each day. The longer the consecutive check-in days, the greater the rewards. If there is a break in check-ins, it will reset to day 1."',
    activityDetailsNewer: 'New User Benefits',
    activityDetailsNewerDesc:
      'Users can participate in newcomer benefit tasks within 7 days of registration. Reward methods include but are not limited to exclusive newcomer tasks (e.g., newcomer collection benefits, newcomer recharge discounts), with specific reward types and quantities as displayed on the page.',
    todayBenefits: `Today's Benefits`,
    todayBenefitsDesc:
      'The daily task list is updated at 0:00, including but not limited to daily watching tasks, browsing videos/articles, and special one-time tasks. More benefit tasks will also be introduced periodically in the future, so stay tuned.',
    watchEewards: 'Watch rewards',
    watchEewardsDesc1:
      'Users can receive rewards after watching specified durations of video content such as drama, movies, or documentaries on the platform. (Interactive series are not included.)',
    watchEewardsDesc2:
      'Abnormal usage behaviors such as rapid video browsing, repeated viewing, pausing playback will all be considered invalid. The Platform reserves the right not to count such behaviors toward the valid task duration or not to distribute rewards.',
    watchAdsRewards: 'Watch ads rewards',
    watchAdsRewardsDesc:
      'Users can claim rewards after browsing the specified pages/videos on the platform and meeting the task requirements.',
    otherTask: 'Other rewards',
    otherTaskDesc:
      'Detailed information on other tasks shall be subject to the special task rules within each task. Matters not specified in the special task rules shall be governed by these Rules of the Activities.',
    importantNotesTitle: '4.Important Notes',
    importantNotesDesc1:
      'Reelshort reserves the right to the final interpretation of this event.',
    importantNotesDesc2:
      'Due to limitations based on device, location, client version, and other factors, different users may see different tasks. Thank you for your understanding.',
    importantNotesDesc3:
      'The platform will determine whether users are the same based on device, account, and other information. When considered the same user, the basis for reward issuance will be based on whether rewards have been issued to that device.',
    importantNotesDesc4:
      'The platform has two ways to issue rewards: automatic system distribution and manual user collection. For tasks that require manual collection, users must claim their rewards within a specified time (see the activity page for details). If not claimed in time, it will be considered a voluntary forfeiture of the reward, and unclaimed rewards will be automatically cleared.',
    contactInformationTitle: '5. Contact information',
    contactInformationDesc:
      'If you have any questions, please go to [Profile] > [Feedback] to provide feedback.'
  },
  es: {
    pageTitle: 'Reglas de la actividad',
    activityDescriptionTitle: '1. Descripción',
    activityDescriptionDesc1:
      'Reelshort lanzará periódicamente varias actividades, donde los usuarios podrán participar y completar tareas para ganar recompensas.',
    activityDescriptionDesc2:
      'Las monedas de recompensa obtenidas al completar tareas se pueden utilizar para desbloquear series pagas.',
    participationMethodTitle: '2. Método de participación',
    participationMethodDesc:
      'Todos los usuarios registrados en Reelshort pueden participar en las actividades.',
    activityDetailsTitle: '3. Detalles de la actividad',
    activityDetailsCheckIn: 'Registro',
    activityDetailsCheckInDesc:
      'Las recompensas por registro diario pueden reclamarse a partir de las 0:00 de cada día. Cuantos más días consecutivos de registro diario, mayores serán las recompensas. Si hay una interrupción en el registro diario, se reiniciará a día 1.',
    activityDetailsNewer: 'Beneficios para nuevos usuarios',
    activityDetailsNewerDesc:
      'Los usuarios pueden participar en las tareas de beneficios para principiantes dentro de los 7 días posteriores al registro. Los métodos de recompensa incluyen, pero no se limitan a, tareas exclusivas para principiantes (por ejemplo, beneficios de colección para principiantes, descuentos en recargas para principiantes), y los tipos y cantidades específicas de recompensas se muestran en la página.',
    todayBenefits: `Beneficios diarios`,
    todayBenefitsDesc:
      'La lista de tareas diarias se actualiza a las 0:00, incluidas, entre otras, tareas diarias de visualizaciones, exploración de vídeos/artículos y tareas especiales únicas. También se introducirán periódicamente más tareas en el futuro, así que permanece atento.',
    watchEewards: 'Recompensas por visualización',
    watchEewardsDesc1:
      'Los usuarios pueden recibir recompensas después de ver contenido de video, como dramas, películas o documentales en la plataforma por una cantidad específica de tiempo. (Las series interactivas no están incluidas).',
    watchEewardsDesc2:
      'Comportamientos de uso anormales como la navegación rápida por vídeos, la visualización repetida y la pausa de la reproducción se considerarán inválidos. La plataforma se reserva el derecho a no contar tales comportamientos en la duración válida de la tarea ni a distribuir recompensas.',
    watchAdsRewards: 'Recompensas por ver anuncios',
    watchAdsRewardsDesc:
      'Los usuarios pueden reclamar recompensas después de navegar por las páginas/videos especificados en la plataforma y cumplir con los requisitos de la tarea.',
    otherTask: 'Otras recompensas',
    otherTaskDesc:
      'La información detallada sobre otras tareas estará sujeta a las reglas especiales de tarea dentro de cada tarea. Los asuntos no especificados en las reglas especiales de tarea se regirán por estas Reglas de las Actividades.',
    importantNotesTitle: '4.Notas importantes',
    importantNotesDesc1:
      'Reelshort se reserva el derecho a la interpretación final de este evento.',
    importantNotesDesc2:
      'Debido a limitaciones basadas en el dispositivo, la ubicación, la versión del cliente y otros factores, diferentes usuarios pueden ver diferentes tareas. Gracias por tu comprensión.',
    importantNotesDesc3:
      'La plataforma determinará si los usuarios son los mismos en función de la información del dispositivo, la cuenta y otros. Cuando se considera que son el mismo usuario, la base para la emisión de recompensas se basará en si se han emitido recompensas a ese dispositivo.',
    importantNotesDesc4:
      'La plataforma tiene dos formas de emitir recompensas: distribución automática del sistema y recolección manual por el usuario. Para las tareas que requieren recolección manual, los usuarios deben reclamar sus recompensas dentro de un tiempo especificado (consulte la página de la actividad para más detalles). Si no se reclaman a tiempo, se considerará una renuncia voluntaria a la recompensa y las recompensas no reclamadas se borrarán automáticamente.',
    contactInformationTitle: '5. Información de contacto',
    contactInformationDesc:
      'Si tienes alguna pregunta, ve a [Perfil] > [Feedback] para enviar comentarios.'
  },
  pt: {
    pageTitle: 'Regras das Atividades',
    activityDescriptionTitle: '1. Descrição da Atividade',
    activityDescriptionDesc1:
      'O Reelshort lançará periodicamente várias atividades repletas de benefícios, nas quais os usuários poderão concluir tarefas para ganhar recompensas.',
    activityDescriptionDesc2:
      'As moedas de recompensa obtidas ao concluir as tarefas poderão ser usadas para desbloquear séries pagas.',
    participationMethodTitle: '2. Método de Participação',
    participationMethodDesc:
      'As atividades são abertas a todos os usuários registrados no Reelshort.',
    activityDetailsTitle: '3. Detalhes da Atividade',
    activityDetailsCheckIn: 'Login',
    activityDetailsCheckInDesc:
      'As recompensas de login podem ser reivindicadas diariamente a partir de 0:00. Quanto maior for a sua série consecutiva de login, maiores serão as recompensas. Se houver uma interrupção nos logins, a série voltará para o dia 1."',
    activityDetailsNewer: 'Benefícios para Novos Usuários',
    activityDetailsNewerDesc:
      'Os usuários novatos poderão participar das tarefas de boas-vindas para iniciantes que estão na sua primeira semana de registro. As recompensas incluem, mas não estão limitados a, tarefas exclusivas para iniciantes (por exemplo, vantagens de coleções, descontos de recarga), com tipos e quantidades de recompensas específicas, conforme exibido na página.',
    todayBenefits: `Benefícios Diários`,
    todayBenefitsDesc:
      'A lista de tarefas diárias será atualizada à 0:00, incluindo, mas não se limitando a, tarefas diárias de visualização, navegação em vídeos/artigos e tarefas especiais únicas. Mais tarefas também serão introduzidas periodicamente no futuro, portanto fique atento.',
    watchEewards: 'Recompensas por Visualização',
    watchEewardsDesc1:
      'Os usuários podem receber recompensas após assistir a durações específicas de conteúdo de vídeo, como dramas, filmes ou documentários na plataforma. (Séries interativas não estão incluídas.)',
    watchEewardsDesc2:
      'Comportamentos anormais, como aceleração dos vídeos, visualizações repetidas, pausas nas reproduções, serão considerados inválidos. A plataforma reserva-se o direito de não contar tais comportamentos para a conclusão da tarefa ou de não distribuir as recompensas.',
    watchAdsRewards: 'Recompensas por Assistir a Anúncios',
    watchAdsRewardsDesc:
      'Os usuários podem ser recompensados após navegar nas páginas/vídeos especificados na plataforma e atender aos requisitos da tarefa.',
    otherTask: 'Outras Recompensas',
    otherTaskDesc:
      'Informações detalhadas sobre outras tarefas estarão sujeitas às regras especiais dentro de cada tarefa. Assuntos não especificados nas regras especiais de tarefas serão regidos por estas Regras Das Atividades.',
    importantNotesTitle: '4. Notas Importantes',
    importantNotesDesc1:
      'A Reelshort reserva-se o direito à interpretação final neste evento.',
    importantNotesDesc2:
      'Devido a limitações com base nos dispositivos, localização, versão dos clientes e outros fatores, usuários diferentes podem receber tarefas diferentes. Agradecemos a compreensão.',
    importantNotesDesc3:
      'A plataforma determinará se os usuários são os mesmos com base no dispositivo, na conta e outras informações. Quando for considerado o mesmo usuário, a base para emissão de recompensas será o recebimento neste dispositivo.',
    importantNotesDesc4:
      'A plataforma tem duas maneiras de emitir recompensas: distribuição automática do sistema e coleta manual do usuário. Para tarefas que exigem coleta manual, os usuários devem adquirir suas recompensas dentro de um tempo especificado (consulte a página da atividade para mais detalhes). Se não for adquirido a tempo, será considerado negação voluntária da recompensa, e serão automaticamente deletadas.',
    contactInformationTitle: '5. Informações de contato',
    contactInformationDesc:
      'Se você tiver alguma dúvida, vá para [Perfil] > [Feedback] e envie seu comentário.'
  },
  th: {
    pageTitle: 'กฎของกิจกรรม',
    activityDescriptionTitle: '1. คำอธิบายกิจกรรม',
    activityDescriptionDesc1:
      'Reelshort จะเปิดตัวกิจกรรมสิทธิประโยชน์ต่างๆ เป็นระยะๆ ซึ่งผู้ใช้สามารถเข้าร่วมและทำงานให้เสร็จสิ้นเพื่อรับรางวัล',
    activityDescriptionDesc2:
      'เหรียญรางวัลที่ได้รับจากการทำภารกิจเสร็จสมบูรณ์สามารถใช้เพื่อปลดล็อกซีรี่ย์ที่ต้องชำระเงินได้',
    participationMethodTitle: '2. วิธีการเข้าร่วม',
    participationMethodDesc:
      'กิจกรรมนี้เปิดให้สำหรับผู้ใช้ Reelshort ที่ลงทะเบียนทั้งหมด',
    activityDetailsTitle: '3. รายละเอียดกิจกรรม',
    activityDetailsCheckIn: 'เช็คอิน',
    activityDetailsCheckInDesc:
      'สามารถรับรางวัลการเช็คอินได้ตั้งแต่เวลา 0:00 น. ของทุกวัน ยิ่งเช็คอินติดต่อกันนานเท่าไรยิ่งได้รับรางวัลมากขึ้นเท่านั้น หากมีการหยุดพักในการเช็คอินระบบจะรีเซ็ตเป็นวันที่ 1 "',
    activityDetailsNewer: 'ประโยชน์ของผู้ใช้ใหม่',
    activityDetailsNewerDesc:
      'ผู้ใช้สามารถมีส่วนร่วมในงานสิทธิประโยชน์ผู้มาใหม่ได้ภายใน 7 วันนับจากวันที่ลงทะเบียน วิธีการให้รางวัลรวมถึงแต่ไม่จำกัดเพียงงานพิเศษสำหรับผู้มาใหม่ (เช่น สิทธิประโยชน์คอลเลกชั่นผู้มาใหม่ ส่วนลดการเติมเงินผู้มาใหม่) โดยมีประเภทรางวัลและปริมาณที่เฉพาะเจาะจงตามที่แสดงบนหน้าเว็บ',
    todayBenefits: `สิทธิประโยชน์ของวันนี้`,
    todayBenefitsDesc:
      'รายการงานประจำวันจะได้รับการอัปเดตเวลา 0:00 น. ซึ่งรวมถึงแต่ไม่จำกัดเพียงภารกิจดูเนื้อหาประจำวัน การเรียกดูวิดีโอ/บทความและภารกิจพิเศษแบบครั้งเดียว ภารกิจที่ให้สิทธิประโยชน์เพิ่มเติมจะได้รับการแนะนำเป็นระยะในอนาคต โปรดติดตามไว้',
    watchEewards: 'รับชมรางวัล',
    watchEewardsDesc1:
      'ผู้ใช้สามารถรับรางวัลหลังจากดูเนื้อหาวิดีโอตามระยะเวลาที่กำหนดเช่น ละคร ภาพยนตร์ หรือสารคดีบนแพลตฟอร์ม (ไม่รวมซีรี่ส์อินเตอร์แอคทีฟ)',
    watchEewardsDesc2:
      'พฤติกรรมการใช้งานที่ผิดปกติ เช่น การเรียกดูวิดีโออย่างรวดเร็วการดูซ้ำๆ การหยุดเล่นชั่วคราวทั้งหมดจะถือว่าไม่ถูกต้อง แพลตฟอร์มขอสงวนสิทธิ์ที่จะไม่นับพฤติกรรมดังกล่าวตามระยะเวลางานที่ถูกต้องหรือไม่แจกจ่ายรางวัล',
    watchAdsRewards: 'รับรางวัลจากการดูโฆษณา',
    watchAdsRewardsDesc:
      'ผู้ใช้สามารถรับรางวัลหลังจากเรียกดูหน้า/วิดีโอที่ระบุบนแพลตฟอร์มและตรงตามข้อกำหนดของภารกิจ',
    otherTask: 'รางวัลอื่นๆ',
    otherTaskDesc:
      'ข้อมูลโดยละเอียดเกี่ยวกับงานอื่นๆ จะต้องอยู่ภายใต้กฎงานพิเศษภายในแต่ละงาน เรื่องที่ไม่ได้ระบุไว้ในกฎภารกิจพิเศษจะอยู่ภายใต้กฎของกิจกรรมเหล่านี้',
    importantNotesTitle: '4. หมายเหตุสำคัญ',
    importantNotesDesc1:
      'Reelshort ขอสงวนสิทธิ์ในการตีความขั้นสุดท้ายของกิจกรรมนี้',
    importantNotesDesc2:
      'เนื่องจากข้อจำกัดขึ้นอยู่กับอุปกรณ์ตำแหน่ง เวอร์ชันไคลเอ็นต์ และปัจจัยอื่นๆ ผู้ใช้ที่แตกต่างกันอาจเห็นงานที่แตกต่างกัน ขอขอบคุณที่เข้าใจ',
    importantNotesDesc3:
      'แพลตฟอร์มจะกำหนดว่าผู้ใช้เหมือนกันหรือไม่ขึ้นอยู่กับอุปกรณ์บัญชีและข้อมูลอื่นๆ เมื่อพิจารณาว่าเป็นผู้ใช้รายเดียวกันพื้นฐานสำหรับการออกรางวัลจะขึ้นอยู่กับว่ามีการออกรางวัลไปยังอุปกรณ์นั้นหรือไม่',
    importantNotesDesc4:
      'แพลตฟอร์มมีสองวิธีในการออกรางวัล: การกระจายระบบอัตโนมัติและการรวบรวมผู้ใช้ด้วยตนเอง สำหรับงานที่ต้องมีการรวบรวมด้วยตนเอง ผู้ใช้จะต้องขอรับรางวัลภายในเวลาที่กำหนด (ดูหน้ากิจกรรมสำหรับรายละเอียด) หากไม่ได้รับสิทธิ์ภายในเวลาที่กำหนดจะถือว่าเป็นการริบรางวัลโดยสมัครใจและรางวัลที่ไม่ได้รับสิทธิ์จะถูกล้างโดยอัตโนมัติ',
    contactInformationTitle: '5. ข้อมูลการติดต่อ',
    contactInformationDesc:
      'หากคุณมีคำถามใดๆ โปรดไปที่ [Profile] > [Feedback] เพื่อให้ข้อเสนอแนะ'
  },
  in: {
    pageTitle: 'Peraturan Kegiatan',
    activityDescriptionTitle: '1. Deskripsi Kegiatan',
    activityDescriptionDesc1:
      'Reelshort secara berkala akan meluncurkan berbagai aktivitas bermanfaat, di mana pengguna dapat berpartisipasi dan menyelesaikan tugas untuk mendapatkan hadiah.',
    activityDescriptionDesc2:
      'Koin hadiah yang diperoleh dari menyelesaikan tugas dapat digunakan untuk membuka seri berbayar.',
    participationMethodTitle: '2. Metode Partisipasi',
    participationMethodDesc:
      'Kegiatan ini terbuka untuk semua pengguna terdaftar Reelshort.',
    activityDetailsTitle: '3. Detail Kegiatan',
    activityDetailsCheckIn: 'Check-in',
    activityDetailsCheckInDesc:
      'Hadiah check-in dapat diklaim mulai pukul 0:00 setiap hari. Semakin panjang check-in berturut-turut, semakin besar hadiahnya. Jika ada jeda dalam check-in, maka akan diulang ke hari pertama.',
    activityDetailsNewer: 'Keuntungan Pengguna Baru',
    activityDetailsNewerDesc:
      'Pengguna dapat berpartisipasi dalam tugas-tugas pendatang baru dalam waktu 7 hari setelah pendaftaran. Metode hadiah termasuk tetapi tidak terbatas pada tugas pendatang baru eksklusif (misalnya, manfaat pengumpulan pendatang baru, diskon isi ulang pendatang baru), dengan jenis dan jumlah hadiah tertentu seperti yang ditampilkan di halaman.',
    todayBenefits: `Keuntungan Hari Ini`,
    todayBenefitsDesc:
      'Daftar tugas harian diperbarui pada pukul 0:00, termasuk tetapi tidak terbatas pada tugas menonton harian, menjelajahi video/artikel, dan tugas spesial satu kali. Lebih banyak tugas menguntungkan juga akan diperkenalkan secara berkala di masa mendatang, jadi pantau terus.',
    watchEewards: 'Hadiah menonton',
    watchEewardsDesc1:
      'Pengguna dapat menerima hadiah setelah menonton konten video dengan durasi tertentu seperti drama, film, atau dokumenter di platform. (Serial interaktif tidak termasuk).',
    watchEewardsDesc2:
      'Perilaku penggunaan yang tidak normal seperti penelusuran video yang cepat, menonton berulang-ulang, menjeda pemutaran, semuanya akan dianggap tidak valid. Platform berhak untuk tidak menghitung perilaku tersebut dalam durasi tugas yang valid atau tidak membagikan hadiah.',
    watchAdsRewards: 'Hadiah menonton iklan',
    watchAdsRewardsDesc:
      'Pengguna dapat mengklaim hadiah setelah menjelajahi halaman / video yang ditentukan di platform dan memenuhi persyaratan tugas.',
    otherTask: 'Hadiah lainnya',
    otherTaskDesc:
      'Informasi terperinci tentang tugas lain harus tunduk pada aturan tugas khusus dalam setiap tugas. Hal-hal yang tidak disebutkan dalam aturan tugas khusus akan diatur oleh Aturan Kegiatan ini.',
    importantNotesTitle: '4. Catatan Penting',
    importantNotesDesc1:
      'Reelshort berhak atas interpretasi akhir dari acara ini.',
    importantNotesDesc2:
      'Karena keterbatasan berdasarkan perangkat, lokasi, versi klien, dan faktor lainnya, pengguna yang berbeda mungkin akan melihat tugas yang berbeda. Terima kasih atas pengertianmu.',
    importantNotesDesc3:
      'Platform akan menentukan apakah pengguna sama berdasarkan perangkat, akun, dan informasi lainnya. Jika dianggap sebagai pengguna yang sama, dasar penerbitan hadiah akan didasarkan pada apakah hadiah telah diterbitkan untuk perangkat tersebut.',
    importantNotesDesc4:
      'Platform ini memiliki dua cara untuk mengeluarkan hadiah: distribusi sistem otomatis dan pengumpulan pengguna secara manual. Untuk tugas yang membutuhkan pengumpulan manual, pengguna harus mengklaim hadiah mereka dalam waktu yang ditentukan (lihat halaman aktivitas untuk detailnya). Jika tidak diklaim tepat waktu, maka akan dianggap sebagai merelakan hadiah secara sukarela, dan hadiah yang tidak diklaim akan dihapus secara otomatis.',
    contactInformationTitle: '5. Informasi kontak',
    contactInformationDesc:
      'Jika kamu memiliki pertanyaan, silakan buka [Profil] > [Umpan Balik] untuk memberikan umpan balik.'
  },
  de: {
    pageTitle: 'Aktivitätsregeln',
    activityDescriptionTitle: '1. Aktivitätenbeschreibung',
    activityDescriptionDesc1:
      'Reelshort wird in regelmäßigen Abständen verschiedene Benefit-Aktionen starten, an denen die Nutzer teilnehmen und Aufgaben erfüllen können, um Belohnungen zu erhalten.',
    activityDescriptionDesc2:
      'Mit den Belohnungsmünzen, die man durch das Erfüllen von Aufgaben erhält, kann man kostenpflichtige Serien freischalten.',
    participationMethodTitle: '2. Teilnahmemethode',
    participationMethodDesc:
      'Die Aktivitäten sind für alle registrierten Nutzer von Reelshort zugänglich.',
    activityDetailsTitle: '3. Einzelheiten zur Aktivität',
    activityDetailsCheckIn: 'Check-in',
    activityDetailsCheckInDesc:
      'Die Check-in-Belohnungen können jeden Tag ab 0:00 Uhr eingelöst werden. Je länger die aufeinanderfolgenden Check-in-Tage sind, desto größer sind die Belohnungen. Bei einer Unterbrechung der Check-ins wird der Wert auf Tag 1 zurückgesetzt.',
    activityDetailsNewer: 'Vorteile für neue Nutzer',
    activityDetailsNewerDesc:
      'Nutzer können innerhalb von 7 Tagen nach der Registrierung an Aufgaben für neue Nutzer teilnehmen. Zu den Belohnungsmethoden gehören unter anderem exklusive Aufgaben für neue Nutzer (z. B. Sammelvorteile für neue Nutzer, Rabatte für neue Nutzer) mit bestimmten Belohnungsarten und Mengen, die auf der Seite angezeigt werden.',
    todayBenefits: `Heutige Vorteile`,
    todayBenefitsDesc:
      'Die tägliche Aufgabenliste wird um 0:00 Uhr aktualisiert. Sie enthält unter anderem Aufgaben zum täglichen Anschauen, zum Durchsuchen von Videos oder Artikeln und spezielle einmalige Aufgaben. In Zukunft werden auch regelmäßig weitere Aufgaben mit Nutzen eingeführt - also bleib dran.',
    watchEewards: 'Belohnungen fürs Anschauen',
    watchEewardsDesc1:
      'Nutzer können Belohnungen erhalten, wenn sie eine bestimmte Zeit lang Videoinhalte wie Dramen, Filme oder Dokumentationen auf der Plattform ansehen. (Interaktive Serien sind nicht enthalten.)',
    watchEewardsDesc2:
      'Ungewöhnliches Nutzungsverhalten wie schnelles Überfliegen von Videos, wiederholtes Anschauen oder Pausieren der Wiedergabe wird als ungültig betrachtet. Die Plattform behält sich das Recht vor, solche Verhaltensweisen nicht auf die gültige Aufgabendauer anzurechnen oder keine Belohnungen zu verteilen.',
    watchAdsRewards: 'Anzeigen ansehen',
    watchAdsRewardsDesc:
      'Nutzer können Belohnungen einfordern, nachdem sie die angegebenen Seiten oder Videos auf der Plattform durchschauen und die Aufgabenanforderungen erfüllt haben.',
    otherTask: 'Andere Aufgaben',
    otherTaskDesc:
      'Detaillierte Informationen zu anderen Aufgaben sind in den besonderen Aufgabenregeln der jeweiligen Aufgabe enthalten. Angelegenheiten, die nicht in den Regeln für Sonderaufgaben aufgeführt sind, werden durch diese Regeln für die Aktivitäten bestimmt.',
    importantNotesTitle: '4. Wichtige Hinweise',
    importantNotesDesc1:
      'Reelshort behält sich das Recht auf die endgültige Auslegung dieses Events vor.',
    importantNotesDesc2:
      'Aufgrund von Einschränkungen, die auf dem Gerät, dem Standort, der Client-Version und anderen Faktoren beruhen, können verschiedene Nutzer unterschiedliche Aufgaben sehen. Wir danken dir für dein Verständnis.',
    importantNotesDesc3:
      'Die Plattform stellt anhand von Gerät, Konto und anderen Informationen fest, ob es sich um denselben Nutzer handelt. Wenn es sich um denselben Nutzer handelt, wird die Grundlage für die Vergabe von Belohnungen darauf basieren, ob Belohnungen für dieses Gerät vergeben wurden.',
    importantNotesDesc4:
      'Auf der Plattform gibt es zwei Möglichkeiten, Belohnungen zu vergeben: die automatische Verteilung durch das System und die manuelle Abholung durch die Nutzer. Bei Aufgaben, die ein manuelles Einsammeln erfordern, müssen die Nutzer ihre Belohnungen innerhalb einer bestimmten Zeitspanne einfordern (siehe die Aktivitätsseite für weitere Informationen). Wird die Belohnung nicht rechtzeitig eingefordert, gilt dies als freiwilliger Verzicht auf die Belohnung und die nicht eingeforderten Belohnungen werden automatisch gelöscht.',
    contactInformationTitle: '5. Kontaktinformationen',
    contactInformationDesc:
      'Wenn du Fragen hast, gehe bitte zu [Profil] > [Feedback], um uns Feedback zu geben.'
  },
  fr: {
    pageTitle: 'Règles des activités',
    activityDescriptionTitle: '1. Description',
    activityDescriptionDesc1:
      'Reelshort organisera de temps en temps des activités à avantages divers, auxquelles les utilisateurs pourront participer et accomplir des tâches pour obtenir des récompenses.',
    activityDescriptionDesc2:
      'Les pièces de récompense obtenues en accomplissant des tâches peuvent être utilisées pour débloquer des séries payantes.',
    participationMethodTitle: '2. Méthodes de participation',
    participationMethodDesc:
      'Les activités sont ouvertes à tous les utilisateurs enregistrés de Reelshort.',
    activityDetailsTitle: `3. Détails de l'activité`,
    activityDetailsCheckIn: 'Enregistrement',
    activityDetailsCheckInDesc: `Les récompenses d'enregistrement peuvent être réclamées à partir de 0h00 chaque jour. Plus les jours d'enregistrement consécutifs sont longs, plus les récompenses sont importantes. S'il y a une interruption dans l'enregistrement, il sera réinitialisé au jour 1.`,
    activityDetailsNewer: 'Bonus pour les nouveaux utilisateurs',
    activityDetailsNewerDesc: `Les utilisateurs peuvent participer à des tâches offrant des récompenses aux nouveaux membres dans les 7 jours suivant leur inscription. Les méthodes de récompense comprennent, sans s'y limiter, les tâches exclusives pour les nouveaux membres (par exemple, les bonus de collecte pour les nouveaux membres, les remises sur les recharges pour les nouveaux membres), dont les types et les quantités de récompenses spécifiques sont affichés sur la page.`,
    todayBenefits: `Bonus du Jour`,
    todayBenefitsDesc: `La liste des tâches quotidiennes est mise à jour à 0h00, y compris, mais sans s'y limiter, les tâches quotidiennes de visionnage, la navigation dans les vidéos/articles et les tâches spéciales ponctuelles. D'autres tâches avec bonus seront également lancées de temps en temps à l'avenir, alors restez connectés.`,
    watchEewards: 'Récompenses de visionnage',
    watchEewardsDesc1:
      'Les utilisateurs peuvent recevoir des récompenses après avoir regardé, pendant une durée déterminée, des contenus vidéo tels que des séries, des films ou des documentaires sur la plateforme. (Les séries interactives ne sont pas incluses).',
    watchEewardsDesc2: `Les comportements d'utilisation anormaux tels que la navigation rapide dans les vidéos, le visionnage répété, la mise en pause de la lecture seront tous considérés comme invalides. La plateforme se réserve le droit de ne pas comptabiliser ces comportements dans la durée valide de la tâche ou de ne pas distribuer de récompenses.`,
    watchAdsRewards: 'Récompenses de visionnage de publicité',
    watchAdsRewardsDesc:
      'Les utilisateurs peuvent réclamer des récompenses après avoir parcouru les pages/vidéos spécifiées sur la plateforme et satisfait aux exigences de la tâche.',
    otherTask: 'Autres tâches',
    otherTaskDesc:
      'Les informations détaillées sur les autres tâches sont soumises aux règles spécifiques de chaque tâche. Les points qui ne sont pas spécifiés dans les règles des tâches spéciales sont régis par le présent règlement des activités.',
    importantNotesTitle: '4. Remarques importantes',
    importantNotesDesc1: `Reelshort se réserve le droit à l'interprétation finale de cet événement.`,
    importantNotesDesc2: `En raison de limitations basées sur l'appareil, la localisation, la version et d'autres facteurs, les différents utilisateurs peuvent voir des tâches différentes. Merci pour votre compréhension.`,
    importantNotesDesc3: `La plateforme déterminera si les utilisateurs sont les mêmes en fonction de l'appareil, du compte et d'autres informations. Lorsqu'ils sont considérés comme le même utilisateur, la base d'émission des récompenses sera basée sur le fait que des récompenses ont été émises sur cet appareil.`,
    importantNotesDesc4: `La plateforme propose deux façons de distribuer des récompenses : la distribution automatique par le système et la collecte manuelle par l'utilisateur. Pour les tâches qui nécessitent une collecte manuelle, les utilisateurs doivent réclamer leurs récompenses dans un délai précis (voir la page de l'activité pour plus de détails). Si elles ne sont pas réclamées à temps, elles seront considérées comme un abandon volontaire de la récompense, et les récompenses non réclamées seront automatiquement effacées.`,
    contactInformationTitle: '5. Informations de contact',
    contactInformationDesc:
      'Si vous avez des questions, veuillez vous rendre sur [Profil] > [Feedback] pour donner votre avis.'
  },
  hi: {
    pageTitle: 'गतिविधि नियम',
    activityDescriptionTitle: '1. गतिविधि विवरण',
    activityDescriptionDesc1:
      'रीलशॉर्ट समय-समय पर विभिन्न लाभकारी गतिविधियाँ शुरू करेगा, जहाँ उपयोगकर्ता भाग ले सकते हैं और पुरस्कार अर्जित करने के लिए कार्य पूरा कर सकते हैं।',
    activityDescriptionDesc2:
      'कार्य पूरा करने से प्राप्त इनाम सिक्कों का उपयोग भुगतान श्रृंखला को अनलॉक करने के लिए किया जा सकता है।',
    participationMethodTitle: '2. भागीदारी विधि',
    participationMethodDesc:
      'गतिविधियाँ रीलशॉर्ट के सभी पंजीकृत उपयोगकर्ताओं के लिए खुली हैं।',
    activityDetailsTitle: '3. गतिविधि विवरण',
    activityDetailsCheckIn: 'चेक-इन',
    activityDetailsCheckInDesc:
      'चेक-इन पुरस्कारों का दावा प्रत्येक दिन 0:00 बजे से किया जा सकता है। लगातार चेक-इन दिन जितने लंबे होंगे, पुरस्कार उतने ही अधिक होंगे। यदि चेक-इन में कोई ब्रेक है, तो यह दिन 1 पर रीसेट हो जाएगा।"',
    activityDetailsNewer: 'नए उपयोगकर्ता लाभ',
    activityDetailsNewerDesc:
      'उपयोगकर्ता पंजीकरण के 7 दिनों के भीतर नवागंतुक लाभ कार्यों में भाग ले सकते हैं। पुरस्कार विधियों में अनन्य नवागंतुक कार्य (जैसे, नवागंतुक संग्रह लाभ, नवागंतुक रिचार्ज छूट) शामिल हैं, लेकिन पृष्ठ पर प्रदर्शित विशिष्ट पुरस्कार प्रकार और मात्रा के साथ सीमित नहीं हैं।',
    todayBenefits: `आज के लाभ`,
    todayBenefitsDesc:
      'दैनिक कार्य सूची 0:00 बजे अपडेट की जाती है, जिसमें दैनिक देखने के कार्य, वीडियो/लेख ब्राउज़ करना और विशेष एक बार के कार्य शामिल हैं, लेकिन इन्हीं तक सीमित नहीं हैं। भविष्य में समय-समय पर और अधिक लाभ कार्य भी पेश किए जाएंगे, इसलिए देखते रहें।',
    watchEewards: 'पुरस्कार देखें',
    watchEewardsDesc1:
      'उपयोगकर्ता प्लेटफ़ॉर्म पर ड्रामा, मूवी या डॉक्यूमेंट्री जैसी वीडियो सामग्री की निर्दिष्ट अवधि देखने के बाद पुरस्कार प्राप्त कर सकते हैं। (इंटरैक्टिव सीरीज़ शामिल नहीं हैं।)',
    watchEewardsDesc2:
      'असामान्य उपयोग व्यवहार जैसे कि तेज़ वीडियो ब्राउज़िंग, बार-बार देखना, प्लेबैक रोकना सभी को अमान्य माना जाएगा। प्लेटफ़ॉर्म ऐसे व्यवहारों को वैध कार्य अवधि की ओर नहीं गिनने या पुरस्कार वितरित न करने का अधिकार सुरक्षित रखता है।',
    watchAdsRewards: 'विज्ञापन पुरस्कार देखें',
    watchAdsRewardsDesc:
      'उपयोगकर्ता प्लेटफ़ॉर्म पर निर्दिष्ट पृष्ठों/वीडियो को ब्राउज़ करने और कार्य आवश्यकताओं को पूरा करने के बाद पुरस्कार का दावा कर सकते हैं।',
    otherTask: 'अन्य पुरस्कार',
    otherTaskDesc:
      'अन्य कार्यों पर विस्तृत जानकारी प्रत्येक कार्य के भीतर विशेष कार्य नियमों के अधीन होगी। विशेष कार्य नियमों में निर्दिष्ट नहीं किए गए मामलों को गतिविधियों के इन नियमों द्वारा नियंत्रित किया जाएगा।',
    importantNotesTitle: '4. महत्वपूर्ण नोट्स',
    importantNotesDesc1:
      'रीलशॉर्ट इस घटना की अंतिम व्याख्या का अधिकार सुरक्षित रखता है।',
    importantNotesDesc2:
      'डिवाइस, स्थान, क्लाइंट संस्करण और अन्य कारकों पर आधारित सीमाओं के कारण, अलग-अलग उपयोगकर्ता अलग-अलग कार्य देख सकते हैं। आपकी समझ के लिए धन्यवाद।',
    importantNotesDesc3:
      'प्लेटफ़ॉर्म यह निर्धारित करेगा कि डिवाइस, खाते और अन्य जानकारी के आधार पर उपयोगकर्ता समान हैं या नहीं। जब एक ही उपयोगकर्ता माना जाता है, तो पुरस्कार जारी करने का आधार इस बात पर आधारित होगा कि उस डिवाइस को पुरस्कार जारी किए गए हैं या नहीं।',
    importantNotesDesc4:
      'प्लेटफ़ॉर्म के पास पुरस्कार जारी करने के दो तरीके हैं: स्वचालित सिस्टम वितरण और मैन्युअल उपयोगकर्ता संग्रह। ऐसे कार्यों के लिए जिनके लिए मैन्युअल संग्रह की आवश्यकता होती है, उपयोगकर्ताओं को निर्दिष्ट समय के भीतर अपने पुरस्कारों का दावा करना चाहिए (विवरण के लिए गतिविधि पृष्ठ देखें)। यदि समय पर दावा नहीं किया जाता है, तो इसे पुरस्कार का स्वैच्छिक जब्ती माना जाएगा, और दावा न किए गए पुरस्कार स्वचालित रूप से साफ़ हो जाएँगे।',
    contactInformationTitle: '5. संपर्क जानकारी',
    contactInformationDesc:
      'यदि आपके कोई प्रश्न हैं, तो कृपया प्रतिक्रिया देने के लिए [प्रोफ़ाइल] > [फ़ीडबैक] पर जाएँ।'
  },
  fil: {
    pageTitle: 'Mga Panuntunan sa Aktibidad',
    activityDescriptionTitle: '1. Paglalarawan ng Gawain',
    activityDescriptionDesc1: `Pana-panahong maglulunsad ang Reelshort ng iba't ibang aktibidad sa benepisyo, kung saan maaaring lumahok ang mga user at kumpletuhin ang mga gawain upang makakuha ng mga reward.`,
    activityDescriptionDesc2:
      'Ang mga reward na barya na nakuha mula sa pagkumpleto ng mga gawain ay maaaring gamitin upang i-unlock ang bayad na serye.',
    participationMethodTitle: '2. Paraan ng Pakikilahok',
    participationMethodDesc:
      'Ang Mga Aktibidad ay bukas sa lahat ng mga rehistradong gumagamit ng Reelshort.',
    activityDetailsTitle: '3. Mga Detalye ng Aktibidad',
    activityDetailsCheckIn: 'Check-in',
    activityDetailsCheckInDesc:
      'Maaaring i-claim ang mga reward sa check-in simula 0:00 bawat araw. Kung mas mahaba ang magkakasunod na araw ng check-in, mas malaki ang mga reward. Kung may break sa check-in, mare-reset ito sa unang araw."',
    activityDetailsNewer: 'Mga Bagong Benepisyo ng User',
    activityDetailsNewerDesc:
      'Maaaring lumahok ang mga user sa mga gawain sa benepisyo ng bagong dating sa loob ng 7 araw pagkatapos ng pagpaparehistro. Kasama sa mga paraan ng reward ang ngunit hindi limitado sa mga eksklusibong gawain ng bagong dating (hal., mga benepisyo sa pagkolekta ng bagong dating, mga diskwento sa recharge ng bagong dating), na may mga partikular na uri at dami ng reward gaya ng ipinapakita sa page.',
    todayBenefits: `Mga Benepisyo Ngayon`,
    todayBenefitsDesc:
      'Ang listahan ng pang-araw-araw na gawain ay ina-update sa 0:00, kabilang ang ngunit hindi limitado sa mga gawain sa araw-araw na panonood, pagba-browse ng mga video/artikulo, at mga espesyal na minsanang gawain. Ang higit pang mga gawain sa benepisyo ay ipapakilala din sa pana-panahon sa hinaharap, kaya manatiling nakatutok.',
    watchEewards: 'Manood ng mga reward',
    watchEewardsDesc1:
      'Maaaring makatanggap ng mga reward ang mga user pagkatapos manood ng mga tinukoy na tagal ng nilalamang video gaya ng drama, pelikula, o dokumentaryo sa platform. (Hindi kasama ang mga interactive na serye.)',
    watchEewardsDesc2:
      'Ang mga hindi normal na gawi sa paggamit gaya ng mabilis na pagba-browse ng video, paulit-ulit na panonood, pag-pause ng playback ay ituturing na hindi wasto. Inilalaan ng Platform ang karapatan na huwag bilangin ang mga naturang pag-uugali patungo sa wastong tagal ng gawain o hindi upang mamahagi ng mga gantimpala.',
    watchAdsRewards: 'Panoorin ang mga gantimpala ng mga ad',
    watchAdsRewardsDesc:
      'Maaaring mag-claim ng mga reward ang mga user pagkatapos i-browse ang mga tinukoy na page/video sa platform at matugunan ang mga kinakailangan sa gawain.',
    otherTask: 'Iba pang mga gantimpala',
    otherTaskDesc:
      'Ang detalyadong impormasyon sa iba pang mga gawain ay sasailalim sa mga espesyal na panuntunan sa gawain sa loob ng bawat gawain. Ang mga bagay na hindi tinukoy sa mga tuntunin ng espesyal na gawain ay pamamahalaan ng Mga Panuntunan ng Mga Aktibidad na ito.',
    importantNotesTitle: '4. Mahahalagang Tala',
    importantNotesDesc1:
      'Inilalaan ng Reelshort ang karapatan sa huling interpretasyon ng kaganapang ito.',
    importantNotesDesc2: `Dahil sa mga limitasyon batay sa device, lokasyon, bersyon ng kliyente, at iba pang salik, maaaring makakita ng iba't ibang gawain ang iba't ibang user. Salamat sa iyong pag-unawa.`,
    importantNotesDesc3:
      'Tutukuyin ng platform kung pareho ang mga user batay sa device, account, at iba pang impormasyon. Kapag isinasaalang-alang ang parehong user, ang batayan para sa pagbibigay ng reward ay ibabatay sa kung ang mga reward ay naibigay na sa device na iyon.',
    importantNotesDesc4:
      'Ang platform ay may dalawang paraan upang magbigay ng mga reward: awtomatikong pamamahagi ng system at manu-manong koleksyon ng user. Para sa mga gawaing nangangailangan ng manu-manong pagkolekta, dapat i-claim ng mga user ang kanilang mga reward sa loob ng tinukoy na oras (tingnan ang page ng aktibidad para sa mga detalye). Kung hindi na-claim sa oras, ituturing itong boluntaryong pag-alis ng reward, at awtomatikong iki-clear ang mga hindi na-claim na reward.',
    contactInformationTitle: '5. Impormasyon sa pakikipag-ugnayan',
    contactInformationDesc:
      'Kung mayroon kang anumang mga katanungan, mangyaring pumunta sa [Profile] > [Feedback] upang magbigay ng feedback.'
  },
  tr: {
    pageTitle: 'Etkinlik Kuralları',
    activityDescriptionTitle: '1. Etkinlik Açıklaması',
    activityDescriptionDesc1:
      'Reelshort, kullanıcıların katılıp ödüller kazanmak için görevleri tamamlayabileceği çeşitli fayda etkinliklerini periyodik olarak başlatacaktır.',
    activityDescriptionDesc2:
      'Görevleri tamamlayarak elde edilen ödül paraları ücretli serilerin kilidini açmak için kullanılabilir.',
    participationMethodTitle: '2. Katılım Yöntemi',
    participationMethodDesc: `Etkinlikler, Reelshort'un tüm kayıtlı kullanıcılarına açıktır.`,
    activityDetailsTitle: '3. Etkinlik Ayrıntıları',
    activityDetailsCheckIn: 'Giriş',
    activityDetailsCheckInDesc: `Giriş ödülleri her gün 0:00'dan itibaren talep edilebilir. Art arda giriş günleri ne kadar uzun olursa, ödüller o kadar büyük olur. Girişlerde bir kesinti olursa, 1. güne sıfırlanır."`,
    activityDetailsNewer: 'Yeni Kullanıcı Avantajları',
    activityDetailsNewerDesc:
      'Kullanıcılar, kayıttan sonraki 7 gün içinde yeni gelen avantaj görevlerine katılabilir. Ödül yöntemleri, sayfada gösterilen belirli ödül türleri ve miktarlarıyla birlikte, özel yeni gelen görevlerini (örneğin, yeni gelen toplama avantajları, yeni gelen şarj indirimleri) içerir, ancak bunlarla sınırlı değildir.',
    todayBenefits: `Bugünün Avantajları`,
    todayBenefitsDesc: `Günlük görev listesi, günlük izleme görevleri, videolara/makalelere göz atma ve özel tek seferlik görevler dahil ancak bunlarla sınırlı olmamak üzere 0:00'da güncellenir. Gelecekte periyodik olarak daha fazla avantaj görevi de sunulacaktır, bu nedenle bizi izlemeye devam edin.`,
    watchEewards: 'İzleme ödülleri',
    watchEewardsDesc1:
      'Kullanıcılar, platformda drama, film veya belgesel gibi belirli sürelerde video içeriği izledikten sonra ödüller alabilir. (Etkileşimli diziler dahil değildir.)',
    watchEewardsDesc2:
      'Hızlı video tarama, tekrarlanan izleme, oynatmayı duraklatma gibi anormal kullanım davranışlarının tümü geçersiz sayılacaktır. Platform, bu tür davranışları geçerli görev süresine dahil etmeme veya ödülleri dağıtmama hakkını saklı tutar.',
    watchAdsRewards: 'Reklam ödüllerini izleyin',
    watchAdsRewardsDesc:
      'Kullanıcılar platformdaki belirtilen sayfaları/videoları gezdikten ve görev gereksinimlerini karşıladıktan sonra ödül talep edebilirler.',
    otherTask: 'Diğer ödüller',
    otherTaskDesc:
      'Diğer görevlerle ilgili ayrıntılı bilgiler, her görev içindeki özel görev kurallarına tabi olacaktır. Özel görev kurallarında belirtilmeyen hususlar, bu Faaliyet Kuralları tarafından yönetilecektir.',
    importantNotesTitle: '4.Önemli Notlar',
    importantNotesDesc1:
      'Reelshort, bu etkinliğin nihai yorumunu yapma hakkını saklı tutar.',
    importantNotesDesc2:
      'Cihaz, konum, istemci sürümü ve diğer faktörlere dayalı sınırlamalar nedeniyle, farklı kullanıcılar farklı görevler görebilir. Anlayışınız için teşekkür ederiz.',
    importantNotesDesc3:
      'Platform, kullanıcıların cihaz, hesap ve diğer bilgilere göre aynı olup olmadığını belirleyecektir. Aynı kullanıcı olarak kabul edildiğinde, ödül verme temeli ödüllerin o cihaza verilip verilmediğine bağlı olacaktır.',
    importantNotesDesc4:
      'Platformun ödül vermenin iki yolu vardır: otomatik sistem dağıtımı ve manuel kullanıcı toplama. Manuel toplama gerektiren görevler için, kullanıcılar ödüllerini belirli bir süre içinde talep etmelidir (ayrıntılar için etkinlik sayfasına bakın). Zamanında talep edilmezse, ödülün gönüllü olarak kaybedildiği kabul edilir ve talep edilmeyen ödüller otomatik olarak temizlenir.',
    contactInformationTitle: '5. İletişim bilgileri',
    contactInformationDesc:
      'Herhangi bir sorunuz varsa, lütfen geri bildirim sağlamak için [Profil] > [Geri Bildirim] bölümüne gidin.'
  },
  ja: {
    pageTitle: '活動ルール',
    activityDescriptionTitle: '1. 活動の説明',
    activityDescriptionDesc1:
      'Reelshortはさまざまな特典活動を随時開催しています。ユーザーが活動に参加してタスクを完了することで報酬を獲得できます。',
    activityDescriptionDesc2:
      'タスクを完了して得られる報酬コインは、有料シリーズのアンロックに使用できます。',
    participationMethodTitle: '2. 参加方法',
    participationMethodDesc:
      'この活動は、Reelshortに登録済みのすべてのユーザーが参加可能です。',
    activityDetailsTitle: '3. 活動の詳細',
    activityDetailsCheckIn: 'チェックイン',
    activityDetailsCheckInDesc:
      'チェックイン報酬は毎日0:00から受け取ることができます。連続してチェックインする日数が長いほど、より多くの報酬が得られます。チェックインを中断した場合、カウントは1日目からリセットされます。',
    activityDetailsNewer: '新規ユーザー限定特典',
    activityDetailsNewerDesc:
      'ユーザーは、登録から7日以内に新規ユーザー向けの特典タスクに参加できます。報酬の方法には、新規ユーザー専用のタスク（例：新規コレクション特典、新規チャージ割引）が含まれます。具体的な報酬の種類と数量はページに表示されます。',
    todayBenefits: `デイリー特典`,
    todayBenefitsDesc:
      '毎日0:00にタスクリストが更新され、日次の視聴タスクや動画/記事の閲覧、一回限りの特別タスクが含まれます。今後もさらなる特典タスクが随時追加されるため、最新情報をお見逃しなく!',
    watchEewards: '視聴報酬',
    watchEewardsDesc1:
      'ドラマ、映画、ドキュメンタリーなどの指定された動画コンテンツを一定時間視聴することで報酬を受け取ることができます（インタラクティブシリーズは対象外）。',
    watchEewardsDesc2:
      '高速での動画閲覧、繰り返し再生、一時停止などの異常な使用行動は無効と見なされます。プラットフォームは、そのような行為を有効なタスク時間に含めない、または報酬を配布しない権利を有します。',
    watchAdsRewards: '広告視聴報酬',
    watchAdsRewardsDesc:
      'プラットフォーム上で指定されたページや動画を閲覧し、タスク要件を満たすことで報酬を受け取ることができます。',
    otherTask: 'その他の報酬',
    otherTaskDesc:
      'その他のタスクに関する詳細は、各タスクの特別ルールに従います。特別ルールに記載されていない事項については、これらの活動ルールが適用されます。',
    importantNotesTitle: '4. 重要な注意事項',
    importantNotesDesc1:
      'Reelshortは本イベントに関する最終的な解釈権を有します。',
    importantNotesDesc2:
      'デバイス、場所、クライアントバージョンなどの制約により、ユーザーによってタスクの表示が異なる場合があります。ご理解のほどよろしくお願い致します',
    importantNotesDesc3:
      'プラットフォームは、デバイス、アカウントなどの情報を基に同一ユーザーかどうかを判断します。同一ユーザーと見なされた場合、報酬の発行基準はそのデバイスへの報酬発行状況に基づきます。',
    importantNotesDesc4:
      'プラットフォームでは、報酬の発行方法として「自動配布」と「手動受け取り」の2つの方法を提供しています。手動受け取りが必要なタスクの場合、ユーザーは指定された期間内に報酬を受け取る必要があります（詳細は活動ページをご参照ください）。期限内に受け取らなかった場合、報酬の放棄と見なされ、未受け取りの報酬は自動的にクリアされます。',
    contactInformationTitle: '5. 問い合わせ先',
    contactInformationDesc:
      'ご質問がある場合は、[プロフィール] > [フィードバック]からお問い合わせください。'
  },
  ko: {
    pageTitle: '활동 규칙',
    activityDescriptionTitle: '1. 활동 설명',
    activityDescriptionDesc1:
      'Reelshort는 불정기적으로 다양한 혜택 활동을 진행하여 사용자가 참여하고 미션을 완성 시 보상을 받을 수 있습니다.',
    activityDescriptionDesc2:
      '미션을 통해 받은 코인은 유료 시리즈를 잠금 해제할 수 있습니다.',
    participationMethodTitle: '2. 참여 방법',
    participationMethodDesc:
      '해당 활동은 Reelshort에 가입된 모든 사용자에게 공개됩니다.',
    activityDetailsTitle: '3. 활동 세부 정보',
    activityDetailsCheckIn: '출석 체크',
    activityDetailsCheckInDesc:
      '매일 0시부터 출석 체크 가능합니다. 누적 출석일에 따라 보상이 강화됩니다. 중간에 출석체크를 놓치면 다시 1일차로 리셋됩니다.',
    activityDetailsNewer: '신규회원가입 혜택',
    activityDetailsNewerDesc:
      '신규 회원 가입 후 7일 이내에 신규 혜택 미션에 참여할 수 있으며, 보상 방식은 신규 전용 미션(예: 신규 저장 혜택, 신규 충전 할인 등)을 포함하되 이에 국한되지 않습니다. 구체적인 보상 유형 및 수량은 페이지에 표시됩니다.',
    todayBenefits: `오늘의 혜택`,
    todayBenefitsDesc:
      '매일 0시에 오늘의 미션 목록이 업데이트되며, 미션은 매일 시청 미션, 영상/기사 탐색 미션, 스페셜 일회성 미션 등을 포함하지만 이에 국한되지 않습니다. 이후에도 불정기적으로 더 많은 혜택 미션이 출시될 예정이니 많은 기대 부탁드립니다.',
    watchEewards: '시청 보상',
    watchEewardsDesc1:
      '사용자는 플랫폼에서 드라마, 영화 또는 다큐멘터리 등 콘텐츠를 지정된 기간을 시청한 후 보상을 받을 수 있습니다. (인터랙티브 시리즈는 포함되지 않습니다.)',
    watchEewardsDesc2:
      '빠른 비디오 탐색, 반복 시청, 재생 일시 정지 등 비정상적인 사용 행동는 무효로 간주될 수 있으며, 이러한 행동을 유효한 미션 시간으로 계산하지 않거나 보상을 지급하지 않을 권리를 보유합니다.',
    watchAdsRewards: '광고 시청 보상',
    watchAdsRewardsDesc:
      '사용자가 지정된 페이지나 비디오를 탐색하며 미션 요구 조건을 달성하면 보상이 지급됩니다',
    otherTask: '기타 보상',
    otherTaskDesc:
      '다른 미션에 대한 상세 정보는 퀘스트의 스페셜 미션 규칙에 따릅니다. 스페셜 미션 규칙에 명시되지 않은 사항은 본 이벤트 규칙이 적용됩니다.',
    importantNotesTitle: '4. 주의사항',
    importantNotesDesc1:
      'Reelshort는 이 이벤트의 최종 해석에 대한 권리를 보유합니다.',
    importantNotesDesc2:
      '기기, 위치, 클라이언트 버전 및 기타 요인에 따른 제한으로 인해 각 사용자에게 보이는 미션이 다를 수 있습니다. 양해 부탁드립니다.',
    importantNotesDesc3:
      '플랫폼은 기기 및 계정 정보를 기반으로 동일 사용자 여부를 판단합니다. 동일 사용자로 간주될 경우, 보상 지급 여부는 해당 기기에서 보상이 흭득하였는지를 기준으로 합니다',
    importantNotesDesc4:
      '플랫폼에는 자동 시스템 배포와 수동 사용자 수령의 두 가지 보상 지급 방법이 있습니다. 수동 수령이 필요한 미션의 경우, 사용자는 지정된 시간 내에 보상을 청구해야 합니다(자세한 내용은 활동 페이지 참조). 시간 내에 청구하지 않을 경우, 보상을 자발적으로 포기한 것으로 간주되며, 청구하지 않은 보상은 자동으로 삭제됩니다',
    contactInformationTitle: '5. 문의',
    contactInformationDesc:
      '문의 사항이 있으시면 [프로필] > [피드백]으로 가셔서 피드백을 남겨 주시기 바랍니다.'
  },
  ru: {
    pageTitle: 'Правила активности',
    activityDescriptionTitle: '1. Описание активности',
    activityDescriptionDesc1:
      'Reelshort будет периодически запускать различные полезные активности, в которых пользователи могут участвовать и выполнять задания, чтобы получать вознаграждения.',
    activityDescriptionDesc2:
      'Монеты, полученные за выполнение заданий, могут быть использованы для активации платных серий.',
    participationMethodTitle: '2. Способ участия',
    participationMethodDesc:
      'В активностях могут принять участие все зарегистрированные пользователи Reelshort.',
    activityDetailsTitle: '3. Детали активности',
    activityDetailsCheckIn: 'Вход в игру',
    activityDetailsCheckInDesc:
      'Награды за вход в игру можно получать ежедневно с 0:00. Чем больше дней подряд вы заходите в приложение, тем большим может быть вознаграждение. Если произойдет перерыв во входах, счет обнулится.',
    activityDetailsNewer: 'Преимущества для новых пользователей',
    activityDetailsNewerDesc:
      'Пользователи могут участвовать в заданиях для новичков в течение 7 дней после регистрации. Методы поощрения включают, но не ограничиваются эксклюзивными заданиями для новичков (например, льготы на коллекцию для новичков, скидки на подписку для новичков), с определенными типами и количеством призов, которые отображаются на странице.',
    todayBenefits: `Сегодняшние награды`,
    todayBenefitsDesc:
      'Ежедневный список заданий обновляется в 0:00, включая, но не ограничиваясь ежедневными заданиями по просмотру видео/статей и специальными разовыми заданиями. В будущем периодически будут появляться и другие полезные задания, так что следите за новостями.',
    watchEewards: 'Вознаграждения за просмотр',
    watchEewardsDesc1:
      'Пользователи могут получать вознаграждения за просмотр в течение определенного времени видеоконтента, такого как драмы, фильмы или документальные фильмы на платформе. (Интерактивные сериалы не включены).',
    watchEewardsDesc2:
      'Ненормальное поведение пользователей, такое как быстрый просмотр видео, повторный просмотр, приостановка воспроизведения, будет считаться недействительным. Платформа оставляет за собой право не засчитывать такое поведение в действительную продолжительность задания или не выдавать вознаграждение.',
    watchAdsRewards: 'Вознаграждения за просмотр рекламы',
    watchAdsRewardsDesc:
      'Пользователи могут получить вознаграждение, просмотрев указанные страницы/видео на платформе и выполнив требования задания.',
    otherTask: 'Другие вознаграждения',
    otherTaskDesc:
      'Подробная информация о других заданиях содержится в правилах специальных заданий в рамках каждого задания. Вопросы, не указанные в правилах специальных заданий, регулируются настоящими Правилами активности.',
    importantNotesTitle: '4.Важные примечания',
    importantNotesDesc1:
      'Reelshort оставляет за собой право на окончательную интерпретацию данного мероприятия.',
    importantNotesDesc2:
      'Из-за ограничений, зависящих от устройства, местоположения, версии клиента и других факторов, разные пользователи могут видеть разные задачи. Благодарим вас за понимание.',
    importantNotesDesc3:
      'Платформа определяет, являются ли пользователи одним и тем же, на основании данных об устройстве, учетной записи и другой информации. Если пользователь считается одним и тем же, основанием для выдачи вознаграждения будет служить информация о том, выдавались ли вознаграждения на это устройство.',
    importantNotesDesc4:
      'Платформа предлагает два способа выдачи вознаграждений: автоматическое распределение системой и ручной сбор пользователями. Для заданий, требующих ручного сбора, пользователи должны получить свои награды в течение определенного времени (подробнее см. на странице активности). Если вознаграждение не будет востребовано вовремя, это будет считаться добровольной потерей вознаграждения, а невостребованные вознаграждения будут автоматически очищены.',
    contactInformationTitle: '5. Контактная информация',
    contactInformationDesc:
      'Если у вас возникли вопросы, перейдите в раздел [Профиль] > [Обратная связь], чтобы оставить отзыв.'
  },
  'zh-TW': {
    pageTitle: '活動規則',
    activityDescriptionTitle: '一、活動說明',
    activityDescriptionDesc1:
      'Reelshort將定期推出各種福利活動，用戶可以參與並完成任務來獲得獎勵。',
    activityDescriptionDesc2: '完成任務獲得的獎勵金幣可以用來解鎖付費系列。',
    participationMethodTitle: '二、參與方式',
    participationMethodDesc: '活動開放給 Reelshort 的所有註冊用戶。',
    activityDetailsTitle: '三、活動詳情',
    activityDetailsCheckIn: '報到',
    activityDetailsCheckInDesc:
      '每天0:00開始即可領取簽到獎勵。連續簽到天數越長，獎勵越豐厚。如果簽到出現中斷，則會重設為第一天。',
    activityDetailsNewer: '新用戶福利',
    activityDetailsNewerDesc:
      '用戶報名後7天內即可參與新人福利任務。獎勵方式包括但不限於新人專屬任務（如新人領取福利、新人儲值折扣），具體獎勵類型和數量以頁面顯示為準。',
    todayBenefits: `今日福利`,
    todayBenefitsDesc:
      '每日任務清單0:00更新，包括但不限於每日觀看任務、瀏覽影片/文章、特殊一次性任務。未來也將定期推出更多福利任務，敬請期待。',
    watchEewards: '觀看獎勵',
    watchEewardsDesc1:
      '用戶在平台上觀看電視劇、電影、紀錄片等影片內容指定時間長度即可獲得獎勵。 （不包括互動系列。）',
    watchEewardsDesc2:
      '快速瀏覽影片、重複觀看、暫停播放等異常使用行為將被視為無效。平台保留不計入任務有效時長或不發放獎勵的權利。',
    watchAdsRewards: '看廣告獎勵',
    watchAdsRewardsDesc:
      '用戶瀏覽平台指定頁面/影片並滿足任務要求後即可領取獎勵。',
    otherTask: '其他獎勵',
    otherTaskDesc:
      '其他任務的詳細資訊應遵守每個任務中的特殊任務規則。專項任務規則未規定的事項，適用本活動規則。',
    importantNotesTitle: '4.重要提示',
    importantNotesDesc1: 'Reelshort保留本次活動的最終解釋權。',
    importantNotesDesc2:
      '由於設備、位置、客戶端版本等因素的限制，不同的使用者可能會看到不同的任務。感謝您的體諒。',
    importantNotesDesc3:
      '平台會根據設備、帳戶等資訊判斷使用者是否相同。當視為同一用戶時，獎勵發放的依據將取決於是否已發放獎勵給該裝置。',
    importantNotesDesc4:
      '平台獎勵發放方式有兩種：系統自動發放和使用者手動領取。對於需要手動領取的任務，使用者必須在規定時間內領取獎勵（詳情請參閱活動頁面）。若未及時領取，將視為自動放棄獎勵，無人領取的獎勵將自動清除。',
    contactInformationTitle: '5、聯絡方式',
    contactInformationDesc:
      '如果您有任何疑問，請前往【我的個人資料】>【意見回饋】進行回饋。'
  },
  it: {
    pageTitle: "Regole dell'Attività",
    activityDescriptionTitle: "1. Descrizione dell'Attività",
    activityDescriptionDesc1:
      'ReelShort lancerà periodicamente varie attività vantaggiose, in cui gli utenti possono partecipare e completare compiti per ottenere premi. Le monete premio ottenute completando i compiti possono essere utilizzate per sbloccare serie a pagamento.',
    activityDescriptionDesc2:
      'Le monete premio ottenute completando i compiti possono essere utilizzate per sbloccare serie a pagamento.',
    participationMethodTitle: '2. Metodo di Partecipazione',
    participationMethodDesc:
      'Le attività sono aperte a tutti gli utenti registrati di ReelShort.',
    activityDetailsTitle: "3. Dettagli dell'Attività",
    activityDetailsCheckIn: 'Check-in',
    activityDetailsCheckInDesc:
      "I premi di check-in possono essere riscattati a partire dalle 00:00 di ogni giorno.Più giorni consecutivi di check-in si accumulano, maggiori saranno i premi.Se vi è un'interruzione nei check-in, il conteggio si resetterà al giorno 1.",
    activityDetailsNewer: 'Vantaggi per i Nuovi Utenti',
    activityDetailsNewerDesc:
      'Gli utenti possono partecipare ai compiti di vantaggio per i nuovi arrivati entro 7 giorni dalla registrazione.I metodi di ricompensa includono, ma non si limitano a, compiti esclusivi per i nuovi arrivati (es. vantaggi per la raccolta di nuovi utenti, sconti di ricarica per i nuovi arrivati), con tipi e quantità specifici di premi come mostrato sulla pagina.',
    todayBenefits: `Vantaggi di Oggi`,
    todayBenefitsDesc:
      "L'elenco dei compiti giornalieri viene aggiornato alle 00:00 e include, ma non si limita a, compiti di visione giornalieri, navigazione di video/articoli e compiti speciali una tantum.Altri compiti vantaggiosi saranno introdotti periodicamente in futuro, quindi restate sintonizzati.",
    watchEewards: 'Premi per la visione',
    watchEewardsDesc1:
      'Gli utenti possono ricevere premi dopo aver guardato per una durata specifica contenuti video come drammi, film o documentari sulla piattaforma. (Le serie interattive non sono incluse.)',
    watchEewardsDesc2:
      'Comportamenti anomali come la navigazione rapida dei video, la visione ripetuta o la pausa durante la riproduzione saranno considerati non validi.La piattaforma si riserva il diritto di non conteggiare tali comportamenti per la durata valida del compito o di non distribuire i premi.',
    watchAdsRewards: 'Premi per la visione degli annunci',
    watchAdsRewardsDesc:
      'Gli utenti possono richiedere premi dopo aver navigato le pagine/video specificati sulla piattaforma e soddisfatto i requisiti del compito.',
    otherTask: 'Altri premi',
    otherTaskDesc:
      'Le informazioni dettagliate sugli altri compiti saranno soggette alle regole specifiche di ogni compito.Le questioni non specificate nelle regole specifiche dei compiti saranno disciplinate da queste Regole delle Attività.',
    importantNotesTitle: '4. Note Importanti',
    importantNotesDesc1:
      'ReelShort si riserva il diritto di interpretazione finale di questo evento.',
    importantNotesDesc2:
      'A causa di limitazioni legate al dispositivo, alla posizione, alla versione del client e ad altri fattori, diversi utenti potrebbero vedere compiti differenti.Grazie per la vostra comprensione.',
    importantNotesDesc3:
      "La piattaforma determinerà se gli utenti sono gli stessi basandosi su dispositivo, account e altre informazioni.Quando considerati come lo stesso utente, il criterio per l'emissione dei premi sarà basato se i premi sono stati assegnati a quel dispositivo.",
    importantNotesDesc4:
      "La piattaforma dispone di due modi per emettere premi: distribuzione automatica del sistema e raccolta manuale dell'utente.Per i compiti che richiedono la raccolta manuale, gli utenti devono richiedere i loro premi entro un tempo specificato (vedi la pagina dell'attività per i dettagli).Se non richiesti in tempo, sarà considerata una rinuncia volontaria al premio, e i premi non richiesti saranno automaticamente cancellati.",
    contactInformationTitle: '5. Informazioni di contatto',
    contactInformationDesc:
      'Se hai domande, vai su [Profilo] > [Feedback] per fornire un feedback.'
  },
  ar: {
    pageTitle: 'قواعد النشاط',
    activityDescriptionTitle: '1. وصف النشاط',
    activityDescriptionDesc1:
      'ستطلق Reelshort بشكل دوري مختلف الأنشطة المزايا، حيث يمكن للمستخدمين المشاركة وإتمام المهام للحصول على المكافآت.',
    activityDescriptionDesc2:
      'يمكن استخدام عملات المكافأة التي تم الحصول عليها من إتمام المهام لفتح المسلسلات المدفوعة.',
    participationMethodTitle: '2. طريقة المشاركة',
    participationMethodDesc:
      'الأنشطة مفتوحة لجميع المستخدمين المسجلين في ReelShort.',
    activityDetailsTitle: '3. تفاصيل النشاط',
    activityDetailsCheckIn: 'تسجيل الدخول',
    activityDetailsCheckInDesc:
      'يمكن المطالبة بمكافآت تسجيل الدخول بدءًا من الساعة 0:00 كل يوم. كلما زادت أيام التسجيل المتتالية، كانت المكافآت أكبر. إذا كان هناك انقطاع في التسجيلات، فسيتم إعادة تعيينه إلى اليوم الأول.',
    activityDetailsNewer: 'فوائد المستخدمين الجدد',
    activityDetailsNewerDesc:
      'يمكن للمستخدمين المشاركة في مهام الفوائد الخاصة بالوافدين الجدد ضمن 7 أيام من التسجيل. تشمل طرق المكافآت ولكن لا تقتصر على المهام الحصرية للمستخدمين الجدد (مثل فوائد جمع الوافد الجديد، خصومات شحن الوافدين الجدد)، مع عرض أنواع المكافآت والكميات المحددة على الصفحة.',
    todayBenefits: `فوائد اليوم`,
    todayBenefitsDesc:
      'يتم تحديث قائمة المهام اليومية في الساعة 0:00، بما في ذلك ولكن لا تقتصر على مهام مشاهدة اليوم، تصفح مقاطع الفيديو/المقالات، والمهام الخاصة لمرة واحدة. سيتم أيضًا تقديم المزيد من مهام الفوائد بشكل دوري في المستقبل، فتابعونا.',
    watchEewards: 'مكافآت المشاهدة',
    watchEewardsDesc1:
      'يمكن للمستخدمين الحصول على مكافآت بعد مشاهدة مدة معينة من المحتوى الفيديو مثل الدراما أو الأفلام أو الوثائقيات على المنصة. (لا تشمل المسلسلات التفاعلية.)',
    watchEewardsDesc2:
      'سيتم اعتبار السلوكيات غير الطبيعية مثل التصفح السريع للفيديو، المشاهدة المتكررة، أو إيقاف التشغيل غير صالحة. تحتفظ المنصة بالحق في عدم احتساب هذه السلوكيات ضمن مدة المهمة الصالحة أو عدم توزيع المكافآت.',
    watchAdsRewards: 'مكافآت مشاهدة الإعلانات',
    watchAdsRewardsDesc:
      'يمكن للمستخدمين المطالبة بالمكافآت بعد تصفح الصفحات/مقاطع الفيديو المحددة على المنصة واستيفاء متطلبات المهمة.',
    otherTask: 'مكافآت أخرى',
    otherTaskDesc:
      'سيتم تحديد المعلومات التفصيلية حول المهام الأخرى بناءً على القواعد الخاصة بكل مهمة. الأمور التي لم يتم تحديدها في القواعد الخاصة بالمهمة ستخضع لهذه القواعد العامة للأنشطة.',
    importantNotesTitle: '4. ملاحظات هامة',
    importantNotesDesc1: 'تحتفظ ReelShort بحق التفسير النهائي لهذا الحدث.',
    importantNotesDesc2:
      'نظرًا للقيود المرتبطة بالجهاز والموقع وإصدار العميل وعوامل أخرى، قد يرى المستخدمون مهامًا مختلفة. شكرًا لتفهمكم.',
    importantNotesDesc3:
      'ستحدد المنصة ما إذا كان المستخدمون هم نفس الشخص استنادًا إلى الجهاز والحساب والمعلومات الأخرى. عند اعتبارهم نفس المستخدم، سيكون أساس إصدار المكافآت بناءً على ما إذا تم إصدار المكافآت لهذا الجهاز.',
    importantNotesDesc4:
      'لدى المنصة طريقتان لإصدار المكافآت: التوزيع التلقائي من النظام والجمع اليدوي من المستخدم. بالنسبة للمهام التي تتطلب جمع يدوي، يجب على المستخدمين المطالبة بمكافآتهم خلال فترة زمنية محددة (راجع صفحة النشاط للحصول على التفاصيل). إذا لم يتم المطالبة بها في الوقت المحدد، سيتم اعتبارها تنازلًا طوعيًا عن المكافأة، وستتم تصفية المكافآت غير المطالب بها تلقائيًا.',
    contactInformationTitle: '5. معلومات الاتصال',
    contactInformationDesc:
      'إذا كان لديك أي أسئلة، يرجى الانتقال إلى [الملف الشخصي] > [التعليقات] لتقديم ملاحظاتك.'
  },
  pl: {
    pageTitle: 'Zasady Działania',
    activityDescriptionTitle: '1. Opis Działalności',
    activityDescriptionDesc1:
      'Reelshort będzie cyklicznie uruchamiać różnorodne akcje, w których użytkownicy mogą uczestniczyć i zdobywać nagrody za wykonywanie zadań.',
    activityDescriptionDesc2:
      'Nagrody w postaci monet zdobyte za wykonywanie zadań można wykorzystać do odblokowywania płatnych seriali.',
    participationMethodTitle: '2. Sposób Uczestnictwa',
    participationMethodDesc:
      'Aktywności są dostępne dla wszystkich zarejestrowanych użytkowników Reelshort.',
    activityDetailsTitle: '3. Szczegóły Aktywności',
    activityDetailsCheckIn: 'Odbierz nagrodę',
    activityDetailsCheckInDesc:
      'Nagrody za logowanie można odebrać od godziny 0:00 każdego dnia. Im dłuższa seria codziennych logowań, tym większe nagrody. Jeśli nastąpi przerwa w codziennych logowaniach, postęp zostanie zresetowany do dnia 1.',
    activityDetailsNewer: 'Korzyści Dla Nowych Użytkowników',
    activityDetailsNewerDesc:
      'Użytkownicy mogą brać udział w zadaniach dla nowych użytkowników w ciągu 7 dni od rejestracji. Metody nagradzania obejmują m.in. ekskluzywne zadania dla nowych użytkowników (np. pakiety powitalne, zniżki na pierwsze doładowanie). Konkretne rodzaje i wielkości nagród są wyświetlane na stronie.',
    todayBenefits: `Dzisiejsze Korzyści`,
    todayBenefitsDesc:
      'Dzienna lista zadań jest aktualizowana o 0:00 i obejmuje m.in. codzienne zadania związane z oglądaniem, przeglądaniem filmów/artykułów oraz specjalne, jednorazowe zadania. W przyszłości będą również cyklicznie wprowadzane kolejne zadania z nagrodami, więc bądź na bieżąco.',
    watchEewards: 'Nagrody za oglądanie',
    watchEewardsDesc1:
      'Użytkownicy mogą otrzymać nagrody po obejrzeniu określonego czasu materiałów wideo, takich jak seriale dramatyczne, filmy czy dokumenty, dostępne na platformie. (Seriale interaktywne nie są uwzględniane).',
    watchEewardsDesc2:
      'Nieprawidłowe zachowania, takie jak szybkie przewijanie, wielokrotne odtwarzanie czy pauzowanie, będą uznawane za niepoprawne. Platforma zastrzega sobie prawo do niezaliczania takich działań do czasu trwania zadania lub do niewypłacania nagród.',
    watchAdsRewards: 'Nagrody za oglądanie reklam',
    watchAdsRewardsDesc:
      'Użytkownicy mogą odebrać nagrody po przejrzeniu określonych stron/filmów na platformie i spełnieniu wymagań zadania.',
    otherTask: 'Inne nagrody',
    otherTaskDesc:
      'Szczegółowe informacje dotyczące innych zadań podlegają zasadom specjalnym określonym dla każdego zadania. Sprawy nieokreślone w specjalnych zasadach danego zadania podlegają niniejszemu Regulaminowi Aktywności.',
    importantNotesTitle: '4.Ważne Uwagi',
    importantNotesDesc1:
      'Reelshort zastrzega sobie prawo do ostatecznej interpretacji niniejszego wydarzenia.',
    importantNotesDesc2:
      'Ze względu na ograniczenia wynikające z urządzenia, lokalizacji, wersji aplikacji i innych czynników, różni użytkownicy mogą widzieć inne zadania. Dziękujemy za zrozumienie.',
    importantNotesDesc3:
      'Platforma określa, czy to ci sami użytkownicy, na podstawie urządzenia, konta i innych informacji. Gdy platforma uzna, że to ci sami użytkownicy, nagrody będą przyznawane na podstawie tego, czy nagrody zostały już przyznane na danym urządzeniu.',
    importantNotesDesc4:
      'Platforma ma dwa sposoby na wydawanie nagród: automatyczną dystrybucję przez system i ręczny odbiór przez użytkownika. Dla zadań wymagających ręcznego odbioru, użytkownicy muszą aktywować swoje nagrody w określonym czasie (szczegóły na stronie aktywności). Jeśli nagrody nie zostaną odebrane na czas, zostanie to uznane za dobrowolną rezygnację, a nieodebrane nagrody zostaną automatycznie usunięte.',
    contactInformationTitle: '5. Informacje kontaktowe',
    contactInformationDesc:
      'Jeśli masz jakieś pytania, przejdź do [Profil] > [Opinie], aby przekazać nam swoją opinię.'
  },
  ro: {
    pageTitle: 'Reguli de activitate',
    activityDescriptionTitle: '1. Descrierea activității',
    activityDescriptionDesc1:
      'Reelshort va lansa periodic diverse activități cu beneficii, la care utilizatorii pot participa și pot finaliza sarcini pentru a câștiga recompense.',
    activityDescriptionDesc2:
      'Monedele de recompensă obținute prin finalizarea sarcinilor pot fi folosite pentru a debloca serii plătite.',
    participationMethodTitle: '2. Metodă de participare',
    participationMethodDesc:
      'Activitățile sunt deschise tuturor utilizatorilor înregistrați ai Reelshort.',
    activityDetailsTitle: '3. Detalii activitate',
    activityDetailsCheckIn: 'Autentificare',
    activityDetailsCheckInDesc:
      'Recompensele de autentificare pot fi revendicate începând cu ora 0:00 în fiecare zi. Cu cât zilele consecutive de autentificare sunt mai lungi, cu atât recompensele sunt mai mari. Dacă există o întrerupere a înregistrărilor, acestea se vor reseta la ziua 1.',
    activityDetailsNewer: 'Beneficii pentru utilizatorii noi',
    activityDetailsNewerDesc:
      'Utilizatorii pot participa la sarcini cu beneficii pentru începători în termen de 7 zile de la înregistrare. Metodele de recompensă includ, dar nu se limitează la, sarcini exclusive pentru începători (de exemplu, beneficii pentru colecții pentru începători, reduceri la reîncărcarea pentru începători), cu tipuri și cantități specifice de recompense, așa cum sunt afișate pe pagină.',
    todayBenefits: `Beneficiile de astăzi`,
    todayBenefitsDesc:
      'Lista de sarcini zilnice este actualizată la ora 0:00, incluzând, dar nu se limitează la, sarcini zilnice de vizionare, răsfoire de videoclipuri/articole și sarcini speciale unice. Mai multe sarcini cu beneficii vor fi introduse periodic în viitor, așa că rămâi pe fază.',
    watchEewards: 'Recompense pentru vizionare',
    watchEewardsDesc1:
      'Utilizatorii pot primi recompense după ce vizionează pe platformă durate specificate de conținut video, cum ar fi drame, filme sau documentare. (Serialele interactive nu sunt incluse.)',
    watchEewardsDesc2:
      'Comportamentele anormale de utilizare, cum ar fi navigarea rapidă a videoclipurilor, vizionarea repetată, întreruperea redării, vor fi considerate nevalide. Platforma își rezervă dreptul de a nu lua în considerare astfel de comportamente în cadrul duratei valide a sarcinii sau de a nu distribui recompense.',
    watchAdsRewards: 'Recompense pentru vizionarea reclamelor',
    watchAdsRewardsDesc:
      'Utilizatorii pot solicita recompense după ce navighează pe paginile/videoclipurile specificate pe platformă și îndeplinesc cerințele sarcinii.',
    otherTask: 'Alte recompense',
    otherTaskDesc:
      'Informațiile detaliate despre alte sarcini vor fi supuse regulilor speciale ale fiecărei sarcini. Aspectele nespecificate în regulile speciale ale sarcinilor vor fi guvernate de aceste Regulamente ale Activităților.',
    importantNotesTitle: '4. Note importante',
    importantNotesDesc1:
      'Reelshort își rezervă dreptul de interpretarea finală acest eveniment.',
    importantNotesDesc2:
      'Din cauza limitărilor bazate pe dispozitiv, locație, versiunea clientului și alți factori, diferiți utilizatori pot vedea sarcini diferite. Mulțumim pentru înțelegere.',
    importantNotesDesc3:
      'Platforma va determina dacă utilizatorii sunt aceeași persoană pe baza dispozitivului, contului și a altor informații. Când se consideră că este același utilizator, baza pentru acordarea recompenselor va fi dacă recompensele au fost deja acordate pe acel dispozitiv.',
    importantNotesDesc4:
      'Platforma are două modalități de a acorda recompense: distribuție automată prin sistem și colectare manuală de către utilizator. Pentru sarcinile care necesită colectare manuală, utilizatorii trebuie să revendice recompensele în termenul specificat (vezi pagina activității pentru detalii). Dacă nu sunt revendicate la timp, se consideră renunțare voluntară la recompensă, iar recompensele necolectate vor fi șterse automat.',
    contactInformationTitle: '5. Informații de contact',
    contactInformationDesc:
      'Dacă ai întrebări, te rugăm să accesezi [Profil] > [Feedback] pentru a oferi feedback.'
  },
  cs: {
    pageTitle: 'Pravidla aktivit',
    activityDescriptionTitle: '1. Popis aktivity',
    activityDescriptionDesc1:
      'Reelshort bude pravidelně spouštět různé benefitní aktivity, kterých se uživatelé mohou účastnit a plnit úkoly za účelem získání odměn.',
    activityDescriptionDesc2:
      'Mince za odměnu získané za plnění úkolů lze použít k odemčení placených sérií.',
    participationMethodTitle: '2. Metoda účasti',
    participationMethodDesc:
      'Aktivity jsou otevřené všem registrovaným uživatelům Reelshort.',
    activityDetailsTitle: '3. Podrobnosti o aktivitě',
    activityDetailsCheckIn: 'Check-in',
    activityDetailsCheckInDesc:
      'Odměny za check-in lze uplatnit každý den od 0:00. Čím delší jsou po sobě jdoucí dny check-inu, tím vyšší jsou odměny. Pokud dojde k přerušení check-inů, vynuluje se ode dne 1.',
    activityDetailsNewer: 'Výhody pro nové uživatele',
    activityDetailsNewerDesc:
      'Uživatelé se mohou zapojit do úkolů s výhodami pro nováčky do 7 dnů od registrace. Mezi metody odměn patří mimo jiné exkluzivní úkoly pro nováčky (např. výhody pro sbírání pro nováčky, slevy za dobíjení pro nováčky) s konkrétními typy a množstvími odměn zobrazenými na stránce.',
    todayBenefits: `Dnešní výhody`,
    todayBenefitsDesc:
      'Denní seznam úkolů se aktualizuje v 0:00 a zahrnuje mimo jiné úkoly denního sledování, prohlížení videí/článků a speciální jednorázové úkoly. V budoucnu budou pravidelně zaváděny i další úkoly s výhodami, takže zůstaňte naladěni.',
    watchEewards: 'Odměny za sledování',
    watchEewardsDesc1:
      'Uživatelé mohou obdržet odměny po zhlédnutí určité délky video obsahu, jako jsou dramata, filmy nebo dokumenty na platformě. (Interaktivní seriály nejsou zahrnuty.)',
    watchEewardsDesc2:
      'Neobvyklé chování při používání, jako je rychlé prohlížení videa, opakované sledování nebo pozastavení přehrávání, bude považováno za neplatné. Platforma si vyhrazuje právo nezapočítávat takové chování do platné doby trvání úkolu nebo nerozdělovat odměny.',
    watchAdsRewards: 'Odměny za reklamy ve videu',
    watchAdsRewardsDesc:
      'Uživatelé si mohou nárokovat odměny po prohlédnutí zadaných stránek/videí na platformě a splnění požadavků úkolu.',
    otherTask: 'Další odměny',
    otherTaskDesc:
      'Podrobné informace o dalších úkolech podléhají pravidlům pro zvláštní úkoly v rámci každého úkolu. Záležitosti neuvedené v pravidlech pro zvláštní úkoly se řídí těmito Pravidly aktivit.',
    importantNotesTitle: '4. Důležité poznámky',
    importantNotesDesc1:
      'Reelshort si vyhrazuje právo na konečný výklad této události.',
    importantNotesDesc2:
      'Vzhledem k omezením založeným na zařízení, umístění, verzi klienta a dalších faktorech se různým uživatelům mohou zobrazovat různé úlohy. Děkujeme za pochopení.',
    importantNotesDesc3:
      'Platforma va determina dacă utilizatorii sunt la fel pe baza dispozitivului, and contului și a altor informationții. Atunci când je ohleduplný k același utilizator, baza pentru emiterea de recompense se va baza pe faptul că recompensele au fost emise pe dispozitivul resp.',
    importantNotesDesc4:
      'Platforma nabízí dva způsoby udělování odměn: automatickou distribuci systémem a ruční sběr uživateli. U úkolů, které vyžadují ruční sběr, si uživatelé musí odměny vyzvednout v určené lhůtě (podrobnosti viz stránka s aktivitami). Pokud si je uživatelé nevyzvednou včas, bude to považováno za dobrovolné propadnutí odměny a nevyzvednuté odměny budou automaticky vymazány.',
    contactInformationTitle: '5. Kontaktní informace',
    contactInformationDesc:
      'Pokud máte jakékoli dotazy, přejděte prosím do sekce [Profil] > [Zpětná vazba] a poskytněte nám zpětnou vazbu.'
  },
  bg: {
    pageTitle: 'Правила за дейността',
    activityDescriptionTitle: '1. Описание на дейността',
    activityDescriptionDesc1:
      'Reelshort периодично ще стартира различни дейности с предимства, в които потребителите могат да участват и да изпълняват задачи, за да печелят награди.',
    activityDescriptionDesc2:
      'Монетите за награди, получени от изпълнението на задачи, могат да бъдат използвани за отключване на платени серии.',
    participationMethodTitle: '2. Метод на участие',
    participationMethodDesc:
      'Дейностите са отворени за всички регистрирани потребители на Reelshort.',
    activityDetailsTitle: '3. Детайли за дейността',
    activityDetailsCheckIn: 'Регистрация',
    activityDetailsCheckInDesc:
      'Наградите за регистрация могат да се заявят, започвайки от 0:00 всеки ден. Колкото по-дълги са последователните дни за регистрация, толкова по-големи са наградите. Ако има прекъсване в регистрациите, те ще се нулират от ден 1.',
    activityDetailsNewer: 'Предимства за нови потребители',
    activityDetailsNewerDesc:
      'Потребителите могат да участват в задачи за нови потребители в рамките на 7 дни след регистрацията. Методите за награждаване включват, но не се ограничават до ексклузивни задачи за нови потребители (напр. предимства за събиране на бонуси за нови потребители, отстъпки за презареждане на бонуси за нови потребители), със специфични видове и количества награди, показани на страницата.',
    todayBenefits: `Днешните предимства`,
    todayBenefitsDesc:
      'Списъкът със задачи за деня се актуализира в 0:00, включително, но не само, задачи за ежедневно гледане, разглеждане на видеоклипове/статии и специални еднократни задачи. В бъдеще ще бъдат въвеждани периодично и други полезни задачи, така че следете ни.',
    watchEewards: 'Награди за гледане',
    watchEewardsDesc1:
      'Потребителите могат да получават награди след гледане на определена продължителност на видео съдържание, като например драми, филми или документални филми на платформата. (Интерактивните сериали не са включени.)',
    watchEewardsDesc2:
      'Необичайни поведения при употреба, като например бързо сърфиране на видео, многократно гледане, пауза на възпроизвеждането, ще се считат за невалидни. Платформата си запазва правото да не отчита подобни поведения към валидната продължителност на задачата или да не разпределя награди.',
    watchAdsRewards: 'Награди за реклами за гледане',
    watchAdsRewardsDesc:
      'Потребителите могат да заявят награди, след като разгледат посочените страници/видеоклипове на платформата и изпълнят изискванията на задачата.',
    otherTask: 'Други награди',
    otherTaskDesc:
      'Подробна информация за други задачи се урежда от правилата за специалните задачи в рамките на всяка задача. Въпросите, които не са посочени в правилата за специалните задачи, се уреждат от настоящите Правила за дейностите.',
    importantNotesTitle: '4. Важни бележки',
    importantNotesDesc1:
      'Reelshort си запазва правото на окончателно тълкуване на това събитие.',
    importantNotesDesc2:
      'Поради ограничения, базирани на устройство, местоположение, версия на клиента и други фактори, различните потребители може да виждат различни задачи. Благодарим ви за разбирането.',
    importantNotesDesc3:
      'Platforma va determina dacă utilizatorii sunt la fel pe baza dispozitivului, a contului și a altor informații. Atunci când este considerat același utilizator, baza pentru emiterea de recompense se va baza pe faptul că recompensele au fost emise pe dispozitivul respectiv.',
    importantNotesDesc4:
      'Платформата предлага два начина за издаване на награди: автоматично системно разпределение и ръчно събиране от потребителите. За задачи, които изискват ръчно събиране, потребителите трябва да заявят наградите си в рамките на определено време (вижте страницата с дейности за подробности). Ако не бъдат заявени навреме, това ще се счита за доброволна загуба на наградата и непотърсените награди ще бъдат автоматично изчистени.',
    contactInformationTitle: '5. Данни за контакт',
    contactInformationDesc:
      'Ако имате въпроси, моля, отидете на [Профил] > [Обратна връзка], за да ни дадете обратна връзка.'
  },
  vi: {
    pageTitle: 'Pravidla aktivit',
    activityDescriptionTitle: '1. Hoạt động của Giáo hội',
    activityDescriptionDesc1:
      'Reelshort bude pravidelně spouštět různé Benefitní aktivity, kterých se uživatelé mohou účastnit a plnit úkoly za účelem získání odměn.',
    activityDescriptionDesc2:
      'Mince za odměnu získané za plnění úkolů lze použít k odemčení placených sérií.',
    participationMethodTitle: '2. Metoda účasti',
    participationMethodDesc:
      'Hoạt động kinh doanh của bạn là có thể đăng ký và bạn có thể sử dụng reelshort.',
    activityDetailsTitle: '3. Podrobnosti o aktivitě',
    activityDetailsCheckIn: 'Đăng ký vào',
    activityDetailsCheckInDesc:
      'Odměny za nhận phòng lze uplatnit každý den od 0:00. Čím delší jsou po sobě jdoucí dny check-inu, tím vyšší jsou odměny. Bạn có thể muốn đăng ký nhận phòng, vynuluje se ode dne 1.',
    activityDetailsNewer: 'Výhody pro nové uživatele',
    activityDetailsNewerDesc:
      'Bạn có thể sử dụng nó để tìm cách đăng ký sau 7 ngày và đăng ký. Phương pháp Mezi odměn patří mimo jiné exkluzivní úkoly pro nováčky (např. výhody pro sbírání pro nováčky, slevy za dobíjení pro nováčky) s konkrétními typy a množstvími odměn zobrazenými na stránce.',
    todayBenefits: `Dnešní výhody`,
    todayBenefitsDesc:
      'Denní seznam úkolů se aktualizuje v 0:00 a zahrnuje mimo jiné úkoly denního sledování, prohlížení videí/článků a speciální jednorázové úkoly. V budoucnu budou pravidelně zaváděny i další úkoly s výhodami, takže zůstaňte naladěni.',
    watchEewards: 'Odměny za sledování',
    watchEewardsDesc1:
      'Uživatelé mohou obdržet odměny po zhlédnutí určité délky video obsahu, jako jsou dramata, filmy nebo dokumenty na platformě. (Interaktivní seriály nejsou zahrnuty.)',
    watchEewardsDesc2:
      'Neobvyklé chování při používání, jako je rychlé prohlížení videa, opkované sledování nebo pozastavení přehrávání, bude považováno za neplatné. Platforma si vyhrazuje právo nezapočítávat takové chování do platné doby trvání úkolu nebo nerozdělovat odměny.',
    watchAdsRewards: 'Odměny za reklamy ve videu',
    watchAdsRewardsDesc:
      'Uživatelé si mohou nárokovat odměny po hlédnutí zadaných stránek/video on platformě a splnění požadavků úkolu.',
    otherTask: 'Další odměny',
    otherTaskDesc:
      'Bạn có thể cung cấp thông tin cho dalších úkolech podléhají pravidlům pro zvláštní úkoly và rámci každého úkolu. Záležitosti neuvedené v pravidlech pro zvláštní úkoly se řídí těmito Pravidly aktivit.',
    importantNotesTitle: '4. Důležité poznámky',
    importantNotesDesc1:
      'Tóm tắt ngắn gọn về cách bạn có thể thực hiện một cách dễ dàng.',
    importantNotesDesc2:
      'Vzhledem k omezením založeným na zařízení, umístění, verzi klienta a dalších faktorech se různým uživatelům mohou zobrazovat různé úlohy. Bạn có thể làm điều đó.',
    importantNotesDesc3:
      'Nền tảng và quyết định có thể sử dụng được trên thị trường thiết bị, và tiếp tục cung cấp thông tin thay thế. Nếu bạn muốn trở thành người sử dụng thành công nhất, bạn có thể kiếm được tiền thưởng từ chợ và có thể được đền bù cho bạn nếu bạn có khả năng giải quyết.',
    importantNotesDesc4:
      'Platforma nabízí dva způsoby udělování odměn: hệ thống phân phối tự độngkou và ruční sběr uživateli. U úkolů, které vyžadují ruční sběr, si uživatelé musí odměny vyzvednout v určené lhůtě (podrobnosti viz stránka s aktivitami). Nếu bạn không muốn làm điều đó, bạn có thể làm điều đó để đưa ra tuyên bố về một điều gì đó mà bạn không thể tự động thực hiện được.',
    contactInformationTitle: '5. Kontaktní informace',
    contactInformationDesc:
      'Pokud máte jakékoli dotazy, přejděte proím do sekce [Profil] > [Zpětná vazba] a poskytněte nám zpětnou vazbu.'
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
