// ============================================================
// Ibtissem Khemiri — Portfolio content (single source of truth)
// ------------------------------------------------------------
// HOW TO EDIT (no coding knowledge needed):
//  1. Change the text values below (keep the quotes).
//  2. For lists (skills, projects...), copy/paste an item block
//     between { } and edit it.
//  3. Commit + push to the `main` branch: the live site updates
//     automatically via GitHub Actions.
//  4. Items with `visible: false` are hidden from the site.
//     Use them as drafts for content you will complete later.
//
// NOTE: Only add experience, education or certifications that are
// real. Placeholder entries below are marked "EXAMPLE — replace or
// delete" and are hidden by default (`visible: false`).
// ============================================================

export const profile = {
  fullName: 'Ibtissem Khemiri',
  role: 'QA Engineer',
  tagline: 'Quality-driven software tester — manual & automated testing for reliable releases.',
  location: 'Tunisia',
  email: 'contact@example.com', // TODO: replace with Ibtissem's real public email
  phone: '', // optional, e.g. '+216 ...' — leave empty to hide
  availability: 'Open to QA opportunities',
  socials: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/', visible: false }, // TODO: real URL + set visible: true
    { label: 'GitHub', url: 'https://github.com/', visible: false }, // TODO: real URL + set visible: true
    { label: 'Email', url: 'mailto:contact@example.com', visible: true }, // TODO: keep in sync with email above
  ],
};

export const about = {
  title: 'About',
  paragraphs: [
    'I am a QA Engineer focused on delivering reliable, user-friendly software. I design clear test cases, report actionable bugs, and collaborate closely with developers to prevent regressions before release.',
    'My toolkit covers manual exploratory testing, API testing, and test automation, with a strong emphasis on reproducibility: every bug report includes steps, evidence, and severity so teams can fix fast.',
  ],
  highlights: [
    { value: 'Manual testing', label: 'Functional · Exploratory · Regression' },
    { value: 'API testing', label: 'REST · Postman · Assertions' },
    { value: 'Automation', label: 'Playwright · Selenium basics' },
    { value: 'Bug advocacy', label: 'Clear reports · Severity · Follow-up' },
  ],
};

export const skills = {
  title: 'Skills & Testing Expertise',
  groups: [
    {
      name: 'Test design & execution',
      items: ['Test plans & test cases', 'Exploratory testing', 'Regression & smoke testing', 'Acceptance criteria validation', 'Cross-browser & responsive checks'],
    },
    {
      name: 'API & data',
      items: ['REST API testing (Postman)', 'Status codes & payload assertions', 'Basic SQL for test data', 'JSON inspection'],
    },
    {
      name: 'Automation & tooling',
      items: ['Playwright basics', 'Selenium basics', 'Git & GitHub', 'Browser DevTools', 'Bug tracking (Jira-style workflows)'],
    },
    {
      name: 'Ways of working',
      items: ['Agile / Scrum collaboration', 'Clear bug reports with evidence', 'Regression-risk awareness', 'Release-readiness mindset'],
    },
  ],
};

// Only list REAL positions. Examples below are hidden drafts.
export const experience = {
  title: 'Experience',
  intro: 'Professional experience will appear here. (Entries marked as examples are hidden until replaced with real roles.)',
  items: [
    {
      // EXAMPLE — replace with a real role or delete this block.
      visible: false,
      period: 'EXAMPLE — 2023 — Present',
      title: 'QA Engineer — Example Company',
      location: 'Tunis, Tunisia',
      bullets: ['Example achievement — replace with a real one.'],
    },
  ],
};

// Only list REAL education. Example below is a hidden draft.
export const education = {
  title: 'Education',
  items: [
    {
      // EXAMPLE — replace with real education or delete this block.
      visible: false,
      period: 'EXAMPLE — 2020 — 2023',
      title: 'Example degree — Example institution',
      details: 'Replace with the real diploma, field, and school.',
    },
  ],
};

// Only list REAL certifications. Examples below are hidden drafts.
export const certifications = {
  title: 'Certifications',
  items: [
    { visible: false, name: 'EXAMPLE — ISTQB Foundation Level (replace with real status)' },
  ],
};

export const projects = {
  title: 'Projects & Portfolio Showcase',
  intro: 'Selected QA case studies and testing exercises. Each card describes scope, approach, and outcome.',
  items: [
    {
      visible: true,
      name: 'Web app regression suite (case study)',
      stack: 'Manual · Checklists · Regression',
      description: 'Built a reusable regression checklist for a business web app: smoke set for deploys plus deep paths for releases. Template included so any teammate can run it.',
      links: [],
    },
    {
      visible: true,
      name: 'API test collection (case study)',
      stack: 'Postman · REST · Assertions',
      description: 'Organized API requests by resource with status-code and payload assertions plus negative cases (auth, validation, edge inputs).',
      links: [],
    },
    {
      visible: true,
      name: 'Bug-report samples (case study)',
      stack: 'Reporting · Severity · Evidence',
      description: 'Example reports showing the standard used here: title, environment, steps to reproduce, expected vs actual, severity, and screenshots/logs.',
      links: [],
    },
  ],
};

export const contact = {
  title: 'Contact',
  text: 'Interested in working together or have a QA question? The fastest way to reach Ibtissem is by email or LinkedIn (see links in the header).',
  ctaLabel: 'Send an email',
};

export const footer = {
  note: 'Built as a fast static site — no trackers, no cookies.',
};
