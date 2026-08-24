import AppShell from "../../components/AppShell";
import HardwareCard from "../../components/HardwareCard";

const hardware = [
  {
    name: "Fotokite Sigma",
    manufacturer: "Fotokite",
    category: "Actively Tethered UAS",
    integration: "DroneSense",
    status: "Supported",
    maturity: "Direct Integration – Early Access",
    href: "/hardware/fotokite-sigma",
  },
];

export default function HardwarePage() {
  return (
    <AppShell
      activePath="/hardware"
      eyebrow="HARDWARE"
      title="Supported Hardware"
      description="Hardware, aircraft, sensors and technology integrations supported by the DroneSense platform."
    >
      <section className="country-grid">
        {hardware.map((h) => (
          <HardwareCard
            key={h.name}
            name={h.name}
            manufacturer={h.manufacturer}
            category={h.category}
            integration={h.integration}
            status={h.status}
            maturity={h.maturity}
            href={h.href}
          />
        ))}
      </section>
    </AppShell>
  );
}
