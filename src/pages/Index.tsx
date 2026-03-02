import { useState } from "react";
import Icon from "@/components/ui/icon";

const CATEGORIES = ["Все", "Аналитика", "Новости", "Обзоры", "Советы", "Технологии"];

const ARTICLES = [
  {
    id: 1,
    category: "Аналитика",
    title: "Китайский автопром 2025: почему весь мир смотрит на восток",
    excerpt: "Как BYD, Li Auto и Chery завоёвывают глобальный рынок. Разбираем стратегии, цифры продаж и то, что это значит для покупателей в СНГ.",
    author: "Алексей Громов",
    date: "28 февраля 2026",
    readTime: "12 мин",
    comments: 24,
    tag: "Аналитика",
  },
  {
    id: 2,
    category: "Обзоры",
    title: "Li Auto L9: тест-драйв семейного флагмана из Китая",
    excerpt: "560 л.с., 6 мест, расход 8 л/100 км — звучит невероятно. Мы провели с ним неделю в городе и за городом, чтобы выяснить правду.",
    author: "Мария Соколова",
    date: "25 февраля 2026",
    readTime: "8 мин",
    comments: 41,
    tag: "Обзоры",
  },
  {
    id: 3,
    category: "Советы",
    title: "Как правильно пригнать авто из Китая: пошаговый гайд",
    excerpt: "Выбор площадки, проверка авто, таможня, сертификация — всё, что нужно знать до того, как переводить деньги. Реальный опыт, без воды.",
    author: "Дмитрий Петров",
    date: "22 февраля 2026",
    readTime: "15 мин",
    comments: 18,
    tag: "Советы",
  },
  {
    id: 4,
    category: "Новости",
    title: "Chery Tiggo 9 выходит на рынок Беларуси: цены и комплектации",
    excerpt: "Официальный дилер объявил старт продаж. Топовая версия с панорамной крышей и системой L2+ автопилота — от 65 000 BYN.",
    author: "Наталья Кузнецова",
    date: "18 февраля 2026",
    readTime: "5 мин",
    comments: 33,
    tag: "Новости",
  },
  {
    id: 5,
    category: "Технологии",
    title: "CATL Kirin 3.0: революция в аккумуляторах или маркетинг?",
    excerpt: "1000 км на одном заряде, зарядка за 10 минут — проверяем реальные цифры и разбираемся, почему эти технологии ещё не в каждом авто.",
    author: "Алексей Громов",
    date: "14 февраля 2026",
    readTime: "11 мин",
    comments: 57,
    tag: "Технологии",
  },
  {
    id: 6,
    category: "Советы",
    title: "ТОП-5 ошибок при покупке авто из Китая — как их избежать",
    excerpt: "От неправильного выбора конфигурации до проблем с гарантией. Разбираем самые распространённые ошибки наших клиентов.",
    author: "Дмитрий Петров",
    date: "10 февраля 2026",
    readTime: "9 мин",
    comments: 29,
    tag: "Советы",
  },
];

const POPULAR = [ARTICLES[4], ARTICLES[1], ARTICLES[2]];

const ARCHIVE = [
  { month: "Февраль 2026", count: 12 },
  { month: "Январь 2026", count: 18 },
  { month: "Декабрь 2025", count: 15 },
  { month: "Ноябрь 2025", count: 21 },
];

