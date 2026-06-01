# CV Gap Detector - Frontend

React + Vite + TypeScript + Tailwind CSS frontend za Spring Boot + Drools backend
(detekcija nesklada izmedju prijavljenog CV nivoa i demonstriranog znanja na intervjuu).

## Preduslov: backend mora biti pokrenut

Frontend konzumira backend na **http://localhost:8080**. Pre pokretanja frontenda,
iz root-a projekta pokreni backend:

```bash
cd service
mvn spring-boot:run
```

Backend izlaze:
- `GET  /api/demo`     vraca analiziran hardkodirani primer iz proposal-a
- `POST /api/analyze`  prima `AnalysisRequest`, vraca `AnalysisResponse`

> Vite dev server je podesen da proksira sve `/api/*` zahteve ka `:8080`
> (vidi `vite.config.ts`), pa nema CORS problema u dev modu. Ako backend nije
> pokrenut, dugme "Analyze" ce prikazati gresku.

## Pokretanje frontenda

```bash
cd frontend
npm install
npm run dev
```

Otvori **http://localhost:5173**.

## Funkcionalnosti

1. **Analiza** (`/`) forma za unos kandidata:
   - `candidateId`
   - dinamicka lista CV tehnologija (nivo + godine iskustva)
   - spomenuti koncepti i rezultati pitanja, grupisani po tehnologiji iz CV-a
     (koncepti/pitanja se ne mogu unositi za tehnologiju koja nije u CV-u)
   - **Ucitaj primer** tri gotova primera iz `postman/` foldera (Primer iz
     proposal-a, Pouzdan CV, Nepouzdan CV) koji popunjavaju formu
   - **Analyze** POST `/api/analyze`, pa preusmerava na rezultate

2. **Rezultati** (`/results/:id`) sumarna kartica sa klasifikacijom
   (kolor po klasifikaciji), gap kartice po tehnologiji (type + severity badge,
   claimed vs estimated nivo, missing/bonus koncepti) i preporuka za mentora.

3. **Istorija** (`/dashboard`) sve analize cuvane u `localStorage`;
   klik na stavku rerenderuje rezultat bez novog API poziva. "Clear history".

4. **Baza znanja** (`/knowledge-base`) read-only prikaz hardkodirane baze
   znanja iz backenda (React / PostgreSQL / Java profili po nivou) + JSON helper.

## Gotovi primeri (za odbranu)

Tri preset-a na stranici Analiza odgovaraju fajlovima u `postman/`:

| Dugme | candidateId | Ocekivani ishod |
|-------|-------------|-----------------|
| Primer iz proposal-a | candidate-001 | SIGNIFICANT_GAPS (React precenjen, PostgreSQL potcenjen) |
| Pouzdan CV | candidate-reliable | RELIABLE_CV |
| Nepouzdan CV | candidate-unreliable | UNRELIABLE_CV |

## Tehnologije

React 18, Vite 5, TypeScript (strict), Tailwind CSS 3, React Router v6,
`fetch` za API, `localStorage` za istoriju. Bez state-management biblioteka,
bez autentifikacije, bez backend storage-a.

## Napomena o bazi znanja

Baza znanja je hardkodirana u backendu
(`service/src/main/java/com/ftn/sbnz/service/service/KnowledgeBaseSeeder.java`).
Fajl `src/data/knowledgeBase.ts` je rucno odrzavano ogledalo te konfiguracije
radi prikaza i predloga koncepata u formi. Ako se seeder promeni, azuriraj i njega.
