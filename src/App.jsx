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
  Monitor,
  ArrowLeft
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
    navCalc: 'Калькулятор',
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

  // Theme Dropdown Menu State
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  // Privacy Policy Page View State
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

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
  const [showScrollTop, setShowScrollTop] = useState(false);

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

          if (window.scrollY > 400) {
            setShowScrollTop(true);
          } else {
            setShowScrollTop(false);
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

  if (showPrivacyPolicy) {
    return (
      <PrivacyPolicyPage onClose={() => { setShowPrivacyPolicy(false); window.scrollTo({top: 0}); }} lang={lang} />
    );
  }

  return (
    <div 
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="bg-white dark:bg-[#080c14] min-h-screen text-slate-800 dark:text-slate-200 font-sans antialiased bg-grid-pattern relative w-full transition-colors duration-300"
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
            <div className="flex flex-col justify-center">
              <span className="font-extrabold text-[22px] tracking-normal text-slate-900 dark:text-white leading-tight block">
                Климат<span className="text-sky-600">Эксперт</span>
              </span>
              <p className="text-[9.5px] text-slate-400 dark:text-slate-500 tracking-[0.11em] uppercase font-bold leading-none mt-0.5">
                Профессиональный сервис
              </p>
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
                className="bg-slate-100 dark:bg-slate-800/80 border border-slate-200/40 dark:border-slate-700/40 px-2.5 py-1.5 rounded-xl flex items-center space-x-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-sky-500/40 dark:hover:border-sky-500/40 transition-all cursor-pointer shadow-xs active:scale-98"
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
                    <span>RU</span>
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
                    <span>KZ</span>
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
                    <span>ENG</span>
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
                  <div className="absolute right-0 mt-2 w-28 bg-white/95 dark:bg-[#0f1624]/95 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 rounded-2xl shadow-xl z-20 py-1.5 overflow-hidden text-left transition-all">
                    {[
                      { id: 'ru', label: 'RU', flag: (
                        <svg className="w-4 h-4 rounded-full overflow-hidden shadow-xs" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 8h24V0H0v8z" fill="#fff" />
                          <path d="M0 16h24V8H0v8z" fill="#0039a6" />
                          <path d="M0 24h24v-8H0v8z" fill="#d52b1e" />
                        </svg>
                      )},
                      { id: 'kk', label: 'KZ', flag: (
                        <svg className="w-4 h-4 rounded-full overflow-hidden shadow-xs" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="24" height="24" fill="#00b2e3" />
                          <circle cx="12" cy="12" r="3.5" fill="#fcd116" />
                          <path d="M12 7.5v9M7.5 12h9M8.8 8.8l6.4 6.4M8.8 15.2l6.4-6.4" stroke="#fcd116" strokeWidth="0.8" />
                          <path d="M2.5 3v18M1.5 5c1 0 1 1 2 1M1.5 9c1 0 1 1 2 1M1.5 13c1 0 1 1 2 1M1.5 17c1 0 1 1 2 1" stroke="#fcd116" strokeWidth="0.8" strokeLinecap="round" />
                        </svg>
                      )},
                      { id: 'en', label: 'ENG', flag: (
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
                        className={`w-full px-3 py-2 flex items-center justify-between text-xs transition-colors cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/80 ${
                          lang === item.id 
                            ? 'font-bold text-sky-600 dark:text-sky-400 bg-sky-500/5 dark:bg-sky-500/10' 
                            : 'text-slate-650 dark:text-slate-350 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
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

            {/* Luxury Theme Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                className="bg-slate-100 dark:bg-slate-800/80 border border-slate-200/40 dark:border-slate-700/40 px-2.5 py-1.5 rounded-xl flex items-center space-x-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-sky-500/40 dark:hover:border-sky-500/40 transition-all cursor-pointer shadow-xs active:scale-98"
                title="Theme Settings"
              >
                {theme === 'light' && <Sun className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />}
                {theme === 'dark' && <Moon className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />}
                {theme === 'system' && <Monitor className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />}
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${themeDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {themeDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-15" 
                    onClick={() => setThemeDropdownOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-44 bg-white/95 dark:bg-[#0f1624]/95 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 rounded-2xl shadow-xl z-20 py-1.5 overflow-hidden text-left transition-all">
                    {[
                      { id: 'light', label: t.themeLight, icon: Sun },
                      { id: 'dark', label: t.themeDark, icon: Moon },
                      { id: 'system', label: t.themeSystem, icon: Monitor }
                    ].map(item => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setTheme(item.id);
                            setThemeDropdownOpen(false);
                          }}
                          className={`w-full px-3 py-2.5 flex items-center justify-between text-xs transition-colors cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/80 ${
                            theme === item.id 
                              ? 'font-bold text-sky-600 dark:text-sky-400 bg-sky-500/5 dark:bg-sky-500/10' 
                              : 'text-slate-650 dark:text-slate-350 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <Icon className="w-3.5 h-3.5 shrink-0" />
                            <span>{item.label}</span>
                          </div>
                          {theme === item.id && <Check className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
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
                    { id: 'kk', label: 'KZ', flag: (
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
      <div className="bg-amber-500 dark:bg-amber-950/40 border-b border-slate-950 dark:border-slate-800 py-3 font-mono text-slate-950 dark:text-amber-250 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2.5">
            <span className="w-2.5 h-2.5 bg-red-600 dark:bg-red-500 rounded-none inline-block animate-ping shrink-0"></span>
            <span className="font-bold tracking-tight uppercase">
              [SYSTEM.WARN] {t.urgencyText}
            </span>
          </div>
          <div className="flex items-center space-x-4 shrink-0">
            <span className="bg-slate-950 text-white dark:bg-amber-500 dark:text-slate-950 px-2 py-0.5 font-bold uppercase text-[10px]">
              {t.slotsText.replace('{slotsLeft}', slotsLeft)}
            </span>
            <a 
              href="#booking-section" 
              className="font-bold underline hover:text-slate-800 dark:hover:text-amber-400 uppercase tracking-wider"
            >
              {t.reserveSlot}
            </a>
          </div>
        </div>
      </div>

      {/* HERO SECTION (/01__HERO_INTERFACE) */}
      <section className="relative pt-6 pb-16 md:py-20 border-b border-slate-950 dark:border-slate-800">
        {/* Section Identifier Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="border border-slate-950 dark:border-slate-800 px-4 py-2 flex items-center justify-between font-mono text-[10px] text-slate-550 dark:text-slate-400">
            <div className="flex items-center space-x-2">
              <span className="text-premium font-black">/01__HERO_INTERFACE</span>
              <span>•</span>
              <span>NODE: ATY_CLIMAT_01</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>LAT: 47.1168° N</span>
              <span>LON: 51.8804° E</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-8 text-left z-10">
              <div className="space-y-6">
                {/* Trust Badge */}
                <div className="inline-flex items-center space-x-2 bg-premium/10 text-premium border border-premium px-3.5 py-1.5 rounded-none font-mono">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider">{t.trustTitle}</span>
                </div>
                
                {/* Brutalist Heading */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 dark:text-white leading-none tracking-tighter uppercase font-mono">
                  {t.heroTitlePart1}
                  <span className="text-premium block my-1">
                    // {t.heroTitlePart2}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 text-3xl sm:text-4xl lg:text-5xl block font-bold tracking-tight lowercase">
                    {t.heroTitlePart3}
                  </span>
                </h1>
                
                {/* Subtitle */}
                <p className="text-sm sm:text-base text-slate-655 dark:text-slate-400 leading-relaxed font-sans max-w-xl border-l-2 border-slate-950 dark:border-slate-800 pl-4 py-1">
                  {t.heroSubtitle}
                </p>
              </div>

              {/* Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 max-w-md sm:max-w-none pt-4">
                <button 
                  onClick={() => handleWhatsAppClick(lang === 'ru' ? 'Здравствуйте! Хочу рассчитать стоимость работ.' : lang === 'kk' ? 'Сәлеметсіз бе! Жұмыс құнын есептегім келеді.' : 'Hello! I want to calculate the cost of works.')}
                  className="inline-flex items-center justify-center bg-premium text-white font-mono font-black text-xs py-4 px-8 rounded-none border-2 border-premium hover:bg-transparent hover:text-premium transition-all active:translate-x-1 active:translate-y-1 cursor-pointer gap-2 uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)]"
                >
                  {t.heroCtaWhatsApp}
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a 
                  href="#booking-section"
                  className="inline-flex items-center justify-center bg-slate-950 dark:bg-white dark:text-slate-950 hover:bg-transparent hover:text-slate-950 dark:hover:text-white border-2 border-slate-950 dark:border-white text-white font-mono font-black text-xs py-4 px-8 rounded-none transition-all active:translate-x-1 active:translate-y-1 cursor-pointer text-center uppercase tracking-widest"
                >
                  {t.heroCtaSlot}
                </a>
              </div>

              {/* Instant Mini Trust Factors Grid */}
              <div className="grid grid-cols-3 gap-2 pt-6 border-t border-slate-950 dark:border-slate-800 font-mono">
                <div className="border border-slate-950 dark:border-slate-800 p-3">
                  <h4 className="text-slate-950 dark:text-white font-black text-base uppercase">// {t.miniStat1Title}</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-[10px] uppercase mt-1 leading-normal">{t.miniStat1Desc}</p>
                </div>
                <div className="border border-slate-950 dark:border-slate-800 p-3">
                  <h4 className="text-slate-950 dark:text-white font-black text-base uppercase">// {t.miniStat2Title}</h4>
                  <p className="text-slate-505 dark:text-slate-450 text-[10px] uppercase mt-1 leading-normal">{t.miniStat2Desc}</p>
                </div>
                <div className="border border-slate-950 dark:border-slate-800 p-3">
                  <h4 className="text-slate-950 dark:text-white font-black text-base uppercase">// {t.miniStat3Title}</h4>
                  <p className="text-slate-505 dark:text-slate-450 text-[10px] uppercase mt-1 leading-normal">{t.miniStat3Desc}</p>
                </div>
              </div>

            </div>

            {/* Right Interactive Card / Technical Console */}
            <div className="lg:col-span-5 relative z-10 flex">
              <div className="w-full bg-slate-950 dark:bg-[#070b12] border-2 border-slate-950 dark:border-slate-800 p-6 flex flex-col justify-between space-y-6 relative text-white font-mono text-left">
                {/* Tech grid aesthetic line elements */}
                <div className="absolute top-0 bottom-0 left-[20px] border-l border-slate-900 pointer-events-none"></div>
                <div className="absolute left-0 right-0 top-[20px] border-t border-slate-900 pointer-events-none"></div>
                
                {/* Blueprint Header */}
                <div className="relative z-10 pl-6 pt-6 flex justify-between items-start border-b border-slate-900 pb-4">
                  <div>
                    <span className="text-[9px] text-premium uppercase tracking-widest font-black">SYS.TELEMETRY</span>
                    <h3 className="font-extrabold text-white text-sm uppercase tracking-tight">{t.quickBookingTitle}</h3>
                    <p className="text-[10px] text-slate-505 uppercase mt-0.5">{t.quickBookingSub}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-emerald-500 uppercase tracking-widest block font-black">● LIVE</span>
                    <span className="text-[10px] text-slate-400 font-extrabold">LOC: ATYRAU</span>
                  </div>
                </div>

                {/* Animated AC Blueprint graphic */}
                <div className="relative z-10 pl-6 h-36 flex items-center justify-center bg-slate-900/40 border border-slate-900 py-3">
                  <svg className="w-full h-full max-w-[280px]" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Grid background lines */}
                    <line x1="0" y1="10" x2="100" y2="10" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2 2" />
                    <line x1="0" y1="25" x2="100" y2="25" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2 2" />
                    <line x1="0" y1="40" x2="100" y2="40" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2 2" />
                    <line x1="25" y1="0" x2="25" y2="50" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2 2" />
                    <line x1="50" y1="0" x2="50" y2="50" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2 2" />
                    <line x1="75" y1="0" x2="75" y2="50" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2 2" />
                    
                    {/* AC Indoor Unit Box */}
                    <rect x="20" y="12" width="60" height="18" stroke="#7c3bed" strokeWidth="1.5" fill="#0b1329" />
                    <line x1="25" y1="27" x2="75" y2="27" stroke="#38bdf8" strokeWidth="1" />
                    <rect x="25" y="16" width="10" height="6" stroke="#334155" strokeWidth="1" />
                    
                    {/* Animated air flow waves */}
                    <path d="M 30,34 Q 35,42 30,46" stroke="#38bdf8" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 2" className="animate-pulse" />
                    <path d="M 50,34 Q 55,42 50,46" stroke="#38bdf8" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 2" className="animate-pulse delay-75" />
                    <path d="M 70,34 Q 75,42 70,46" stroke="#38bdf8" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 2" className="animate-pulse delay-150" />
                    
                    {/* Technical text label inside SVG */}
                    <text x="38" y="21" fill="#38bdf8" fontSize="4" fontFamily="monospace" fontWeight="bold">AIR_FLOW_SYS</text>
                  </svg>
                  
                  {/* Status Overlay */}
                  <div className="absolute top-2 left-8 bg-slate-950/80 px-2 py-0.5 border border-slate-800 text-[8px] text-slate-400">
                    STATUS: OK_FLOW
                  </div>
                  <div className="absolute bottom-2 right-2 bg-slate-950/80 px-2 py-0.5 border border-slate-800 text-[8px] text-premium font-bold">
                    X:47.1168 | Y:51.8804
                  </div>
                </div>

                {/* Console Log Lines */}
                <div className="relative z-10 pl-6 space-y-2.5 text-[10px] text-slate-400">
                  <div className="flex items-start space-x-2">
                    <span className="text-premium font-black">LOG://</span>
                    <p className="text-slate-350">{t.quickBookingBullet1}</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-premium font-black">LOG://</span>
                    <p className="text-slate-350">{t.quickBookingBullet2}</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-premium font-black">LOG://</span>
                    <p className="text-slate-350">{t.quickBookingBullet3}</p>
                  </div>
                </div>

                {/* Urgency Alert Block */}
                <div className="relative z-10 pl-6 border border-slate-900 p-3 bg-slate-900/30 flex items-start space-x-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[10px] font-black text-amber-500 uppercase">{t.objectionBoxTitle}</h4>
                    <p className="text-[9px] text-slate-400 mt-1 leading-normal">{t.objectionBoxDesc}</p>
                  </div>
                </div>

                <a 
                  href="#calculator"
                  className="relative z-10 ml-6 bg-premium text-white hover:bg-white hover:text-slate-950 text-center font-bold py-3.5 px-6 rounded-none transition-all text-xs cursor-pointer uppercase tracking-widest"
                >
                  {t.toCalculatorBtn}
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CORE TRUST STATS SECTION (/02__CORE_METRICS) */}
      <section className="bg-slate-50 dark:bg-[#070a10] border-b border-slate-950 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0">
          
          {/* Header identifier */}
          <div className="border-x border-slate-950 dark:border-slate-800 px-4 py-2 flex items-center justify-between font-mono text-[9px] text-slate-500 dark:text-slate-400 border-b border-slate-950 dark:border-slate-800">
            <span className="text-premium font-black">/02__CORE_METRICS</span>
            <span className="uppercase">STATUS: VERIFIED</span>
          </div>

          <div className="grid md:grid-cols-3 border-x border-slate-950 dark:border-slate-800">
            
            {/* Stat 1 */}
            <div className="p-8 border-b md:border-b-0 md:border-r border-slate-950 dark:border-slate-800 text-left font-mono flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 border border-slate-950 dark:border-slate-800 flex items-center justify-center text-premium bg-premium/5">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-black text-slate-950 dark:text-white text-2xl tracking-tighter uppercase leading-none">
                  <AnimatedCounter target={8} suffix="+" /> {lang === 'ru' ? 'лет на рынке' : lang === 'kk' ? 'жыл нарықта' : 'Years Active'}
                </h3>
                <p className="text-slate-550 dark:text-slate-400 font-sans text-xs leading-relaxed">
                  {t.stat1Desc}
                </p>
              </div>
              <div className="pt-6 text-[9px] text-slate-400 uppercase tracking-widest font-black">
                [METRIC.01 // EXPERIENCE]
              </div>
            </div>

            {/* Stat 2 */}
            <div className="p-8 border-b md:border-b-0 md:border-r border-slate-950 dark:border-slate-800 text-left font-mono flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 border border-slate-950 dark:border-slate-800 flex items-center justify-center text-premium bg-premium/5">
                  <Wrench className="w-5 h-5" />
                </div>
                <h3 className="font-black text-slate-950 dark:text-white text-2xl tracking-tighter uppercase leading-none">
                  <AnimatedCounter target={100} suffix="%" /> {lang === 'ru' ? 'деталей с собой' : lang === 'kk' ? 'бөлшектер дайын' : 'Parts on Board'}
                </h3>
                <p className="text-slate-550 dark:text-slate-400 font-sans text-xs leading-relaxed">
                  {t.stat2Desc}
                </p>
              </div>
              <div className="pt-6 text-[9px] text-slate-400 uppercase tracking-widest font-black">
                [METRIC.02 // AVAILABILITY]
              </div>
            </div>

            {/* Stat 3 */}
            <div className="p-8 text-left font-mono flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 border border-slate-950 dark:border-slate-800 flex items-center justify-center text-premium bg-premium/5">
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="w-5 h-5"
                  >
                    <path d="M6 6h12" />
                    <path d="M6 10h12" />
                    <path d="M12 10v10" />
                  </svg>
                </div>
                <h3 className="font-black text-slate-950 dark:text-white text-2xl tracking-tighter uppercase leading-none">
                  <AnimatedCounter target={0} suffix=" ₸" /> {lang === 'ru' ? 'выезд и диаг.' : lang === 'kk' ? 'келу және диаг.' : 'Diagnosis fee'}
                </h3>
                <p className="text-slate-550 dark:text-slate-400 font-sans text-xs leading-relaxed">
                  {t.stat3Desc}
                </p>
              </div>
              <div className="pt-6 text-[9px] text-slate-400 uppercase tracking-widest font-black">
                [METRIC.03 // TRANSPARENCY]
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* INTERACTIVE PRICE CALCULATOR WIDGET */}
      <section id="calculator" className="py-16 border-b border-slate-950 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header identifier */}
          <div className="border border-slate-950 dark:border-slate-800 px-4 py-2 flex items-center justify-between font-mono text-[9px] text-slate-500 dark:text-slate-400 mb-8">
            <div className="flex items-center space-x-2">
              <span className="text-premium font-black">/02.5__CALCULATOR_TERMINAL</span>
              <span>•</span>
              <span>CALC_SYS_v2.1</span>
            </div>
            <span>[ONLINE]</span>
          </div>

          <div className="text-left space-y-4 mb-12 font-mono">
            <h2 className="text-3xl font-black text-slate-950 dark:text-white tracking-tighter uppercase">
              // {t.calcTitle}
            </h2>
            <p className="text-slate-505 dark:text-slate-400 text-xs font-sans max-w-xl border-l border-slate-950 dark:border-slate-800 pl-3">
              {t.calcSub}
            </p>
          </div>

          <div className="bg-white dark:bg-[#070b12] border-2 border-slate-950 dark:border-slate-800 grid md:grid-cols-12 transition-colors duration-300 font-mono text-left">
            
            {/* Calc Controls */}
            <div className="md:col-span-7 p-6 sm:p-8 space-y-6 border-b md:border-b-0 md:border-r border-slate-950 dark:border-slate-800">
              
              {/* Step 1 */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">[ {t.calcStep1} ]</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'clean', label: t.calcClean },
                    { id: 'repair', label: t.calcRepair },
                    { id: 'install', label: t.calcInstall }
                  ].map(service => (
                    <button
                      key={service.id}
                      onClick={() => setCalcService(service.id)}
                      className={`py-2.5 px-2 text-xs font-black rounded-none border-2 transition-all cursor-pointer text-center uppercase tracking-wide ${
                        calcService === service.id 
                          ? 'bg-slate-955 dark:bg-white text-white dark:text-slate-955 border-slate-955 dark:border-white shadow-[2px_2px_0px_0px_rgba(124,61,237,1)]'
                          : 'bg-transparent border-slate-205 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-955 dark:hover:border-slate-350'
                      }`}
                    >
                      {service.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2 */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">[ {t.calcStep2} ]</label>
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
                      className={`p-3 rounded-none border-2 transition-all cursor-pointer flex flex-col items-center justify-center text-center uppercase ${
                        calcArea === area.id 
                          ? 'bg-slate-955 dark:bg-white text-white dark:text-slate-955 border-slate-955 dark:border-white shadow-[2px_2px_0px_0px_rgba(124,61,237,1)]'
                          : 'bg-transparent border-slate-205 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-955 dark:hover:border-slate-350'
                      }`}
                    >
                      <span className="text-xs font-black">{area.label}</span>
                      <span className={`text-[8px] font-bold mt-1 ${calcArea === area.id ? 'text-premium' : 'text-slate-400 dark:text-slate-500'}`}>{area.btu}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2.5 (Only for Installation) */}
              {calcService === 'install' && (
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">[ {t.calcStep2_5} ]</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: '1', label: t.calcFloor1, note: t.calcFloor1Note },
                      { id: '2+', label: t.calcFloor2Plus, note: t.calcFloor2PlusNote }
                    ].map(floor => (
                      <button
                        key={floor.id}
                        type="button"
                        onClick={() => setCalcFloor(floor.id)}
                        className={`p-3 rounded-none border-2 transition-all cursor-pointer flex flex-col items-center justify-center text-center uppercase ${
                          calcFloor === floor.id 
                            ? 'bg-slate-955 dark:bg-white text-white dark:text-slate-955 border-slate-955 dark:border-white shadow-[2px_2px_0px_0px_rgba(124,61,237,1)]'
                            : 'bg-transparent border-slate-205 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-955 dark:hover:border-slate-350'
                        }`}
                      >
                        <span className="text-xs font-black">{floor.label}</span>
                        <span className={`text-[8px] font-bold mt-1 ${calcFloor === floor.id ? 'text-premium' : 'text-slate-405 dark:text-slate-500'}`}>{floor.note}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3 */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">
                  [ {calcService === 'repair' ? t.calcStep3_Repair : t.calcStep3_Default} ]
                </label>
                <div className="space-y-2">
                  
                  {/* Dynamic Repair Options */}
                  {calcService === 'repair' ? (
                    <>
                      {/* Capacitor */}
                      <label className="flex items-center justify-between p-3.5 border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-[#0c121d] transition-all cursor-pointer">
                        <div className="flex items-center space-x-3.5">
                          <input 
                            type="checkbox" 
                            checked={repairCapacitor}
                            onChange={(e) => setRepairCapacitor(e.target.checked)}
                            className="w-4 h-4 text-premium border-slate-300 rounded-none cursor-pointer focus:ring-0"
                          />
                          <div>
                            <span className="text-xs font-black text-slate-900 dark:text-slate-200 block uppercase tracking-wide">{t.calcOptCapacitor}</span>
                            <span className="text-[9px] text-slate-500 dark:text-slate-400">{t.calcOptCapacitorNote}</span>
                          </div>
                        </div>
                      </label>

                      {/* Relay */}
                      <label className="flex items-center justify-between p-3.5 border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-[#0c121d] transition-all cursor-pointer">
                        <div className="flex items-center space-x-3.5">
                          <input 
                            type="checkbox" 
                            checked={repairRelay}
                            onChange={(e) => setRepairRelay(e.target.checked)}
                            className="w-4 h-4 text-premium border-slate-300 rounded-none cursor-pointer focus:ring-0"
                          />
                          <div>
                            <span className="text-xs font-black text-slate-900 dark:text-slate-200 block uppercase tracking-wide">{t.calcOptRelay}</span>
                            <span className="text-[9px] text-slate-500 dark:text-slate-400">{t.calcOptRelayNote}</span>
                          </div>
                        </div>
                      </label>

                      {/* Board */}
                      <label className="flex items-center justify-between p-3.5 border border-slate-200/80 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-[#0c121d] transition-all cursor-pointer">
                        <div className="flex items-center space-x-3.5">
                          <input 
                            type="checkbox" 
                            checked={repairBoard}
                            onChange={(e) => setRepairBoard(e.target.checked)}
                            className="w-4 h-4 text-premium border-slate-300 rounded-none cursor-pointer focus:ring-0"
                          />
                          <div>
                            <span className="text-xs font-black text-slate-900 dark:text-slate-200 block uppercase tracking-wide">{t.calcOptBoard}</span>
                            <span className="text-[9px] text-slate-500 dark:text-slate-400">{t.calcOptBoardNote}</span>
                          </div>
                        </div>
                      </label>
                    </>
                  ) : (
                    /* Default options (Clean/Install) */
                    <label className="flex items-center justify-between p-3.5 border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-[#0c121d] transition-all cursor-pointer">
                      <div className="flex items-center space-x-3.5">
                        <input 
                          type="checkbox" 
                          checked={extraAntibacterial}
                          onChange={(e) => setExtraAntibacterial(e.target.checked)}
                          className="w-4 h-4 text-premium border-slate-300 rounded-none cursor-pointer focus:ring-0"
                        />
                        <div>
                          <span className="text-xs font-black text-slate-900 dark:text-slate-200 block uppercase tracking-wide">
                            {calcService === 'clean' ? t.calcOptCleanChem : t.calcOptAntibac}
                          </span>
                          <span className="text-[9px] text-slate-500 dark:text-slate-400">
                            {calcService === 'clean' ? t.calcOptCleanChemNote : t.calcOptAntibacNote}
                          </span>
                        </div>
                      </div>
                    </label>
                  )}

                  {/* Freon */}
                  <label className="flex items-center justify-between p-3.5 border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-[#0c121d] transition-all cursor-pointer">
                    <div className="flex items-center space-x-3.5">
                      <input 
                        type="checkbox" 
                        checked={extraFreon}
                        onChange={(e) => setExtraFreon(e.target.checked)}
                        className="w-4 h-4 text-premium border-slate-300 rounded-none cursor-pointer focus:ring-0"
                      />
                      <div>
                        <span className="text-xs font-black text-slate-900 dark:text-slate-200 block uppercase tracking-wide">
                          {calcService === 'repair' ? t.calcOptFreonRepair : t.calcOptFreonClean}
                        </span>
                        <span className="text-[9px] text-slate-500 dark:text-slate-400">
                          {calcService === 'repair' ? t.calcOptFreonRepairNote : t.calcOptFreonCleanNote}
                        </span>
                      </div>
                    </div>
                  </label>

                  {/* High Work */}
                  <label className="flex items-center justify-between p-3.5 border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-[#0c121d] transition-all cursor-pointer">
                    <div className="flex items-center space-x-3.5">
                      <input 
                        type="checkbox" 
                        checked={extraHighWork}
                        onChange={(e) => setExtraHighWork(e.target.checked)}
                        className="w-4 h-4 text-premium border-slate-300 rounded-none cursor-pointer focus:ring-0"
                      />
                      <div>
                        <span className="text-xs font-black text-slate-900 dark:text-slate-200 block uppercase tracking-wide">{t.calcOptHigh}</span>
                        <span className="text-[9px] text-slate-500 dark:text-slate-400">{t.calcOptHighNote}</span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

            </div>

            {/* Pricing Summary (Printed System Invoice / Receipt) */}
            <div className="md:col-span-5 bg-slate-50 dark:bg-[#0a0f18] p-6 sm:p-8 flex flex-col justify-between relative transition-colors duration-300 border-t md:border-t-0 md:border-l border-slate-950 dark:border-slate-800">
              <div className="space-y-6">
                
                {/* Invoice Header */}
                <div className="text-center border-b border-dashed border-slate-300 dark:border-slate-800 pb-4">
                  <h4 className="text-[11px] font-black text-slate-950 dark:text-white uppercase tracking-widest">{t.summaryTitle}</h4>
                  <p className="text-[8px] text-slate-400 uppercase mt-0.5">CLI_SERVICE_INVOICE</p>
                  <p className="text-[7px] text-slate-500 font-bold mt-1">TIMESTAMP: {sysTime || '00:00:00'} // UTC+5</p>
                </div>

                {/* Receipt Line Items */}
                <div className="space-y-2.5 text-[10px] text-slate-650 dark:text-slate-400">
                  <div className="flex justify-between items-center">
                    <span>{t.summaryBase}</span>
                    <span className="font-extrabold text-slate-950 dark:text-white">
                      {calcService === 'clean' && t.summaryCleanNoChem}
                      {calcService === 'repair' && t.summaryRepairDiag}
                      {calcService === 'install' && (calcFloor === '1' ? t.summaryInstallFloor1 : t.summaryInstallFloor2)}
                    </span>
                  </div>
                  
                  {calcArea !== '20' && (
                    <div className="flex justify-between items-center">
                      <span>{t.summaryAreaCharge}</span>
                      <span className="font-extrabold text-slate-950 dark:text-white">
                        {calcArea === '35' && '+ 3 000 ₸'}
                        {calcArea === '50' && '+ 6 000 ₸'}
                        {calcArea === '50+' && '+ 12 000 ₸'}
                      </span>
                    </div>
                  )}
                  
                  {/* Dynamic Repair Items */}
                  {calcService === 'repair' ? (
                    <>
                      {repairCapacitor && (
                        <div className="flex justify-between items-center">
                          <span>{t.summaryCapacitor}</span>
                          <span className="font-extrabold text-slate-950 dark:text-white">+ 13 005 ₸</span>
                        </div>
                      )}
                      {repairRelay && (
                        <div className="flex justify-between items-center">
                          <span>{t.summaryRelay}</span>
                          <span className="font-extrabold text-slate-950 dark:text-white">+ 10 000 ₸</span>
                        </div>
                      )}
                      {repairBoard && (
                        <div className="flex justify-between items-center">
                          <span>{t.summaryBoard}</span>
                          <span className="font-extrabold text-slate-950 dark:text-white">+ 20 000 ₸</span>
                        </div>
                      )}
                    </>
                  ) : (
                    /* Default options (Clean/Install) */
                    extraAntibacterial && (
                      <div className="flex justify-between items-center">
                        <span>{t.summaryChem}</span>
                        <span className="font-extrabold text-slate-950 dark:text-white">
                          {calcService === 'clean' ? '+ 5 000 ₸' : '+ 4 000 ₸'}
                        </span>
                      </div>
                    )
                  )}

                  {extraFreon && (
                    <div className="flex justify-between items-center">
                      <span>{t.summaryFreon}</span>
                      <span className="font-extrabold text-slate-950 dark:text-white">+ 15 000 ₸</span>
                    </div>
                  )}
                  {extraHighWork && (
                    <div className="flex justify-between items-center">
                      <span>{t.summaryHigh}</span>
                      <span className="font-extrabold text-slate-950 dark:text-white">+ 15 050 ₸</span>
                    </div>
                  )}

                  {/* Dash Divider */}
                  <div className="border-t border-dashed border-slate-300 dark:border-slate-800 my-4 pt-4 flex justify-between items-baseline">
                    <span className="text-slate-950 dark:text-white font-black text-xs uppercase">{t.summaryTotal}</span>
                    <span className="text-2xl font-black text-premium tracking-tighter">
                      {currentPrice.toLocaleString('ru-RU')} ₸
                    </span>
                  </div>
                </div>

                {/* Guarantee Note Box */}
                <div className="border border-slate-950 dark:border-slate-800 p-3 bg-white dark:bg-slate-950 text-[9px] text-slate-500 dark:text-slate-400 space-y-1">
                  <div className="flex items-center space-x-1.5 text-premium font-black">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                    <span>[ {t.summaryTrustTitle} ]</span>
                  </div>
                  <p className="leading-relaxed font-sans">
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
                      className="w-full text-xs bg-white dark:bg-slate-950 border-2 border-slate-950 dark:border-slate-800 text-slate-900 dark:text-white rounded-none px-4 py-3.5 focus:outline-none focus:border-premium font-mono"
                    />
                    <button
                      type="submit"
                      className="w-full bg-premium text-white font-mono font-black py-4 px-6 rounded-none border-2 border-premium hover:bg-transparent hover:text-premium transition-all active:translate-x-1 active:translate-y-1 text-center text-xs uppercase tracking-widest cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.15)]"
                    >
                      {t.summarySubmitBtn} ↗
                    </button>
                  </form>
                ) : (
                  <div className="border-2 border-emerald-500 bg-emerald-500/5 p-4 rounded-none text-center space-y-2 font-mono">
                    <Check className="w-6 h-6 text-emerald-500 mx-auto" />
                    <h5 className="text-xs font-black text-emerald-500 uppercase">{t.summarySuccessTitle}</h5>
                    <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                      {t.summarySuccessDesc}
                    </p>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* DYNAMIC SERVICES SHOWCASE (/03__SELECTED_WORK) */}
      <section id="services" className="py-16 bg-[#f5f5f3] dark:bg-[#06080f] border-b border-slate-950 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header identifier */}
          <div className="border border-slate-950 dark:border-slate-800 px-4 py-2 flex items-center justify-between font-mono text-[9px] text-slate-500 dark:text-slate-400 mb-8">
            <div className="flex items-center space-x-2">
              <span className="text-premium font-black">/03__SELECTED_WORK</span>
              <span>•</span>
              <span>CATALOG_SYS</span>
            </div>
            <span>TOTAL: 03 SERVICES</span>
          </div>

          <div className="text-left space-y-4 mb-12 font-mono">
            <h2 className="text-3xl font-black text-slate-950 dark:text-white tracking-tighter uppercase">
              // {t.serviceTitle}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-sans max-w-xl border-l border-slate-950 dark:border-slate-800 pl-3">
              {t.serviceSub}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 items-stretch">
            {servicesTabs.map((service, index) => (
              <div 
                key={service.id}
                className="bg-white dark:bg-[#070b12] border-2 border-slate-950 dark:border-slate-800 p-6 flex flex-col justify-between text-left font-mono relative"
              >
                {/* Number index indicator */}
                <div className="absolute top-3 right-4 text-[9px] text-slate-450 font-extrabold font-mono">
                  [IDX.0{index + 1}]
                </div>

                <div className="space-y-6">
                  {/* Card Header */}
                  <div className="flex flex-col space-y-1 pb-4 border-b border-slate-205 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{service.duration}</span>
                    <span className="text-2xl font-black text-premium">{service.price}</span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-slate-950 dark:text-white text-lg tracking-tight uppercase leading-tight">{service.title}</h3>
                    <div className="mt-2 text-[8px] bg-slate-950 text-white dark:bg-slate-800 px-2 py-0.5 inline-block font-black tracking-widest uppercase">
                      STATUS: OPERATIONAL
                    </div>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-3 font-sans pt-4 border-t border-slate-100 dark:border-slate-800">
                    {service.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start text-xs text-slate-655 dark:text-slate-400 leading-relaxed">
                        <span className="text-premium font-mono mr-2 mt-0.5 shrink-0">→</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 space-y-4">
                  {/* Results Badge */}
                  <div className="bg-slate-50 dark:bg-slate-950 border border-slate-950 dark:border-slate-800 p-4 rounded-none font-sans">
                    <span className="text-[9px] font-mono font-bold text-premium uppercase tracking-wider block">[EXPECTED_RESULT]</span>
                    <p className="text-xs text-slate-650 dark:text-slate-350 mt-1.5 leading-normal">{service.result}</p>
                  </div>

                  {/* Objection Closure */}
                  <div className="flex items-start space-x-2 text-[10px] text-slate-450 italic font-sans leading-normal">
                    <Info className="w-3.5 h-3.5 text-premium shrink-0 mt-0.5" />
                    <span>{service.objectionClose}</span>
                  </div>

                  <button 
                    onClick={() => handleWhatsAppClick(lang === 'ru' ? `Здравствуйте! Хочу заказать услугу: ${service.title}.` : lang === 'kk' ? `Сәлеметсіз бе! Мен ${service.title} қызметіне тапсырыс бергім келеді.` : `Hello! I would like to order: ${service.title}.`)}
                    className="w-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 hover:bg-premium hover:text-white dark:hover:bg-premium dark:hover:text-white border-2 border-slate-950 dark:border-white font-mono font-black py-3 rounded-none transition-all text-center text-xs uppercase tracking-widest cursor-pointer"
                  >
                    {t.serviceTabOrderBtn} ↗
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

      {/* FINAL HIGH-CONVERTING CAPTURE FORM (/04, /05, /06) */}
      <section id="booking-section" className="py-16 bg-[#f5f5f3] dark:bg-[#06080f] border-b border-slate-950 dark:border-slate-800 text-slate-950 dark:text-white transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header identifier */}
          <div className="border border-slate-950 dark:border-slate-800 px-4 py-2 flex items-center justify-between font-mono text-[9px] text-slate-500 dark:text-slate-400 mb-8">
            <div className="flex items-center space-x-2">
              <span className="text-premium font-black">/04.05.06__TRANSMISSION_NODE</span>
              <span>•</span>
              <span>GATEWAY: CONNECTED</span>
            </div>
            <span>SECURE_NODE</span>
          </div>

          <div className="grid lg:grid-cols-3 border-2 border-slate-950 dark:border-slate-800 text-left font-mono">
            
            {/* Column 04: Booking Info */}
            <div className="p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-slate-950 dark:border-slate-800 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="bg-amber-500 text-slate-950 text-[9px] font-black px-2 py-0.5 uppercase tracking-widest inline-block">
                  /04 [ {t.captureLabel} ]
                </span>
                <h3 className="text-2xl font-black uppercase tracking-tighter leading-none text-slate-950 dark:text-white">
                  {t.captureTitle}
                </h3>
                <p className="text-xs text-slate-650 dark:text-slate-400 font-sans leading-relaxed">
                  {t.captureDesc}
                </p>
              </div>
              <div className="text-[8px] text-slate-500 uppercase tracking-widest font-black pt-4">
                [INPUT_REQUEST_PENDING]
              </div>
            </div>

            {/* Column 05: System Status Telemetry */}
            <div className="p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-slate-950 dark:border-slate-800 space-y-6">
              <span className="bg-slate-950 text-white dark:bg-slate-800 text-[9px] font-black px-2 py-0.5 uppercase tracking-widest inline-block">
                /05 [ STATUS_MONITOR ]
              </span>
              
              <div className="space-y-4 text-xs">
                {/* Meter 1 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-bold text-[10px]">
                    <span className="uppercase">ENGINEERS_AVAILABLE:</span>
                    <span className="text-premium">85%</span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-900 border border-slate-950 dark:border-slate-800 rounded-none overflow-hidden">
                    <div className="h-full bg-premium" style={{ width: '85%' }}></div>
                  </div>
                </div>

                {/* Meter 2 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-bold text-[10px]">
                    <span className="uppercase">ATYRAU_ROAD_LOAD:</span>
                    <span className="text-amber-500">40%</span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-900 border border-slate-950 dark:border-slate-800 rounded-none overflow-hidden">
                    <div className="h-full bg-amber-500" style={{ width: '40%' }}></div>
                  </div>
                </div>

                {/* Meter 3 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-bold text-[10px]">
                    <span className="uppercase">SUCCESS_REPAIR_RATE:</span>
                    <span className="text-emerald-500">98%</span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-900 border border-slate-950 dark:border-slate-800 rounded-none overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: '98%' }}></div>
                  </div>
                </div>
              </div>

              <div className="text-[8px] text-slate-500 uppercase tracking-widest font-black pt-2">
                [LOC_COORDS: Atyrau, KZ]
              </div>
            </div>

            {/* Column 06: Transmission Request Form */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <span className="bg-premium text-white text-[9px] font-black px-2 py-0.5 uppercase tracking-widest inline-block mb-4">
                  /06 [ {lang === 'ru' ? 'ОТПРАВКА ЗАПРОСА' : lang === 'kk' ? 'СҰРАНЫСТЫ ЖІБЕРУ' : 'TRANSMIT REQUEST'} ]
                </span>
                
                {!bookingSuccess ? (
                  <form onSubmit={(e) => submitBooking(e, 'main')} className="space-y-4 text-left">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">{t.capturePlaceholder}</label>
                      <input 
                        type="tel" 
                        placeholder="+7 (775) 432-35-61" 
                        required
                        value={bookingPhone}
                        onChange={(e) => setBookingPhone(e.target.value)}
                        className="w-full text-xs bg-white dark:bg-slate-950 border-2 border-slate-950 dark:border-slate-800 text-slate-900 dark:text-white rounded-none px-4 py-3.5 focus:outline-none focus:border-premium font-mono"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-premium text-white font-mono font-black py-4 px-6 rounded-none border-2 border-premium hover:bg-transparent hover:text-premium transition-all active:translate-x-1 active:translate-y-1 text-center text-xs uppercase tracking-widest cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.15)]"
                    >
                      {t.captureSubmitBtn} ↗
                    </button>
                    
                    <p className="text-[9px] text-slate-500 font-sans leading-normal text-center pt-2">
                      {lang === 'ru' ? (
                        <>
                          Нажимая кнопку, вы соглашаетесь на мгновенную обработку{' '}
                          <button
                            type="button"
                            onClick={() => { setShowPrivacyPolicy(true); window.scrollTo({top: 0}); }}
                            className="underline text-premium hover:text-premium dark:text-premium font-bold cursor-pointer inline bg-transparent border-none p-0"
                          >
                            персональных данных
                          </button>{' '}
                          для связи.
                        </>
                      ) : lang === 'kk' ? (
                        <>
                          Батырманы басу арқылы сіз байланыс үшін{' '}
                          <button
                            type="button"
                            onClick={() => { setShowPrivacyPolicy(true); window.scrollTo({top: 0}); }}
                            className="underline text-premium hover:text-premium dark:text-premium font-bold cursor-pointer inline bg-transparent border-none p-0"
                          >
                            дербес деректерді
                          </button>{' '}
                          дереу өңдеуге келісесіз.
                        </>
                      ) : (
                        <>
                          By clicking the button, you consent to the instant processing of{' '}
                          <button
                            type="button"
                            onClick={() => { setShowPrivacyPolicy(true); window.scrollTo({top: 0}); }}
                            className="underline text-premium hover:text-premium dark:text-premium font-bold cursor-pointer inline bg-transparent border-none p-0"
                          >
                            personal data
                          </button>{' '}
                          for communication.
                        </>
                      )}
                    </p>
                  </form>
                ) : (
                  <div className="border-2 border-emerald-500 bg-emerald-500/5 p-6 rounded-none text-center space-y-3 font-mono">
                    <Check className="w-8 h-8 text-emerald-500 mx-auto" />
                    <h4 className="text-xs font-black text-emerald-500 uppercase">{t.captureSuccessTitle}</h4>
                    <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                      {t.captureSuccessDesc.replace('{phone}', bookingPhone)}
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Core Objections flat grid panel */}
          <div className="grid grid-cols-1 sm:grid-cols-3 border-x border-b border-slate-950 dark:border-slate-800 text-left font-mono">
            <div className="p-6 border-b sm:border-b-0 sm:border-r border-slate-950 dark:border-slate-800 flex items-start space-x-3.5">
              <CheckCircle2 className="w-5 h-5 text-premium shrink-0" />
              <div>
                <h4 className="text-xs font-black uppercase text-slate-950 dark:text-white">{lang === 'ru' ? 'Выезд за 0 ₸' : lang === 'kk' ? 'Келуі 0 ₸' : '0 KZT Visit'}</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-normal font-sans">{lang === 'ru' ? 'При выполнении работ выезд инженера бесплатный.' : lang === 'kk' ? 'Жұмыс жүргізілсе инженердің келуі тегін.' : 'Arrival is free under repair condition.'}</p>
              </div>
            </div>
            <div className="p-6 border-b sm:border-b-0 sm:border-r border-slate-950 dark:border-slate-800 flex items-start space-x-3.5">
              <CheckCircle2 className="w-5 h-5 text-premium shrink-0" />
              <div>
                <h4 className="text-xs font-black uppercase text-slate-950 dark:text-white">{lang === 'ru' ? 'Цена до начала' : lang === 'kk' ? 'Жұмысқа дейінгі баға' : 'Price Lock'}</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-normal font-sans">{lang === 'ru' ? 'Никаких непредвиденных доплат за шланги или срочность.' : lang === 'kk' ? 'Түтік немесе шұғылдық үшін ешқандай үстеме төлемсіз.' : 'No sudden surcharges for lines or urgency.'}</p>
              </div>
            </div>
            <div className="p-6 flex items-start space-x-3.5">
              <CheckCircle2 className="w-5 h-5 text-premium shrink-0" />
              <div>
                <h4 className="text-xs font-black uppercase text-slate-950 dark:text-white">{lang === 'ru' ? 'Бахилы и уборка' : lang === 'kk' ? 'Бахила мен тазалау' : 'Shoe Covers & Clean'}</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-normal font-sans">{lang === 'ru' ? 'Инженер работает в бахилах и вывозит весь строительный мусор.' : lang === 'kk' ? 'Инженер бахиламен жұмыс істейді және қоқысты тазалайды.' : 'Engineer works in shoe covers and cleans up.'}</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER (/07__SYSTEM_LOGS) */}
      <footer className="bg-slate-950 text-slate-400 border-t-2 border-slate-900 py-12 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-8 text-left">
          
          {/* Footer Logo & Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-premium flex items-center justify-center border border-slate-900">
                <Wind className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-white text-base tracking-tighter uppercase">
                CLIMAT_EXPERT_
              </span>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed font-sans">
              {t.footerBrandDesc}
            </p>
          </div>

          {/* Links Quick */}
          <div>
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-4">// {t.footerNavTitle}</h4>
            <ul className="space-y-2.5 text-[11px] uppercase tracking-wide">
              <li><a href="#services" className="hover:text-premium transition-colors">{t.navServices}</a></li>
              <li><a href="#calculator" className="hover:text-premium transition-colors">{t.navCalc}</a></li>
              <li><a href="#guarantees" className="hover:text-premium transition-colors">{t.navGuarantees}</a></li>
              <li><a href="#faq" className="hover:text-premium transition-colors">{t.navFaq}</a></li>
            </ul>
          </div>

          {/* Legal details / address */}
          <div>
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-4">// {t.footerContactsTitle}</h4>
            <ul className="space-y-3.5 text-[11px] leading-relaxed">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-premium shrink-0" />
                <span className="font-sans text-[10px]">{t.footerContactsAddress}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-premium shrink-0" />
                <a href="tel:+77754323561" className="hover:text-premium transition-colors font-bold">+7 (775) 432-35-61</a>
              </li>
              <li className="pt-1.5 border-t border-slate-900">
                <span className="text-slate-600 block text-[9px] uppercase tracking-widest">{t.footerContactsTime}</span>
                <span className="text-[10px] font-bold text-slate-350">{t.footerContactsDays}</span>
              </li>
            </ul>
          </div>

          {/* CASPIAN / ALMACOM reference block */}
          <div className="space-y-4">
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider">// {t.footerDealerTitle}</h4>
            <p className="text-[10px] text-slate-500 leading-relaxed font-sans">
              {t.footerDealerDesc}
            </p>
            <div className="pt-2 flex items-center space-x-3 text-[9px] text-slate-500 font-bold uppercase tracking-widest">
              <span>ALMACOM</span>
              <span>•</span>
              <span>AUX</span>
              <span>•</span>
              <span>MIDEA</span>
              <span>•</span>
              <span>GREE</span>
            </div>
          </div>

        </div>

        {/* Official Legal Requisites Box */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-slate-900">
          <div className="bg-[#070b11] border border-slate-900 p-6 grid md:grid-cols-3 gap-6 text-[10px] text-slate-400">
            <div className="space-y-2">
              <span className="text-[8px] font-black text-premium uppercase tracking-widest block">[ {t.legalExec} ]</span>
              <p className="font-bold text-white text-xs uppercase">IP CLIMAT TECH</p>
              <p className="text-slate-500 font-bold uppercase">{t.legalBIN} 530627401271</p>
            </div>
            <div className="space-y-2">
              <span className="text-[8px] font-black text-premium uppercase tracking-widest block">[ {t.legalAddress} ]</span>
              <p className="leading-relaxed text-slate-300 font-sans">{t.legalAddressDetails}</p>
            </div>
            <div className="space-y-2">
              <span className="text-[8px] font-black text-premium uppercase tracking-widest block">[ {t.legalBank} ]</span>
              <p className="font-bold text-slate-200">ACC: KZ18722S000025707913</p>
              <p className="text-slate-500 font-bold">BIC: CASPKZKA | {t.legalKbe} 19</p>
            </div>
          </div>
        </div>

        {/* Console Logs Footer Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between text-[9px] text-slate-600 gap-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>{t.copyright.replace('{year}', new Date().getFullYear())}</span>
            <span>•</span>
            <span className="text-emerald-500 font-black">● CONNECTION SECURE [SSL_TLS_v1.3]</span>
            <span>•</span>
            <span>NODE: ATY_CLIMAT_01</span>
          </div>
          
          <div className="flex items-center space-x-6 uppercase tracking-wider">
            <button 
              onClick={() => { setShowPrivacyPolicy(true); window.scrollTo({top: 0}); }} 
              className="hover:text-premium cursor-pointer bg-transparent border-none p-0 text-[9px] font-bold font-mono"
            >
              {t.privacy}
            </button>
            <span>/</span>
            <a href="#" className="hover:text-premium text-[9px] font-bold">{t.offer}</a>
          </div>
        </div>
      </footer>

      {/* Floating Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 z-45 p-3 rounded-full bg-slate-900/85 dark:bg-white/95 text-white dark:text-slate-950 border border-slate-200/20 dark:border-white/10 shadow-xl backdrop-blur-md cursor-pointer transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center hover:shadow-sky-500/20 hover:shadow-2xl ${
          showScrollTop 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-16 opacity-0 scale-75 pointer-events-none'
        }`}
        title="Scroll to Top"
      >
        <ChevronUp className="w-5 h-5" />
      </button>

    </div>
  );
}


// Stands for full-page Privacy Policy with premium visual details
function PrivacyPolicyPage({ onClose, lang }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const content = {
    ru: {
      title: 'Политика конфиденциальности',
      company: 'ИП «КЛИМАТ ТЕХ»',
      backBtn: 'Назад на главную',
      intro: 'Настоящая Политика конфиденциальности определяет порядок сбора, обработки, хранения и защиты персональных данных пользователей на сайте klimat-expert.kz в соответствии с Законом Республики Казахстан от 21 мая 2013 года № 94-V «О персональных данных и их защите».',
      sections: [
        {
          title: '1. Общие положения',
          paragraphs: [
            'Использование сайта означает безоговорочное согласие пользователя с настоящей Политикой и указанными в ней условиями обработки его персональной информации.',
            'В случае несогласия с условиями Политики пользователь должен воздержаться от использования форм на сайте.',
            'Настоящая Политика применяется только к сайту klimat-expert.kz. Мы не контролируем и не несем ответственность за сайты третьих лиц, на которые пользователь может перейти по ссылкам, доступным на нашем сайте.'
          ]
        },
        {
          title: '2. Состав собираемых персональных данных',
          paragraphs: [
            'Мы собираем только те персональные данные, которые необходимы для связи с вами и предоставления услуг расчета стоимости или выезда специалиста.',
            'К собираемым персональным данным относятся: ваше имя и контактный номер телефона.'
          ]
        },
        {
          title: '3. Цели сбора и обработки персональных данных',
          paragraphs: [
            'Сбор и обработка персональных данных осуществляются в целях:',
            '— Предоставления вам результатов расчета стоимости ремонта или установки кондиционера;',
            '— Связи с вами для подтверждения заявки, уточнения времени визита мастера и адреса проведения работ;',
            '— Консультирования по услугам климатического сервиса.'
          ]
        },
        {
          title: '4. Условия обработки и непередачи третьим лицам',
          paragraphs: [
            'В отношении персональной информации пользователя сохраняется ее полная конфиденциальность.',
            'Мы гарантируем, что ваши персональные данные не будут переданы, проданы или предоставлены третьим лицам без вашего предварительного согласия, за исключением случаев, предусмотренных действующим законодательством Республики Казахстан.'
          ]
        },
        {
          title: '5. Права пользователя',
          paragraphs: [
            'Вы имеете право в любой момент запросить информацию о том, какие ваши данные хранятся у нас, а также потребовать их изменения, обновления или полного удаления.',
            'Для этого вы можете связаться с нами по официальному телефону, указанному в разделе реквизитов.'
          ]
        },
        {
          title: '6. Реквизиты оператора персональных данных',
          paragraphs: [
            'Индивидуальный предприниматель «КЛИМАТ ТЕХ»',
            'Адрес: Республика Казахстан, г. Атырау',
            'ИИК: KZ18722S000025707913 в АО "Kaspi Bank"',
            'БИК: CASPKZKA | Кбе: 19',
            'Телефон для связи: +7 (775) 432-35-61'
          ]
        }
      ]
    },
    kk: {
      title: 'Құпиялылық саясаты',
      company: '«КЛИМАТ ТЕХ» ЖК',
      backBtn: 'Басты бетке оралу',
      intro: 'Осы Құпиялылық саясаты «Дербес деректер және оларды қорғау туралы» Қазақстан Республикасының 2013 жылғы 21 мамырдағы № 94-V Заңына сәйкес Климат Эксперт сайтындағы пайдаланушылардың дербес деректерін жинау, өңдеу, сақтау және қорғау тәртібін айқындайды.',
      sections: [
        {
          title: '1. Жалпы ережелер',
          paragraphs: [
            'Сайтты пайдалану пайдаланушының осы Саясатпен және онда көрсетілген оның дербес деректерін өңдеу шарттарымен сөзсіз келісімін білдіреді.',
            'Саясат шарттарымен келіспеген жағдайда пайдаланушы сайттағы формаларды пайдаланудан бас тартуы керек.',
            'Осы Саясат тек klimat-expert.kz сайтына қолданылады. Пайдаланушы біздің сайтта қолжетімді сілтемелер арқылы өте алатын үшінші тұлғалардың сайттарын бақыламаймыз және олар үшін жауапты болмаймыз.'
          ]
        },
        {
          title: '2. Жиналатын дербес деректердің құрамы',
          paragraphs: [
            'Біз тек сізбен байланысу және бағаны есептеу немесе маманның келу қызметтерін көрсету үшін қажетті дербес деректерді ғана жинаймыз.',
            'Жиналатын дербес деректерге мыналар жатады: сіздің атыңыз және байланыс телефоныңыз.'
          ]
        },
        {
          title: '3. Дербес деректерді жинау және өңдеу мақсаттары',
          paragraphs: [
            'Дербес деректерді жинау және өңдеу келесі мақсаттарда жүзеге асырылады:',
            '— Сізге кондиционерді жөндеу немесе орнату құнын есептеу нәтижелерін ұсыну;',
            '— Өтінімді растау, шебердің келу уақыты мен жұмыс жүргізілетін мекенжайды нақтылау үшін сізбен байланысу;',
            '— Климаттық қызмет көрсету бойынша кеңес беру.'
          ]
        },
        {
          title: '4. Өңдеу және үшінші тұлғаларға бермеу шарттары',
          paragraphs: [
            'Пайдаланушының дербес ақпаратына қатысты оның толық құпиялылығы сақталады.',
            'Біз сіздің дербес деректеріңізді Қазақстан Республикасының қолданыстағы заңнамасында көзделген жағдайларды қоспағанда, сіздің алдын ала келісіміңізсіз үшінші тұлғаларға берілмейтініне, сатылмайтынына немесе ұсынылмайтынына кепілдік береміз.'
          ]
        },
        {
          title: '5. Пайдаланушының құқықтары',
          paragraphs: [
            'Сіз кез келген уақытта бізде қандай деректеріңіз сақталып жатқаны туралы ақпаратты сұратуға, сондай-ақ оларды өзгертуді, жаңартуды немесе толық жоюды талап етуге құқылысыз.',
            'Ол үшін деректемелер бөлімінде көрсетілген ресми телефон арқылы бізге хабарласа аласыз.'
          ]
        },
        {
          title: '6. Дербес деректер операторының деректемелері',
          paragraphs: [
            '«КЛИМАТ ТЕХ» жеке кәсіпкерлігі',
            'Мекенжайы: Қазақстан Республикасы, Атырау қ.',
            'ЖЖК: Kaspi Bank АҚ-дағы KZ18722S000025707913',
            'БИК: CASPKZKA | Кбе: 19',
            'Байланыс телефоны: +7 (775) 432-35-61'
          ]
        }
      ]
    },
    en: {
      title: 'Privacy Policy',
      company: 'IP "CLIMAT TECH"',
      backBtn: 'Back to Main Page',
      intro: 'This Privacy Policy determines the procedure for collecting, processing, storing, and protecting personal data of users on the klimat-expert.kz website in accordance with the Law of the Republic of Kazakhstan dated May 21, 2013 No. 94-V "On Personal Data and Their Protection".',
      sections: [
        {
          title: '1. General Provisions',
          paragraphs: [
            'Use of the website implies unconditional consent of the user to this Policy and the conditions of processing their personal information specified herein.',
            'In case of disagreement with the terms of the Policy, the user must refrain from using the forms on the website.',
            'This Policy applies only to the klimat-expert.kz website. We do not control and are not responsible for third-party websites to which the user may navigate via links available on our website.'
          ]
        },
        {
          title: '2. Scope of Collected Personal Data',
          paragraphs: [
            'We collect only those personal data that are necessary to communicate with you and provide services for price calculation or a specialist visit.',
            'The collected personal data include: your name and contact phone number.'
          ]
        },
        {
          title: '3. Purposes of Collecting and Processing Personal Data',
          paragraphs: [
            'The collection and processing of personal data are carried out for the following purposes:',
            '— Providing you with the results of the AC repair or installation cost calculation;',
            '— Contacting you to confirm the request, specify the master\'s visit time, and the address of the work;',
            '— Consulting on climate services.'
          ]
        },
        {
          title: '4. Conditions of Processing and Non-Disclosure to Third Parties',
          paragraphs: [
            'The complete confidentiality of the user\'s personal information is maintained.',
            'We guarantee that your personal data will not be transferred, sold, or shared with third parties without your prior consent, except as provided by the applicable legislation of the Republic of Kazakhstan.'
          ]
        },
        {
          title: '5. User Rights',
          paragraphs: [
            'You have the right at any time to request information about what data we store, as well as demand its modification, updating, or complete deletion.',
            'To do this, you can contact us using the official phone number provided in the company details section.'
          ]
        },
        {
          title: '6. Company Details',
          paragraphs: [
            'Individual Entrepreneur "CLIMAT TECH"',
            'Address: Atyrau, Republic of Kazakhstan',
            'Current Account: KZ18722S000025707913 in JSC "Kaspi Bank"',
            'BIK: CASPKZKA | Kbe: 19',
            'Contact Phone: +7 (775) 432-35-61'
          ]
        }
      ]
    }
  };

  const t = content[lang] || content.ru;

  return (
    <div className="bg-white dark:bg-[#080c14] min-h-screen text-slate-800 dark:text-slate-200 font-sans antialiased bg-grid-pattern relative w-full transition-colors duration-300">
      
      {/* Scroll indicator */}
      <div 
        className="scroll-progress-bar" 
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />

      {/* Decorative Vibrant Accent Blobs */}
      <div className="absolute top-24 -left-48 w-96 h-96 bg-cyan-100 dark:bg-cyan-950/20 rounded-full gradient-blob opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-[600px] left-10 w-96 h-96 bg-indigo-50 dark:bg-indigo-950/10 rounded-full gradient-blob opacity-50 pointer-events-none"></div>

      {/* Static sticky header */}
      <header className="sticky top-0 z-50 glass-nav h-16 transition-all duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <button 
            onClick={onClose}
            className="flex items-center space-x-2 text-xs font-bold text-slate-650 dark:text-slate-350 hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer bg-transparent border-none p-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.backBtn}</span>
          </button>
          
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full inline-block animate-ping mr-1"></span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-500 font-bold uppercase tracking-wider">{t.company}</span>
          </div>
        </div>
      </header>

      {/* Document Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="bg-white/80 dark:bg-[#0f1624]/60 backdrop-blur-xl border border-slate-200/50 dark:border-white/5 p-8 sm:p-12 rounded-3xl shadow-xl shadow-slate-100/50 dark:shadow-none space-y-8">
          
          {/* Header Title */}
          <div className="border-b border-slate-100 dark:border-white/5 pb-6">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {t.title}
            </h1>
            <p className="text-xs font-semibold text-sky-600 dark:text-sky-400 mt-2 tracking-wide uppercase">
              {t.company}
            </p>
          </div>

          {/* Intro paragraph */}
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            {t.intro}
          </p>

          {/* Sections List */}
          <div className="space-y-8 pt-4">
            {t.sections.map((sect, sIdx) => (
              <div key={sIdx} className="space-y-3">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {sect.title}
                </h3>
                <div className="space-y-2.5">
                  {sect.paragraphs.map((pText, pIdx) => (
                    <p 
                      key={pIdx} 
                      className={`text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed ${
                        sIdx === 5 ? 'font-semibold text-slate-700 dark:text-slate-300' : ''
                      }`}
                    >
                      {pText}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Back button at the bottom */}
          <div className="border-t border-slate-100 dark:border-white/5 pt-8 mt-12 flex justify-center">
            <button
              onClick={onClose}
              className="bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-xs sm:text-sm font-extrabold py-3 px-6 rounded-xl transition-all cursor-pointer shadow-md hover:scale-103 active:scale-97 uppercase tracking-wider border-none"
            >
              {t.backBtn}
            </button>
          </div>

        </div>
      </main>

      {/* Mini Footer */}
      <footer className="py-8 text-center text-[10px] text-slate-500 border-t border-slate-100 dark:border-white/5">
        <p>© {new Date().getFullYear()} {t.company}. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default App;
