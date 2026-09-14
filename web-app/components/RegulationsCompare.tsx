"use client";

import { useMemo, useState } from "react";
import type { RegulatoryGuide } from "../lib/regulatoryData";

type ComparisonMode = "overview" | "individual" | "organisation" | "vlos" | "bvlos";

const MODE_OPTIONS: Array<{ value: ComparisonMode; label: string }> = [
  { value: "overview", label: "Overview" },
  { value: "individual", label: "Individual / Pilot" },
  { value: "organisation", label: "Organisation / Operator" },
  { value: "vlos", label: "VLOS" },
  { value: "bvlos", label: "BVLOS / Complex Operations" },
];

type CompareRow = {
  label: string;
  value: (guide: RegulatoryGuide) => string;
};

function sourceLabel(guide: RegulatoryGuide): string {
  const primary = guide.sources[0];
  if (!primary) return "-";
  return `${primary.title}`;
}

function comparisonRows(mode: ComparisonMode): CompareRow[] {
  const shared: CompareRow[] = [
    { label: "Regulator", value: (guide) => guide.regulator },
    { label: "Primary framework", value: (guide) => guide.primaryFramework },
    { label: "Confidence", value: (guide) => guide.confidence },
    { label: "Official source", value: (guide) => sourceLabel(guide) },
    { label: "Last verified", value: (guide) => guide.lastVerified },
  ];

  if (mode === "individual") {
    return [
      { label: "Entry/routine pilot requirements", value: (guide) => guide.comparisonProfile.individual.entryRoutinePilotRequirements },
      { label: "Advanced competency", value: (guide) => guide.comparisonProfile.individual.advancedCompetency },
      { label: "BVLOS competency", value: (guide) => guide.comparisonProfile.individual.bvlosCompetency },
      { label: "Radio qualification", value: (guide) => guide.comparisonProfile.individual.radioQualification },
      { label: "Important distinctions", value: (guide) => guide.comparisonProfile.individual.importantDistinctions },
      ...shared,
    ];
  }

  if (mode === "organisation") {
    return [
      { label: "Operator registration/certification", value: (guide) => guide.comparisonProfile.organisation.operatorRegistrationCertification },
      { label: "Manual/exposition requirements", value: (guide) => guide.comparisonProfile.organisation.manualExpositionRequirements },
      { label: "Key personnel", value: (guide) => guide.comparisonProfile.organisation.keyPersonnel },
      { label: "Safety/risk systems", value: (guide) => guide.comparisonProfile.organisation.safetyRiskSystems },
      { label: "Operational authorisation", value: (guide) => guide.comparisonProfile.organisation.operationalAuthorisation },
      ...shared,
    ];
  }

  if (mode === "vlos") {
    return [
      { label: "VLOS framework", value: (guide) => guide.vlosFramework },
      { label: "Common terminology", value: (guide) => guide.terminology.join(", ") },
      { label: "Pilot qualification model", value: (guide) => guide.comparisonProfile.overview.pilotQualificationModel },
      { label: "Operator model", value: (guide) => guide.comparisonProfile.overview.operatorModel },
      ...shared,
    ];
  }

  if (mode === "bvlos") {
    return [
      { label: "Routine BVLOS availability", value: (guide) => guide.comparisonProfile.bvlos.routineBvlosAvailability },
      { label: "Pilot competency", value: (guide) => guide.comparisonProfile.bvlos.pilotCompetency },
      { label: "Operator requirement", value: (guide) => guide.comparisonProfile.bvlos.operatorRequirement },
      { label: "Aircraft requirement", value: (guide) => guide.comparisonProfile.bvlos.aircraftRequirement },
      { label: "Risk assessment", value: (guide) => guide.comparisonProfile.bvlos.riskAssessment },
      { label: "Operational approval", value: (guide) => guide.comparisonProfile.bvlos.operationalApproval },
      { label: "Major limitations", value: (guide) => guide.comparisonProfile.bvlos.majorLimitations },
      ...shared,
    ];
  }

  return [
    { label: "Regulatory model", value: (guide) => guide.comparisonProfile.overview.regulatoryModel },
    { label: "Pilot qualification model", value: (guide) => guide.comparisonProfile.overview.pilotQualificationModel },
    { label: "Operator model", value: (guide) => guide.comparisonProfile.overview.operatorModel },
    { label: "Risk assessment framework", value: (guide) => guide.comparisonProfile.overview.riskAssessmentFramework },
    ...shared,
  ];
}

