import { useQuery } from "@tanstack/react-query";
import { 
  profile as staticProfile,
  experiences as staticExperiences,
  education as staticEducation,
  projects as staticProjects,
  skills as staticSkills,
} from "@/data/portfolio";

const staticQueryOptions = {
  staleTime: Infinity,
  gcTime: Infinity,
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
};

// Static profile data
export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => staticProfile,
    initialData: staticProfile,
    ...staticQueryOptions,
  });
}

// Static experiences
export function useExperiences() {
  return useQuery({
    queryKey: ["experiences"],
    queryFn: async () => staticExperiences,
    initialData: staticExperiences,
    ...staticQueryOptions,
  });
}

// Static education
export function useEducation() {
  return useQuery({
    queryKey: ["education"],
    queryFn: async () => staticEducation,
    initialData: staticEducation,
    ...staticQueryOptions,
  });
}

// Static projects
export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => staticProjects,
    initialData: staticProjects,
    ...staticQueryOptions,
  });
}

// Static skills
export function useSkills() {
  return useQuery({
    queryKey: ["skills"],
    queryFn: async () => staticSkills,
    initialData: staticSkills,
    ...staticQueryOptions,
  });
}
