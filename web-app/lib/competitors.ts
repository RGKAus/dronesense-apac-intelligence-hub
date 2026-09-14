import { getSupabaseAdmin } from './supabaseServer';

type Confidence = 'confirmed' | 'reported' | 'unverified';

export async function getCompetitorBySlug(slug: string) {
  const supabase = getSupabaseAdmin();

  // core profile
  const { data: competitor, error: compErr } = await supabase
    .from('competitors')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (compErr) throw compErr;
  if (!competitor) return null;

  const competitorId = competitor.id as string;

  // capabilities
  const { data: capabilities } = await supabase
    .from('competitor_capabilities')
    .select('*')
    .eq('competitor_id', competitorId)
    .order('capability_key', { ascending: true });

  // claims
  const { data: claims } = await supabase
    .from('competitor_claims')
    .select('*')
    .eq('competitor_id', competitorId)
    .order('reported_date', { ascending: false });

  // for each claim, fetch linked sources
  const claimSourcesMap: Record<string, any[]> = {};
  if (claims && claims.length) {
    const claimIds = claims.map((c: any) => c.id);
    const { data: claimSources } = await supabase
      .from('competitor_claim_sources')
      .select('claim_id, source_id')
      .in('claim_id', claimIds);

    const sourceIds = claimSources?.map((cs: any) => cs.source_id) || [];
    const { data: sources } = await supabase.from('sources').select('*').in('id', sourceIds || []);

    const sourceById: Record<string, any> = {};
    (sources || []).forEach((s: any) => (sourceById[s.id] = s));

    (claimSources || []).forEach((cs: any) => {
      claimSourcesMap[cs.claim_id] = claimSourcesMap[cs.claim_id] || [];
      if (sourceById[cs.source_id]) claimSourcesMap[cs.claim_id].push(sourceById[cs.source_id]);
    });
  }

  // pricing
  const { data: pricing } = await supabase
    .from('competitor_pricing')
    .select('*')
    .eq('competitor_id', competitorId);

  // sales battlecard (single row expected)
  const { data: battlecards } = await supabase
    .from('competitor_sales_battlecards')
    .select('*')
    .eq('competitor_id', competitorId)
    .maybeSingle();

  return {
    competitor,
    capabilities: capabilities || [],
    claims: (claims || []).map((c: any) => ({ ...c, sources: claimSourcesMap[c.id] || [] })),
    pricing: pricing || [],
    sales_battlecard: battlecards || null,
  };
}
