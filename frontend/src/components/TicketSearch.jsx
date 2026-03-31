import { useEffect, useState } from "react";

function TicketSearch({ disabled, onSearch, value }) {
  const [draftSearch, setDraftSearch] = useState(value ?? "");

  useEffect(() => {
    setDraftSearch(value ?? "");
  }, [value]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(draftSearch.trim());
  };

  const handleClear = () => {
    setDraftSearch("");
    onSearch("");
  };

  return (
    <form className="space-y-2" onSubmit={handleSubmit}>
      <label
        htmlFor="ticket-subject-search"
        className="text-sm font-semibold text-slate-700"
      >
        Search by subject
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="ticket-subject-search"
          type="search"
          placeholder="Type a subject keyword..."
          value={draftSearch}
          disabled={disabled}
          onChange={(event) => setDraftSearch(event.target.value)}
          className="field-input flex-1"
        />
        <button
          type="submit"
          disabled={disabled}
          className="primary-button h-11 px-5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Search
        </button>
        <button
          type="button"
          onClick={handleClear}
          disabled={disabled || !draftSearch}
          className="secondary-button h-11 px-4 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Clear search
        </button>
      </div>
    </form>
  );
}

export default TicketSearch;
