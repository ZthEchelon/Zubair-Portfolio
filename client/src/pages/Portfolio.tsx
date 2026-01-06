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
  const { data: profile, isError: profileError, isLoading: profileLoading } = useProfile();
  const { data: projects, isError: projectsError, isLoading: projectsLoading } = useProjects();
  const { data: experiences, isError: experiencesError, isLoading: experiencesLoading } = useExperiences();
  const { data: education, isError: educationError, isLoading: educationLoading } = useEducation();
  const { data: skills, isError: skillsError, isLoading: skillsLoading } = useSkills();

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
    "Return Reminder & Tracking SaaS": {
      problem: "Consumers frequently miss return deadlines or forget to follow up on refunds because purchase information is fragmented across emails and receipts. Most finance tools track spending passively but don’t manage return lifecycles or enforce deadlines.",
      built: "SaaS platform for tracking return deadlines, refund status, and money at risk—email ingestion, reminders, and Stripe subscriptions included.",
      decisions: [
        "Stripe subscription model with webhook-driven state to manage plan changes, access limits, and entitlements without coupling billing logic to request flows.",
        "Idempotent webhook handling using event IDs to prevent duplicate state transitions during retries.",
        "Role-based access control (RBAC) separating free vs paid capabilities (active return limits, refund reminders).",
        "Email-as-input, dashboard-as-source-of-truth to minimize user friction while keeping system state explicit and auditable.",
        "Deterministic background jobs for deadline and refund reminders, ensuring retries don’t double-send notifications.",
        "Policy-based deadline computation using merchant templates with user overrides instead of brittle receipt parsing."
      ],
      impact: [
        "Demonstrated end-to-end SaaS architecture: auth, billing, webhooks, background jobs, and stateful workflows.",
        "Prevented missed return deadlines by surfacing time-bound “money at risk” with proactive reminders.",
        "Reliable ingestion from inconsistent email formats without requiring bank access or inbox-wide permissions.",
        "Clear operational visibility with traceable events from email ingestion through reminders and refunds."
      ].join("\n"),
      links: {
        demo: "https://returnreminder.zubairmuwwakil.com",
        github: "https://github.com/ZthEchelon/return-reminder-saas",
        caseStudy: "https://returnreminder.zubairmuwwakil.com/case-study",
      },
      stack: [
        "Node",
        "Postgres",
        "Stripe Subscriptions",
        "Webhooks",
        "Background jobs",
        "Email ingestion"
      ],
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

  // Show loading only if all queries are still loading and none have errored
  const isLoading = profileLoading && projectsLoading && experiencesLoading;
  const hasErrors = profileError || projectsError || experiencesError;

  // On GitHub Pages (static deployment), API calls will fail - show content with defaults
  if (isLoading && !hasErrors) {
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
      {/* Navigation - new style */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <a href="#hero" className="flex items-center space-x-2 group cursor-pointer" onClick={e => { e.preventDefault(); scrollToSection('hero'); }}>
              <div className="bg-primary text-primary-foreground p-2 rounded-lg group-hover:scale-110 transition-transform">
                <img src="/logo.png" alt="ZM Logo" className="w-6 h-6 object-contain" />
              </div>
              <span className="font-serif font-bold text-xl tracking-tight">Zubair Muwwakil</span>
            </a>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-muted-foreground hover:text-primary font-medium transition-colors text-sm uppercase tracking-wide" onClick={e => { e.preventDefault(); scrollToSection('about'); }}>About</a>
              <a href="#experience" className="text-muted-foreground hover:text-primary font-medium transition-colors text-sm uppercase tracking-wide" onClick={e => { e.preventDefault(); scrollToSection('experience'); }}>Experience</a>
              <a href="#projects" className="text-muted-foreground hover:text-primary font-medium transition-colors text-sm uppercase tracking-wide" onClick={e => { e.preventDefault(); scrollToSection('projects'); }}>Projects</a>
              <a href="#contact" className="text-muted-foreground hover:text-primary font-medium transition-colors text-sm uppercase tracking-wide" onClick={e => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a>
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 border border-transparent h-9 w-9 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon h-5 w-5"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
              </button>
              <a href="#contact" className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 bg-primary text-primary-foreground border border-primary-border min-h-9 py-2 rounded-full px-6 font-semibold" onClick={e => { e.preventDefault(); scrollToSection('contact'); }}>Hire Me</a>
            </div>
            <div className="md:hidden flex items-center gap-4">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 border border-transparent h-9 w-9 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon h-5 w-5"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
              </button>
              <button className="text-foreground hover:text-primary transition-colors p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu w-6 h-6"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - updated style */}
      <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="container-padding relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
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
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 bg-primary text-primary-foreground border border-primary-border min-h-10 px-8 rounded-xl h-12 gap-2 shadow-lg shadow-primary/25" onClick={() => scrollToSection('projects')}>
                  View Projects
                </button>
                <a href={profileData.resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 border [border-color:var(--button-outline)] shadow-xs active:shadow-none min-h-10 px-8 rounded-xl h-12 gap-2">
                  <FileText className="w-5 h-5" /> Resume (PDF)
                </a>
                <a href={profileData.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 border border-transparent min-h-10 px-8 rounded-xl h-12 gap-2 text-muted-foreground">
                  <Github className="w-5 h-5" /> GitHub
                </a>
                <a href={profileData.linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 border border-transparent min-h-10 px-8 rounded-xl h-12 gap-2 text-muted-foreground">
                  <Linkedin className="w-5 h-5" /> LinkedIn
                </a>
              </div>
              <div className="flex flex-wrap gap-3 pt-4">
                <span className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">Java / Spring Boot • React • SQL • Docker</span>
                <span className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">Built data pipelines + web apps</span>
                <span className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">Open to US remote (US citizen)</span>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative z-10 w-full aspect-square rounded-full overflow-hidden border-8 border-background shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
                  <span className="text-9xl font-serif text-muted-foreground/20">ZM</span>
                </div>
              </div>
              <div className="absolute top-10 -left-10 bg-background p-4 rounded-xl shadow-lg border z-20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-terminal w-8 h-8 text-blue-500"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" x2="20" y1="19" y2="19"></line></svg>
              </div>
              <div className="absolute bottom-10 -right-10 bg-background p-4 rounded-xl shadow-lg border z-20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chart-line w-8 h-8 text-green-500"><path d="M3 3v16a2 2 0 0 0 2 2h16"></path><path d="m19 9-5 5-4-4-3 3"></path></svg>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 border border-transparent h-9 w-9" onClick={() => scrollToSection('about')}>
            <ChevronDown className="w-6 h-6 text-muted-foreground" />
          </button>
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
          {/* Render all project cards from orderedProjects, and always include Return Reminder & Tracking SaaS */}
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
            {orderedProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                caseStudy={projectCaseStudies[project.title]} 
                index={index} 
              />
            ))}
            {/* Always show Return Reminder & Tracking SaaS if not already in the list */}
            {!orderedProjects.some(p => p.title === "Return Reminder & Tracking SaaS") && (
              <ProjectCard 
                key="return-reminder-tracking-saas"
                project={{
                  id: "return-reminder-tracking-saas",
                  title: "Return Reminder & Tracking SaaS",
                  description: projectCaseStudies["Return Reminder & Tracking SaaS"].problem,
                  stack: projectCaseStudies["Return Reminder & Tracking SaaS"].stack,
                }}
                caseStudy={projectCaseStudies["Return Reminder & Tracking SaaS"]}
                index={orderedProjects.length}
              />
            )}
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
