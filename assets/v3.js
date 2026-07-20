document.addEventListener('DOMContentLoaded',()=>{
  const body=document.body,toggle=document.querySelector('.mobile-menu-toggle');
  const closeMenu=()=>{body.classList.remove('menu-open');toggle?.setAttribute('aria-expanded','false')};
  toggle?.addEventListener('click',()=>{const open=!body.classList.contains('menu-open');body.classList.toggle('menu-open',open);toggle.setAttribute('aria-expanded',String(open))});
  document.querySelectorAll('[data-menu-close]').forEach(el=>el.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
  const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  document.querySelectorAll('.nav a').forEach(a=>{if((a.getAttribute('href')||'').split('?')[0].toLowerCase()===current)a.classList.add('active');else a.classList.remove('active')});
  document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',closeMenu));
  const input=document.querySelector('[data-site-search]');
  input?.addEventListener('keydown',e=>{if(e.key==='Enter'&&input.value.trim()){location.href='agencies-hub.html?search='+encodeURIComponent(input.value.trim())}});
});