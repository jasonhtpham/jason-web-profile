import { GraduationCap } from 'lucide-react';
import { Education } from '../types';

interface EducationSectionProps {
  education: Education[];
}

export function EducationSection({ education }: EducationSectionProps) {
  if (education.length === 0) {
    return null;
  }

  return (
    <section className="py-6">
      <div className="max-w-6xl mx-auto px-6">
        <div className="glass-card rounded-2xl p-8 md:p-10">
          <div className="flex items-center gap-3 mb-10">
            <GraduationCap size={32} className="text-sky-300" />
            <h2 className="text-3xl font-bold text-slate-100">Education</h2>
          </div>

          <div className="space-y-6">
            {education.map((edu) => (
              <div
                key={edu.id}
                className="border border-slate-800/80 rounded-xl p-6 transition-all bg-slate-950/40 hover:border-sky-400/50 hover:shadow-[0_0_24px_rgba(56,189,248,0.18)]"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-100 mb-2">
                      {edu.degree} in {edu.field}
                    </h3>
                    <p className="text-lg text-sky-300 font-medium mb-2">
                      {edu.institution}
                    </p>
                    {edu.description && (
                      <p className="text-slate-300 leading-relaxed">
                        {edu.description}
                      </p>
                    )}
                  </div>
                  <div className="text-slate-400 text-sm font-medium whitespace-nowrap">
                    {edu.start_date} - {edu.end_date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
