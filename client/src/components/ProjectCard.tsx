import { motion } from "framer-motion";
import { Github, ExternalLink, Tag } from "lucide-react";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-card rounded-2xl overflow-hidden border border-border/50 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden bg-muted">
        {project.imageUrl ? (
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
            <Tag className="w-12 h-12 text-primary/20" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          {project.githubLink && (
            <a 
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          {project.link && (
            <a 
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-primary text-white rounded-full hover:scale-110 transition-transform"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold font-display mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-grow">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags?.map((tag) => (
            <span 
              key={tag} 
              className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
