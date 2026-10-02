// Objectif : implémenter la frontière de décision métier propre au dépôt.
import { readFile } from "node:fs/promises";
export const DECISIONS = Object.freeze({
  "actionable_brief": "briefing_actionnable",
  "review_required": "revue_requise",
  "information_only": "information_seule",
  "no_hazard": "aucun_phenomene_fourni"
});
const CRITERIA = Object.freeze({
  "actionable_brief": "briefing actionnable",
  "review_required": "revue requise",
  "information_only": "information seule",
  "no_hazard": "aucun phenomene fourni"
});
export function vigilanceBriefCase(input) {
  if (!input?.id || !input?.text || !input?.source?.url || !input?.source?.date) throw new TypeError("Le dossier exige id, text, source.url et source.date");
  const date = new Date(input.source.date);
  if (Number.isNaN(date.valueOf())) throw new TypeError("source.date doit être une date ISO valide");
  return { ...input, id: String(input.id), text: String(input.text).trim(), source: { url: String(input.source.url), date: date.toISOString() } };
}
export async function assessVigilanceBrief(input, provider) {
  const record = vigilanceBriefCase(input);
  if (Array.isArray(record.hazards) && record.hazards.length === 0) return { decision: "no_hazard", label: DECISIONS["no_hazard"], probability: 1, review: false, deterministic: true };
  const response = await provider.decide({
    state: record,
    questions: { decision: { type: "choice", instructions: "Analysez ce dossier à partir des seuls éléments sourcés. Évaluez les phénomènes, échéances et conséquences mentionnés dans le bulletin officiel, rapprochés du contexte déclaré sans extrapolation. Choisissez la catégorie la plus prudente. N’inventez ni fait, ni règle applicable, ni garantie.", criteria: CRITERIA } },
  });
  const answer = response.answers.decision;
  return { decision: answer.choice, label: DECISIONS[answer.choice], probability: answer.probabilities[answer.choice], confidence: answer.confidence, review: answer.confidence < 0.8, deterministic: false, usage: response.usage };
}
export async function runCli(argv, io = console) {
  if (argv.length !== 1) throw new Error("Usage : jev-meteo-vigilance-brief <dossier.json>");
  const dossier = vigilanceBriefCase(JSON.parse(await readFile(argv[0], "utf8")));
  io.log(JSON.stringify({ dossier, prochaineÉtape: "Transmettez ce dossier à assessVigilanceBrief avec un fournisseur Jev configuré." }, null, 2));
}
