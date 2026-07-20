// DroneSense — Australian Public Safety & RPAS Intelligence Platform
// Shared shell + interactivity. v2.0: flat top-level navigation
// (Overview / Intelligence / Agency Directory / Regulations / Reports),
// a collapsible Research group, and a collapsible Countries group
// scoped to Australia (primary) and New Zealand only — no other
// countries, no placeholders.

const TOP_SECTIONS = [
  { id: 'overview',         label: 'Overview',          href: 'index.html' },
  { id: 'intelligence',     label: 'Intelligence',      href: 'intelligence-hub.html' },
  { id: 'agency-directory', label: 'Agency Directory',  href: 'agencies-hub.html' },
  { id: 'regulations',      label: 'Regulations',       href: 'regulations-hub.html' },
  { id: 'reports',          label: 'Reports',           href: 'reports-hub.html' },
];

const RESEARCH_SECTIONS = [
  { id: 'research-toolkit', label: 'Research Toolkit', href: 'research-toolkit-hub.html' },
  { id: 'prompt-library',   label: 'Prompt Library',   href: 'prompt-library-hub.html' },
  { id: 'keyword-library',  label: 'Keyword Library',  href: 'keyword-library-hub.html' },
  { id: 'search-library',   label: 'Search Library',   href: 'search-library-hub.html' },
  { id: 'source-directory', label: 'Source Directory', href: 'research-toolkit-hub.html#official-sources' },
  { id: 'my-notebook',      label: 'My Notebook',       href: 'my-notebook.html' },
];

const COUNTRY_SECTIONS = [
  { id: 'country-au', label: '🇦🇺 Australia',    href: 'index.html' },
  { id: 'country-nz', label: '🇳🇿 New Zealand', href: 'research-toolkit-hub.html#official-sources' },
];

const NAV_TREE = [
  { name: 'Platform',   status: 'flat',   items: TOP_SECTIONS },
  { name: 'Research',   status: 'active', items: RESEARCH_SECTIONS },
  { name: 'Countries',  status: 'active', items: COUNTRY_SECTIONS },
];

// Also-reachable secondary hubs — not in the primary nav, but preserved
// and cross-linked from Overview / Intelligence / Agency Directory so
// no existing content is lost. See index.html, intelligence-hub.html.
// public-safety-hub.html · critical-infrastructure-hub.html ·
// uas-ecosystem-hub.html · mission-profiles-hub.html · technology-hub.html ·
// regulatory-updates-hub.html

