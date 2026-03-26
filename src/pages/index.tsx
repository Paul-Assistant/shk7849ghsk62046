import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;
  }

  if (!data) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Error loading dashboard</div>;
  }

  const filteredSkills = data.skills?.filter((s: any) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.description?.toLowerCase().includes(search.toLowerCase())
  ) || [];

  const filteredKnowledge = data.knowledge?.filter((k: any) =>
    k.name.toLowerCase().includes(search.toLowerCase())
  ) || [];

  const filteredProjects = data.projects?.filter((p: any) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <nav style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>🚀 Internal Dashboard</h1>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href="#" style={{ textDecoration: 'none', color: '#1f2937' }}>Overview</a>
            <a href="#" style={{ textDecoration: 'none', color: '#1f2937' }}>Processes</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>🚀 Internal Dashboard</h2>
          <p style={{ color: '#6b7280', margin: '0.5rem 0 0 0' }}>Skills, Knowledge, Projects & Tools Overview</p>
          <p style={{ color: '#9ca3af', fontSize: '0.875rem', margin: '1rem 0 0 0' }}>Last updated: {new Date().toLocaleDateString()}, {new Date().toLocaleTimeString()}</p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 2rem' }}>
        {/* Search */}
        <div style={{ marginBottom: '2rem' }}>
          <input
            type="text"
            placeholder="Search skills, knowledge, projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.5rem',
              fontSize: '1rem'
            }}
          />
        </div>

        {/* Skills Section */}
        <section style={{ marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>🛠️ Skills ({filteredSkills.length})</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {filteredSkills.map((skill: any) => (
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
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>📚 Knowledge ({filteredKnowledge.length})</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
            {filteredKnowledge.map((k: any) => (
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
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>📦 Projects ({filteredProjects.length})</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1.5rem' }}>
            {filteredProjects.map((project: any) => (
              <div key={project.name} style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '0.5rem', overflow: 'hidden' }}>
                <div style={{ background: 'linear-gradient(to right, #2563eb, #1d4ed8)', padding: '1.5rem', color: 'white' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: 'bold' }}>{project.name}</h4>
                  <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>{project.description}</p>
                </div>
                <div style={{ padding: '1.5rem' }}>
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
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
