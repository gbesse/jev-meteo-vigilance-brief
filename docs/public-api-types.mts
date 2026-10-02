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
void assessVigilanceBrief(dossier, createFakeProvider(() => ({})));
