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
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-10">
          <AwardIcon size={32} className="text-blue-600" />
          <h2 className="text-3xl font-bold text-slate-900">Awards & Achievements</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {awards.map((award) => (
            <div
              key={award.id}
              className="border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow bg-white"
            >
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <AwardIcon size={24} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">
                    {award.title}
                  </h3>
                  <p className="text-blue-600 font-medium mb-2">
                    {award.issuer}
                  </p>
                  {award.description && (
                    <p className="text-slate-600 text-sm mb-2 leading-relaxed">
                      {award.description}
                    </p>
                  )}
                  <p className="text-slate-500 text-sm">
                    {award.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
