import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mem;

export async function startDB() {
  mem = await MongoMemoryServer.create();
  await mongoose.connect(mem.getUri("masari_test"));
}

export async function stopDB() {
  await mongoose.disconnect();
  if (mem) await mem.stop();
}

export async function clearDB() {
  const { collections } = mongoose.connection;
  for (const key of Object.keys(collections)) {
    await collections[key].deleteMany({});
  }
}
