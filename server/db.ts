import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

// In development, allow self-signed certificates
if (process.env.NODE_ENV === 'development') {
  neonConfig.wsProxy = (host) => `${host}?sslmode=require`;
  neonConfig.useSecureWebSocket = true;
  neonConfig.pipelineConnect = false;
}

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}

const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  // Allow self-signed certificates in development
  ssl: process.env.NODE_ENV === 'development' ? { rejectUnauthorized: false } : true
});
export const db = drizzle(pool);
