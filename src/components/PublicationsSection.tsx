import { useState } from 'react';
import { ArrowDown, ArrowUp, BookOpen, ExternalLink } from 'lucide-react';
import { Publication } from '../types';

interface PublicationsSectionProps {
  publications: Publication[];
}

export function PublicationsSection({ publications }: PublicationsSectionProps) {
  if (publications.length === 0) {
    return null;
  }

  const [openAbstracts, setOpenAbstracts] = useState<Set<string>>(() => new Set());

  function toggleAbstract(id: string) {
    setOpenAbstracts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <section className="py-6">
      <div className="max-w-6xl mx-auto px-6">
        <div className="glass-card rounded-2xl p-8 md:p-10">
          <div className="flex items-center gap-3 mb-10">
            <BookOpen size={32} className="text-sky-300" />
            <h2 className="text-3xl font-bold text-slate-100">Publications</h2>
          </div>

          <div className="space-y-6">
            {publications.map((pub) => {
              const isOpen = openAbstracts.has(pub.id);
              const abstractId = `abstract-${pub.id}`;
              return (
                <div
                  key={pub.id}
                  className="border border-slate-800/80 rounded-xl p-6 transition-all bg-slate-950/40 hover:border-sky-400/50 hover:shadow-[0_0_24px_rgba(56,189,248,0.18)]"
                >
                  <h3 className="text-xl font-semibold text-slate-100 mb-3">
                    {pub.title}
                  </h3>

                  <p className="text-slate-200 mb-2">
                    {pub.authors}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-sky-300 font-medium mb-3">
                    <span>
                      {pub.venue} • {pub.date}
                    </span>
                  </div>

                  {pub.doi && (
                    <p className="text-slate-300 leading-relaxed mb-4">
                      DOI: {pub.doi}
                    </p>
                  )}

{pub.abstract && isOpen && (
                    <>
                      <h4 className="text-lg font-semibold text-slate-100 mb-2">Abstract</h4><p id={abstractId} className="text-slate-300 leading-relaxed mb-4">
                        {pub.abstract}
                      </p>
                    </>
                  )}

                  {pub.abstract && (
                    <button
                      type="button"
                      onClick={() => toggleAbstract(pub.id)}
                      className="text-sky-300 hover:text-sky-200 font-medium transition-colors mb-4"
                      aria-expanded={isOpen}
                      aria-controls={abstractId}
                    >
                      {/* down arrow next to Hide abstract or Show abstract */}
                      {isOpen
                        ? <span className="flex items-center gap-1">
                          Hide abstract <ArrowUp size={16} />
                        </span>
                        : <span className="flex items-center gap-1">
                          Show abstract <ArrowDown size={16} />
                        </span>}
                    </button>
                  )}

                  <div className="flex flex-wrap gap-4 text-sm">
                    {pub.url && (
                      <a
                        href={pub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sky-300 hover:text-sky-200 font-medium transition-colors"
                      >
                        View Publication <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
