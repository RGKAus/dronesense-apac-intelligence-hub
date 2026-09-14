export default function ProcurementWhyThisMatters({
  prompts,
}: {
  prompts: string[];
}) {
  return (
    <section className="panel proc-why-card">
      <div className="panel-heading" style={{ marginBottom: "10px" }}>
        <div>
          <h2>Why This Matters</h2>
          <p>Commercial intelligence prompts for qualification and account strategy.</p>
        </div>
      </div>

      <ul className="proc-why-list">
        {prompts.map((prompt) => (
          <li key={prompt}>{prompt}</li>
        ))}
      </ul>
    </section>
  );
}
