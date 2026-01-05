import { 
  profile, experiences, education, projects, skills, contactMessages,
  type Profile, type Experience, type Education, type Project, type Skill, type InsertContactMessage
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getProfile(): Promise<Profile | undefined>;
  getExperiences(): Promise<Experience[]>;
  getEducation(): Promise<Education[]>;
  getProjects(): Promise<Project[]>;
  getSkills(): Promise<Skill[]>;
  createContactMessage(message: InsertContactMessage): Promise<void>;
  
  // Seed methods
  createProfile(profile: any): Promise<void>;
  createExperience(experience: any): Promise<void>;
  createEducation(education: any): Promise<void>;
  createProject(project: any): Promise<void>;
  createSkill(skill: any): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getProfile(): Promise<Profile | undefined> {
    const profiles = await db.select().from(profile);
    return profiles[0];
  }

  async getExperiences(): Promise<Experience[]> {
    return await db.select().from(experiences);
  }

  async getEducation(): Promise<Education[]> {
    return await db.select().from(education);
  }

  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  }

  async createContactMessage(message: InsertContactMessage): Promise<void> {
    await db.insert(contactMessages).values(message);
  }

  // Seed methods implementation
  async createProfile(data: any): Promise<void> {
    await db.insert(profile).values(data);
  }
  async createExperience(data: any): Promise<void> {
    await db.insert(experiences).values(data);
  }
  async createEducation(data: any): Promise<void> {
    await db.insert(education).values(data);
  }
  async createProject(data: any): Promise<void> {
    await db.insert(projects).values(data);
  }
  async createSkill(data: any): Promise<void> {
    await db.insert(skills).values(data);
  }
}

export const storage = new DatabaseStorage();
