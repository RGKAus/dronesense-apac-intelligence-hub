import AppShell from "../../../components/AppShell";
import IntelligenceProfile from "../../../components/IntelligenceProfile";
import TechnologyRelationship from "../../../components/TechnologyRelationship";
import HardwareCard from "../../../components/HardwareCard";
import Link from "next/link";

export default function PstrGroupPage() {
  const headerFields = [
    { label: "Relationship status", value: "Engaged" },
    { label: "Organisation type", value: "Potential Partner / Training / Emergency Response / Technology Distribution" },
    { label: "Location", value: "Oxley, Queensland, Australia" },
    { label: "Publicly verified capabilities", value: "Nationally accredited training; CASA-approved drone training; emergency response; drone services; incident management; specialist flood rescue training; technology distribution" },
    { label: "Registered Training Organisation", value: "RTO #45395" },
    { label: "Technologies used", value: "Fotokite (distribution/support) and other public-safety technologies" },
    { label: "Fotokite relationship", value: "Australian distributor, wholesaler and authorised dealer" },
    { label: "Last verified", value: "20 August 2026" },
  ];

  return (
    <AppShell activePath="/partners" eyebrow="PARTNER PROFILE" title="PSTR Group" description="Public Safety Training & Response Group (placeholder)">
      <IntelligenceProfile headerFields={headerFields} title="PSTR Group" eyebrow="PARTNER" description="Engaged relationship">
        <div className="panel">
          <div style={{ padding: 14 }}>
            <h2>Relationship summary</h2>
            <p>Engaged</p>
          </div>
        </div>

        <div className="panel">
          <div style={{ padding: 14 }}>
            <h2>Company overview</h2>
            <p>Public Safety Training & Response Group is an Australian public-safety training and response organisation. It is a Registered Training Organisation (RTO #45395) and provides nationally accredited training, emergency response services, drone and aviation training, and specialist public-safety capabilities.</p>
          </div>
        </div>

        <div className="panel">
          <div style={{ padding: 14 }}>
            <h2>Key contacts</h2>
            <p>Research required</p>
          </div>
        </div>

        <div className="panel">
          <div style={{ padding: 14 }}>
            <h2>Geographic coverage</h2>
            <p>National coverage within Australia (Research required for details)</p>
          </div>
        </div>

        <div className="panel">
          <div style={{ padding: 14 }}>
            <h2>Public safety customers</h2>
            <p>Further verified customer and procurement research required.</p>
            <p style={{ marginTop: 8, color: "#667085" }}>PSTR has publicly stated it has used Fotokite to monitor controlled burns, including monitoring fire progression and responder safety.</p>
          </div>
        </div>

        <div className="panel">
          <div style={{ padding: 14 }}>
            <h2>Services and capabilities</h2>
            <ul>
              <li>Nationally accredited public-safety training.</li>
              <li>CASA-approved drone / remote pilot training.</li>
              <li>Emergency response and search capabilities.</li>
              <li>Drone services including imagery collection, mapping and 3D modelling.</li>
              <li>Incident management facilities.</li>
              <li>Specialist flood / swiftwater rescue training.</li>
              <li>Public-safety technology distribution.</li>
            </ul>
          </div>
        </div>

        <div className="panel">
          <div style={{ padding: 14 }}>
            <h2>Training capabilities</h2>
            <p>Provides nationally accredited training and CASA-approved drone / remote pilot training.</p>
          </div>
        </div>

        <div className="panel">
          <div style={{ padding: 14 }}>
            <h2>Technologies used / represented</h2>
            <p>Publicly represents and distributes Fotokite products and provides demonstrations and Australian market support for Fotokite.</p>
          </div>
        </div>

        <div className="panel">
          <div style={{ padding: 14 }}>
            <h2>Existing vendor relationships</h2>
            <p>PSTR publicly describes itself as the sole Australian distributor, wholesaler and authorised dealer for Fotokite.</p>
          </div>
        </div>

        <div className="panel">
          <div style={{ padding: 14 }}>
            <h2>Procurement / contract evidence</h2>
            <p>Further verified procurement research required.</p>
          </div>
        </div>

        <div className="panel">
          <div style={{ padding: 14 }}>
            <h2>DroneSense opportunity</h2>
            <p>PSTR's Fotokite distribution, public-safety training capability and emergency-services market focus may create an opportunity to position DroneSense alongside Fotokite deployments where customers require shared video, mission coordination and centralised operational awareness.</p>
          </div>
        </div>

        <div className="panel">
          <div style={{ padding: 14 }}>
            <h2>Potential conflicts</h2>
            <p>Research required</p>
          </div>
        </div>

        <div className="panel">
          <div style={{ padding: 14 }}>
            <h2>Meeting history & notes</h2>
            <p>Research required</p>
          </div>
        </div>

        <div className="panel">
          <div style={{ padding: 14 }}>
            <h2>Meeting intelligence</h2>
            <h3>What We Know</h3>
            <p>PSTR is a registered RTO and publicly distributes Fotokite in Australia. It has operational experience using Fotokite for controlled-burn monitoring.</p>

            <h3>What We Need to Learn</h3>
            <ul>
              <li>Which Australian agencies currently operate Fotokite.</li>
              <li>Which agencies are actively evaluating or trialling Fotokite.</li>
              <li>How PSTR currently demonstrates and sells Fotokite.</li>
              <li>Whether Fotokite deployments commonly require external video-sharing or command-platform integration.</li>
              <li>PSTR's appetite for introducing DroneSense alongside Fotokite.</li>
              <li>Existing software/platform partnerships.</li>
              <li>Whether customers have asked for multi-drone or multi-source operational awareness.</li>
              <li>Procurement channels used by PSTR.</li>
              <li>Typical Fotokite pricing / licensing / service model in Australia.</li>
              <li>Training and support provided after deployment.</li>
            </ul>

            <h3>Questions for Meeting</h3>
            <ul>
              <li>Which public-safety agencies are currently using or trialling Fotokite in Australia?</li>
              <li>What problems are those customers primarily trying to solve?</li>
              <li>How do customers currently distribute Fotokite video beyond the incident scene?</li>
              <li>Have customers asked for integration with CAD, command platforms or drone-management software?</li>
              <li>How is Fotokite typically procured: direct purchase, vehicle integration, trial, hire or managed service?</li>
              <li>What does PSTR provide after the hardware sale: training, servicing, operational support or ongoing contracts?</li>
              <li>Where does PSTR see DroneSense adding value to a Fotokite deployment?</li>
              <li>Would PSTR be interested in joint demonstrations using Fotokite and DroneSense?</li>
              <li>Are there agencies where PSTR believes a combined demonstration would be particularly relevant?</li>
            </ul>

            <h3>Meeting Notes</h3>
            <p>Research required</p>

            <h3>Actions</h3>
            <p>Research required</p>

            <h3>Follow-up</h3>
            <p>Research required</p>
          </div>
        </div>

        

        <div className="panel">
          <div style={{ padding: 14 }}>
            <h2>Evidence and sources</h2>
            <ul className="sources-list">
              <li>Public Safety Training & Response Group – Fotokite: Safe and Simple Situational Awareness</li>
              <li>Public Safety Training & Response Group – Better Situation Awareness, Better Safety Response</li>
              <li>Public Safety Training & Response Group – FAQ</li>
              <li>Public Safety Training & Response Group – About Us</li>
            </ul>
          </div>
        </div>

        <div className="panel">
          <div style={{ padding: 14 }}>
            <h2>Technology relationships</h2>
            <TechnologyRelationship from="PSTR Group" relation="trains/supports" to="Fotokite" />
            <div style={{ height: 8 }} />
            <TechnologyRelationship from="Fotokite" relation="integrates with" to="DroneSense" />
            <div style={{ height: 12 }} />
            <div>
              <HardwareCard
                name="Fotokite Sigma"
                manufacturer="Fotokite"
                category="Actively Tethered UAS"
                integration="DroneSense"
                status="Supported"
                maturity="Direct Integration – Early Access"
                href="/hardware/fotokite-sigma"
              />
            </div>
          </div>
        </div>
      </IntelligenceProfile>
    </AppShell>
  );
}