// ----------------------------------------------------------------
// Global search index — client-side only (GitHub Pages compatible,
// no backend). Covers agencies, regulations, intelligence, research
// tools, reports and official sources per the v2.0 spec. This is a
// navigational index of section labels, not a fabricated content
// database — it points to real pages/anchors only.
// ----------------------------------------------------------------
const SEARCH_INDEX = [
  // Agency Directory
  { type: 'Agency', title: 'Federal law enforcement', href: 'agencies-hub.html' },
  { type: 'Agency', title: 'State/Territory Police', href: 'agencies-hub.html' },
  { type: 'Agency', title: 'Fire & Rescue Service', href: 'agencies-hub.html' },
  { type: 'Agency', title: 'Rural Fire Service', href: 'agencies-hub.html' },
  { type: 'Agency', title: 'Ambulance Service', href: 'agencies-hub.html' },
  { type: 'Agency', title: 'State Emergency Service', href: 'agencies-hub.html' },
  { type: 'Agency', title: 'Marine Rescue', href: 'agencies-hub.html' },
  { type: 'Agency', title: 'Surf Life Saving', href: 'agencies-hub.html' },
  { type: 'Agency', title: 'Parks & Wildlife Service', href: 'agencies-hub.html' },
  { type: 'Agency', title: 'Emergency Management agency', href: 'agencies-hub.html?type=Emergency%20Management' },
  { type: 'Agency', title: 'Border Force', href: 'agencies-hub.html?type=Border%20Force' },
  { type: 'Agency', title: 'Defence (domestic support)', href: 'agencies-hub.html?type=Defence' },
  { type: 'Agency', title: 'CASA — Civil Aviation Safety Authority', href: 'agencies-hub.html?type=Civil%20Aviation' },
  { type: 'Agency', title: 'Airservices Australia', href: 'agencies-hub.html?type=Air%20Navigation' },
  { type: 'Agency', title: 'Local Government', href: 'agencies-hub.html?type=Local%20Government' },
  { type: 'Agency', title: 'Energy operator', href: 'agencies-hub.html?type=Energy' },
  { type: 'Agency', title: 'Utilities operator', href: 'agencies-hub.html?type=Utilities' },
  { type: 'Agency', title: 'Mining operator', href: 'agencies-hub.html?type=Mining' },
  { type: 'Agency', title: 'Oil & Gas operator', href: 'agencies-hub.html?type=Oil%20%26%20Gas' },
  { type: 'Agency', title: 'Ports operator', href: 'agencies-hub.html?type=Ports' },
  { type: 'Agency', title: 'Rail operator', href: 'agencies-hub.html?type=Rail' },
  { type: 'Agency', title: 'Telecommunications operator', href: 'agencies-hub.html?type=Telecommunications' },
  { type: 'Agency', title: 'Water utility', href: 'agencies-hub.html?type=Water' },
  { type: 'Agency', title: 'Critical infrastructure operators', href: 'critical-infrastructure-hub.html' },
  { type: 'Agency', title: 'UAS ecosystem companies', href: 'uas-ecosystem-hub.html' },
  // Regulations
  { type: 'Regulation', title: 'CASA', href: 'regulation-casa.html' },
  { type: 'Regulation', title: 'CASR Part 101', href: 'regulation-part-101.html' },
  { type: 'Regulation', title: 'Manual of Standards', href: 'regulations-hub.html' },
  { type: 'Regulation', title: 'RPA Operator\'s Certificate (ReOC)', href: 'regulation-reoc.html' },
  { type: 'Regulation', title: 'Remote Pilot Licence (RePL)', href: 'regulation-repl.html' },
  { type: 'Regulation', title: 'Aircraft Radio Operator Certificate (AROC)', href: 'regulations-hub.html' },
  { type: 'Regulation', title: 'BVLOS', href: 'regulation-aussora.html' },
  { type: 'Regulation', title: 'EVLOS', href: 'regulation-aussora.html' },
  { type: 'Regulation', title: 'AusSORA', href: 'regulation-aussora.html' },
  { type: 'Regulation', title: 'Excluded category operations', href: 'regulations-hub.html' },
  { type: 'Regulation', title: 'Airspace approvals', href: 'regulations-hub.html' },
  { type: 'Regulation', title: 'Airservices Australia', href: 'regulations-hub.html' },
  { type: 'Regulation', title: 'FIMS — Flight Information Management System', href: 'regulations-hub.html' },
  { type: 'Regulation', title: 'Remote ID', href: 'regulations-hub.html' },
  { type: 'Regulation', title: 'ADS-B', href: 'regulations-hub.html' },
  { type: 'Regulation', title: 'Advisory circulars', href: 'regulations-hub.html' },
  { type: 'Regulation', title: 'Consultations', href: 'regulations-hub.html' },
  // Intelligence
  { type: 'Intelligence', title: 'Political Intelligence', href: 'intelligence-hub.html#political' },
  { type: 'Intelligence', title: 'Budget Intelligence', href: 'intelligence-hub.html#budget' },
  { type: 'Intelligence', title: 'Procurement Intelligence', href: 'intelligence-hub.html#procurement' },
  { type: 'Intelligence', title: 'Regulatory Intelligence', href: 'intelligence-hub.html#regulatory' },
  { type: 'Intelligence', title: 'Public Safety Intelligence', href: 'intelligence-hub.html#public-safety-intel' },
  { type: 'Intelligence', title: 'Critical Infrastructure Intelligence', href: 'intelligence-hub.html#ci-intel' },
  { type: 'Intelligence', title: 'Market Intelligence', href: 'intelligence-hub.html#market' },
  { type: 'Intelligence', title: 'Current Watch List', href: 'intelligence-hub.html#watch-list' },
  // Research
  { type: 'Research', title: 'Research Toolkit', href: 'research-toolkit-hub.html' },
  { type: 'Research', title: 'Prompt Library', href: 'prompt-library-hub.html' },
  { type: 'Research', title: 'Keyword Library', href: 'keyword-library-hub.html' },
  { type: 'Research', title: 'Search Library', href: 'search-library-hub.html' },
  { type: 'Research', title: 'Source Directory', href: 'research-toolkit-hub.html#official-sources' },
  { type: 'Research', title: 'My Notebook', href: 'my-notebook.html' },
  // Reports
  { type: 'Report', title: 'Agency Intelligence Report', href: 'reports-hub.html#agency-report' },
  { type: 'Report', title: 'Country Intelligence Report', href: 'reports-hub.html#country-report' },
  { type: 'Report', title: 'Regulatory Report', href: 'reports-hub.html#regulatory-report' },
  { type: 'Report', title: 'Public Safety Sector Report', href: 'reports-hub.html#public-safety-report' },
  { type: 'Report', title: 'Critical Infrastructure Report', href: 'reports-hub.html#ci-report' },
  { type: 'Report', title: 'Procurement Opportunity Report', href: 'reports-hub.html#procurement-report' },
  { type: 'Report', title: 'Political and Budget Impact Report', href: 'reports-hub.html#political-report' },
  { type: 'Report', title: 'Competitor Report', href: 'reports-hub.html#competitor-report' },
  { type: 'Report', title: 'Customer Brief', href: 'reports-hub.html#customer-brief' },
  { type: 'Report', title: 'Meeting Brief', href: 'reports-hub.html#meeting-brief' },
  // Official sources
  { type: 'Source', title: 'CASA — official site', href: 'research-toolkit-hub.html#official-sources' },
  { type: 'Source', title: 'Airservices Australia — official site', href: 'research-toolkit-hub.html#official-sources' },
  { type: 'Source', title: 'AFP — official site', href: 'research-toolkit-hub.html#official-sources' },
  { type: 'Source', title: 'AFAC — official site', href: 'research-toolkit-hub.html#official-sources' },
  { type: 'Source', title: 'NEMA — official site', href: 'research-toolkit-hub.html#official-sources' },
  { type: 'Source', title: 'AMSA — official site', href: 'research-toolkit-hub.html#official-sources' },
  { type: 'Source', title: 'CISC — official site', href: 'research-toolkit-hub.html#official-sources' },
  { type: 'Source', title: 'AusTender', href: 'research-toolkit-hub.html#official-sources' },
  { type: 'Source', title: 'Federal Register of Legislation', href: 'research-toolkit-hub.html#official-sources' },
  { type: 'Source', title: 'CAA NZ — official site', href: 'research-toolkit-hub.html#official-sources' },
  { type: 'Source', title: 'Airways New Zealand — official site', href: 'research-toolkit-hub.html#official-sources' },
  { type: 'Source', title: 'New Zealand Police — official site', href: 'research-toolkit-hub.html#official-sources' },
  { type: 'Source', title: 'FENZ — official site', href: 'research-toolkit-hub.html#official-sources' },
  { type: 'Source', title: 'NEMA NZ — official site', href: 'research-toolkit-hub.html#official-sources' },
  { type: 'Source', title: 'NZSAR Council — official site', href: 'research-toolkit-hub.html#official-sources' },
  { type: 'Source', title: 'GETS — NZ government tenders', href: 'research-toolkit-hub.html#official-sources' },
];

