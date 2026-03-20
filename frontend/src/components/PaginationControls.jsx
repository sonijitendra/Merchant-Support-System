function PaginationControls({ isLoading, onPageChange, pagination }) {
  if (!pagination.totalItems) {
    return null;
  }

  return (
    <div className="mt-6 flex flex-col gap-3 rounded-3xl border border-white/70 bg-white/70 px-4 py-4 shadow-sm shadow-slate-200/60 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm font-medium text-slate-600">
        Showing page <span className="font-bold text-slate-900">{pagination.page}</span>{" "}
        of <span className="font-bold text-slate-900">{pagination.totalPages}</span> with{" "}
        <span className="font-bold text-slate-900">{pagination.totalItems}</span> ticket
        {pagination.totalItems === 1 ? "" : "s"}.
      </p>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="secondary-button h-10 px-4 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => onPageChange(pagination.page - 1)}
          disabled={pagination.page <= 1 || isLoading}
        >
          Previous
        </button>
        <button
          type="button"
          className="secondary-button h-10 px-4 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => onPageChange(pagination.page + 1)}
          disabled={pagination.page >= pagination.totalPages || isLoading}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PaginationControls;

