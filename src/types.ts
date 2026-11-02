export interface EducationItem {
  id: string;
  period: string;
  institution: string;
  degreeOrField: string;
  description: string;
  focus: string[];
}

export interface WorkItem {
  id: string;
  role: string;
  company: string;
  url: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: {
    name: string;
    level: string;
    detail: string;
  }[];
}

export interface InterestItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  color: 'purple' | 'blue' | 'green' | 'amber';
}
