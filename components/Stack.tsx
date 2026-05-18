const TECH = [
  'Laravel', 'React.js', 'Vue.js', 'Nuxt.js', 'Next.js',
  'TypeScript', 'JavaScript', 'Node.js', 'Go', 'Tailwind CSS',
  'Redux', 'PostgreSQL', 'MySQL', 'Prisma ORM', 'Git',
  'REST API', 'n8n Automation', 'Docker', 'Supabase', 'OpenCLAWA',
]

export default function Stack() {
  return (
    <section id="stack" aria-labelledby="stack-title">
      <div className="section-num reveal">02 — Stack</div>
      <h2 id="stack-title" className="section-title reveal" data-delay="1">
        Tools of the craft.
      </h2>
      <p className="section-sub reveal" data-delay="2">
        Pilihan teknologi yang saya pakai sehari-hari untuk membangun, menghubungkan, dan
        menjaga sistem.
      </p>

      <ul className="chips" id="chips" aria-label="Technology stack">
        {TECH.map((name, i) => (
          <li key={name} className="chip">
            <span className="num" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            {name}
          </li>
        ))}
      </ul>
    </section>
  )
}
