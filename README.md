# Prosjekt 3

Vi har laget en nettside hvor du kan utforske Top 250 listen av filmer på IMDb. Du kan rate filmene, søke etter titler og filtrere på år filmene ble utgitt. Videre går vi gjennom de ulike teknologiene vi har brukt og begrunnelsen for det.

## State management - redux
Vi har brukt redux for å håndtere state management. Komponentene som lagrer state i Redux har hver sin reducer som oppdateres når en handling blir gjort i ui. Vi har tre reducers, en for modal-informasjon, en for hvilke filtre for årstall som er checked, og en for hvilken tittel man søker på. Modalen og filtreringen på år og tittel lagres i redux for å kunne henholdsvis bruke samme modal for alle filmene og aksessere valgt filtrering fra komponenten som sender queries til databasen. Reducerene er definert i store, som igjen blir definert ved en Provider som omkranser hele applikasjonen i `App.tsx` for at alle komponenter skal ha tilgang på de ulike statene som blir lagret i redux. Når reducerne endrer state vil det oppdateres i store, og alle komponenter som er avhengig av en reducer vil få den oppdaterte informasjonen. Vi valgte å bruke Redux som state management fordi det er mye brukt, og kan gi en dypere forståelse enn andre rammeverk som Mobx fordi man må definere mer av koden selv. Apollo kommer automatisk med cache, og siden vi brukte det til å lage queries i frontend kunne det blitt brukt som state management. Vi bestemte derimot å ikke gjøre det for å lære redux og få en bredere kunnskap om state management.

## Database
Vi har brukt MongoDB som databasen. Vi valgte dette fordi det er en velprøvd teknologi og den fungerer godt med GraphQL. Databasen er også en noSQL database som gjør den fleksibel og man behøver ikke forholde seg til rigide SQL tabeller. Vi vurderte å lagre reviews til hver film og da hadde en noSQL database vært svært godt egnet. Selv om vi endte med å kun lagre reviews så er MongoDB fortsatt et godt valg og det har få ulemper knyttet til seg med vårt bruksområde. 

## Backend - **TODO**
For å koble backenden opp med databasen har vi brukt rammeverket Express, som blir brukt i `index.ts` til å koble opp serveren. **Hvorfor valgte vi express.** Det er også express som kobler GraphQL med databasen i filen movie_api.ts. GraphQL er biblioteket vi har brukt for å definere queries og mutations som skal sendes til databasen. I filen `Schema.ts` har vi definert hvordan en Movie ser ut i databasen, med de attributtene vi vil hente ut. Her blir også alle queriesene og mutationenes definert. De sier hvilke potensielle argumenter man kan få inn fra frontend, hvordan queriet skal se ut til databasen, og hva man returnerer tilbake til frontend.
 
## Queries - **TODO**
**Vet ikke om GraphQL skal skrives om i backend eller i queries.**
Apollo er brukt som bibliotek for å skrive queries fra frontend som blir tatt i mot av GraphQL i backend. Apollo kommer med en innebygd cache, hvor den vil lagre data som mottas fra databasen automatisk. Dette hindrer at unødvendige kall fra databasen blir gjort, da den vil bruke dataen i cachen hvis den eksisterer der. For å oppdatere cachen når vi gjør mutations har vi i mutation-uttrykket vårt bedt om å få tilbake id og title på movie-objektet vi endrer. Dette vil da automatisk oppdatere cache-versjonen av movie-objektet som gjør at frontend og databasen alltid er like.

Vi har kun et query for å laste inn data. Det tar inn flere argumenter som kan variere ut fra filtrering og sortering som er valgt. Backend håndterer hvordan query til databasen skal se ut basert på argumentene den tar inn.



## Funksjonalitetskrav 
Her er oversikt over hvordan vi har løst de ulike funksjonalitetskravene:

### Søkemulighet
Vi har implementert en SearchField-komponenent hvor brukeren kan søke på tittel. Man må ikke skrive hele tittelen for å få opp treff, men databasen vil se etter movie-objekter som har en tittel som inneholder strengen som er skrevet inn i tekstfeltet. For at queriet som skal hente filmene får inn riktig argument blir den oppdaterte verdien i SearchField-komponenten lagret i redux. Verdien brukes så i MovieGrid til å gjøre databasekall. I SearchField er det lagt inn en delay på redux-kallet for å ikke kalle på databasen for hver bokstav som skrives. Søkingen kan gjøres i kombinasjon med filtreringen av årstall.

### Dynamisk lasting av data - **TODO: Lars**
Bruker offsett og limit argumenter i queriesTrenger mer her fra Lars
Detaljert visning av objekter
For å vise detaljer om hvert objekt har vi lagd en Modal-komponent. All informasjon om filmen som vises i modalen er lagret i Redux. Man kan bare åpne en modal om gangen, og redux holder dermed bare info om en modal om gangen. Dette synes vi var bra gjenbruk av kode, og man slipper unødvendig lagring av data.

