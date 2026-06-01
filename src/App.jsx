import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Wrench, 
  Wind, 
  Thermometer, 
  Phone, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  ShieldAlert, 
  Check, 
  Info,
  Menu,
  X,
  AlertCircle,
  Sun,
  Moon,
  Monitor
} from 'lucide-react';

// Live mock data for Atyrau current date & slots
const CURRENT_DATE = new Date().toLocaleDateString('ru-RU', {
  day: 'numeric',
  month: 'long',
});

// Translation Dictionaries (RU, KK, EN)
const TRANSLATIONS = {
  ru: {
    navServices: 'Услуги',
    navCalc: 'Калькулятор сметы',
    navGuarantees: 'Гарантии',
    navFaq: 'FAQ',
    statusText: 'Свободные мастера в Атырау',
    statusMobile: '● Свободные мастера готовы к выезду сегодня',
    whatsAppBtn: 'Связаться в WhatsApp',
    whatsAppMobile: 'Написать в WhatsApp',
    urgencyText: 'Сегодня: в Атырау прогнозируется сильная жара. Свободные слоты разбирают быстро.',
    slotsText: 'Осталось: {slotsLeft} слота на сегодня',
    reserveSlot: 'Занять ближайшее время →',
    trustTitle: 'Юридическая гарантия и чистый договор',
    heroTitlePart1: 'Ремонт кондиционеров в Атырау ',
    heroTitlePart2: 'за 2 часа',
    heroTitlePart3: ' без скрытых доплат',
    heroSubtitle: 'Сначала диагностика и фиксация цены в WhatsApp — потом работа. Вы платите строго по согласованной смете. Никаких внезапных наценок за длину трассы, расходные материалы или срочность выезда.',
    heroCtaWhatsApp: 'Рассчитать точную стоимость в WhatsApp',
    heroCtaSlot: 'Забронировать слот на сегодня',
    miniStat1Title: 'За 2 часа',
    miniStat1Desc: 'Среднее время приезда мастера с деталями',
    miniStat2Title: '100% честно',
    miniStat2Desc: 'Диагностика перед согласованием цены',
    miniStat3Title: 'до 3-х лет',
    miniStat3Desc: 'Официальная гарантия по договору',
    quickBookingTitle: 'Экспресс-заявка в Атырау',
    quickBookingSub: 'Бронирование свободного мастера на сегодня',
    quickBookingBullet1: 'Мастер приедет со всеми расходниками и фреоном в машине.',
    quickBookingBullet2: 'Бесплатный выезд при согласии на ремонт.',
    quickBookingBullet3: 'Цены зафиксированы в договоре, никаких скрытых доплат.',
    objectionBoxTitle: 'Главное опасение клиентов закрыто:',
    objectionBoxDesc: 'Мы дорожим вашей техникой. Наш мастер несет полную материальную ответственность за сохранность вашей сплит-системы при монтаже.',
    toCalculatorBtn: 'Перейти к калькулятору стоимости',
    stat1Title: '8+ лет на рынке Атырау',
    stat1Desc: 'Сертифицированные инженеры компании обслужили и запустили более 6 500 сплит-систем. Опыт мастеров — от 3 до 10 лет.',
    stat2Title: '100% деталей с собой',
    stat2Desc: 'В каждой из наших сервисных машин всегда в наличии запас фреона (R410A, R22), медных трубок, дренажей и конденсаторов. Устраняем поломку за 1 визит.',
    stat3Title: '0 тенге за выезд и диагностику',
    stat3Desc: 'Выезд специалиста и инструментальная диагностика манометрической станцией и течеискателем бесплатны при условии выполнения ремонта.',
    calcTitle: 'Интерактивный калькулятор честной стоимости',
    calcSub: 'Рассчитайте стоимость услуги за 30 секунд. Итоговая смета фиксируется в WhatsApp до выезда мастера. Никаких доплат после!',
    calcStep1: 'Шаг 1: Выберите услугу',
    calcStep2: 'Шаг 2: Площадь помещения (Мощность BTU)',
    calcStep2_5: 'Шаг 2.5: Укажите этаж установки',
    calcStep3_Repair: 'Шаг 3: Выберите необходимые ремонтные работы',
    calcStep3_Default: 'Шаг 3: Дополнительные опции',
    calcClean: 'Чистка',
    calcRepair: 'Ремонт',
    calcInstall: 'Монтаж',
    calcArea20: 'До 20 м²',
    calcArea35: 'До 35 м²',
    calcArea50: 'До 50 м²',
    calcArea50Plus: 'Более 50 м²',
    calcFloor1: '1-й этаж',
    calcFloor1Note: 'Базовая цена: 10 000 ₸',
    calcFloor2Plus: '2-й этаж и выше',
    calcFloor2PlusNote: 'Базовая цена: 20 000 ₸',
    calcOptCapacitor: 'Замена пускового конденсатора',
    calcOptCapacitorNote: '+ 13 000 ₸ (запчасть и гарантия включены)',
    calcOptRelay: 'Замена теплового реле',
    calcOptRelayNote: '+ 10 000 ₸ (с запчастью, гарантия на нее)',
    calcOptBoard: 'Ремонт платы управления',
    calcOptBoardNote: '+ от 20 000 ₸',
    calcOptCleanChem: 'Использовать антибактериальную химию Errecom',
    calcOptCleanChemNote: '+ 5 000 ₸ (Чистка с химией)',
    calcOptAntibac: 'Антибактериальная обработка',
    calcOptAntibacNote: '+ 4 000 ₸',
    calcOptFreonRepair: 'Заправка кондиционера фреоном',
    calcOptFreonClean: 'Дозаправка качественным фреоном',
    calcOptFreonRepairNote: '+ 15 000 ₸ (до 500 ml с гарантией)',
    calcOptFreonCleanNote: '+ 15 000 ₸ (до 500 ml)',
    calcOptHigh: 'Высотные работы / Услуги альпиниста',
    calcOptHighNote: '+ 15 000 ₸ (для сложных фасадов)',
    summaryTitle: 'Предварительный расчет',
    summarySub: 'Окончательная цена сметы гарантирована',
    summaryBase: 'Базовый тариф:',
    summaryCleanNoChem: '10 000 ₸ (без химии)',
    summaryRepairDiag: '10 000 ₸ (диагностика)',
    summaryInstallFloor1: '10 000 ₸ (1 этаж)',
    summaryInstallFloor2: '20 000 ₸ (2+ этаж)',
    summaryAreaCharge: 'Наценка за мощность:',
    summaryCapacitor: 'Замена конденсатора:',
    summaryRelay: 'Замена теплового реле:',
    summaryBoard: 'Ремонт платы:',
    summaryChem: 'Антибактериальная химия:',
    summaryFreon: 'Заправка фреоном (500 ml):',
    summaryHigh: 'Высотные работы:',
    summaryTotal: 'Итого к оплате:',
    summaryTrustTitle: 'Без скрытых доплат',
    summaryTrustDesc: 'Мастер зафиксирует эту стоимость в акте до начала работ. Никаких накруток на месте!',
    summaryPlaceholder: 'Ваш телефон для сметы (WhatsApp)',
    summarySubmitBtn: 'Зафиксировать цену и отправить смету в WhatsApp',
    summarySuccessTitle: 'Смета зафиксирована!',
    summarySuccessDesc: 'Перенаправляем в WhatsApp для мгновенного согласования времени выезда...',
    serviceTitle: 'Профессиональные услуги по регламенту',
    serviceSub: 'Мы строго следуем внутреннему техническому регламенту «Сервис Кондиционеров», защищая ваш интерьер и оборудование от повреждений.',
    serviceTabOrderBtn: 'Заказать услугу в WhatsApp',
    serviceTabExpected: 'Ожидаемый результат:',
    guaranteesTitle: '100% защита ваших прав и безопасности',
    guaranteesSub: 'Мы полностью убрали любые финансовые и технические риски для наших клиентов в Атырау.',
    guar1Label: 'Гарантия на работу',
    guar1Title: 'Твердая письменная гарантия от 12 до 36 месяцев',
    guar1Desc: 'Вы получаете официальный гарантийный талон и акт выполненных работ с печатью ТОО. Если проблема возникнет снова — дежурный мастер приедет и исправит ее за наш счет в течение 24 часов. Без лишних вопросов и доказательств.',
    guar2Label: 'Страхование интерьера',
    guar2Title: 'Финансовая защита вашего интерьера и мебели',
    guar2Desc: 'Перед началом работ мы бесплатно закрываем стены, мебель и технику защитной пленкой. В случае, если наш мастер случайно повредит отделку или испачкает обои при монтаже — мы компенсируем 100% ущерба по договору. Ваша квартира останется в первозданном виде.',
    guar3Label: 'Чистота 100%',
    guar3Title: 'Работа по стандарту «Абсолютная чистота»',
    guar3Desc: 'Наши специалисты работают строго в чистых бахилах. Все сверлильные и бурильные работы проводятся только со сбором пыли промышленным пылесосом. По окончании ремонта мастер собирает и увозит с собой весь крупный строительный мусор.',
    faqTitle: 'Разбираем ваши сомнения',
    faqSub: 'Честные ответы на самые частые вопросы и страхи клиентов перед вызовом мастера.',
    captureLabel: 'Срочный выезд по Атырау',
    captureTitle: 'В Атырау +40 °C: свободные слоты на сегодня разбирают до 11:00',
    captureDesc: 'Бригады распределяются по районам города оперативно. Оставьте свой номер телефона, чтобы зафиксировать за собой ближайшего свободного мастера, забронировать фиксированную цену ремонта и получить подробную смету в WhatsApp.',
    capturePlaceholder: 'Ваш номер телефона (WhatsApp)',
    captureSubmitBtn: 'Узнать свободное время и зафиксировать цену',
    captureConsent: 'Нажимая кнопку, вы соглашаетесь на мгновенную обработку персональных данных для связи.',
    captureSuccessTitle: 'Заявка успешно отправлена!',
    captureSuccessDesc: 'Свободный слот зафиксирован за номером {phone}. Перенаправляем вас в WhatsApp для мгновенного согласования точного времени приезда мастера...',
    footerBrandDesc: 'Профессиональный сервисный центр по ремонту, чистке и установке кондиционеров в Атырау. Работаем строго по договору с официальной гарантией.',
    footerNavTitle: 'Навигация',
    footerContactsTitle: 'Контакты и адрес',
    footerContactsAddress: 'г. Атырау, мкр. Балыкшы, ул. К. Ахмедиярова, д. 28А, офис 9',
    footerContactsTime: 'Время работы:',
    footerContactsDays: 'Ежедневно с 08:00 до 21:00',
    footerDealerTitle: 'Официальный дилер',
    footerDealerDesc: 'Работаем напрямую с крупными брендами: Almacom, AUX, Kaspi-Климат, Midea, Gree. Закупаем оригинальные запчасти оптом, удерживая доступные цены на работы.',
    legalExec: 'Официальный исполнитель',
    legalAddress: 'Юридический адрес',
    legalBank: 'Банковские реквизиты (АО "Kaspi Bank")',
    legalBIN: 'БИН (ИИН):',
    legalAddressDetails: 'РК, г. Атырау, микрорайон Балыкшы, улица Каршымбай Ахмедияров, дом 28А, кв./офис 9',
    legalAcc: 'Счет:',
    legalBik: 'БИК:',
    legalKbe: 'КБе:',
    copyright: '© {year} Климат Эксперт Атырау. Все права защищены.',
    privacy: 'Политика конфиденциальности',
    offer: 'Публичная оферта',
    themeLabel: 'Тема оформления:',
    themeLight: 'Светлая',
    themeDark: 'Темная',
    themeSystem: 'Системная (Авто)',
    langLabel: 'Язык / Тіл / Language:',
    faqItems: [
      {
        q: 'Правда ли, что диагностика бесплатная?',
        a: 'Да, выезд нашего сертифицированного инженера и полная инструментальная диагностика (манометрами, течеискателем, мультиметром) стоят 0 тенге, если мы проводим последующий ремонт или чистку в тот же день. В случае отказа от ремонта оплачивается только стандартный выезд и диагностика в размере 3 000 тенге.'
      },
      {
        q: 'Вы точно приедете вовремя? Часто мастера переносят визит.',
        a: 'Мы прекрасно знаем эту боль Атырау. Мы фиксируем конкретное 2-часовое окно визита в WhatsApp при подтверждении заявки (например, с 14:00 до 16:00). Если наш мастер задерживается более чем на 15 минут без предупреждения, мы делаем скидку 2 000 тенге на все работы. Вся логистика контролируется централизованным диспетчером.'
      },
      {
        q: 'Как я могу быть уверен, что цена не вырастет в процессе?',
        a: 'Наш мастер начинает работы только после проведения диагностики и составления точной сметы, которую мы отправляем вам в WhatsApp или фиксируем на бумаге. Эта цена окончательная. Никаких «неожиданных наценок» за дополнительный метр трассы, сложность или крепления в процессе работы быть не может.'
      },
      {
        q: 'Что делать, если кондиционер снова потечет или перестанет холодить через неделю?',
        a: 'Вы получаете официальный акт выполненных работ с печатью ТОО и гарантийный талон со сроком действия от 12 до 36 месяцев (в зависимости от услуги). При возникновении гарантийного случая отдельная аварийная бригада выезжает к вам в течение 24 часов и бесплатно устраняет проблему.'
      },
      {
        q: 'Как вы защищаете квартиру от грязи при чистке?',
        a: 'Для чистки мы используем профессиональные сервисные пакеты (герметичные защитные чехлы с отводным шлангом). Вся грязная вода сливается строго в ведро. Для бурения стен используется мощный строительный пылесос, собирающий 98% бетонной крошки и пыли. Мастера работают в бахилах и убирают крупный строительный мусор после себя.'
      },
      {
        q: 'Частники на OLX предлагают услуги дешевле. Почему стоит выбрать вас?',
        a: 'Частные мастера часто работают без профессиональных инструментов (не делают вакуумирование трассы перед пуском, не имеют электронных течеискателей и заправляют фреон «на глаз»). Самое главное — они пропадают или не берут трубку, если кондиционер сломается через неделю. С нами вы платите цену на уровне частного мастера, но получаете надежность официального сервисного центра с юридическим договором и офисом в Атырау.'
      }
    ]
  },
  kk: {
    navServices: 'Қызметтер',
    navCalc: 'Смета калькуляторы',
    navGuarantees: 'Кепілдіктер',
    navFaq: 'FAQ',
    statusText: 'Атыраудағы бос шеберлер',
    statusMobile: '● Бос шеберлер бүгін келуге дайын',
    whatsAppBtn: 'WhatsApp-пен байланысу',
    whatsAppMobile: 'WhatsApp-қа жазу',
    urgencyText: 'Бүгін: Атырауда қатты ыстық болады деп күтілуде. Бос уақыттар тез брондалуда.',
    slotsText: 'Бүгінге қалды: {slotsLeft} бос уақыт',
    reserveSlot: 'Жақын арадағы уақытты алу →',
    trustTitle: 'Заңды кепілдік және таза келісімшарт',
    heroTitlePart1: 'Атырауда кондиционерлерді ',
    heroTitlePart2: '2 сағатта жөндеу',
    heroTitlePart3: ' жасырын төлемсіз',
    heroSubtitle: 'Алдымен диагностика және WhatsApp-та бағаны бекіту — содан кейін жұмыс. Сіз тек келісілген смета бойынша төлейсіз. Трасса ұзындығы, шығын материалдары немесе шұғыл келу үшін ешқандай күтпеген үстеме ақы алынбайды.',
    heroCtaWhatsApp: 'Нақты құнын WhatsApp-та есептеу',
    heroCtaSlot: 'Бүгінге уақыт брондау',
    miniStat1Title: '2 сағат ішінде',
    miniStat1Desc: 'Шебердің бөлшектермен келуінің орташа уақыты',
    miniStat2Title: '100% адал',
    miniStat2Desc: 'Баға келісілгенге дейінгі диагностика',
    miniStat3Title: '3 жылға дейін',
    miniStat3Desc: 'Келісімшарт бойынша ресми кепілдік',
    quickBookingTitle: 'Атыраудағы шұғыл өтінім',
    quickBookingSub: 'Бүгінге бос шеберді брондау',
    quickBookingBullet1: 'Шебер машинасында барлық бөлшектермен және фреонмен келеді.',
    quickBookingBullet2: 'Жөндеуге келіскен жағдайда келу тегін.',
    quickBookingBullet3: 'Бағалар келісімшартта бекітілген, жасырын төлемдер жоқ.',
    objectionBoxTitle: 'Клиенттердің басты қорқынышы жойылды:',
    objectionBoxDesc: 'Біз сіздің техникаңызды бағалаймыз. Біздің шебер орнату кезінде жаңа сплит-жүйеңіздің қауіпсіздігі үшін толық материалдық жауапкершілік тартады.',
    toCalculatorBtn: 'Құнын есептеу калькуляторына өту',
    stat1Title: 'Атырау нарығында 8+ жыл',
    stat1Desc: 'Компанияның сертификатталған инженерлері 6 500-ден астам сплит-жүйені жөндеп, іске қосты. Шеберлердің тәжірибесі — 3 жылдан 10 жылға дейін.',
    stat2Title: '100% бөлшектер өзімізбен бірге',
    stat2Desc: 'Әрбір сервистік машинамызда фреон (R410A, R22), мыс түтіктер, дренаждар және конденсаторлар қоры әрқашан бар. Ақаулықты 1 рет келгенде жоямыз.',
    stat3Title: 'Келу және диагностика 0 теңге',
    stat3Desc: 'Жөндеу жұмыстары жүргізілген жағдайда манометрлік станция және течеискатель көмегімен келу мен диагностика тегін.',
    calcTitle: 'Әділ құнды есептеудің интерактивті калькуляторы',
    calcSub: 'Қызмет құнын 30 секундта есептеңіз. Итоголық смета шебер келгенге дейін WhatsApp-та бекітіледі. Кейіннен ешқандай қосымша төлемдер болмайды!',
    calcStep1: '1-қадам: Қызметті таңдаңыз',
    calcStep2: '2-қадам: Бөлме ауданы (BTU қуаттылығы)',
    calcStep2_5: '2.5-қадам: Орнату қабатын көрсетіңіз',
    calcStep3_Repair: '3-қадам: Қажетті жөндеу жұмыстарын таңдаңыз',
    calcStep3_Default: '3-қадам: Қосымша опциялар',
    calcClean: 'Тазалау',
    calcRepair: 'Жөндеу',
    calcInstall: 'Орнату',
    calcArea20: '20 м² дейін',
    calcArea35: '35 м² дейін',
    calcArea50: '50 м² дейін',
    calcArea50Plus: '50 м²-ден астам',
    calcFloor1: '1-қабат',
    calcFloor1Note: 'Базалық баға: 10 000 ₸',
    calcFloor2Plus: '2-қабат және одан жоғары',
    calcFloor2PlusNote: 'Базалық баға: 20 000 ₸',
    calcOptCapacitor: 'Іске қосу конденсаторын ауыстыру',
    calcOptCapacitorNote: '+ 13 000 ₸ (бөлшек және кепілдік қоса беріледі)',
    calcOptRelay: 'Жылулық релені ауыстыру',
    calcOptRelayNote: '+ 10 000 ₸ (бөлшекпен, оған ғана кепілдік)',
    calcOptBoard: 'Басқару тақтасын жөндеу',
    calcOptBoardNote: '+ 20 000 ₸-ден бастап',
    calcOptCleanChem: 'Errecom антибактериалды химиясын қолдану',
    calcOptCleanChemNote: '+ 5 000 ₸ (Химиямен тазалау)',
    calcOptAntibac: 'Антибактериалды өңдеу',
    calcOptAntibacNote: '+ 4 000 ₸',
    calcOptFreonRepair: 'Кондиционерді фреонмен толтыру',
    calcOptFreonClean: 'Сапалы фреонмен толықтыру',
    calcOptFreonRepairNote: '+ 15 000 ₸ (500 ml дейін, кепілдікпен)',
    calcOptFreonCleanNote: '+ 15 000 ₸ (500 ml дейін)',
    calcOptHigh: 'Биіктік жұмыстары / Альпинист қызметі',
    calcOptHighNote: '+ 15 000 ₸ (күрделі қасбеттер үшін)',
    summaryTitle: 'Алдын ала есептеу',
    summarySub: 'Сметаның соңғы бағасына кепілдік беріледі',
    summaryBase: 'Базалық тариф:',
    summaryCleanNoChem: '10 000 ₸ (химиясыз)',
    summaryRepairDiag: '10 000 ₸ (диагностика)',
    summaryInstallFloor1: '10 000 ₸ (1-қабат)',
    summaryInstallFloor2: '20 000 ₸ (2+ қабат)',
    summaryAreaCharge: 'Қуаттылық үшін үстеме:',
    summaryCapacitor: 'Конденсаторды ауыстыру:',
    summaryRelay: 'Жылулық релені ауыстыру:',
    summaryBoard: 'Тақтаны жөндеу:',
    summaryChem: 'Антибактериалды химия:',
    summaryFreon: 'Фреонмен толтыру (500 ml):',
    summaryHigh: 'Биіктік жұмыстары:',
    summaryTotal: 'Барлығы төлеуге:',
    summaryTrustTitle: 'Жасырын төлемсіз',
    summaryTrustDesc: 'Шебер бұл құнды жұмысты бастамас бұрын актіде бекітеді. Ешқандай үстеме ақы болмайды!',
    summaryPlaceholder: 'Смета үшін телефоныңыз (WhatsApp)',
    summarySubmitBtn: 'Бағаны бекіту және сметаны WhatsApp-қа жіберу',
    summarySuccessTitle: 'Смета бекітілді!',
    summarySuccessDesc: 'Келу уақытын тез арада келісу үшін WhatsApp-қа өтудеміз...',
    serviceTitle: 'Регламент бойынша кәсіби қызметтер',
    serviceSub: 'Біз сіздің интерьеріңіз бен жабдықтарыңызды зақымданудан қорғай отырып, «Кондиционерлер сервисі» ішкі техникалық регламентін қатаң сақтаймыз.',
    serviceTabOrderBtn: 'Қызметке WhatsApp-та тапсырыс беру',
    serviceTabExpected: 'Күтілетін нәтиже:',
    guaranteesTitle: 'Құқықтарыңыз бен қауіпсіздігіңізді 100% қорғау',
    guaranteesSub: 'Біз Атыраудағы клиенттеріміз үшін кез келген қаржылық және техникалық тәуекелдерді толығымен жойдық.',
    guar1Label: 'Жұмысқа кепілдік',
    guar1Title: '12-ден 36 айға дейінгі жазбаша кепілдік',
    guar1Desc: 'Сіз ресми кепілдік талонын және ТШО мөрі бар орындалған жұмыстар актісін аласыз. Егер мәселе қайталанса — кезекші шебер 24 сағат ішінде келіп, оны біздің есебімізден тегін түзетеді. Артық сұрақтарсыз.',
    guar2Label: 'Интерьерді сақтандыру',
    guar2Title: 'Жиһаз бен интерьерді қаржылай қорғау',
    guar2Desc: 'Жұмысты бастамас бұрын біз қабырғаларды, жиһаздарды және техниканы қорғаныш пленкамен тегін жабамыз. Егер біздің шеберіміз орнату кезінде қабырғаға немесе жиһазға зақым келтірсе — біз келісімшарт бойынша зиянды 100% өтейміз.',
    guar3Label: '100% тазалық',
    guar3Title: '«Абсолютті тазалық» стандарты бойынша жұмыс',
    guar3Desc: 'Біздің мамандар тек таза бахиламен жұмыс істейді. Қабырғаларды бұрғылау тек өндірістік шаңсорғышпен шаңды жинау арқылы жүзеге асырылады. Жөндеу аяқталғаннан кейін шебер барлық құрылыс қоқыстарын жинап, өзімен бірге алып кетеді.',
    faqTitle: 'Күмәніңізді сейілтеміз',
    faqSub: 'Шеберді шақырмас бұрын клиенттердің ең жиі қойылатын сұрақтары мен қорқыныштарына шынайы жауаптар.',
    captureLabel: 'Атырау бойынша шұғыл келу',
    captureTitle: 'Атырауда +40 °C: бүгінгі бос уақыттар сағат 11:00-ге дейін таусылады',
    captureDesc: 'Бригадалар қала аудандары бойынша жедел бөлінеді. Бүгінгі бос шеберді брондау, жөндеудің бекітілген бағасын сақтау және WhatsApp-та толық сметаны алу үшін телефон нөміріңізді қалдырыңыз.',
    capturePlaceholder: 'Телефон нөміріңіз (WhatsApp)',
    captureSubmitBtn: 'Бос уақытты білу және бағаны бекіту',
    captureConsent: 'Батырманы басу арқылы сіз байланыс үшін дербес деректерді дереу өңдеуге келісесіз.',
    captureSuccessTitle: 'Өтінім сәтті жіберілді!',
    captureSuccessDesc: 'Бос слот {phone} нөміріне бекітілді. Шебердің нақты келу уақытын келісу үшін WhatsApp-қа өтудеміз...',
    footerBrandDesc: 'Атырауда кондиционерлерді жөндеу, тазалау және орнату бойынша кәсіби қызмет көрсету орталығы. Келісімшарт және ресми кепілдікпен жұмыс істейміз.',
    footerNavTitle: 'Навигация',
    footerContactsTitle: 'Байланыс және мекенжай',
    footerContactsAddress: 'Атырау қ., Балықшы ықшамауданы, Қ. Ахмедияров көшесі, 28А үй, 9-кеңсе',
    footerContactsTime: 'Жұмыс уақыты:',
    footerContactsDays: 'Күнделікті 08:00-ден 21:00-ге дейін',
    footerDealerTitle: 'Ресми дилер',
    footerDealerDesc: 'Біз ірі брендтермен тікелей жұмыс істейміз: Almacom, AUX, Kaspi-Климат, Midea, Gree. Түпнұсқа бөлшектерді көтерме бағамен сатып аламыз, бұл бағаны тиімді ұстауға мүмкіндік береді.',
    legalExec: 'Ресми орындаушы',
    legalAddress: 'Заңды мекенжайы',
    legalBank: 'Банк реквизиттері (АО "Kaspi Bank")',
    legalBIN: 'БИН (ЖСН):',
    legalAddressDetails: 'ҚР, Атырау қаласы, Балықшы ықшамауданы, Қаршымбай Ахмедияров көшесі, 28А үй, 9-пәтер/кеңсе',
    legalAcc: 'Есепшот:',
    legalBik: 'БИК:',
    legalKbe: 'КБе:',
    copyright: '© {year} Климат Эксперт Атырау. Барлық құқықтар қорғалған.',
    privacy: 'Құпиялылық саясаты',
    offer: 'Жария оферта',
    themeLabel: 'Рәсімдеу тақырыбы:',
    themeLight: 'Жарық',
    themeDark: 'Қараңғы',
    themeSystem: 'Жүйелік (Авто)',
    langLabel: 'Язык / Тіл / Language:',
    faqItems: [
      {
        q: 'Диагностика шынымен тегін бе?',
        a: 'Иә, егер біз сол күні жөндеу немесе тазалау жұмыстарын жүргізсек, сертификатталған инженеріміздің келуі және толық аспаптық диагностикасы (манометрлермен, течеискательмен, мультиметрмен) 0 теңге тұрады. Жөндеуден бас тартқан жағдайда тек 3 000 теңге көлеміндегі стандартты келу мен диагностика төленеді.'
      },
      {
        q: 'Уақытында келесіз бе? Шеберлер жиі уақытты ауыстырады.',
        a: 'Біз Атыраудағы бұл мәселені жақсы білеміз. Өтінімді растау кезінде біз WhatsApp-та нақты 2 сағаттық келу аралығын белгілейміз (мысалы, 14:00-ден 16:00-ге дейін). Егер біздің шебер ескертусіз 15 минуттан астам уақытқа кешіксе, біз барлық жұмысқа 2 000 теңге жеңілдік жасаймыз. Барлық логистиканы орталықтандырылған диспетчер бақылайды.'
      },
      {
        q: 'Жұмыс барысында баға өсіп кетпейтініне қалай сенімді бола аламын?',
        a: 'Біздің шебер жұмысты тек диагностика жүргізіп, нақты сметаны жасағаннан кейін ғана бастайды, оны біз сізге WhatsApp-қа жібереміз немесе қағазға жазамыз. Бұл баға түпкілікті болып табылады. Жұмыс барысында трассаның қосымша метрі, күрделілік немесе бекіткіштер үшін ешқандай «күтпеген үстемелер» болуы мүмкін емес.'
      },
      {
        q: 'Егер кондиционер бір аптадан кейін қайтадан ақса немесе суытпай қалса не істейміз?',
        a: 'Сіз ТШО мөрі бар ресми орындалған жұмыстар актісін және 12-ден 36 айға дейінгі мерзімге кепілдік талонын аласыз (қызметке байланысты). Кепілдік жағдайы туындаған кезде жеке авариялық бригада 24 сағат ішінде сізге келіп, мәселені тегін жояды.'
      },
      {
        q: 'Тазалау кезінде пәтерді кірден қалай қорғайсыз?',
        a: 'Тазалау үшін біз кәсіби сервистік пакеттерді (су ағатын шлангісі бар герметикалық қорғаныс қаптамаларын) қолданамыз. Барлық кір су шелекке ғана құйылады. Қабырғаларды бұрғылау үшін бетон үгіндісі мен шаңның 98%-ын жинайтын қуатты құрылыс шаңсорғышы қолданылады. Шеберлер бахиламен жұмыс істейді және ірі құрылыс қоқыстарын өздерімен бірге алып кетеді.'
      },
      {
        q: 'OLX-тағы жеке шеберлер қызметтерін арзан ұсынады. Неліктен сіздерді таңдаған жөн?',
        a: 'Жеке шеберлер көбінесе кәсіби құралдарсыз жұмыс істейді (іске қосу алдында трассаны вакуумдамайды, электронды течеискательдері жоқ және фреонды «көз мөлшерімен» құяды). Ең бастысы — кондиционер бір аптадан кейін бұзылса, олар жоғалып кетеді немесе телефонды көтермейді. Бізбен сіз жеке шебер деңгейіндегі бағаны төлейсіз, бірақ Атырауда ресми кеңсесі және заңды келісімшарты бар сенімді сервистік орталықтың қызметін аласыз.'
      }
    ]
  },
  en: {
    navServices: 'Services',
    navCalc: 'Cost Calculator',
    navGuarantees: 'Guarantees',
    navFaq: 'FAQ',
    statusText: 'Engineers Available in Atyrau',
    statusMobile: '● Engineers are ready to deploy today',
    whatsAppBtn: 'Contact via WhatsApp',
    whatsAppMobile: 'Message on WhatsApp',
    urgencyText: 'Today: Extreme heat predicted in Atyrau. Free slots are booking fast.',
    slotsText: 'Left: {slotsLeft} slots today',
    reserveSlot: 'Reserve nearest time slot →',
    trustTitle: 'Legal Guarantee & Clear Contract',
    heroTitlePart1: 'AC Repair in Atyrau ',
    heroTitlePart2: 'in 2 hours',
    heroTitlePart3: ' without hidden fees',
    heroSubtitle: 'Diagnostics and price lock in WhatsApp first — work later. You pay strictly according to the agreed estimate. No sudden surcharges for pipe length, consumables, or urgent visits.',
    heroCtaWhatsApp: 'Calculate Exact Price in WhatsApp',
    heroCtaSlot: 'Book a Slot for Today',
    miniStat1Title: 'Within 2 hours',
    miniStat1Desc: 'Average time of arrival with parts on board',
    miniStat2Title: '100% Honest',
    miniStat2Desc: 'Diagnostics before price agreement',
    miniStat3Title: 'Up to 3 years',
    miniStat3Desc: 'Official warranty by legal contract',
    quickBookingTitle: 'Express Request in Atyrau',
    quickBookingSub: 'Book an available technician for today',
    quickBookingBullet1: 'Technician arrives with all spare parts and freon in the car.',
    quickBookingBullet2: 'Free visit in case of subsequent repair works.',
    quickBookingBullet3: 'Prices are locked in the contract, no hidden fees.',
    objectionBoxTitle: 'Main customer fear solved:',
    objectionBoxDesc: 'We value your equipment. Our technician takes 100% financial liability for the safety of your split system during installation.',
    toCalculatorBtn: 'Go to Price Calculator',
    stat1Title: '8+ Years in Atyrau Market',
    stat1Desc: 'Certified company engineers have serviced and launched over 6,500 split systems. Experience of technicians: 3 to 10 years.',
    stat2Title: '100% Spare Parts on Board',
    stat2Desc: 'Our service cars always carry a stock of freon (R410A, R22), copper tubes, drain pipes, and starting capacitors. We fix it in 1 visit.',
    stat3Title: '0 KZT Visit & Diagnostics',
    stat3Desc: 'Technician visit and tool diagnostics with pressure gauges and leak detectors are free under the condition of subsequent repair works.',
    calcTitle: 'Interactive Honest Price Calculator',
    calcSub: 'Calculate the cost of service in 30 seconds. The final estimate is locked in WhatsApp before arrival. No extra payments afterwards!',
    calcStep1: 'Step 1: Choose Service',
    calcStep2: 'Step 2: Room Area (BTU Power)',
    calcStep2_5: 'Step 2.5: Specify Installation Floor',
    calcStep3_Repair: 'Step 3: Select Necessary Repair Works',
    calcStep3_Default: 'Step 3: Additional Options',
    calcClean: 'Cleaning',
    calcRepair: 'Repair',
    calcInstall: 'Installation',
    calcArea20: 'Up to 20 m²',
    calcArea35: 'Up to 35 m²',
    calcArea50: 'Up to 50 m²',
    calcArea50Plus: 'Over 50 m²',
    calcFloor1: '1st floor',
    calcFloor1Note: 'Base price: 10 000 ₸',
    calcFloor2Plus: '2nd floor and above',
    calcFloor2PlusNote: 'Base price: 20 000 ₸',
    calcOptCapacitor: 'Starting Capacitor Replacement',
    calcOptCapacitorNote: '+ 13 000 ₸ (spare part and warranty included)',
    calcOptRelay: 'Thermal Relay Replacement',
    calcOptRelayNote: '+ 10 000 ₸ (part included, warranty only on it)',
    calcOptBoard: 'Control Board Repair',
    calcOptBoardNote: '+ from 20 000 ₸',
    calcOptCleanChem: 'Use Errecom Antibacterial Disinfectant',
    calcOptCleanChemNote: '+ 5 000 ₸ (Cleaning with chemicals)',
    calcOptAntibac: 'Antibacterial Disinfection',
    calcOptAntibacNote: '+ 4 000 ₸',
    calcOptFreonRepair: 'AC Freon Refill',
    calcOptFreonClean: 'Top-up with Premium Freon',
    calcOptFreonRepairNote: '+ 15 000 ₸ (up to 500 ml with warranty)',
    calcOptFreonCleanNote: '+ 15 000 ₸ (up to 500 ml)',
    calcOptHigh: 'High-Altitude Works / Climber Service',
    calcOptHighNote: '+ 15 000 ₸ (for complex facades)',
    summaryTitle: 'Preliminary Calculation',
    summarySub: 'The final price of the estimate is guaranteed',
    summaryBase: 'Base Tariff:',
    summaryCleanNoChem: '10 000 ₸ (no chem)',
    summaryRepairDiag: '10 000 ₸ (diagnostics)',
    summaryInstallFloor1: '10 000 ₸ (1st floor)',
    summaryInstallFloor2: '20 000 ₸ (2nd+ floor)',
    summaryAreaCharge: 'Power Surcharge:',
    summaryCapacitor: 'Capacitor Replacement:',
    summaryRelay: 'Thermal Relay Replacement:',
    summaryBoard: 'Board Repair:',
    summaryChem: 'Antibacterial Chemistry:',
    summaryFreon: 'Freon Refill (500 ml):',
    summaryHigh: 'High-Altitude Works:',
    summaryTotal: 'Total to Pay:',
    summaryTrustTitle: 'No Hidden Fees',
    summaryTrustDesc: 'The technician will lock this price in the contract before starting. No markup on the spot!',
    summaryPlaceholder: 'Your phone for estimate (WhatsApp)',
    summarySubmitBtn: 'Lock Price and Send Estimate to WhatsApp',
    summarySuccessTitle: 'Estimate Locked!',
    summarySuccessDesc: 'Redirecting to WhatsApp for instant arrival time coordination...',
    serviceTitle: 'Professional Services by Technical Code',
    serviceSub: 'We strictly follow the internal technical code of "AC Service", protecting your interior and equipment from any damage.',
    serviceTabOrderBtn: 'Order Service in WhatsApp',
    serviceTabExpected: 'Expected Result:',
    guaranteesTitle: '100% Protection of Your Rights & Safety',
    guaranteesSub: 'We have completely removed any financial and technical risks for our clients in Atyrau.',
    guar1Label: 'Work Warranty',
    guar1Title: 'Solid Written Warranty from 12 to 36 Months',
    guar1Desc: 'You receive an official warranty card and a certificate of completion with a stamp. If the problem occurs again, a duty technician arrives and fixes it at our expense within 24 hours. No extra questions asked.',
    guar2Label: 'Interior Insurance',
    guar2Title: 'Financial Protection of Your Interior & Furniture',
    guar2Desc: 'Before starting, we cover your walls, furniture, and appliances with protective film for free. If our technician accidentally damages finishings or stains wallpaper, we compensate 100% of damage. Your flat remains in pristine condition.',
    guar3Label: '100% Cleanliness',
    guar3Title: 'Cleanliness standard "Absolute Clean"',
    guar3Desc: 'Our specialists work strictly in clean shoe covers. All wall drilling is conducted with dust collection using industrial vacuum bags. Upon completion, the technician collects and takes away all large construction waste.',
    faqTitle: 'Answering Your Doubts',
    faqSub: 'Honest answers to the most common questions and fears of clients before calling a technician.',
    captureLabel: 'Urgent Visists in Atyrau',
    captureTitle: 'In Atyrau +40 °C: Free time slots today are gone by 11:00 AM',
    captureDesc: 'Crews are deployed across city districts promptly. Leave your phone number to reserve the nearest available technician, lock in the fixed price, and receive a detailed estimate in WhatsApp.',
    capturePlaceholder: 'Your Phone Number (WhatsApp)',
    captureSubmitBtn: 'Find Available Time & Lock Price',
    captureConsent: 'By clicking the button, you consent to the instant processing of personal data for communication.',
    captureSuccessTitle: 'Request Sent Successfully!',
    captureSuccessDesc: 'Time slot reserved for number {phone}. Redirecting to WhatsApp for instant arrival coordination...',
    footerBrandDesc: 'Professional service center for repair, cleaning, and installation of air conditioners in Atyrau. We operate strictly by contract with official warranty.',
    footerNavTitle: 'Navigation',
    footerContactsTitle: 'Contacts & Address',
    footerContactsAddress: 'Atyrau city, Balykshy district, K. Akhmediyarov street, house 28A, office 9',
    footerContactsTime: 'Working Hours:',
    footerContactsDays: 'Daily from 08:00 AM to 09:00 PM',
    footerDealerTitle: 'Official Dealer',
    footerDealerDesc: 'We work directly with major brands: Almacom, AUX, Kaspi-Climat, Midea, Gree. We purchase original spare parts in bulk, keeping prices highly affordable.',
    legalExec: 'Official Contractor',
    legalAddress: 'Legal Address',
    legalBank: 'Bank Requisites (JSC "Kaspi Bank")',
    legalBIN: 'BIN (IIN):',
    legalAddressDetails: 'RK, Atyrau city, Balykshy district, Karshymbay Akhmediyarov street, house 28A, apt./office 9',
    legalAcc: 'Account:',
    legalBik: 'BIC:',
    legalKbe: 'KBe:',
    copyright: '© {year} Climat Expert Atyrau. All rights reserved.',
    privacy: 'Privacy Policy',
    offer: 'Public Offer',
    themeLabel: 'Visual Theme:',
    themeLight: 'Light',
    themeDark: 'Dark',
    themeSystem: 'System (Auto)',
    langLabel: 'Language / Тіл / Язык:',
    faqItems: [
      {
        q: 'Is the diagnostics really free?',
        a: 'Yes, the visit of our certified engineer and complete tool diagnostics (with pressure gauges, leak detectors, multimeter) cost 0 KZT if we perform subsequent repair or cleaning on the same day. In case of refusal of repair, only a standard visit and diagnostics fee of 3,000 KZT is charged.'
      },
      {
        q: 'Will you arrive on time? Often technicians postpone the visit.',
        a: 'We know this Atyrau pain very well. We lock in a specific 2-hour window in WhatsApp when confirming the request (e.g., from 2:00 PM to 4:00 PM). If our technician is late by more than 15 minutes without warning, we give a 2,000 KZT discount on all works. All logistics are controlled by a centralized dispatcher.'
      },
      {
        q: 'How can I be sure the price won\'t increase in the process?',
        a: 'Our technician starts work only after conducting diagnostics and preparing an exact estimate, which we send to you in WhatsApp or write on paper. This price is final. There can be no "unexpected surcharges" for an extra meter of route, complexity, or mounts during the work.'
      },
      {
        q: 'What to do if the AC starts leaking again or stops cooling in a week?',
        a: 'You receive an official work completion certificate with a stamp and a warranty card valid for 12 to 36 months (depending on the service). In the event of a warranty claim, a separate emergency crew arrives within 24 hours and fixes the problem for free.'
      },
      {
        q: 'How do you protect the apartment from dirt during cleaning?',
        a: 'For cleaning, we use professional service packages (hermetic protective covers with a drain hose). All dirty water drains strictly into a bucket. For drilling walls, a powerful construction vacuum cleaner is used, collecting 98% of concrete chips and dust. Technicians work in shoe covers and clean up large construction debris afterwards.'
      },
      {
        q: 'Private listings on OLX offer cheaper services. Why choose you?',
        a: 'Private technicians often work without professional tools (no vacuuming before releasing freon, no electronic leak detectors, refilling by eye). Most importantly, they disappear or don\'t pick up the phone if the AC breaks in a week. With us, you pay a price competitive with private listings but get the reliability of an official service center with a legal contract and an office in Atyrau.'
      }
    ]
  }
};

