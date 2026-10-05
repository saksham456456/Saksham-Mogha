"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="print:hidden px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white transition-colors"
    >
      Print / Save PDF (Ctrl+P)
    </button>
  );
}
