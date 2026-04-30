# Project Proposal: Sistem za detekciju nesklada između CV-a i stvarnog znanja kandidata

Vuk Vićentić, SV45/2022

## Opis problema

### Motivacija

U IT industriji se često dešava da ono što kandidati pišu u svojim CV-ovima ne odgovara njihovom stvarnom znanju. Kandidati ponekad precene svoj nivo, navode tehnologije koje su samo dotakli, ili tvrde da su eksperti u nečemu što ne mogu da pokažu na intervjuu. Sa druge strane, mentorima i regruterima nije lako da istovremeno vode intervju, slušaju odgovore i u glavi porede sve to sa CV-om kandidata.

Ideja iza ovog projekta je da se mentorima olakša taj posao tako što će im sistem automatski pokazati gde postoji razlika između onoga što kandidat tvrdi u CV-u i onoga što stvarno demonstrira na intervjuu. Time evaluacija postaje objektivnija i konzistentnija, a kandidati dobijaju konkretniju povratnu informaciju o tome šta treba da poprave.

### Pregled problema

Trenutno postoji nekoliko tipova rešenja koja se bave evaluacijom kandidata:

- **Manuelna evaluacija od strane mentora** – subjektivna je, oduzima dosta vremena i različiti mentori često dođu do različitih zaključaka.
- **ATS alati (Applicant Tracking System)** – uglavnom samo upoređuju ključne reči iz CV-a sa opisom posla i ne ulaze u to šta kandidat stvarno zna.
- **Platforme za tehničke testove (HackerRank, Codility)** – mere konkretne veštine kroz zadatke, ali ne porede te rezultate sa onim što piše u CV-u.
- **AI alati za analizu intervjua** – prave transkripte i osnovne metrike, ali ne porede tvrdnje iz CV-a sa onim što je kandidat rekao tokom intervjua.

Ono što fali u ovim rešenjima je **direktno poređenje između onoga što kandidat tvrdi da zna i onoga što stvarno pokaže**. Postojeći sistemi gledaju CV i intervju kao dve odvojene stvari, a u stvari je upravo presek ta dva izvora ono što daje najpreciznije sliku o kandidatu.

Prednost ovog rešenja je što:
- koristi **eksplicitnu bazu znanja** o tehnologijama, njihovim međusobnim vezama i konceptima koji se očekuju za svaki nivo ekspertize,
- koristi **rule-based pristup sa forward-chaining rezonovanjem**, što znači da su zaključci objašnjivi (mentor uvek može da vidi *zašto* je sistem javio da postoji nesklad),
- generiše **konkretne izveštaje po tehnologiji** koje mentor može da iskoristi kao osnovu za dodatna pitanja ili za finalnu ocenu.

### Metodologija rada

#### Ulazi u sistem

1. **Strukturisani podaci iz CV-a kandidata:**
   - Lista tehnologija/veština sa samoprocenjenim nivoom (npr. *React – ekspert*, *PostgreSQL – srednji nivo*)
   - Godine iskustva po tehnologiji
   - Pozicije i opis projekata na kojima je radio

2. **Podaci iz intervjua:**
   - Transkript intervjua segmentiran po pitanjima (preuzima se iz Fake Interview platforme)
   - Lista tehnologija o kojima je kandidat pričao
   - Koncepti koje je kandidat spomenuo tokom odgovora (ekstrahovani iz transkripta)
   - Rezultat ocene odgovora po pitanju (0-100%, dobijen od mentora ili AI komponente)
   - Indikator pouzdanosti (confidence score) za svako pitanje

3. **Domenska baza znanja:**
   - Ontologija tehnologija (npr. *React zahteva poznavanje JavaScript-a*)
   - Mapiranje *nivo ekspertize → očekivani koncepti* (npr. ekspert u React-u treba da poznaje *hooks, context API, performance optimization, reconciliation algorithm*)
   - Mapiranje *godine iskustva → očekivani nivo*

#### Izlazi iz sistema

1. **Gap Report po tehnologiji:**
   - Tehnologija
   - Tvrđeni nivo iz CV-a
   - Procenjeni stvarni nivo na osnovu intervjua
   - Tip nesklada: `OVERSTATED` (precenjeno), `MATCHED` (usklađeno), `UNDERSTATED` (potcenjeno)
   - Stepen ozbiljnosti: `MINOR`, `MODERATE`, `MAJOR`, `CRITICAL`
   - Lista koncepata koje kandidat **nije pokazao da poznaje** a očekivani su za tvrđeni nivo
   - Lista koncepata koje je kandidat **iznenađujuće dobro pokrio**

