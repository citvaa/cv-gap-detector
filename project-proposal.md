# Project Proposal: Sistem za detekciju razlike između CV-a i stvarnog znanja kandidata

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

#### Pravila u sistemu (forward-chaining sa 4 nivoa)

Pravila su organizovana u **4 nivoa ulančavanja**, gde svaki nivo proizvodi činjenice koje aktiviraju pravila narednog nivoa.

##### Nivo 1 — Određivanje očekivanog znanja

Ova pravila ne zavise od drugih pravila i pokreću se nad ulaznim činjenicama (CV podaci + intervju podaci).

- **`R1.1 — DetermineExpectedConcepts`**
  *Ako u CV-u postoji tehnologija sa tvrđenim nivoom `level`, onda kreiraj činjenicu `ExpectedConcepts(technology, level, conceptList)` gde je `conceptList` skup svih koncepata koji se očekuju za taj nivo.*

- **`R1.2 — DetermineExpectedLevelFromExperience`**
  *Ako kandidat ima X godina iskustva sa tehnologijom, kreiraj činjenicu `ExperienceBasedLevel(technology, level)` na osnovu mapiranja godine → nivo.*

- **`R1.3 — CollectDemonstratedConcepts`** *(koristi accumulate)*
  *Za svaku tehnologiju, prikupi sve koncepte koje je kandidat spomenuo tokom intervjua iz svih pitanja koja se odnose na tu tehnologiju.*
  ```
  accumulate( $c: ConceptMentioned(technology == $tech),
              $concepts: collectList($c.concept) )
  → kreira DemonstratedConcepts(technology, conceptList)
  ```

##### Nivo 2 — Analiza znanja po tehnologiji

Pravila ovog nivoa rade nad činjenicama koje su kreirana pravila Nivoa 1.

- **`R2.1 — ComputeMissingConcepts`**
  *Ako postoje `ExpectedConcepts` i `DemonstratedConcepts` za istu tehnologiju, izračunaj `MissingConcepts(technology, missingList)` kao razliku skupova.*

- **`R2.2 — ComputeUnexpectedlyKnownConcepts`**
  *Ako je kandidat demonstrirao koncepte koji nisu očekivani za njegov tvrđeni nivo, kreiraj `BonusConcepts(technology, bonusList)`.*

- **`R2.3 — EstimateActualLevel`** *(koristi accumulate)*
  *Procenjuje stvarni nivo kandidata za tehnologiju na osnovu broja demonstriranih koncepata i njihove težine.*
  ```
  accumulate( $c: ConceptMentioned(technology == $tech),
              $score: sum($c.difficultyWeight) )
  → kreira EstimatedLevel(technology, level)
  ```

- **`R2.4 — ComputeAverageQuestionScore`** *(koristi accumulate)*
  *Računa prosečnu ocenu odgovora po tehnologiji iz svih pitanja vezanih za tu tehnologiju.*
  ```
  accumulate( $q: QuestionScore(technology == $tech),
              $avg: average($q.score) )
  → kreira AverageScore(technology, avgScore)
  ```

##### Nivo 3 — Detekcija nesklada (Gap-ova)

Pravila ovog nivoa rade nad činjenicama iz Nivoa 2.

- **`R3.1 — DetectOverstatement_Major`**
  *Ako je `MissingConcepts.size / ExpectedConcepts.size > 0.5`, kreiraj `Gap(technology, type=OVERSTATED, severity=MAJOR)`.*

- **`R3.2 — DetectOverstatement_Critical`**
  *Ako `MissingConcepts.size / ExpectedConcepts.size > 0.75` I `AverageScore < 40`, kreiraj `Gap(technology, type=OVERSTATED, severity=CRITICAL)`.*

- **`R3.3 — DetectOverstatement_Moderate`**
  *Ako je `MissingConcepts.size / ExpectedConcepts.size` između 0.3 i 0.5, kreiraj `Gap(technology, type=OVERSTATED, severity=MODERATE)`.*

- **`R3.4 — DetectUnderstatement`**
  *Ako je `EstimatedLevel > ClaimedLevel`, kreiraj `Gap(technology, type=UNDERSTATED, severity=MINOR)`.*

- **`R3.5 — DetectMatch`**
  *Ako je `MissingConcepts.size / ExpectedConcepts.size < 0.2` I `AverageScore > 70`, kreiraj `Gap(technology, type=MATCHED, severity=NONE)`.*

##### Nivo 4 — Sumarna procena i preporuke

Pravila ovog nivoa rade nad Gap činjenicama iz Nivoa 3.

- **`R4.1 — CountSeriousGaps`** *(koristi accumulate)*
  *Broji koliko ima Gap-ova tipa OVERSTATED sa severity-jem MAJOR ili CRITICAL.*
  ```
  accumulate( $g: Gap(type == OVERSTATED, severity in (MAJOR, CRITICAL)),
              $count: count($g) )
  → kreira SeriousGapCount(count)
  ```

