import React, { useState, useEffect } from 'react';
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
  DollarSign, 
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

function App() {
  // Navigation Mobile state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Theme State (light, dark, system)
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'system');
  
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
    
    // Service base prices in KZT
    if (calcService === 'clean') {
      basePrice = 10000;
    } else if (calcService === 'repair') {
      basePrice = 10000; // Repair starts from 10,000 KZT
    } else if (calcService === 'install') {
      basePrice = calcFloor === '1' ? 10000 : 20000;
    }

    // Area coefficient
    if (calcArea === '35') basePrice += 3000;
    else if (calcArea === '50') basePrice += 6000;
    else if (calcArea === '50+') basePrice += 12000;

    // Extras
    if (calcService === 'repair') {
      if (repairCapacitor) basePrice += 13000;
      if (repairRelay) basePrice += 10000;
      if (repairBoard) basePrice += 20000;
      if (extraFreon) basePrice += 15000; // Freon recharge 15,000 KZT
    } else {
      if (extraAntibacterial) {
        basePrice += calcService === 'clean' ? 5000 : 4000;
      }
      if (extraFreon) basePrice += 15000; // Freon recharge 15,000 KZT
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
      title: 'Антибактериальная чистка',
      price: 'от 10 000 ₸',
      duration: '40-60 мин',
      bullets: [
        'Смывка грязи, жира и пыли испарителя под давлением',
        'Полная очистка крыльчатки внутреннего вентилятора',
        'Промывка и продувка дренажного канала (защита от течи)',
        'Антибактериальная обработка сертифицированной химией Errecom (опционально)',
        'Очистка фильтров грубой очистки и внешнего блока'
      ],
      result: 'Устранение запаха плесени, сырости и кашля. Риск протечки конденсата на обои снижается до 0%.',
      objectionClose: 'Работаем с сервисным пакетом (пленкой-чехлом) — ни одна капля грязной воды не попадет на ваши обои или ламинат.'
    },
    {
      id: 'repair',
      title: 'Инструментальный ремонт и заправка',
      price: 'от 10 000 ₸',
      duration: '30-90 мин',
      bullets: [
        'Замена пускового конденсатора: 13 000 ₸ (с нас запчасть и гарантия)',
        'Замена теплового реле: 10 000 ₸ (с запчастью, гарантия на нее)',
        'Ремонт платы управления: от 20 000 ₸',
        'Заправка кондиционера фреоном до 500 ml: 15 000 ₸',
        'Поиск микротрещин электронным течеискателем и вакуумирование',
        'Контрольный замер давления манометрической станцией после сборки'
      ],
      result: 'Качественные запчасти в наличии. Гарантия предоставляется на все замененные нами детали.',
      objectionClose: 'Сначала находим точную причину поломки. Гарантия действует только на замененные нами запчасти.'
    },
    {
      id: 'install',
      title: 'Монтаж «Под ключ» по чек-листу',
      price: 'от 10 000 ₸',
      duration: '2-3 часа',
      bullets: [
        'Разметка положения блоков лазерным уровнем (идеальный отвод дренажа)',
        'Алмазное бурение отверстий с пылеотсосом (без пыли и разломов стены)',
        'Монтаж трассы из качественной толстостенной медной трубки с термоизоляцией',
        'Обязательное вакуумирование трассы не менее 15 минут перед пуском фреона',
        'Монтаж виброгасящих опор для внешнего блока (чтобы не гудела стена ночью)'
      ],
      result: 'Кондиционер работает бесшумно, не вибрирует, а официальная заводская гарантия сохраняется на 100%.',
      objectionClose: 'Контролируем уклон дренажа по уровню. Даем юридическую гарантию на герметичность стыков трассы — фреон не уйдет за зиму.'
    }
  ];

  const faqItems = [
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
  ];

  return (
    <div className="bg-white dark:bg-[#080c14] min-h-screen text-slate-800 dark:text-slate-200 font-sans antialiased bg-grid-pattern relative transition-colors duration-300">
      
      {/* Decorative Vibrant Accent Blobs */}
      <div className="absolute top-24 -left-48 w-96 h-96 bg-cyan-100 dark:bg-cyan-950/20 rounded-full gradient-blob opacity-60 pointer-events-none"></div>
      <div className="absolute top-[800px] -right-48 w-[400px] h-[400px] bg-sky-100 dark:bg-sky-950/10 rounded-full gradient-blob opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-[600px] left-10 w-96 h-96 bg-indigo-50 dark:bg-indigo-950/10 rounded-full gradient-blob opacity-50 pointer-events-none"></div>

      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-50 glass-nav shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
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
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Услуги</a>
            <a href="#calculator" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Калькулятор сметы</a>
            <a href="#guarantees" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Гарантии</a>
            <a href="#faq" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Частые вопросы</a>
          </nav>

          {/* Theme Switcher & Contact details */}
          <div className="hidden lg:flex items-center space-x-6">
            
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
                        : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-350'
                    }`}
                    title={item.id === 'light' ? 'Светлая тема' : item.id === 'dark' ? 'Темная тема' : 'Системная тема'}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </button>
                )
              })}
            </div>

            <div className="flex flex-col items-end">
              <a href="tel:+77754323561" className="flex items-center font-bold text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                <Phone className="w-4 h-4 text-sky-500 mr-2 animate-pulse" />
                +7 (775) 432-35-61
              </a>
              <div className="flex items-center mt-1">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full inline-block animate-ping mr-1.5"></span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-500 font-semibold uppercase">Свободные мастера в Атырау</span>
              </div>
            </div>
            <button 
              onClick={() => handleWhatsAppClick('Здравствуйте! Хочу вызвать мастера на диагностику сегодня.')}
              className="bg-slate-900 dark:bg-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 text-white text-xs font-bold py-3 px-5 rounded-xl transition-all hover:shadow-lg cursor-pointer"
            >
              Связаться в WhatsApp
            </button>
          </div>

          {/* Mobile Menu & Theme Switcher Buttons */}
          <div className="md:hidden flex items-center space-x-3">
            
            {/* Compact theme switch */}
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light')}
              className="text-slate-600 dark:text-slate-300 p-2 border border-slate-200/50 dark:border-slate-800/80 rounded-xl cursor-pointer"
              title="Переключить тему"
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
          <div className="md:hidden bg-white dark:bg-[#080c14] border-b border-slate-100 dark:border-slate-800 px-4 pt-2 pb-6 space-y-3 transition-all duration-300">
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-sky-600 dark:hover:text-sky-400"
            >
              Услуги
            </a>
            <a 
              href="#calculator" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-sky-600 dark:hover:text-sky-400"
            >
              Калькулятор сметы
            </a>
            <a 
              href="#guarantees" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-sky-600 dark:hover:text-sky-400"
            >
              Гарантии
            </a>
            <a 
              href="#faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-sky-600 dark:hover:text-sky-400"
            >
              Частые вопросы
            </a>
            
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col space-y-3 px-3">
              
              {/* Mobile theme choice */}
              <div className="flex items-center justify-between text-xs text-slate-500 py-1">
                <span>Тема оформления:</span>
                <span className="font-bold capitalize text-slate-700 dark:text-slate-300">
                  {theme === 'light' && 'Светлая'}
                  {theme === 'dark' && 'Темная'}
                  {theme === 'system' && 'Системная (Авто)'}
                </span>
              </div>

              <a href="tel:+77754323561" className="flex items-center font-bold text-slate-900 dark:text-white">
                <Phone className="w-4 h-4 text-sky-500 mr-2" />
                +7 (775) 432-35-61
              </a>
              <p className="text-xs text-emerald-600 dark:text-emerald-500 font-medium">● Свободные мастера готовы к выезду сегодня</p>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleWhatsAppClick('Здравствуйте! Хочу вызвать мастера на диагностику сегодня.');
                }}
                className="w-full text-center bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-700 hover:to-cyan-600 text-white font-bold py-3 rounded-xl transition-all cursor-pointer"
              >
                Написать в WhatsApp
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
              Сегодня <strong>{CURRENT_DATE}</strong>: в Атырау прогнозируется сильная жара. Свободные слоты разбирают быстро.
            </span>
          </div>
          <div className="flex items-center space-x-3 shrink-0">
            <span className="text-xs bg-amber-200 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 px-2 py-0.5 rounded-full font-bold">
              Осталось: {slotsLeft} слота на сегодня
            </span>
            <a 
              href="#booking-section" 
              className="text-xs text-amber-950 dark:text-amber-400 font-bold underline hover:text-amber-800 transition-colors"
            >
              Занять ближайшее время →
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
                <span className="text-xs font-semibold uppercase tracking-wider">Юридическая гарантия и чистый договор</span>
              </div>
              
              {/* Premium Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
                Ремонт кондиционеров в Атырау <span className="bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">за 2 часа</span> без скрытых доплат
              </h1>
              
              {/* Subtitle closing key fears */}
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                <strong className="text-slate-900 dark:text-white">Сначала диагностика и фиксация цены в WhatsApp — потом работа.</strong> Вы платите строго по согласованной смете. Никаких внезапных наценок за длину трассы, расходные материалы или срочность выезда.
              </p>

              {/* Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 max-w-md sm:max-w-none">
                <button 
                  onClick={() => handleWhatsAppClick('Здравствуйте! Хочу зафиксировать цену ремонта кондиционера.')}
                  className="inline-flex items-center justify-center bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-700 hover:to-cyan-600 text-white font-bold text-sm py-4 px-8 rounded-xl transition-all shadow-md active:scale-98 cursor-pointer gap-2"
                >
                  Рассчитать точную стоимость в WhatsApp
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a 
                  href="#booking-section"
                  className="inline-flex items-center justify-center bg-slate-900 dark:bg-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 text-white font-bold text-sm py-4 px-8 rounded-xl transition-all hover:shadow-lg active:scale-98 cursor-pointer text-center"
                >
                  Забронировать слот на сегодня
                </a>
              </div>

              {/* Instant Mini Trust Factors Grid */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold text-xl">За 2 часа</h4>
                  <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">Среднее время приезда мастера с деталями</p>
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold text-xl">100% честно</h4>
                  <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">Диагностика перед согласованием цены</p>
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold text-xl">до 3-х лет</h4>
                  <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">Официальная гарантия по договору</p>
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
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">Экспресс-заявка в Атырау</h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500">Бронирование свободного мастера на сегодня</p>
                  </div>
                </div>

                <div className="space-y-4 text-left">
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-500 dark:text-sky-400 mt-0.5 shrink-0" />
                    <p className="text-xs text-slate-600 dark:text-slate-400">Мастер приедет со всеми расходниками и фреоном в машине.</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-500 dark:text-sky-400 mt-0.5 shrink-0" />
                    <p className="text-xs text-slate-600 dark:text-slate-400">Бесплатный выезд при согласии на ремонт.</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-500 dark:text-sky-400 mt-0.5 shrink-0" />
                    <p className="text-xs text-slate-600 dark:text-slate-400">Цены зафиксированы в договоре, никаких скрытых доплат.</p>
                  </div>
                </div>

                {/* Urgency Badge */}
                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/20 p-4 rounded-xl flex items-start space-x-3 text-left">
                  <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200">Главное опасение клиентов закрыто:</h4>
                    <p className="text-[11px] text-amber-700 dark:text-amber-400 mt-0.5">Мы дорожим вашей техникой. Наш мастер несет полную материальную ответственность за сохранность вашей сплит-системы при монтаже.</p>
                  </div>
                </div>

                <a 
                  href="#calculator"
                  className="w-full inline-flex items-center justify-center bg-slate-900 dark:bg-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 text-white font-bold py-3.5 px-6 rounded-xl transition-all active:scale-98 text-xs cursor-pointer"
                >
                  Перейти к калькулятору стоимости
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
            <div className="bg-white dark:bg-[#0f1624] p-8 rounded-2xl border border-slate-100 dark:border-white/5 flex items-start space-x-5 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-950/30 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">8+ лет на рынке Атырау</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
                  Сертифицированные инженеры компании обслужили и запустили более 6 500 сплит-систем. Опыт мастеров — от 3 до 10 лет.
                </p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="bg-white dark:bg-[#0f1624] p-8 rounded-2xl border border-slate-100 dark:border-white/5 flex items-start space-x-5 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-955/30 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                <Wrench className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">100% деталей с собой</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
                  В каждой из наших сервисных машин всегда в наличии запас фреона (R410A, R22), медных трубок, дренажей и конденсаторов. Устраняем поломку за 1 визит.
                </p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="bg-white dark:bg-[#0f1624] p-8 rounded-2xl border border-slate-100 dark:border-white/5 flex items-start space-x-5 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-955/30 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                <DollarSign className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">0 тенге за выезд и диагностику</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
                  Выезд специалиста и инструментальная диагностика манометрической станцией и течеискателем бесплатны при условии выполнения ремонта.
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
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight sm:text-4xl">
              Интерактивный калькулятор честной стоимости
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-lg mx-auto">
              Рассчитайте стоимость услуги за 30 секунд. Итоговая смета фиксируется в WhatsApp до выезда мастера. Никаких доплат после!
            </p>
          </div>

          <div className="bg-white dark:bg-[#0f1624]/60 border border-slate-200/80 dark:border-white/5 rounded-2xl shadow-xl shadow-slate-100 dark:shadow-none overflow-hidden grid md:grid-cols-12 transition-colors duration-300">
            
            {/* Calc Controls (Left 7 cols) */}
            <div className="md:col-span-7 p-6 sm:p-8 space-y-6 text-left border-r border-slate-100 dark:border-white/5">
              
              {/* Step 1: Service Type */}
              <div className="space-y-3">
                <label className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">Шаг 1: Выберите услугу</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'clean', label: 'Чистка' },
                    { id: 'repair', label: 'Ремонт' },
                    { id: 'install', label: 'Монтаж' }
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

              {/* Step 2: Area / Power */}
              <div className="space-y-3">
                <label className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">Шаг 2: Площадь помещения (Мощность BTU)</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: '20', label: 'До 20 м²', btu: '07-09 BTU' },
                    { id: '35', label: 'До 35 м²', btu: '12 BTU' },
                    { id: '50', label: 'До 50 м²', btu: '18 BTU' },
                    { id: '50+', label: 'Более 50 м²', btu: '24+ BTU' }
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

              {/* Step 2.5: Floor (Only for Installation) */}
              {calcService === 'install' && (
                <div className="space-y-3">
                  <label className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">Шаг 2.5: Укажите этаж установки</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: '1', label: '1-й этаж', note: 'Базовая цена: 10 000 ₸' },
                      { id: '2+', label: '2-й этаж и выше', note: 'Базовая цена: 20 000 ₸' }
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

              {/* Step 3: Add-ons */}
              <div className="space-y-3">
                <label className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                  {calcService === 'repair' ? 'Шаг 3: Выберите необходимые ремонтные работы' : 'Шаг 3: Дополнительные опции'}
                </label>
                <div className="space-y-2">
                  
                  {/* Dynamic Repair Options */}
                  {calcService === 'repair' ? (
                    <>
                      {/* Capacitor Option */}
                      <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <input 
                            type="checkbox" 
                            checked={repairCapacitor}
                            onChange={(e) => setRepairCapacitor(e.target.checked)}
                            className="w-4 h-4 text-sky-600 border-slate-300 rounded-sm focus:ring-sky-500 cursor-pointer"
                          />
                          <div>
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">Замена пускового конденсатора</span>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500">+ 13 000 ₸ (запчасть и гарантия включены)</span>
                          </div>
                        </div>
                      </label>

                      {/* Relay Option */}
                      <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <input 
                            type="checkbox" 
                            checked={repairRelay}
                            onChange={(e) => setRepairRelay(e.target.checked)}
                            className="w-4 h-4 text-sky-600 border-slate-300 rounded-sm focus:ring-sky-500 cursor-pointer"
                          />
                          <div>
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">Замена теплового реле</span>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500">+ 10 000 ₸ (с запчастью, гарантия на нее)</span>
                          </div>
                        </div>
                      </label>

                      {/* Board Option */}
                      <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <input 
                            type="checkbox" 
                            checked={repairBoard}
                            onChange={(e) => setRepairBoard(e.target.checked)}
                            className="w-4 h-4 text-sky-600 border-slate-300 rounded-sm focus:ring-sky-500 cursor-pointer"
                          />
                          <div>
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">Ремонт платы управления</span>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500">+ от 20 000 ₸</span>
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
                            {calcService === 'clean' ? 'Использовать антибактериальную химию Errecom' : 'Антибактериальная обработка'}
                          </span>
                          <span className="text-[10px] text-slate-400 dark:text-slate-500">
                            {calcService === 'clean' ? '+ 5 000 ₸ (Чистка с химией)' : '+ 4 000 ₸'}
                          </span>
                        </div>
                      </div>
                    </label>
                  )}

                  {/* Freon Option (Universal but with customized descriptions) */}
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
                          {calcService === 'repair' ? 'Заправка кондиционера фреоном' : 'Дозаправка качественным фреоном'}
                        </span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">
                          {calcService === 'repair' ? '+ 15 000 ₸ (до 500 ml с гарантией)' : '+ 15 000 ₸ (до 500 ml)'}
                        </span>
                      </div>
                    </div>
                  </label>

                  {/* Option 3: Universal High Work */}
                  <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <input 
                        type="checkbox" 
                        checked={extraHighWork}
                        onChange={(e) => setExtraHighWork(e.target.checked)}
                        className="w-4 h-4 text-sky-600 border-slate-300 rounded-sm focus:ring-sky-500 cursor-pointer"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">Высотные работы / Услуги альпиниста</span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">+ 15 000 ₸ (для сложных фасадов)</span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

            </div>

            {/* Pricing Summary (Right 5 cols) */}
            <div className="md:col-span-5 bg-slate-50/80 dark:bg-[#0c121e] p-6 sm:p-8 flex flex-col justify-between text-left relative transition-colors duration-300">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-extrabold text-slate-400 dark:text-slate-550 uppercase tracking-wider">Предварительный расчет</h4>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">Окончательная цена сметы гарантирована</p>
                </div>

                <div className="py-6 border-y border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                    <span>Базовый тариф:</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      {calcService === 'clean' && '10 000 ₸ (без химии)'}
                      {calcService === 'repair' && '10 000 ₸ (диагностика)'}
                      {calcService === 'install' && (calcFloor === '1' ? '10 000 ₸ (1 этаж)' : '20 000 ₸ (2+ этаж)')}
                    </span>
                  </div>
                  {calcArea !== '20' && (
                    <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                      <span>Наценка за мощность:</span>
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
                          <span>Замена конденсатора:</span>
                          <span className="font-bold text-slate-700 dark:text-slate-300">+ 13 000 ₸</span>
                        </div>
                      )}
                      {repairRelay && (
                        <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                          <span>Замена теплового реле:</span>
                          <span className="font-bold text-slate-700 dark:text-slate-300">+ 10 000 ₸</span>
                        </div>
                      )}
                      {repairBoard && (
                        <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                          <span>Ремонт платы:</span>
                          <span className="font-bold text-slate-700 dark:text-slate-300">+ 20 000 ₸</span>
                        </div>
                      )}
                    </>
                  ) : (
                    /* Default options (Clean/Install) */
                    extraAntibacterial && (
                      <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                        <span>Антибактериальная химия:</span>
                        <span className="font-bold text-slate-700 dark:text-slate-300">
                          {calcService === 'clean' ? '+ 5 000 ₸' : '+ 4 000 ₸'}
                        </span>
                      </div>
                    )
                  )}

                  {extraFreon && (
                    <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                      <span>Заправка фреоном (500 ml):</span>
                      <span className="font-bold text-slate-700 dark:text-slate-300">+ 15 000 ₸</span>
                    </div>
                  )}
                  {extraHighWork && (
                    <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                      <span>Высотные работы:</span>
                      <span className="font-bold text-slate-700 dark:text-slate-300">+ 15 000 ₸</span>
                    </div>
                  )}

                  <div className="pt-4 flex justify-between items-end border-t border-slate-200 dark:border-slate-800">
                    <span className="text-slate-900 dark:text-white font-extrabold text-sm uppercase">Итого к оплате:</span>
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
                    <span className="text-xs font-bold">Без скрытых доплат</span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal">
                    Мастер зафиксирует эту стоимость в акте до начала работ. Никаких накруток на месте!
                  </p>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="mt-8">
                {!calcSubmitted ? (
                  <form onSubmit={(e) => submitBooking(e, 'calc')} className="space-y-2">
                    <input 
                      type="tel" 
                      placeholder="Ваш телефон для сметы (WhatsApp)" 
                      required
                      value={calcPhone}
                      onChange={(e) => setCalcPhone(e.target.value)}
                      className="w-full text-xs bg-white dark:bg-slate-950 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-700 hover:to-cyan-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-md active:scale-98 cursor-pointer text-center text-xs"
                    >
                      Зафиксировать цену и отправить смету в WhatsApp
                    </button>
                  </form>
                ) : (
                  <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/20 p-4 rounded-xl text-center space-y-2">
                    <Check className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto" />
                    <h5 className="text-xs font-bold text-emerald-950 dark:text-emerald-250">Смета зафиксирована!</h5>
                    <p className="text-[10px] text-emerald-700 dark:text-emerald-450 leading-relaxed">
                      Перенаправляем в WhatsApp для мгновенного согласования времени выезда...
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
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight sm:text-4xl">
              Профессиональные услуги по регламенту
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl mx-auto">
              Мы строго следуем внутреннему техническому регламенту «Сервис Кондиционеров», защищая ваш интерьер и оборудование от повреждений.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {servicesTabs.map((service) => (
              <div 
                key={service.id}
                className="bg-white dark:bg-[#0f1624] border border-slate-200/80 dark:border-white/5 rounded-2xl shadow-sm p-6 sm:p-8 flex flex-col justify-between hover:shadow-lg transition-all text-left relative overflow-hidden"
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
                    <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider block">Ожидаемый результат:</span>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-normal">{service.result}</p>
                  </div>

                  {/* Objection Closure */}
                  <div className="flex items-start space-x-2 text-[11px] text-slate-400 dark:text-slate-500 italic">
                    <Info className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                    <span>{service.objectionClose}</span>
                  </div>

                  <button 
                    onClick={() => handleWhatsAppClick(`Здравствуйте! Хочу заказать услугу: ${service.title}.`)}
                    className="w-full bg-slate-900 dark:bg-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 text-white text-xs font-bold py-3.5 rounded-xl transition-all text-center cursor-pointer"
                  >
                    Заказать услугу в WhatsApp
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
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight sm:text-4xl">
              100% защита ваших прав и безопасности
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-lg mx-auto">
              Мы полностью убрали любые финансовые и технические риски для наших клиентов в Атырау.
            </p>
          </div>

          <div className="space-y-6">
            
            {/* Guarantee 1 */}
            <div className="bg-white dark:bg-[#0f1624] border border-slate-100 dark:border-white/5 p-6 sm:p-8 rounded-2xl shadow-xs grid md:grid-cols-12 gap-6 items-center hover:border-sky-300 transition-all text-left">
              <div className="md:col-span-3 flex justify-center">
                <div className="w-20 h-20 rounded-2xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                  <ShieldCheck className="w-10 h-10" />
                </div>
              </div>
              <div className="md:col-span-9 space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="bg-sky-100 dark:bg-sky-950/50 text-sky-700 dark:text-sky-400 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">Гарантия на работу</span>
                  <h3 className="font-bold text-slate-955 dark:text-white text-lg sm:text-xl">Твердая письменная гарантия от 12 до 36 месяцев</h3>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                  Вы получаете официальный гарантийный талон и акт выполненных работ с печатью ТОО. Если проблема возникнет снова — дежурный мастер приедет и исправит ее за наш счет в течение 24 часов. Без лишних вопросов и доказательств.
                </p>
              </div>
            </div>

            {/* Guarantee 2 */}
            <div className="bg-white dark:bg-[#0f1624] border border-slate-100 dark:border-white/5 p-6 sm:p-8 rounded-2xl shadow-xs grid md:grid-cols-12 gap-6 items-center hover:border-sky-300 transition-all text-left">
              <div className="md:col-span-3 flex justify-center">
                <div className="w-20 h-20 rounded-2xl bg-sky-50 dark:bg-sky-955/40 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                  <ShieldAlert className="w-10 h-10" />
                </div>
              </div>
              <div className="md:col-span-9 space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="bg-indigo-100 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">Страхование интерьера</span>
                  <h3 className="font-bold text-slate-955 dark:text-white text-lg sm:text-xl">Финансовая защита вашего интерьера и мебели</h3>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                  Перед началом работ мы бесплатно закрываем стены, мебель и технику защитной пленкой. В случае, если наш мастер случайно повредит отделку или испачкает обои при монтаже — мы компенсируем 100% ущерба по договору. Ваша квартира останется в первозданном виде.
                </p>
              </div>
            </div>

            {/* Guarantee 3 */}
            <div className="bg-white dark:bg-[#0f1624] border border-slate-100 dark:border-white/5 p-6 sm:p-8 rounded-2xl shadow-xs grid md:grid-cols-12 gap-6 items-center hover:border-sky-300 transition-all text-left">
              <div className="md:col-span-3 flex justify-center">
                <div className="w-20 h-20 rounded-2xl bg-sky-50 dark:bg-sky-955/40 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                  <Sparkles className="w-10 h-10" />
                </div>
              </div>
              <div className="md:col-span-9 space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-450 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">Чистота 100%</span>
                  <h3 className="font-bold text-slate-955 dark:text-white text-lg sm:text-xl">Работа по стандарту «Абсолютная чистота»</h3>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                  Наши специалисты работают строго в чистых бахилах. Все сверлильные и бурильные работы проводятся только со сбором пыли промышленным пылесосом. По окончании ремонта мастер собирает и увозит с собой весь крупный строительный мусор.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FREQUENT OBJECTIONS FAQ (ACCORDION) */}
      <section id="faq" className="py-20 bg-slate-50 dark:bg-[#0b101b] border-y border-slate-100 dark:border-white/5 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight sm:text-4xl">
              Разбираем ваши сомнения
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-lg mx-auto">
              Честные ответы на самые частые вопросы и страхи клиентов перед вызовом мастера.
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-white dark:bg-[#0f1624] border border-slate-200/60 dark:border-white/5 rounded-2xl overflow-hidden shadow-xs transition-all duration-300"
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
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-650 dark:text-slate-450 leading-relaxed border-t border-slate-100/60 dark:border-slate-800">
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
              Срочный выезд по Атырау
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              В Атырау +40 °C: свободные слоты на сегодня разбирают до 11:00
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Бригады распределяются по районам города оперативно. Оставьте свой номер телефона, чтобы зафиксировать за собой ближайшего свободного мастера, забронировать фиксированную цену ремонта и получить подробную смету в WhatsApp.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 sm:p-10 rounded-3xl max-w-xl mx-auto backdrop-blur-md">
            {!bookingSuccess ? (
              <form onSubmit={(e) => submitBooking(e, 'main')} className="space-y-4">
                <div className="text-left space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Ваш номер телефона (WhatsApp)</label>
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
                  Узнать свободное время и зафиксировать цену
                </button>
                
                <p className="text-[10px] text-slate-500 leading-normal">
                  Нажимая кнопку, вы соглашаетесь на мгновенную обработку персональных данных для связи.
                </p>
              </form>
            ) : (
              <div className="py-8 space-y-4 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-white">Заявка успешно отправлена!</h4>
                <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
                  Свободный слот зафиксирован за номером <strong className="text-white">{bookingPhone}</strong>. Перенаправляем вас в WhatsApp для мгновенного согласования точного времени приезда мастера...
                </p>
              </div>
            )}
          </div>

          {/* Core Objections reminder cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left pt-8 border-t border-white/5">
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-white">Выезд за 0 ₸</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-normal">При выполнении работ выезд инженера бесплатный.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-white">Цена до работ</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-normal">Никаких непредвиденных доплат за шланги или срочность.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-white">Бахилы и уборка</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-normal">Инженер работает в бахилах и вывозит весь строительный мусор.</p>
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
            <p className="text-xs text-slate-500 leading-normal">
              Профессиональный сервисный центр по ремонту, чистке и установке кондиционеров в Атырау. Работаем строго по договору с официальной гарантией.
            </p>
          </div>

          {/* Links Quick */}
          <div>
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-4">Навигация</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-white transition-colors">Наши услуги</a></li>
              <li><a href="#calculator" className="hover:text-white transition-colors">Рассчитать цену</a></li>
              <li><a href="#guarantees" className="hover:text-white transition-colors">Наши гарантии</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Частые вопросы</a></li>
            </ul>
          </div>

          {/* Legal details / address */}
          <div>
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-4">Контакты и адрес</h4>
            <ul className="space-y-3 text-xs leading-normal">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-sky-500 shrink-0" />
                <span>г. Атырау, мкр. Балыкшы, ул. К. Ахмедиярова, д. 28А, офис 9</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-sky-500 shrink-0" />
                <a href="tel:+77754323561" className="hover:text-white transition-colors">+7 (775) 432-35-61</a>
              </li>
              <li>
                <span className="text-slate-600 block">Время работы:</span>
                <span>Ежедневно с 08:00 до 21:00</span>
              </li>
            </ul>
          </div>

          {/* CASPIAN / ALMACOM reference block */}
          <div>
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-4">Официальный дилер</h4>
            <p className="text-xs text-slate-500 leading-normal">
              Работаем напрямую с крупными брендами: Almacom, AUX, Kaspi-Климат, Midea, Gree. Закупаем оригинальные запчасти оптом, удерживая доступные цены на работы.
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
              <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">Официальный исполнитель</span>
              <p className="font-bold text-white text-sm">ИП КЛИМАТ ТЕХ</p>
              <p className="mt-2 text-slate-500">БИН (ИИН): 530627401271</p>
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">Юридический адрес</span>
              <p className="leading-relaxed">РК, г. Атырау, микрорайон Балыкшы, улица Каршымбай Ахмедияров, дом 28А, кв./офис 9</p>
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">Банковские реквизиты (АО "Kaspi Bank")</span>
              <p className="font-semibold text-slate-300">Счет: KZ18722S000025707913</p>
              <p className="mt-1 text-slate-500">БИК: CASPKZKA | КБе: 19</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-4">
          <p>© {new Date().getFullYear()} Климат Эксперт Атырау. Все права защищены.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-slate-400">Политика конфиденциальности</a>
            <a href="#" className="hover:text-slate-400">Публичная оферта</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
