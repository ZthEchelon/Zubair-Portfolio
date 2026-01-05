import { motion } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  FileText, 
  Mail, 
  ChevronDown,
  Code2,
  Database,
  Layout,
  Server
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/SectionHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { ExperienceItem } from "@/components/ExperienceItem";
import { ContactForm } from "@/components/ContactForm";
import { 
  useProfile, 
  useProjects, 
  useExperiences, 
  useEducation, 
  useSkills 
} from "@/hooks/use-portfolio";

export default function Portfolio() {
  const { data: profile } = useProfile();
  const { data: projects } = useProjects();
  const { data: experiences } = useExperiences();
  const { data: education } = useEducation();
  const { data: skills } = useSkills();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (!profile && !projects && !experiences) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground animate-pulse">Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  // Group skills by category
  const skillsByCategory = skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 h-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <span className="font-display font-bold text-xl tracking-tight text-primary">ZM.</span>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <button onClick={() => scrollToSection('about')} className="hover:text-primary transition-colors">About</button>
            <button onClick={() => scrollToSection('skills')} className="hover:text-primary transition-colors">Skills</button>
            <button onClick={() => scrollToSection('experience')} className="hover:text-primary transition-colors">Experience</button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-primary transition-colors">Projects</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-primary transition-colors">Contact</button>
          </div>
          <Button 
            size="sm" 
            onClick={() => scrollToSection('contact')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md shadow-primary/20"
          >
            Hire Me
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={fadeInUp}>
                <span className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm inline-block mb-6">
                  Available for new opportunities
                </span>
                <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tight leading-[1.1] mb-6">
                  Hi, I'm <span className="text-gradient block">{profile?.name || "Zubair Muwwakil"}</span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                  {profile?.title || "Software Developer & Financial Analyst"}
                </p>
                <p className="text-muted-foreground leading-relaxed max-w-xl mt-4">
                  {profile?.bio || "Passionate about building scalable software solutions and analyzing financial data to drive business growth."}
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                {profile?.githubUrl && (
                  <Button variant="outline" size="lg" className="rounded-xl h-12 gap-2" asChild>
                    <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-5 h-5" /> GitHub
                    </a>
                  </Button>
                )}
                {profile?.linkedinUrl && (
                  <Button variant="outline" size="lg" className="rounded-xl h-12 gap-2" asChild>
                    <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-5 h-5" /> LinkedIn
                    </a>
                  </Button>
                )}
                {profile?.resumeUrl && (
                  <Button variant="outline" size="lg" className="rounded-xl h-12 gap-2" asChild>
                    <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
                      <FileText className="w-5 h-5" /> Resume
                    </a>
                  </Button>
                )}
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative hidden lg:block"
            >
              <div className="aspect-square rounded-[2rem] overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 p-2 rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="w-full h-full rounded-[1.8rem] overflow-hidden bg-card relative">
                  {/* Abstract placeholder or profile image */}
                  {profile?.imageUrl ? (
                    <img src={profile.imageUrl} alt={profile.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <span className="text-9xl opacity-10 font-display font-bold">ZM</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Button variant="ghost" size="icon" onClick={() => scrollToSection('skills')}>
            <ChevronDown className="w-6 h-6 text-muted-foreground" />
          </Button>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Technical Proficiency" 
            subtitle="A comprehensive toolkit for modern software development and data analysis."
            centered 
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(skillsByCategory || {}).map(([category, categorySkills], idx) => {
              const icons = {
                'frontend': <Layout className="w-6 h-6 text-primary" />,
                'backend': <Server className="w-6 h-6 text-primary" />,
                'data': <Database className="w-6 h-6 text-primary" />,
                'tools': <Code2 className="w-6 h-6 text-primary" />
              };
              
              return (
                <motion.div 
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-card rounded-xl p-6 border border-border/50 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      {icons[category as keyof typeof icons] || <Code2 className="w-6 h-6 text-primary" />}
                    </div>
                    <h3 className="text-lg font-bold font-display capitalize">{category}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {categorySkills.map(skill => (
                      <div key={skill.id}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-muted-foreground">{skill.proficiency}%</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.proficiency}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-primary rounded-full" 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Professional Journey" />
          
          <div className="space-y-12">
            {experiences?.map((exp, index) => (
              <ExperienceItem key={exp.id} experience={exp} index={index} />
            ))}
          </div>

          <div className="mt-20">
            <h3 className="text-2xl font-bold font-display mb-8">Education</h3>
            <div className="grid gap-6">
              {education?.map((edu, index) => (
                <motion.div 
                  key={edu.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card p-6 rounded-xl border border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <h4 className="text-lg font-bold font-display">{edu.school}</h4>
                    <p className="text-primary font-medium">{edu.degree}, {edu.field}</p>
                  </div>
                  <div className="text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full w-fit">
                    {edu.startDate} - {edu.endDate || "Present"}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Featured Projects" 
            subtitle="A selection of my recent work showcasing my technical capabilities."
            centered
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionHeader 
                title="Let's Work Together" 
                subtitle="I'm always interested in hearing about new projects and opportunities."
              />
              
              <div className="space-y-8 mt-8">
                <div className="flex items-start gap-4">
                  <div className="p-4 bg-primary/10 rounded-xl text-primary">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold font-display mb-1">Email Me</h4>
                    <p className="text-muted-foreground mb-2">I'll get back to you within 24 hours.</p>
                    <a href={`mailto:${profile?.email}`} className="text-primary font-medium hover:underline">
                      {profile?.email || "contact@example.com"}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-4 bg-primary/10 rounded-xl text-primary">
                    <Linkedin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold font-display mb-1">Connect on LinkedIn</h4>
                    <p className="text-muted-foreground mb-2">Let's expand our professional network.</p>
                    <a 
                      href={profile?.linkedinUrl || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary font-medium hover:underline"
                    >
                      View Profile
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:pt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/50 bg-background text-center">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} {profile?.name}. All rights reserved. Built with React & Tailwind.
          </p>
        </div>
      </footer>
    </div>
  );
}
