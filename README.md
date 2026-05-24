# SBNZ Projekat: Sistem za detekciju razlike između CV-a i stvarnog znanja kandidata

**Autor:** Vuk Vićentić, SV45/2022

Sistem analizira da li ono što kandidat tvrdi u CV-u odgovara onome što
demonstrira na tehničkom intervjuu. Implementiran je kao **rule-based expert system**
u Drools-u sa **forward-chaining rezonovanjem na 4 nivoa**.

---

## Struktura projekta

Multi-module Maven projekat:

```
cv-gap-detector/
├── pom.xml                        # parent pom
├── model/                         # POJO klase (facts, enumi, KB tipovi)
├── kjar/                          # .drl fajlovi (pravila) + kmodule.xml
│   └── src/main/resources/rules/
│       ├── level1.drl             # R1.1 - R1.3b: očekivano znanje
│       ├── level2.drl             # R2.1 - R2.4: analiza po tehnologiji
│       ├── level3.drl             # R3.1 - R3.5: detekcija gap-ova
│       └── level4.drl             # R4.1 - R4.7: sumarna procena
└── service/                       # Spring Boot REST aplikacija
    └── src/main/java/.../
        ├── ServiceApplication.java
        ├── controller/AnalysisController.java
        ├── service/CVAnalysisService.java
        ├── service/KnowledgeBaseSeeder.java
        └── service/DemoDataProvider.java
```

---

## Tehnologije

- **Java 11**
- **Spring Boot 2.7.9**
- **Drools 7.49.0.Final**
- **Maven 3.8+**

---

## Kako pokrenuti

### 1. Build i install kjar-a

Iz root direktorijuma projekta:

```bash
mvn clean install
```

Ovo kompajlira sva tri modula i instalira `kjar` u lokalni Maven repozitorijum
(što je potrebno jer service učitava kjar preko `KieContainer.newKieContainer(...)`).

### 2. Pokretanje service-a

```bash
cd service
mvn spring-boot:run
```

Aplikacija će se podići na `http://localhost:8080`.

### 3. Testiranje

**Gotov demo iz proposal-a:**

```bash
curl http://localhost:8080/api/demo
```

ili u Postman-u: `GET http://localhost:8080/api/demo`

**Sa custom podacima:**

```bash
curl -X POST http://localhost:8080/api/analyze \
  -H "Content-Type: application/json" \
  -d @postman/request-example.json
```

---

## Šta sistem radi (kratko)

**Ulaz:**
1. CV podaci: tehnologije sa tvrđenim nivoom (BEGINNER do EXPERT) i godinama iskustva
2. Interview podaci: koncepti koje je kandidat spomenuo, ocene odgovora
3. Domenska baza znanja: koje koncepte očekujemo za svaki (tehnologija, nivo)

**Izlaz:**
- **Gap Report** po tehnologiji: tip nesklada (`OVERSTATED`/`MATCHED`/`UNDERSTATED`),
  ozbiljnost (`MINOR`/`MODERATE`/`MAJOR`/`CRITICAL`), nedostajući koncepti
- **Sumarna klasifikacija** kandidata: `RELIABLE_CV` / `MINOR_INCONSISTENCIES` /
  `SIGNIFICANT_GAPS` / `UNRELIABLE_CV`
- **Preporuka mentoru**: konkretne tehnologije i koncepti za dodatna pitanja

---

## Pravila i 4 nivoa lančanja

Forward-chaining: pravila Nivoa N kreiraju činjenice koje aktiviraju pravila Nivoa N+1.

### Nivo 1: Određivanje očekivanog znanja
- **R1.1** `DetermineExpectedConcepts`: iz baze znanja izvuci koje koncepte
  bi trebalo da poznaje neko ko tvrdi `(tehnologija, nivo)`
- **R1.2** `DetermineExpectedLevelFromExperience`: mapiranje godine → nivo
- **R1.3** `CollectDemonstratedConcepts` *(accumulate `collectList`)*: prikupi
  sve koncepte koje je kandidat zaista spomenuo u intervjuu
- **R1.3b** isto za slučaj kad nije spomenuo ništa (prazan skup)

### Nivo 2: Analiza znanja po tehnologiji
- **R2.1** `ComputeMissingConcepts`: razlika skupova Expected \ Demonstrated
- **R2.2** `ComputeUnexpectedlyKnownConcepts`: razlika skupova Demonstrated \ Expected
- **R2.3** `EstimateActualLevel` *(accumulate `sum`)*: proceni stvarni nivo
  na osnovu zbira težina demonstriranih koncepata
- **R2.4** `ComputeAverageQuestionScore` *(accumulate `average`)*: prosečna
  ocena pitanja iz intervjua

### Nivo 3: Detekcija nesklada (Gap-ova)
- **R3.1** `DetectOverstatement_Major`: > 50% koncepata nedostaje
- **R3.2** `DetectOverstatement_Critical`: > 75% nedostaje I prosek < 40
- **R3.3** `DetectOverstatement_Moderate`: između 30% i 50% nedostaje
- **R3.4** `DetectUnderstatement`: procenjeni nivo viši od tvrđenog
- **R3.5** `DetectMatch`: < 20% nedostaje I prosek > 70

### Nivo 4: Sumarna procena i preporuke
- **R4.1** `CountSeriousGaps` *(accumulate `count`)*
- **R4.2** `CollectProblematicTechnologies` *(accumulate `collectList`)*
- **R4.3** `ClassifyAsUnreliableCV`: ≥ 3 ozbiljnih gap-ova
- **R4.4** `ClassifyAsSignificantGaps`: 1-2 ozbiljna gap-a
- **R4.5** `ClassifyAsMinorInconsistencies`: samo MODERATE/UNDERSTATED
- **R4.6** `ClassifyAsReliableCV`: sve MATCHED
- **R4.7** `GenerateMentorRecommendation`

**Ukupno: 21 pravilo, 6 od kojih koristi `accumulate`.**

---

## Primer izvršavanja (iz proposal-a)

Endpoint `GET /api/demo` simulira primer iz proposal-a:

**Kandidat tvrdi:**
- React: EXPERT, 5 godina
- PostgreSQL: MID, 2 godine

**U intervjuu pokazuje:**
- React: samo `JSX, useState, props, components` (loši odgovori, prosek 35)
- PostgreSQL: `JOIN, INDEX, EXPLAIN, transactions, ACID` (dobri odgovori, prosek 85)

**Očekivani izlaz:**
- React → **OVERSTATED / MAJOR** (nedostaje 6+ koncepata od 11 očekivanih za EXPERT)
- PostgreSQL → **UNDERSTATED / MINOR** (pokazao senior-level koncepte iako tvrdi MID)
- Klasifikacija → **SIGNIFICANT_GAPS**
- Preporuka mentoru → dodatna pitanja iz React-a, lista konkretnih nedostajućih koncepata

---

## Klasni dijagram

Vidi `docs/class-diagram.md` (Mermaid).

---

## Troubleshooting

**"newKieContainer: pom.xml ... not found"**: nisi prvo uradio `mvn install`
na celom projektu pre pokretanja service-a. Pokreni `mvn clean install` iz
root direktorijuma.

**Pravila se ne okidaju**: proveri da li je `<kbase packages="rules">` u
`kmodule.xml` (paket mora odgovarati `package rules;` deklaraciji u .drl fajlovima).
