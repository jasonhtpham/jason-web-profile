export interface Profile {
  id: string;
  name: string;
  title: string;
  bio: string;
  email: string;
  location: string;
  avatar_url?: string;
  linkedin?: string;
  created_at: string;
  updated_at: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  start_date: string;
  end_date: string;
  description?: string;
  sort_order: number;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  url?: string;
  github_url?: string;
  image_url?: string;
  start_date: string;
  end_date: string;
  featured: boolean;
  sort_order: number;
  created_at: string;
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
  sort_order: number;
  created_at: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string;
  venue: string;
  date: string;
  url?: string;
  doi?: string;
  abstract?: string;
  sort_order: number;
  created_at: string;
}
