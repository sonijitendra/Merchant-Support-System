const buildCorsOptions = () => {
  const allowedOrigins = (process.env.CLIENT_URL || "https://merchant-support-system.vercel.app/")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  return {
    credentials: true,
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Origin is not allowed by CORS."));
    },
  };
};

module.exports = buildCorsOptions;

