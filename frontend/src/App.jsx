import { useEffect, useState } from "react";
import { createTicket, fetchTickets, updateTicketStatus } from "./api/tickets";
import DashboardStats from "./components/DashboardStats";
import FeedbackBanner from "./components/FeedbackBanner";
import FilterBar from "./components/FilterBar";
import PaginationControls from "./components/PaginationControls";
import TicketForm from "./components/TicketForm";
import TicketTable from "./components/TicketTable";
import { DEFAULT_FILTERS } from "./constants/tickets";

const defaultSummary = {
  totalTickets: 0,
  openTickets: 0,
  resolvedTickets: 0,
};

const defaultPagination = {
  page: 1,
  limit: DEFAULT_FILTERS.limit,
  totalItems: 0,
  totalPages: 1,
};

const getErrorPayload = (error) => ({
  errors: error.response?.data?.errors || null,
  message:
    error.response?.data?.message ||
    "The request could not be completed. Please try again.",
});

function App() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [tickets, setTickets] = useState([]);
  const [summary, setSummary] = useState(defaultSummary);
  const [pagination, setPagination] = useState(defaultPagination);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updatingTicketId, setUpdatingTicketId] = useState("");
  const [feedback, setFeedback] = useState(null);

  const hasActiveFilters = Boolean(
    filters.search ||
      filters.status ||
      filters.priority ||
      filters.sort !== DEFAULT_FILTERS.sort
  );

  const loadTickets = async (nextFilters, options = {}) => {
    const shouldKeepData = options.keepData || false;
    setIsLoading(true);

    try {
      const data = await fetchTickets(nextFilters);
      setTickets(data.tickets);
      setSummary(data.summary);
      setPagination(data.pagination);
    } catch (error) {
      const payload = getErrorPayload(error);
      setFeedback({ type: "error", message: payload.message });

      if (!shouldKeepData) {
        setTickets([]);
        setPagination(defaultPagination);
        setSummary(defaultSummary);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTickets(DEFAULT_FILTERS);
  }, []);

  useEffect(() => {
    if (!feedback) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setFeedback(null);
    }, 3500);

    return () => window.clearTimeout(timer);
  }, [feedback]);

  const applyFilters = (nextFilters, options = {}) => {
    setFilters(nextFilters);
    loadTickets(nextFilters, options);
  };

  const handleFilterChange = (key, value) => {
    applyFilters(
      {
        ...filters,
        [key]: value,
        page: 1,
      },
      { keepData: true }
    );
  };

  const handleSearchSubmit = (search) => {
    applyFilters(
      {
        ...filters,
        search,
        page: 1,
      },
      { keepData: true }
    );
  };

  const handleResetFilters = () => {
    applyFilters(DEFAULT_FILTERS, { keepData: true });
  };

  const handlePageChange = (page) => {
    applyFilters(
      {
        ...filters,
        page,
      },
      { keepData: true }
    );
  };

  const handleCreateTicket = async (payload) => {
    setIsSubmitting(true);

    try {
      const response = await createTicket(payload);
      const nextFilters = {
        ...filters,
        page: 1,
      };

      setFeedback({ type: "success", message: response.message });
      applyFilters(nextFilters, { keepData: true });

      return { ok: true };
    } catch (error) {
      const payloadData = getErrorPayload(error);
      setFeedback({ type: "error", message: payloadData.message });

      return {
        ok: false,
        errors: payloadData.errors,
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateStatus = async (ticketId, status) => {
    setUpdatingTicketId(ticketId);

    try {
      const response = await updateTicketStatus(ticketId, status);
      setFeedback({ type: "success", message: response.message });
      await loadTickets(filters, { keepData: true });
    } catch (error) {
      const payload = getErrorPayload(error);
      setFeedback({ type: "error", message: payload.message });
    } finally {
      setUpdatingTicketId("");
    }
  };

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <FeedbackBanner feedback={feedback} onDismiss={() => setFeedback(null)} />

      <main className="mx-auto max-w-7xl">
        <section className="relative overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-8 text-white shadow-2xl shadow-slate-900/20 sm:px-8 lg:px-10">
          <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.22),_transparent_58%)] lg:block" />
          <div className="relative max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">
            Merchant Support Desk

            </p>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Manage and track support tickets with a clear workflow.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            Create tickets, track progress, and resolve issues based on priority.
            </p>
          </div>
        </section>

        <div className="mt-6 space-y-6">
          <DashboardStats isLoading={isLoading} summary={summary} />
          <FilterBar
            filters={filters}
            hasActiveFilters={hasActiveFilters}
            isLoading={isLoading}
            onChange={handleFilterChange}
            onReset={handleResetFilters}
            onSearch={handleSearchSubmit}
          />

          <div className="grid gap-6 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.38fr)]">
            <TicketForm isSubmitting={isSubmitting} onSubmit={handleCreateTicket} />
            <div>
              <TicketTable
                hasActiveFilters={hasActiveFilters}
                isLoading={isLoading}
                onResetFilters={handleResetFilters}
                onUpdateStatus={handleUpdateStatus}
                tickets={tickets}
                updatingTicketId={updatingTicketId}
              />
              <PaginationControls
                isLoading={isLoading}
                onPageChange={handlePageChange}
                pagination={pagination}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
