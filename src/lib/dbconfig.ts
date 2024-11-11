import mongoose from "mongoose";

type connectionObject = {
  isConnected?: Number;
};

const connection: connectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }
  try {
    const db = await mongoose.connect(
      process.env.NEXT_PUBLIC_DB_CONNECTION || ""
    );
    connection.isConnected = db.connections[0].readyState;
    // console.log("db", db);
    // console.log("db", db.connections[0].readyState);
    console.log("db connected successfully");
  } catch (error) {
    console.log("connection failed ", error);
    process.exit(1);
  }
}

export default dbConnect;
