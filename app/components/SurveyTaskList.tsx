interface SurveyTask {
  id: string;
  title: string;
  provider: string;
  reward: number;
  currency: string;
  estimatedTime: string;
  payoutMethods: string[];
  availableSlots: number;
}

interface SurveyTaskListProps {
  tasks: SurveyTask[];
}

export function SurveyTaskList({ tasks }: SurveyTaskListProps) {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex flex-col gap-3 rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="space-y-1">
            <h3 className="font-semibold text-slate-900 dark:text-white">{task.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {task.provider} · ⏱️ {task.estimatedTime}
            </p>
            <div className="flex flex-wrap gap-2">
              {task.payoutMethods.map((method) => (
                <span
                  key={method}
                  className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start sm:items-end">
            <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
              {task.currency} {task.reward}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {task.availableSlots} slots left
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}