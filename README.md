# PackIt!

Skriv hva slags ferie du skal på, og få en pakkeliste på sekunder.

- Ren HTML/CSS/JS, ingen byggesteg, ingen server, ingen kostnad
- Listen lagres i nettleseren på enheten
- Kan legges til på hjemskjermen og fungerer uten nett
- Værvarsel for reisemålet (opptil 16 dager frem) fra [Open-Meteo](https://open-meteo.com) – gratis, ingen nøkkel

Pakkereglene ligger i `ITEMS` i `app.js`. Søkeordene for tolking av fritekst ligger i `TYPES`, `ACTS` og `EXTRAS`.
Når du endrer filene, øk `CACHE`-versjonen i `sw.js`.
