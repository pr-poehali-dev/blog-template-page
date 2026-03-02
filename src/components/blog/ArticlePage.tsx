import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Article, Comment, ARTICLES, COMMENTS_DEMO } from "@/data/articles";
import { ArticleBadge } from "@/components/blog/ArticleCard";

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

function pluralArticles(n: number) {
  if (n === 1) return "статья";
  if (n >= 2 && n <= 4) return "статьи";
  return "статей";
}

function ArticleBody({ body, isMobile }: { body: string; isMobile: boolean }) {
  return (
    <div style={{ color: "#bbb", fontSize: isMobile ? 15 : 16, lineHeight: 1.85, fontWeight: 300 }}>
      {body.split("\n\n").map((para, i) => {
        if (para.startsWith("**") && para.endsWith("**")) {
          return (
            <h2 key={i} style={{ fontFamily: S.font, fontWeight: 400, fontSize: 20, color: S.text, marginTop: 36, marginBottom: 14, letterSpacing: "-0.01em" }}>
              {para.replace(/\*\*/g, "")}
            </h2>
          );
        }
        if (para.includes("**")) {
          const parts = para.split(/(\*\*[^*]+\*\*)/g);
          return (
            <p key={i} style={{ marginBottom: 20 }}>
              {parts.map((part, j) =>
                part.startsWith("**") ? (
                  <strong key={j} style={{ color: S.text, fontWeight: 400 }}>{part.replace(/\*\*/g, "")}</strong>
                ) : part
              )}
            </p>
          );
        }
        if (para.startsWith("- ")) {
          return (
            <ul key={i} style={{ paddingLeft: 20, marginBottom: 20, display: "flex", flexDirection: "column", gap: 8 }}>
              {para.split("\n").map((line, j) => (
                <li key={j} style={{ color: "#bbb" }}>{line.replace("- ", "")}</li>
              ))}
            </ul>
          );
        }
        return <p key={i} style={{ marginBottom: 20 }}>{para}</p>;
      })}
    </div>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
      <div style={{ width: 24, height: 1, background: S.red }} />
      <span style={{ fontFamily: S.font, fontWeight: 400, fontSize: 11, color: S.red, textTransform: "uppercase", letterSpacing: "0.15em" }}>
        {label}
      </span>
    </div>
  );
}

interface CommentsProps {
  articleId: number;
}

