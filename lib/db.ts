import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.DB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.DB_URI;
const dbName = process.env.DB_NAME;

if (!uri || !dbName) {
  throw new Error("Missing DB_URI or DB_NAME in environment variables");
}

const options = {
  dbName,
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client: MongoClient;

if (process.env.NODE_ENV === "development") {
  // Use a global variable to preserve the value across module reloads caused by HMR
  const globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient;
  };

  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri, options);
  }
  client = globalWithMongo._mongoClient;
} else {
  // In production mode, avoid using a global variable
  client = new MongoClient(uri, options);
}

// Export a module-scoped MongoClient. This allows sharing the client across functions.
export default client;
