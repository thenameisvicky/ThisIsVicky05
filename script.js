async function fetchJsonOrNull(path) {
  try {
    const res = await fetch(path, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}

async function loadMemoryData() {
  const base = './Memory';
  const index = await fetchJsonOrNull(`${base}/index.json`);

  const personal = await fetchJsonOrNull(`${base}/personal.json`);
  const skills = await fetchJsonOrNull(`${base}/skills.json`);
  const education = await fetchJsonOrNull(`${base}/education.json`);
  const experience = await fetchJsonOrNull(`${base}/experience.json`);
  const projects = await fetchJsonOrNull(`${base}/projects.json`);
  const goals = await fetchJsonOrNull(`${base}/goals.json`);
  const problemSolving = await fetchJsonOrNull(`${base}/problemSolving.json`);

  const fallback = window.PORTFOLIO_DATA || {};
  return {
    meta: index || fallback.meta || {},
    personal: personal || fallback.personal || {},
    skills: skills || fallback.skills || {},
    education: education || fallback.education || {},
    experience: experience || fallback.experience || {},
    projects: projects || fallback.projects || {},
    goals: goals || fallback.goals || {},
    problemSolving: problemSolving || fallback.problemSolving || {}
  };
}

function setHeader(personal) {
  const nameEl = document.getElementById('brand-name');
  const roleEl = document.getElementById('brand-role');
  if (personal?.name) nameEl.textContent = personal.name;
  if (personal?.currentRole) roleEl.textContent = personal.currentRole;
}

function renderAbout(personal, meta) {
  const el = document.getElementById('about-content');
  const lines = [];
  if (personal?.experience) lines.push(`${personal.experience}`);
  if (meta?.summary) lines.push(meta.summary);
  el.innerHTML = `
    <p>${lines.filter(Boolean).join(' — ')}</p>
    <ul class="list-inline">
      ${personal?.email ? `<li class="chip">${personal.email}</li>` : ''}
      ${personal?.phone ? `<li class="chip">${personal.phone}</li>` : ''}
    </ul>
  `;
}

function renderSkills(skills) {
  const el = document.getElementById('skills-content');
  const card = (title, text) => `
    <div class="skill-card">
      <h3>${title}</h3>
      <p>${text || ''}</p>
    </div>
  `;
  el.innerHTML = `
    ${card('Technical', skills?.technical)}
    ${card('Tools', skills?.tools)}
    ${card('Soft Skills', skills?.softSkills)}
  `;
}

function renderExperience(experience) {
  const el = document.getElementById('experience-content');
  const cur = experience?.currentPosition || {};
  const prev = experience?.previousPosition || {};
  const achievements = (cur.achievements || []).map(x => `<li>${x}</li>`).join('');
  el.innerHTML = `
    <div class="xp-item">
      <h3>${cur.role || ''} — ${cur.company || ''}</h3>
      <div class="meta">${cur.duration || ''}</div>
      ${achievements ? `<ul>${achievements}</ul>` : ''}
    </div>
    ${prev.company ? `
      <div class="xp-item">
        <h3>${prev.role || ''} — ${prev.company || ''}</h3>
        <div class="meta">${prev.duration || ''}</div>
      </div>` : ''}
  `;
}

function renderProjects(projects) {
  const el = document.getElementById('projects-content');
  const cards = Object.values(projects || {}).map(p => {
    const features = Array.isArray(p.features) ? `<ul>${p.features.map(f => `<li>${f}</li>`).join('')}</ul>` : '';
    return `
      <div class="project-card">
        <h3>${p.name || ''}</h3>
        <p>${p.description || ''}</p>
        ${features}
      </div>
    `;
  }).join('');
  el.innerHTML = cards;
}

function renderEducation(edu) {
  const el = document.getElementById('education-content');
  el.innerHTML = `
    <div>
      <div><strong>${edu?.degree || ''}</strong>, ${edu?.institution || ''}</div>
      <div class="muted">${edu?.duration || ''} • CGPA: ${edu?.cgpa || ''}</div>
      <div class="muted">Class 12: ${edu?.class12 || ''} • Class 10: ${edu?.class10 || ''}</div>
      <p class="muted">${edu?.learningProgress || ''}</p>
    </div>
  `;
}

function renderProblemSolving(ps) {
  const el = document.getElementById('ps-content');
  const meta = `
    <p>
      ${ps?.currentLevel || ''}
      ${ps?.lastSolvedStrategyDate ? ` — Last updated: ${ps.lastSolvedStrategyDate}` : ''}
    </p>`;
  const problems = (ps?.problems || []).filter(p => p.recentlyAdded).slice(0, 8);
  const grid = problems.length ? `
    <div class="ps-grid">
      ${problems.map(p => `
        <div class="ps-card">
          <h4>${p.name}</h4>
          <p>${p.approach || ''}</p>
        </div>
      `).join('')}
    </div>
  ` : '';
  const chips = (ps?.areasOfImprovement || []).slice(0, 6).map(c => `<li class="chip">${c}</li>`).join('');
  el.innerHTML = `${meta}${grid}${chips ? `<ul class="list-inline" style="margin-top:10px">${chips}</ul>` : ''}`;
}

function renderGoals(goals) {
  const el = document.getElementById('goals-content');
  const gh = goals?.growthHistory || [];
  const items = gh.map(g => `<li><strong>${g.date}:</strong> <span class="muted">${g.summary}</span></li>`).join('');
  const areas = (goals?.areasForImprovement || []).slice(0, 8).map(a => `<li class="chip">${a}</li>`).join('');
  el.innerHTML = `
    <p><strong>Dream:</strong> ${goals?.ambition?.dream || ''}</p>
    <p><strong>Short term:</strong> ${(goals?.ambition?.shortTermGoals || []).join(', ')}</p>
    <p><strong>Long term:</strong> ${(goals?.ambition?.longTermGoals || []).join(', ')}</p>
    ${items ? `<ul>${items}</ul>` : ''}
    ${areas ? `<ul class="list-inline">${areas}</ul>` : ''}
  `;
}

function renderContact(personal) {
  const el = document.getElementById('contact-content');
  const email = personal?.email ? `<a href="mailto:${personal.email}">${personal.email}</a>` : '';
  const phone = personal?.phone ? `<span>${personal.phone}</span>` : '';
  el.innerHTML = `<p>${[email, phone].filter(Boolean).join(' · ')}</p>`;
}

function renderFooter(meta) {
  const s = document.getElementById('footer-summary');
  const d = document.getElementById('last-updated');
  if (meta?.summary) s.textContent = meta.summary;
  if (meta?.lastUpdated) d.textContent = `Last Updated: ${meta.lastUpdated}`;
}

async function main() {
  const data = await loadMemoryData();
  setHeader(data.personal);
  renderAbout(data.personal, data.meta);
  renderSkills(data.skills);
  renderExperience(data.experience);
  renderProjects(data.projects);
  renderEducation(data.education);
  renderProblemSolving(data.problemSolving);
  renderGoals(data.goals);
  renderContact(data.personal);
  renderFooter(data.meta);
}

document.addEventListener('DOMContentLoaded', main);


