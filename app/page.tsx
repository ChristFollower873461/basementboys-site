"use client";

import { useState, type FormEvent } from "react";

const experiments = [
  {
    number: "01",
    eyebrow: "Navigation",
    title: "Agent obstacle courses",
    copy: "Predictable anchors, explicit labels, and fallback selectors give browser agents a useful place to practice without wandering into a live account.",
    tags: ["selectors", "navigation", "safe"],
  },
  {
    number: "02",
    eyebrow: "Metadata",
    title: "Machine-readable by design",
    copy: "Robots, sitemaps, social cards, semantic structure, and an agent card all say the same thing—in formats both people and tools can inspect.",
    tags: ["metadata", "semantics", "open"],
  },
  {
    number: "03",
    eyebrow: "Dogfooding",
    title: "Small before expensive",
    copy: "We use tiny public experiments to find bad assumptions early, while the blast radius is still zero and changing our minds is still cheap.",
    tags: ["prototype", "learn", "repeat"],
  },
];

const endpoints = [
  {
    index: "A1",
    label: "Front door",
    title: "Homepage",
    href: "/",
    path: "GET /",
    copy: "The human-readable summary and primary navigation surface.",
  },
  {
    index: "A2",
    label: "Boundaries",
    title: "Robots",
    href: "/robots.txt",
    path: "GET /robots.txt",
    copy: "A plain-text statement of what automated visitors may inspect.",
  },
  {
    index: "A3",
    label: "Map",
    title: "Sitemap",
    href: "/sitemap.xml",
    path: "GET /sitemap.xml",
    copy: "The canonical public route inventory in a familiar format.",
  },
  {
    index: "A4",
    label: "Identity",
    title: "Agent card",
    href: "/.well-known/agent.json",
    path: "GET /.well-known/agent.json",
    copy: "A compact, structured description of the site and its safety limits.",
  },
];

const rules = [
  ["01", "No money moves", "There is no checkout, billing flow, or financial side effect."],
  ["02", "No accounts to break", "No authentication, private profiles, or privileged data live here."],
  ["03", "No silent writes", "The public surface does not expose an automated write endpoint."],
  ["04", "No fake certainty", "Experiments report what happened; they do not pretend to prove more."],
];

