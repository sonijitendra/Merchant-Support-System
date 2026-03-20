import { useState } from "react";
import { PRIORITY_OPTIONS } from "../constants/tickets";

const emptyForm = {
  subject: "",
  message: "",
  priority: "Medium",
};

const validateForm = (values) => {
  const errors = {};

  if (!values.subject.trim()) {
    errors.subject = "Subject is required.";
  } else if (
    values.subject.trim().length < 3 ||
    values.subject.trim().length > 120
  ) {
    errors.subject = "Subject must be between 3 and 120 characters.";
  }

  if (!values.message.trim()) {
    errors.message = "Message is required.";
  } else if (
    values.message.trim().length < 10 ||
    values.message.trim().length > 2000
  ) {
    errors.message = "Message must be between 10 and 2000 characters.";
  }

  if (!PRIORITY_OPTIONS.includes(values.priority)) {
    errors.priority = "Choose a valid priority.";
  }

  return errors;
};

function TicketForm({ isSubmitting, onSubmit }) {
  const [formValues, setFormValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const messageLength = formValues.message.length;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    setErrors((currentErrors) => {
      if (!currentErrors[name]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[name];
      return nextErrors;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm(formValues);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const result = await onSubmit({
      subject: formValues.subject.trim(),
      message: formValues.message.trim(),
      priority: formValues.priority,
    });

    if (result.ok) {
      setFormValues(emptyForm);
      setErrors({});
      return;
    }

    if (result.errors) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        ...result.errors,
      }));
    }
  };

  return (
    <section className="panel rounded-[2rem] p-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          New Ticket
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900">
          Create a support inquiry
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Capture merchant issues with clean validation and sensible defaults.
        </p>
      </div>

      <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">Subject</span>
          <input
            type="text"
            name="subject"
            value={formValues.subject}
            onChange={handleChange}
            className="field-input"
            placeholder="Payment settlement delay"
            disabled={isSubmitting}
          />
          {errors.subject ? <p className="field-error">{errors.subject}</p> : null}
        </label>

        <label className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-700">Message</span>
            <span className="text-xs font-semibold text-slate-400">
              {messageLength}/2000
            </span>
          </div>
          <textarea
            name="message"
            value={formValues.message}
            onChange={handleChange}
            className="field-input min-h-36 resize-none"
            placeholder="Describe the issue, steps tried, and the merchant impact."
            disabled={isSubmitting}
          />
          {errors.message ? <p className="field-error">{errors.message}</p> : null}
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">Priority</span>
          <select
            name="priority"
            value={formValues.priority}
            onChange={handleChange}
            className="field-input"
            disabled={isSubmitting}
          >
            {PRIORITY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.priority ? <p className="field-error">{errors.priority}</p> : null}
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="primary-button h-12 w-full disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Submitting ticket..." : "Submit ticket"}
        </button>
      </form>
    </section>
  );
}

export default TicketForm;