2. **Sumarna procena kandidata:**
   - Ukupan broj detektovanih nesklada
   - Klasifikacija kandidata: `RELIABLE_CV`, `MINOR_INCONSISTENCIES`, `SIGNIFICANT_GAPS`, `UNRELIABLE_CV`
   - Preporuka za mentora (npr. *„Postaviti dodatna pitanja iz oblasti X"*)

#### Baza znanja

Baza znanja sastoji se iz tri komponente:

**1. Činjenice (facts):**
- Tehnologije i njihove kategorije (frontend, backend, baze podataka, DevOps...)
- Koncepti vezani za svaku tehnologiju (npr. za React: *hooks, JSX, virtual DOM, hooks, lifecycle, context, suspense*)
- Tipovi nivoa ekspertize: *beginner, junior, mid, senior, expert*

**2. Pravila (rules):**
- Pravila za određivanje očekivanih koncepata po nivou
- Pravila za poređenje tvrđenog i stvarnog nivoa
- Pravila za klasifikaciju ozbiljnosti gap-a
- Pravila za generisanje sumarnog izveštaja
- Pravila za preporuke mentoru

**3. Načini popunjavanja baze znanja:**
- Inicijalno popunjavanje od strane domenskog eksperta (developera/mentora) — definicija ontologije tehnologija i koncepata
- Mapiranje nivoa ekspertize → koncepti dobija se iz literature (npr. roadmap.sh, službene dokumentacije, industrijskih standarda)
- Pravila se pišu u Drools-u i mogu se proširivati kako se otkrivaju novi tipovi nesklada

#### Konkretan primer rezonovanja (korak po korak)

Pretpostavimo sledeći ulaz:

**CV kandidata:**
- React – *ekspert*, 5 godina iskustva
- PostgreSQL – *srednji nivo*, 2 godine iskustva

**Iz intervjua se ekstrahuje:**
- Pitanja o React-u: kandidat je spomenuo `JSX`, `useState`, `props`, `components`
- Pitanja o React-u: kandidat **nije** pomenuo `useEffect`, `context`, `memoization`, `reconciliation`, `custom hooks`
- Pitanja o PostgreSQL-u: kandidat je spomenuo `JOIN`, `SELECT`, `INDEX`, `EXPLAIN`, `transactions`, `ACID`

**Korak 1 — Aktivira se pravilo `DetermineExpectedConcepts`:**
> *Ako je tvrđeni nivo za tehnologiju = ekspert, onda su očekivani koncepti = svi koncepti za tu tehnologiju (osnovni + napredni + ekspertski).*

Sistem zaključuje da se za React (ekspert) očekuju koncepti: `JSX, useState, props, components, useEffect, context, hooks lifecycle, memoization, reconciliation, custom hooks, performance optimization`.

**Korak 2 — Aktivira se pravilo `ComputeMissingConcepts`:**
> *Ako postoji tehnologija sa očekivanim konceptima i listom demonstriranih koncepata, izračunaj listu nedostajućih koncepata.*

Sistem računa: nedostaju `useEffect, context, memoization, reconciliation, custom hooks, performance optimization` (6 od 11 očekivanih).

**Korak 3 — Aktivira se pravilo `DetectOverstatement`:**
> *Ako broj nedostajućih koncepata / broj očekivanih koncepata > 0.5, onda postoji nesklad tipa OVERSTATED sa stepenom MAJOR.*

Sistem kreira novu činjenicu: `Gap(technology=React, type=OVERSTATED, severity=MAJOR)`.

**Korak 4 — Aktivira se pravilo `DetectUnderstatement`:**
> *Ako je tvrđeni nivo srednji a kandidat je demonstrirao koncepte koji odgovaraju seniorskom nivou, onda postoji nesklad tipa UNDERSTATED.*

Za PostgreSQL: kandidat je tvrdio srednji nivo, ali je pokazao poznavanje `EXPLAIN` i `ACID` što su senior koncepti. Sistem kreira: `Gap(technology=PostgreSQL, type=UNDERSTATED, severity=MINOR)`.

**Korak 5 — Aktivira se pravilo `GenerateOverallAssessment`:**
> *Ako postoji bar jedan gap tipa OVERSTATED sa severity-jem MAJOR ili CRITICAL, klasifikuj kandidata kao SIGNIFICANT_GAPS.*

Sistem kreira sumarni izveštaj: `OverallAssessment(classification=SIGNIFICANT_GAPS)`.

**Korak 6 — Aktivira se pravilo `GenerateMentorRecommendation`:**
> *Ako je kandidat klasifikovan kao SIGNIFICANT_GAPS, generiši preporuku za dodatna pitanja iz tehnologija sa MAJOR gap-om.*

Sistem generiše: *„Preporuka mentoru: Postaviti dodatna pitanja iz oblasti React-a, posebno o useEffect, context API i optimizaciji performansi."*

**Finalni izlaz:**
- Gap Report za React: OVERSTATED, MAJOR, nedostaju 6 ključnih koncepata
- Gap Report za PostgreSQL: UNDERSTATED, MINOR
- Sumarna klasifikacija: SIGNIFICANT_GAPS
- Preporuka mentoru: dodatna pitanja iz React-a
