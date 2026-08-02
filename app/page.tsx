const projects = [
  {
    id: "OSS-001",
    title: "Robotics Sandbox",
    type: "Node / JavaScript",
    status: "MIT",
    sourceHref: "https://github.com/ChristFollower873461/robotics-sandbox-spec",
    liveHref: "https://robotics.basementboys.org",
    copy: "A source-backed robot decision workbench for screening arms, humanoids, quadrupeds, and drones—plus a transparent planar motion lab for the candidates it can honestly model.",
  },
  {
    id: "OSS-002",
    title: "Drip Council",
    type: "JS / Rust / Python",
    status: "MIT",
    sourceHref: "https://github.com/ChristFollower873461/dripcouncil",
    liveHref: "https://dripcouncil.org",
    copy: "A public browser-agent field lab with inspectable cases, a Python observatory lens, and a real Rust/WebAssembly boundary validator.",
  },
  {
    id: "OSS-003",
    title: "CodexVault",
    type: "Rust / Tauri / React",
    status: "MIT",
    sourceHref: "https://github.com/ChristFollower873461/codexvault",
    liveHref: "https://vault.basementboys.org",
    copy: "A local-first encrypted vault for AI-provider credentials, with a safe browser walkthrough, deterministic exports, and an honest desktop security boundary.",
  },
  {
    id: "OSS-004",
    title: "Pjario Staltman",
    type: "Python / Make / Markdown",
    status: "MIT",
    sourceHref: "https://github.com/ChristFollower873461/pjario-staltman",
    copy: "A compact operating system for agent-built software: scoped work, auditable proof, staff review, and Quiet Aggregate—a deterministic loop that turns independently repeated, verified findings into proposed guardrails.",
  },
];

const rules = [
  ["01", "Build the small version."],
  ["02", "Document the sharp edges."],
  ["03", "License it clearly."],
  ["04", "Keep it fun."],
];

const machineRoutes = [
  ["/robots.txt", "ROBOTS"],
  ["/sitemap.xml", "SITEMAP"],
  ["/.well-known/agent.json", "AGENT JSON"],
];

export default function Home() {
  return (
    <main className="site-shell">
      <a className="skip-link" href="#main">
        Skip to main content
      </a>

      <header className="site-header" data-agent="navigation">
        <a className="header-name" href="#top" aria-label="Basement Boys home">
          <img src="/bb-mark.svg" alt="" width="22" height="22" />
          <span>Basement Boys</span>
        </a>
        <p>Dev group / for fun</p>
        <nav aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#machine">Machine stuff</a>
        </nav>
      </header>

      <section className="hero" id="top" data-agent="site-summary">
        <div className="hero-utility">
          <span>BB / HOME</span>
          <span>EST. WHENEVER</span>
          <span className="online">
            <i aria-hidden="true" /> ONLINE, PROBABLY
          </span>
        </div>

        <div className="hero-title" id="main">
          <h1 data-agent="name">
            <span>Basement</span>
            <span>Boys</span>
          </h1>
          <div className="hero-stamp" aria-label="Basement Boys mark">
            <img src="/bb-mark.svg" alt="" width="160" height="160" />
          </div>
        </div>

        <div className="hero-bottom">
          <h2>We build software for no good reason. Then we open the source.</h2>
          <p data-agent="about">
            Basement Boys is a loose dev group making readable tools,
            experiments, and reference projects that other people can inspect,
            run, fork, and improve.
          </p>
          <a href="#projects">
            Browse open source <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      <div className="stats-bar" aria-label="Basement Boys statistics">
        <span>04 featured repos</span>
        <span>MIT licensed</span>
        <span>Rust + JS + Python</span>
        <span>Source in public</span>
      </div>

      <section className="about section-frame" id="about">
        <div className="file-label">[ ABOUT.TXT ]</div>
        <div className="about-main">
          <h2>A dev group with the source open.</h2>
          <p>
            Basement Boys is where we put projects worth reading—not just
            screenshots worth scrolling past. The code, architecture, limits,
            and setup instructions are part of the work.
          </p>
        </div>
        <aside className="about-aside">
          <p>READ IT</p>
          <p>RUN IT</p>
          <p>REMIX IT</p>
          <strong>SEND A PATCH.</strong>
        </aside>
      </section>

      <section className="projects" id="projects" data-agent="topics">
        <div className="projects-header section-frame">
          <div>
            <span className="file-label">[ INDEX / CURRENT ]</span>
            <h2>Repo pile</h2>
          </div>
          <p>
            Public repositories with enough documentation to understand what
            they do, how they work, and where the sharp edges are.
          </p>
        </div>

        <div className="project-list">
          <div className="project-columns section-frame" aria-hidden="true">
            <span>ID</span>
            <span>Project</span>
            <span>Stack</span>
            <span>Links</span>
          </div>
          {projects.map((project) => (
            <article className="project-row" key={project.id}>
              <div className="project-row-inner section-frame">
                <span className="project-id">{project.id}</span>
                <div className="project-name">
                  <h3>{project.title}</h3>
                  <p>{project.copy}</p>
                </div>
                <span className="project-type">{project.type}</span>
                <div className="project-links">
                  {project.liveHref ? (
                    <a
                      className="project-source project-live"
                      href={project.liveHref}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open the live ${project.title}`}
                    >
                      Live <span aria-hidden="true">↗</span>
                    </a>
                  ) : null}
                  <a
                    className="project-source"
                    href={project.sourceHref}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View ${project.title} source on GitHub`}
                  >
                    {project.status} / GitHub <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rules">
        <div className="rules-intro section-frame">
          <span className="file-label">[ PROCESS.MD ]</span>
          <p>Open source should be useful before it is impressive.</p>
        </div>
        <ol>
          {rules.map(([number, copy]) => (
            <li key={number}>
              <div className="section-frame">
                <span>{number}</span>
                <p>{copy}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="machine" id="machine">
        <div className="machine-inner section-frame">
          <div className="machine-copy">
            <span className="file-label">[ FOR ROBOTS ]</span>
            <h2>Clean metadata. Weird humans.</h2>
            <p>
              The project index is readable by people and machines. These
              routes expose the site map and safety boundaries without hiding
              the useful part behind a JavaScript app.
            </p>
          </div>
          <div className="route-list">
            {machineRoutes.map(([path, label]) => (
              <a href={path} key={path}>
                <span>{label}</span>
                <code>GET {path}</code>
                <b aria-hidden="true">↗</b>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="site-footer section-frame">
        <div>
          <strong>BASEMENT BOYS</strong>
          <span>DEV GROUP / FOR FUN</span>
        </div>
        <p>MADE DOWNSTAIRS. ESTIMATES NOT INCLUDED.</p>
        <a
          href="https://github.com/ChristFollower873461"
          target="_blank"
          rel="noreferrer"
        >
          GITHUB <span aria-hidden="true">↗</span>
        </a>
      </footer>
    </main>
  );
}
