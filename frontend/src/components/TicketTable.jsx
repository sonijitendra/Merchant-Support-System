import {
  PRIORITY_BADGE_STYLES,
  STATUS_BADGE_STYLES,
} from "../constants/tickets";
import StatusAction from "./StatusAction";

const formatDate = (value) =>
  new Date(value).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const EmptyState = ({ hasActiveFilters, onReset }) => (
  <div className="panel rounded-[2rem] p-10 text-center">
    <div className="mx-auto max-w-md">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
        Queue Status
      </p>
      <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-900">
        {hasActiveFilters ? "No tickets match these filters" : "No tickets yet"}
      </h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        {hasActiveFilters
          ? "Try resetting the controls to reveal the full queue again."
          : "Your first merchant inquiry will appear here once a ticket is submitted."}
      </p>
      {hasActiveFilters ? (
        <button
          type="button"
          onClick={onReset}
          className="primary-button mt-6 h-11 px-5"
        >
          Clear filters
        </button>
      ) : null}
    </div>
  </div>
);

function TicketTable({
  hasActiveFilters,
  isLoading,
  onResetFilters,
  onUpdateStatus,
  tickets,
  updatingTicketId,
}) {
  if (isLoading && !tickets.length) {
    return (
      <section className="panel rounded-[2rem] p-6">
        <div className="space-y-4">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="h-20 animate-pulse rounded-3xl bg-slate-100"
            />
          ))}
        </div>
      </section>
    );
  }

  if (!tickets.length) {
    return <EmptyState hasActiveFilters={hasActiveFilters} onReset={onResetFilters} />;
  }

  return (
    <section className="panel overflow-hidden rounded-[2rem]">
      <div className="border-b border-slate-200/80 px-6 py-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Ticket Queue
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900">
              Latest support activity
            </h2>
          </div>
          {isLoading ? (
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
              Refreshing...
            </span>
          ) : null}
        </div>
      </div>

      <div className="hidden overflow-x-auto lg:block">
        <table className="min-w-full">
          <thead className="bg-slate-50/80">
            <tr className="text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              <th className="px-6 py-4">Subject</th>
              <th className="px-6 py-4">Priority</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Created</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket._id} className="border-t border-slate-200/70">
                <td className="px-6 py-5 align-top">
                  <p className="font-bold text-slate-900">{ticket.subject}</p>
                  <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
                    {ticket.message}
                  </p>
                </td>
                <td className="px-6 py-5 align-top">
                  <span
                    className={`badge ${PRIORITY_BADGE_STYLES[ticket.priority]}`}
                  >
                    {ticket.priority}
                  </span>
                </td>
                <td className="px-6 py-5 align-top">
                  <span className={`badge ${STATUS_BADGE_STYLES[ticket.status]}`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="px-6 py-5 align-top text-sm font-medium text-slate-600">
                  {formatDate(ticket.createdAt)}
                </td>
                <td className="px-6 py-5 align-top text-right">
                  <StatusAction
                    status={ticket.status}
                    isUpdating={updatingTicketId === ticket._id}
                    onUpdate={(status) => onUpdateStatus(ticket._id, status)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 p-4 lg:hidden">
        {tickets.map((ticket) => (
          <article
            key={ticket._id}
            className="rounded-[1.5rem] border border-slate-200/80 bg-white/80 p-5 shadow-sm shadow-slate-200/60"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className={`badge ${PRIORITY_BADGE_STYLES[ticket.priority]}`}>
                {ticket.priority}
              </span>
              <span className={`badge ${STATUS_BADGE_STYLES[ticket.status]}`}>
                {ticket.status}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-black tracking-tight text-slate-900">
              {ticket.subject}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{ticket.message}</p>
            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium text-slate-500">
                Created {formatDate(ticket.createdAt)}
              </p>
              <StatusAction
                status={ticket.status}
                isUpdating={updatingTicketId === ticket._id}
                onUpdate={(status) => onUpdateStatus(ticket._id, status)}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default TicketTable;
