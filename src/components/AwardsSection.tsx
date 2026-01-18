import { Award as AwardIcon } from 'lucide-react';
import { Award } from '../types';

interface AwardsSectionProps {
  awards: Award[];
}

export function AwardsSection({ awards }: AwardsSectionProps) {
  if (awards.length === 0) {
    return null;
  }

  return (
    <section className="py-6">
      <div className="max-w-6xl mx-auto px-6">
        <div className="glass-card rounded-2xl p-8 md:p-10">
          <div className="flex items-center gap-3 mb-10">
            <AwardIcon size={32} className="text-sky-300" />
            <h2 className="text-3xl font-bold text-slate-100">Awards & Achievements</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {awards.map((award) => (
              <div
                key={award.id}
                className="border border-slate-800/80 rounded-xl p-6 transition-all bg-slate-950/40 hover:border-sky-400/50 hover:shadow-[0_0_24px_rgba(56,189,248,0.18)]"
              >
                <div className="flex items-start gap-4">
                  <div className="data-chip p-3 rounded-lg">
                    <AwardIcon size={24} className="text-sky-300" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-100 mb-1">
                      {award.title}
                    </h3>
                    <p className="text-sky-300 font-medium mb-2">
                      {award.issuer}
                    </p>
                    {award.description && (
                      <p className="text-slate-300 text-sm mb-2 leading-relaxed">
                        {award.description}
                      </p>
                    )}
                    <p className="text-slate-400 text-sm">
                      {award.date}
                    </p>
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