- **`R4.2 — CollectProblematicTechnologies`** *(koristi accumulate)*
  *Prikuplja listu svih tehnologija koje imaju MAJOR ili CRITICAL gap.*
  ```
  accumulate( $g: Gap(severity in (MAJOR, CRITICAL)),
              $techs: collectList($g.technology) )
  → kreira ProblematicTechnologies(techList)
  ```

- **`R4.3 — ClassifyAsUnreliableCV`**
  *Ako je `SeriousGapCount >= 3`, klasifikuj kao `UNRELIABLE_CV`.*

- **`R4.4 — ClassifyAsSignificantGaps`**
  *Ako je `SeriousGapCount` između 1 i 2, klasifikuj kao `SIGNIFICANT_GAPS`.*

- **`R4.5 — ClassifyAsMinorInconsistencies`**
  *Ako nema OVERSTATED MAJOR/CRITICAL, ali ima MODERATE gap-ova ili UNDERSTATED gap-ova, klasifikuj kao `MINOR_INCONSISTENCIES`.*

- **`R4.6 — ClassifyAsReliableCV`**
  *Ako su sve tehnologije MATCHED ili imaju samo MINOR gap-ove, klasifikuj kao `RELIABLE_CV`.*

- **`R4.7 — GenerateMentorRecommendation`**
  *Ako klasifikacija nije `RELIABLE_CV`, generiši preporuku mentoru sa listom problematičnih tehnologija (iz `ProblematicTechnologies`) i konkretnim konceptima koje treba dodatno proveriti.*

#### Konkretan primer rezonovanja (korak po korak)

Pretpostavimo sledeći ulaz:

**CV kandidata:**
- React – *ekspert*, 5 godina iskustva
- PostgreSQL – *srednji nivo*, 2 godine iskustva

**Iz intervjua se ekstrahuje:**
- Pitanja o React-u: kandidat je spomenuo `JSX`, `useState`, `props`, `components`
- Pitanja o React-u: kandidat **nije** pomenuo `useEffect`, `context`, `memoization`, `reconciliation`, `custom hooks`
- Pitanja o PostgreSQL-u: kandidat je spomenuo `JOIN`, `SELECT`, `INDEX`, `EXPLAIN`, `transactions`, `ACID`

**Korak 1 [Nivo 1] — `R1.1 DetermineExpectedConcepts`:**
Za React (ekspert) → kreira se `ExpectedConcepts(React, [JSX, useState, props, components, useEffect, context, hooks lifecycle, memoization, reconciliation, custom hooks, performance optimization])`.

**Korak 2 [Nivo 1] — `R1.3 CollectDemonstratedConcepts` (accumulate):**
Sistem prikuplja sve koncepte koje je kandidat pomenuo za React → kreira `DemonstratedConcepts(React, [JSX, useState, props, components])`.

**Korak 3 [Nivo 2] — `R2.1 ComputeMissingConcepts`:**
Sistem računa razliku skupova → kreira `MissingConcepts(React, [useEffect, context, memoization, reconciliation, custom hooks, performance optimization])` (6 od 11).

**Korak 4 [Nivo 2] — `R2.4 ComputeAverageQuestionScore` (accumulate):**
Sistem računa prosečnu ocenu odgovora za React pitanja → kreira `AverageScore(React, 35)`.

**Korak 5 [Nivo 3] — `R3.1 DetectOverstatement_Major`:**
6/11 = 0.54 > 0.5 → kreira `Gap(React, OVERSTATED, MAJOR)`.

**Korak 6 [Nivo 3] — `R3.4 DetectUnderstatement`:**
Za PostgreSQL: kandidat je tvrdio srednji nivo, ali je pokazao senior koncepte → kreira `Gap(PostgreSQL, UNDERSTATED, MINOR)`.

**Korak 7 [Nivo 4] — `R4.1 CountSeriousGaps` (accumulate):**
Broji Gap-ove sa MAJOR/CRITICAL severity-jem → kreira `SeriousGapCount(1)`.

**Korak 8 [Nivo 4] — `R4.2 CollectProblematicTechnologies` (accumulate):**
Prikuplja sve problematične tehnologije → kreira `ProblematicTechnologies([React])`.

**Korak 9 [Nivo 4] — `R4.4 ClassifyAsSignificantGaps`:**
SeriousGapCount = 1 → kreira `OverallAssessment(SIGNIFICANT_GAPS)`.

**Korak 10 [Nivo 4] — `R4.7 GenerateMentorRecommendation`:**
Generiše preporuku za React sa listom konkretnih nedostajućih koncepata.

**Finalni izlaz:**
- Gap Report za React: OVERSTATED, MAJOR, nedostaju 6 ključnih koncepata
- Gap Report za PostgreSQL: UNDERSTATED, MINOR
- Sumarna klasifikacija: SIGNIFICANT_GAPS
- Preporuka mentoru: dodatna pitanja iz React-a