function renderShell(activePageId) {
  const topbar = document.getElementById('shell-topbar');
  const sidebar = document.getElementById('shell-sidebar');
  if (!topbar || !sidebar) return;

  topbar.innerHTML = `
    <a class="shell-brand" href="index.html">
      <span class="shell-mark">DS</span>
      <span class="shell-brand-text"><b>DroneSense</b><span>Australian Public Safety &amp; RPAS Intelligence Platform</span></span>
    </a>
    <span class="shell-region-badge">AU · Live</span>
    <div class="shell-search">
      <div class="shell-search-wrap">
        <form data-search-form>
          <input type="search" placeholder="Search agencies, regulations, intelligence, reports…">
        </form>
        <span class="shell-kbd">/</span>
      </div>
    </div>
    <div class="shell-util">
      <a href="index.html#confidence-overview">Confidence overview</a>
      <a href="intelligence-hub.html#watch-list">Watch list</a>
      <a href="#">Admin</a>
    </div>
    <button class="shell-nav-toggle" aria-expanded="false" aria-label="Toggle navigation">Menu</button>
  `;

  sidebar.innerHTML = NAV_TREE.map(group => {
    if (group.status === 'flat') {
      const items = group.items.map(item => `
        <a href="${item.href}" class="${item.id === activePageId ? 'active' : ''}">
          <span class="dot"></span>${item.label}
        </a>`).join('');
      return `<div class="nav-country open nav-flat"><div class="nav-country-items">${items}</div></div>`;
    }
    if (group.status === 'active') {
      const items = group.items.map(item => `
        <a href="${item.href}" class="${item.id === activePageId ? 'active' : ''}">
          <span class="dot"></span>${item.label}
        </a>`).join('');
      return `
        <div class="nav-country open">
          <div class="nav-country-head" data-toggle>
            <span class="chev">▶</span>
            <span class="country-name">${group.name}</span>
          </div>
          <div class="nav-country-items">${items}</div>
        </div>`;
    }
    return `
      <div class="nav-country disabled">
        <div class="nav-country-head">
          <span class="chev">▶</span>
          <span class="country-name">${group.name}</span>
          <span class="soon-tag">Coming soon</span>
        </div>
      </div>`;
  }).join('');

  // expand/collapse for collapsible groups (Research, Countries) — the
  // flat top-level section and any disabled rows are inert
  sidebar.querySelectorAll('.nav-country:not(.disabled):not(.nav-flat) .nav-country-head[data-toggle]').forEach(head => {
    head.addEventListener('click', () => {
      head.closest('.nav-country').classList.toggle('open');
    });
  });

  // mobile nav toggle
  const toggle = document.querySelector('.shell-nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const open = sidebar.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderShell(document.body.dataset.page || '');

  // Facet chip toggling (visual only until a live index exists)
  document.querySelectorAll('.facet-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const pressed = chip.getAttribute('aria-pressed') === 'true';
      chip.setAttribute('aria-pressed', pressed ? 'false' : 'true');
    });
  });

  // ----------------------------------------------------------------
  // Global search — client-side only, no backend. Filters SEARCH_INDEX
  // and shows a dropdown of {type, title} results under any input
  // marked [data-search-form]. Works identically on the topbar search
  // and the Overview page hero search.
  // ----------------------------------------------------------------
  document.querySelectorAll('[data-search-form]').forEach(form => {
    const input = form.querySelector('input[type="search"], input[type="text"]');
    if (!input) return;
    let results = form.querySelector('.gsearch-results');
    if (!results) {
      results = document.createElement('div');
      results.className = 'gsearch-results';
      form.appendChild(results);
    }
    const render = (q) => {
      if (!q) { results.classList.remove('open'); results.innerHTML = ''; return; }
      const needle = q.toLowerCase();
      const matches = SEARCH_INDEX.filter(item => item.title.toLowerCase().includes(needle)).slice(0, 8);
      results.innerHTML = matches.length
        ? matches.map(m => `<a class="gsr-item" href="${m.href}"><span class="gsr-type">${m.type}</span>${m.title}</a>`).join('')
        : '<div class="gsr-empty">No matches</div>';
      results.classList.add('open');
    };
    input.addEventListener('input', () => render(input.value.trim()));
    input.addEventListener('focus', () => { if (input.value.trim()) render(input.value.trim()); });
    document.addEventListener('click', (e) => {
      if (!form.contains(e.target) && !results.contains(e.target)) results.classList.remove('open');
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = input.value.trim();
      const note = form.parentElement.querySelector('.search-note');
      if (!q) return;
      const needle = q.toLowerCase();
      const matches = SEARCH_INDEX.filter(item => item.title.toLowerCase().includes(needle));
      if (matches.length) {
        window.location.href = matches[0].href;
      } else if (note) {
        note.textContent = `No matches for "${q}".`;
      }
    });
  });

  // Filter selects — visual state only until data is populated
  document.querySelectorAll('.filter-bar select').forEach(sel => {
    sel.addEventListener('change', () => {
      console.log(`Filter "${sel.closest('.filter-group')?.querySelector('label')?.textContent}" set to`, sel.value, '— not yet wired to live data.');
    });
  });

  // My Notes — saved locally in this browser only (per page, per device).
  // Not shared with other users and not part of the platform's verified
  // content; purely a personal scratchpad while researching a page.
  document.querySelectorAll('[data-notes-key]').forEach(box => {
    const key = 'ds-apac-notes:' + box.dataset.notesKey;
    const textarea = box.querySelector('textarea');
    const status = box.querySelector('.notes-status');
    const saveBtn = box.querySelector('[data-notes-save]');
    const clearBtn = box.querySelector('[data-notes-clear]');

    try {
      const saved = window.localStorage.getItem(key);
      if (saved && textarea) textarea.value = saved;
      if (saved && status) status.textContent = 'Loaded from this browser.';
    } catch (e) {
      if (status) status.textContent = 'Local storage unavailable in this browser — notes will not persist.';
    }

    if (saveBtn) saveBtn.addEventListener('click', () => {
      try {
        window.localStorage.setItem(key, textarea.value);
        if (status) status.textContent = 'Saved to this browser · ' + new Date().toLocaleString();
      } catch (e) {
        if (status) status.textContent = 'Could not save — local storage unavailable.';
      }
    });
    if (clearBtn) clearBtn.addEventListener('click', () => {
      try { window.localStorage.removeItem(key); } catch (e) { /* noop */ }
      if (textarea) textarea.value = '';
      if (status) status.textContent = 'Cleared.';
    });
  });

  // ----------------------------------------------------------------
  // Agency Directory — search + State/Sector/Org type/RPAS filters,
  // alphabetical sort toggle, and URL query param pre-selection
  // (?type=Police from an Overview card maps to the Sector filter,
  // case-insensitively, so existing deep links keep working).
  // ----------------------------------------------------------------
  const agencyBody = document.getElementById('agency-tbody');
  if (agencyBody) {
    const rows = Array.from(agencyBody.querySelectorAll('tr'));
    const search = document.getElementById('agency-search');
    const stateSel = document.getElementById('af-state');
    const sectorSel = document.getElementById('af-sector');
    const orgtypeSel = document.getElementById('af-orgtype');
    const rpasSel = document.getElementById('af-rpas');
    const sortBtn = document.getElementById('af-sort-name');
    const countEl = document.getElementById('agency-count');
    const emptyEl = document.getElementById('agency-empty');

    const params = new URLSearchParams(window.location.search);
    const urlType = params.get('type');
    if (urlType && sectorSel) {
      const needle = urlType.toLowerCase();
      const match = Array.from(sectorSel.options).find(o => o.value.toLowerCase() === needle);
      if (match) sectorSel.value = match.value;
    }

    const apply = () => {
      const q = search ? search.value.trim().toLowerCase() : '';
      const sf = stateSel ? stateSel.value : 'all';
      const secf = sectorSel ? sectorSel.value : 'all';
      const of = orgtypeSel ? orgtypeSel.value : 'all';
      const rf = rpasSel ? rpasSel.value : 'all';
      let shown = 0;
      rows.forEach(row => {
        const matchesState = sf === 'all' || row.dataset.state === sf;
        const matchesSector = secf === 'all' || row.dataset.sector === secf;
        const matchesOrgtype = of === 'all' || row.dataset.orgtype === of;
        const matchesRpas = rf === 'all' || row.dataset.rpas === rf;
        const matchesQ = !q || row.textContent.toLowerCase().includes(q);
        const show = matchesState && matchesSector && matchesOrgtype && matchesRpas && matchesQ;
        row.style.display = show ? '' : 'none';
        if (show) shown++;
      });
      if (countEl) countEl.textContent = shown + ' agenc' + (shown === 1 ? 'y' : 'ies');
      if (emptyEl) emptyEl.style.display = shown ? 'none' : '';
    };

    if (sortBtn) sortBtn.addEventListener('click', () => {
      const dir = sortBtn.dataset.dir === 'asc' ? 'desc' : 'asc';
      sortBtn.dataset.dir = dir;
      const sorted = rows.slice().sort((a, b) => {
        const an = a.children[0].textContent.trim().toLowerCase();
        const bn = b.children[0].textContent.trim().toLowerCase();
        return dir === 'asc' ? an.localeCompare(bn) : bn.localeCompare(an);
      });
      sorted.forEach(row => agencyBody.appendChild(row));
    });

    if (search) search.addEventListener('input', apply);
    [stateSel, sectorSel, orgtypeSel, rpasSel].forEach(sel => { if (sel) sel.addEventListener('change', apply); });
    apply();
  }

  // ----------------------------------------------------------------
  // Copy-to-clipboard — used across the Prompt Library and Search
  // Library so every ready-made prompt/search string is one click to
  // reuse. Falls back gracefully if the Clipboard API is unavailable.
  // ----------------------------------------------------------------
  document.querySelectorAll('[data-copy-btn]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetSel = btn.getAttribute('data-copy-btn');
      const container = btn.closest('.prompt-card, .search-string-card, tr');
      const textEl = container ? container.querySelector(targetSel) : document.querySelector(targetSel);
      const text = textEl ? textEl.textContent.trim() : '';
      const done = () => {
        const original = btn.textContent;
        btn.textContent = 'Copied ✓';
        btn.classList.add('copied');
        setTimeout(() => { btn.textContent = original; btn.classList.remove('copied'); }, 1600);
      };
      if (navigator.clipboard && text) {
        navigator.clipboard.writeText(text).then(done).catch(done);
      } else if (text) {
        // Fallback for browsers without async clipboard support
        const ta = document.createElement('textarea');
        ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); } catch (e) { /* noop */ }
        document.body.removeChild(ta);
        done();
      }
    });
  });

  // ----------------------------------------------------------------
  // Prompt Library — category filter chips + keyword search, combined.
  // ----------------------------------------------------------------
  const promptFilterBar = document.querySelector('[data-prompt-filters]');
  const promptSearch = document.querySelector('[data-prompt-search]');
  if (promptFilterBar || promptSearch) {
    const chips = promptFilterBar ? promptFilterBar.querySelectorAll('.facet-chip') : [];
    const cards = document.querySelectorAll('.prompt-card');
    const countEl = document.querySelector('[data-prompt-count]');
    let activeCategory = 'all';
    const applyPromptFilters = () => {
      const q = promptSearch ? promptSearch.value.trim().toLowerCase() : '';
      let shown = 0;
      cards.forEach(card => {
        const matchesCategory = activeCategory === 'all' || card.dataset.category === activeCategory;
        const haystack = (card.dataset.search || card.textContent).toLowerCase();
        const matchesSearch = !q || haystack.includes(q);
        const show = matchesCategory && matchesSearch;
        card.style.display = show ? '' : 'none';
        if (show) shown++;
      });
      if (countEl) countEl.textContent = shown + ' prompt' + (shown === 1 ? '' : 's');
    };
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.setAttribute('aria-pressed', 'false'));
        chip.setAttribute('aria-pressed', 'true');
        activeCategory = chip.dataset.filter;
        applyPromptFilters();
      });
    });
    if (promptSearch) promptSearch.addEventListener('input', applyPromptFilters);
    applyPromptFilters();
  }

  // ----------------------------------------------------------------
  // Keyword Library — live search across term, acronym, definition,
  // related organisations/technologies/legislation, and category.
  // ----------------------------------------------------------------
  const keywordSearch = document.querySelector('[data-keyword-search]');
  if (keywordSearch) {
    const cards = document.querySelectorAll('.keyword-card');
    const countEl = document.querySelector('[data-keyword-count]');
    const runSearch = () => {
      const q = keywordSearch.value.trim().toLowerCase();
      let shown = 0;
      cards.forEach(card => {
        const haystack = card.dataset.search || card.textContent.toLowerCase();
        const match = !q || haystack.toLowerCase().includes(q);
        card.style.display = match ? '' : 'none';
        if (match) shown++;
      });
      if (countEl) countEl.textContent = shown + ' term' + (shown === 1 ? '' : 's');
    };
    keywordSearch.addEventListener('input', runSearch);
    runSearch();

    // category chips work alongside the text search
    const catChips = document.querySelectorAll('[data-keyword-filters] .facet-chip');
    catChips.forEach(chip => {
      chip.addEventListener('click', () => {
        catChips.forEach(c => c.setAttribute('aria-pressed', 'false'));
        chip.setAttribute('aria-pressed', 'true');
        const cat = chip.dataset.filter;
        document.querySelectorAll('.keyword-card').forEach(card => {
          if (cat !== 'all' && card.dataset.category !== cat) {
            card.dataset.hiddenByCat = '1';
          } else {
            delete card.dataset.hiddenByCat;
          }
        });
        runSearch();
      });
    });
  }

  // ----------------------------------------------------------------
  // My Notebook — aggregates every "My Notes" entry saved anywhere on
  // the platform (all share the ds-apac-notes: localStorage prefix),
  // so research notes never get lost across dozens of pages.
  // ----------------------------------------------------------------
  const notebookList = document.querySelector('[data-notebook-list]');
  if (notebookList) {
    const PREFIX = 'ds-apac-notes:';
    const PAGE_LABELS = {
      'regulation-page-template': 'Regulation page',
      'agency-profile-template': 'Agency profile',
      'company-profile-template': 'Company profile',
      'mission-profile-template': 'Mission profile',
      'critical-infrastructure-template': 'Critical infrastructure sector',
      'technology-template': 'Technology topic',
    };
    const renderNotebook = () => {
      let entries = [];
      try {
        for (let i = 0; i < window.localStorage.length; i++) {
          const key = window.localStorage.key(i);
          if (key && key.indexOf(PREFIX) === 0) {
            const value = window.localStorage.getItem(key);
            if (value && value.trim()) {
              entries.push({ key: key.slice(PREFIX.length), value });
            }
          }
        }
      } catch (e) { /* localStorage unavailable */ }

      if (!entries.length) {
        notebookList.innerHTML = '<div class="callout">No notes saved in this browser yet. Open any regulation, agency, company, mission profile, critical infrastructure or technology page and use the "My Notes" section — entries appear here automatically.</div>';
        return;
      }
      notebookList.innerHTML = entries.map(e => `
        <div class="notebook-entry panel">
          <h3>${PAGE_LABELS[e.key] || e.key}</h3>
          <p class="notebook-entry-text">${e.value.replace(/</g,'&lt;')}</p>
          <div class="notebook-entry-actions">
            <button class="mono" data-notebook-delete="${e.key}" type="button">Delete this note</button>
          </div>
        </div>`).join('');

      notebookList.querySelectorAll('[data-notebook-delete]').forEach(btn => {
        btn.addEventListener('click', () => {
          try { window.localStorage.removeItem(PREFIX + btn.dataset.notebookDelete); } catch (e) {}
          renderNotebook();
        });
      });
    };
    renderNotebook();
  }
});
