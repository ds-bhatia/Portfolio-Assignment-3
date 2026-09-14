import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { projects } from "./data/projects.js";

dotenv.config();
const app = express();
const port = Number(process.env.PORT || 5000);
const allowedOrigin = process.env.ALLOWED_ORIGIN || "http://localhost:5173";
const directory = path.dirname(fileURLToPath(import.meta.url));
const contactsFile = path.resolve(directory, process.env.CONTACTS_FILE || "./data/contacts.json");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
app.use(cors({ origin: allowedOrigin }));
app.use(express.json());
async function getContacts() { try { return JSON.parse(await readFile(contactsFile, "utf8")); } catch (error) { if (error.code === "ENOENT") return []; throw error; } }
async function saveContacts(contacts) { await mkdir(path.dirname(contactsFile), { recursive: true }); await writeFile(contactsFile, JSON.stringify(contacts, null, 2)); }
app.get("/", (request, response) => response.json({ status: "ok" }));
app.get("/api/projects", (request, response) => response.json(projects));
app.get("/api/projects/:id", (request, response) => { const project = projects.find((item) => item.id === request.params.id); if (!project) return response.status(404).json({ error: "Project not found" }); response.json(project); });
app.get("/api/contact", async (request, response, next) => { try { response.json(await getContacts()); } catch (error) { next(error); } });
app.post("/api/contact", async (request, response, next) => { try { const { name, email, message } = request.body || {}; if (!name || !String(name).trim()) return response.status(400).json({ error: "Name is required" }); if (!email || !String(email).trim()) return response.status(400).json({ error: "Email is required" }); if (!emailPattern.test(String(email).trim())) return response.status(400).json({ error: "Enter a valid email address" }); if (!message || !String(message).trim()) return response.status(400).json({ error: "Message is required" }); const contacts = await getContacts(); const submission = { id: crypto.randomUUID(), name: String(name).trim(), email: String(email).trim(), message: String(message).trim(), submittedAt: new Date().toISOString() }; contacts.push(submission); await saveContacts(contacts); response.status(201).json({ message: "Message sent successfully", submission }); } catch (error) { next(error); } });
app.use((request, response) => response.status(404).json({ error: "Route not found" }));
app.use((error, request, response, _next) => { console.error(error); response.status(error.status || 500).json({ error: error.message || "Internal server error" }); });
app.listen(port, () => console.log(`Server running on port ${port}`));
