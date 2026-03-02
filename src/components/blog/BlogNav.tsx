import Icon from "@/components/ui/icon";
import { CATEGORIES, CATEGORY_COLORS, CATEGORY_ICONS, ARTICLES } from "@/data/articles";

const S = {
  font: "'Montserrat', sans-serif",
  border: "#2a2a2a",
  red: "#e53935",
  text: "#f0f0f0",
  muted: "#888",
  dim: "#555",
};

interface BlogNavProps {
  activeCategory: string;
  searchQuery: string;
  viewMode: "grid" | "list";
  isMobile: boolean;
  onCategoryClick: (cat: string) => void;
  onSearch: (q: string) => void;
  onViewModeChange: (mode: "grid" | "list") => void;
}

export function BlogNav({
  activeCategory,
  searchQuery,
  viewMode,
  isMobile,
  onCategoryClick,
  onSearch,
  onViewModeChange,
}: BlogNavProps) {
  return (
    <nav
      aria-label="Навигация блога"
      style={{ position: "sticky", top: 0, zIndex: 50, background: "#111", borderBottom: `1px solid ${S.border}` }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>

        {/* Search + view toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0 0" }}>
          <div role="search" style={{ position: "relative", flex: 1, maxWidth: isMobile ? "100%" : 400 }}>
            <Icon
              name="Search"
              size={15}
              style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: S.dim }}
            />
            <input
              type="search"
              placeholder="Поиск статей..."
              value={searchQuery}
              onChange={e => onSearch(e.target.value)}
              aria-label="Поиск по статьям блога"
              style={{ background: "#1e1e1e", border: `1px solid ${S.border}`, color: S.text, fontSize: 13, padding: "9px 14px 9px 36px", borderRadius: 6, outline: "none", width: "100%", fontFamily: S.font }}
            />
          </div>

          {!isMobile && (
            <div role="group" aria-label="Вид списка" style={{ display: "flex", gap: 4, flexShrink: 0 }}>
              <button
                onClick={() => onViewModeChange("grid")}
                aria-label="Сетка"
                aria-pressed={viewMode === "grid"}
                style={{ background: viewMode === "grid" ? "#2a2a2a" : "none", border: "none", cursor: "pointer", padding: "8px 10px", borderRadius: 4, color: viewMode === "grid" ? S.text : S.dim }}
              >
                <Icon name="LayoutGrid" size={16} />
              </button>
              <button
                onClick={() => onViewModeChange("list")}
                aria-label="Список"
                aria-pressed={viewMode === "list"}
                style={{ background: viewMode === "list" ? "#2a2a2a" : "none", border: "none", cursor: "pointer", padding: "8px 10px", borderRadius: 4, color: viewMode === "list" ? S.text : S.dim }}
              >
                <Icon name="List" size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Category tabs */}
        <div
          role="tablist"
          aria-label="Категории статей"
          style={{ display: "flex", gap: 2, marginTop: 8, overflowX: "auto", scrollbarWidth: "none" }}
        >
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat && !searchQuery;
            const color = cat === "Все" ? S.red : (CATEGORY_COLORS[cat] || S.red);
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => onCategoryClick(cat)}
                style={{
                  padding: "10px 18px",
                  fontSize: 12,
                  fontWeight: 400,
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: S.font,
                  background: "none",
                  whiteSpace: "nowrap",
                  color: isActive ? "#fff" : S.dim,
                  borderBottom: isActive ? `3px solid ${color}` : "3px solid transparent",
                  transition: "all 0.15s",
                }}
              >
                {cat}
                {cat !== "Все" && (
                  <span aria-hidden="true" style={{ marginLeft: 6, fontSize: 10, opacity: 0.6 }}>
                    {ARTICLES.filter(a => a.category === cat).length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

interface CategoryChipsProps {
  isMobile: boolean;
  onCategoryClick: (cat: string) => void;
}

export function CategoryChips({ isMobile, onCategoryClick }: CategoryChipsProps) {
  return (
    <div style={{ display: "flex", gap: isMobile ? 8 : 10, flexWrap: "wrap", marginBottom: isMobile ? 20 : 32 }}>
      {CATEGORIES.slice(1).map(cat => (
        <button
          key={cat}
          onClick={() => onCategoryClick(cat)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "#1e1e1e",
            border: `1px solid ${S.border}`,
            borderRadius: 999,
            padding: isMobile ? "6px 12px" : "8px 16px",
            cursor: "pointer",
            fontFamily: S.font,
            fontSize: isMobile ? 12 : 13,
            fontWeight: 400,
            color: S.muted,
            transition: "all 0.15s",
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.borderColor = CATEGORY_COLORS[cat] || S.red;
            el.style.color = "#fff";
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.borderColor = S.border;
            el.style.color = S.muted;
          }}
        >
          <Icon name={CATEGORY_ICONS[cat]} size={14} color={CATEGORY_COLORS[cat] || S.red} />
          {cat}
          <span aria-hidden="true" style={{ background: "#252525", borderRadius: 999, padding: "1px 7px", fontSize: 11, color: S.dim }}>
            {ARTICLES.filter(a => a.category === cat).length}
          </span>
        </button>
      ))}
    </div>
  );
}

export default BlogNav;
