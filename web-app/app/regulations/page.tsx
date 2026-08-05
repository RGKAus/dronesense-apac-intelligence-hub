import Link from "next/link";

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
    <main style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <Link href="/">← Back to dashboard</Link>

      <div style={{ marginTop: "24px", marginBottom: "32px" }}>
        <p
          style={{
            color: "#2563eb",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "1px",
          }}
        >
          REGULATORY COMPARISON
        </p>

        <h1 style={{ color: "#0b2e59", fontSize: "36px", marginBottom: "10px" }}>
          Regulations
        </h1>

        <p style={{ color: "#667085", maxWidth: "750px", lineHeight: 1.6 }}>
          Compare RPAS and UAS regulatory frameworks, terminology and approval
          pathways across key jurisdictions.
        </p>
      </div>

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
              <tr key={item.country} style={{ borderBottom: "1px solid #d9e0e7" }}>
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
    </main>
  );
}