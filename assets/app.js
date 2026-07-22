
const DS = (() => {
let DATA, UPDATES, POLITICS, COMPETITORS, TECHNOLOGY;
const $ = s => document.querySelector(s);
const q = () => Object.fromEntries(new URLSearchParams(location.search));
const slug = s => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/&/g,"and").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
async function load(){
  if(!DATA) DATA=await fetch("data/platform-data.json").then(r=>r.json());
  return DATA;
}
async function loadAll(){
  await load();
  [UPDATES,POLITICS,COMPETITORS,TECHNOLOGY]=await Promise.all([
    fetch("data/updates.json").then(r=>r.json()),
    fetch("data/politics.json").then(r=>r.json()),
    fetch("data/competitors.json").then(r=>r.json()),
    fetch("data/technology.json").then(r=>r.json())
  ]);
}
function chrome(active=""){
  $("#topbar").innerHTML=`<a class="brand" href="index.html"><b>DroneSense Intelligence Hub</b><small>Global public safety & RPAS intelligence</small></a>
  <div class="top-actions"><a href="updates.html">Live Updates</a><a href="report-generator.html">Reports</a></div>`;
  const countries=Object.entries(DATA.countries).map(([k,c])=>`<a class="${active===k?'active':''}" href="country.html?country=${k}">${c.flag} ${c.name}</a>`).join("");
  $("#sidebar").innerHTML=`<div class="nav">
  <div class="nav-label">Global</div><a href="index.html">Global Home</a>${countries}
  <div class="nav-label">Intelligence</div>
  <a href="updates.html">Live Updates</a><a href="regulations.html">Regulations</a><a href="report-generator.html">Report Generator</a>
  <a href="competitors.html">Competitor Platform</a><a href="technology-watch.html">Technology Watch</a><a href="politics.html">Political & Elections</a></div>`;
}
function agencyUrl(country,region,a){return `agency.html?country=${country}&region=${encodeURIComponent(region||"Nationwide")}&agency=${encodeURIComponent(a.name||a[0])}`}
function agencyCard(country,region,a){
  const o=Array.isArray(a)?{name:a[0],category:a[1],summary:a[2]}:a;
  return `<a class="agency-card" href="${agencyUrl(country,region,o)}"><div class="category">${o.category}</div><h3>${o.name}</h3><p>${o.summary}</p><span>Open intelligence profile →</span></a>`;
}
async function renderHome(){
  await load();chrome();
  $("#country-grid").innerHTML=Object.entries(DATA.countries).map(([k,c])=>`<a class="card" href="country.html?country=${k}"><div class="flag">${c.flag}</div><h2>${c.name}</h2><span>${c.adminLabel} map · National agencies · Live intelligence</span></a>`).join("");
}
async function fetchGeo(c){
  if(c.iso3==="EU") return fetch(c.geojson).then(r=>r.json());
  const meta=await fetch(c.geojson).then(r=>r.json());
  return fetch(meta.simplifiedGeometryGeoJSON || meta.gjDownloadURL).then(r=>r.json());
}
function findRegion(c,name){
  return c.regions.find(r=>[r.name,...(r.aliases||[])].some(x=>x.toLowerCase()===String(name).toLowerCase()));
}
async function renderCountry(){
  await loadAll();const p=q(), key=p.country||"australia", c=DATA.countries[key];chrome(key);
  $("#country-title").textContent=`${c.flag} ${c.name}`;
  $("#country-lead").textContent=`Select a ${c.adminLabel.toLowerCase()} on the real geographic map to open its complete public-safety directory. Nationwide agencies are listed beneath the map.`;
  $("#map-title").textContent=`Interactive ${c.adminLabel.toLowerCase()} map`;
  $("#national-agencies").innerHTML=c.nationalAgencies.map(a=>agencyCard(key,"Nationwide",a)).join("");
  ["politics","reg","tech","comp"].forEach(x=>{const el=$(`#country-${x}-link`); if(el) el.href=({politics:"politics.html",reg:"regulations.html",tech:"technology-watch.html",comp:"competitors.html"})[x]+`?country=${key}`});
  renderCountryUpdates(key,$("#country-updates"));
  const fallback=$("#map-fallback");
  fallback.innerHTML=c.regions.map(r=>`<a class="region-tile" href="region.html?country=${key}&region=${encodeURIComponent(r.name)}"><h3>${r.name}</h3><span>Open public-safety directory →</span></a>`).join("");
  const mapEl=$("#country-map");
  mapEl.innerHTML=`<object class="local-map-object" type="image/svg+xml" data="${c.localMap}" aria-label="${c.name} interactive geographic map"></object>`;
  mapEl.insertAdjacentHTML("afterend",`<div class="map-credit">Map geometry is stored locally in this release. No runtime boundary API is required.</div>`);
  fallback.style.display="grid";
  $("#region-search").addEventListener("input",e=>{const s=e.target.value.toLowerCase();[...fallback.children].forEach(x=>x.style.display=x.textContent.toLowerCase().includes(s)?"":"none")});
}
async function renderRegion(){
  await load();const p=q(),key=p.country,region=p.region,c=DATA.countries[key];chrome(key);
  $("#region-title").textContent=region;$("#region-breadcrumb").textContent=`${c.name} · ${c.adminLabel}`;
  const arr=DATA.regionalAgencies[`${key}|${region}`]||[];
  $("#agency-count").textContent=arr.length;$("#region-agencies").innerHTML=arr.map(a=>agencyCard(key,region,a)).join("");
  $("#agency-search").addEventListener("input",e=>{const s=e.target.value.toLowerCase();document.querySelectorAll(".agency-card").forEach(x=>x.style.display=x.textContent.toLowerCase().includes(s)?"":"none")});
}
async function renderAgency(){
  await load();const p=q(),key=p.country,region=p.region,name=p.agency,c=DATA.countries[key];chrome(key);
  const list=region==="Nationwide"?c.nationalAgencies.map(a=>({name:a[0],category:a[1],summary:a[2]})):(DATA.regionalAgencies[`${key}|${region}`]||[]);
  const a=list.find(x=>x.name===name)||{name,category:"Public Safety",summary:"Foundation intelligence record."};
  $("#agency-title").textContent=a.name;$("#agency-summary").textContent=a.summary;$("#agency-remit").textContent=region;$("#agency-category").textContent=a.category;
  $("#agency-breadcrumb").textContent=`${c.name} · ${region} · Agency profile`;
  const fields=["Executive overview","Jurisdiction and responsibilities","Organisation and command structure","RPAS programme","Known aircraft and payloads","DFR capability","BVLOS status and approvals","Docks and remote operations","Software and integrations","Suppliers and partners","Procurement and tenders","Budgets and funding","Recent news and announcements","Key contacts","Official sources","Last reviewed"];
  $("#profile-sections").innerHTML=fields.map(f=>`<div class="profile-section"><h3>${f}</h3><p>No publicly confirmed information has yet been entered for this field. Add attributable evidence and a review date.</p></div>`).join("");
  $("#agency-report-link").href=`report-generator.html?country=${key}&region=${encodeURIComponent(region)}&agency=${encodeURIComponent(name)}`;
}
function updateCard(x){return `<article class="update"><div><div class="type">${x.type||"Drone News"}</div><time>${x.date||"Pending"}</time></div><div><h3>${x.title}</h3><p>${x.summary||""}</p></div>${x.url?`<a href="${x.url}" target="_blank">Source ↗</a>`:""}</article>`}
function renderCountryUpdates(key,el){const arr=(UPDATES.items||[]).filter(x=>x.country===key).slice(0,8);el.innerHTML=arr.length?arr.map(updateCard).join(""):`<div class="notice">No ingested updates yet. Enable the included GitHub Actions workflow to populate regulation, drone, budget and public-safety news automatically.</div>`}
async function renderUpdates(){
  await loadAll();chrome();const sel=$("#updates-country");sel.innerHTML=`<option value="">All countries</option>`+Object.entries(DATA.countries).map(([k,c])=>`<option value="${k}">${c.name}</option>`).join("");
  const preset=q().country||"";sel.value=preset;
  function draw(){let arr=UPDATES.items||[],c=sel.value,t=$("#updates-type").value,s=$("#updates-search").value.toLowerCase();arr=arr.filter(x=>(!c||x.country===c)&&(!t||x.type===t)&&(!s||JSON.stringify(x).toLowerCase().includes(s)));$("#updates-list").innerHTML=arr.length?arr.map(updateCard).join(""):`<div class="notice">No matching updates. The repository includes an automated ingestion workflow and country-specific search configuration.</div>`}
  [sel,$("#updates-type"),$("#updates-search")].forEach(e=>e.addEventListener("input",draw));draw();
}
async function renderReportGenerator(){
  await load();chrome();const p=q(),cs=$("#report-country"),rs=$("#report-region"),as=$("#report-agency");
  cs.innerHTML=Object.entries(DATA.countries).map(([k,c])=>`<option value="${k}">${c.name}</option>`).join("");if(p.country)cs.value=p.country;
  function regions(){const c=DATA.countries[cs.value];rs.innerHTML=`<option value="Nationwide">Nationwide</option>`+c.regions.map(r=>`<option>${r.name}</option>`).join("");if(p.region)rs.value=p.region;agencies()}
  function agencies(){const c=DATA.countries[cs.value],r=rs.value;const arr=r==="Nationwide"?c.nationalAgencies.map(a=>({name:a[0]})):(DATA.regionalAgencies[`${cs.value}|${r}`]||[]);as.innerHTML=`<option value="">All agencies</option>`+arr.map(a=>`<option>${a.name}</option>`).join("");if(p.agency)as.value=p.agency}
  cs.addEventListener("change",regions);rs.addEventListener("change",agencies);regions();
  $("#generate-report").onclick=()=>{const c=DATA.countries[cs.value],r=rs.value,a=as.value,type=$("#report-type").value;const out=$("#report-output");out.style.display="block";out.innerHTML=`<div class="eyebrow">DroneSense Intelligence Hub</div><h1>${type}</h1><div class="report-meta"><b>Market:</b> ${c.name} &nbsp; <b>Jurisdiction:</b> ${r} &nbsp; <b>Agency:</b> ${a||"All"} &nbsp; <b>Generated:</b> ${new Date().toLocaleDateString()}</div><h2>Executive overview</h2><p>This briefing draws from the structured intelligence records in the platform. Fields without attributable evidence are clearly identified.</p><h2>Public-safety landscape</h2><p>${r==="Nationwide"?"National agencies and cross-jurisdiction responsibilities.":"Principal police, fire, emergency-management, medical and search-and-rescue agencies for "+r+"."}</p><h2>RPAS, BVLOS and DFR</h2><p>Insert verified programme, approval, aircraft, dock, software and operating-model intelligence.</p><h2>Regulatory and market considerations</h2><p>Review current country regulation, procurement, budget, political and technology-watch records before operational reliance.</p><p><button onclick="window.print()">Print / Save as PDF</button></p>`;out.scrollIntoView({behavior:"smooth"})}
}
async function renderCompetitors(){
  await loadAll();chrome();const sel=$("#competitor-country");sel.innerHTML=`<option value="">All markets</option>`+Object.entries(DATA.countries).map(([k,c])=>`<option value="${k}">${c.name}</option>`).join("");sel.value=q().country||"";
  function draw(){const c=sel.value,s=$("#competitor-search").value.toLowerCase();const arr=COMPETITORS.filter(x=>(!c||x.markets.includes(c))&&(!s||JSON.stringify(x).toLowerCase().includes(s)));$("#competitor-grid").innerHTML=arr.map(x=>`<div class="agency-card"><div class="category">${x.category}</div><h3>${x.name}</h3><p>${x.focus}</p><span>Markets: ${x.markets.map(k=>DATA.countries[k].name).join(", ")}</span></div>`).join("")}
  [sel,$("#competitor-search")].forEach(e=>e.addEventListener("input",draw));draw();
}
async function renderTechnology(){
  await loadAll();chrome();const sel=$("#technology-country");sel.innerHTML=Object.entries(DATA.countries).map(([k,c])=>`<option value="${k}">${c.name}</option>`).join("");sel.value=q().country||"australia";
  $("#technology-grid").innerHTML=TECHNOLOGY.map(x=>`<div class="agency-card"><div class="category">${x.status}</div><h3>${x.topic}</h3><p>${x.signals.join(" · ")}</p><span>Maintain country-specific evidence and maturity assessment</span></div>`).join("");
}
async function renderPolitics(){
  await loadAll();chrome();$("#politics-grid").innerHTML=Object.entries(POLITICS.countries).map(([k,x])=>`<div class="card"><h2>${DATA.countries[k].flag} ${x.country}</h2><p><b>Next election:</b> ${x.nextElection}</p><p><b>Status:</b> ${x.status}</p><span>${x.fields.join(" · ")}</span></div>`).join("");
}
async function renderRegulations(){
  await load();chrome();$("#reg-grid").innerHTML=Object.entries(DATA.countries).map(([k,c])=>`<a class="card" href="updates.html?country=${k}"><h2>${c.flag} ${c.name}</h2><p>Regulatory framework, pilot and operator requirements, aircraft declarations/airworthiness, BVLOS, DFR and approvals.</p><span>Open live regulatory updates →</span></a>`).join("");
}
return {renderHome,renderCountry,renderRegion,renderAgency,renderUpdates,renderReportGenerator,renderCompetitors,renderTechnology,renderPolitics,renderRegulations};
})();
