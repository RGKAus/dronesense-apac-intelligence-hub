import AppShell from "../../../components/AppShell";
import IntelligenceProfile from "../../../components/IntelligenceProfile";

export default function SphereDronesPage() {
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
    <AppShell activePath="/competitors" eyebrow="COMPETITOR PROFILE" title="Sphere Drones" description="Research required">
      <IntelligenceProfile headerFields={headerFields} title="Sphere Drones" eyebrow="COMPETITOR" description="Profile and intelligence (placeholder)">
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