const COMMENTS_DEMO = [
  { id: 1, name: "Иван Р.", text: "Отличный материал! Давно искал такой детальный разбор.", time: "2 часа назад" },
  { id: 2, name: "Светлана К.", text: "Согласна, но хотелось бы больше примеров из реальной практики.", time: "5 часов назад" },
  { id: 3, name: "Михаил Т.", text: "Прочитал на одном дыхании. Можно ссылки на источники?", time: "вчера" },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Аналитика": "#e53935",
  "Обзоры": "#1565c0",
  "Советы": "#2e7d32",
  "Новости": "#f57c00",
  "Технологии": "#6a1b9a",
};

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
    { label: "Об авторах", id: "about" },
    { label: "Контакты", id: "contacts" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#1a1a1a", color: "#f0f0f0", fontFamily: "'Montserrat', sans-serif" }}>

      {/* HEADER */}
      <header style={{ backgroundColor: "#111", borderBottom: "1px solid #2a2a2a", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          
          {/* Logo */}
          <button onClick={() => setPage("home")} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 32, height: 32, background: "#e53935", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 2 }}>
                <Icon name="Newspaper" size={18} color="#fff" />
              </div>
              <span style={{ fontFamily: "Montserrat", fontWeight: 800, fontSize: 18, color: "#fff", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                AVM <span style={{ color: "#e53935" }}>BLOG</span>
              </span>
            </div>
          </button>

          {/* Nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: 32 }} className="hidden md:flex">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
                  color: page === item.id ? "#e53935" : "#aaa",
                  fontFamily: "Montserrat",
                  transition: "color 0.2s",
                  borderBottom: page === item.id ? "2px solid #e53935" : "2px solid transparent",
                  paddingBottom: 4,
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Search + Phone */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }} className="hidden md:flex">
            <div style={{ position: "relative" }}>
              <input
                type="text"
                placeholder="Поиск статей..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setPage("articles")}
                style={{
                  background: "#222", border: "1px solid #333", color: "#fff",
                  fontSize: 13, padding: "8px 36px 8px 14px", borderRadius: 4,
                  outline: "none", width: 200, fontFamily: "Montserrat",
                }}
              />
              <Icon name="Search" size={14} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: "#666" }} />
            </div>
            <a
              href="tel:+375296397378"
              style={{
                background: "#e53935", color: "#fff", padding: "10px 20px",
                borderRadius: 4, fontSize: 13, fontWeight: 700, letterSpacing: "0.05em",
                textDecoration: "none", display: "flex", alignItems: "center", gap: 6,
              }}
            >
              <Icon name="Phone" size={14} color="#fff" />
              +375 29 639 73 78
            </a>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#fff" }}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div style={{ borderTop: "1px solid #2a2a2a", background: "#111" }} className="md:hidden animate-fade-in">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { setPage(item.id); setMobileMenuOpen(false); }}
                style={{
                  display: "block", width: "100%", textAlign: "left",
                  padding: "14px 24px", background: "none", border: "none", cursor: "pointer",
                  borderBottom: "1px solid #222", fontSize: 13, fontWeight: 600,
                  textTransform: "uppercase", letterSpacing: "0.08em",
                  color: page === item.id ? "#e53935" : "#aaa",
                  fontFamily: "Montserrat",
                }}
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
            
            {/* Hero */}
            <section style={{
              background: "linear-gradient(135deg, #1a1a1a 0%, #2a1010 50%, #1a1a1a 100%)",
              borderBottom: "1px solid #2a2a2a",
              padding: "80px 24px",
              position: "relative",
              overflow: "hidden",
            }}>
              {/* Red glow */}
              <div style={{
                position: "absolute", right: "5%", top: "50%", transform: "translateY(-50%)",
                width: 400, height: 400,
                background: "radial-gradient(circle, rgba(229,57,53,0.15) 0%, transparent 70%)",
                pointerEvents: "none",
              }} />
              
              <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                <div style={{ maxWidth: 680 }}>
                  <p className="section-label" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                    <span className="red-line" />
                    Официальный блог AVM Motors
                  </p>
                  <h1 style={{
                    fontFamily: "Montserrat", fontWeight: 900, fontSize: "clamp(42px, 7vw, 80px)",
                    lineHeight: 1.0, color: "#fff", textTransform: "uppercase", marginBottom: 24,
                  }}>
                    АВТОМОБИЛИ<br />
                    <span style={{ color: "#e53935", fontStyle: "italic" }}>ИЗ КИТАЯ</span><br />
                    БЕЗ СЕКРЕТОВ
                  </h1>
                  <p style={{ fontSize: 16, color: "#aaa", lineHeight: 1.7, maxWidth: 500, marginBottom: 36 }}>
                    Честные обзоры, советы по покупке и актуальные новости китайского автопрома. Всё, что нужно знать перед тем, как принять решение.
                  </p>
                  <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                    <button className="btn-primary" onClick={() => setPage("articles")}>
                      Читать статьи
                    </button>
                    <button className="btn-outline" onClick={() => setPage("categories")}>
                      Категории
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats bar */}
              <div style={{ maxWidth: 1280, margin: "60px auto 0" }}>
                <div style={{
                  display: "flex", gap: 0, borderTop: "1px solid #2a2a2a", paddingTop: 40,
                  flexWrap: "wrap",
                }}>
                  {[
                    { value: "150+", label: "Статей в базе", color: "#e53935" },
                    { value: "30", label: "Марок автомобилей", color: "#1565c0" },
                    { value: "24/7", label: "Свежие новости", color: "#2e7d32" },
                    { value: "50К+", label: "Читателей в месяц", color: "#f57c00" },
                  ].map((stat, i) => (
                    <div key={i} style={{
                      flex: "1 1 150px", padding: "0 32px 0 0",
                      borderRight: i < 3 ? "1px solid #2a2a2a" : "none",
                      marginRight: i < 3 ? 32 : 0,
                    }}>
                      <div style={{ fontSize: 36, fontWeight: 900, color: stat.color, fontFamily: "Montserrat" }}>
                        {stat.value}
                      </div>
                      <div style={{ fontSize: 12, color: "#666", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4 }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Latest + Popular */}
            <section style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 48 }} className="md:grid">
                
                {/* Latest articles */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
                    <h2 style={{ fontFamily: "Montserrat", fontWeight: 800, fontSize: 22, color: "#fff", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      <span className="red-line" />
                      Последние статьи
                    </h2>
                    <button onClick={() => setPage("articles")} style={{
                      background: "none", border: "none", cursor: "pointer",
                      color: "#e53935", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em",
                      textTransform: "uppercase", fontFamily: "Montserrat",
                      display: "flex", alignItems: "center", gap: 4,
                    }}>
                      Все статьи <Icon name="ArrowRight" size={14} />
                    </button>
                  </div>

                  {/* Featured card */}
                  <div
                    onClick={() => handleArticleClick(ARTICLES[0])}
                    style={{
                      background: "#1e1e1e", border: "1px solid #2a2a2a", borderRadius: 6,
                      overflow: "hidden", cursor: "pointer", marginBottom: 24,
                      transition: "border-color 0.2s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = "#e53935")}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = "#2a2a2a")}
                  >
                    <div style={{ padding: 28 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                        <span style={{
                          background: "#e53935", color: "#fff", padding: "3px 10px",
                          borderRadius: 2, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em",
                        }}>
                          {ARTICLES[0].category}
                        </span>
                        <span style={{ color: "#555", fontSize: 12 }}>
                          <Icon name="Clock" size={12} style={{ display: "inline", marginRight: 4 }} />
                          {ARTICLES[0].readTime}
                        </span>
                      </div>
                      <h3 style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: 22, color: "#fff", lineHeight: 1.3, marginBottom: 12 }}>
                        {ARTICLES[0].title}
                      </h3>
                      <p style={{ color: "#888", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
                        {ARTICLES[0].excerpt}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ width: 30, height: 30, background: "#e53935", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Icon name="User" size={14} color="#fff" />
                          </div>
                          <div>
                            <div style={{ color: "#ccc", fontSize: 13, fontWeight: 600 }}>{ARTICLES[0].author}</div>
                            <div style={{ color: "#555", fontSize: 11 }}>{ARTICLES[0].date}</div>
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#555", fontSize: 13 }}>
                          <Icon name="MessageCircle" size={14} />
                          {ARTICLES[0].comments}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rest of articles */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    {ARTICLES.slice(1, 5).map(article => (
                      <div
                        key={article.id}
                        onClick={() => handleArticleClick(article)}
                        style={{
                          background: "#1e1e1e", border: "1px solid #2a2a2a", borderRadius: 6,
                          padding: 20, cursor: "pointer", transition: "border-color 0.2s",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.borderColor = "#e53935")}
                        onMouseLeave={e => (e.currentTarget.style.borderColor = "#2a2a2a")}
                      >
                        <span style={{
                          background: CATEGORY_COLORS[article.category] || "#333",
                          color: "#fff", padding: "2px 8px",
                          borderRadius: 2, fontSize: 10, fontWeight: 700, textTransform: "uppercase",
                          letterSpacing: "0.08em", display: "inline-block", marginBottom: 10,
                        }}>
                          {article.category}
                        </span>
                        <h4 style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: 14, color: "#fff", lineHeight: 1.4, marginBottom: 10 }}>
                          {article.title}
                        </h4>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#555", fontSize: 12 }}>
                          <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                            <Icon name="Clock" size={11} />
                            {article.readTime}
                          </span>
                          <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                            <Icon name="MessageCircle" size={11} />
                            {article.comments}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sidebar */}
                <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                  
                  {/* Popular */}
                  <div>
                    <h3 style={{ fontFamily: "Montserrat", fontWeight: 800, fontSize: 16, color: "#fff", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 20, paddingBottom: 12, borderBottom: "2px solid #e53935", display: "inline-block" }}>
                      Популярное
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                      {POPULAR.map((article, i) => (
                        <div
                          key={article.id}
                          onClick={() => handleArticleClick(article)}
                          style={{
                            padding: "16px 0", borderBottom: "1px solid #222", cursor: "pointer",
                            display: "flex", gap: 12, alignItems: "flex-start",
                          }}
                        >
                          <span style={{ fontSize: 28, fontWeight: 900, color: "#2a2a2a", fontFamily: "Montserrat", lineHeight: 1, minWidth: 32 }}>
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <span style={{
                              fontSize: 10, fontWeight: 700, textTransform: "uppercase",
                              color: CATEGORY_COLORS[article.category] || "#e53935",
                              letterSpacing: "0.08em", display: "block", marginBottom: 4,
                            }}>
                              {article.category}
                            </span>
                            <p style={{ fontSize: 13, color: "#ccc", fontWeight: 600, lineHeight: 1.4 }}>
                              {article.title}
                            </p>
                            <span style={{ fontSize: 11, color: "#555", marginTop: 4, display: "block" }}>
                              {article.date}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Categories */}
                  <div style={{ background: "#1e1e1e", border: "1px solid #2a2a2a", borderRadius: 6, padding: 24 }}>
                    <h3 style={{ fontFamily: "Montserrat", fontWeight: 800, fontSize: 16, color: "#fff", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>
                      Категории
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {CATEGORIES.slice(1).map(cat => (
                        <button
                          key={cat}
                          onClick={() => { setActiveCategory(cat); setPage("articles"); }}
                          style={{
                            background: "none", border: "1px solid #2a2a2a", borderRadius: 4,
                            padding: "10px 14px", cursor: "pointer", textAlign: "left",
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            transition: "all 0.2s",
                            color: "#ccc", fontSize: 13, fontWeight: 600, fontFamily: "Montserrat",
                          }}
                          onMouseEnter={e => {
                            (e.currentTarget as HTMLButtonElement).style.borderColor = "#e53935";
                            (e.currentTarget as HTMLButtonElement).style.color = "#e53935";
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLButtonElement).style.borderColor = "#2a2a2a";
                            (e.currentTarget as HTMLButtonElement).style.color = "#ccc";
                          }}
                        >
                          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ width: 8, height: 8, borderRadius: "50%", background: CATEGORY_COLORS[cat] || "#e53935", display: "inline-block" }} />
                            {cat}
                          </span>
                          <Icon name="ChevronRight" size={14} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div style={{
                    background: "linear-gradient(135deg, #c62828, #e53935)",
                    borderRadius: 6, padding: 24, textAlign: "center",
                  }}>
                    <Icon name="Car" size={32} color="rgba(255,255,255,0.7)" />
                    <h3 style={{ fontFamily: "Montserrat", fontWeight: 800, fontSize: 18, color: "#fff", marginTop: 12, marginBottom: 8 }}>
                      Подобрать авто
                    </h3>
                    <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, lineHeight: 1.5, marginBottom: 16 }}>
                      Поможем выбрать и пригнать авто из Китая под ваш бюджет
                    </p>
                    <button style={{
                      background: "#fff", color: "#e53935", border: "none", borderRadius: 4,
                      padding: "10px 20px", fontSize: 13, fontWeight: 800, cursor: "pointer",
                      textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "Montserrat",
                      width: "100%",
                    }}>
                      Консультация эксперта
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ===== ARTICLES ===== */}
        {page === "articles" && (
          <div className="animate-fade-in">
            {/* Page header */}
            <div style={{ borderBottom: "1px solid #2a2a2a", padding: "40px 24px 0" }}>
              <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                <p className="section-label" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <span className="red-line" />
                  Все материалы
                </p>
                <h1 style={{ fontFamily: "Montserrat", fontWeight: 900, fontSize: 48, color: "#fff", textTransform: "uppercase", marginBottom: 32 }}>
                  Статьи
                </h1>
                
                {/* Category filter */}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", paddingBottom: 0 }}>
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      style={{
                        padding: "10px 20px", fontSize: 12, fontWeight: 700,
                        textTransform: "uppercase", letterSpacing: "0.08em",
                        border: "none", cursor: "pointer", fontFamily: "Montserrat",
                        background: activeCategory === cat ? "#e53935" : "#222",
                        color: activeCategory === cat ? "#fff" : "#aaa",
                        borderRadius: "4px 4px 0 0",
                        borderBottom: activeCategory === cat ? "3px solid #e53935" : "3px solid transparent",
                        transition: "all 0.2s",
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 24px" }}>
              {filteredArticles.length === 0 ? (
                <div style={{ textAlign: "center", padding: "80px 0", color: "#555" }}>
                  <Icon name="Search" size={48} />
                  <p style={{ marginTop: 16, fontSize: 16 }}>Статей не найдено</p>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 24 }}>
                  {filteredArticles.map(article => (
                    <div
                      key={article.id}
                      onClick={() => handleArticleClick(article)}
                      style={{
                        background: "#1e1e1e", border: "1px solid #2a2a2a", borderRadius: 6,
                        overflow: "hidden", cursor: "pointer", transition: "all 0.25s",
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLDivElement).style.borderColor = "#e53935";
                        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLDivElement).style.borderColor = "#2a2a2a";
                        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                      }}
                    >
                      {/* Color top bar */}
                      <div style={{ height: 4, background: CATEGORY_COLORS[article.category] || "#e53935" }} />
                      
                      <div style={{ padding: 24 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                          <span style={{
                            background: CATEGORY_COLORS[article.category] || "#e53935",
                            color: "#fff", padding: "3px 10px", borderRadius: 2,
                            fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em",
                          }}>
                            {article.category}
                          </span>
                          <span style={{ color: "#555", fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}>
                            <Icon name="Clock" size={11} />
                            {article.readTime}
                          </span>
                        </div>
                        
                        <h3 style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: 17, color: "#fff", lineHeight: 1.4, marginBottom: 12 }}>
                          {article.title}
                        </h3>
                        <p style={{ color: "#777", fontSize: 13, lineHeight: 1.7, marginBottom: 20 }}>
                          {article.excerpt}
                        </p>
                        
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 16, borderTop: "1px solid #2a2a2a" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ width: 26, height: 26, background: "#333", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <Icon name="User" size={12} color="#999" />
                            </div>
                            <div>
                              <div style={{ color: "#ccc", fontSize: 12, fontWeight: 600 }}>{article.author}</div>
                              <div style={{ color: "#555", fontSize: 11 }}>{article.date}</div>
                            </div>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#555", fontSize: 12 }}>
                            <Icon name="MessageCircle" size={12} />
                            {article.comments}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== CATEGORIES ===== */}
        {page === "categories" && (
          <div className="animate-fade-in">
            <div style={{ borderBottom: "1px solid #2a2a2a", padding: "40px 24px" }}>
              <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                <p className="section-label" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <span className="red-line" />
                  Навигация
                </p>
                <h1 style={{ fontFamily: "Montserrat", fontWeight: 900, fontSize: 48, color: "#fff", textTransform: "uppercase" }}>
                  Категории
                </h1>
              </div>
            </div>
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
                {CATEGORIES.slice(1).map(cat => {
                  const catArticles = ARTICLES.filter(a => a.category === cat);
                  return (
                    <div
                      key={cat}
                      onClick={() => { setActiveCategory(cat); setPage("articles"); }}
                      style={{
                        background: "#1e1e1e", border: "1px solid #2a2a2a", borderRadius: 6,
                        padding: 28, cursor: "pointer", transition: "all 0.25s",
                        borderTop: `4px solid ${CATEGORY_COLORS[cat] || "#e53935"}`,
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLDivElement).style.borderLeftColor = CATEGORY_COLORS[cat] || "#e53935";
                        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLDivElement).style.borderLeftColor = "#2a2a2a";
                        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                        <div style={{ width: 40, height: 40, background: CATEGORY_COLORS[cat] || "#e53935", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Icon name={cat === "Аналитика" ? "BarChart2" : cat === "Обзоры" ? "Star" : cat === "Советы" ? "Lightbulb" : cat === "Новости" ? "Rss" : "Cpu"} size={20} color="#fff" />
                        </div>
                        <div>
                          <h3 style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: 18, color: "#fff" }}>{cat}</h3>
                          <span style={{ color: "#555", fontSize: 12 }}>{catArticles.length} статей</span>
                        </div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        {catArticles.slice(0, 2).map(a => (
                          <p key={a.id} style={{ color: "#777", fontSize: 12, lineHeight: 1.4 }}>• {a.title}</p>
                        ))}
                      </div>
                      <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 4, color: CATEGORY_COLORS[cat] || "#e53935", fontSize: 12, fontWeight: 700 }}>
                        Открыть <Icon name="ArrowRight" size={12} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ===== ARCHIVE ===== */}
        {page === "archive" && (
          <div className="animate-fade-in">
            <div style={{ borderBottom: "1px solid #2a2a2a", padding: "40px 24px" }}>
              <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                <p className="section-label" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <span className="red-line" />
                  История публикаций
                </p>
                <h1 style={{ fontFamily: "Montserrat", fontWeight: 900, fontSize: 48, color: "#fff", textTransform: "uppercase" }}>
                  Архив
                </h1>
              </div>
            </div>
            <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px" }}>
              {ARCHIVE.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "20px 0", borderBottom: "1px solid #222",
                    cursor: "pointer", transition: "all 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.paddingLeft = "12px")}
                  onMouseLeave={e => (e.currentTarget.style.paddingLeft = "0")}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                    <div style={{ width: 4, height: 48, background: "#e53935", borderRadius: 2 }} />
                    <div>
                      <div style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: 18, color: "#fff" }}>{item.month}</div>
                      <div style={{ color: "#555", fontSize: 13 }}>{item.count} публикаций</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#e53935" }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>Открыть</span>
                    <Icon name="ChevronRight" size={16} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== ABOUT ===== */}
        {page === "about" && (
          <div className="animate-fade-in">
            <div style={{ borderBottom: "1px solid #2a2a2a", padding: "40px 24px" }}>
              <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                <p className="section-label" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <span className="red-line" />
                  Команда
                </p>
                <h1 style={{ fontFamily: "Montserrat", fontWeight: 900, fontSize: 48, color: "#fff", textTransform: "uppercase" }}>
                  Об авторах
                </h1>
              </div>
            </div>
            <div style={{ maxWidth: 1000, margin: "0 auto", padding: "60px 24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 32 }}>
                {[
                  { name: "Алексей Громов", role: "Главный редактор", topics: "Аналитика, технологии", articles: 48 },
                  { name: "Мария Соколова", role: "Автомобильный критик", topics: "Обзоры, тест-драйвы", articles: 36 },
                  { name: "Дмитрий Петров", role: "Специальный корреспондент", topics: "Советы, репортажи", articles: 29 },
                  { name: "Наталья Кузнецова", role: "Новостной редактор", topics: "Новости, события", articles: 61 },
                ].map((author, i) => (
                  <div key={i} style={{ background: "#1e1e1e", border: "1px solid #2a2a2a", borderRadius: 6, padding: 28, textAlign: "center" }}>
                    <div style={{ width: 72, height: 72, background: "linear-gradient(135deg, #c62828, #e53935)", borderRadius: "50%", margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon name="User" size={32} color="#fff" />
                    </div>
                    <h3 style={{ fontFamily: "Montserrat", fontWeight: 800, fontSize: 18, color: "#fff", marginBottom: 4 }}>{author.name}</h3>
                    <p style={{ color: "#e53935", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>{author.role}</p>
                    <p style={{ color: "#666", fontSize: 13, marginBottom: 16 }}>{author.topics}</p>
                    <div style={{ background: "#222", borderRadius: 4, padding: "10px", display: "inline-block" }}>
                      <span style={{ color: "#e53935", fontWeight: 900, fontSize: 20, fontFamily: "Montserrat" }}>{author.articles}</span>
                      <span style={{ color: "#555", fontSize: 11, display: "block" }}>статей</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== CONTACTS ===== */}
        {page === "contacts" && (
          <div className="animate-fade-in">
            <div style={{ borderBottom: "1px solid #2a2a2a", padding: "40px 24px" }}>
              <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                <p className="section-label" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <span className="red-line" />
                  Связь с нами
                </p>
                <h1 style={{ fontFamily: "Montserrat", fontWeight: 900, fontSize: 48, color: "#fff", textTransform: "uppercase" }}>
                  Контакты
                </h1>
              </div>
            </div>
            <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px 24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
                <div>
                  <h2 style={{ fontFamily: "Montserrat", fontWeight: 800, fontSize: 22, color: "#fff", marginBottom: 24, textTransform: "uppercase" }}>
                    Написать нам
                  </h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {[
                      { icon: "Phone", label: "Телефон", value: "+375 29 639 73 78" },
                      { icon: "Mail", label: "Email", value: "blog@avmmotors.by" },
                      { icon: "MapPin", label: "Адрес", value: "Минск, Беларусь" },
                    ].map((contact, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: 16, background: "#1e1e1e", border: "1px solid #2a2a2a", borderRadius: 6 }}>
                        <div style={{ width: 40, height: 40, background: "#e53935", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Icon name={contact.icon} size={18} color="#fff" />
                        </div>
                        <div>
                          <div style={{ color: "#555", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>{contact.label}</div>
                          <div style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>{contact.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 style={{ fontFamily: "Montserrat", fontWeight: 800, fontSize: 22, color: "#fff", marginBottom: 24, textTransform: "uppercase" }}>
                    Предложить тему
                  </h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <input
                      type="text"
                      placeholder="Ваше имя"
                      style={{ background: "#1e1e1e", border: "1px solid #2a2a2a", color: "#fff", padding: "12px 16px", borderRadius: 4, fontSize: 14, fontFamily: "Montserrat", outline: "none" }}
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      style={{ background: "#1e1e1e", border: "1px solid #2a2a2a", color: "#fff", padding: "12px 16px", borderRadius: 4, fontSize: 14, fontFamily: "Montserrat", outline: "none" }}
                    />
                    <textarea
                      placeholder="Ваша идея для статьи..."
                      rows={4}
                      style={{ background: "#1e1e1e", border: "1px solid #2a2a2a", color: "#fff", padding: "12px 16px", borderRadius: 4, fontSize: 14, fontFamily: "Montserrat", outline: "none", resize: "vertical" }}
                    />
                    <button className="btn-primary" style={{ width: "100%" }}>
                      Отправить
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ARTICLE ===== */}
        {page === "article" && (
          <div className="animate-fade-in">
            {/* Breadcrumb */}
            <div style={{ borderBottom: "1px solid #2a2a2a", padding: "16px 24px" }}>
              <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", gap: 8 }}>
                <button onClick={() => setPage("home")} style={{ background: "none", border: "none", cursor: "pointer", color: "#555", fontSize: 13, fontFamily: "Montserrat" }}>
                  Главная
                </button>
                <Icon name="ChevronRight" size={12} color="#555" />
                <button onClick={() => setPage("articles")} style={{ background: "none", border: "none", cursor: "pointer", color: "#555", fontSize: 13, fontFamily: "Montserrat" }}>
                  Статьи
                </button>
                <Icon name="ChevronRight" size={12} color="#555" />
                <span style={{ color: "#e53935", fontSize: 13, fontFamily: "Montserrat" }}>{selectedArticle.category}</span>
              </div>
            </div>

            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 24px", display: "grid", gridTemplateColumns: "1fr 320px", gap: 48 }}>
              
              {/* Article content */}
              <div>
                {/* Header */}
                <div style={{ marginBottom: 32 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <span style={{
                      background: CATEGORY_COLORS[selectedArticle.category] || "#e53935",
                      color: "#fff", padding: "4px 12px", borderRadius: 2,
                      fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em",
                    }}>
                      {selectedArticle.category}
                    </span>
                    <span style={{ color: "#555", fontSize: 13 }}>{selectedArticle.date}</span>
                    <span style={{ color: "#555", fontSize: 13, display: "flex", alignItems: "center", gap: 4 }}>
                      <Icon name="Clock" size={12} />
                      {selectedArticle.readTime}
                    </span>
                  </div>
                  <h1 style={{ fontFamily: "Montserrat", fontWeight: 900, fontSize: "clamp(28px, 4vw, 42px)", color: "#fff", lineHeight: 1.2, marginBottom: 20 }}>
                    {selectedArticle.title}
                  </h1>
                  <p style={{ fontSize: 18, color: "#888", lineHeight: 1.7 }}>
                    {selectedArticle.excerpt}
                  </p>
                </div>

                {/* Author */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 0", borderTop: "1px solid #2a2a2a", borderBottom: "1px solid #2a2a2a", marginBottom: 32 }}>
                  <div style={{ width: 40, height: 40, background: "linear-gradient(135deg, #c62828, #e53935)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name="User" size={18} color="#fff" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: "#fff", fontSize: 14, fontFamily: "Montserrat" }}>{selectedArticle.author}</div>
                    <div style={{ color: "#555", fontSize: 12 }}>Автор статьи</div>
                  </div>
                  <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                    {["Twitter", "Facebook", "Link"].map(s => (
                      <button key={s} style={{ width: 34, height: 34, background: "#222", border: "1px solid #333", borderRadius: 4, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon name={s === "Link" ? "Link2" : s === "Twitter" ? "Twitter" : "Facebook"} size={14} color="#888" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Article text */}
                <div style={{ fontSize: 16, color: "#bbb", lineHeight: 1.9 }}>
                  <p style={{ marginBottom: 20 }}>
                    {selectedArticle.excerpt} Это развёрнутый материал, в котором мы рассматриваем все аспекты темы максимально подробно. Мы изучили десятки источников, пообщались с экспертами и провели собственное исследование.
                  </p>
                  
                  <h2 style={{ fontFamily: "Montserrat", fontWeight: 800, fontSize: 22, color: "#fff", textTransform: "uppercase", margin: "32px 0 16px", paddingLeft: 16, borderLeft: "4px solid #e53935" }}>
                    Основные факты
                  </h2>
                  <p style={{ marginBottom: 20 }}>
                    Цифры говорят сами за себя. В 2025 году рынок показал беспрецедентный рост. Аналитики сходятся во мнении: тренд продолжится ещё минимум три года. Вот что это означает для обычных покупателей и для отрасли в целом.
                  </p>
                  
                  <div style={{ background: "#1e1e1e", border: "1px solid #2a2a2a", borderLeft: "4px solid #e53935", padding: "20px 24px", borderRadius: "0 6px 6px 0", margin: "28px 0", fontStyle: "italic", color: "#ccc", fontSize: 17 }}>
                    «Китайский автопром прошёл путь за 10 лет, на который немецким производителям потребовалось 50 лет. Это не просто рост — это революция.»
                  </div>
                  
                  <h2 style={{ fontFamily: "Montserrat", fontWeight: 800, fontSize: 22, color: "#fff", textTransform: "uppercase", margin: "32px 0 16px", paddingLeft: 16, borderLeft: "4px solid #e53935" }}>
                    Что дальше
                  </h2>
                  <p style={{ marginBottom: 20 }}>
                    Прогнозы экспертов оптимистичны. Развитие электромобильной инфраструктуры, снижение стоимости батарей и рост качества сборки делают китайские автомобили всё более привлекательными для покупателей в СНГ.
                  </p>
                </div>

                {/* Tags */}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 32, paddingTop: 24, borderTop: "1px solid #2a2a2a" }}>
                  {["Китай", "Автомобили", "Рынок", "2026"].map(tag => (
                    <span key={tag} style={{ background: "#222", border: "1px solid #333", color: "#888", padding: "5px 12px", borderRadius: 2, fontSize: 12, fontWeight: 600 }}>
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Comments */}
                <div style={{ marginTop: 48 }}>
                  <h2 style={{ fontFamily: "Montserrat", fontWeight: 800, fontSize: 22, color: "#fff", textTransform: "uppercase", marginBottom: 24 }}>
                    Комментарии ({comments.length})
                  </h2>

                  {/* Comment form */}
                  <div style={{ background: "#1e1e1e", border: "1px solid #2a2a2a", borderRadius: 6, padding: 24, marginBottom: 32 }}>
                    <input
                      type="text"
                      placeholder="Ваше имя"
                      value={commentName}
                      onChange={e => setCommentName(e.target.value)}
                      style={{ width: "100%", background: "#111", border: "1px solid #333", color: "#fff", padding: "10px 14px", borderRadius: 4, fontSize: 13, fontFamily: "Montserrat", outline: "none", marginBottom: 12 }}
                    />
                    <textarea
                      placeholder="Напишите комментарий..."
                      value={commentText}
                      onChange={e => setCommentText(e.target.value)}
                      rows={3}
                      style={{ width: "100%", background: "#111", border: "1px solid #333", color: "#fff", padding: "10px 14px", borderRadius: 4, fontSize: 13, fontFamily: "Montserrat", outline: "none", resize: "vertical", marginBottom: 12 }}
                    />
                    <button className="btn-primary" onClick={handleCommentSubmit}>
                      Опубликовать
                    </button>
                  </div>

                  {/* Comment list */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {comments.map(comment => (
                      <div key={comment.id} style={{ background: "#1e1e1e", border: "1px solid #2a2a2a", borderRadius: 6, padding: 20 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                          <div style={{ width: 36, height: 36, background: "#333", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Icon name="User" size={16} color="#666" />
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, color: "#fff", fontSize: 14 }}>{comment.name}</div>
                            <div style={{ color: "#555", fontSize: 11 }}>{comment.time}</div>
                          </div>
                        </div>
                        <p style={{ color: "#bbb", fontSize: 14, lineHeight: 1.6 }}>{comment.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Article sidebar */}
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <div style={{ background: "#1e1e1e", border: "1px solid #2a2a2a", borderRadius: 6, padding: 24 }}>
                  <h3 style={{ fontFamily: "Montserrat", fontWeight: 800, fontSize: 14, color: "#fff", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16, borderBottom: "2px solid #e53935", paddingBottom: 10, display: "inline-block" }}>
                    Читайте также
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                    {ARTICLES.filter(a => a.id !== selectedArticle.id).slice(0, 4).map(a => (
                      <div
                        key={a.id}
                        onClick={() => handleArticleClick(a)}
                        style={{ padding: "14px 0", borderBottom: "1px solid #222", cursor: "pointer" }}
                      >
                        <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: CATEGORY_COLORS[a.category] || "#e53935", letterSpacing: "0.08em", display: "block", marginBottom: 4 }}>
                          {a.category}
                        </span>
                        <p style={{ fontSize: 13, color: "#bbb", lineHeight: 1.4, fontWeight: 500 }}>
                          {a.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ background: "linear-gradient(135deg, #c62828, #e53935)", borderRadius: 6, padding: 24, textAlign: "center" }}>
                  <Icon name="Car" size={36} color="rgba(255,255,255,0.8)" />
                  <h3 style={{ fontFamily: "Montserrat", fontWeight: 800, fontSize: 16, color: "#fff", marginTop: 12, marginBottom: 8 }}>
                    Хотите свой авто из Китая?
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, lineHeight: 1.5, marginBottom: 16 }}>
                    Подберём, проверим и доставим под ваш бюджет
                  </p>
                  <button style={{ background: "#fff", color: "#e53935", border: "none", borderRadius: 4, padding: "10px 20px", fontSize: 12, fontWeight: 800, cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "Montserrat", width: "100%" }}>
                    Получить консультацию
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer style={{ background: "#111", borderTop: "1px solid #2a2a2a", padding: "40px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 40 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 32, height: 32, background: "#e53935", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 2 }}>
                  <Icon name="Newspaper" size={18} color="#fff" />
                </div>
                <span style={{ fontFamily: "Montserrat", fontWeight: 800, fontSize: 18, color: "#fff", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  AVM <span style={{ color: "#e53935" }}>BLOG</span>
                </span>
              </div>
              <p style={{ color: "#555", fontSize: 13, lineHeight: 1.7, maxWidth: 300 }}>
                Официальный блог AVM Motors — честные материалы о китайском автопроме, советы по покупке и актуальные новости.
              </p>
            </div>
            <div>
              <h4 style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: 13, color: "#fff", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>Разделы</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {navItems.map(item => (
                  <button key={item.id} onClick={() => setPage(item.id)} style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", color: "#666", fontSize: 13, fontFamily: "Montserrat", padding: 0, transition: "color 0.2s" }}>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: 13, color: "#fff", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>Категории</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {CATEGORIES.slice(1).map(cat => (
                  <button key={cat} onClick={() => { setActiveCategory(cat); setPage("articles"); }} style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", color: "#666", fontSize: 13, fontFamily: "Montserrat", padding: 0 }}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: 13, color: "#fff", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>Контакты</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <a href="tel:+375296397378" style={{ color: "#e53935", fontSize: 14, fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
                  <Icon name="Phone" size={14} color="#e53935" />
                  +375 29 639 73 78
                </a>
                <a href="mailto:blog@avmmotors.by" style={{ color: "#666", fontSize: 13, textDecoration: "none" }}>
                  blog@avmmotors.by
                </a>
              </div>
            </div>
          </div>
          
          <div style={{ borderTop: "1px solid #222", paddingTop: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ color: "#444", fontSize: 12 }}>© 2026 AVM Motors Blog. Все права защищены.</span>
            <span style={{ color: "#444", fontSize: 12 }}>Импорт автомобилей из Китая</span>
          </div>
        </div>
      </footer>

    </div>
  );
}