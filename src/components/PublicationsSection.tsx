import { BookOpen, ExternalLink } from 'lucide-react';
import { Publication } from '../types';

interface PublicationsSectionProps {
  publications: Publication[];
}

export function PublicationsSection({ publications }: PublicationsSectionProps) {
  if (publications.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-10">
          <BookOpen size={32} className="text-blue-600" />
          <h2 className="text-3xl font-bold text-slate-900">Publications</h2>
        </div>

        <div className="space-y-6">
          {publications.map((pub) => (
            <div
              key={pub.id}
              className="border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow bg-white"
            >
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {pub.title}
              </h3>

              <p className="text-slate-700 mb-2">
                {pub.authors}
              </p>

              <p className="text-blue-600 font-medium mb-3">
                {pub.venue} • {pub.date}
              </p>

              {pub.abstract && (
                <p className="text-slate-600 leading-relaxed mb-4">
                  {pub.abstract}
                </p>
              )}

              <div className="flex flex-wrap gap-4 text-sm">
                {pub.doi && (
                  <span className="text-slate-500">
                    DOI: {pub.doi}
                  </span>
                )}
                {pub.url && (
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    View Publication <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
