
const NAV = `
<div class="nav">
  <div class="nav-label">Global</div>
  <a href="index.html">Global Home</a>
  <a href="country-australia.html">Australia</a>
  <a href="country-canada.html">Canada</a>
  <a href="region-european-union.html">European Union</a>
  <a href="country-united-kingdom.html">United Kingdom</a>
  <a href="country-south-africa.html">South Africa</a>
  <div class="nav-label">Australia</div>
  <a href="australia-states.html">States & Territories</a>
  <a href="australia-federal.html">Federal & National</a>
  <a href="critical-infrastructure-hub.html">Critical Infrastructure</a>
  <a href="agencies-hub.html">Agency Directory</a>
  <div class="nav-label">Intelligence</div>
  <a href="regulations-hub.html">Regulations</a>
  <a href="intelligence-hub.html">Intelligence Centre</a>
  <a href="reports-hub.html">Reports</a>
</div>`;
document.addEventListener("DOMContentLoaded",()=>{
  const top=document.querySelector("#v6-topbar");
  if(top) top.innerHTML=`<div class="brand">DroneSense Intelligence Hub<small>Global public safety & RPAS intelligence</small></div><div class="top-actions"><a href="index.html">Home</a><a href="agencies-hub.html">Agencies</a></div>`;
  const side=document.querySelector("#v6-sidebar"); if(side) side.innerHTML=NAV;
  const current=location.pathname.split("/").pop()||"index.html";
  document.querySelectorAll(".nav a").forEach(a=>{if(a.getAttribute("href")===current)a.classList.add("active")});
});
