import {
  NEXT_STATUS_BY_CURRENT,
  STATUS_ACTION_LABELS,
} from "../constants/tickets";

function StatusAction({ isUpdating, onUpdate, status }) {
  const nextStatus = NEXT_STATUS_BY_CURRENT[status];

  if (!nextStatus) {
    return (
      <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
        Complete
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onUpdate(nextStatus)}
      disabled={isUpdating}
      className="secondary-button h-10 px-4 text-sm disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isUpdating ? "Updating..." : STATUS_ACTION_LABELS[nextStatus]}
    </button>
  );
}

export default StatusAction;

