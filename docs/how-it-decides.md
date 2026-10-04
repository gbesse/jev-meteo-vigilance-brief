# Comment la décision est prise

Transforme un bulletin officiel de vigilance en briefing opérationnel adapté à un contexte déclaré.

Le code normalise la source et applique d’abord le cas déterministe documenté dans `src/index.mjs`. Pour les autres dossiers, Jev choisit la catégorie la plus prudente selon les phénomènes, échéances et conséquences mentionnés dans le bulletin officiel, rapprochés du contexte déclaré sans extrapolation. Une confiance inférieure à `0.8`, la catégorie `review_required` ou une absence de données choisie par le modèle marque le résultat pour revue humaine. Une collection vide explicitement fournie reste un résultat déterministe sans appel Jev.

Le niveau, la chronologie et la zone de vigilance officiels ne sont jamais modifiés par Jev.

Les démonstrations ne contiennent que des probabilités synthétiques. Constituez un corpus français annoté, mesurez les erreurs par catégorie et fixez vos propres seuils avant un usage opérationnel.
