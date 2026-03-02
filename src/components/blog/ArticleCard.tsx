import Icon from "@/components/ui/icon";
import { Article, CATEGORY_COLORS } from "@/data/articles";

const S = {
  font: "'Montserrat', sans-serif",
  card: "#1e1e1e",
  border: "#2a2a2a",
  red: "#e53935",
  text: "#f0f0f0",
  muted: "#888",
  dim: "#555",
};

interface ArticleBadgeProps {
  category: string;
}

export function ArticleBadge({ category }: ArticleBadgeProps) {
  return (
    <span
      style={{
        background: CATEGORY_COLORS[category] || S.red,
        color: "#fff",
        padding: "3px 10px",
        borderRadius: 2,
        fontSize: 10,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        display: "inline-block",
      }}
    >
      {category}
    </span>
  );
}

interface ArticleCardProps {
  article: Article;
  onClick: () => void;
  featured?: boolean;
}

export function ArticleCard({ article, onClick, featured }: ArticleCardProps) {
  const accentColor = CATEGORY_COLORS[article.category] || S.red;

  return (
    <article
      onClick={onClick}
      itemScope
      itemType="https://schema.org/BlogPosting"
      style={{
        background: S.card,
        border: `1px solid ${S.border}`,
        borderRadius: 8,
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.2s",
        borderTop: `3px solid ${accentColor}`,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = accentColor;
        el.style.transform = "translateY(-3px)";
        el.style.boxShadow = "0 8px 32px rgba(0,0,0,0.4)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = S.border;
        el.style.borderTopColor = accentColor;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "none";
      }}
    >
      {article.image && (
        <div style={{ width: "100%", height: featured ? 220 : 180, overflow: "hidden" }}>
          <img
            src={article.image}
            alt={article.title}
            itemProp="image"
            loading="lazy"
            width={featured ? 640 : 320}
            height={featured ? 220 : 180}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.3s" }}
          />
        </div>
      )}

      <div style={{ padding: featured ? 28 : 20 }}>
        <header>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <ArticleBadge category={article.category} />
            <time
              dateTime={article.date}
              itemProp="datePublished"
              style={{ color: S.dim, fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}
            >
              <Icon name="Clock" size={11} />
              {article.readTime}
            </time>
          </div>

          <h2
            itemProp="headline"
            style={{
              fontFamily: S.font,
              fontWeight: 400,
              fontSize: featured ? 20 : 15,
              color: S.text,
              lineHeight: 1.4,
              margin: 0,
              marginBottom: 10,
            }}
          >
            {article.title}
          </h2>
        </header>

        {featured && (
          <p
            itemProp="description"
            style={{ color: S.muted, fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}
          >
            {article.excerpt}
          </p>
        )}

        <footer style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 12, borderTop: `1px solid ${S.border}` }}>
          <address
            itemProp="author"
            itemScope
            itemType="https://schema.org/Person"
            style={{ display: "flex", alignItems: "center", gap: 8, fontStyle: "normal" }}
          >
            <div style={{ width: 26, height: 26, background: "#333", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon name="User" size={12} color="#999" />
            </div>
            <div>
              <span itemProp="name" style={{ color: "#ccc", fontSize: 12, fontWeight: 600, display: "block" }}>{article.author}</span>
              <time dateTime={article.date} style={{ color: S.dim, fontSize: 11 }}>{article.date}</time>
            </div>
          </address>

          <div style={{ display: "flex", alignItems: "center", gap: 4, color: S.dim, fontSize: 12 }}>
            <Icon name="MessageCircle" size={12} />
            <span>{article.comments}</span>
          </div>
        </footer>
      </div>
    </article>
  );
}

interface ArticleRowProps {
  article: Article;
  onClick: () => void;
  index: number;
}

export function ArticleRow({ article, onClick, index }: ArticleRowProps) {
  return (
    <article
      onClick={onClick}
      itemScope
      itemType="https://schema.org/BlogPosting"
      style={{
        display: "flex",
        gap: 20,
        alignItems: "flex-start",
        padding: "20px 0",
        borderBottom: `1px solid ${S.border}`,
        cursor: "pointer",
        transition: "all 0.2s",
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.paddingLeft = "10px"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.paddingLeft = "0"; }}
    >
      {article.image ? (
        <div style={{ width: 90, height: 70, borderRadius: 6, overflow: "hidden", flexShrink: 0 }}>
          <img
            src={article.image}
            alt={article.title}
            itemProp="image"
            loading="lazy"
            width={90}
            height={70}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      ) : (
        <span aria-hidden="true" style={{ fontSize: 32, fontWeight: 900, color: "#252525", fontFamily: S.font, lineHeight: 1, minWidth: 40, flexShrink: 0 }}>
          {String(index + 1).padStart(2, "0")}
        </span>
      )}

      <div style={{ flex: 1, minWidth: 0 }}>
        <header>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <ArticleBadge category={article.category} />
            <time dateTime={article.date} itemProp="datePublished" style={{ color: S.dim, fontSize: 11 }}>{article.date}</time>
          </div>
          <h2 itemProp="headline" style={{ fontFamily: S.font, fontWeight: 400, fontSize: 15, color: S.text, lineHeight: 1.4, margin: 0, marginBottom: 6 }}>
            {article.title}
          </h2>
        </header>

        <footer style={{ display: "flex", alignItems: "center", gap: 12, color: S.dim, fontSize: 12 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Icon name="Clock" size={11} />{article.readTime}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Icon name="MessageCircle" size={11} />{article.comments}
          </span>
          <address
            itemProp="author"
            itemScope
            itemType="https://schema.org/Person"
            style={{ fontStyle: "normal" }}
          >
            <span itemProp="name">{article.author}</span>
          </address>
        </footer>
      </div>

      <Icon name="ChevronRight" size={16} color={S.dim} />
    </article>
  );
}

export default ArticleCard;