import AppShell from "../../components/AppShell";

const jurisdictions = [
  {
    country: "United States",
    regulator: "Federal Aviation Administration",
    terminology: "UAS / sUAS",
    pathway: "Part 107, waivers and public aircraft operations",
  },
  {
    country: "Australia",
    regulator: "Civil Aviation Safety Authority",
    terminology: "RPA / RPAS",
    pathway: "Part 101, ReOC permissions and SORA-based approvals",
  },
  {
    country: "Canada",
    regulator: "Transport Canada",
    terminology: "RPAS",
    pathway: "Part IX, Level 1 Complex and SFOC pathways",
  },
  {
    country: "United Kingdom",
    regulator: "UK Civil Aviation Authority",
    terminology: "UAS",
    pathway: "Open, Specific and Certified categories",
  },
  {
    country: "European Union",
    regulator: "EASA and national aviation authorities",
    terminology: "UAS",
    pathway: "Open, Specific and Certified categories",
  },
  {
    country: "South Africa",
    regulator: "South African Civil Aviation Authority",
    terminology: "RPAS",
    pathway: "Part 101 operational approvals",
  },
];

export default function RegulationsPage() {
  return (
    <AppShell
      activePath="/regulations"
      eyebrow="REGULATORY COMPARISON"
      title="Regulations"
      description="Compare RPAS and UAS regulatory frameworks, terminology and approval pathways across key jurisdictions."
    >
      <div
        style={{
          overflowX: "auto",
          background: "#ffffff",
          border: "1px solid #d9e0e7",
          borderRadius: "12px",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#0b2e59", color: "#ffffff" }}>
            <tr>
              <th style={{ padding: "14px", textAlign: "left" }}>Country</th>
              <th style={{ padding: "14px", textAlign: "left" }}>Regulator</th>
              <th style={{ padding: "14px", textAlign: "left" }}>
                Common terminology
              </th>
              <th style={{ padding: "14px", textAlign: "left" }}>
                Operational pathway
              </th>
            </tr>
          </thead>

          <tbody>
            {jurisdictions.map((item) => (
              <tr
                key={item.country}
                style={{ borderBottom: "1px solid #d9e0e7" }}
              >
                <td style={{ padding: "14px", fontWeight: 700 }}>
                  {item.country}
                </td>
                <td style={{ padding: "14px", color: "#667085" }}>
                  {item.regulator}
                </td>
                <td style={{ padding: "14px", color: "#667085" }}>
                  {item.terminology}
                </td>
                <td style={{ padding: "14px", color: "#667085" }}>
                  {item.pathway}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}