### Sortering og filtrering
I applikasjonen kan man filtrere på tiår ved å sjekke av checkboxes. Vi har laget en FilterBox-komponent som håndterer de ulike CheckBox-komponentene for tiår. I Redux har vi en yearFilter-state som lagrer hvilke år som er huket av. På samme måte som SearchField oppdateres denne verdien for så å gjøre et databasekall med riktige argumenter. Dersom ingen checkboxer er huket av vil alle filmer vises, og det er mulig å huke av flere samtidig.
For sortering har vi implementert at datasettet kan sorteres enten på rank, eller på tittel. Datasettet er automatisk filtrert på rank, men brukeren kan velge ved hjelp av en dropdown-meny å sortere på tittel i stedet. Hva det skal sorteres på blir sendt inn som et argument til backend. Dersom brukeren vil sortere på rank vil argumentet til backend være en tom streng og det vil bli sendt et query uten sortering, siden datasettet automatisk er sortert på rank. Dersom brukeren vil sortere på tittel vil argumentet til backend være “title” og queriet vil sortere på tittel i stigende rekkefølge. Dette gjøres via `Movie.find(...).sort(title: 1)`.

### Brukergenerert data
Brukergenerert data blir lagret i databasen ved at en bruker gir sin rating på en eller flere filmer i databasen. Dataen lagres ved å legge rating til en allerede eksisterende imdb-rating fra databasen. Med det blotte øye er det ikke lett å se at ratingen endres ettersom det er er gitt veldig mange ratings. Brukeren ser derimot at rating count går oppover. For at en bruker bare kan gi rating en gang til hver film vil ratingen for en film bli lagret i localStorage. Hvis en rating allerede eksisterer for den brukeren på en spesifikk film vil ratingen bli deaktivert. Vi har valgt at rank ikke vil endres selv om det vil være mulig å endre ratingen til den grad at det ville påvirket ranken. Dette var fordi vi vil beholde den opprinnelige ranken fra imdb.

### Web accessibility 
https://www.w3.org/WAI/fundamentals/accessibility-principles/#understandable 
Vi har valgt å fokusere på forståelig informasjon og brukergrensesnitt. Det er brukt enkle ord og fraser som virker forklarende til applikasjonens funksjonalitet. Ved innlasting av filmer vises det enkle meldinger som forklarer brukeren hvorfor ingen filmer vises - enten at de laster eller at det ikke er noen treff. Siden har et forutsigbart brukergrensesnitt der elementenes plassering og funksjonalitet er konsekvent. Eksempelvis er redux benyttet for å håndtere en felles modal med funksjonalitet og ui som hver film benytter i sin presentasjon. Det er viktig å kunne reversere feil brukeren måtte gjøre, og dette er løst ved å ha toggle-checkboxer og et “avbryt”-felt på søkefeltet. Ved rating av en film derimot, lagres verdien umiddelbart og det er ikke mulig å reversere ved eventuelle feil. Dette kan være uheldig, men vi har prioritert å sikre databasen ved at én bruker ikke kan skrive ratinger til databasen utallige ganger.

## Brukte biblioteker - **TODO**
I frontend har vi tatt mye i bruk material-ui for å style komponenter. 
Har allerede nevnt GraphQL, Apollo, Redux, express 
Brukt mye material-UI

## Testing
Testene er organisert slik at du finner integration-testene og e2e-testen under `frontend/cpyress/integration/` og unit-testene finner du i `frontend/src/__test__/`. For å integration-testene bruker du `npm test` og for å kjøre unit-testene kjører du `npm test-component`. 

```
cd backend/movie-services
npm install
npm start

!NB NEW TERMINAL
cd frontend
npm install
npm start

!NB NEW TERMINAL
cd frontend
npm test [eller] run test-component
```

Deretter får du opp et Cypress-vindu hvor du kan klikke på filene for å kjøre de ulike testene. Alle testene har filnavn på formen `*.spec.{ts, tsx}`. NB: unit testen `app.spec.tsx` kan ta litt tid å kjøre. 

Alle testene er implementert med Cypress. Hovedårsaken til at vi valgte dette test-rammeverket var at det gjorde det enkelt å skrive e2e tester, samt at det var greit å teste hvordan komponenter endret redux staten. I `e2e-test.spec.ts` er den automatiserte brukertesten hvor man klikker seg litt rundt på siden og sjekker at ting fungerer som det skal. `redux.spec.ts` inneholder intergration-tester hvor vi tester de tre ulike elementene som er lagret i redux-storen, yearFilter, searchFilter og modalInfo. Under `frontend/src/__test__/` ligger noen ulike komponent-tester. I stedet for `render` som blir brukt i for eksempel jest så bruker Cypress `mount` for å lage komponentene og her tester vi at komponentene oppfører seg som de skal. Ettersom unit tester var hovedfokus i prosjekt 2 har vi lagt hovedvekt på integration testingen i dette prosjektet.