export default function RegulationsCompare({ guides }: { guides: RegulatoryGuide[] }) {
  const [mode, setMode] = useState<ComparisonMode>("overview");
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>(["australia", "canada"]);

  const selectedGuides = useMemo(() => {
    return selectedSlugs
      .map((slug) => guides.find((guide) => guide.countrySlug === slug))
      .filter((guide): guide is RegulatoryGuide => Boolean(guide));
  }, [guides, selectedSlugs]);

  const rows = useMemo(() => comparisonRows(mode), [mode]);

  const changeSelection = (index: number, nextValue: string) => {
    setSelectedSlugs((current) => {
      const updated = [...current];
      updated[index] = nextValue;
      return updated;
    });
  };

  const addCountrySelector = () => {
    setSelectedSlugs((current) => [...current, ""]);
  };

  const removeCountrySelector = (index: number) => {
    setSelectedSlugs((current) => {
      if (current.length <= 2) return current;
      return current.filter((_, i) => i !== index);
    });
  };

  const uniqueSelectedGuides = selectedGuides.filter(
    (guide, index, arr) => arr.findIndex((candidate) => candidate.countrySlug === guide.countrySlug) === index,
  );

  return (
    <div className="reg-compare-shell">
      <section className="panel reg-compare-controls">
        <div className="reg-compare-mode-row">
          <strong>Comparison Mode</strong>
          <div className="reg-mode-chips">
            {MODE_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                className={option.value === mode ? "reg-mode-chip active" : "reg-mode-chip"}
                onClick={() => setMode(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="reg-country-selectors">
          {selectedSlugs.map((selectedSlug, index) => (
            <div key={`country-selector-${index}`} className="reg-country-select">
              <label htmlFor={`country-select-${index}`}>Country {index + 1}</label>
              <div className="reg-country-select-row">
                <select
                  id={`country-select-${index}`}
                  className="filter-control"
                  value={selectedSlug}
                  onChange={(event) => changeSelection(index, event.target.value)}
                >
                  <option value="">Select country</option>
                  {guides.map((guide) => (
                    <option key={guide.countrySlug} value={guide.countrySlug}>
                      {guide.country}
                    </option>
                  ))}
                </select>
                {selectedSlugs.length > 2 ? (
                  <button type="button" className="secondary-button" onClick={() => removeCountrySelector(index)}>
                    Remove
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        <div className="reg-compare-actions">
          <button type="button" className="secondary-button" onClick={addCountrySelector}>
            Add Country
          </button>
          <span>Select at least 2 countries for side-by-side comparison.</span>
        </div>
      </section>

      {uniqueSelectedGuides.length < 2 ? (
        <section className="panel">
          <p className="reg-empty">Select at least 2 countries to compare regulations.</p>
        </section>
      ) : (
        <section className="panel reg-compare-table-panel">
          <div className="reg-compare-scroll">
            <table className="reg-compare-table">
              <thead>
                <tr>
                  <th>Field</th>
                  {uniqueSelectedGuides.map((guide) => (
                    <th key={guide.countrySlug}>{guide.country}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label}>
                    <td><strong>{row.label}</strong></td>
                    {uniqueSelectedGuides.map((guide) => (
                      <td key={`${guide.countrySlug}-${row.label}`}>{row.value(guide)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
