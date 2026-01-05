import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { db } from "./db";
import { profile as profileTable, experiences as experiencesTable, education as educationTable, projects as projectsTable, skills as skillsTable } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.profile.get.path, async (req, res) => {
    const profile = await storage.getProfile();
    res.json(profile || {});
  });

  app.get(api.experiences.list.path, async (req, res) => {
    const experiences = await storage.getExperiences();
    res.json(experiences);
  });

  app.get(api.education.list.path, async (req, res) => {
    const education = await storage.getEducation();
    res.json(education);
  });

  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get(api.skills.list.path, async (req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      await storage.createContactMessage(input);
      res.json({ success: true });
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input" });
        return;
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Seed Data
  const profileSeed = {
    name: "Zubair Muwwakil",
    title: "Software Engineer (Full-Stack / Backend)",
    bio: "Finance-informed engineer who builds production APIs, data pipelines, and web apps with reliability, data integrity, and performance top of mind.",
    email: "zmuwwakil@gmail.com",
    linkedinUrl: "https://www.linkedin.com/in/zubairmuwwakil/",
    githubUrl: "https://github.com/ZthEchelon",
    resumeUrl: "https://drive.google.com/file/d/1Z87uMI6RrrPa9KeIhZChkpzl-YYZYgTr/view?usp=sharing"
  };

  const experiencesSeed = [
    {
      company: "SAP Fioneer",
      role: "Software Engineer",
      startDate: "Jan 2022",
      endDate: "Aug 2022",
      description: [
        "Built Spring Boot services for banking workflows and shipped API changes through CI/CD without downtime.",
        "Added validation layers and integration tests to protect data integrity across payment and ledger updates.",
        "Improved observability with structured logging/metrics so incidents were diagnosable in minutes instead of hours."
      ].join("\n")
    },
    {
      company: "WeMeta",
      role: "Software Engineer",
      startDate: "Jul 2021",
      endDate: "Feb 2023",
      description: [
        "Delivered React/TypeScript features and Node.js endpoints that served marketplace data with predictable sub-second latency.",
        "Introduced caching and pagination strategies that cut unnecessary API calls and stabilized dashboard performance.",
        "Hardened releases with automated tests and pipelines so weekly deploys shipped without breaking user sessions."
      ].join("\n")
    },
    {
      company: "Web Dev / Full Stack",
      role: "Software Engineer",
      startDate: "Dec 2019",
      endDate: "Mar 2023",
      description: [
        "Built and maintained client web apps in Whitby as a full-stack developer—React frontends backed by REST/SQL services.",
        "Stood up data pipelines and dashboards that replaced manual spreadsheets for small teams.",
        "Owned deployments, Dockerized services, and monitoring so changes could ship quickly with rollback options."
      ].join("\n")
    }
  ];

  const educationSeed = [
    {
      school: "University of Toronto",
      degree: "Bachelor of Computer Science",
      field: "Computer Science",
      startDate: "2019",
      endDate: "2023"
    }
  ];

  const projectsSeed = [
    {
      title: "Pickleball Session Manager",
      description: "Full-stack ladder manager with scheduling, pairing, and rating updates to keep club play fair.",
      link: "https://pickleball.zubairmuwwakil.com",
      githubLink: "https://github.com/ZthEchelon/pickleball-session-manager",
      tags: ["React", "Prisma", "Postgres", "TypeScript", "Auth"]
    },
    {
      title: "Market Data Pipeline",
      description: "Backend pipeline that ingests, normalizes, and serves financial indicators via REST APIs.",
      link: "https://github.com/ZthEchelon/market-data-pipeline",
      githubLink: "https://github.com/ZthEchelon/market-data-pipeline",
      tags: ["Java", "Spring Boot", "SQL", "Caching", "APIs"]
    },
    {
      title: "MindSky Website",
      description: "Fast marketing site with modular sections, analytics hooks, and responsive design.",
      link: "https://mindsky.zubairmuwwakil.com",
      githubLink: "https://github.com/ZthEchelon",
      tags: ["React", "TypeScript", "Design Systems"]
    }
  ];

  const skillsSeed = [
    { name: "Java (Spring Boot)", category: "core", proficiency: 95 },
    { name: "TypeScript / JavaScript", category: "core", proficiency: 95 },
    { name: "React", category: "core", proficiency: 92 },
    { name: "SQL", category: "core", proficiency: 90 },
    { name: "Node.js", category: "also", proficiency: 85 },
    { name: "Python", category: "also", proficiency: 82 },
    { name: "Docker", category: "also", proficiency: 85 },
    { name: "Postgres", category: "also", proficiency: 85 },
    { name: "Prisma", category: "also", proficiency: 82 },
    { name: "REST APIs", category: "also", proficiency: 88 },
    { name: "Testing (JUnit / Jest)", category: "also", proficiency: 82 },
    { name: "CI/CD", category: "also", proficiency: 82 },
    { name: "Clean Architecture", category: "practices", proficiency: 95 },
    { name: "API Design", category: "practices", proficiency: 92 },
    { name: "Schema Migrations", category: "practices", proficiency: 85 },
    { name: "Observability Basics", category: "practices", proficiency: 80 },
  ];

  const existingProfile = await storage.getProfile();
  const experienceCount = (await storage.getExperiences()).length;
  const projectCount = (await storage.getProjects()).length;
  const skillCount = (await storage.getSkills()).length;
  const shouldSeed = !existingProfile || existingProfile.title !== profileSeed.title || experienceCount === 0 || projectCount === 0 || skillCount < skillsSeed.length;

  if (shouldSeed) {
    await db.delete(experiencesTable);
    await db.delete(educationTable);
    await db.delete(projectsTable);
    await db.delete(skillsTable);
    await db.delete(profileTable);

    await storage.createProfile(profileSeed);
    for (const exp of experiencesSeed) {
      await storage.createExperience(exp);
    }
    for (const edu of educationSeed) {
      await storage.createEducation(edu);
    }
    for (const project of projectsSeed) {
      await storage.createProject(project);
    }
    for (const skill of skillsSeed) {
      await storage.createSkill(skill);
    }
  }

  return httpServer;
}
