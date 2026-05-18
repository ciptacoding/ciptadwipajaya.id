'use client'
import { useState } from 'react'

const TIMELINE = [
  {
    tab: { yr: '2026—now', lbl: 'Otorita IKN' },
    content: {
      when: '2026 — Present',
      title: 'Software Engineer',
      org: 'Otorita Ibu Kota Nusantara (OIKN)',
      body: 'Building the digital systems behind Indonesia’s new capital — owning work from design through deployment across several internal, cross-team services.',
      bullets: [
        'Full-stack development for internal & operational platforms',
        'SSO integration unifying access across directorates',
        'AI-driven automation that removes repetitive operational work',
        'Standardised backend architecture, design system & developer tooling',
      ],
      tags: ['Next.js', 'PostgreSQL', 'Docker', 'Go', 'Flutter'],
    },
  },
  {
    tab: { yr: '2023–25', lbl: 'Tech Company' },
    content: {
      when: '2023 — 2025',
      title: 'Software Engineer',
      org: 'Tech Companies · Product Teams',
      body: 'Shipped enterprise web products inside Scrum teams — operational dashboards, e-ticket systems, and reusable backend architecture. Focused on code that stays readable and long-lived.',
      bullets: [
        'Feature development, maintenance & continuous refactoring in production',
        'Reusable Express + Prisma architecture adopted across teams',
        'Real-time monitoring dashboards with React + WebSocket',
        'Release and deployment pipelines tuned for calm 3 a.m. shifts',
      ],
      tags: ['React', 'Vue', 'Express', 'Prisma', 'MySQL'],
    },
  },
  {
    tab: { yr: '2021–22', lbl: 'Internship' },
    content: {
      when: '2021 — 2022',
      title: 'Software Engineer Intern',
      org: 'Internship · Product Engineering',
      body: 'First professional engineering experience — contributing to real codebases, learning team workflows, and turning self-taught fundamentals into shipped features.',
      bullets: [
        'Built and reviewed features alongside senior engineers',
        'Learned Git workflows, code review, and Scrum delivery',
        'Picked up new frameworks and tooling on the job',
      ],
      tags: ['TypeScript', 'Vue', 'Laravel', 'Git'],
    },
  },
  {
    tab: { yr: '2019–20', lbl: 'Learning' },
    content: {
      when: '2019 — 2020',
      title: 'Self-taught Developer',
      org: 'Foundations · Open Source',
      body: 'Learned web development fundamentals independently — from HTML/CSS and plain JavaScript to modern frameworks. A lot of time spent reading source code and following open-source communities.',
      bullets: [
        'Deep dive into JavaScript, asynchronous patterns, and modern tooling',
        'Learned Vue & React in parallel to see what fits which problem',
        'Built backend foundations with Node.js and Laravel',
      ],
      tags: ['HTML', 'JavaScript', 'Node.js', 'Laravel'],
    },
  },
]

export default function Experience() {
  const [active, setActive] = useState(0)

  return (
    <section id="experience" aria-labelledby="experience-title">
      <div className="section-num reveal">02 — Experience</div>
      <h2 id="experience-title" className="section-title reveal" data-delay="1">
        A short, deliberate path.
      </h2>
      <p className="section-sub reveal" data-delay="2">
        Years writing code that pays attention to the people who use it.
      </p>

      <div className="tl-wrap">
        <nav className="tl-list" aria-label="Career timeline">
          {TIMELINE.map((item, i) => (
            <button
              key={i}
              className={`tl-item${active === i ? ' active' : ''}`}
              aria-selected={active === i}
              onClick={() => setActive(i)}
            >
              <span className="yr">{item.tab.yr}</span>
              <span className="lbl">{item.tab.lbl}</span>
            </button>
          ))}
        </nav>

        <div className="tl-panel reveal" data-delay="2" role="tabpanel">
          {TIMELINE.map((item, i) => {
            const c = item.content
            return (
              <article key={i} className={`tl-content${active === i ? ' active' : ''}`}>
                <div className="when">
                  <span className="dot" aria-hidden="true" />
                  <time>{c.when}</time>
                </div>
                <h3>{c.title}</h3>
                <div className="org">{c.org}</div>
                <p>{c.body}</p>
                <ul>
                  {c.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <div className="tl-tags" aria-label="Technologies used">
                  {c.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
