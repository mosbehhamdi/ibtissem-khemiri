import './styles.css';
import { profile, about, skills, experience, education, certifications, projects, contact, footer } from './content.js';

const $ = (sel) => document.querySelector(sel);
const esc = (s) => String(s ?? '')
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

const visible = (items) => (items || []).filter((i) => i.visible !== false);

function renderHeader() {
  $('#brand-name').textContent = profile.fullName;
  $('#brand-role').textContent = profile.role;
  const socials = visible(profile.socials);
  $('#nav-socials').innerHTML = socials
    .map((s) => `<a href="${esc(s.url)}" ${s.url.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}>${esc(s.label)}</a>`)
    .join('');
}

function renderHero() {
  $('#hero-name').textContent = profile.fullName;
  $('#hero-role').textContent = profile.role;
  $('#hero-tagline').textContent = profile.tagline;
  $('#hero-email-btn').href = `mailto:${profile.email}`;
  $('#hero-meta').innerHTML = [
    profile.location ? `<span>📍 ${esc(profile.location)}</span>` : '',
    profile.availability ? `<span>🟢 ${esc(profile.availability)}</span>` : '',
  ].join('');
}

function renderAbout() {
  $('#about-title').textContent = about.title;
  $('#about-paras').innerHTML = about.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('');
  $('#about-stats').innerHTML = about.highlights
    .map((h) => `<div class="card stat"><div class="value">${esc(h.value)}</div><div class="label">${esc(h.label)}</div></div>`)
    .join('');
}

function renderSkills() {
  $('#skills-title').textContent = skills.title;
  $('#skills-grid').innerHTML = skills.groups
    .map((g) => `<div class="card"><h3>${esc(g.name)}</h3><ul>${g.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul></div>`)
    .join('');
}

function timelineOrNote(listEl, noteEl, titleEl, title, items, itemHtml) {
  titleEl.textContent = title;
  const shown = visible(items);
  if (shown.length === 0) {
    listEl.innerHTML = '';
    noteEl.hidden = false;
  } else {
    noteEl.hidden = true;
    listEl.innerHTML = shown.map(itemHtml).join('');
  }
}

function renderExperience() {
  timelineOrNote($('#exp-list'), $('#exp-note'), $('#exp-title'), experience.title, experience.items, (e) => `
    <li class="timeline-item">
      <div class="period">${esc(e.period)}</div>
      <h3>${esc(e.title)}</h3>
      ${e.location ? `<p class="loc">${esc(e.location)}</p>` : ''}
      ${(e.bullets || []).length ? `<ul>${e.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>` : ''}
    </li>`);
  $('#exp-intro').textContent = experience.intro;
}

function renderEducation() {
  timelineOrNote($('#edu-list'), $('#edu-note'), $('#edu-title'), education.title, education.items, (e) => `
    <li class="timeline-item">
      <div class="period">${esc(e.period)}</div>
      <h3>${esc(e.title)}</h3>
      ${e.details ? `<p>${esc(e.details)}</p>` : ''}
    </li>`);
}

function renderCerts() {
  const shown = visible(certifications.items);
  $('#certs-title').textContent = certifications.title;
  $('#certs-list').hidden = shown.length === 0;
  $('#certs-note').hidden = shown.length !== 0;
  $('#certs-list').innerHTML = shown.map((c) => `<li>${esc(c.name)}</li>`).join('');
}

function renderProjects() {
  $('#projects-title').textContent = projects.title;
  $('#projects-intro').textContent = projects.intro;
  $('#projects-grid').innerHTML = visible(projects.items)
    .map((p) => `
      <div class="card">
        <h3>${esc(p.name)}</h3>
        <p class="loc">${esc(p.stack)}</p>
        <p>${esc(p.description)}</p>
        ${(p.links || []).map((l) => `<p><a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a></p>`).join('')}
      </div>`)
    .join('');
}

function renderContact() {
  $('#contact-title').textContent = contact.title;
  $('#contact-text').textContent = contact.text;
  const btn = $('#contact-btn');
  btn.href = `mailto:${profile.email}`;
  btn.textContent = contact.ctaLabel;
  $('#year').textContent = new Date().getFullYear();
  $('#footer-name').textContent = profile.fullName;
  $('#footer-note').textContent = footer.note;
}

function initNav() {
  const toggle = $('#nav-toggle');
  const links = $('#nav-links');
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  links.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') links.classList.remove('open');
  });
}

renderHeader();
renderHero();
renderAbout();
renderSkills();
renderExperience();
renderEducation();
renderCerts();
renderProjects();
renderContact();
initNav();
