interface AiTask {
  id: string;
  title: string;
  description: string;
  reward: number;
  currency: string;
  estimatedTime: string;
  payoutMethods: string[];
  availableSlots: number;
}

interface AiTaskTableProps {
  tasks: AiTask[];
}

export function AiTaskTable({ tasks }: AiTaskTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-white/10">
            <th className="px-4 py-3 text-left font-semibold text-slate-600 dark:text-slate-300">
              Task
            </th>
            <th className="px-4 py-3 text-left font-semibold text-slate-600 dark:text-slate-300">
              Time
            </th>
            <th className="px-4 py-3 text-left font-semibold text-slate-600 dark:text-slate-300">
              Reward
            </th>
            <th className="px-4 py-3 text-left font-semibold text-slate-600 dark:text-slate-300">
              Payout
            </th>
            <th className="px-4 py-3 text-left font-semibold text-slate-600 dark:text-slate-300">
              Slots
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr
              key={task.id}
              className="border-b border-slate-100 dark:border-white/5 transition hover:bg-slate-50/50 dark:hover:bg-white/5"
            >
              <td className="px-4 py-4">
                <div className="font-medium text-slate-900 dark:text-white">
                  {task.title}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {task.description}
                </div>
              </td>
              <td className="px-4 py-4 text-slate-700 dark:text-slate-300">
                {task.estimatedTime}
              </td>
              <td className="px-4 py-4 font-semibold text-emerald-600 dark:text-emerald-400">
                {task.currency} {task.reward}
              </td>
              <td className="px-4 py-4">
                <div className="flex flex-wrap gap-1">
                  {task.payoutMethods.map((method) => (
                    <span
                      key={method}
                      className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-4 py-4 text-slate-600 dark:text-slate-400">
                {task.availableSlots}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}