"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

type HistoryItem = {
  command: string;
  output: string | React.ReactNode;
};

export function TerminalNav() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "welcome",
      output: (
        <span className="text-slate-400">
          Terminal v2.0 initialized. Type <span className="text-indigo-400 font-semibold">help</span> to view commands, or click any direct link.
        </span>
      ),
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    let output: React.ReactNode = "";

    switch (cmd) {
      case "help":
        output = (
          <div className="space-y-1 text-slate-300">
            <div><span className="text-cyan-400">projects</span>  - Browse full-stack and on-device ML projects</div>
            <div><span className="text-cyan-400">apps</span>      - Explore Google Play Android applications</div>
            <div><span className="text-cyan-400">about</span>     - Bio, engineering philosophy & background</div>
            <div><span className="text-cyan-400">lab</span>       - Interactive playable sandboxed experiments</div>
            <div><span className="text-cyan-400">now</span>       - Current focus and active development</div>
            <div><span className="text-cyan-400">contact</span>   - Secure encrypted contact portal</div>
            <div><span className="text-cyan-400">stack</span>     - View active programming languages and tools</div>
            <div><span className="text-cyan-400">motto</span>     - Personal ethos</div>
            <div><span className="text-cyan-400">clear</span>     - Clear terminal history</div>
          </div>
        );
        break;
      case "projects":
        output = "Navigating to /projects...";
        router.push("/projects");
        break;
      case "apps":
        output = "Navigating to /apps...";
        router.push("/apps");
        break;
      case "about":
        output = "Navigating to /about...";
        router.push("/about");
        break;
      case "lab":
        output = "Navigating to /lab...";
        router.push("/lab");
        break;
      case "now":
        output = "Navigating to /now...";
        router.push("/now");
        break;
      case "contact":
        output = "Navigating to /contact...";
        router.push("/contact");
        break;
      case "motto":
        output = <span className="text-indigo-300 font-semibold">&quot;It&apos;s always me vs me.&quot;</span>;
        break;
      case "stack":
        output = (
          <div className="text-slate-300">
            TypeScript · Kotlin · Python · Next.js · React · Flutter · Jetpack Compose · WebLLM · WebGPU · Supabase
          </div>
        );
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "sudo":
        output = <span className="text-amber-400">Nice try! Root privileges are reserved for Saksham Mogha.</span>;
        break;
      default:
        output = (
          <span className="text-red-400">
            Command not recognized: &quot;{cmd}&quot;. Type <span className="text-white underline">help</span> for a list of commands.
          </span>
        );
    }

    setHistory((prev) => [...prev, { command: input, output }]);
    setInput("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <div className="w-full my-8 font-mono text-xs sm:text-sm">
      <div className="terminal-window rounded-xl border border-slate-700 bg-slate-950/90 overflow-hidden shadow-2xl">
        {/* Window Chrome */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 text-slate-400 text-xs hidden sm:inline">bash — guest@saksham-mogha:~</span>
          </div>
          <div className="text-[11px] text-slate-500">interactive shell</div>
        </div>

        {/* Terminal Body */}
        <div className="p-4 max-h-64 sm:max-h-72 overflow-y-auto space-y-3">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-indigo-400">saksham@dev:~$</span>
                <span className="text-white">{item.command}</span>
              </div>
              <div className="pl-4">{item.output}</div>
            </div>
          ))}

          <form onSubmit={handleCommand} className="flex items-center gap-2 text-slate-400 pt-1">
            <span className="text-indigo-400">saksham@dev:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="type a command (e.g. 'help', 'projects', 'apps')..."
              className="flex-1 bg-transparent text-white focus:outline-none placeholder-slate-600 text-xs sm:text-sm"
              aria-label="Interactive terminal input"
            />
          </form>
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Progressive Enhancement: Accessible static navigation fallback for screen readers & no-JS */}
      <noscript>
        <div className="mt-3 p-3 bg-slate-900 rounded-lg text-slate-300">
          <p className="font-semibold mb-2">Quick Navigation:</p>
          <div className="flex flex-wrap gap-4 text-indigo-400">
            <a href="/projects" className="underline">/projects</a>
            <a href="/apps" className="underline">/apps</a>
            <a href="/about" className="underline">/about</a>
            <a href="/lab" className="underline">/lab</a>
            <a href="/writing" className="underline">/writing</a>
            <a href="/contact" className="underline">/contact</a>
          </div>
        </div>
      </noscript>
    </div>
  );
}
