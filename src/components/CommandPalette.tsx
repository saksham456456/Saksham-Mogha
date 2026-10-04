"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { defaultSearchItems, type SearchItem } from "@/lib/search-items";

export { defaultSearchItems, type SearchItem };

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return defaultSearchItems.slice(0, 8);
    const q = query.toLowerCase();
    return defaultSearchItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }, [query]);

  const selectItem = (href: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(href);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-700 bg-slate-900/60 text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
        aria-label="Open Command Palette (Cmd+K)"
      >
        <span>Search</span>
        <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[10px]">
          ⌘K
        </kbd>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Command Palette"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3 border-b border-slate-800 flex items-center gap-2">
              <span className="text-slate-500 font-mono text-sm">/</span>
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Search pages, projects, posts, tags..."
                autoFocus
                className="w-full bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none font-mono"
              />
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-xs text-slate-400 hover:text-white px-2 py-1"
              >
                ESC
              </button>
            </div>

            <ul className="max-h-80 overflow-y-auto divide-y divide-slate-800/60 p-1">
              {filtered.length === 0 ? (
                <li className="p-4 text-center text-sm text-slate-500">No matching items found.</li>
              ) : (
                filtered.map((item, index) => (
                  <li key={item.href}>
                    <button
                      type="button"
                      onClick={() => selectItem(item.href)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between text-sm transition-colors ${
                        index === selectedIndex ? "bg-indigo-600/20 text-white border-l-2 border-indigo-500" : "text-slate-300 hover:bg-slate-800/60"
                      }`}
                    >
                      <span className="font-medium truncate">{item.title}</span>
                      <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/60">
                        {item.category}
                      </span>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
