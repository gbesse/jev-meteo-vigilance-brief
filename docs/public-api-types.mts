// Objectif : vérifier les types publiés depuis un projet consommateur.
import { vigilanceBriefCase, assessVigilanceBrief, DECISIONS } from "../src/index.mjs";
import { createFakeProvider } from "../src/jev.mjs";
const dossier = vigilanceBriefCase({
  "id": "exemple-1",
  "text": "Bulletin synthétique orange pour vent violent entre 14 h et 20 h ; contexte déclaré : marché extérieur avec structures temporaires et montage à midi.",
  "source": {
    "url": "https://example.test/source-publique",
    "date": "2026-10-01"
  },
  "details": {
    "territoire": "France — cas synthétique",
    "origine": "donnée synthétique"
  }
});
void DECISIONS;
void assessVigilanceBrief(dossier, createFakeProvider(() => ({ model: "jev-1.13.0", answers: { decision: { type: "choice", choice: "actionable_brief", probabilities: { "actionable_brief": 0.82, "review_required": 0.06, "information_only": 0.06, "no_hazard": 0.06 }, confidence: 0.82 } } })));

// Ces erreurs attendues protègent le contrat des consommateurs TypeScript.
// @ts-expect-error — un fournisseur doit retourner une réponse Jev complète.
createFakeProvider(() => ({}));
const result = await assessVigilanceBrief(dossier, createFakeProvider(() => ({ model: "jev-1.13.0", answers: {} })));
const review: boolean = result.review;
void review;
// @ts-expect-error — la revue humaine est un booléen.
const incorrect: string = result.review;
void incorrect;
