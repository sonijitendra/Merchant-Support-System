const styles = {
  success:
    "border-emerald-200 bg-emerald-50 text-emerald-800 shadow-emerald-100/80",
  error: "border-rose-200 bg-rose-50 text-rose-800 shadow-rose-100/80",
};

function FeedbackBanner({ feedback, onDismiss }) {
  if (!feedback) {
    return null;
  }

  return (
    <div className="fixed inset-x-4 top-4 z-50 mx-auto max-w-md">
      <div
        className={`rounded-2xl border px-4 py-3 shadow-lg backdrop-blur ${styles[feedback.type]}`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold">
              {feedback.type === "success" ? "Success" : "Something went wrong"}
            </p>
            <p className="mt-1 text-sm leading-6">{feedback.message}</p>
          </div>
          <button
            type="button"
            className="text-sm font-semibold opacity-70 transition hover:opacity-100"
            onClick={onDismiss}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeedbackBanner;

