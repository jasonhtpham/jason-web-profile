import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { Profile, Education, Project, Award, Publication } from './types';
import { Hero } from './components/Hero';
import { EducationSection } from './components/EducationSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AwardsSection } from './components/AwardsSection';
import { PublicationsSection } from './components/PublicationsSection';

function App() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [education, setEducation] = useState<Education[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [awards, setAwards] = useState<Award[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [profileRes, educationRes, projectsRes, awardsRes, publicationsRes] = await Promise.all([
          supabase.from('profile').select('*').limit(1).maybeSingle(),
          supabase.from('education').select('*').order('sort_order', { ascending: true }),
          supabase.from('projects').select('*').order('sort_order', { ascending: true }),
          supabase.from('awards').select('*').order('sort_order', { ascending: true }),
          supabase.from('publications').select('*').order('sort_order', { ascending: true }),
        ]);

        if (profileRes.data) setProfile(profileRes.data);
        if (educationRes.data) setEducation(educationRes.data);
        if (projectsRes.data) setProjects(projectsRes.data);
        if (awardsRes.data) setAwards(awardsRes.data);
        if (publicationsRes.data) setPublications(publicationsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Hero profile={profile} />
      <EducationSection education={education} />
      <ProjectsSection projects={projects} />
      <AwardsSection awards={awards} />
      <PublicationsSection publications={publications} />

      <footer className="bg-slate-900 text-slate-300 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p>© {new Date().getFullYear()} {profile?.name || 'Portfolio'}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