function Comments({ articleId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>(COMMENTS_DEMO);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim() || !name.trim()) return;
    setComments(prev => [{ id: prev.length + 1, name, text, time: "только что" }, ...prev]);
    setName("");
    setText("");
  };

  return (
    <section aria-label="Комментарии" style={{ marginTop: 56, paddingTop: 32, borderTop: `1px solid ${S.border}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
        <div style={{ width: 32, height: 1, background: S.red }} />
        <h3 style={{ fontFamily: S.font, fontWeight: 400, fontSize: 13, color: S.red, textTransform: "uppercase", letterSpacing: "0.15em", margin: 0 }}>
          Комментарии
        </h3>
        <span style={{ color: S.dim, fontSize: 13 }}>({comments.length})</span>
      </div>

      <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
        {comments.map(c => (
          <li
            key={c.id}
            itemScope
            itemType="https://schema.org/Comment"
            style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 8, padding: 16 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{ width: 28, height: 28, background: "#2a2a2a", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="User" size={12} color="#555" />
              </div>
              <span itemProp="author" style={{ color: "#ccc", fontSize: 13, fontWeight: 400 }}>{c.name}</span>
              <time style={{ color: S.dim, fontSize: 12 }}>{c.time}</time>
            </div>
            <p itemProp="text" style={{ color: S.muted, fontSize: 14, lineHeight: 1.6, margin: 0, fontWeight: 300 }}>{c.text}</p>
          </li>
        ))}
      </ol>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input
          type="text"
          placeholder="Ваше имя"
          value={name}
          onChange={e => setName(e.target.value)}
          aria-label="Ваше имя"
          style={{ background: S.card, border: `1px solid ${S.border}`, color: S.text, padding: "10px 14px", borderRadius: 6, fontSize: 14, fontFamily: S.font, outline: "none", fontWeight: 300 }}
        />
        <textarea
          placeholder="Оставьте комментарий..."
          value={text}
          onChange={e => setText(e.target.value)}
          rows={3}
          aria-label="Текст комментария"
          style={{ background: S.card, border: `1px solid ${S.border}`, color: S.text, padding: "10px 14px", borderRadius: 6, fontSize: 14, fontFamily: S.font, outline: "none", resize: "vertical", fontWeight: 300 }}
        />
        <button
          onClick={handleSubmit}
          style={{ background: S.red, color: "#fff", border: "none", borderRadius: 6, padding: "11px 24px", fontSize: 12, fontWeight: 400, cursor: "pointer", fontFamily: S.font, textTransform: "uppercase", letterSpacing: "0.1em", alignSelf: "flex-start" }}
        >
          Отправить
        </button>
      </div>
    </section>
  );
}

interface ArticlePageProps {
  article: Article;
  onBack: () => void;
  onArticleClick: (a: Article) => void;
  isMobile: boolean;
}

export function ArticlePage({ article, onBack, onArticleClick, isMobile }: ArticlePageProps) {
  const related = ARTICLES.filter(a => a.id !== article.id).slice(0, 5);

  return (
    <div className="animate-fade-in">
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "20px 16px" : "32px 20px" }}>

        <button
          onClick={onBack}
          aria-label="Назад к списку статей"
          style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: S.dim, fontSize: 13, fontFamily: S.font, marginBottom: 40, padding: 0, letterSpacing: "0.04em" }}
        >
          <Icon name="ArrowLeft" size={15} />
          Назад к статьям
        </button>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 320px", gap: isMobile ? 40 : 64, alignItems: "start" }}>

          {/* ── MAIN CONTENT ── */}
          <main>
            <article
              itemScope
              itemType="https://schema.org/BlogPosting"
            >
              <meta itemProp="publisher" content="AVM Motors" />
              <meta itemProp="url" content={`https://avm-motors.by/blog/${article.id}`} />

              <header>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <ArticleBadge category={article.category} />
                  <time dateTime={article.date} itemProp="datePublished" style={{ color: S.dim, fontSize: 13, display: "flex", alignItems: "center", gap: 4 }}>
                    <Icon name="Clock" size={12} />{article.readTime}
                  </time>
                  <time dateTime={article.date} style={{ color: S.dim, fontSize: 13 }}>{article.date}</time>
                </div>

                <h1
                  itemProp="headline"
                  style={{ fontFamily: S.font, fontWeight: 300, fontSize: isMobile ? "clamp(22px, 6vw, 32px)" : "clamp(28px, 4vw, 44px)", color: S.text, lineHeight: 1.15, marginBottom: 20, letterSpacing: "-0.01em" }}
                >
                  {article.title}
                </h1>

                <p itemProp="description" style={{ color: S.muted, fontSize: isMobile ? 15 : 17, lineHeight: 1.7, marginBottom: 28, fontWeight: 300 }}>
                  {article.excerpt}
                </p>

                <address
                  itemProp="author"
                  itemScope
                  itemType="https://schema.org/Person"
                  style={{ display: "flex", alignItems: "center", gap: 12, paddingBottom: 28, borderBottom: `1px solid ${S.border}`, fontStyle: "normal" }}
                >
                  <div style={{ width: 36, height: 36, background: "linear-gradient(135deg, #c62828, #e53935)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name="User" size={16} color="#fff" />
                  </div>
                  <div>
                    <span itemProp="name" style={{ color: S.text, fontSize: 13, fontWeight: 400, display: "block" }}>{article.author}</span>
                    <time dateTime={article.date} style={{ color: S.dim, fontSize: 12 }}>{article.date}</time>
                  </div>
                </address>
              </header>

              {article.image && (
                <figure style={{ margin: "28px 0 0", borderRadius: 10, overflow: "hidden", border: `1px solid ${S.border}` }}>
                  <img
                    src={article.image}
                    alt={article.title}
                    itemProp="image"
                    width={760}
                    height={360}
                    style={{ width: "100%", height: isMobile ? 220 : 360, objectFit: "cover", display: "block" }}
                  />
                  <figcaption style={{ padding: "8px 12px", color: S.dim, fontSize: 12, textAlign: "center" }}>
                    {article.title}
                  </figcaption>
                </figure>
              )}

              <div itemProp="articleBody" style={{ marginTop: 32 }}>
                <ArticleBody body={article.body} isMobile={isMobile} />
              </div>
            </article>

            <Comments articleId={article.id} />
          </main>

          {/* ── SIDEBAR ── */}
          <aside style={{ display: "flex", flexDirection: "column", gap: 32, position: isMobile ? "static" : "sticky", top: 120 }}>

            <nav aria-label="Читайте также">
              <SectionLabel label="Читайте также" />
              <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {related.map(a => (
                  <li key={a.id}>
                    <div
                      onClick={() => onArticleClick(a)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={e => e.key === "Enter" && onArticleClick(a)}
                      style={{ padding: "14px 0", borderBottom: `1px solid ${S.border}`, cursor: "pointer", transition: "opacity 0.15s" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.7"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                    >
                      <ArticleBadge category={a.category} />
                      <p style={{ fontFamily: S.font, fontWeight: 300, fontSize: 14, color: S.text, lineHeight: 1.4, marginTop: 8, marginBottom: 6 }}>
                        {a.title}
                      </p>
                      <div style={{ color: S.dim, fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}>
                        <Icon name="Clock" size={11} />
                        {a.readTime}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </nav>

            <aside aria-label="Связаться с AVM Motors" style={{ background: "linear-gradient(135deg, #1a0a0a, #2a1010)", border: "1px solid #3a1515", borderRadius: 8, padding: 24 }}>
              <SectionLabel label="AVM Motors" />
              <p style={{ color: "#ccc", fontSize: 14, lineHeight: 1.6, marginBottom: 20, fontWeight: 300 }}>
                Подберём автомобиль из Китая под ваш бюджет и задачи
              </p>
              <a
                href="tel:+375296397378"
                aria-label="Позвонить в AVM Motors: +375 29 639 73 78"
                style={{ display: "block", background: S.red, color: "#fff", textAlign: "center", padding: "12px", borderRadius: 6, textDecoration: "none", fontSize: 12, fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: S.font }}
              >
                +375 29 639 73 78
              </a>
            </aside>

          </aside>
        </div>
      </div>
    </div>
  );
}

export default ArticlePage;
