export default function About() {
  return (
    <section id="about" aria-labelledby="about-title">
      <div className="section-num reveal">01 — About</div>
      <h2 id="about-title" className="section-title reveal" data-delay="1">
        Engineer at the edge of a new capital.
      </h2>
      <p className="section-sub reveal" data-delay="2">
        A builder shaped by Bali, deployed to Borneo — writing the software that runs
        underneath Nusantara.
      </p>

      <div className="about-grid">
        <div className="about-text reveal" data-delay="2">
          <p>
            I&apos;m a <mark>Software Engineer</mark> at Otorita Ibu Kota Nusantara (OIKN),
            working on the technical layer behind Indonesia&apos;s new capital — from internal
            systems to the automation that connects teams in the field.
          </p>
          <p>
            My work spans the full lifecycle: <mark>software design</mark> against a shared
            design system, development, deployment, and the day-to-day maintenance and{' '}
            <mark>refactoring</mark> that keep a codebase honest. I deliver in <mark>Scrum</mark>{' '}
            cycles, build <mark>SSO integrations</mark> across directorates, and lean on{' '}
            <mark>AI automation</mark> to remove the repetitive parts of the job.
          </p>
          <p>
            Learning a new technology is a constant — I like things that look simple on the
            outside and stay complex within. Off-screen, I&apos;m a Bali native still learning
            to love Nusantara: morning coffee, forest on the horizon, and a city being written
            from scratch.
          </p>
        </div>

        <aside className="about-card reveal" data-delay="3" aria-label="Profile summary">
          <h4>// system.profile</h4>
          <dl>
            <div className="spec">
              <dt className="k">role</dt>
              <dd className="v">GovTech Engineer</dd>
            </div>
            <div className="spec">
              <dt className="k">org</dt>
              <dd className="v">Otorita IKN</dd>
            </div>
            <div className="spec">
              <dt className="k">stack</dt>
              <dd className="v">React · Flutter · Golang</dd>
            </div>
            <div className="spec">
              <dt className="k">domain</dt>
              <dd className="v">Full-stack · Automation</dd>
            </div>
            <div className="spec">
              <dt className="k">location</dt>
              <dd className="v">Nusantara, ID</dd>
            </div>
            <div className="spec">
              <dt className="k">status</dt>
              <dd className="v" style={{ color: '#4ade80' }}>available · selective</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  )
}