export default function Home() {
  const [formStatus, setFormStatus] = useState("");

  function prepareDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormStatus("Draft prepared locally. Nothing was sent.");
  }

  return (
    <main className="site-shell">
      <header className="site-header" data-agent="navigation">
        <a className="wordmark" href="#top" aria-label="Basement Boys home">
          <span className="wordmark-signal" aria-hidden="true" />
          <span>Basement Boys</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#field-notes">Field notes</a>
          <a href="#obstacle-course">Obstacle course</a>
          <a href="#rules">Rules</a>
        </nav>
        <a className="header-action" href="#contact">
          Make contact <span aria-hidden="true">↘</span>
        </a>
      </header>

      <section className="hero" id="top" data-agent="site-summary">
        <div className="hero-copy">
          <div className="eyebrow-row">
            <span className="status-pill">
              <i aria-hidden="true" />
              Public lab online
            </span>
            <span className="mono-note">BB // 001</span>
          </div>
          <h1 data-agent="name">
            Definitely
            <br />
            have opinions.
          </h1>
          <p className="hero-lede" data-agent="about">
            Basement Boys is a public lab for small experiments, safe web-agent
            obstacle courses, and ideas worth testing before they get expensive.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#obstacle-course">
              Enter the obstacle course <span aria-hidden="true">↓</span>
            </a>
            <a className="text-link" href="#rules">
              Read the safety rules <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="hero-mark" aria-label="Basement Boys brand mark">
          <div className="hero-mark-meta hero-mark-meta-top">
            <span>SUBNET</span>
            <strong>DRIP COUNCIL</strong>
          </div>
          <img src="/logo.svg" alt="" width="830" height="680" />
          <div className="hero-mark-meta hero-mark-meta-bottom">
            <strong>SAFE SURFACE</strong>
            <span>NO SIDE EFFECTS</span>
          </div>
          <span className="calibration calibration-x" aria-hidden="true" />
          <span className="calibration calibration-y" aria-hidden="true" />
        </div>
      </section>

      <div className="signal-strip" aria-label="Site safety summary">
        <span>Static surface</span>
        <i aria-hidden="true" />
        <span>No auth</span>
        <i aria-hidden="true" />
        <span>Zero payments</span>
        <i aria-hidden="true" />
        <span>Safe to inspect</span>
      </div>

      <section className="about-section section-frame" id="about">
        <div className="section-index">
          <span>00</span>
          <p>About the lab</p>
        </div>
        <div className="about-copy">
          <p className="section-kicker">A useful place to be wrong</p>
          <h2>The basement is where ideas earn daylight.</h2>
          <p>
            Big launches are a bad time to discover that the metadata is muddy,
            the navigation is brittle, or the agent took a left turn into
            something consequential. We make the problem smaller first.
          </p>
        </div>
        <dl className="lab-log" aria-label="Lab operating status">
          <div>
            <dt>Surface</dt>
            <dd>Public & inspectable</dd>
          </div>
          <div>
            <dt>Credentials</dt>
            <dd>None required</dd>
          </div>
          <div>
            <dt>Writes</dt>
            <dd>Local demo only</dd>
          </div>
          <div>
            <dt>Control</dt>
            <dd>Humans steer</dd>
          </div>
        </dl>
      </section>

      <section className="experiments-section" id="field-notes">
        <div className="section-heading section-frame">
          <div>
            <p className="section-kicker">Field notes / active studies</p>
            <h2>What happens down here.</h2>
          </div>
          <p>
            Three recurring experiments. One rule: every result should teach us
            something without putting anyone at risk.
          </p>
        </div>
        <div className="experiment-grid section-frame">
          {experiments.map((experiment) => (
            <article className="experiment-card" key={experiment.number}>
              <div className="card-topline">
                <span>{experiment.number}</span>
                <span>{experiment.eyebrow}</span>
              </div>
              <div>
                <h3>{experiment.title}</h3>
                <p>{experiment.copy}</p>
              </div>
              <ul aria-label={`${experiment.title} tags`}>
                {experiment.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="course-section" id="obstacle-course" data-agent="topics">
        <div className="course-intro section-frame">
          <div>
            <p className="section-kicker">The obstacle course</p>
            <h2>A small site with explicit edges.</h2>
          </div>
          <p>
            Every route below is public, read-only, and intentionally boring in
            the best possible way. Open one. Inspect it. Nothing expensive
            happens.
          </p>
        </div>
        <div className="endpoint-grid section-frame">
          {endpoints.map((endpoint) => (
            <a
              className="endpoint-card"
              href={endpoint.href}
              key={endpoint.index}
              data-agent={`endpoint-${endpoint.index.toLowerCase()}`}
            >
              <div className="endpoint-meta">
                <span>{endpoint.index}</span>
                <span>{endpoint.label}</span>
              </div>
              <div>
                <p className="endpoint-path">{endpoint.path}</p>
                <h3>{endpoint.title}</h3>
                <p>{endpoint.copy}</p>
              </div>
              <span className="endpoint-action">
                Inspect endpoint <span aria-hidden="true">↗</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="rules-section" id="rules" data-agent="rules">
        <div className="rules-heading section-frame">
          <p className="section-kicker">Operating contract</p>
          <h2>
            Risk down.
            <br />
            Signal up.
          </h2>
          <p>
            Build the obstacle. Remove the blast radius. Make the outcome easy
            to read.
          </p>
        </div>
        <div className="rules-list section-frame">
          {rules.map(([number, title, copy]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section section-frame" id="contact">
        <div className="contact-copy">
          <p className="section-kicker">Contact / local demo</p>
          <h2>Bring a strange little problem.</h2>
          <p>
            This form is part of the obstacle course. It prepares a draft in
            your browser and sends absolutely nothing.
          </p>
          <div className="contact-note">
            <span aria-hidden="true">!</span>
            No external submission endpoint is connected.
          </div>
        </div>

        <form
          className="contact-form"
          onSubmit={prepareDraft}
          data-agent="contact-form"
        >
          <div className="form-grid">
            <label>
              <span>Name</span>
              <input name="name" autoComplete="name" placeholder="Your name" required />
            </label>
            <label>
              <span>Email</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
              />
            </label>
          </div>
          <label>
            <span>Topic</span>
            <select name="topic" defaultValue="" required>
              <option value="" disabled>
                Choose a topic
              </option>
              <option value="general">General question</option>
              <option value="agent-navigation">Agent navigation test</option>
              <option value="dogfood-feedback">Dogfood feedback</option>
            </select>
          </label>
          <label>
            <span>Message</span>
            <textarea name="message" placeholder="Write a short note" required />
          </label>
          <div className="form-submit-row">
            <button className="button button-primary" type="submit">
              Prepare local draft <span aria-hidden="true">→</span>
            </button>
            <p role="status" aria-live="polite">
              {formStatus}
            </p>
          </div>
        </form>
      </section>

      <footer className="site-footer">
        <div className="footer-brand">
          <img src="/logo.svg" alt="" width="830" height="680" />
          <div>
            <strong>Basement Boys</strong>
            <span>A subnet of the Drip Council</span>
          </div>
        </div>
        <p>Small experiments. Loud opinions. Zero blast radius.</p>
        <div className="footer-links">
          <a href="/robots.txt">Robots</a>
          <a href="/sitemap.xml">Sitemap</a>
          <a href="/.well-known/agent.json">Agent JSON</a>
        </div>
      </footer>
    </main>
  );
}
