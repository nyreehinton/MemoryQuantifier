import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fs from "fs";
import path from "path";
import { adverseActionsData } from "./api/adverseActions";
import { creditReportsData } from "./api/creditReports";
import { damagesData } from "./api/damages";
import { tasksData, activitiesData } from "./api/tasks";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for adverse actions
  app.get("/api/adverse-actions", (req, res) => {
    res.json(adverseActionsData);
  });

  app.get("/api/adverse-actions/:id", (req, res) => {
    const action = adverseActionsData.find(a => a.document_index === Number(req.params.id));
    if (!action) {
      return res.status(404).json({ message: "Adverse action not found" });
    }
    res.json(action);
  });

  app.post("/api/adverse-actions", (req, res) => {
    // In a real app, this would add a new adverse action
    res.status(201).json({ message: "Adverse action added" });
  });

  // API routes for credit reports
  app.get("/api/credit-reports", (req, res) => {
    res.json(creditReportsData);
  });

  app.get("/api/credit-reports/:id", (req, res) => {
    const report = creditReportsData.find(r => r.report_need_id === req.params.id);
    if (!report) {
      return res.status(404).json({ message: "Credit report not found" });
    }
    res.json(report);
  });

  app.patch("/api/credit-reports/:id", (req, res) => {
    // In a real app, this would update a credit report's status
    res.json({ message: "Credit report updated" });
  });

  // API routes for damages
  app.get("/api/damages", (req, res) => {
    res.json(damagesData);
  });

  app.get("/api/damages/:id", (req, res) => {
    const damage = damagesData.find(d => d.id === req.params.id);
    if (!damage) {
      return res.status(404).json({ message: "Damage not found" });
    }
    res.json(damage);
  });

  app.patch("/api/damages/:id", (req, res) => {
    // In a real app, this would update a damage item
    res.json({ message: "Damage updated" });
  });

  // API routes for tasks
  app.get("/api/tasks", (req, res) => {
    res.json(tasksData);
  });

  app.post("/api/tasks", (req, res) => {
    // In a real app, this would add a new task
    res.status(201).json({ message: "Task added" });
  });

  app.patch("/api/tasks/:id", (req, res) => {
    // In a real app, this would update a task
    res.json({ message: "Task updated" });
  });

  // API routes for activities
  app.get("/api/activities", (req, res) => {
    res.json(activitiesData);
  });

  // API route for generating reports
  app.post("/api/reports/generate", (req, res) => {
    // In a real app, this would generate a report based on the request
    res.json({ message: "Report generated", reportUrl: "/reports/sample-report.pdf" });
  });

  const httpServer = createServer(app);

  return httpServer;
}
