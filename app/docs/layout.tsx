import DocsSidebar from '@/components/DocsSidebar';
import PrevNext from '@/components/PrevNext';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      <style>{`
        @media (min-width: 900px) {
          .docs-grid { grid-template-columns: 220px minmax(0,1fr) !important; }
          .docs-side { position: sticky; top: 84px; align-self: start; }
        }
      `}</style>
      <div className="docs-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 44, alignItems: 'start' }}>
        <aside className="docs-side">
          <DocsSidebar />
        </aside>
        <article style={{ minWidth: 0, animation: 'zo-fade .3s ease' }}>
          {children}
          <PrevNext />
        </article>
      </div>
    </div>
  );
}
