import { getLiveGitHubActivity, type GitHubActivityItem } from "@/lib/sync/profile-sync";
import { ExternalLink } from "@/components/ExternalLink";

export async function GitHubActivityStrip() {
  const activities: GitHubActivityItem[] = await getLiveGitHubActivity();

  return (
    <section aria-labelledby="activity-heading" className="my-12">
      <div className="flex items-center justify-between mb-4">
        <h2 id="activity-heading" className="text-sm font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Live GitHub Activity
        </h2>
        <ExternalLink
          href="https://github.com/saksham456456"
          className="text-xs font-mono text-indigo-400 hover:text-indigo-300 underline"
        >
          @saksham456456 ↗
        </ExternalLink>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {activities.slice(0, 3).map((act) => (
          <div
            key={act.id}
            className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-2">
                <span className="text-indigo-400 font-medium">{act.repoShort}</span>
                <span>{new Date(act.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
              </div>
              <p className="text-sm text-slate-300 leading-snug line-clamp-2">
                {act.summary}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800/80 flex justify-end">
              <ExternalLink
                href={act.repoUrl}
                className="text-xs text-slate-400 hover:text-slate-200"
              >
                View Repository →
              </ExternalLink>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
