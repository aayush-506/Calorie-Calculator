const mongoose = require("mongoose");

const connect = async (retries = 5) => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // 10 seconds timeout
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    
    if (error.message.includes("ETIMEOUT") || error.message.includes("DNS")) {
      console.warn("💡 TIP: This looks like a network or DNS issue. If you are on a restricted network, consider changing your DNS to 8.8.8.8.");
    }

    if (retries > 0) {
      console.log(`🔄 Retrying connection... (${retries} attempts left)`);
      setTimeout(() => connect(retries - 1), 5000); // Wait 5s before retry
    } else {
      console.error("🚫 Maximum connection attempts reached. Exiting...");
      process.exit(1);
    }
  }
};

module.exports = connect;
