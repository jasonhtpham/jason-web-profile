import { Linkedin, Mail, MapPin } from 'lucide-react';
import { Profile } from '../types';

interface HeroProps {
  profile: Profile | null;
}

export function Hero({ profile }: HeroProps) {
  if (!profile) {
    return (
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="animate-pulse glass-card rounded-2xl p-8">
            <div className="h-32 w-32 bg-slate-800 rounded-full mb-6"></div>
            <div className="h-8 bg-slate-800 rounded w-64 mb-4"></div>
            <div className="h-6 bg-slate-800 rounded w-48"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="glass-card rounded-2xl p-8 md:p-10">
          <div className="flex items-center gap-3 mb-6" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.8)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80 shadow-[0_0_12px_rgba(16,185,129,0.7)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-400/80 shadow-[0_0_12px_rgba(129,140,248,0.7)]" />
            <div className="h-px flex-1 bg-gradient-to-r from-slate-700/80 to-transparent" />
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={profile.name}
              className="w-32 h-32 rounded-full object-cover shadow-lg ring-2 ring-sky-400/60"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg ring-2 ring-sky-400/60">
              {profile.name.charAt(0)}
            </div>
          )}

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-3">
              {profile.name}
            </h1>
            <p className="text-xl text-sky-300 font-medium mb-4">
              {profile.title}
            </p>
            <p className="text-slate-300 text-lg mb-6 max-w-3xl">
              {profile.bio}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start text-slate-300">
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-2 hover:text-sky-300 transition-colors data-chip rounded-full px-4 py-2 w-fit"
                >
                  <Mail size={20} />
                  <span>{profile.email}</span>
                </a>
              )}
              {profile.location && (
                <div className="flex items-center gap-2 data-chip rounded-full px-4 py-2 w-fit">
                  <MapPin size={20} />
                  <span>{profile.location}</span>
                </div>
              )}
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-sky-300 transition-colors data-chip rounded-full px-4 py-2 w-fit">
                  <Linkedin size={20} />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
