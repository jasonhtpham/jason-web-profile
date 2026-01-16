import { Mail, MapPin } from 'lucide-react';
import { Profile } from '../types';

interface HeroProps {
  profile: Profile | null;
}

export function Hero({ profile }: HeroProps) {
  if (!profile) {
    return (
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="animate-pulse">
            <div className="h-32 w-32 bg-slate-200 rounded-full mb-6"></div>
            <div className="h-8 bg-slate-200 rounded w-64 mb-4"></div>
            <div className="h-6 bg-slate-200 rounded w-48"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={profile.name}
              className="w-32 h-32 rounded-full object-cover shadow-lg"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              {profile.name.charAt(0)}
            </div>
          )}

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
              {profile.name}
            </h1>
            <p className="text-xl text-blue-600 font-medium mb-4">
              {profile.title}
            </p>
            <p className="text-slate-600 text-lg mb-6 max-w-3xl">
              {profile.bio}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start text-slate-600">
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-2 hover:text-blue-600 transition-colors"
                >
                  <Mail size={20} />
                  <span>{profile.email}</span>
                </a>
              )}
              {profile.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={20} />
                  <span>{profile.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
