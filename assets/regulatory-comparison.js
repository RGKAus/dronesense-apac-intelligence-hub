(() => {
  const regionButtons=[...document.querySelectorAll('[data-region-toggle]')];
  const filterButtons=[...document.querySelectorAll('[data-filter]')];
  const rows=[...document.querySelectorAll('.comparison-table tbody tr')];
  const reset=document.querySelector('.reset-comparison');
  function activeRegions(){return regionButtons.filter(b=>b.classList.contains('active')).map(b=>b.dataset.regionToggle)}
  function renderRegions(){const active=activeRegions();document.querySelectorAll('[data-region]').forEach(el=>{if(el.dataset.region==='topic')return;el.hidden=!active.includes(el.dataset.region)});document.querySelectorAll('[data-path-region]').forEach(el=>el.hidden=!active.includes(el.dataset.pathRegion));}
  regionButtons.forEach(btn=>btn.addEventListener('click',()=>{btn.classList.toggle('active');btn.setAttribute('aria-pressed',btn.classList.contains('active'));if(!activeRegions().length){btn.classList.add('active');btn.setAttribute('aria-pressed','true')}renderRegions()}));
  filterButtons.forEach(btn=>btn.addEventListener('click',()=>{filterButtons.forEach(b=>b.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;rows.forEach(r=>r.hidden=f!=='all'&&r.dataset.category!==f)}));
  document.querySelectorAll('[data-select-region]').forEach(btn=>btn.addEventListener('click',()=>{regionButtons.forEach(b=>{const on=b.dataset.regionToggle===btn.dataset.selectRegion;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on))});renderRegions();document.querySelector('.comparison-table-panel').scrollIntoView({behavior:'smooth'})}));
  reset?.addEventListener('click',()=>{regionButtons.forEach(b=>{b.classList.add('active');b.setAttribute('aria-pressed','true')});filterButtons.forEach(b=>b.classList.toggle('active',b.dataset.filter==='all'));rows.forEach(r=>r.hidden=false);renderRegions()});
  renderRegions();
})();
