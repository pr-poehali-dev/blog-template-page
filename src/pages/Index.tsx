import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { ARTICLES, CATEGORY_COLORS, Article } from "@/data/articles";
import { ArticleCard, ArticleRow } from "@/components/blog/ArticleCard";
import { ArticlePage } from "@/components/blog/ArticlePage";
import { BlogNav, CategoryChips } from "@/components/blog/BlogNav";

const S = {
  font: "'Montserrat', sans-serif",
  bg: "#1a1a1a",
  border: "#2a2a2a",
  red: "#e53935",
  text: "#f0f0f0",
  muted: "#888",
  dim: "#555",
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

function pluralArticles(n: number) {
  if (n === 1) return "статья";
  if (n >= 2 && n <= 4) return "статьи";
  return "статей";
}

export default function Index() {
  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState("Все");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = ARTICLES.filter(a =>
    (activeCategory === "Все" || a.category === activeCategory) &&
    (searchQuery === "" ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const accentColor = activeCategory !== "Все" ? (CATEGORY_COLORS[activeCategory] || S.red) : S.red;

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

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    setSelectedArticle(null);
    setActiveCategory("Все");
  };

  const pageTitle = selectedArticle
    ? `${selectedArticle.title} — AVM Motors Blog`
    : activeCategory !== "Все"
    ? `${activeCategory} — Блог AVM Motors`
    : "Блог AVM Motors — китайские автомобили в Беларуси";

  const pageDescription = selectedArticle
    ? selectedArticle.excerpt
    : "Обзоры, аналитика и советы о китайских автомобилях. BYD, Li Auto, Chery — всё о китайском автопроме для покупателей в Беларуси и СНГ.";

  useEffect(() => {
    document.title = pageTitle;
    const setMeta = (name: string, content: string, prop = false) => {
      const attr = prop ? "property" : "name";
      let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("description", pageDescription);
    setMeta("og:title", pageTitle, true);
    setMeta("og:description", pageDescription, true);
    setMeta("og:type", selectedArticle ? "article" : "website", true);
    if (selectedArticle?.image) setMeta("og:image", selectedArticle.image, true);

    const buildJsonLd = () => {
      if (selectedArticle) {
        return {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": selectedArticle.title,
          "description": selectedArticle.excerpt,
          "image": selectedArticle.image ?? "",
          "datePublished": selectedArticle.date,
          "timeRequired": `PT${parseInt(selectedArticle.readTime)}M`,
          "author": {
            "@type": "Person",
            "name": selectedArticle.author
          },
          "publisher": {
            "@type": "Organization",
            "name": "AVM Motors",
            "url": "https://avmmotors.by"
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": window.location.href
          },
          "articleSection": selectedArticle.category,
          "commentCount": selectedArticle.comments,
          "inLanguage": "ru"
        };
      }
      return {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Блог AVM Motors",
        "description": "Обзоры, аналитика и советы о китайских автомобилях для покупателей в Беларуси и СНГ",
        "url": window.location.href,
        "publisher": {
          "@type": "Organization",
          "name": "AVM Motors",
          "url": "https://avmmotors.by"
        },
        "inLanguage": "ru",
        "blogPost": ARTICLES.map(a => ({
          "@type": "BlogPosting",
          "headline": a.title,
          "description": a.excerpt,
          "datePublished": a.date,
          "image": a.image ?? "",
          "author": { "@type": "Person", "name": a.author },
          "articleSection": a.category
        }))
      };
    };

    let el = document.querySelector<HTMLScriptElement>('script[data-jsonld="blog"]');
    if (!el) {
      el = document.createElement("script");
      el.setAttribute("type", "application/ld+json");
      el.setAttribute("data-jsonld", "blog");
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(buildJsonLd());

    return () => {
      const s = document.querySelector('script[data-jsonld="blog"]');
      if (s) s.remove();
    };
  }, [pageTitle, pageDescription, selectedArticle]);

  return (
    <>
      <div
        style={{ backgroundColor: S.bg, color: S.text, fontFamily: S.font, minHeight: "100vh" }}
        itemScope
        itemType="https://schema.org/Blog"
      >
        <meta itemProp="name" content="Блог AVM Motors" />
        <meta itemProp="description" content="Обзоры и аналитика китайских автомобилей для покупателей в Беларуси" />

        <BlogNav
          activeCategory={activeCategory}
          searchQuery={searchQuery}
          viewMode={viewMode}
          isMobile={isMobile}
          onCategoryClick={handleCategoryClick}
          onSearch={handleSearch}
          onViewModeChange={setViewMode}
        />

        {selectedArticle ? (
          <ArticlePage
            article={selectedArticle}
            onBack={handleBack}
            onArticleClick={handleArticleClick}
            isMobile={isMobile}
          />
        ) : (
          <div className="animate-fade-in">
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "20px 16px" : "32px 20px" }}>

              {/* Section header */}
              {activeCategory === "Все" && !searchQuery && (
                <div style={{ marginBottom: 36 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 4 }}>
                    <div style={{ width: 40, height: 1, background: S.red }} />
                    <span style={{ fontFamily: S.font, fontWeight: 400, fontSize: 13, color: S.red, textTransform: "uppercase", letterSpacing: "0.18em" }}>
                      Блог AVM Motors
                    </span>
                  </div>
                </div>
              )}

              {/* Title bar */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    {activeCategory !== "Все" && (
                      <div aria-hidden="true" style={{ width: 8, height: 8, background: accentColor, borderRadius: "50%" }} />
                    )}
                    <h1 style={{ fontFamily: S.font, fontWeight: 400, fontSize: isMobile ? 22 : 28, color: S.text, textTransform: "uppercase", margin: 0 }}>
                      {searchQuery ? `Поиск: «${searchQuery}»` : activeCategory === "Все" ? "Все статьи" : activeCategory}
                    </h1>
                  </div>
                  <p style={{ color: S.dim, fontSize: 13, margin: 0 }}>
                    {filtered.length} {pluralArticles(filtered.length)}
                  </p>
                </div>

                {activeCategory !== "Все" && (
                  <button
                    onClick={() => handleCategoryClick("Все")}
                    aria-label="Сбросить фильтр по категории"
                    style={{ background: "none", border: `1px solid ${S.border}`, color: S.dim, cursor: "pointer", padding: "8px 14px", borderRadius: 6, fontSize: 12, fontFamily: S.font, display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <Icon name="X" size={13} /> Сбросить
                  </button>
                )}
              </div>

              {/* Category chips (shown only on "Все" without search) */}
              {activeCategory === "Все" && !searchQuery && (
                <CategoryChips isMobile={isMobile} onCategoryClick={handleCategoryClick} />
              )}

              {/* Articles grid / list / empty */}
              {filtered.length === 0 ? (
                <div style={{ textAlign: "center", padding: "80px 0", color: S.dim }}>
                  <Icon name="SearchX" size={48} color={S.border} />
                  <p style={{ marginTop: 16, fontSize: 16 }}>Ничего не найдено</p>
                  <button
                    onClick={() => { setSearchQuery(""); setActiveCategory("Все"); }}
                    style={{ marginTop: 12, background: "none", border: `1px solid ${S.border}`, color: S.muted, cursor: "pointer", padding: "8px 20px", borderRadius: 6, fontFamily: S.font, fontSize: 13 }}
                  >
                    Сбросить фильтры
                  </button>
                </div>
              ) : viewMode === "grid" ? (
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(320px, 1fr))", gap: isMobile ? 14 : 20 }}>
                  {filtered.map((article, i) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      onClick={() => handleArticleClick(article)}
                      featured={i === 0 && activeCategory === "Все" && !searchQuery}
                    />
                  ))}
                </div>
              ) : (
                <div>
                  {filtered.map((article, i) => (
                    <ArticleRow
                      key={article.id}
                      article={article}
                      onClick={() => handleArticleClick(article)}
                      index={i}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}