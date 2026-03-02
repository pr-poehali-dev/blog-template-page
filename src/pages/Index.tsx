import { useState } from "react";
import Icon from "@/components/ui/icon";

const CATEGORIES = ["Все", "Аналитика", "Новости", "Обзоры", "Советы", "Технологии"];

const CATEGORY_COLORS: Record<string, string> = {
  "Аналитика": "#e53935",
  "Обзоры": "#1565c0",
  "Советы": "#2e7d32",
  "Новости": "#f57c00",
  "Технологии": "#6a1b9a",
};

const CATEGORY_ICONS: Record<string, string> = {
  "Аналитика": "BarChart2",
  "Обзоры": "Star",
  "Советы": "Lightbulb",
  "Новости": "Zap",
  "Технологии": "Cpu",
};

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
    body: `Китайский автопром переживает беспрецедентный подъём. Ещё десять лет назад марки вроде BYD или Chery воспринимались как дешёвые копии западных автомобилей. Сегодня — это технологические лидеры, которые задают тренды в электромобилях, программном обеспечении и дизайне.

**Почему это происходит?**

Государственные субсидии, доступ к редкоземельным металлам и огромный внутренний рынок создали идеальные условия для роста. Китайские производители инвестируют в R&D больше, чем большинство европейских концернов.

**Что это значит для покупателей СНГ?**

Рынок наполняется качественными автомобилями по ценам значительно ниже европейских аналогов. BYD Seal конкурирует с Tesla Model 3, а стоит на 20–30% дешевле. Li Auto L9 предлагает 6-местный салон премиум-класса за деньги, сопоставимые с BMW X5.

Главный вызов — сервисная инфраструктура и долгосрочная поддержка. Но и здесь ситуация стремительно меняется: официальные дилеры открываются по всей Беларуси и России.`,
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
    body: `Li Auto L9 — это флагманский SUV с расширенным электрическим приводом (EREV). Это означает, что бензиновый двигатель работает исключительно как генератор, заряжая батарею. Результат: расход 8 л/100 км при мощности системы 560 л.с.

**Первое впечатление**

Автомобиль огромный. Длина 5,2 метра, высота почти 1,8. Войти в третий ряд — легко, вылезти — тоже. Это редкость для большинства конкурентов.

**Технологии**

Три больших экрана, включая отдельный экран для задних пассажиров. Система LIDAR для автопилота второго уровня. Подвеска с активной регулировкой клиренса.

**Минусы**

Тормозной путь мог бы быть короче при массе 2,9 тонны. Интерфейс русифицирован, но не до конца — часть меню на китайском.

**Вердикт:** 8.5/10. Если ищете семейный автомобиль без компромиссов — это серьёзный вариант.`,
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
    body: `Пригнать авто из Китая самостоятельно — реально, но требует подготовки. Вот пошаговый план.

**Шаг 1: Выбор площадки**
Основные площадки: Autohome, Yiche, Guazi (б/у). Для новых авто — официальные дилеры или посредники.

**Шаг 2: Проверка автомобиля**
Никогда не переводите деньги без инспекции. Наймите местного агента или воспользуйтесь сервисами удалённой проверки с фото/видео.

**Шаг 3: Логистика**
Морем до Владивостока — 25–35 дней. Далее автовозом или своим ходом. Стоимость доставки — $1500–3000 в зависимости от маршрута.

**Шаг 4: Таможня**
Расчёт пошлины зависит от объёма двигателя и стоимости авто. Для физлиц действуют льготные ставки при ввозе 1 авто в 3 года.

**Шаг 5: Сертификация ОТТС**
Обязательна для постановки на учёт. Стоимость — от 800 до 2000 USD. Срок — 2–4 недели.`,
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
    body: `Официальный дилер Chery в Беларуси объявил о начале продаж флагманского кроссовера Tiggo 9. Автомобиль доступен в трёх комплектациях.

**Комплектации и цены:**

- Comfort: 52 000 BYN — 2.0T, 197 л.с., базовая оснащённость
- Premium: 59 000 BYN — добавляются кожаный салон, панорамная крыша
- Ultimate: 65 000 BYN — полный фарш, LIDAR, L2+ автопилот, массаж передних сидений

**Что входит в базу:**
10.25" экран, климат-контроль, камера 360°, подогрев всех сидений.

**Сроки поставки:** 4–6 недель после оформления заказа.

Первые тест-драйвы для клиентов пройдут в марте 2026 года. Запись открыта на сайте дилера.`,
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
    body: `CATL анонсировала аккумулятор Kirin 3.0 с заявленными характеристиками: 1000 км запаса хода и зарядка до 80% за 10 минут. Звучит как фантастика. Давайте разберёмся.

**Реальные цифры**

1000 км — это в условиях CLTC (китайский цикл), который значительно оптимистичнее WLTP или EPA. В реальных условиях ожидайте 700–750 км. Всё равно впечатляет.

Зарядка за 10 минут требует зарядной станции мощностью 480 кВт+. Их пока единицы даже в Китае.

**Почему не везде?**

Производство Kirin 3.0 дорогое. Пока аккумулятор ставится только в топовые версии автомобилей стоимостью от $60 000. Массовые авто получат технологию через 3–4 года.

**Вывод**

Технология реальная и революционная. Но до массового рынка ещё далеко. Следим за развитием событий.`,
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
    body: `За 3 года работы мы помогли пригнать более 500 автомобилей. Вот ошибки, которые совершают почти все новички.

**Ошибка 1: Покупать без осмотра**
Фотографии можно подделать. Всегда заказывайте физическую инспекцию или видеозвонок с агентом на месте.

**Ошибка 2: Игнорировать конфигурацию**
Китайские авто часто имеют 10+ комплектаций. Убедитесь, что выбранная версия соответствует стандартам вашей страны (напряжение, разъёмы зарядки, документация).

**Ошибка 3: Не считать полную стоимость**
К цене авто добавьте: доставку, таможню, сертификацию, страховку. Итог может быть на 30–40% выше.

**Ошибка 4: Не проверять сервисную сеть**
Если марка не представлена официально — с запчастями будут проблемы. Проверьте наличие дилеров заранее.

**Ошибка 5: Спешить**
Рынок огромный. Не соглашайтесь на первый вариант. Потратьте 2–3 недели на выбор — сэкономите годы нервов.`,
  },
  {
    id: 7,
    category: "Обзоры",
    title: "BYD Seal vs Tesla Model 3: честное сравнение",
    excerpt: "Два самых обсуждаемых электрического седана 2026 года. Мы сравнили их вживую по 20 параметрам.",
    author: "Мария Соколова",
    date: "5 февраля 2026",
    readTime: "14 мин",
    comments: 88,
    body: `BYD Seal и Tesla Model 3 — главные конкуренты в сегменте электрических седанов. Вот наш честный разбор.

**Дизайн**
Seal выигрывает по интерьеру: больше материалов, лучше отделка. Model 3 лаконичнее, но беднее на ощупь.

**Технологии**
Tesla — лидер по программному обеспечению и автопилоту. Но BYD активно догоняет с DiPilot.

**Батарея**
Seal: Blade Battery — 700 км WLTP, безопаснее при авариях.
Model 3 LR: 629 км WLTP, зарядная сеть Supercharger вне конкуренции.

**Цена**
Seal в Беларуси: от 42 000 BYN.
Model 3 RWD: от 58 000 BYN.

**Вердикт:** Если важна цена — Seal. Если важна экосистема и сервис — Tesla.`,
  },
  {
    id: 8,
    category: "Аналитика",
    title: "Почему белорусский рынок стал лакомым куском для китайских брендов",
    excerpt: "Санкции, логистика и менталитет — разбираем, почему именно Беларусь стала воротами для китайского автопрома в СНГ.",
    author: "Алексей Громов",
    date: "1 февраля 2026",
    readTime: "10 мин",
    comments: 19,
    body: `Беларусь превратилась в один из ключевых рынков для китайских автопроизводителей в регионе. Почему?

**Санкционный контекст**
Уход европейских брендов создал вакуум. Китайские производители заполнили его быстро и агрессивно.

**Логистика**
Прямые железнодорожные маршруты Китай–Беларусь через Россию делают доставку предсказуемой и относительно дешёвой.

**Менталитет покупателей**
Белорусы традиционно ценят надёжность и соотношение цена/качество. Китайские авто нового поколения закрывают оба пункта.

**Перспективы**
К 2027 году ожидается открытие первых совместных производств и сборочных цехов на территории Беларуси.`,
  },
];

