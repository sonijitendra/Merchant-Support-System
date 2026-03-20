const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Ticket = require("../models/Ticket");

dotenv.config();

const seedTickets = [
  {
    subject: "Payment delay",
    message:
      "The merchant's payout has been delayed beyond the expected settlement window and needs urgent review.",
    priority: "High",
    status: "NEW",
  },
  {
    subject: "Login issue",
    message:
      "A merchant reported that the dashboard login works intermittently and support needs to investigate the account access flow.",
    priority: "Medium",
    status: "INVESTIGATING",
  },
  {
    subject: "UI bug",
    message:
      "The order summary card overlaps on smaller screens and the layout needs a quick cleanup before the next release.",
    priority: "Low",
    status: "RESOLVED",
  },
  {
    subject: "Refund issue",
    message:
      "A refund request was processed but the transaction status is not reflecting correctly in the merchant dashboard.",
    priority: "High",
    status: "INVESTIGATING",
  },
  {
    subject: "API timeout",
    message:
      "The merchant's integration calls are timing out during peak traffic and the support team needs to review the API logs.",
    priority: "Medium",
    status: "NEW",
  },
];

const connectDatabase = async () => {
  const { MONGODB_URI } = process.env;

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not configured.");
  }

  await mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
  });
};

const seedDatabase = async () => {
  try {
    await connectDatabase();

    const deleteResult = await Ticket.deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} existing tickets.`);

    const insertedTickets = await Ticket.insertMany(seedTickets);
    console.log(`Seeded ${insertedTickets.length} tickets successfully.`);

    process.exitCode = 0;
  } catch (error) {
    console.error("Ticket seed failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
    process.exit(process.exitCode || 0);
  }
};

seedDatabase();

