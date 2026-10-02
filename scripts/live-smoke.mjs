// Objectif : effectuer un appel Jev synthétique uniquement sur demande explicite.
import { createJevClient } from "../src/jev.mjs";
import { assessVigilanceBrief } from "../src/index.mjs";
const client = createJevClient();
const résultat = await assessVigilanceBrief({
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
}, client);
console.log(JSON.stringify({ décision: résultat.decision, confiance: résultat.confidence, usage: résultat.usage }, null, 2));
