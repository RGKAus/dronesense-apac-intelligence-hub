// DroneSense APAC Intelligence Hub — shared shell + interactivity
// Renders the topbar and sidebar from one data source so every page stays
// in sync as markets/sections are added. Search and filters are structural
// stubs — not yet wired to a live content index.

const AU_SECTIONS = [
  { id: 'dashboard',            label: 'Dashboard',          href: 'index.html' },
  { id: 'regulations',          label: 'Regulations',        href: 'regulations-hub.html' },
  { id: 'public-safety',        label: 'Public Safety',      href: 'public-safety-hub.html' },
  { id: 'critical-infra',       label: 'Critical Infrastructure', href: 'critical-infrastructure-hub.html' },
  { id: 'agencies',             label: 'Agencies',           href: 'agencies-hub.html' },
  { id: 'uas-ecosystem',        label: 'UAS Ecosystem',      href: 'uas-ecosystem-hub.html' },
  { id: 'mission-profiles',     label: 'Mission Profiles',   href: 'mission-profiles-hub.html' },
  { id: 'technology',           label: 'Technology',         href: 'technology-hub.html' },
  { id: 'regulatory-updates',   label: 'Regulatory Updates', href: 'regulatory-updates-hub.html' },
];

// Research Engine — cross-market tools (Phase 1). Rendered as its own
// expandable sidebar section beneath Australia, using the same
// collapsible nav logic as every country group.
const RESEARCH_TOOLS_SECTIONS = [
  { id: 'research-toolkit', label: 'Research Toolkit', href: 'research-toolkit-hub.html' },
  { id: 'prompt-library',   label: 'Prompt Library',   href: 'prompt-library-hub.html' },
  { id: 'keyword-library',  label: 'Keyword Library',  href: 'keyword-library-hub.html' },
  { id: 'search-library',   label: 'Search Library',   href: 'search-library-hub.html' },
  { id: 'my-notebook',      label: 'My Notebook',      href: 'my-notebook.html' },
];

const NAV_TREE = [
  { name: 'Australia', status: 'active', items: AU_SECTIONS },
  { name: 'Research Tools', status: 'active', items: RESEARCH_TOOLS_SECTIONS },
  { name: 'New Zealand', status: 'soon' },
  { name: 'Singapore', status: 'soon' },
  { name: 'Japan', status: 'soon' },
  { name: 'South Korea', status: 'soon' },
  { name: 'Malaysia', status: 'soon' },
  { name: 'Indonesia', status: 'soon' },
  { name: 'Thailand', status: 'soon' },
  { name: 'Philippines', status: 'soon' },
  { name: 'Taiwan', status: 'soon' },
  { name: 'Hong Kong', status: 'soon' },
  { name: 'Europe', status: 'soon' },
  { name: 'United Kingdom', status: 'soon' },
];

function renderShell(activePageId) {
  const topbar = document.getElementById('shell-topbar');
  const sidebar = document.getElementById('shell-sidebar');
  if (!topbar || !sidebar) return;

  topbar.innerHTML = `
    <a class="shell-brand" href="index.html">
      <span class="shell-mark">DS</span>
      <span class="shell-brand-text"><b>DroneSense APAC Intelligence Hub</b><span>Internal &middot; DroneSense by Versaterm</span></span>
    </a>
    <span class="shell-region-badge">AU · Live</span>
    <div class="shell-search">
      <div class="shell-search-wrap">
        <form data-search-form>
          <input type="search" placeholder="Search regulations, agencies, companies, missions…">
        </form>
        <span class="shell-kbd">/</span>
      </div>
    </div>
    <div class="shell-util">
      <a href="index.html#confidence-overview">Confidence overview</a>
      <a href="regulatory-updates-hub.html">Regulatory alerts</a>
      <a href="#">Admin</a>
    </div>
    <button class="shell-nav-toggle" aria-expanded="false" aria-label="Toggle navigation">Menu</button>
  `;

  sidebar.innerHTML = NAV_TREE.map(country => {
    if (country.status === 'active') {
      const items = country.items.map(item => `
        <a href="${item.href}" class="${item.id === activePageId ? 'active' : ''}">
          <span class="dot"></span>${item.label}
        </a>`).join('');
      return `
        <div class="nav-country open">
          <div class="nav-country-head" data-toggle>
            <span class="chev">▶</span>
            <span class="country-name">${country.name}</span>
          </div>
          <div class="nav-country-items">${items}</div>
        </div>`;
    }
    return `
      <div class="nav-country disabled">
        <div class="nav-country-head">
          <span class="chev">▶</span>
          <span class="country-name">${country.name}</span>
          <span class="soon-tag">Coming soon</span>
        </div>
      </div>`;
  }).join('');

  // expand/collapse for the active (Australia) tree — coming-soon rows are inert
  sidebar.querySelectorAll('.nav-country:not(.disabled) .nav-country-head[data-toggle]').forEach(head => {
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

  // Search stub
  document.querySelectorAll('[data-search-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="search"], input[type="text"]');
      const note = form.parentElement.querySelector('.search-note');
      if (note && input) {
        note.textContent = input.value
          ? `Search index not yet connected — "${input.value}" will match against regulation, agency, mission and company records once content is populated.`
          : '';
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
