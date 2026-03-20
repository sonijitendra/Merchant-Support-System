const AppError = require("../utils/appError");
const {
  MAX_LIMIT,
  PRIORITY_OPTIONS,
  SORT_OPTIONS,
  STATUS_OPTIONS,
} = require("../utils/constants");

const isBlank = (value) =>
  typeof value !== "string" || value.trim().length === 0;

const buildValidationError = (errors) =>
  new AppError("Validation failed.", 400, errors);

const validateCreateTicket = (req, res, next) => {
  const errors = {};
  const { message, priority, subject } = req.body;

  if (isBlank(subject)) {
    errors.subject = "Subject is required.";
  } else {
    const trimmedSubject = subject.trim();

    if (trimmedSubject.length < 3 || trimmedSubject.length > 120) {
      errors.subject = "Subject must be between 3 and 120 characters.";
    } else {
      req.body.subject = trimmedSubject;
    }
  }

  if (isBlank(message)) {
    errors.message = "Message is required.";
  } else {
    const trimmedMessage = message.trim();

    if (trimmedMessage.length < 10 || trimmedMessage.length > 2000) {
      errors.message = "Message must be between 10 and 2000 characters.";
    } else {
      req.body.message = trimmedMessage;
    }
  }

  if (!PRIORITY_OPTIONS.includes(priority)) {
    errors.priority = "Priority must be Low, Medium, or High.";
  }

  if (Object.keys(errors).length > 0) {
    next(buildValidationError(errors));
    return;
  }

  next();
};

const validateStatusUpdate = (req, res, next) => {
  const errors = {};
  const { status } = req.body;

  if (!STATUS_OPTIONS.includes(status)) {
    errors.status = "Status must be NEW, INVESTIGATING, or RESOLVED.";
  }

  if (Object.keys(errors).length > 0) {
    next(buildValidationError(errors));
    return;
  }

  next();
};

const validateTicketQuery = (req, res, next) => {
  const errors = {};
  const { limit, page, priority, sort, status } = req.query;

  if (page !== undefined) {
    const pageNumber = Number.parseInt(page, 10);

    if (Number.isNaN(pageNumber) || pageNumber < 1) {
      errors.page = "Page must be a positive integer.";
    }
  }

  if (limit !== undefined) {
    const limitNumber = Number.parseInt(limit, 10);

    if (
      Number.isNaN(limitNumber) ||
      limitNumber < 1 ||
      limitNumber > MAX_LIMIT
    ) {
      errors.limit = `Limit must be between 1 and ${MAX_LIMIT}.`;
    }
  }

  if (status !== undefined && !STATUS_OPTIONS.includes(status)) {
    errors.status = "Status filter must be NEW, INVESTIGATING, or RESOLVED.";
  }

  if (priority !== undefined && !PRIORITY_OPTIONS.includes(priority)) {
    errors.priority = "Priority filter must be Low, Medium, or High.";
  }

  if (sort !== undefined && !SORT_OPTIONS.includes(sort)) {
    errors.sort = "Sort must be latest or priority.";
  }

  if (Object.keys(errors).length > 0) {
    next(buildValidationError(errors));
    return;
  }

  next();
};

module.exports = {
  validateCreateTicket,
  validateStatusUpdate,
  validateTicketQuery,
};

