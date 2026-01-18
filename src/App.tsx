import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { Profile, Education, Project, Award, Publication } from './types';
import { Hero } from './components/Hero';
import { EducationSection } from './components/EducationSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AwardsSection } from './components/AwardsSection';
import { PublicationsSection } from './components/PublicationsSection';

const CURRENT_LABELS = new Set(['current', 'present']);

function toSortableDate(value: string | null | undefined) {
  if (!value) return 0;
  const normalized = value.trim().toLowerCase();
  if (CURRENT_LABELS.has(normalized)) {
    return Number.MAX_SAFE_INTEGER;
  }
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}

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
          supabase.from('education').select('*').order('end_date', { ascending: false }),
          supabase.from('projects').select('*').order('end_date', { ascending: false }),
          supabase.from('awards').select('*').order('date', { ascending: false }),
          supabase.from('publications').select('*').order('date', { ascending: false }),
        ]);

        if (profileRes.data) setProfile(profileRes.data);
        if (educationRes.data) {
          setEducation(
            [...educationRes.data].sort(
              (a, b) => toSortableDate(b.end_date) - toSortableDate(a.end_date),
            ),
          );
        }
        if (projectsRes.data) {
          setProjects(
            [...projectsRes.data].sort(
              (a, b) => toSortableDate(b.end_date) - toSortableDate(a.end_date),
            ),
          );
        }
        if (awardsRes.data) {
          setAwards(
            [...awardsRes.data].sort(
              (a, b) => toSortableDate(b.date) - toSortableDate(a.date),
            ),
          );
        }
        if (publicationsRes.data) {
          setPublications(
            [...publicationsRes.data].sort(
              (a, b) => toSortableDate(b.date) - toSortableDate(a.date),
            ),
          );
        }
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
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center glass-card rounded-2xl px-8 py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400 mx-auto mb-4"></div>
          <p className="text-slate-200">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30 grid-drift" />
      <div className="pointer-events-none absolute inset-0 bg-glow glow-drift" />
      <div className="pointer-events-none absolute inset-y-0 -left-1/4 w-[150%] opacity-30 scanline" />
      <div className="pointer-events-none absolute inset-0">
        <span className="node-pulse absolute left-[12%] top-[18%] h-28 w-28 rounded-full blur-2xl opacity-60" />
        <span className="node-pulse absolute left-[68%] top-[12%] h-20 w-20 rounded-full blur-2xl opacity-50 [animation-delay:1.4s]" />
        <span className="node-pulse absolute left-[82%] top-[48%] h-24 w-24 rounded-full blur-2xl opacity-45 [animation-delay:2.2s]" />
        <span className="node-pulse absolute left-[18%] top-[64%] h-24 w-24 rounded-full blur-2xl opacity-40 [animation-delay:3s]" />
        <span className="node-pulse absolute left-[45%] top-[78%] h-32 w-32 rounded-full blur-2xl opacity-35 [animation-delay:4s]" />
      </div>

      <div className="relative z-10">
        <Hero profile={profile} />
        <EducationSection education={education} />
        <ProjectsSection projects={projects} />
        <AwardsSection awards={awards} />
        <PublicationsSection publications={publications} />

        <footer className="border-t border-slate-800/70 text-slate-400 py-10 mt-10">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p>© {new Date().getFullYear()} {profile?.name || 'Portfolio'}. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
