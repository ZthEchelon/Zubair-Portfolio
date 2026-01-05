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

  const profileDefaults = {
    name: "Zubair Muwwakil",
    title: "Software Engineer (Full-Stack / Backend)",
    bio: "Finance-informed engineer who builds production APIs, data pipelines, and web apps with reliability, data integrity, and performance top of mind.",
    email: "zmuwwakil@gmail.com",
    linkedinUrl: "https://www.linkedin.com/in/zubairmuwwakil/",
    githubUrl: "https://github.com/ZthEchelon",
    resumeUrl: "https://drive.google.com/file/d/1Z87uMI6RrrPa9KeIhZChkpzl-YYZYgTr/view?usp=sharing",
  };

  const profileData = {
    name: profile?.name || profileDefaults.name,
    title: profileDefaults.title,
    bio: profileDefaults.bio,
    email: profile?.email || profileDefaults.email,
    linkedinUrl: profile?.linkedinUrl || profileDefaults.linkedinUrl,
    githubUrl: profile?.githubUrl || profileDefaults.githubUrl,
    resumeUrl: profile?.resumeUrl || profileDefaults.resumeUrl,
  };

  type SkillLevel = "strong" | "working" | "familiar";
  type SkillDisplay = { name: string; category: string; level?: SkillLevel; proficiency?: number | null };

  const curatedSkills: SkillDisplay[] = [
    { name: "Java (Spring Boot)", category: "core", level: "strong", proficiency: 95 },
    { name: "TypeScript / JavaScript", category: "core", level: "strong", proficiency: 95 },
    { name: "React", category: "core", level: "strong", proficiency: 92 },
    { name: "SQL", category: "core", level: "strong", proficiency: 90 },
    { name: "Node.js", category: "also", level: "working", proficiency: 85 },
    { name: "Python", category: "also", level: "working", proficiency: 82 },
    { name: "Docker", category: "also", level: "working", proficiency: 85 },
    { name: "Postgres", category: "also", level: "working", proficiency: 85 },
    { name: "Prisma", category: "also", level: "working", proficiency: 82 },
    { name: "REST APIs", category: "also", level: "working", proficiency: 88 },
    { name: "Testing (JUnit / Jest)", category: "also", level: "working", proficiency: 82 },
    { name: "CI/CD", category: "also", level: "working", proficiency: 82 },
    { name: "Clean Architecture", category: "practices", level: "strong", proficiency: 95 },
    { name: "API Design", category: "practices", level: "strong", proficiency: 92 },
    { name: "Schema Migrations", category: "practices", level: "working", proficiency: 85 },
    { name: "Observability Basics", category: "practices", level: "working", proficiency: 80 },
  ];

  const mapProficiencyToLevel = (proficiency?: number | null): SkillLevel => {
    if ((proficiency || 0) >= 90) return "strong";
    if ((proficiency || 0) >= 75) return "working";
    return "familiar";
  };

  const displaySkills = (skills?.length ? skills : curatedSkills).map((skill) => ({
    name: skill.name,
    category: skill.category,
    level: "level" in skill ? (skill as SkillDisplay).level : mapProficiencyToLevel(skill.proficiency),
  }));

  const skillsByCategory = displaySkills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, SkillDisplay[]>);

  const levelStyles: Record<SkillLevel, string> = {
    strong: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-100",
    working: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-100",
    familiar: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-100",
  };

  const aboutLines = [
    "I ship backend-heavy systems, web apps, and data pipelines with Java/Spring Boot, TypeScript/Node, React, and SQL.",
    "I care about correctness, maintainability, and data integrity—typed contracts, schema migrations, CI/CD, and observability basics.",
    "Built Pickleball Session Manager: scheduling, balancing, and rating logic with Prisma migrations and a pairing algorithm tuned for fair play.",
    "Built a Market Data Pipeline that normalizes indicators, caches responses, and exposes fast APIs for downstream dashboards.",
    "Delivered client web apps and automation as a full-stack developer; I keep UX fast while the backend stays predictable.",
    "Looking for backend or full-stack SWE roles on teams that value reliable, measurable releases.",
  ];

  const lookingForLine = "Backend / Full-Stack SWE roles • Java/Spring Boot or TS/Node • Remote US";

  const proofLinks = [
    { label: "Resume PDF", href: profileData.resumeUrl, icon: FileText },
    { label: "GitHub", href: profileData.githubUrl, icon: Github },
    { label: "LinkedIn", href: profileData.linkedinUrl, icon: Linkedin },
  ];

  type CaseStudy = {
    problem: string;
    built: string;
    decisions: string[];
    impact: string;
    links?: {
      demo?: string;
      github?: string;
      caseStudy?: string;
    };
  };

  const projectCaseStudies: Record<string, CaseStudy> = {
    "Pickleball Session Manager": {
      problem: "Pickleball clubs needed fair ladders and rating updates without spreadsheets.",
      built: "Full-stack app with Prisma/Postgres and a React front end to schedule sessions, balance pairings, and keep ratings honest.",
      decisions: [
        "Prisma migrations and seed data for players, ladders, and sessions to keep environments reproducible.",
        "Balancing algorithm that pairs players by rating tiers and recent matchups to avoid repeats.",
        "Rating updates applied per match with guardrails for defaults/forfeits and audit-friendly history.",
        "Role-based admin surface so captains can open sessions, lock courts, and override scores safely.",
      ],
      impact: "Sessions stay balanced and schedulers stopped spending nights in spreadsheets.",
      links: {
        demo: "https://pickleball.zubairmuwwakil.com",
        github: "https://github.com/ZthEchelon/pickleball-session-manager",
        caseStudy: profileData.resumeUrl,
      },
    },
    "Market Data Pipeline": {
      problem: "Needed reliable, de-duplicated market indicators for dashboards without hammering upstream APIs.",
      built: "Backend pipeline that ingests price/indicator feeds, normalizes them into Postgres, and serves typed REST endpoints.",
      decisions: [
        "Idempotent ingest jobs with upserts keyed by symbol/date to prevent duplicate rows across retries.",
        "Caching hot indicator queries to cut API calls and keep dashboard latency predictable.",
        "Normalized indicator tables with indexes by symbol/timeframe for fast slices and joins.",
        "Contract-tested REST endpoints with sample payloads to keep downstream teams unblocked.",
      ],
      impact: "Consistent indicator data, faster dashboards, and predictable costs when third-party APIs rate-limit.",
      links: {
        demo: "https://github.com/ZthEchelon/market-data-pipeline",
        github: "https://github.com/ZthEchelon/market-data-pipeline",
        caseStudy: profileData.resumeUrl,
      },
    },
    "MindSky Website": {
      problem: "MindSky needed a fast, clear landing page that converts curious users without looking like a template.",
      built: "Responsive marketing site with modular sections, analytics hooks, and lightweight animations.",
      decisions: [
        "Static-first build for instant page loads and SEO wins.",
        "Composable content blocks so non-engineers can swap copy without breaking layout.",
        "Accessibility checks and mobile-first spacing to keep bounce rate low.",
      ],
      impact: "Sharper storytelling with a site that loads fast and looks intentional on every device.",
      links: {
        demo: "https://mindsky.zubairmuwwakil.com",
        github: profileData.githubUrl,
        caseStudy: profileData.resumeUrl,
      },
    },
  };

  const orderedProjects = (projects || []).slice().sort((a, b) => {
    const aFeatured = projectCaseStudies[a.title] ? 1 : 0;
    const bFeatured = projectCaseStudies[b.title] ? 1 : 0;
    if (aFeatured !== bFeatured) return bFeatured - aFeatured;
    return (a.id || 0) - (b.id || 0);
  });

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

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 h-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <button 
            onClick={() => scrollToSection('hero')}
            className="font-display font-bold text-xl tracking-tight text-primary hover:text-primary/80 transition-colors"
          >
            ZM.
          </button>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <button onClick={() => scrollToSection('about')} className="hover:text-primary transition-colors">About</button>
            <button onClick={() => scrollToSection('skills')} className="hover:text-primary transition-colors">Skills</button>
            <button onClick={() => scrollToSection('experience')} className="hover:text-primary transition-colors">Experience</button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-primary transition-colors">Projects</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-primary transition-colors">Contact</button>
          </div>
          <Button 
            size="sm" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md shadow-primary/20"
            asChild
          >
            <a href={profileData.resumeUrl} target="_blank" rel="noopener noreferrer">
              Resume
            </a>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-20 md:pt-44 md:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
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
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
                    {profileData.title}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold">
                    Open to US remote • US Citizen
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold font-display tracking-tight leading-[1.1] mb-3 text-foreground">
                  {profileData.name}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
                  {profileData.bio}
                </p>
                <p className="text-muted-foreground leading-relaxed max-w-2xl mt-3">
                  I ship typed contracts, resilient services, and clean architecture so features keep moving instead of fighting regressions.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Button size="lg" className="rounded-xl h-12 gap-2 shadow-lg shadow-primary/25" onClick={() => scrollToSection('projects')}>
                  View Projects
                </Button>
                <Button variant="outline" size="lg" className="rounded-xl h-12 gap-2" asChild>
                  <a href={profileData.resumeUrl} target="_blank" rel="noopener noreferrer">
                    <FileText className="w-5 h-5" /> Resume (PDF)
                  </a>
                </Button>
                <Button variant="ghost" size="lg" className="rounded-xl h-12 gap-2 text-muted-foreground" asChild>
                  <a href={profileData.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5" /> GitHub
                  </a>
                </Button>
                <Button variant="ghost" size="lg" className="rounded-xl h-12 gap-2 text-muted-foreground" asChild>
                  <a href={profileData.linkedinUrl} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-5 h-5" /> LinkedIn
                  </a>
                </Button>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
                {[
                  "Java / Spring Boot • React • SQL • Docker",
                  "Built data pipelines + web apps",
                  "Open to US remote (US citizen)"
                ].map((chip) => (
                  <span 
                    key={chip} 
                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium"
                  >
                    {chip}
                  </span>
                ))}
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
          <Button variant="ghost" size="icon" onClick={() => scrollToSection('about')}>
            <ChevronDown className="w-6 h-6 text-muted-foreground" />
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="About" 
            subtitle="Evidence over hype—what I build, how I build it, and where I'm headed."
          />

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-card rounded-2xl border border-border/60 p-8 shadow-sm">
              <div className="grid gap-3">
                {aboutLines.map((line) => (
                  <p key={line} className="text-muted-foreground leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-card rounded-2xl border border-border/60 p-6">
                <h3 className="text-lg font-semibold font-display mb-2">What I'm looking for</h3>
                <p className="text-muted-foreground leading-relaxed">{lookingForLine}</p>
              </div>

              <div className="bg-card rounded-2xl border border-border/60 p-6">
                <h3 className="text-lg font-semibold font-display mb-4">Proof / Links</h3>
                <div className="space-y-3">
                  {proofLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a 
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                      >
                        <span className="p-2 rounded-lg bg-secondary text-secondary-foreground">
                          <Icon className="w-4 h-4" />
                        </span>
                        <span className="font-medium">{link.label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Technical Skills" 
            subtitle="Signals I lean on: strong foundations, reliable delivery, and systems that hold up."
            centered 
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skillsByCategory || {}).map(([category, categorySkills], idx) => {
              const icons = {
                'core': <Server className="w-6 h-6 text-primary" />,
                'also': <Layout className="w-6 h-6 text-primary" />,
                'practices': <Database className="w-6 h-6 text-primary" />,
              };

              const categoryLabels: Record<string, string> = {
                core: "Core stack",
                also: "Also use",
                practices: "Practices",
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
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      {icons[category as keyof typeof icons] || <Code2 className="w-6 h-6 text-primary" />}
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">{categoryLabels[category] || "Toolkit"}</p>
                      <h3 className="text-lg font-bold font-display capitalize">{category}</h3>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map(skill => (
                      <span 
                        key={skill.name}
                        className="px-3 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium inline-flex items-center gap-2"
                      >
                        {skill.name}
                        {skill.level && (
                          <span className={`text-[11px] px-2 py-0.5 rounded-full ${levelStyles[skill.level]}`}>
                            {skill.level === "strong" ? "Strong" : skill.level === "working" ? "Working" : "Familiar"}
                          </span>
                        )}
                      </span>
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
          <SectionHeader 
            title="Experience" 
            subtitle="Impact snapshots from recent roles."
          />
          
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
            title="Case Studies" 
            subtitle="What I built, why I built it that way, and how it performs."
            centered
          />
          
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
            {orderedProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                caseStudy={projectCaseStudies[project.title]} 
                index={index} 
              />
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
                subtitle="Email or LinkedIn is fastest; the form routes straight to my inbox."
              />
              
              <div className="space-y-8 mt-8">
                <div className="flex items-start gap-4">
                  <div className="p-4 bg-primary/10 rounded-xl text-primary">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold font-display mb-1">Email Me</h4>
                    <p className="text-muted-foreground mb-2">Best for detailed notes or links—I'll reply with next steps.</p>
                    <a href={`mailto:${profileData.email}`} className="text-primary font-medium hover:underline">
                      {profileData.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-4 bg-primary/10 rounded-xl text-primary">
                    <Linkedin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold font-display mb-1">Connect on LinkedIn</h4>
                    <p className="text-muted-foreground mb-2">Quick intros and updates—mention the role you have in mind.</p>
                    <a 
                      href={profileData.linkedinUrl || "#"} 
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
            © {new Date().getFullYear()} {profileData.name}. All rights reserved. Built with React & Tailwind.
          </p>
        </div>
      </footer>
    </div>
  );
}