const COMMENTS_DEMO = [
  { id: 1, name: "Иван Р.", text: "Отличный материал! Давно искал такой детальный разбор.", time: "2 часа назад" },
  { id: 2, name: "Светлана К.", text: "Согласна, но хотелось бы больше примеров из реальной практики.", time: "5 часов назад" },
  { id: 3, name: "Михаил Т.", text: "Прочитал на одном дыхании. Можно ссылки на источники?", time: "вчера" },
];

type Article = typeof ARTICLES[0];

const S = {
  font: "'Montserrat', sans-serif",
  bg: "#1a1a1a",
  card: "#1e1e1e",
  border: "#2a2a2a",
  red: "#e53935",
  text: "#f0f0f0",
  muted: "#888",
  dim: "#555",
};

function ArticleBadge({ category }: { category: string }) {
  return (
    <span style={{
      background: CATEGORY_COLORS[category] || S.red,
      color: "#fff", padding: "3px 10px", borderRadius: 2,
      fontSize: 10, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em",
      display: "inline-block",
    }}>
      {category}
    </span>
  );
}

function ArticleCard({ article, onClick, featured }: { article: Article; onClick: () => void; featured?: boolean }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: S.card, border: `1px solid ${S.border}`, borderRadius: 8,
        overflow: "hidden", cursor: "pointer", transition: "all 0.2s",
        borderTop: `3px solid ${CATEGORY_COLORS[article.category] || S.red}`,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = CATEGORY_COLORS[article.category] || S.red;
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 32px rgba(0,0,0,0.4)`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = S.border;
        (e.currentTarget as HTMLDivElement).style.borderTopColor = CATEGORY_COLORS[article.category] || S.red;
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      <div style={{ padding: featured ? 28 : 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <ArticleBadge category={article.category} />
          <span style={{ color: S.dim, fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}>
            <Icon name="Clock" size={11} />
            {article.readTime}
          </span>
        </div>
        <h3 style={{
          fontFamily: S.font, fontWeight: 400,
          fontSize: featured ? 20 : 15,
          color: S.text, lineHeight: 1.4, marginBottom: 10,
        }}>
          {article.title}
        </h3>
        {featured && (
          <p style={{ color: S.muted, fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>
            {article.excerpt}
          </p>
        )}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 12, borderTop: `1px solid ${S.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 26, height: 26, background: "#333", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="User" size={12} color="#999" />
            </div>
            <div>
              <div style={{ color: "#ccc", fontSize: 12, fontWeight: 600 }}>{article.author}</div>
              <div style={{ color: S.dim, fontSize: 11 }}>{article.date}</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, color: S.dim, fontSize: 12 }}>
            <Icon name="MessageCircle" size={12} />
            {article.comments}
          </div>
        </div>
      </div>
    </div>
  );
}

