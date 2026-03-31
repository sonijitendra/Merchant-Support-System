export const PRIORITY_OPTIONS = ["Low", "Medium", "High"];
export const STATUS_OPTIONS = ["NEW", "INVESTIGATING", "RESOLVED"];
export const FILTER_STATUS_OPTIONS = [
  { value: "", label: "All statuses" },
  { value: "NEW", label: "NEW" },
  { value: "INVESTIGATING", label: "INVESTIGATING" },
  { value: "RESOLVED", label: "RESOLVED" },
];
export const FILTER_PRIORITY_OPTIONS = [
  { value: "", label: "All priorities" },
  { value: "High", label: "High" },
  { value: "Medium", label: "Medium" },
  { value: "Low", label: "Low" },
];
export const SORT_OPTIONS = [
  { value: "latest", label: "Latest first" },
  { value: "priority", label: "Highest priority" },
];
export const DEFAULT_FILTERS = {
  search: "",
  status: "",
  priority: "",
  sort: "latest",
  page: 1,
  limit: 6,
};
export const NEXT_STATUS_BY_CURRENT = {
  NEW: "INVESTIGATING",
  INVESTIGATING: "RESOLVED",
  RESOLVED: null,
};
export const STATUS_ACTION_LABELS = {
  INVESTIGATING: "Start investigation",
  RESOLVED: "Mark resolved",
};
export const PRIORITY_BADGE_STYLES = {
  High: "bg-rose-100 text-rose-700 ring-rose-200",
  Medium: "bg-amber-100 text-amber-700 ring-amber-200",
  Low: "bg-emerald-100 text-emerald-700 ring-emerald-200",
};
export const STATUS_BADGE_STYLES = {
  NEW: "bg-sky-100 text-sky-700 ring-sky-200",
  INVESTIGATING: "bg-amber-100 text-amber-700 ring-amber-200",
  RESOLVED: "bg-emerald-100 text-emerald-700 ring-emerald-200",
};
