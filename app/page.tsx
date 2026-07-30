const projects = [
  {
    number: "01",
    color: "orange",
    status: "Playable",
    title: "The browser obstacle course",
    copy: "A harmless little corner of the web where browser agents can practice finding things without buying, deleting, or breaking anything.",
    tags: ["agents", "selectors", "tiny web"],
  },
  {
    number: "02",
    color: "blue",
    status: "Useful-ish",
    title: "Metadata that talks back",
    copy: "Robots, sitemaps, semantic HTML, and an agent card—all agreeing with each other for once.",
    tags: ["metadata", "web", "open"],
  },
  {
    number: "03",
    color: "yellow",
    status: "Always",
    title: "Weekend-sized experiments",
    copy: "The kind of idea that starts with “how hard could it be?” and ends with a suspicious number of open tabs.",
    tags: ["prototypes", "tools", "fun"],
  },
  {
    number: "04",
    color: "pink",
    status: "Unannounced",
    title: "The next dumb idea",
    copy: "Currently an empty folder with an excellent name. Give it a minute.",
    tags: ["???", "soon-ish", "probably"],
  },
];

const process = [
  ["01", "Somebody says “what if…”"],
  ["02", "A repo mysteriously appears"],
  ["03", "It works on at least one machine"],
  ["04", "We ship it—or learn something funny"],
];

const endpoints = [
  ["/robots.txt", "House rules for robots"],
  ["/sitemap.xml", "A very small map"],
  ["/.well-known/agent.json", "The machine-readable hello"],
];

export default function Home() {
  return (
    <main className="site-shell">
      <a className="skip-link" href="#main">
        Skip to the fun stuff
      </a>

      <header className="site-header" data-agent="navigation">
        <a className="wordmark" href="#top" aria-label="Basement Boys home">
          <span className="wordmark-mark" aria-hidden="true">
            BB
          </span>
          <span>Basement Boys</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#projects">Stuff we make</a>
          <a href="#about">What is this?</a>
          <a href="#robots">Robot shelf</a>
        </nav>
        <span className="header-status">
          <i aria-hidden="true" />
          Probably coding
        </span>
      </header>

      <section className="hero section-frame" id="top">
        <div className="hero-copy" id="main" data-agent="site-summary">
          <p className="eyebrow">
            <span aria-hidden="true">↳</span> A tiny dev group
          </p>
          <h1 data-agent="name">
            We make stuff
            <br />
            because it sounds
            <br />
            <mark>fun.</mark>
          </h1>
          <p className="hero-lede" data-agent="about">
            Basement Boys is a loose group of developers building weird little
            tools, internet experiments, and side projects together. No grand
            thesis. We just like making things.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#projects">
              See what we’re making <span aria-hidden="true">↓</span>
            </a>
            <span className="hand-note" aria-label="Seriously, that is the whole idea">
              seriously, that&apos;s the whole idea ↗
            </span>
          </div>
        </div>

        <div className="hero-board" aria-label="Basement Boys status board">
          <article className="board-card logo-card">
            <span className="card-label">Club emblem / v1-ish</span>
            <img src="/logo.svg" alt="" width="830" height="680" />
          </article>

          <article className="board-card terminal-card">
            <div className="terminal-bar">
              <span />
              <span />
              <span />
              <b>basement.sh</b>
            </div>
            <pre>
              <code>
                <span>$ basement-boys --status</span>
                {"\n"}→ making something
                {"\n"}→ overthinking the name
                {"\n"}→ having fun anyway
                {"\n"}
                <strong>✓ good enough to ship</strong>
              </code>
            </pre>
          </article>

          <article className="board-card sticky-card">
            <span>NO ROADMAP</span>
            <strong>GOOD IDEAS WELCOME</strong>
            <small>bad ideas too, honestly</small>
          </article>

          <article className="board-card tiny-card">
            <span className="pixel-face" aria-hidden="true">
              [ ^‿^ ]
            </span>
            <p>works on localhost</p>
          </article>
        </div>
      </section>

      <div className="ticker" aria-label="Basement Boys principles">
        <span>No pitch deck</span>
        <i aria-hidden="true">✦</i>
        <span>No dress code</span>
        <i aria-hidden="true">✦</i>
        <span>Too many tabs</span>
        <i aria-hidden="true">✦</i>
        <span>Ship the funny version</span>
      </div>

      <section className="about-section section-frame" id="about">
        <div className="section-tag">What is this?</div>
        <div className="about-statement">
          <h2>
            Not a startup.
            <br />
            Not an agency.
            <br />
            <span>Just the group chat with a Git repo.</span>
          </h2>
        </div>
        <div className="about-note">
          <span className="tape" aria-hidden="true" />
          <p>
            We build things for ourselves, our friends, and the occasional
            curious robot. Some become real projects. Some become good stories.
            Both count.
          </p>
        </div>
      </section>

      <section className="projects-section" id="projects" data-agent="topics">
        <div className="projects-heading section-frame">
          <div>
            <p className="eyebrow">Open tabs / current edition</p>
            <h2>Stuff from the basement</h2>
          </div>
          <p>
            A rotating shelf of experiments. None of this is a product roadmap,
            which is convenient because we do not have one.
          </p>
        </div>

        <div className="project-grid section-frame">
          {projects.map((project) => (
            <article
              className={`project-card project-card-${project.color}`}
              key={project.number}
            >
              <div className="project-topline">
                <span>{project.number}</span>
                <span>{project.status}</span>
              </div>
              <div>
                <h3>{project.title}</h3>
                <p>{project.copy}</p>
              </div>
              <ul aria-label={`${project.title} tags`}>
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="process-section section-frame">
        <div className="process-copy">
          <p className="eyebrow">Our very serious process</p>
          <h2>Low ceremony. High curiosity.</h2>
          <p>
            Small enough to start tonight. Loose enough to change tomorrow.
          </p>
        </div>
        <ol className="process-list">
          {process.map(([number, copy]) => (
            <li key={number}>
              <span>{number}</span>
              <p>{copy}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="robots-section" id="robots">
        <div className="robots-inner section-frame">
          <div className="robot-copy">
            <p className="eyebrow">A shelf for robots</p>
            <h2>Humans get the jokes. Machines get clean metadata.</h2>
            <p>
              The site is still a safe, read-only playground for browser-agent
              experiments. That is one thing we make—not the whole personality.
            </p>
          </div>
          <div className="endpoint-list">
            {endpoints.map(([path, label]) => (
              <a href={path} key={path}>
                <code>GET {path}</code>
                <span>{label}</span>
                <b aria-hidden="true">↗</b>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="site-footer section-frame">
        <div className="footer-lockup">
          <span className="wordmark-mark" aria-hidden="true">
            BB
          </span>
          <div>
            <strong>Basement Boys</strong>
            <span>A dev group for fun.</span>
          </div>
        </div>
        <p>Made downstairs with questionable estimates.</p>
        <a href="#top">
          Back upstairs <span aria-hidden="true">↑</span>
        </a>
      </footer>
    </main>
  );
}
