(() => {
  const { jsPDF } = window.jspdf || {};
  const el = id => document.getElementById(id);
  const today = () => new Intl.DateTimeFormat('en-AU',{day:'2-digit',month:'long',year:'numeric'}).format(new Date());

  const australiaRequirements = [
    ['National regulator','Civil Aviation Safety Authority (CASA) administers civil RPAS operations under the Civil Aviation Safety Regulations 1998, principally Part 101, supported by manuals of standards, advisory circulars and operational approvals.'],
    ['Operator authorisation','Commercial and complex operations commonly require a remotely piloted aircraft operator\'s certificate (ReOC). The ReOC holder must maintain approved procedures, nominated personnel, records and operational control.'],
    ['Remote pilot qualification','Operations under a ReOC generally require an appropriately rated remote pilot licence (RePL). Aircraft type, weight, operating environment and privileges determine the required competence and authorisation.'],
    ['Aeronautical radio','An aeronautical radio operator certificate (AROC), or an accepted equivalent, is required when the remote pilot must transmit on aviation radio frequencies.'],
    ['BVLOS competence','BVLOS operations require CASA-accepted pilot competence and operator procedures. Depending on the operation, this may involve a BVLOS examination or rating pathway, relevant theoretical knowledge and operator-specific training/checking.'],
    ['Operational approval for BVLOS','BVLOS is not a general ReOC privilege. The operator must obtain CASA approval for the proposed operation, supported by an acceptable safety case and operating limitations.'],
    ['AusSORA','Australia uses an Australian adaptation of the Specific Operations Risk Assessment (AusSORA) for many complex operations. The assessment addresses ground risk, air risk, containment, mitigations, operational safety objectives and evidence.'],
    ['FIMS','The Flight Information Management System (FIMS) is Australia\'s national digital interface for sharing relevant airspace and flight information with approved UAS service providers. It is a distinctive part of Australia\'s emerging UTM ecosystem.'],
    ['Airspace access','Operations in controlled airspace, near controlled aerodromes, in restricted areas or near emergency operations can require additional permissions and coordination with Airservices Australia, aerodrome operators or controlling authorities.'],
    ['DFR operating environment','Drone as First Responder frequently combines BVLOS, urban operations, operations near people, dynamic launch decisions, controlled airspace and remote operation. Each element must be addressed in the operator approval and safety case.'],
    ['Remote operations and docking','Docked or remotely supervised aircraft do not remove remote-pilot or operator obligations. Command-and-control resilience, lost-link behaviour, weather limitations, site security, maintenance and emergency procedures must be demonstrated.'],
    ['Why deployment can be slow','Australian DFR programs can be slowed by operation-specific BVLOS approval, pilot competency requirements, evidence for detect-and-avoid or air-risk mitigation, stakeholder coordination, site-by-site hazards and the need to prove repeatable operational control.']
  ];

  const sectorUses = {
    'Police':['Missing-person and offender searches','Situational awareness at major incidents','Traffic collision and scene mapping','Public-order and event overwatch','Tactical and high-risk incident support','Disaster reconnaissance'],
    'Fire & Rescue':['Bushfire and structure-fire intelligence','Thermal hotspot identification','Fire perimeter and progression mapping','Hazardous-material scene assessment','Post-incident damage assessment','Crew safety and overwatch'],
    'Emergency Management':['Flood and storm impact assessment','Rapid damage assessment','Evacuation route intelligence','Incident mapping and common operating picture','Remote community access assessment','Recovery documentation'],
    'Search & Rescue':['Coastal and inland search','Thermal and visual missing-person search','Marine search support','Cliff, bush and remote-area reconnaissance','Delivery of flotation or emergency payloads where authorised','Search-area documentation'],
    'Critical Infrastructure':['Powerline and substation inspection','Water, dam and pipeline inspection','Rail, road and bridge inspection','Port and maritime security','Mine and industrial-site surveys','Telecommunications asset inspection'],
    'Government & Regulators':['Compliance and environmental monitoring','Mapping and survey','Emergency coordination','Airspace and aviation safety support','Border and maritime surveillance support','Scientific and geospatial data collection']
  };

  const canadaDfrDecision = [
    ['Lower-risk BVLOS in uncontrolled airspace, <=400 ft AGL, >5 NM from listed aerodromes and >=1 km from a populated area','No, when all Level 1 Complex conditions are met'],
    ['Small RPA over a sparsely populated area or <1 km from a populated area','No, with Level 1 Complex, RPOC and the applicable pre-validated declaration'],
    ['Urban or populated-area BVLOS outside the Level 1 Complex envelope','Normally yes — high-complexity SFOC-RPAS'],
    ['BVLOS in controlled airspace or an aerodrome environment','Yes — high-complexity SFOC-RPAS'],
    ['More than one RPA operated BVLOS at the same time','Yes — medium-complexity SFOC-RPAS'],
    ['Above 400 ft AGL','Yes — medium-complexity SFOC-RPAS']
  ];
  const canadaAgencyNeeds = [
    ['Operator authority','RPOC for Level 1 Complex operations, or an SFOC-RPAS outside that category'],
    ['Pilot','Pilot Certificate — Level 1 Complex Operations for lower-risk BVLOS'],
    ['Governance','Accountable executive, maintenance responsibility, training program, SOPs and safety-risk management'],
    ['Equipment','Registered RPA and supporting systems with the applicable safety-assurance declarations'],
    ['Operating environment','Airspace, aerodrome distance, altitude, population density, weather and site constraints must fit the chosen category'],
    ['Higher-complexity case','SFOC application supported by required documentation and a SORA/operational risk assessment']
  ];

  const sourceNotes = [
    'CASA - Part 101 remotely piloted aircraft and model aircraft framework',
    'CASA - ReOC, RePL, AROC and BVLOS guidance',
    'CASA - AC 101-06 and Australian SORA material',
    'Airservices Australia - UAS and Flight Information Management System material',
    'Agency annual reports, operational publications and official public statements represented in the platform intelligence library'
  ];

  function header(doc, title, pageNo) {
    doc.setFillColor(3,16,25); doc.rect(0,0,210,17,'F');
    doc.setTextColor(33,225,223); doc.setFont('helvetica','bold'); doc.setFontSize(8); doc.text('VERSATERM',14,7);
    doc.setTextColor(255,255,255); doc.setFontSize(13); doc.text('DroneSense',14,13);
    doc.setFontSize(7); doc.setTextColor(160,180,190); doc.text(title,196,10,{align:'right'});
    doc.setDrawColor(30,60,72); doc.line(14,282,196,282);
    doc.setFontSize(7); doc.setTextColor(120,145,155); doc.text(`Generated ${today()}`,14,288); doc.text(String(pageNo),196,288,{align:'right'});
  }

  function cover(doc, title, subtitle) {
    doc.setFillColor(3,16,25); doc.rect(0,0,210,297,'F');
    doc.setFillColor(8,37,48); doc.circle(174,45,52,'F');
    doc.setTextColor(33,225,223); doc.setFont('helvetica','bold'); doc.setFontSize(11); doc.text('VERSATERM',18,28);
    doc.setTextColor(255,255,255); doc.setFontSize(24); doc.text('DroneSense',18,40);
    doc.setDrawColor(33,225,223); doc.setLineWidth(1.2); doc.line(18,58,72,58);
    doc.setFontSize(27); doc.text(doc.splitTextToSize(title,165),18,94);
    doc.setFont('helvetica','normal'); doc.setFontSize(12); doc.setTextColor(175,196,204); doc.text(doc.splitTextToSize(subtitle,165),18,130);
    doc.setFontSize(9); doc.setTextColor(120,150,160); doc.text(`Intelligence snapshot | ${today()}`,18,264);
    doc.setTextColor(255,116,75); doc.text('INTERNAL WORKING DOCUMENT - VERIFY BEFORE EXTERNAL RELIANCE',18,276);
  }

  function addRequirementsReport(doc, options) {
    cover(doc,'Australian RPAS Regulatory Requirements','Requirements and operating considerations unique or especially significant to Australian public-safety and Drone as First Responder programs.');
    doc.addPage(); header(doc,'Australian RPAS Regulatory Requirements',2);
    doc.setTextColor(20,35,43); doc.setFont('helvetica','bold'); doc.setFontSize(18); doc.text('Executive summary',14,31);
    doc.setFont('helvetica','normal'); doc.setFontSize(10); doc.setTextColor(55,70,78);
    const intro='Australia provides a mature but approval-led framework for complex RPAS operations. For public-safety DFR, the principal challenge is not aircraft ownership; it is demonstrating an integrated operating system covering operator certification, pilot competence, BVLOS risk, airspace coordination, command-and-control resilience, emergency procedures and repeatable operational governance.';
    doc.text(doc.splitTextToSize(intro,182),14,41);
    doc.autoTable({startY:64,head:[['Requirement','Australian position and significance']],body:australiaRequirements,theme:'grid',styles:{fontSize:8.2,cellPadding:3,textColor:[45,61,69],lineColor:[205,216,221]},headStyles:{fillColor:[8,37,48],textColor:[105,243,239]},columnStyles:{0:{cellWidth:46,fontStyle:'bold'},1:{cellWidth:136}},margin:{left:14,right:14,top:23,bottom:22},didDrawPage:data=>{if(data.pageNumber>1)header(doc,'Australian RPAS Regulatory Requirements',doc.internal.getNumberOfPages())}});
    let y=doc.lastAutoTable.finalY+12;
    if(y>235){doc.addPage();header(doc,'Australian RPAS Regulatory Requirements',doc.internal.getNumberOfPages());y=30;}
    doc.setFont('helvetica','bold');doc.setFontSize(14);doc.setTextColor(20,35,43);doc.text('Practical DFR approval sequence',14,y);
    const steps=[['1','Define concept of operations and launch model'],['2','Confirm ReOC scope, nominated personnel and remote-pilot competence'],['3','Characterise ground and air risk using AusSORA or the method accepted by CASA'],['4','Select containment, air-risk, communications and emergency mitigations'],['5','Document dock, aircraft, C2, weather, maintenance and human-factors controls'],['6','Coordinate airspace, aerodrome, landowner, emergency-services and local stakeholders'],['7','Submit the operational application and supporting evidence to CASA'],['8','Validate, train, exercise and operate within the granted limitations']];
    doc.autoTable({startY:y+5,head:[['Stage','Action']],body:steps,theme:'plain',styles:{fontSize:8.5,cellPadding:2.6,textColor:[45,61,69]},columnStyles:{0:{cellWidth:16,fontStyle:'bold',textColor:[0,130,130]},1:{cellWidth:166}},margin:{left:14,right:14}});
    if(options.includeSources){doc.addPage();header(doc,'Australian RPAS Regulatory Requirements',doc.internal.getNumberOfPages());doc.setFont('helvetica','bold');doc.setFontSize(18);doc.setTextColor(20,35,43);doc.text('Source framework',14,31);doc.setFont('helvetica','normal');doc.setFontSize(10);sourceNotes.forEach((s,i)=>doc.text(`${i+1}. ${s}`,18,48+i*12));}
  }

  function addCanadaDfrReport(doc, options) {
    doc.setFillColor(3,16,25); doc.rect(0,0,210,297,'F');
    doc.setTextColor(33,225,223); doc.setFont('helvetica','bold'); doc.setFontSize(9); doc.text('VERSATERM',14,14);
    doc.setTextColor(255,255,255); doc.setFontSize(14); doc.text('DroneSense',14,22);
    doc.setFontSize(22); doc.text('Canada DFR & BVLOS',14,42);
    doc.setFontSize(11); doc.setTextColor(175,196,204); doc.text('Public-safety regulatory one-pager',14,51);
    doc.setFillColor(8,37,48); doc.roundedRect(14,59,182,32,3,3,'F');
    doc.setTextColor(105,243,239); doc.setFontSize(9); doc.text('EXECUTIVE ANSWER',20,69);
    doc.setTextColor(235,244,247); doc.setFont('helvetica','normal'); doc.setFontSize(8.3);
    const summary='Canada permits defined lower-risk BVLOS operations without an SFOC-RPAS. The agency must operate under an RPAS Operator Certificate (RPOC), use appropriately declared equipment and assign Level 1 Complex pilots. Urban, controlled-airspace, aerodrome-environment or other higher-complexity DFR operations generally require an SFOC-RPAS.';
    doc.text(doc.splitTextToSize(summary,170),20,77);
    doc.setTextColor(20,35,43); doc.setFont('helvetica','bold'); doc.setFontSize(12); doc.text('Does the agency need an SFOC?',14,104);
    doc.autoTable({startY:109,head:[['Scenario','Answer']],body:canadaDfrDecision,theme:'grid',styles:{fontSize:6.8,cellPadding:2.1,textColor:[45,61,69],lineColor:[205,216,221]},headStyles:{fillColor:[8,37,48],textColor:[105,243,239]},columnStyles:{0:{cellWidth:122},1:{cellWidth:60,fontStyle:'bold'}},margin:{left:14,right:14}});
    let y=doc.lastAutoTable.finalY+7;
    doc.setFont('helvetica','bold'); doc.setFontSize(12); doc.setTextColor(20,35,43); doc.text('What public safety needs',14,y);
    doc.autoTable({startY:y+4,head:[['Requirement','Position']],body:canadaAgencyNeeds,theme:'grid',styles:{fontSize:6.8,cellPadding:2.0,textColor:[45,61,69],lineColor:[205,216,221]},headStyles:{fillColor:[8,37,48],textColor:[105,243,239]},columnStyles:{0:{cellWidth:42,fontStyle:'bold'},1:{cellWidth:140}},margin:{left:14,right:14}});
    y=doc.lastAutoTable.finalY+6;
    doc.setFont('helvetica','bold'); doc.setFontSize(9); doc.setTextColor(190,75,45); doc.text('DFR reality check',14,y);
    doc.setFont('helvetica','normal'); doc.setFontSize(7.3); doc.setTextColor(55,70,78);
    doc.text(doc.splitTextToSize('A station or dock can support the operating model, but it does not create an exemption. Many city-wide DFR concepts fall outside lower-risk BVLOS because of population exposure, controlled airspace, aerodrome proximity or simultaneous aircraft. Emergency-response organizations remain subject to the operating-authority rules, although government emergency-response applicants are exempt from SFOC fees.',182),14,y+5);
    doc.setDrawColor(30,60,72); doc.line(14,279,196,279); doc.setFontSize(6.5); doc.setTextColor(90,112,120);
    doc.text('Primary sources: Transport Canada Level 1 Complex, RPOC and SFOC guidance; Canadian Aviation Regulations Part IX.',14,284);
    doc.text(`Reviewed 22 July 2026 | Generated ${today()} | Verify before operational reliance`,14,289);
  }

  async function addAgencyReport(doc, options) {
    cover(doc,'Australian Public Safety Agencies & UAS Uses','National directory of public-safety and critical-operations organisations, grouped by sector and jurisdiction, with current and established UAS mission types.');
    let agencies=[];
    try { agencies=await fetch('assets/agency-directory-v3.json').then(r=>r.json()); } catch(e) { agencies=[]; }
    const selectedSectors=[...document.querySelectorAll('[name="sectors"]:checked')].map(x=>x.value);
    if(selectedSectors.length) agencies=agencies.filter(a=>selectedSectors.includes(a.sector));
    const order=['Police','Fire & Rescue','Emergency Management','Search & Rescue','Critical Infrastructure','Government & Regulators'];
    let pageNo=1;
    for(const sector of order){
      const rows=agencies.filter(a=>a.sector===sector).sort((a,b)=>a.jurisdiction.localeCompare(b.jurisdiction)||a.name.localeCompare(b.name));
      if(!rows.length) continue;
      doc.addPage(); pageNo++; header(doc,'Australian Public Safety Agencies & UAS Uses',pageNo);
      doc.setFont('helvetica','bold');doc.setFontSize(18);doc.setTextColor(20,35,43);doc.text(sector,14,31);
      doc.setFont('helvetica','normal');doc.setFontSize(9);doc.setTextColor(65,80,88);doc.text(doc.splitTextToSize('Representative current and established UAS mission types for this sector:',182),14,41);
      const uses=(sectorUses[sector]||[]).map(x=>['•',x]);
      doc.autoTable({startY:48,body:uses,theme:'plain',styles:{fontSize:8.3,cellPadding:1.7,textColor:[45,61,69]},columnStyles:{0:{cellWidth:5,textColor:[0,150,150]},1:{cellWidth:177}},margin:{left:14,right:14}});
      doc.autoTable({startY:doc.lastAutoTable.finalY+7,head:[['Agency','Abbreviation','Jurisdiction','Operational grouping']],body:rows.map(a=>[a.name,a.abbr||'',a.jurisdiction,a.group||'']),theme:'grid',styles:{fontSize:7.5,cellPadding:2.4,textColor:[45,61,69],lineColor:[210,220,224]},headStyles:{fillColor:[8,37,48],textColor:[105,243,239]},columnStyles:{0:{cellWidth:62},1:{cellWidth:30},2:{cellWidth:38},3:{cellWidth:52}},margin:{left:14,right:14,top:23,bottom:22},didDrawPage:data=>{if(data.pageNumber>1)header(doc,'Australian Public Safety Agencies & UAS Uses',doc.internal.getNumberOfPages())}});
    }
    if(options.includeSources){doc.addPage();header(doc,'Australian Public Safety Agencies & UAS Uses',doc.internal.getNumberOfPages());doc.setFont('helvetica','bold');doc.setFontSize(18);doc.setTextColor(20,35,43);doc.text('Method and source note',14,31);doc.setFont('helvetica','normal');doc.setFontSize(10);doc.setTextColor(55,70,78);const note='The agency directory is generated from the platform data available at the time of report creation. UAS uses are sector-level mission categories drawn from publicly documented Australian operations and established public-safety practice. Agency-specific fleet, maturity and operating-authority claims should be checked against the linked source record before external publication.';doc.text(doc.splitTextToSize(note,182),14,45);}
  }

  async function generate() {
    if(!jsPDF){alert('The PDF library did not load. Check your internet connection and reload the page.');return;}
    const button=el('generate-report'); button.disabled=true; button.textContent='Generating PDF…';
    try{
      const doc=new jsPDF({unit:'mm',format:'a4',orientation:'portrait'});
      const template=document.querySelector('[name="report-template"]:checked')?.value || 'requirements';
      const options={includeSources:el('include-sources')?.checked};
      if(template==='requirements') addRequirementsReport(doc,options); else if(template==='canada-dfr') addCanadaDfrReport(doc,options); else await addAgencyReport(doc,options);
      const filename=template==='requirements'?'Australian-RPAS-Regulatory-Requirements.pdf':template==='canada-dfr'?'Canada-DFR-BVLOS-One-Pager.pdf':'Australian-Public-Safety-Agencies-and-UAS-Uses.pdf';
      doc.save(filename);
      el('report-status').textContent=`Created ${filename}`;
    }catch(err){console.error(err);alert('The report could not be created. Please reload and try again.');}
    finally{button.disabled=false;button.textContent='Generate PDF';}
  }

  document.addEventListener('DOMContentLoaded',()=>{
    const requested=new URLSearchParams(location.search).get('template');
    if(requested){const radio=document.querySelector(`[name="report-template"][value="${requested}"]`);if(radio){radio.checked=true;}}
    el('generate-report')?.addEventListener('click',generate);
    document.querySelectorAll('[name="report-template"]').forEach(r=>r.addEventListener('change',()=>{
      el('agency-options').hidden=r.value!=='agencies' || !r.checked;
    }));
  });
})();
