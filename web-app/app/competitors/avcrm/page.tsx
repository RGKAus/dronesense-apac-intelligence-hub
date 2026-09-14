import AppShell from "../../../components/AppShell";
import IntelligenceProfile from "../../../components/IntelligenceProfile";
import { getCompetitorBySlug } from "../../../lib/competitors";

function formatDate(d: string | null) {
  if (!d) return "Research required";
  try {
    return new Date(d).toLocaleDateString();
  } catch {
    return String(d);
  }
}

export default async function AvcrmPage() {
  let data: any = null;
  try {
    data = await getCompetitorBySlug("avcrm");
  } catch (err) {
    // Log server-side if needed; fall back to placeholder
    data = null;
  }

  if (!data || !data.competitor) {
    // fallback: keep existing placeholder content
    const headerFields = [
      { label: "Category", value: "Commercial RPAS Vendor" },
      { label: "Headquarters", value: "Research required" },
      { label: "Markets", value: "Research required" },
      { label: "Threat level", value: "Research required" },
      { label: "Australian presence", value: "Research required" },
      { label: "Last verified", value: "Research required" },
      { label: "Known public safety customers", value: "Research required" },
      { label: "Known government contracts", value: "Research required" },
      { label: "Known integrations", value: "Research required" },
    ];

    return (
      <AppShell activePath="/competitors" eyebrow="COMPETITOR PROFILE" title="AVCRM" description="Research required">
        <IntelligenceProfile headerFields={headerFields} title="AVCRM" eyebrow="COMPETITOR" description="Profile and intelligence (placeholder)">
          <div className="panel">
            <div style={{ padding: 14 }}>
              <h2>Intelligence summary</h2>
              <p>Research required</p>
            </div>
          </div>

          <div className="panel">
            <div style={{ padding: 14 }}>
              <h2>Company overview</h2>
              <p>Research required</p>
            </div>
          </div>

          <div className="panel">
            <div style={{ padding: 14 }}>
              <h2>Products and capabilities</h2>
              <p>Research required</p>
            </div>
          </div>

          <div className="panel">
            <div style={{ padding: 14 }}>
              <h2>Pricing and commercial model</h2>
              <p>Research required</p>
            </div>
          </div>

          <div className="panel">
            <div style={{ padding: 14 }}>
              <h2>Public safety customers</h2>
              <p>Research required</p>
            </div>
          </div>

          <div className="panel">
            <div style={{ padding: 14 }}>
              <h2>Government contracts and procurement history</h2>
              <p>Research required</p>
            </div>
          </div>

          <div className="panel">
            <div style={{ padding: 14 }}>
              <h2>Technology and integrations</h2>
              <p>Research required</p>
            </div>
          </div>

          <div className="panel">
            <div style={{ padding: 14 }}>
              <h2>Strengths</h2>
              <p>Research required</p>
            </div>
          </div>

          <div className="panel">
            <div style={{ padding: 14 }}>
              <h2>Weaknesses</h2>
              <p>Research required</p>
            </div>
          </div>

          <div className="panel">
            <div style={{ padding: 14 }}>
              <h2>DroneSense comparison</h2>
              <p>Research required</p>
            </div>
          </div>

          <div className="panel">
            <div style={{ padding: 14 }}>
              <h2>Competitive positioning</h2>
              <p>Research required</p>
            </div>
          </div>

          <div className="panel">
            <div style={{ padding: 14 }}>
              <h2>Latest competitor intelligence</h2>
              <p>Research required</p>
            </div>
          </div>

          <div className="panel">
            <div style={{ padding: 14 }}>
              <h2>Evidence and sources</h2>
              <p>Research required</p>
            </div>
          </div>
        </IntelligenceProfile>
      </AppShell>
    );
  }

  // Data-driven rendering
  const comp = data.competitor;
  const headerFields = [
    { label: 'Headquarters', value: comp.headquarters || 'Research required' },
    { label: 'Markets', value: (comp.markets && JSON.stringify(comp.markets)) || 'Research required' },
    { label: 'Primary offering', value: comp.primary_offering || 'Research required' },
    { label: 'Deployment model', value: comp.deployment_model || 'Research required' },
    { label: 'Threat / relevance', value: comp.threat_level || 'Research required' },
    { label: 'Confidence', value: comp.confidence || 'unverified' },
    { label: 'Last verified', value: formatDate(comp.last_verified) },
  ];

  const capabilities = data.capabilities || [];
  const claims = data.claims || [];
  const pricing = data.pricing || [];
  const battle = data.sales_battlecard || null;

  return (
    <AppShell activePath="/competitors" eyebrow="COMPETITOR PROFILE" title={comp.name} description={comp.overview || 'Research required'}>
      <IntelligenceProfile headerFields={headerFields} title={comp.name} eyebrow="COMPETITOR">
        <div className="panel">
          <div style={{ padding: 14 }}>
            <h2>Top summary</h2>
            <p style={{ color: '#667085' }}>{comp.overview || 'Research required'}</p>
          </div>
        </div>

        <div className="panel">
          <div style={{ padding: 14 }}>
            <h2>Market presence</h2>
            <div style={{ marginTop: 8 }}>
              {claims.filter((c:any)=>['customer','contract','market'].includes(c.claim_type)).length === 0 && <p>Research required</p>}
              <ul>
                {claims.filter((c:any)=>c.claim_type === 'customer').map((c:any)=> (
                  <li key={c.id}>{c.subject || 'Research required'} {c.sources && c.sources.length>0 && (<span style={{ color: '#667085' }}> — source(s) available</span>)}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="panel">
          <div style={{ padding: 14 }}>
            <h2>Capability comparison</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '8px 6px' }}>Capability</th>
                  <th style={{ textAlign: 'left', padding: '8px 6px' }}>AVCRM</th>
                  <th style={{ textAlign: 'left', padding: '8px 6px' }}>DroneSense</th>
                  <th style={{ textAlign: 'left', padding: '8px 6px' }}>Assessment</th>
                </tr>
              </thead>
              <tbody>
                {[
                  'operations_management','live_streaming','evidence_data_management','hardware_integrations','dfr_bvlos','mobile_operations','mapping','api_integrations','cloud_onprem'
                ].map((key)=>{
                  const row = capabilities.find((r:any)=>r.capability_key===key);
                  return (
                    <tr key={key}>
                      <td style={{ padding: '8px 6px', borderTop: '1px solid var(--border)' }}>{key.replace(/_/g,' ')}</td>
                      <td style={{ padding: '8px 6px', borderTop: '1px solid var(--border)' }}>{row ? (row.description || 'Research required') : 'Research required'}</td>
                      <td style={{ padding: '8px 6px', borderTop: '1px solid var(--border)' }}>Research required</td>
                      <td style={{ padding: '8px 6px', borderTop: '1px solid var(--border)' }}>Research required</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="panel">
          <div style={{ padding: 14 }}>
            <h2>Where they are strong</h2>
            <p>{battle?.best_positioning || 'Research required'}</p>
          </div>
        </div>

        <div className="panel">
          <div style={{ padding: 14 }}>
            <h2>Where DroneSense has an advantage</h2>
            <p>{battle?.displacement_opportunities ? JSON.stringify(battle.displacement_opportunities) : 'Research required'}</p>
          </div>
        </div>

        <div className="panel">
          <div style={{ padding: 14 }}>
            <h2>Sales battle card</h2>
            <h4>Best positioning</h4>
            <p>{battle?.best_positioning || 'Research required'}</p>
            <h4 style={{ marginTop: 8 }}>Discovery questions</h4>
            <p>{battle?.discovery_questions ? JSON.stringify(battle.discovery_questions) : 'Research required'}</p>
            <h4 style={{ marginTop: 8 }}>Traps / risks</h4>
            <p>{battle?.traps_and_risks ? JSON.stringify(battle.traps_and_risks) : 'Research required'}</p>
            <h4 style={{ marginTop: 8 }}>Objection handling</h4>
            <p>{battle?.objection_handling ? JSON.stringify(battle.objection_handling) : 'Research required'}</p>
          </div>
        </div>

        <div className="panel">
          <div style={{ padding: 14 }}>
            <h2>Pricing & contract intelligence</h2>
            {pricing.length === 0 && <p>Research required</p>}
            {pricing.map((p:any)=> (
              <div key={p.id} style={{ marginBottom: 10 }}>
                <div style={{ color: '#667085' }}>{p.pricing_text || 'Research required'}</div>
                <div style={{ color: '#667085', fontSize: 12, marginTop: 6 }}>Confidence: {p.confidence}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div style={{ padding: 14 }}>
            <h2>Customers & evidence</h2>
            {claims.length === 0 && <p>Research required</p>}
            <ul>
              {claims.map((c:any)=> (
                <li key={c.id} style={{ marginBottom: 8 }}>
                  <div><strong>{c.claim_type}</strong>: {c.subject || 'Research required'}</div>
                  <div style={{ color: '#667085', fontSize: 12 }}>Confidence: {c.confidence}</div>
                  <div style={{ marginTop: 6 }}>
                    {c.sources && c.sources.length>0 ? (
                      <ul className="sources-list">
                        {c.sources.map((s:any)=> (
                          <li key={s.id}><a href={s.url} target="_blank" rel="noreferrer">{s.title || s.url}</a> — {s.published_date || ''}</li>
                        ))}
                      </ul>
                    ) : <div style={{ color: '#667085' }}>No sources attached</div>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </IntelligenceProfile>
    </AppShell>
  );
}
