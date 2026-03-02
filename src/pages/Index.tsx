import { useState } from "react";
import Icon from "@/components/ui/icon";

const CATEGORIES = ["Все", "Аналитика", "Эссе", "Репортаж", "Интервью", "Технологии"];

const ARTICLES = [
  {
    id: 1,
    category: "Аналитика",
    title: "Как цифровая экономика меняет рынок труда в ближайшие десять лет",
    excerpt: "Автоматизация уже не угроза будущего — она настоящее. Разбираемся, какие профессии исчезнут, какие трансформируются и где откроются новые возможности.",
    author: "Алексей Громов",
    date: "28 февраля 2026",
    readTime: "12 мин",
    comments: 24,
  },
  {
    id: 2,
    category: "Эссе",
    title: "Одиночество в эпоху гиперсвязанности",
    excerpt: "Мы подключены к миллиардам людей и при этом никогда не чувствовали себя более изолированными. Парадокс современной коммуникации.",
    author: "Мария Соколова",
    date: "25 февраля 2026",
    readTime: "8 мин",
    comments: 41,
  },
  {
    id: 3,
    category: "Репортаж",
    title: "Три недели в Арктике: как работают учёные на краю света",
    excerpt: "Репортаж с полярной станции — о людях, которые выбрали крайний холод ради науки, и о том, что они там обнаружили.",
    author: "Дмитрий Петров",
    date: "22 февраля 2026",
    readTime: "15 мин",
    comments: 18,
  },
  {
    id: 4,
    category: "Интервью",
    title: "«Архитектура — это политика»: разговор с урбанистом Ильёй Варским",
    excerpt: "О том, почему города строятся для машин, а не людей, и что нужно изменить, чтобы улица снова стала общественным пространством.",
    author: "Наталья Кузнецова",
    date: "18 февраля 2026",
    readTime: "10 мин",
    comments: 33,
  },
  {
    id: 5,
    category: "Технологии",
    title: "Нейросети в медицине: обещания и реальность 2026 года",
    excerpt: "ИИ диагностирует рак точнее врачей — это факт. Но почему большинство больниц всё ещё не используют эти инструменты?",
    author: "Алексей Громов",
    date: "14 февраля 2026",
    readTime: "11 мин",
    comments: 57,
  },
  {
    id: 6,
    category: "Эссе",
    title: "Медленное чтение как акт сопротивления",
    excerpt: "В мире быстрых потреблений контента — почему найти час для книги стало революционным поступком.",
    author: "Мария Соколова",
    date: "10 февраля 2026",
    readTime: "6 мин",
    comments: 29,
  },
];

const ARCHIVE = [
  { month: "Февраль 2026", count: 12 },
  { month: "Январь 2026", count: 18 },
  { month: "Декабрь 2025", count: 15 },
  { month: "Ноябрь 2025", count: 21 },
  { month: "Октябрь 2025", count: 14 },
];

const COMMENTS_DEMO = [
  { id: 1, name: "Иван Р.", text: "Отличный материал, особенно раздел про автоматизацию производства. Давно ждал такого разбора.", time: "2 часа назад" },
  { id: 2, name: "Светлана К.", text: "Согласна с выводами, но хотелось бы больше конкретных примеров из российской практики.", time: "5 часов назад" },
  { id: 3, name: "Михаил Т.", text: "Прочитал на одном дыхании. Ссылку на источники можно добавить?", time: "вчера" },
];

type Page = "home" | "articles" | "categories" | "archive" | "about" | "contacts" | "article";
type Article = typeof ARTICLES[0];

