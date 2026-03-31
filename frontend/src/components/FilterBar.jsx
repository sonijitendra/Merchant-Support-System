import {
  FILTER_PRIORITY_OPTIONS,
  FILTER_STATUS_OPTIONS,
  SORT_OPTIONS,
} from "../constants/tickets";
import TicketSearch from "./TicketSearch";

function FilterBar({
  filters,
  hasActiveFilters,
  isLoading,
  onChange,
  onReset,
  onSearch,
}) {
  return (
    <section className="panel rounded-3xl p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Control Center
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900">
            Filter and prioritize the queue
          </h2>
        </div>
        <button
          type="button"
          onClick={onReset}
          disabled={!hasActiveFilters || isLoading}
          className="secondary-button h-11 px-4 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Reset filters
        </button>
      </div>

      <div className="mt-6">
        <TicketSearch
          disabled={isLoading}
          value={filters.search}
          onSearch={onSearch}
        />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">Status</span>
          <select
            className="field-input"
            value={filters.status}
            disabled={isLoading}
            onChange={(event) => onChange("status", event.target.value)}
          >
            {FILTER_STATUS_OPTIONS.map((option) => (
              <option key={option.value || "all-statuses"} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">Priority</span>
          <select
            className="field-input"
            value={filters.priority}
            disabled={isLoading}
            onChange={(event) => onChange("priority", event.target.value)}
          >
            {FILTER_PRIORITY_OPTIONS.map((option) => (
              <option key={option.value || "all-priorities"} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">Sort by</span>
          <select
            className="field-input"
            value={filters.sort}
            disabled={isLoading}
            onChange={(event) => onChange("sort", event.target.value)}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}

export default FilterBar;
