import fs from 'fs';
import path from 'path';

interface DashboardData {
  skills: any[];
  knowledge: any[];
  projects: any[];
  stats: { skills: number; knowledge: number; projects: number };
}

export async function getStaticProps() {
  try {
    const indexPath = path.join(process.cwd(), 'public', 'workspace-index.json');
    const data = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
    
    return {
      props: { data },
      revalidate: 3600
    };
  } catch (error) {
    console.error('Error loading data:', error);
    return {
      props: { data: { skills: [], knowledge: [], projects: [], stats: { skills: 0, knowledge: 0, projects: 0 } } },
      revalidate: 60
    };
  }
}

export default function Home({ data }: { data: DashboardData }) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <nav style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>🚀 Internal Dashboard</h1>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>🚀 Internal Dashboard</h2>
          <p style={{ color: '#6b7280', margin: '0.5rem 0 0 0' }}>Skills, Knowledge, Projects & Tools Overview</p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 2rem' }}>
        {/* Skills Section */}
        <section style={{ marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>🛠️ Skills ({data.stats.skills})</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {data.skills?.map((skill: any) => (
              <div key={skill.name} style={{ backgroundColor: 'white', padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>{skill.name}</h4>
                <p style={{ margin: '0.5rem 0 0.75rem 0', color: '#6b7280', fontSize: '0.875rem' }}>{skill.description}</p>
                <span style={{ display: 'inline-block', backgroundColor: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.75rem', color: '#6b7280' }}>
                  {skill.path}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Knowledge Section */}
        <section style={{ marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>📚 Knowledge ({data.stats.knowledge})</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
            {data.knowledge?.map((k: any) => (
              <div key={k.name} style={{ backgroundColor: 'white', padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
                <p style={{ margin: 0, fontWeight: '500' }}>{k.name}</p>
                <span style={{ display: 'inline-block', marginTop: '0.5rem', backgroundColor: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.75rem', color: '#6b7280' }}>
                  {k.category}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>📦 Projects ({data.stats.projects})</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1.5rem' }}>
            {data.projects?.map((project: any) => (
              <div key={project.name} style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '0.5rem', overflow: 'hidden' }}>
                <div style={{ background: 'linear-gradient(to right, #2563eb, #1d4ed8)', padding: '1.5rem', color: 'white' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: 'bold' }}>{project.name}</h4>
                  <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>{project.description}</p>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  {/* Tesseral Dashboard content */}
                  {project.sections?.brands?.analyses && (
                    <div style={{ marginBottom: '1rem' }}>
                      <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>🎨 Analyzed Brands</p>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                        {project.sections.brands.analyses.map((brand: any) => (
                          <div key={brand.name} style={{ backgroundColor: '#f9fafb', padding: '0.5rem', borderRadius: '0.25rem' }}>
                            <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: '500' }}>{brand.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {project.sections?.knowledge?.strategy && (
                    <div>
                      <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>📖 Brand Strategy</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {project.sections.knowledge.strategy.map((doc: any) => (
                          <div key={doc.name} style={{ backgroundColor: '#f9fafb', padding: '0.5rem', borderRadius: '0.25rem' }}>
                            <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: '500' }}>{doc.name}</p>
                            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: '#9ca3af' }}>{doc.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Design Builder styles */}
                  {project.styles && project.styles.length > 0 && (
                    <div>
                      <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>🎭 Design Styles ({project.styles.length})</p>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                        {project.styles.map((style: any) => (
                          <div key={style.name} style={{ backgroundColor: '#f9fafb', padding: '0.5rem', borderRadius: '0.25rem', textAlign: 'center' }}>
                            <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: '500' }}>{style.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