export default function Index() {
  const [page, setPage] = useState<Page>("home");
  const [activeCategory, setActiveCategory] = useState("Все");
  const [selectedArticle, setSelectedArticle] = useState<Article>(ARTICLES[0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentName, setCommentName] = useState("");
  const [comments, setComments] = useState(COMMENTS_DEMO);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = ARTICLES.filter(a =>
    (activeCategory === "Все" || a.category === activeCategory) &&
    (searchQuery === "" || a.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setPage("article");
    window.scrollTo(0, 0);
  };

  const handleCommentSubmit = () => {
    if (!commentText.trim() || !commentName.trim()) return;
    setComments([
      { id: comments.length + 1, name: commentName, text: commentText, time: "только что" },
      ...comments,
    ]);
    setCommentText("");
  };

  const navItems: { label: string; id: Page }[] = [
    { label: "Главная", id: "home" },
    { label: "Статьи", id: "articles" },
    { label: "Категории", id: "categories" },
    { label: "Архив", id: "archive" },
    { label: "Об авторе", id: "about" },
    { label: "Контакты", id: "contacts" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <button
            onClick={() => setPage("home")}
            className="font-display text-xl font-bold tracking-widest text-foreground hover:text-primary transition-colors"
          >
            МЕ<span className="text-primary">ДИ</span>УМ
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`nav-link ${page === item.id ? "text-primary" : ""}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Поиск..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setPage("articles")}
                className="bg-muted border border-border text-sm px-4 py-2 pr-10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary w-44 transition-all"
              />
              <Icon name="Search" size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          <button className="md:hidden text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background animate-fade-in">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { setPage(item.id); setMobileMenuOpen(false); }}
                className={`block w-full text-left px-6 py-4 nav-link border-b border-border ${page === item.id ? "text-primary" : ""}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main>

        {/* ===== HOME ===== */}
        {page === "home" && (
          <div className="animate-fade-in">
            <section className="border-b border-border">
              <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="section-label mb-4 flex items-center gap-3">
                    <span className="inline-block w-8 h-px bg-primary"></span>
                    Редакционный блог
                  </p>
                  <h1 className="font-display text-6xl md:text-8xl font-bold leading-none text-foreground">
                    СЛОВА<br />
                    <span className="text-primary">ИМЕЮТ</span><br />
                    ЗНАЧЕНИЕ
                  </h1>
                  <p className="text-muted-foreground text-lg leading-relaxed max-w-md mt-6">
                    Аналитика, эссе и репортажи о том, что действительно важно. Без кликбейта и пустых слов.
                  </p>
                  <div className="flex gap-4 mt-8">
                    <button className="btn-primary" onClick={() => setPage("articles")}>Читать статьи</button>
                    <button className="btn-outline" onClick={() => setPage("about")}>Об авторе</button>
                  </div>
                </div>

                <div
                  className="border border-border p-8 cursor-pointer hover:border-primary transition-colors duration-300 group"
                  onClick={() => handleArticleClick(ARTICLES[0])}
                >
                  <p className="tag-badge mb-4">{ARTICLES[0].category}</p>
                  <h2 className="font-display text-3xl font-semibold leading-tight text-foreground group-hover:text-primary transition-colors mb-4">
                    {ARTICLES[0].title}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">{ARTICLES[0].excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-mono">{ARTICLES[0].author}</span>
                    <div className="flex items-center gap-4">
                      <span className="font-mono">{ARTICLES[0].readTime}</span>
                      <span className="flex items-center gap-1">
                        <Icon name="MessageCircle" size={12} />
                        {ARTICLES[0].comments}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Stats */}
            <section className="border-b border-border">
              <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4">
                {[
                  { value: "120+", label: "Публикаций" },
                  { value: "48К", label: "Читателей" },
                  { value: "6", label: "Категорий" },
                  { value: "4 года", label: "В эфире" },
                ].map((stat, i) => (
                  <div key={i} className="px-6 py-4 border-r border-border last:border-r-0">
                    <div className="font-display text-4xl font-bold text-primary">{stat.value}</div>
                    <div className="section-label mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recent articles */}
            <section className="max-w-7xl mx-auto px-6 py-16">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <p className="section-label mb-2">Последнее</p>
                  <h2 className="font-display text-4xl font-semibold">СВЕЖИЕ МАТЕРИАЛЫ</h2>
                </div>
                <button className="btn-outline" onClick={() => setPage("articles")}>Все статьи →</button>
              </div>
              <div className="divide-y divide-border">
                {ARTICLES.slice(0, 4).map(article => (
                  <article key={article.id} className="article-card group" onClick={() => handleArticleClick(article)}>
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="tag-badge mb-3">{article.category}</p>
                        <h3 className="font-display text-2xl font-medium text-foreground group-hover:text-primary transition-colors leading-tight mb-3">
                          {article.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{article.excerpt}</p>
                      </div>
                      <div className="flex md:flex-col items-center md:items-end gap-4 md:gap-2 shrink-0">
                        <span className="font-mono text-xs text-muted-foreground">{article.date}</span>
                        <span className="font-mono text-xs text-muted-foreground">{article.readTime}</span>
                        <span className="font-mono text-xs text-muted-foreground flex items-center gap-1">
                          <Icon name="MessageCircle" size={11} />
                          {article.comments}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ===== ARTICLES ===== */}
        {page === "articles" && (
          <div className="max-w-7xl mx-auto px-6 py-12 animate-fade-in">
            <div className="mb-10">
              <p className="section-label mb-2">Архив</p>
              <h1 className="font-display text-5xl font-bold mb-6">ВСЕ СТАТЬИ</h1>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 text-xs tracking-widest uppercase font-display font-medium border transition-colors duration-200 ${
                      activeCategory === cat
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="divide-y divide-border">
              {filteredArticles.map(article => (
                <article key={article.id} className="article-card group" onClick={() => handleArticleClick(article)}>
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="tag-badge mb-3">{article.category}</p>
                      <h3 className="font-display text-2xl font-medium text-foreground group-hover:text-primary transition-colors leading-tight mb-3">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{article.excerpt}</p>
                    </div>
                    <div className="flex md:flex-col items-center md:items-end gap-4 md:gap-2 shrink-0">
                      <span className="font-mono text-xs text-muted-foreground">{article.author}</span>
                      <span className="font-mono text-xs text-muted-foreground">{article.date}</span>
                      <span className="font-mono text-xs text-muted-foreground">{article.readTime}</span>
                      <span className="font-mono text-xs text-muted-foreground flex items-center gap-1">
                        <Icon name="MessageCircle" size={11} />
                        {article.comments}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
              {filteredArticles.length === 0 && (
                <p className="py-16 text-center text-muted-foreground font-mono text-sm">Нет статей в этой категории</p>
              )}
            </div>
          </div>
        )}

        {/* ===== CATEGORIES ===== */}
        {page === "categories" && (
          <div className="max-w-7xl mx-auto px-6 py-12 animate-fade-in">
            <p className="section-label mb-2">Навигация</p>
            <h1 className="font-display text-5xl font-bold mb-12">КАТЕГОРИИ</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-border">
              {CATEGORIES.filter(c => c !== "Все").map((cat, i) => {
                const count = ARTICLES.filter(a => a.category === cat).length;
                return (
                  <button
                    key={cat}
                    className="border-r border-b border-border p-8 text-left hover:bg-muted/50 transition-colors group"
                    onClick={() => { setActiveCategory(cat); setPage("articles"); }}
                  >
                    <div className="font-mono text-primary text-xs mb-3">0{i + 1}</div>
                    <h3 className="font-display text-3xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">{cat}</h3>
                    <p className="section-label">{count} {count === 1 ? "материал" : "материалов"}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ===== ARCHIVE ===== */}
        {page === "archive" && (
          <div className="max-w-4xl mx-auto px-6 py-12 animate-fade-in">
            <p className="section-label mb-2">Хронология</p>
            <h1 className="font-display text-5xl font-bold mb-12">АРХИВ</h1>
            <div className="divide-y divide-border">
              {ARCHIVE.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-6 group cursor-pointer hover:text-primary transition-colors">
                  <span className="font-display text-2xl font-medium">{item.month}</span>
                  <div className="flex items-center gap-6">
                    <span className="font-mono text-xs text-muted-foreground">{item.count} материалов</span>
                    <Icon name="ArrowRight" size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== ABOUT ===== */}
        {page === "about" && (
          <div className="max-w-4xl mx-auto px-6 py-12 animate-fade-in">
            <p className="section-label mb-2">Редакция</p>
            <h1 className="font-display text-5xl font-bold mb-12">ОБ АВТОРЕ</h1>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-1">
                <div className="aspect-square bg-muted border border-border flex items-center justify-center mb-4">
                  <Icon name="User" size={64} className="text-muted-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-1">Алексей Громов</h3>
                <p className="section-label">Главный редактор</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-foreground leading-relaxed text-lg mb-6">
                  Журналист и аналитик с 12-летним опытом работы в деловых и общественно-политических изданиях. Пишу о технологиях, экономике и том, как они меняют повседневную жизнь.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Работал в крупных деловых изданиях. В 2022 году основал этот блог как пространство для длинных, хорошо исследованных материалов — в противовес быстрой новостной журналистике.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Убеждён, что качественный текст не устаревает. Каждый материал проходит несколько этапов редактуры и верификации источников.
                </p>
                <div className="mt-8">
                  <button className="btn-outline" onClick={() => setPage("contacts")}>Написать редактору</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== CONTACTS ===== */}
        {page === "contacts" && (
          <div className="max-w-3xl mx-auto px-6 py-12 animate-fade-in">
            <p className="section-label mb-2">Обратная связь</p>
            <h1 className="font-display text-5xl font-bold mb-4">КОНТАКТЫ</h1>
            <p className="text-muted-foreground mb-12">Для пресс-релизов, сотрудничества и читательских вопросов.</p>
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              {[
                { icon: "Mail", label: "Почта", value: "editor@medium-blog.ru" },
                { icon: "Send", label: "Telegram", value: "@medium_blog" },
              ].map((contact, i) => (
                <div key={i} className="border-t border-border pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon name={contact.icon as "Mail" | "Send"} size={16} className="text-primary" />
                    <span className="section-label">{contact.label}</span>
                  </div>
                  <p className="font-display text-xl font-medium">{contact.value}</p>
                </div>
              ))}
            </div>
            <div className="border border-border p-8">
              <h3 className="font-display text-2xl font-semibold mb-6">Написать сообщение</h3>
              <div className="space-y-4">
                <input className="w-full bg-muted border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" placeholder="Ваше имя" />
                <input className="w-full bg-muted border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" placeholder="Email" type="email" />
                <textarea rows={5} className="w-full bg-muted border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none" placeholder="Ваше сообщение..." />
                <button className="btn-primary w-full">Отправить сообщение</button>
              </div>
            </div>
          </div>
        )}

        {/* ===== ARTICLE ===== */}
        {page === "article" && (
          <div className="animate-fade-in">
            <div className="max-w-3xl mx-auto px-6 py-12">
              <button
                onClick={() => setPage("articles")}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-10 font-mono text-xs tracking-widest uppercase"
              >
                <Icon name="ArrowLeft" size={14} />
                Назад к статьям
              </button>

              <p className="tag-badge mb-4">{selectedArticle.category}</p>
              <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight text-foreground mb-8">
                {selectedArticle.title}
              </h1>

              <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border">
                <div>
                  <p className="text-sm font-medium text-foreground">{selectedArticle.author}</p>
                  <p className="font-mono text-xs text-muted-foreground">{selectedArticle.date} · {selectedArticle.readTime}</p>
                </div>
                <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground ml-auto">
                  <Icon name="MessageCircle" size={13} />
                  {selectedArticle.comments} комментариев
                </span>
              </div>

              <div className="space-y-6">
                <p className="text-foreground text-lg leading-relaxed">{selectedArticle.excerpt}</p>
                <p className="text-muted-foreground leading-relaxed">
                  Мировой рынок труда переживает беспрецедентную трансформацию. По данным аналитических агентств, к 2030 году сотни миллионов рабочих мест в мире могут быть автоматизированы. Это не апокалиптический сценарий — это уже происходит в банковском секторе, логистике и производстве.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Но история промышленных революций учит нас кое-чему важному: каждая волна автоматизации уничтожала одни профессии и создавала другие. Паровой двигатель вытеснил ткачей-надомников, но породил целые индустрии — от инженерии до железных дорог. Компьютеры уничтожили профессию машинистки, но создали программистов, UX-дизайнеров и специалистов по кибербезопасности.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Сегодня на линии огня — профессии, требующие когнитивных задач средней сложности. Бухгалтеры, юридические ассистенты, рентгенологи, операторы колл-центров. Именно эти люди — «белые воротнички» среднего класса — под наибольшим давлением.
                </p>
                <blockquote className="border-l-4 border-primary pl-6 my-8">
                  <p className="font-display text-2xl font-medium text-foreground leading-tight">
                    «Вопрос не в том, заменит ли ИИ людей. Вопрос в том, кто будет управлять ИИ, который это делает.»
                  </p>
                  <cite className="font-mono text-xs text-muted-foreground mt-3 block">— Кай-Фу Ли, венчурный инвестор</cite>
                </blockquote>
                <p className="text-muted-foreground leading-relaxed">
                  Победители новой экономики — те, кто умеет работать в связке с машиной. Не конкурировать с ней, а дополнять её. Клиницист, который понимает, почему алгоритм поставил тот или иной диагноз, ценнее, чем тот, кто просто читает снимки.
                </p>
              </div>

              {/* Comments */}
              <div className="mt-16 pt-12 border-t border-border">
                <h2 className="font-display text-3xl font-semibold mb-8">
                  ОБСУЖДЕНИЕ <span className="text-primary">({comments.length})</span>
                </h2>

                <div className="bg-muted border border-border p-6 mb-10">
                  <h3 className="font-display text-lg font-medium mb-4">Оставить комментарий</h3>
                  <div className="space-y-3">
                    <input
                      value={commentName}
                      onChange={e => setCommentName(e.target.value)}
                      className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                      placeholder="Ваше имя"
                    />
                    <textarea
                      value={commentText}
                      onChange={e => setCommentText(e.target.value)}
                      rows={4}
                      className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                      placeholder="Поделитесь мыслью о материале..."
                    />
                    <button
                      onClick={handleCommentSubmit}
                      disabled={!commentText.trim() || !commentName.trim()}
                      className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Опубликовать
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-border">
                  {comments.map(comment => (
                    <div key={comment.id} className="py-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-display text-sm font-medium text-foreground">{comment.name}</span>
                        <span className="font-mono text-xs text-muted-foreground">{comment.time}</span>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">{comment.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border mt-24">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="font-display text-2xl font-bold text-foreground mb-4">
                МЕ<span className="text-primary">ДИ</span>УМ
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Блог о важном. Аналитика, эссе и репортажи без кликбейта.
              </p>
            </div>
            <div>
              <h4 className="section-label mb-4">Разделы</h4>
              <ul className="space-y-2">
                {navItems.map(item => (
                  <li key={item.id}>
                    <button onClick={() => setPage(item.id)} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="section-label mb-4">Категории</h4>
              <ul className="space-y-2">
                {CATEGORIES.filter(c => c !== "Все").map(cat => (
                  <li key={cat}>
                    <button onClick={() => { setActiveCategory(cat); setPage("articles"); }} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-mono text-xs text-muted-foreground">© 2026 МЕДИУМ. Все права защищены.</p>
            <p className="font-mono text-xs text-muted-foreground">Сделано с уважением к читателю</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