function ArticleRow({ article, onClick, index }: { article: Article; onClick: () => void; index: number }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex", gap: 20, alignItems: "flex-start",
        padding: "20px 0", borderBottom: `1px solid ${S.border}`,
        cursor: "pointer", transition: "all 0.2s",
      }}
      onMouseEnter={e => (e.currentTarget.style.paddingLeft = "10px")}
      onMouseLeave={e => (e.currentTarget.style.paddingLeft = "0")}
    >
      <span style={{
        fontSize: 32, fontWeight: 900, color: "#252525",
        fontFamily: S.font, lineHeight: 1, minWidth: 40, flexShrink: 0,
      }}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <ArticleBadge category={article.category} />
          <span style={{ color: S.dim, fontSize: 11 }}>{article.date}</span>
        </div>
        <div style={{ fontFamily: S.font, fontWeight: 400, fontSize: 15, color: S.text, lineHeight: 1.4, marginBottom: 6 }}>
          {article.title}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, color: S.dim, fontSize: 12 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Icon name="Clock" size={11} />{article.readTime}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Icon name="MessageCircle" size={11} />{article.comments}
          </span>
          <span>{article.author}</span>
        </div>
      </div>
      <Icon name="ChevronRight" size={16} color={S.dim} />
    </div>
  );
}

