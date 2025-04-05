import express, { Router } from 'express';
import serverless from 'serverless-http';
import { registerRoutes } from '../../server/routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize routes without top-level await
const setupServer = async () => {
  const server = await registerRoutes(app);
  return app;
};

// Setup error handling
app.use((err: any, _req: any, res: any, _next: any) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ message });
});

// Export handler for serverless function
export const handler = async (event: any, context: any) => {
  // Initialize the server before handling the request
  await setupServer();
  
  // Return the serverless handler
  return serverless(app)(event, context);
};