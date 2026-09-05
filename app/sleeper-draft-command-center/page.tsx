/* eslint-disable @next/next/no-img-element -- vinext's next/image shim breaks hydration. */

import type { Metadata } from "next";
import Link from "next/link";

const repository =
  "https://github.com/ChristFollower873461/sleeper-draft-command-center";
const releaseVersion = "0.3.0-beta.1";
const release = `${repository}/releases/tag/v${releaseVersion}`;
const installGuide = `${repository}/blob/main/docs/install-github-beta.md`;

export const metadata: Metadata = {
  title: "Sleeper Draft Command Center",
  description:
    "An open-source Chrome extension for using personal fantasy football rankings in fast, read-only Sleeper draft rooms.",
  alternates: { canonical: "/sleeper-draft-command-center" },
  openGraph: {
    title: "Sleeper Draft Command Center",
    description:
      "Bring your own rankings into a fast, local-first Sleeper draft command center.",
    url: "https://basementboys.org/sleeper-draft-command-center",
    siteName: "Basement Boys",
    type: "website",
    images: [
      {
        url: "/sleeper-draft-command-center.png",
        width: 1280,
        height: 800,
        type: "image/png",
        alt: "Sleeper Draft Command Center showing a live fantasy football draft shortlist.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sleeper Draft Command Center",
    description:
      "Bring your own rankings into a fast, local-first Sleeper draft command center.",
    images: ["/sleeper-draft-command-center.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Sleeper Draft Command Center",
  applicationCategory: "SportsApplication",
  operatingSystem: "Chrome",
  softwareVersion: releaseVersion,
  isAccessibleForFree: true,
  description:
    "An open-source Chrome extension for personal rankings and read-only Sleeper draft intelligence.",
  url: "https://basementboys.org/sleeper-draft-command-center",
  codeRepository: repository,
  downloadUrl: release,
  license: "https://opensource.org/license/mit",
};

const capabilities = [
  ["Rankings", "Start from public ADP or import, edit, tier, and save separate personal boards."],
  ["Live room", "Follow posted picks, roster construction, room runs, fallers, tiers, and your next turn."],
  ["Offline", "Run a persistent manual draft room when the league uses stickers, paper, or shaky Wi-Fi."],
  ["Formats", "Use one-QB, superflex, best ball, or a custom roster and scoring profile."],
];

export default function SleeperDraftCommandCenterPage() {
  return (
    <main className="sdcc-site">
      <a className="skip-link" href="#sdcc-main">
        Skip to main content
      </a>

      <header className="sdcc-nav section-frame">
        <Link className="header-name" href="/" aria-label="Back to Basement Boys">
          <img src="/bb-mark.svg" alt="" width="22" height="22" />
          <span>Basement Boys</span>
        </Link>
        <span>OSS-005 / Chrome MV3</span>
        <nav aria-label="Project links">
          <a href={repository} target="_blank" rel="noreferrer">Source</a>
          <a className="sdcc-nav-install" href={installGuide} target="_blank" rel="noreferrer">Install beta</a>
        </nav>
      </header>

      <section className="sdcc-product-hero" id="sdcc-main">
        <div className="sdcc-hero-copy section-frame">
          <div>
            <span className="sdcc-kicker">Open source / v0.3.0 beta</span>
            <h1>Sleeper Draft Command Center</h1>
          </div>
          <div className="sdcc-hero-action">
            <p>
              Your rankings, live room context, and an offline board in one
              fast, read-only Chrome extension.
            </p>
            <div>
              <a className="sdcc-primary-link" href={release} target="_blank" rel="noreferrer">
                Get v0.3 beta <span aria-hidden="true">↗</span>
              </a>
              <a href={repository} target="_blank" rel="noreferrer">
                Read the source <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
        <figure className="sdcc-product-preview">
          <img
            src="/sleeper-draft-command-center.png"
            alt="Sleeper Draft Command Center live shortlist with draft timing, roster counts, and four recommendations."
            width="1280"
            height="800"
          />
        </figure>
      </section>

      <section className="sdcc-facts" aria-label="Release facts">
        <div className="section-frame">
          <div><strong>300 ms</strong><span>active pick checks</span></div>
          <div><strong>Read only</strong><span>never submits a pick</span></div>
          <div><strong>Local first</strong><span>no account or backend</span></div>
          <div><strong>MIT</strong><span>inspect, fork, improve</span></div>
        </div>
      </section>

      <section className="sdcc-capabilities section-frame">
        <div className="sdcc-section-heading">
          <span>[ DRAFT ROOM ]</span>
          <h2>Built for the board moving right now.</h2>
          <p>
            Version 0.3 tightens live updates, keeps future keepers out of room
            runs, removes drafted names defensively, and follows traded picks.
          </p>
        </div>
        <div className="sdcc-capability-list">
          {capabilities.map(([title, copy], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sdcc-install">
        <div className="section-frame">
          <div className="sdcc-section-heading">
            <span>[ INSTALL.BETA ]</span>
            <h2>Three steps. Your board stays yours.</h2>
          </div>
          <ol>
            <li><span>01</span><p>Download and extract the newest GitHub release.</p></li>
            <li><span>02</span><p>Load the folder from Chrome&apos;s extensions page.</p></li>
            <li><span>03</span><p>Import rankings and open a discovered or manual draft.</p></li>
          </ol>
          <a className="sdcc-install-link" href={installGuide} target="_blank" rel="noreferrer">
            Open the complete install guide <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section className="sdcc-boundary">
        <div className="section-frame">
          <span>[ THE LINE ]</span>
          <h2>Decision support, never draft control.</h2>
          <p>
            It reads public Sleeper data with credential-free GET requests.
            Rankings and draft sessions stay in Chrome local storage. There are
            no analytics, ads, remote ranking uploads, or project servers.
          </p>
          <div>
            <a href={`${repository}/blob/main/PRIVACY.md`} target="_blank" rel="noreferrer">Privacy</a>
            <a href={`${repository}/blob/main/SECURITY.md`} target="_blank" rel="noreferrer">Security</a>
            <a href={`${repository}/issues`} target="_blank" rel="noreferrer">Issues</a>
          </div>
        </div>
      </section>

      <footer className="sdcc-footer section-frame">
        <Link href="/">Basement Boys / Repo pile</Link>
        <span>Sleeper Draft Command Center / MIT</span>
        <a href={repository} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </main>
  );
}