export default function Index() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [commentText, setCommentText] = useState("");
  const [commentName, setCommentName] = useState("");
  const [comments, setComments] = useState(COMMENTS_DEMO);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = ARTICLES.filter(a =>
    (activeCategory === "Все" || a.category === activeCategory) &&
    (searchQuery === "" || a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setSelectedArticle(null);
    window.scrollTo(0, 0);
  };

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat);
    setSelectedArticle(null);
    setSearchQuery("");
    window.scrollTo(0, 0);
  };

  const handleCommentSubmit = () => {
    if (!commentText.trim() || !commentName.trim()) return;
    setComments([
      { id: comments.length + 1, name: commentName, text: commentText, time: "только что" },
      ...comments,
    ]);
    setCommentText("");
    setCommentName("");
  };

  const accentColor = activeCategory !== "Все" ? (CATEGORY_COLORS[activeCategory] || S.red) : S.red;

  return (
    <div style={{ backgroundColor: S.bg, color: S.text, fontFamily: S.font, minHeight: "100vh" }}>

      {/* ── STICKY CATEGORY NAV ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "#111", borderBottom: `1px solid ${S.border}`,
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          {/* Top row: search */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 0 0" }}>
            <div style={{ position: "relative", flex: 1, maxWidth: 400 }}>
              <Icon name="Search" size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: S.dim }} />
              <input
                type="text"
                placeholder="Поиск статей..."
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setSelectedArticle(null); setActiveCategory("Все"); }}
                style={{
                  background: "#1e1e1e", border: `1px solid ${S.border}`, color: S.text,
                  fontSize: 13, padding: "9px 14px 9px 36px", borderRadius: 6,
                  outline: "none", width: "100%", fontFamily: S.font,
                }}
              />
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              <button
                onClick={() => setViewMode("grid")}
                style={{ background: viewMode === "grid" ? "#2a2a2a" : "none", border: "none", cursor: "pointer", padding: "8px 10px", borderRadius: 4, color: viewMode === "grid" ? S.text : S.dim }}
              >
                <Icon name="LayoutGrid" size={16} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                style={{ background: viewMode === "list" ? "#2a2a2a" : "none", border: "none", cursor: "pointer", padding: "8px 10px", borderRadius: 4, color: viewMode === "list" ? S.text : S.dim }}
              >
                <Icon name="List" size={16} />
              </button>
            </div>
          </div>

          {/* Category tabs */}
          <div style={{ display: "flex", gap: 2, marginTop: 8, overflowX: "auto", scrollbarWidth: "none" }}>
            {CATEGORIES.map(cat => {
              const isActive = activeCategory === cat && !searchQuery;
              const color = cat === "Все" ? S.red : (CATEGORY_COLORS[cat] || S.red);
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  style={{
                    padding: "10px 18px", fontSize: 12, fontWeight: 700,
                    textTransform: "uppercase", letterSpacing: "0.07em",
                    border: "none", cursor: "pointer", fontFamily: S.font,
                    background: "none", whiteSpace: "nowrap" as const,
                    color: isActive ? "#fff" : S.dim,
                    borderBottom: isActive ? `3px solid ${color}` : "3px solid transparent",
                    transition: "all 0.15s",
                  }}
                >
                  {cat}
                  {cat !== "Все" && (
                    <span style={{ marginLeft: 6, fontSize: 10, opacity: 0.6 }}>
                      {ARTICLES.filter(a => a.category === cat).length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ── ARTICLE PAGE ── */}
      {selectedArticle ? (
        <div className="animate-fade-in">
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 20px" }}>
            {/* Back */}
            <button
              onClick={handleBack}
              style={{
                display: "flex", alignItems: "center", gap: 6, background: "none", border: "none",
                cursor: "pointer", color: S.muted, fontSize: 13, fontFamily: S.font,
                marginBottom: 32, padding: 0,
              }}
            >
              <Icon name="ArrowLeft" size={16} />
              Назад к статьям
            </button>

            {/* Article header */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <ArticleBadge category={selectedArticle.category} />
                <span style={{ color: S.dim, fontSize: 13, display: "flex", alignItems: "center", gap: 4 }}>
                  <Icon name="Clock" size={12} />{selectedArticle.readTime}
                </span>
                <span style={{ color: S.dim, fontSize: 13 }}>{selectedArticle.date}</span>
              </div>
              <h1 style={{
                fontFamily: S.font, fontWeight: 400, fontSize: "clamp(26px, 5vw, 40px)",
                color: S.text, lineHeight: 1.2, marginBottom: 16,
              }}>
                {selectedArticle.title}
              </h1>
              <p style={{ color: S.muted, fontSize: 16, lineHeight: 1.7, marginBottom: 24 }}>
                {selectedArticle.excerpt}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 20, borderTop: `1px solid ${S.border}` }}>
                <div style={{ width: 40, height: 40, background: `linear-gradient(135deg, #c62828, ${S.red})`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="User" size={18} color="#fff" />
                </div>
                <div>
                  <div style={{ color: S.text, fontSize: 14, fontWeight: 700 }}>{selectedArticle.author}</div>
                  <div style={{ color: S.dim, fontSize: 12 }}>{selectedArticle.date}</div>
                </div>
              </div>
            </div>

            {/* Article body */}
            <div style={{
              color: "#ccc", fontSize: 16, lineHeight: 1.9,
              borderTop: `3px solid ${CATEGORY_COLORS[selectedArticle.category] || S.red}`,
              paddingTop: 32,
            }}>
              {selectedArticle.body.split("\n\n").map((para, i) => {
                if (para.startsWith("**") && para.endsWith("**")) {
                  return (
                    <h3 key={i} style={{ fontFamily: S.font, fontWeight: 800, fontSize: 18, color: S.text, marginTop: 28, marginBottom: 12 }}>
                      {para.replace(/\*\*/g, "")}
                    </h3>
                  );
                }
                if (para.includes("**")) {
                  const parts = para.split(/(\*\*[^*]+\*\*)/g);
                  return (
                    <p key={i} style={{ marginBottom: 20 }}>
                      {parts.map((part, j) =>
                        part.startsWith("**") ? (
                          <strong key={j} style={{ color: S.text, fontWeight: 700 }}>{part.replace(/\*\*/g, "")}</strong>
                        ) : part
                      )}
                    </p>
                  );
                }
                if (para.startsWith("- ")) {
                  return (
                    <ul key={i} style={{ paddingLeft: 20, marginBottom: 20 }}>
                      {para.split("\n").map((line, j) => (
                        <li key={j} style={{ marginBottom: 8 }}>{line.replace("- ", "")}</li>
                      ))}
                    </ul>
                  );
                }
                return <p key={i} style={{ marginBottom: 20 }}>{para}</p>;
              })}
            </div>

            {/* Related articles */}
            <div style={{ marginTop: 56, paddingTop: 32, borderTop: `1px solid ${S.border}` }}>
              <h3 style={{ fontFamily: S.font, fontWeight: 800, fontSize: 16, color: S.text, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 20 }}>
                Читайте также
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {ARTICLES.filter(a => a.id !== selectedArticle.id).slice(0, 4).map((a, i) => (
                  <ArticleRow key={a.id} article={a} onClick={() => handleArticleClick(a)} index={i} />
                ))}
              </div>
            </div>

            {/* Comments */}
            <div style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${S.border}` }}>
              <h3 style={{ fontFamily: S.font, fontWeight: 800, fontSize: 16, color: S.text, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 24 }}>
                Комментарии ({comments.length})
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 28 }}>
                {comments.map(c => (
                  <div key={c.id} style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 8, padding: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <div style={{ width: 30, height: 30, background: "#333", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon name="User" size={13} color="#777" />
                      </div>
                      <span style={{ color: S.text, fontSize: 13, fontWeight: 700 }}>{c.name}</span>
                      <span style={{ color: S.dim, fontSize: 12 }}>{c.time}</span>
                    </div>
                    <p style={{ color: S.muted, fontSize: 14, lineHeight: 1.6, margin: 0 }}>{c.text}</p>
                  </div>
                ))}
              </div>
              <div style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 8, padding: 20 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    value={commentName}
                    onChange={e => setCommentName(e.target.value)}
                    style={{ background: "#252525", border: `1px solid ${S.border}`, color: S.text, padding: "10px 14px", borderRadius: 6, fontSize: 14, fontFamily: S.font, outline: "none" }}
                  />
                  <textarea
                    placeholder="Оставьте комментарий..."
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    rows={3}
                    style={{ background: "#252525", border: `1px solid ${S.border}`, color: S.text, padding: "10px 14px", borderRadius: 6, fontSize: 14, fontFamily: S.font, outline: "none", resize: "vertical" as const }}
                  />
                  <button
                    onClick={handleCommentSubmit}
                    style={{
                      background: S.red, color: "#fff", border: "none", borderRadius: 6,
                      padding: "12px 24px", fontSize: 13, fontWeight: 700, cursor: "pointer",
                      fontFamily: S.font, textTransform: "uppercase", letterSpacing: "0.06em",
                      alignSelf: "flex-start",
                    }}
                  >
                    Отправить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ── ARTICLES LIST ── */
        <div className="animate-fade-in">
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 20px" }}>

            {/* Section title */}
            {activeCategory === "Все" && !searchQuery && (
              <div style={{ marginBottom: 36 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 4 }}>
                  <div style={{ width: 40, height: 1, background: S.red }} />
                  <span style={{
                    fontFamily: S.font, fontWeight: 400, fontSize: 13,
                    color: S.red, textTransform: "uppercase", letterSpacing: "0.18em",
                  }}>
                    Блог AVM Motors
                  </span>
                </div>
              </div>
            )}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  {activeCategory !== "Все" && (
                    <div style={{ width: 8, height: 8, background: accentColor, borderRadius: "50%" }} />
                  )}
                  <h1 style={{ fontFamily: S.font, fontWeight: 400, fontSize: 28, color: S.text, textTransform: "uppercase", margin: 0 }}>
                    {searchQuery ? `Поиск: «${searchQuery}»` : activeCategory === "Все" ? "Все статьи" : activeCategory}
                  </h1>
                </div>
                <div style={{ color: S.dim, fontSize: 13 }}>
                  {filtered.length} {filtered.length === 1 ? "статья" : filtered.length < 5 ? "статьи" : "статей"}
                </div>
              </div>
              {activeCategory !== "Все" && (
                <button
                  onClick={() => handleCategoryClick("Все")}
                  style={{ background: "none", border: `1px solid ${S.border}`, color: S.dim, cursor: "pointer", padding: "8px 14px", borderRadius: 6, fontSize: 12, fontFamily: S.font, display: "flex", alignItems: "center", gap: 6 }}
                >
                  <Icon name="X" size={13} /> Сбросить
                </button>
              )}
            </div>

            {/* Category quick-filters (chips) */}
            {activeCategory === "Все" && !searchQuery && (
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
                {CATEGORIES.slice(1).map(cat => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    style={{
                      display: "flex", alignItems: "center", gap: 8,
                      background: S.card, border: `1px solid ${S.border}`,
                      borderRadius: 999, padding: "8px 16px", cursor: "pointer",
                      fontFamily: S.font, fontSize: 13, fontWeight: 600, color: S.muted,
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = CATEGORY_COLORS[cat] || S.red;
                      (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = S.border;
                      (e.currentTarget as HTMLButtonElement).style.color = S.muted;
                    }}
                  >
                    <Icon name={CATEGORY_ICONS[cat]} size={14} color={CATEGORY_COLORS[cat] || S.red} />
                    {cat}
                    <span style={{ background: "#252525", borderRadius: 999, padding: "1px 7px", fontSize: 11, color: S.dim }}>
                      {ARTICLES.filter(a => a.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 0", color: S.dim }}>
                <Icon name="SearchX" size={48} color={S.border} />
                <p style={{ marginTop: 16, fontSize: 16 }}>Ничего не найдено</p>
                <button onClick={() => { setSearchQuery(""); setActiveCategory("Все"); }} style={{ marginTop: 12, background: "none", border: `1px solid ${S.border}`, color: S.muted, cursor: "pointer", padding: "8px 20px", borderRadius: 6, fontFamily: S.font, fontSize: 13 }}>
                  Сбросить фильтры
                </button>
              </div>
            ) : viewMode === "grid" ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
                {filtered.map((article, i) => (
                  <ArticleCard key={article.id} article={article} onClick={() => handleArticleClick(article)} featured={i === 0 && activeCategory === "Все" && !searchQuery} />
                ))}
              </div>
            ) : (
              <div>
                {filtered.map((article, i) => (
                  <ArticleRow key={article.id} article={article} onClick={() => handleArticleClick(article)} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}