import { useState, useRef, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'wouter';
import { ChevronDown, Menu, X, Search, Sun, Moon, Columns2, Maximize } from 'lucide-react';
import { pages, sections, getPageByPath, getSectionPages } from '@/lib/navigation';
import { searchIndex } from '@/lib/searchIndex';
import { toSlug } from '@/hooks/useAutoHeadingIds';
import { useTheme } from '@/contexts/ThemeContext';
import { useLayout } from '@/contexts/LayoutContext';

const navSections = sections.map((s) => ({
  ...s,
  subsections: getSectionPages(s.id)
    .filter((p) => p.path !== '/')
    .map((p) => ({ title: p.title, href: p.path })),
}));

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { theme, toggleTheme } = useTheme();
  const { layoutMode, toggleLayout } = useLayout();
  const [location] = useLocation();

  const currentPage = useMemo(() => getPageByPath(location), [location]);

  useEffect(() => {
    if (currentPage) {
      setExpandedSection(currentPage.sectionId);
    }
  }, [currentPage]);

  useEffect(() => {
    function handleFocusSearch() {
      setIsOpen(true);
      requestAnimationFrame(() => searchInputRef.current?.focus());
    }
    document.addEventListener('focus-search', handleFocusSearch);
    return () => document.removeEventListener('focus-search', handleFocusSearch);
  }, []);

  const searchResults = searchQuery.trim()
    ? pages.flatMap((p) => {
        const q = searchQuery.toLowerCase();
        const titleMatch = p.title.toLowerCase().includes(q);
        const keywords = searchIndex[p.path] ?? [];
        const matchedKeywords = keywords.filter((kw) => kw.toLowerCase().includes(q));
        if (!titleMatch && matchedKeywords.length === 0) return [];
        return [{ ...p, matchedKeywords }];
      })
    : [];

  const hasSearch = searchQuery.trim().length > 0;

  return (
    <>
      {/* モバイルメニューボタン */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-background border border-border hover:bg-muted"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* サイドバー */}
      <nav
        className={`fixed left-0 top-0 h-screen w-64 bg-sidebar glass-sidebar border-r border-sidebar-border overflow-y-auto transition-transform duration-300 z-40 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-heading font-bold text-lg">R</span>
            </div>
            <span className="font-heading font-bold text-lg text-foreground">React 入門</span>
          </Link>

          {/* 検索 */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* ダークモード切替 + レイアウト切替 */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={toggleTheme}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors"
              title={theme === 'dark' ? 'ライトモード' : 'ダークモード'}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              <span className="text-xs">{theme === 'dark' ? 'ライト' : 'ダーク'}</span>
            </button>
            <button
              onClick={toggleLayout}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors"
              title={layoutMode === 'normal' ? 'ワイドモード' : '通常モード'}
            >
              {layoutMode === 'normal' ? <Maximize size={16} /> : <Columns2 size={16} />}
              <span className="text-xs">{layoutMode === 'normal' ? 'ワイド' : '通常'}</span>
            </button>
          </div>

          {/* 検索結果 */}
          {hasSearch ? (
            <div className="space-y-0.5">
              <p className="px-4 py-1 text-xs font-semibold text-muted-foreground">
                検索結果 ({searchResults.length}件)
              </p>
              {searchResults.length === 0 ? (
                <p className="px-4 py-2 text-sm text-muted-foreground">
                  該当するページがありません
                </p>
              ) : (
                searchResults.map((page) => (
                  <div key={page.path}>
                    <Link
                      href={page.matchedKeywords.length > 0 ? `${page.path}#${toSlug(page.matchedKeywords[0])}` : page.path}
                      onClick={() => {
                        setIsOpen(false);
                        setSearchQuery('');
                      }}
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-accent rounded-lg transition-colors"
                    >
                      <span className="text-xs text-primary font-semibold mr-1.5">
                        STEP {page.step}
                      </span>
                      {page.title}
                    </Link>
                    {page.matchedKeywords.length > 0 && (
                      <div className="ml-6 space-y-0.5">
                        {page.matchedKeywords.slice(0, 3).map((kw) => (
                          <Link
                            key={kw}
                            href={`${page.path}#${toSlug(kw)}`}
                            onClick={() => {
                              setIsOpen(false);
                              setSearchQuery('');
                            }}
                            className="flex items-center gap-1.5 px-3 py-1 text-xs text-muted-foreground hover:text-primary hover:bg-primary/5 rounded transition-colors"
                          >
                            <span className="text-primary/60">#</span>
                            {kw}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          ) : (
            /* セクションナビ */
            <div className="space-y-1">
              {/* 第1部ラベル */}
              <p className="px-4 pt-2 pb-1 text-xs font-bold text-primary uppercase tracking-wider">
                第1部: React + Vite
              </p>
              {navSections
                .filter((s) => s.part === 'react')
                .map((section) => (
                  <div key={section.id}>
                    {section.id === 'intro' ? (
                      <Link
                        href="/"
                        onClick={() => setIsOpen(false)}
                        className={`block px-4 py-2 rounded-lg transition-colors ${
                          location === '/'
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-foreground hover:bg-sidebar-accent'
                        }`}
                      >
                        {section.title}
                      </Link>
                    ) : null}
                    {section.subsections.length > 0 && (
                      <>
                        <button
                          onClick={() =>
                            setExpandedSection(
                              expandedSection === section.id ? null : section.id
                            )
                          }
                          className="w-full flex items-center justify-between px-4 py-2 rounded-lg text-foreground hover:bg-sidebar-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                          <span className="text-sm">{section.id === 'intro' ? '環境構築' : section.title}</span>
                          <ChevronDown
                            size={18}
                            className={`transition-transform ${
                              expandedSection === section.id ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {expandedSection === section.id && (
                          <div className="ml-2 mt-1 space-y-1 border-l-2 border-sidebar-border">
                            {section.subsections.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                onClick={() => setIsOpen(false)}
                                className={`block px-4 py-2 text-sm transition-colors ${
                                  location === sub.href
                                    ? 'nav-active rounded-r-lg'
                                    : 'rounded-lg text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50'
                                }`}
                              >
                                {sub.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}

              {/* 第2部ラベル */}
              <p className="px-4 pt-4 pb-1 text-xs font-bold text-accent uppercase tracking-wider">
                第2部: Next.js
              </p>
              {navSections
                .filter((s) => s.part === 'nextjs')
                .map((section) => (
                  <div key={section.id}>
                    <button
                      onClick={() =>
                        setExpandedSection(
                          expandedSection === section.id ? null : section.id
                        )
                      }
                      className="w-full flex items-center justify-between px-4 py-2 rounded-lg text-foreground hover:bg-sidebar-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <span className="text-sm">{section.title}</span>
                      <ChevronDown
                        size={18}
                        className={`transition-transform ${
                          expandedSection === section.id ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {expandedSection === section.id && section.subsections.length > 0 && (
                      <div className="ml-2 mt-1 space-y-1 border-l-2 border-sidebar-border">
                        {section.subsections.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setIsOpen(false)}
                            className={`block px-4 py-2 text-sm transition-colors ${
                              location === sub.href
                                ? 'nav-active rounded-r-lg'
                                : 'rounded-lg text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50'
                            }`}
                          >
                            {sub.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

              {/* 第3部ラベル */}
              <p className="px-4 pt-4 pb-1 text-xs font-bold text-pink-600 dark:text-pink-400 uppercase tracking-wider">
                第3部: Storybook
              </p>
              {navSections
                .filter((s) => s.part === 'storybook')
                .map((section) => (
                  <div key={section.id}>
                    <button
                      onClick={() =>
                        setExpandedSection(
                          expandedSection === section.id ? null : section.id
                        )
                      }
                      className="w-full flex items-center justify-between px-4 py-2 rounded-lg text-foreground hover:bg-sidebar-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <span className="text-sm">{section.title}</span>
                      <ChevronDown
                        size={18}
                        className={`transition-transform ${
                          expandedSection === section.id ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {expandedSection === section.id && section.subsections.length > 0 && (
                      <div className="ml-2 mt-1 space-y-1 border-l-2 border-sidebar-border">
                        {section.subsections.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setIsOpen(false)}
                            className={`block px-4 py-2 text-sm transition-colors ${
                              location === sub.href
                                ? 'nav-active rounded-r-lg'
                                : 'rounded-lg text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50'
                            }`}
                          >
                            {sub.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

              {/* 第4部ラベル */}
              <p className="px-4 pt-4 pb-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                第4部: アーキテクチャ
              </p>
              {navSections
                .filter((s) => s.part === 'architecture')
                .map((section) => (
                  <div key={section.id}>
                    <button
                      onClick={() =>
                        setExpandedSection(
                          expandedSection === section.id ? null : section.id
                        )
                      }
                      className="w-full flex items-center justify-between px-4 py-2 rounded-lg text-foreground hover:bg-sidebar-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <span className="text-sm">{section.title}</span>
                      <ChevronDown
                        size={18}
                        className={`transition-transform ${
                          expandedSection === section.id ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {expandedSection === section.id && section.subsections.length > 0 && (
                      <div className="ml-2 mt-1 space-y-1 border-l-2 border-sidebar-border">
                        {section.subsections.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setIsOpen(false)}
                            className={`block px-4 py-2 text-sm transition-colors ${
                              location === sub.href
                                ? 'nav-active rounded-r-lg'
                                : 'rounded-lg text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50'
                            }`}
                          >
                            {sub.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      </nav>

      {/* モバイルオーバーレイ */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
