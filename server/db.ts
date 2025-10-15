import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

// Configure for development - bypass SSL verification for local/dev databases
if (process.env.NODE_ENV === 'development') {
  neonConfig.useSecureWebSocket = false;
  neonConfig.pipelineTLS = false;
  neonConfig.pipelineConnect = false;
}

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}

const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  ssl: false
});
export const db = drizzle(pool);
