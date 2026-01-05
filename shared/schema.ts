import { pgTable, text, serial, varchar, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const profile = pgTable("profile", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  bio: text("bio").notNull(),
  imageUrl: text("image_url"),
  email: text("email").notNull(),
  linkedinUrl: text("linkedin_url"),
  githubUrl: text("github_url"),
  resumeUrl: text("resume_url"),
});

export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  company: text("company").notNull(),
  role: text("role").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  description: text("description").notNull(),
});

export const education = pgTable("education", {
  id: serial("id").primaryKey(),
  school: text("school").notNull(),
  degree: text("degree").notNull(),
  field: text("field").notNull(),
  startDate: text("start_date"),
  endDate: text("end_date"),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  link: text("link"),
  githubLink: text("github_link"),
  tags: text("tags").array(),
});

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // 'frontend', 'backend', 'data', 'tools'
  proficiency: integer("proficiency"), // 1-100
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Schemas
export const insertProfileSchema = createInsertSchema(profile);
export const insertExperienceSchema = createInsertSchema(experiences);
export const insertEducationSchema = createInsertSchema(education);
export const insertProjectSchema = createInsertSchema(projects);
export const insertSkillSchema = createInsertSchema(skills);
export const insertContactMessageSchema = createInsertSchema(contactMessages);

// Types
export type Profile = typeof profile.$inferSelect;
export type Experience = typeof experiences.$inferSelect;
export type Education = typeof education.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Skill = typeof skills.$inferSelect;
export type ContactMessage = typeof contactMessages.$inferSelect;

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;

import { integer } from "drizzle-orm/pg-core";