// High-performance dynamic count-up component using IntersectionObserver & requestAnimationFrame
const AnimatedCounter = ({ target, duration = 1200, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    let started = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          started = true;
          let startTimestamp = null;
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={elementRef}>{count.toLocaleString('ru-RU')}{suffix}</span>;
};

// Apple-style dynamic scroll reveal text container using IntersectionObserver
const ScrollRevealHeading = ({ children, className = "" }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
          }
        });
      },
      { threshold: 0.25 } // Trigger transition when 25% of the heading is visible
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={`${className} transition-all duration-1000 ease-out ${
        isRevealed 
          ? 'opacity-100 translate-y-0 filter-none' 
          : 'opacity-35 translate-y-5 filter blur-[1px]'
      }`}
    >
      {children}
    </div>
  );
};

// Elite infinite glassmorphic review & trust marquee ticker
const InfiniteMarquee = ({ lang = 'ru' }) => {
  const items = [
    {
      id: 1,
      type: 'badge',
      title: lang === 'ru' ? 'Kaspi QR Оплата' : lang === 'kk' ? 'Kaspi QR Төлем' : 'Kaspi QR Payment',
      desc: lang === 'ru' ? 'Выдаем официальный фискальный чек после оплаты' : lang === 'kk' ? 'Төлемнен кейін ресми фискалдық чек береміз' : 'Official fiscal receipt issued instantly',
      icon: (
        <div className="w-10 h-10 rounded-lg bg-red-500/10 dark:bg-red-500/20 text-red-500 flex items-center justify-center font-bold text-xs shrink-0 select-none">
          Kaspi
        </div>
      )
    },
    {
      id: 2,
      type: 'review',
      title: lang === 'ru' ? 'Адильбек, мкр. Авангард' : lang === 'kk' ? 'Әділбек, Авангард мкр.' : 'Adilbek, Avangard dist.',
      desc: lang === 'ru' ? 'Приехали быстро, отмыли старый сплит дочиста. Пыли вообще не оставили, рекомендую!' : lang === 'kk' ? 'Жылдам келді, ескі сплитті тазалап жуды. Шаң мүлдем қалмады, ұсынамын!' : 'Arrived fast, cleaned the old AC perfectly. Left zero dust, highly recommended!',
      icon: (
        <div className="w-10 h-10 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-extrabold text-sm shrink-0 select-none">
          А
        </div>
      )
    },
    {
      id: 3,
      type: 'badge',
      title: lang === 'ru' ? 'Печать ИП и Договор' : lang === 'kk' ? 'ИП мөрі мен Келісімшарт' : 'IP Stamp & Contract',
      desc: lang === 'ru' ? 'Официальная юридическая гарантия на работу до 3 лет' : lang === 'kk' ? '3 жылға дейін жұмысқа ресми заңды кепілдік' : 'Official legal warranty for up to 3 years',
      icon: (
        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-450 flex items-center justify-center shrink-0 select-none">
          <ShieldCheck className="w-5 h-5" />
        </div>
      )
    },
    {
      id: 4,
      type: 'review',
      title: lang === 'ru' ? 'Айгуль, мкр. Балыкшы' : lang === 'kk' ? 'Айгүл, Балықшы мкр.' : 'Aigul, Balykshy dist.',
      desc: lang === 'ru' ? 'Кондиционер перестал охлаждать. Мастер заменил конденсатор за 20 минут, дал гарантию на деталь.' : lang === 'kk' ? 'Кондиционер суытпай қалды. Маман 20 минутта конденсаторды ауыстырып, кепілдік берді.' : 'The AC stopped cooling. The master replaced the capacitor in 20 mins, issued a warranty.',
      icon: (
        <div className="w-10 h-10 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-extrabold text-sm shrink-0 select-none">
          А
        </div>
      )
    },
    {
      id: 5,
      type: 'badge',
      title: lang === 'ru' ? 'ECO Безопасность' : lang === 'kk' ? 'ЭКО Қауіпсіздік' : 'ECO Safety',
      desc: lang === 'ru' ? 'Используем химию, сертифицированную для квартир с детьми' : lang === 'kk' ? 'Балалары бар пәтерлерге сертификатталған химияны қолданамыз' : 'We use certified chemical solutions safe for households with kids',
      icon: (
        <div className="w-10 h-10 rounded-lg bg-teal-500/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 select-none">
          <Sparkles className="w-5 h-5" />
        </div>
      )
    },
    {
      id: 6,
      type: 'review',
      title: lang === 'ru' ? 'Дмитрий, мкр. Нурсая' : lang === 'kk' ? 'Дмитрий, Нұрсая мкр.' : 'Dmitry, Nursaya dist.',
      desc: lang === 'ru' ? 'Установили сплит-систему по уровню. Ни одной пылинки при бурении стены, профессиональный пылесос.' : lang === 'kk' ? 'Сплит-жүйені деңгей бойынша орнатты. Қабырғаны бұрғылағанда ешқандай шаң болмады.' : 'Installed the AC perfectly level. Zero dust when drilling the wall, very professional vacuum.',
      icon: (
        <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-extrabold text-sm shrink-0 select-none">
          Д
        </div>
      )
    }
  ];

  // Duplicate items array to make the infinite scroll perfectly seamless
  const marqueeItems = [...items, ...items];

  return (
    <div className="w-full relative overflow-hidden py-10 bg-slate-50/50 dark:bg-[#0b101b]/50 border-y border-slate-100 dark:border-white/5 transition-colors duration-300">
      {/* Luxury blurred glass gradient side overlays */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-slate-50 dark:from-[#0b101b] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-slate-50 dark:from-[#0b101b] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee space-x-6 flex items-center">
        {marqueeItems.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className="w-[280px] sm:w-[340px] bg-white/60 dark:bg-[#0f1624]/60 backdrop-blur-md border border-slate-200/50 dark:border-white/5 p-4 rounded-2xl shrink-0 flex items-start space-x-3.5 hover:border-sky-500/30 dark:hover:border-sky-500/30 transition-all duration-300 select-none shadow-xs"
          >
            {item.icon}
            <div className="text-left space-y-1">
              <h4 className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm tracking-tight">{item.title}</h4>
              <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 leading-normal line-clamp-2">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  // Navigation Mobile state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Theme State (light, dark, system)
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'system');
  
  // Language State (ru, kk, en)
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'ru');

  // Language Dropdown Menu State
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  // Active translation helper and FAQ binding
  const t = TRANSLATIONS[lang] || TRANSLATIONS.ru;
  const faqItems = t.faqItems || [];

  // SEO & Metadata Dynamic Updates
  useEffect(() => {
    // Dynamic HTML lang attribute
    document.documentElement.setAttribute('lang', lang);
    
    // Dynamic page title matching chosen language
    if (lang === 'ru') {
      document.title = 'Ремонт, чистка и установка кондиционеров в Атырау | Климат Эксперт';
    } else if (lang === 'kk') {
      document.title = 'Атырауда кондиционерлерді жөндеу, тазалау және орнату | Климат Эксперт';
    } else {
      document.title = 'Air Conditioner Repair, Cleaning & Installation in Atyrau | Climat Expert';
    }
    
    // Dynamic meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    
    if (lang === 'ru') {
      metaDesc.setAttribute('content', 'Профессиональный ремонт, антибактериальная чистка и качественная установка кондиционеров в Атырау. Быстрый выезд за 2 часа, честные фиксированные цены, гарантия до 3 лет.');
    } else if (lang === 'kk') {
      metaDesc.setAttribute('content', 'Атырауда кондиционерлерді кәсіби жөндеу, антибактериалды тазалау және сапалы орнату. 2 сағат ішінде келу, әділ бекітілген бағалар, 3 жылға дейін кепілдік.');
    } else {
      metaDesc.setAttribute('content', 'Professional repair, antibacterial cleaning, and high-quality installation of air conditioners in Atyrau. Rapid arrival in 2 hours, honest fixed prices, and up to 3 years warranty.');
    }
  }, [lang]);

  // Premium Scroll Progress & Sticky Navbar dynamic shrink
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Tactile mobile elastic horizontal bounce spring states & callbacks
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchDiffX, setTouchDiffX] = useState(0);
  const [isResettingTouch, setIsResettingTouch] = useState(false);

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setTouchStartX(e.touches[0].clientX);
      setIsResettingTouch(false);
    }
  };

  const handleTouchMove = (e) => {
    if (touchStartX !== null && e.touches.length === 1) {
      const currentX = e.touches[0].clientX;
      const rawDiff = currentX - touchStartX;
      
      // Multiplier of 0.22 introduces high resistance/tension (spring physics)
      const resistance = 0.22;
      let elasticDiff = rawDiff * resistance;
      
      // Limit bounds to 45px to prevent breaking layout structure
      if (elasticDiff > 45) elasticDiff = 45;
      if (elasticDiff < -45) elasticDiff = -45;
      
      setTouchDiffX(elasticDiff);
    }
  };

  const handleTouchEnd = () => {
    setTouchStartX(null);
    setIsResettingTouch(true);
    setTouchDiffX(0);
  };

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 20) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }

          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Interactive Calculator State
  const [calcService, setCalcService] = useState('clean'); // 'clean', 'repair', 'install'
  const [calcArea, setCalcArea] = useState('20'); // '20', '35', '50', '50+'
  const [calcFloor, setCalcFloor] = useState('1'); // '1' (1st floor), '2+' (2nd floor or higher)
  const [extraAntibacterial, setExtraAntibacterial] = useState(true);
  const [extraFreon, setExtraFreon] = useState(false);
  const [extraHighWork, setExtraHighWork] = useState(false);
  
  // Repair-specific options
  const [repairCapacitor, setRepairCapacitor] = useState(false);
  const [repairRelay, setRepairRelay] = useState(false);
  const [repairBoard, setRepairBoard] = useState(false);

  const [calcSubmitted, setCalcSubmitted] = useState(false);
  const [calcPhone, setCalcPhone] = useState('');

  // Language change handler
  const handleLangChange = (newLang) => {
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  // Theme Sync Effect
  useEffect(() => {
    const root = window.document.documentElement;
    
    const applyTheme = (currentTheme) => {
      localStorage.setItem('theme', currentTheme);
      
      let isDark = false;
      if (currentTheme === 'dark') {
        isDark = true;
      } else if (currentTheme === 'system') {
        isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      
      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    applyTheme(theme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };
    
    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, [theme]);

  // Urgency Bar Live Slots Count
  const [slotsLeft, setSlotsLeft] = useState(3);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (slotsLeft > 1) {
        setSlotsLeft(prev => prev - 1);
      }
    }, 45000);
    return () => clearTimeout(timer);
  }, [slotsLeft]);

  // Main Booking Form State
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // FAQ Accordion Active Index
  const [faqActive, setFaqActive] = useState(null);
  const toggleFaq = (index) => {
    setFaqActive(faqActive === index ? null : index);
  };

  // Pricing Logic
  const calculatePrice = () => {
    let basePrice = 0;
    
    if (calcService === 'clean') {
      basePrice = 10000;
    } else if (calcService === 'repair') {
      basePrice = 10000;
    } else if (calcService === 'install') {
      basePrice = calcFloor === '1' ? 10000 : 20000;
    }

    if (calcArea === '35') basePrice += 3000;
    else if (calcArea === '50') basePrice += 6000;
    else if (calcArea === '50+') basePrice += 12000;

    if (calcService === 'repair') {
      if (repairCapacitor) basePrice += 13000;
      if (repairRelay) basePrice += 10000;
      if (repairBoard) basePrice += 20000;
      if (extraFreon) basePrice += 15000;
    } else {
      if (extraAntibacterial) {
        basePrice += calcService === 'clean' ? 5000 : 4000;
      }
      if (extraFreon) basePrice += 15000;
    }
    if (extraHighWork) basePrice += 15000;

    return basePrice;
  };

  const currentPrice = calculatePrice();

  // WhatsApp click triggers
  const handleWhatsAppClick = (message = 'Здравствуйте! Хочу заказать расчет стоимости ремонта кондиционера.') => {
    const encodedText = encodeURIComponent(message);
    window.open(`https://wa.me/77754323561?text=${encodedText}`, '_blank');
  };

  const submitBooking = (e, source = 'main') => {
    e.preventDefault();
    if (source === 'calc') {
      setCalcSubmitted(true);
      const serviceNames = { clean: 'Чистка', repair: 'Ремонт', install: 'Монтаж' };
      const areaNames = { '20': 'До 20 м²', '35': 'До 35 м²', '50': 'До 50 м²', '50+': 'Более 50 м²' };
      let extrasText = [];
      if (extraHighWork) extrasText.push('Высотные работы');
      
      let serviceName = serviceNames[calcService];
      if (calcService === 'clean') {
        serviceName = extraAntibacterial ? 'Чистка с химией' : 'Чистка без химии';
        if (extraFreon) extrasText.push('Заправка фреоном 500ml');
      } else if (calcService === 'repair') {
        if (repairCapacitor) extrasText.push('Замена конденсатора (13к)');
        if (repairRelay) extrasText.push('Замена теплового реле (10к)');
        if (repairBoard) extrasText.push('Ремонт платы (от 20к)');
        if (extraFreon) extrasText.push('Заправка фреоном 500ml (15к)');
      } else {
        if (extraAntibacterial) extrasText.push('Антибак');
        if (extraFreon) extrasText.push('Заправка фреоном 500ml');
      }
      
      const whatsAppMsg = `Привет! Рассчитал цену на сайте Климат Эксперт.\nУслуга: ${serviceName}\nПлощадь: ${areaNames[calcArea]}${calcService === 'install' ? `\nЭтаж: ${calcFloor === '1' ? '1-й' : '2-й и выше'}` : ''}\nОпции: ${extrasText.join(', ') || 'нет'}\nОриентировочная цена: ${currentPrice.toLocaleString('ru-RU')} ₸.\nМой телефон: ${calcPhone}. Жду подтверждения сметы!`;
      setTimeout(() => {
        handleWhatsAppClick(whatsAppMsg);
      }, 1000);
    } else {
      setBookingSuccess(true);
      const whatsAppMsg = `Привет! Хочу зафиксировать свободное время для ремонта кондиционера на сегодня. Мой телефон: ${bookingPhone}.`;
      setTimeout(() => {
        handleWhatsAppClick(whatsAppMsg);
      }, 1000);
    }
  };

  const servicesTabs = [
    {
      id: 'clean',
      title: lang === 'ru' ? 'Антибактериальная чистка' : lang === 'kk' ? 'Антибактериалды тазалау' : 'Antibacterial Cleaning',
      price: 'от 10 000 ₸',
      duration: lang === 'ru' ? '40-60 мин' : lang === 'kk' ? '40-60 мин' : '40-60 min',
      bullets: lang === 'ru' ? [
        'Смывка грязи, жира и пыли испарителя под давлением',
        'Полная очистка крыльчатки внутреннего вентилятора',
        'Промывка и продувка дренажного канала (защита от течи)',
        'Антибактериальная обработка сертифицированной химией Errecom (опционально)',
        'Очистка фильтров грубой очистки и внешнего блока'
      ] : lang === 'kk' ? [
        'Булантқышты қысыммен кірден, майдан және шаңнан жуу',
        'Ішкі желдеткіш қалақшасын толық тазалау',
        'Дренаж арнасын жуу және үрлеу (ағудан қорғау)',
        'Errecom сертификатталған химиясымен антибактериалды өңдеу (опционалды)',
        'Сүзгілер мен сыртқы блокты тазалау'
      ] : [
        'Flushing dirt, grease and dust off the evaporator under pressure',
        'Complete cleaning of the internal fan impeller',
        'Flushing and blowing the drainage channel (leak protection)',
        'Antibacterial treatment with certified Errecom chemicals (optional)',
        'Cleaning coarse filters and the external block'
      ],
      result: lang === 'ru' ? 'Устранение запаха плесени, сырости и кашля. Риск протечки конденсата на обои снижается до 0%.' : lang === 'kk' ? 'Зең, ылғал және жөтел иісін жою. Конденсаттың тұсқағазға ағу қаупі 0%-ға дейін төмендейді.' : 'Eliminating mold, dampness and cough odor. The risk of condensate leaking onto wallpaper drops to 0%.',
      objectionClose: lang === 'ru' ? 'Работаем с сервисным пакетом (пленкой-чехлом) — ни одна капля грязной воды не попадет на ваши обои или ламинат.' : lang === 'kk' ? 'Сервистік пакетпен (пленка-қаптамамен) жұмыс істейміз — кір судың бірде-бір тамшысы тұсқағазыңызға немесе ламинатыңызға түспейді.' : 'We work with a service package (protective cover) — not a single drop of dirty water will get onto your wallpaper or laminate.'
    },
    {
      id: 'repair',
      title: lang === 'ru' ? 'Инструментальный ремонт и заправка' : lang === 'kk' ? 'Аспаптық жөндеу және толтыру' : 'Instrument Repair & Refill',
      price: 'от 10 000 ₸',
      duration: lang === 'ru' ? '30-90 мин' : lang === 'kk' ? '30-90 мин' : '30-90 min',
      bullets: lang === 'ru' ? [
        'Замена пускового конденсатора: 13 000 ₸ (с нас запчасть и гарантия)',
        'Замена теплового реле: 10 000 ₸ (с запчастью, гарантия на нее)',
        'Ремонт платы управления: от 20 000 ₸',
        'Заправка кондиционера фреоном до 500 ml: 15 000 ₸',
        'Поиск микротрещин электронным течеискателем и вакуумирование',
        'Контрольный замер давления манометрической станцией после сборки'
      ] : lang === 'kk' ? [
        'Іске қосу конденсаторын ауыстыру: 13 000 ₸ (бөлшек және кепілдік бізден)',
        'Жылулық релені ауыстыру: 10 000 ₸ (бөлшекпен, оған ғана кепілдік)',
        'Басқару тақтасын жөндеу: 20 000 ₸-ден бастап',
        'Кондиционерді 500 ml дейін фреонмен толтыру: 15 000 ₸',
        'Электронды течеискательмен микрожарықтарды іздеу және вакуумдау',
        'Құрастырудан кейін манометрлік станциямен қысымды бақылау өлшеуі'
      ] : [
        'Starting capacitor replacement: 13 000 KZT (part and warranty included)',
        'Thermal relay replacement: 10 000 KZT (part included, warranty on details)',
        'Control board repair: from 20 000 KZT',
        'AC freon refilling up to 500 ml: 15 000 KZT',
        'Searching for leaks with electronic detector & vacuuming',
        'Control check of pressure with gauge station after assembly'
      ],
      result: lang === 'ru' ? 'Качественные запчасти в наличии. Гарантия предоставляется на все замененные нами детали.' : lang === 'kk' ? 'Сапалы қосалқы бөлшектер қоймада бар. Кепілдік біз ауыстырған барлық бөлшектерге беріледі.' : 'High-quality spare parts in stock. Warranty is provided on all parts replaced by us.',
      objectionClose: lang === 'ru' ? 'Сначала находим точную причину поломки. Гарантия действует только на замененные нами запчасти.' : lang === 'kk' ? 'Алдымен ақаулықтың нақты себебін табамыз. Кепілдік тек біз ауыстырған бөлшектерге ғана жарамды.' : 'First, we find the exact cause of the breakdown. The warranty applies only to the parts replaced by us.'
    },
    {
      id: 'install',
      title: lang === 'ru' ? 'Монтаж «Под ключ» по чек-листу' : lang === 'kk' ? 'Чек-лист бойынша «Дайын» орнату' : 'Turnkey Installation by Checklist',
      price: 'от 10 000 ₸',
      duration: lang === 'ru' ? '2-3 часа' : lang === 'kk' ? '2-3 сағат' : '2-3 hours',
      bullets: lang === 'ru' ? [
        'Разметка положения блоков лазерным уровнем (идеальный отвод дренажа)',
        'Алмазное бурение отверстий с пылеотсосом (без пыли и разломов стены)',
        'Монтаж трассы из качественной толстостенной медной трубки с термоизоляцией',
        'Обязательное вакуумирование трассы не менее 15 минут перед пуском фреона',
        'Монтаж виброгасящих опор для внешнего блока (чтобы не гудела стена ночью)'
      ] : lang === 'kk' ? [
        'Блоктардың орналасуын лазерлік деңгеймен белгілеу (идеалды дренаж ағысы)',
        'Шаңсорғышпен алмазды бұрғылау (шаңсыз және қабырға бұзылуынсыз)',
        'Термооқшаулағышы бар сапалы қалың қабырғалы мыс түтіктен трасса орнату',
        'Фреонды жібермес бұрын трассаны кемінде 15 минут міндетті вакуумдау',
        'Сыртқы блок үшін дірілді басатын тіректерді орнату (түнде қабырға гуілдемеуі үшін)'
      ] : [
        'Marking unit positions with a laser level (perfect condensate drainage)',
        'Diamond drilling with dust collection (no dust or wall damage)',
        'Installing a copper tube route with high-quality thermal insulation',
        'Compulsory vacuuming of the line for at least 15 minutes before releasing freon',
        'Installing vibration-damping mounts for external block (prevents wall hum at night)'
      ],
      result: lang === 'ru' ? 'Кондиционер работает бесшумно, не вибрирует, а официальная заводская гарантия сохраняется на 100%.' : lang === 'kk' ? 'Кондиционер дыбыссыз жұмыс істейді, дірілдемейді, ал ресми зауыттық кепілдік 100% сақталады.' : 'The AC runs silently, does not vibrate, and the official manufacturer warranty is 100% preserved.',
      objectionClose: lang === 'ru' ? 'Контролируем уклон дренажа по уровню. Даем юридическую гарантию на герметичность стыков трассы — фреон не уйдет за зиму.' : lang === 'kk' ? 'Дренаждың еңісін деңгей бойынша бақылаймыз. Трасса қосылыстарының тығыздығына заңды кепілдік береміз — фреон қыста кетпейді.' : 'We check the drain slope with a level. We give a legal warranty on joint tightness — freon will not leak during winter.'
    }
  ];

  return (
    <div 
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="bg-white dark:bg-[#080c14] min-h-screen text-slate-800 dark:text-slate-200 font-sans antialiased bg-grid-pattern relative overflow-x-hidden w-full transition-colors duration-300"
      style={{ 
        transform: touchDiffX !== 0 ? `translateX(${touchDiffX}px)` : 'none',
        // Snaps back with a premium elastic spring bounce on finger release
        transition: isResettingTouch 
          ? 'transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.3s ease, color 0.3s ease' 
          : 'background-color 0.3s ease, color 0.3s ease'
      }}
    >
      
      {/* Decorative Vibrant Accent Blobs */}
      <div className="absolute top-24 -left-48 w-96 h-96 bg-cyan-100 dark:bg-cyan-950/20 rounded-full gradient-blob opacity-60 pointer-events-none"></div>
      <div className="absolute top-[800px] -right-48 w-[400px] h-[400px] bg-sky-100 dark:bg-sky-950/10 rounded-full gradient-blob opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-[600px] left-10 w-96 h-96 bg-indigo-50 dark:bg-indigo-950/10 rounded-full gradient-blob opacity-50 pointer-events-none"></div>

      {/* HEADER / NAVIGATION */}
      <header className={`sticky top-0 z-50 glass-nav transition-all duration-300 ${
        isScrolled 
          ? 'shadow-md border-b border-sky-500/20 dark:border-cyan-500/20 shadow-sky-500/5' 
          : 'shadow-xs'
      }`}>
        {/* Horizontal scroll progress bar */}
        <div 
          className="scroll-progress-bar" 
          style={{ transform: `scaleX(${scrollProgress / 100})` }}
        />

        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'h-16' : 'h-20'
        }`}>
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-400 flex items-center justify-center shadow-md shadow-sky-100 dark:shadow-none">
              <Wind className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">Климат<span className="text-sky-600">Эксперт</span></span>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 tracking-wider uppercase font-semibold">Профессиональный сервис</p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-x-5 xl:space-x-8 shrink-0">
            <a href="#services" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">{t.navServices}</a>
            <a href="#calculator" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">{t.navCalc}</a>
            <a href="#guarantees" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">{t.navGuarantees}</a>
            <a href="#faq" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">{t.navFaq}</a>
          </nav>

          {/* Switchers & CTAs */}
          <div className="hidden lg:flex items-center space-x-2.5 xl:space-x-4 shrink-0">
            
            {/* Luxury Language Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="bg-slate-100 dark:bg-slate-800/80 border border-slate-200/40 dark:border-slate-700/40 px-3.5 py-2 rounded-xl flex items-center space-x-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-sky-500/40 dark:hover:border-sky-500/40 transition-all cursor-pointer shadow-xs active:scale-98"
              >
                {lang === 'ru' && (
                  <>
                    <span className="w-3.5 h-3.5 shrink-0 rounded-full overflow-hidden flex items-center justify-center shadow-xs">
                      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 8h24V0H0v8z" fill="#fff" />
                        <path d="M0 16h24V8H0v8z" fill="#0039a6" />
                        <path d="M0 24h24v-8H0v8z" fill="#d52b1e" />
                      </svg>
                    </span>
                    <span>Русский</span>
                  </>
                )}
                {lang === 'kk' && (
                  <>
                    <span className="w-3.5 h-3.5 shrink-0 rounded-full overflow-hidden flex items-center justify-center shadow-xs">
                      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" fill="#00b2e3" />
                        <circle cx="12" cy="12" r="3.5" fill="#fcd116" />
                        <path d="M12 7.5v9M7.5 12h9M8.8 8.8l6.4 6.4M8.8 15.2l6.4-6.4" stroke="#fcd116" strokeWidth="0.8" />
                        <path d="M2.5 3v18M1.5 5c1 0 1 1 2 1M1.5 9c1 0 1 1 2 1M1.5 13c1 0 1 1 2 1M1.5 17c1 0 1 1 2 1" stroke="#fcd116" strokeWidth="0.8" strokeLinecap="round" />
                      </svg>
                    </span>
                    <span>Қазақша</span>
                  </>
                )}
                {lang === 'en' && (
                  <>
                    <span className="w-3.5 h-3.5 shrink-0 rounded-full overflow-hidden flex items-center justify-center shadow-xs">
                      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" fill="#012169" />
                        <path d="M0 0l24 24M24 0L0 24" stroke="#fff" strokeWidth="2.5" />
                        <path d="M0 0l24 24M24 0L0 24" stroke="#c8102e" strokeWidth="1.2" />
                        <path d="M12 0v24M0 12h24" stroke="#fff" strokeWidth="4" />
                        <path d="M12 0v24M0 12h24" stroke="#c8102e" strokeWidth="2.5" />
                      </svg>
                    </span>
                    <span>English</span>
                  </>
                )}
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {langDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-15" 
                    onClick={() => setLangDropdownOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-44 bg-white/95 dark:bg-[#0f1624]/95 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 rounded-2xl shadow-xl z-20 py-1.5 overflow-hidden text-left transition-all">
                    {[
                      { id: 'ru', label: 'Русский', flag: (
                        <svg className="w-4 h-4 rounded-full overflow-hidden shadow-xs" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 8h24V0H0v8z" fill="#fff" />
                          <path d="M0 16h24V8H0v8z" fill="#0039a6" />
                          <path d="M0 24h24v-8H0v8z" fill="#d52b1e" />
                        </svg>
                      )},
                      { id: 'kk', label: 'Қазақша', flag: (
                        <svg className="w-4 h-4 rounded-full overflow-hidden shadow-xs" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="24" height="24" fill="#00b2e3" />
                          <circle cx="12" cy="12" r="3.5" fill="#fcd116" />
                          <path d="M12 7.5v9M7.5 12h9M8.8 8.8l6.4 6.4M8.8 15.2l6.4-6.4" stroke="#fcd116" strokeWidth="0.8" />
                          <path d="M2.5 3v18M1.5 5c1 0 1 1 2 1M1.5 9c1 0 1 1 2 1M1.5 13c1 0 1 1 2 1M1.5 17c1 0 1 1 2 1" stroke="#fcd116" strokeWidth="0.8" strokeLinecap="round" />
                        </svg>
                      )},
                      { id: 'en', label: 'English', flag: (
                        <svg className="w-4 h-4 rounded-full overflow-hidden shadow-xs" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="24" height="24" fill="#012169" />
                          <path d="M0 0l24 24M24 0L0 24" stroke="#fff" strokeWidth="2.5" />
                          <path d="M0 0l24 24M24 0L0 24" stroke="#c8102e" strokeWidth="1.2" />
                          <path d="M12 0v24M0 12h24" stroke="#fff" strokeWidth="4" />
                          <path d="M12 0v24M0 12h24" stroke="#c8102e" strokeWidth="2.5" />
                        </svg>
                      )}
                    ].map(item => (
                      <button
                        key={item.id}
                        onClick={() => {
                          handleLangChange(item.id);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 flex items-center justify-between text-xs transition-colors cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/80 ${
                          lang === item.id 
                            ? 'font-bold text-sky-600 dark:text-sky-400 bg-sky-500/5 dark:bg-sky-500/10' 
                            : 'text-slate-650 dark:text-slate-350 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          {item.flag}
                          <span>{item.label}</span>
                        </div>
                        {lang === item.id && <Check className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Theme switcher pill toggle */}
            <div className="bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl flex items-center space-x-0.5 border border-slate-200/40 dark:border-slate-700/40">
              {[
                { id: 'light', icon: Sun },
                { id: 'dark', icon: Moon },
                { id: 'system', icon: Monitor }
              ].map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setTheme(item.id)}
                    className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                      theme === item.id 
                        ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-xs' 
                        : 'text-slate-400 hover:text-slate-650 dark:hover:text-slate-350'
                    }`}
                    title={item.id === 'light' ? 'Light Theme' : item.id === 'dark' ? 'Dark Theme' : 'System Theme'}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </button>
                )
              })}
            </div>

            <div className="flex flex-col items-end pl-2 shrink-0">
              <a href="tel:+77754323561" className="flex items-center font-bold text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition-colors whitespace-nowrap">
                <Phone className="w-4 h-4 text-sky-500 mr-2 animate-pulse" />
                +7 (775) 432-35-61
              </a>
              <div className="flex items-center mt-1">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full inline-block animate-ping mr-1.5 shrink-0"></span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-500 font-semibold uppercase whitespace-nowrap">{t.statusText}</span>
              </div>
            </div>
            <button 
              onClick={() => handleWhatsAppClick(lang === 'ru' ? 'Здравствуйте! Хочу вызвать мастера на диагностику сегодня.' : lang === 'kk' ? 'Сәлеметсіз бе! Бүгін маман шақыртқым келеді.' : 'Hello! I would like to call a technician today.')}
              className="bg-slate-900 dark:bg-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 text-white text-xs font-bold py-3 px-5 rounded-xl transition-all cursor-pointer shrink-0"
            >
              {t.whatsAppBtn}
            </button>
          </div>

          {/* Mobile Menu & Switchers */}
          <div className="md:hidden flex items-center space-x-2">
            
            {/* Quick theme toggler for mobile */}
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light')}
              className="text-slate-600 dark:text-slate-300 p-2 border border-slate-200/50 dark:border-slate-850/60 rounded-xl cursor-pointer"
            >
              {theme === 'light' && <Sun className="w-4 h-4" />}
              {theme === 'dark' && <Moon className="w-4 h-4" />}
              {theme === 'system' && <Monitor className="w-4 h-4" />}
            </button>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white p-2 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-[#080c14] border-b border-slate-100 dark:border-slate-800 px-4 pt-2 pb-6 space-y-3 transition-all duration-300 text-left">
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-sky-600 dark:hover:text-sky-400"
            >
              {t.navServices}
            </a>
            <a 
              href="#calculator" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-sky-600 dark:hover:text-sky-400"
            >
              {t.navCalc}
            </a>
            <a 
              href="#guarantees" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-sky-600 dark:hover:text-sky-400"
            >
              {t.navGuarantees}
            </a>
            <a 
              href="#faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-sky-600 dark:hover:text-sky-400"
            >
              {t.navFaq}
            </a>
            
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col space-y-3 px-3">
              
              {/* Mobile Language switch */}
              <div className="flex items-center justify-between text-xs text-slate-500 py-1">
                <span>{t.langLabel}</span>
                <div className="bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-lg flex items-center space-x-0.5 border border-slate-200/30 dark:border-slate-700/30">
                  {[
                    { id: 'ru', label: 'RU', flag: (
                      <svg className="w-3 h-3 rounded-full overflow-hidden shadow-xs shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 8h24V0H0v8z" fill="#fff" />
                        <path d="M0 16h24V8H0v8z" fill="#0039a6" />
                        <path d="M0 24h24v-8H0v8z" fill="#d52b1e" />
                      </svg>
                    )},
                    { id: 'kk', label: 'ҚАЗ', flag: (
                      <svg className="w-3 h-3 rounded-full overflow-hidden shadow-xs shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" fill="#00b2e3" />
                        <circle cx="12" cy="12" r="3.5" fill="#fcd116" />
                        <path d="M12 7.5v9M7.5 12h9M8.8 8.8l6.4 6.4M8.8 15.2l6.4-6.4" stroke="#fcd116" strokeWidth="0.8" />
                        <path d="M2.5 3v18M1.5 5c1 0 1 1 2 1M1.5 9c1 0 1 1 2 1M1.5 13c1 0 1 1 2 1M1.5 17c1 0 1 1 2 1" stroke="#fcd116" strokeWidth="0.8" strokeLinecap="round" />
                      </svg>
                    )},
                    { id: 'en', label: 'ENG', flag: (
                      <svg className="w-3 h-3 rounded-full overflow-hidden shadow-xs shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" fill="#012169" />
                        <path d="M0 0l24 24M24 0L0 24" stroke="#fff" strokeWidth="2.5" />
                        <path d="M0 0l24 24M24 0L0 24" stroke="#c8102e" strokeWidth="1.2" />
                        <path d="M12 0v24M0 12h24" stroke="#fff" strokeWidth="4" />
                        <path d="M12 0v24M0 12h24" stroke="#c8102e" strokeWidth="2.5" />
                      </svg>
                    )}
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => handleLangChange(item.id)}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold cursor-pointer flex items-center space-x-1 transition-all ${
                        lang === item.id 
                          ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-xs' 
                          : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-350'
                      }`}
                    >
                      {item.flag}
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile theme switch */}
              <div className="flex items-center justify-between text-xs text-slate-500 py-1">
                <span>{t.themeLabel}</span>
                <span className="font-bold text-slate-750 dark:text-slate-250">
                  {theme === 'light' && t.themeLight}
                  {theme === 'dark' && t.themeDark}
                  {theme === 'system' && t.themeSystem}
                </span>
              </div>

              <a href="tel:+77754323561" className="flex items-center font-bold text-slate-900 dark:text-white pt-1">
                <Phone className="w-4 h-4 text-sky-500 mr-2" />
                +7 (775) 432-35-61
              </a>
              <p className="text-xs text-emerald-600 dark:text-emerald-500 font-medium">{t.statusMobile}</p>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleWhatsAppClick(lang === 'ru' ? 'Здравствуйте! Хочу вызвать мастера на диагностику сегодня.' : lang === 'kk' ? 'Сәлеметсіз бе! Бүгін маман шақыртқым келеді.' : 'Hello! I would like to call a technician today.');
                }}
                className="w-full text-center bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-700 hover:to-cyan-600 text-white font-bold py-3 rounded-xl transition-all cursor-pointer"
              >
                {t.whatsAppMobile}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* DYNAMIC URGENCY SLOT BAR */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/10 dark:to-orange-950/10 border-b border-amber-100 dark:border-amber-900/20 py-3 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-2">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-amber-600 dark:text-amber-500 shrink-0 animate-pulse" />
            <span className="text-xs sm:text-sm text-amber-900 dark:text-amber-200 font-medium">
              {t.urgencyText}
            </span>
          </div>
          <div className="flex items-center space-x-3 shrink-0">
            <span className="text-xs bg-amber-200 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 px-2 py-0.5 rounded-full font-bold">
              {t.slotsText.replace('{slotsLeft}', slotsLeft)}
            </span>
            <a 
              href="#booking-section" 
              className="text-xs text-amber-950 dark:text-amber-400 font-bold underline hover:text-amber-800 transition-colors"
            >
              {t.reserveSlot}
            </a>
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 md:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8 text-left z-10">
              
              {/* Trust Badge */}
              <div className="inline-flex items-center space-x-2 bg-sky-50 dark:bg-sky-950/30 text-sky-700 dark:text-sky-400 px-3 py-1.5 rounded-full border border-sky-100 dark:border-sky-900/30 shadow-xs">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">{t.trustTitle}</span>
              </div>
              
              {/* Premium Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
                {t.heroTitlePart1}<span className="bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">{t.heroTitlePart2}</span>{t.heroTitlePart3}
              </h1>
              
              {/* Subtitle */}
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                {t.heroSubtitle}
              </p>

              {/* Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 max-w-md sm:max-w-none">
                <button 
                  onClick={() => handleWhatsAppClick(lang === 'ru' ? 'Здравствуйте! Хочу рассчитать стоимость работ.' : lang === 'kk' ? 'Сәлеметсіз бе! Жұмыс құнын есептегім келеді.' : 'Hello! I want to calculate the cost of works.')}
                  className="inline-flex items-center justify-center bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-700 hover:to-cyan-600 text-white font-bold text-sm py-4 px-8 rounded-xl transition-all shadow-md active:scale-98 cursor-pointer gap-2 cta-shimmer"
                >
                  {t.heroCtaWhatsApp}
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a 
                  href="#booking-section"
                  className="inline-flex items-center justify-center bg-slate-900 dark:bg-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 text-white font-bold text-sm py-4 px-8 rounded-xl transition-all hover:shadow-lg active:scale-98 cursor-pointer text-center cta-shimmer"
                >
                  {t.heroCtaSlot}
                </a>
              </div>

              {/* Instant Mini Trust Factors Grid */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold text-xl">{t.miniStat1Title}</h4>
                  <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">{t.miniStat1Desc}</p>
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold text-xl">{t.miniStat2Title}</h4>
                  <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">{t.miniStat2Desc}</p>
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold text-xl">{t.miniStat3Title}</h4>
                  <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">{t.miniStat3Desc}</p>
                </div>
              </div>

            </div>

            {/* Right Interactive Card */}
            <div className="lg:col-span-5 relative z-10">
              <div className="bg-white/80 dark:bg-[#0f1624]/80 backdrop-blur-xl border border-slate-100 dark:border-white/5 p-8 rounded-2xl shadow-xl shadow-slate-100 dark:shadow-none space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-full filter blur-xl"></div>
                
                {/* Visual Header */}
                <div className="flex items-center space-x-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="w-10 h-10 rounded-lg bg-sky-100 dark:bg-sky-950/50 flex items-center justify-center text-sky-600 dark:text-sky-400">
                    <Thermometer className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">{t.quickBookingTitle}</h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{t.quickBookingSub}</p>
                  </div>
                </div>

                <div className="space-y-4 text-left">
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-500 dark:text-sky-400 mt-0.5 shrink-0" />
                    <p className="text-xs text-slate-600 dark:text-slate-400">{t.quickBookingBullet1}</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-500 dark:text-sky-400 mt-0.5 shrink-0" />
                    <p className="text-xs text-slate-600 dark:text-slate-400">{t.quickBookingBullet2}</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-500 dark:text-sky-400 mt-0.5 shrink-0" />
                    <p className="text-xs text-slate-600 dark:text-slate-400">{t.quickBookingBullet3}</p>
                  </div>
                </div>

                {/* Urgency Badge */}
                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/20 p-4 rounded-xl flex items-start space-x-3 text-left">
                  <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200">{t.objectionBoxTitle}</h4>
                    <p className="text-[11px] text-amber-700 dark:text-amber-400 mt-0.5">{t.objectionBoxDesc}</p>
                  </div>
                </div>

                <a 
                  href="#calculator"
                  className="w-full inline-flex items-center justify-center bg-slate-900 dark:bg-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 text-white font-bold py-3.5 px-6 rounded-xl transition-all active:scale-98 text-xs cursor-pointer"
                >
                  {t.toCalculatorBtn}
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CORE TRUST STATS SECTION */}
      <section className="py-16 bg-slate-50 dark:bg-[#0b101b] border-y border-slate-100 dark:border-white/5 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Stat 1 */}
            <div className="premium-glow-card bg-white dark:bg-[#0f1624]/60 p-8 rounded-2xl border border-slate-100 dark:border-white/5 flex items-start space-x-5 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-950/30 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="font-extrabold text-slate-900 dark:text-white text-2xl tracking-tight">
                  <AnimatedCounter target={8} suffix="+" /> {lang === 'ru' ? 'лет на рынке Атырау' : lang === 'kk' ? 'жыл Атырау нарығында' : 'Years in Atyrau'}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
                  {t.stat1Desc}
                </p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="premium-glow-card bg-white dark:bg-[#0f1624]/60 p-8 rounded-2xl border border-slate-100 dark:border-white/5 flex items-start space-x-5 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-950/30 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                <Wrench className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="font-extrabold text-slate-900 dark:text-white text-2xl tracking-tight">
                  <AnimatedCounter target={100} suffix="%" /> {lang === 'ru' ? 'деталей с собой' : lang === 'kk' ? 'бөлшектер дайын' : 'Parts in Stock'}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
                  {t.stat2Desc}
                </p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="premium-glow-card bg-white dark:bg-[#0f1624]/60 p-8 rounded-2xl border border-slate-100 dark:border-white/5 flex items-start space-x-5 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-950/30 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-6 h-6"
                >
                  <path d="M6 6h12" />
                  <path d="M6 10h12" />
                  <path d="M12 10v10" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-extrabold text-slate-900 dark:text-white text-2xl tracking-tight">
                  <AnimatedCounter target={0} suffix=" ₸" /> {lang === 'ru' ? 'за выезд и диагностику' : lang === 'kk' ? 'шығу және диагностика' : 'for Visit & Diagnosis'}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
                  {t.stat3Desc}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* INTERACTIVE PRICE CALCULATOR WIDGET */}
      <section id="calculator" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-12">
            <ScrollRevealHeading>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight sm:text-4xl">
                {t.calcTitle}
              </h2>
            </ScrollRevealHeading>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-lg mx-auto">
              {t.calcSub}
            </p>
          </div>

          <div className="bg-white dark:bg-[#0f1624]/60 border border-slate-200/80 dark:border-white/5 rounded-2xl shadow-xl shadow-slate-100 dark:shadow-none overflow-hidden grid md:grid-cols-12 transition-colors duration-300">
            
            {/* Calc Controls */}
            <div className="md:col-span-7 p-6 sm:p-8 space-y-6 text-left border-r border-slate-100 dark:border-white/5">
              
              {/* Step 1 */}
              <div className="space-y-3">
                <label className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">{t.calcStep1}</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'clean', label: t.calcClean },
                    { id: 'repair', label: t.calcRepair },
                    { id: 'install', label: t.calcInstall }
                  ].map(service => (
                    <button
                      key={service.id}
                      onClick={() => setCalcService(service.id)}
                      className={`py-3 px-2 text-xs font-bold rounded-xl transition-all cursor-pointer border text-center ${
                        calcService === service.id 
                          ? 'bg-sky-600 border-sky-600 text-white shadow-md shadow-sky-100 dark:shadow-none'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-sky-500 dark:hover:border-sky-500'
                      }`}
                    >
                      {service.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2 */}
              <div className="space-y-3">
                <label className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">{t.calcStep2}</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: '20', label: t.calcArea20, btu: '07-09 BTU' },
                    { id: '35', label: t.calcArea35, btu: '12 BTU' },
                    { id: '50', label: t.calcArea50, btu: '18 BTU' },
                    { id: '50+', label: t.calcArea50Plus, btu: '24+ BTU' }
                  ].map(area => (
                    <button
                      key={area.id}
                      onClick={() => setCalcArea(area.id)}
                      className={`p-3 rounded-xl transition-all cursor-pointer border flex flex-col items-center justify-center text-center ${
                        calcArea === area.id 
                          ? 'bg-sky-600 border-sky-600 text-white shadow-md shadow-sky-100 dark:shadow-none'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-sky-500 dark:hover:border-sky-500'
                      }`}
                    >
                      <span className="text-xs font-bold">{area.label}</span>
                      <span className={`text-[9px] mt-0.5 ${calcArea === area.id ? 'text-sky-100' : 'text-slate-400 dark:text-slate-500'}`}>{area.btu}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2.5 (Only for Installation) */}
              {calcService === 'install' && (
                <div className="space-y-3">
                  <label className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">{t.calcStep2_5}</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: '1', label: t.calcFloor1, note: t.calcFloor1Note },
                      { id: '2+', label: t.calcFloor2Plus, note: t.calcFloor2PlusNote }
                    ].map(floor => (
                      <button
                        key={floor.id}
                        type="button"
                        onClick={() => setCalcFloor(floor.id)}
                        className={`p-3 rounded-xl transition-all cursor-pointer border flex flex-col items-center justify-center text-center ${
                          calcFloor === floor.id 
                            ? 'bg-sky-600 border-sky-600 text-white shadow-md shadow-sky-100 dark:shadow-none'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-sky-500 dark:hover:border-sky-500'
                        }`}
                      >
                        <span className="text-xs font-bold">{floor.label}</span>
                        <span className={`text-[9px] mt-0.5 ${calcFloor === floor.id ? 'text-sky-100' : 'text-slate-400 dark:text-slate-500'}`}>{floor.note}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3 */}
              <div className="space-y-3">
                <label className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                  {calcService === 'repair' ? t.calcStep3_Repair : t.calcStep3_Default}
                </label>
                <div className="space-y-2">
                  
                  {/* Dynamic Repair Options */}
                  {calcService === 'repair' ? (
                    <>
                      {/* Capacitor */}
                      <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <input 
                            type="checkbox" 
                            checked={repairCapacitor}
                            onChange={(e) => setRepairCapacitor(e.target.checked)}
                            className="w-4 h-4 text-sky-600 border-slate-300 rounded-sm focus:ring-sky-500 cursor-pointer"
                          />
                          <div>
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">{t.calcOptCapacitor}</span>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500">{t.calcOptCapacitorNote}</span>
                          </div>
                        </div>
                      </label>

                      {/* Relay */}
                      <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <input 
                            type="checkbox" 
                            checked={repairRelay}
                            onChange={(e) => setRepairRelay(e.target.checked)}
                            className="w-4 h-4 text-sky-600 border-slate-300 rounded-sm focus:ring-sky-500 cursor-pointer"
                          />
                          <div>
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">{t.calcOptRelay}</span>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500">{t.calcOptRelayNote}</span>
                          </div>
                        </div>
                      </label>

                      {/* Board */}
                      <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <input 
                            type="checkbox" 
                            checked={repairBoard}
                            onChange={(e) => setRepairBoard(e.target.checked)}
                            className="w-4 h-4 text-sky-600 border-slate-300 rounded-sm focus:ring-sky-500 cursor-pointer"
                          />
                          <div>
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">{t.calcOptBoard}</span>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500">{t.calcOptBoardNote}</span>
                          </div>
                        </div>
                      </label>
                    </>
                  ) : (
                    /* Default options (Clean/Install) */
                    <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <input 
                          type="checkbox" 
                          checked={extraAntibacterial}
                          onChange={(e) => setExtraAntibacterial(e.target.checked)}
                          className="w-4 h-4 text-sky-600 border-slate-300 rounded-sm focus:ring-sky-500 cursor-pointer"
                        />
                        <div>
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                            {calcService === 'clean' ? t.calcOptCleanChem : t.calcOptAntibac}
                          </span>
                          <span className="text-[10px] text-slate-400 dark:text-slate-500">
                            {calcService === 'clean' ? t.calcOptCleanChemNote : t.calcOptAntibacNote}
                          </span>
                        </div>
                      </div>
                    </label>
                  )}

                  {/* Freon */}
                  <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <input 
                        type="checkbox" 
                        checked={extraFreon}
                        onChange={(e) => setExtraFreon(e.target.checked)}
                        className="w-4 h-4 text-sky-600 border-slate-300 rounded-sm focus:ring-sky-500 cursor-pointer"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                          {calcService === 'repair' ? t.calcOptFreonRepair : t.calcOptFreonClean}
                        </span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">
                          {calcService === 'repair' ? t.calcOptFreonRepairNote : t.calcOptFreonCleanNote}
                        </span>
                      </div>
                    </div>
                  </label>

                  {/* High Work */}
                  <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <input 
                        type="checkbox" 
                        checked={extraHighWork}
                        onChange={(e) => setExtraHighWork(e.target.checked)}
                        className="w-4 h-4 text-sky-600 border-slate-300 rounded-sm focus:ring-sky-500 cursor-pointer"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">{t.calcOptHigh}</span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">{t.calcOptHighNote}</span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

            </div>

            {/* Pricing Summary */}
            <div className="md:col-span-5 bg-slate-50/80 dark:bg-[#0c121e] p-6 sm:p-8 flex flex-col justify-between text-left relative transition-colors duration-300">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-extrabold text-slate-400 dark:text-slate-550 uppercase tracking-wider">{t.summaryTitle}</h4>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">{t.summarySub}</p>
                </div>

                <div className="py-6 border-y border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                    <span>{t.summaryBase}</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      {calcService === 'clean' && t.summaryCleanNoChem}
                      {calcService === 'repair' && t.summaryRepairDiag}
                      {calcService === 'install' && (calcFloor === '1' ? t.summaryInstallFloor1 : t.summaryInstallFloor2)}
                    </span>
                  </div>
                  {calcArea !== '20' && (
                    <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                      <span>{t.summaryAreaCharge}</span>
                      <span className="font-bold text-slate-700 dark:text-slate-300">
                        {calcArea === '35' && '+ 3 000 ₸'}
                        {calcArea === '50' && '+ 6 000 ₸'}
                        {calcArea === '50+' && '+ 12 000 ₸'}
                      </span>
                    </div>
                  )}
                  
                  {/* Dynamic Repair Summary Items */}
                  {calcService === 'repair' ? (
                    <>
                      {repairCapacitor && (
                        <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                          <span>{t.summaryCapacitor}</span>
                          <span className="font-bold text-slate-700 dark:text-slate-300">+ 13 000 ₸</span>
                        </div>
                      )}
                      {repairRelay && (
                        <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                          <span>{t.summaryRelay}</span>
                          <span className="font-bold text-slate-700 dark:text-slate-300">+ 10 000 ₸</span>
                        </div>
                      )}
                      {repairBoard && (
                        <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                          <span>{t.summaryBoard}</span>
                          <span className="font-bold text-slate-700 dark:text-slate-300">+ 20 000 ₸</span>
                        </div>
                      )}
                    </>
                  ) : (
                    /* Default options (Clean/Install) */
                    extraAntibacterial && (
                      <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                        <span>{t.summaryChem}</span>
                        <span className="font-bold text-slate-700 dark:text-slate-300">
                          {calcService === 'clean' ? '+ 5 000 ₸' : '+ 4 000 ₸'}
                        </span>
                      </div>
                    )
                  )}

                  {extraFreon && (
                    <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                      <span>{t.summaryFreon}</span>
                      <span className="font-bold text-slate-700 dark:text-slate-300">+ 15 000 ₸</span>
                    </div>
                  )}
                  {extraHighWork && (
                    <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                      <span>{t.summaryHigh}</span>
                      <span className="font-bold text-slate-700 dark:text-slate-300">+ 15 000 ₸</span>
                    </div>
                  )}

                  <div className="pt-4 flex justify-between items-end border-t border-slate-200 dark:border-slate-800">
                    <span className="text-slate-900 dark:text-white font-extrabold text-sm uppercase">{t.summaryTotal}</span>
                    <div className="text-right">
                      <span className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
                        {currentPrice.toLocaleString('ru-RU')} ₸
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-[#0f1624] border border-sky-100 dark:border-sky-950/40 p-3.5 rounded-xl space-y-1">
                  <div className="flex items-center space-x-2 text-sky-600 dark:text-sky-400">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-bold">{t.summaryTrustTitle}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal">
                    {t.summaryTrustDesc}
                  </p>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="mt-8">
                {!calcSubmitted ? (
                  <form onSubmit={(e) => submitBooking(e, 'calc')} className="space-y-2">
                    <input 
                      type="tel" 
                      placeholder={t.summaryPlaceholder} 
                      required
                      value={calcPhone}
                      onChange={(e) => setCalcPhone(e.target.value)}
                      className="w-full text-xs bg-white dark:bg-slate-950 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-700 hover:to-cyan-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-md active:scale-98 cursor-pointer text-center text-xs"
                    >
                      {t.summarySubmitBtn}
                    </button>
                  </form>
                ) : (
                  <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/20 p-4 rounded-xl text-center space-y-2">
                    <Check className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto" />
                    <h5 className="text-xs font-bold text-emerald-950 dark:text-emerald-250">{t.summarySuccessTitle}</h5>
                    <p className="text-[10px] text-emerald-700 dark:text-emerald-450 leading-relaxed">
                      {t.summarySuccessDesc}
                    </p>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* DYNAMIC SERVICES SHOWCASE */}
      <section id="services" className="py-20 bg-slate-50 dark:bg-[#0b101b] border-y border-slate-100 dark:border-white/5 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <ScrollRevealHeading>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight sm:text-4xl">
                {t.serviceTitle}
              </h2>
            </ScrollRevealHeading>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl mx-auto">
              {t.serviceSub}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {servicesTabs.map((service) => (
              <div 
                key={service.id}
                className="premium-glow-card bg-white dark:bg-[#0f1624]/60 p-6 sm:p-8 flex flex-col justify-between text-left"
              >
                <div className="space-y-6">
                  {/* Card Header */}
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">{service.duration}</span>
                    <span className="text-xl font-black text-slate-900 dark:text-white">{service.price}</span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-xl tracking-tight leading-tight">{service.title}</h3>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-3 border-t border-slate-100 dark:border-slate-800 pt-6">
                    {service.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        <Check className="w-4 h-4 text-sky-500 dark:text-sky-400 shrink-0 mr-2 mt-1" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 space-y-4">
                  {/* Results Badge */}
                  <div className="bg-sky-50/50 dark:bg-sky-950/20 p-4 rounded-xl border border-sky-100/50 dark:border-sky-900/10">
                    <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider block">{t.serviceTabExpected}</span>
                    <p className="text-xs text-slate-650 dark:text-slate-200 mt-1 leading-normal">{service.result}</p>
                  </div>

                  {/* Objection Closure */}
                  <div className="flex items-start space-x-2 text-[11px] text-slate-400 dark:text-slate-500 italic">
                    <Info className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                    <span>{service.objectionClose}</span>
                  </div>

                  <button 
                    onClick={() => handleWhatsAppClick(lang === 'ru' ? `Здравствуйте! Хочу заказать услугу: ${service.title}.` : lang === 'kk' ? `Сәлеметсіз бе! Мен ${service.title} қызметіне тапсырыс бергім келеді.` : `Hello! I would like to order: ${service.title}.`)}
                    className="w-full bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 text-white text-xs font-bold py-3.5 rounded-xl transition-all text-center cursor-pointer cta-shimmer"
                  >
                    {t.serviceTabOrderBtn}
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* DETAILED GUARANTEES & RISK-REVERSAL */}
      <section id="guarantees" className="py-20 relative overflow-hidden">
        
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-50/40 dark:bg-sky-950/5 rounded-full filter blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center space-y-4 mb-16">
            <ScrollRevealHeading>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight sm:text-4xl">
                {t.guaranteesTitle}
              </h2>
            </ScrollRevealHeading>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-lg mx-auto">
              {t.guaranteesSub}
            </p>
          </div>

          <div className="space-y-6">
            
            {/* Guarantee 1 */}
            <div className="premium-glow-card bg-white dark:bg-[#0f1624]/60 p-6 sm:p-8 rounded-2xl grid md:grid-cols-12 gap-6 items-center text-left">
              <div className="md:col-span-3 flex justify-center">
                <div className="w-20 h-20 rounded-2xl bg-sky-50 dark:bg-sky-950/30 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                  <ShieldCheck className="w-10 h-10" />
                </div>
              </div>
              <div className="md:col-span-9 space-y-2">
                <div className="flex items-center space-x-2 flex-wrap gap-1">
                  <span className="bg-sky-100 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">{t.guar1Label}</span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg sm:text-xl">{t.guar1Title}</h3>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {t.guar1Desc}
                </p>
              </div>
            </div>

            {/* Guarantee 2 */}
            <div className="premium-glow-card bg-white dark:bg-[#0f1624]/60 p-6 sm:p-8 rounded-2xl grid md:grid-cols-12 gap-6 items-center text-left">
              <div className="md:col-span-3 flex justify-center">
                <div className="w-20 h-20 rounded-2xl bg-sky-50 dark:bg-sky-950/30 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                  <ShieldAlert className="w-10 h-10" />
                </div>
              </div>
              <div className="md:col-span-9 space-y-2">
                <div className="flex items-center space-x-2 flex-wrap gap-1">
                  <span className="bg-indigo-100 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">{t.guar2Label}</span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg sm:text-xl">{t.guar2Title}</h3>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {t.guar2Desc}
                </p>
              </div>
            </div>

            {/* Guarantee 3 */}
            <div className="premium-glow-card bg-white dark:bg-[#0f1624]/60 p-6 sm:p-8 rounded-2xl grid md:grid-cols-12 gap-6 items-center text-left">
              <div className="md:col-span-3 flex justify-center">
                <div className="w-20 h-20 rounded-2xl bg-sky-50 dark:bg-sky-950/30 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                  <Sparkles className="w-10 h-10" />
                </div>
              </div>
              <div className="md:col-span-9 space-y-2">
                <div className="flex items-center space-x-2 flex-wrap gap-1">
                  <span className="bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-450 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">{t.guar3Label}</span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg sm:text-xl">{t.guar3Title}</h3>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {t.guar3Desc}
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* INFINITE TRUST MARQUEE */}
      <InfiniteMarquee lang={lang} />

      {/* FREQUENT OBJECTIONS FAQ (ACCORDION) */}
      <section id="faq" className="py-20 bg-slate-50 dark:bg-[#0b101b] border-y border-slate-100 dark:border-white/5 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <ScrollRevealHeading>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight sm:text-4xl">
                {t.faqTitle}
              </h2>
            </ScrollRevealHeading>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-lg mx-auto">
              {t.faqSub}
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-white dark:bg-[#0f1624] border border-slate-200/60 dark:border-white/5 rounded-2xl overflow-hidden shadow-xs transition-all duration-300 text-left"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base pr-4">{faq.q}</span>
                  {faqActive === idx ? (
                    <ChevronUp className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0" />
                  )}
                </button>
                
                {faqActive === idx && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-650 dark:text-slate-400 leading-relaxed border-t border-slate-100/60 dark:border-slate-800">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FINAL HIGH-CONVERTING CAPTURE FORM */}
      <section id="booking-section" className="py-24 relative overflow-hidden bg-slate-900 text-white">
        
        {/* Dark theme accents */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 to-slate-950 opacity-90 z-0"></div>
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-sky-600/10 rounded-full filter blur-3xl z-0 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-12">
          
          <div className="space-y-4">
            <span className="bg-amber-400/15 text-amber-300 border border-amber-400/30 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              {t.captureLabel}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              {t.captureTitle}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              {t.captureDesc}
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 sm:p-10 rounded-3xl max-w-xl mx-auto backdrop-blur-md">
            {!bookingSuccess ? (
              <form onSubmit={(e) => submitBooking(e, 'main')} className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">{t.capturePlaceholder}</label>
                  <input 
                    type="tel" 
                    placeholder="+7 (___) ___-__-__" 
                    required
                    value={bookingPhone}
                    onChange={(e) => setBookingPhone(e.target.value)}
                    className="w-full text-sm bg-slate-950/80 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-sky-500 text-white placeholder-slate-600"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-600 hover:to-cyan-500 text-slate-950 text-xs sm:text-sm font-black py-4 rounded-xl transition-all shadow-lg active:scale-98 cursor-pointer uppercase tracking-wider"
                >
                  {t.captureSubmitBtn}
                </button>
                
                <p className="text-[10px] text-slate-500 leading-normal text-center">
                  {t.captureConsent}
                </p>
              </form>
            ) : (
              <div className="py-8 space-y-4 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-white">{t.captureSuccessTitle}</h4>
                <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
                  {t.captureSuccessDesc.replace('{phone}', bookingPhone)}
                </p>
              </div>
            )}
          </div>

          {/* Core Objections reminder cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left pt-8 border-t border-white/5">
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-white">{lang === 'ru' ? 'Выезд за 0 ₸' : lang === 'kk' ? 'Келуі 0 ₸' : '0 KZT Visit'}</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-normal">{lang === 'ru' ? 'При выполнении работ выезд инженера бесплатный.' : lang === 'kk' ? 'Жұмыс жүргізілсе инженердің келуі тегін.' : 'Arrival is free under repair condition.'}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-white">{lang === 'ru' ? 'Цена до работ' : lang === 'kk' ? 'Жұмысқа дейінгі баға' : 'Price Lock'}</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-normal">{lang === 'ru' ? 'Никаких непредвиденных доплат за шланги или срочность.' : lang === 'kk' ? 'Түтік немесе шұғылдық үшін ешқандай үстеме төлемсіз.' : 'No sudden surcharges for lines or urgency.'}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-white">{lang === 'ru' ? 'Бахилы и уборка' : lang === 'kk' ? 'Бахила мен тазалау' : 'Shoe Covers & Clean'}</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-normal">{lang === 'ru' ? 'Инженер работает в бахилах и вывозит весь строительный мусор.' : lang === 'kk' ? 'Инженер бахиламен жұмыс істейді және қоқысты тазалайды.' : 'Engineer works in shoe covers and cleans up.'}</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-8 text-left">
          
          {/* Footer Logo & Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center">
                <Wind className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg text-white">Климат<span className="text-sky-500">Эксперт</span></span>
            </div>
            <p className="text-xs text-slate-550 leading-normal">
              {t.footerBrandDesc}
            </p>
          </div>

          {/* Links Quick */}
          <div>
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-4">{t.footerNavTitle}</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-white transition-colors">{t.navServices}</a></li>
              <li><a href="#calculator" className="hover:text-white transition-colors">{t.navCalc}</a></li>
              <li><a href="#guarantees" className="hover:text-white transition-colors">{t.navGuarantees}</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">{t.navFaq}</a></li>
            </ul>
          </div>

          {/* Legal details / address */}
          <div>
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-4">{t.footerContactsTitle}</h4>
            <ul className="space-y-3 text-xs leading-normal">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-sky-500 shrink-0" />
                <span>{t.footerContactsAddress}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-sky-500 shrink-0" />
                <a href="tel:+77754323561" className="hover:text-white transition-colors">+7 (775) 432-35-61</a>
              </li>
              <li>
                <span className="text-slate-600 block">{t.footerContactsTime}</span>
                <span>{t.footerContactsDays}</span>
              </li>
            </ul>
          </div>

          {/* CASPIAN / ALMACOM reference block */}
          <div>
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-4">{t.footerDealerTitle}</h4>
            <p className="text-xs text-slate-550 leading-normal">
              {t.footerDealerDesc}
            </p>
            <div className="pt-4 flex items-center space-x-3 text-[10px] text-slate-600 uppercase font-bold">
              <span>almacom</span>
              <span>•</span>
              <span>aux</span>
              <span>•</span>
              <span>midea</span>
            </div>
          </div>

        </div>

        {/* Official Legal Requisites Box */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-white/5">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 grid md:grid-cols-3 gap-6 text-xs text-slate-400">
            <div>
              <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">{t.legalExec}</span>
              <p className="font-bold text-white text-sm">ИП КЛИМАТ ТЕХ</p>
              <p className="mt-2 text-slate-500">{t.legalBIN} 530627401271</p>
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">{t.legalAddress}</span>
              <p className="leading-relaxed">{t.legalAddressDetails}</p>
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">{t.legalBank}</span>
              <p className="font-semibold text-slate-300">{t.legalAcc} KZ18722S000025707913</p>
              <p className="mt-1 text-slate-500">{t.legalBik} CASPKZKA | {t.legalKbe} 19</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-4">
          <p>{t.copyright.replace('{year}', new Date().getFullYear())}</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-slate-400">{t.privacy}</a>
            <a href="#" className="hover:text-slate-400">{t.offer}</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
