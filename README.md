# Bike theft auto

## Komma igång

### Testköra
För att testköra applikationen kan man gå till [biketheftauto](http://biketheft.azurewebsites.net/). Notera dock att API:et hostas på Heroku, och att det hamnar i viloläge när det inte använts på ett tag, därför kan de dröja lite innan kartan och resurserna laddas.

Inloggningsuppgifter är:  
epost: so@nny.com / lösenord: hej

### Bygga
1. Skaffa [node](https://nodejs.org/en/) och [npm](https://www.npmjs.com/) (följer med node). Jag har kört node i version 5.5 och npm i version 3.3. Det finns lite olika [versionshanterare](https://github.com/tj/n) för node om man vill byta smidigt.
2. Kör sedan `npm install -g angular-cli` för att installera [ng-cli](https://github.com/angular/angular-cli).
3. Installera [typescript](https://www.typescriptlang.org/) `npm install -g typescript`
4. Klona det här projektet från github.
5. Gå till mappen dit du klonade och kör `npm i` för att installera dependencies.
6. Kör `ng serve` för att starta utvecklingsmiljön
7. Öppna [localhost:4200](localhost:4200)

### OBS
Eftersom Angular 2 fortfarande är i betastadiet så kan det uppstå lite [SNAFU](http://www.urbandictionary.com/define.php?term=SNAFU) med nya versioner osv. Jag har låst versionerna i min package.json-fil och det bör fungera. Skulle något ändå göra att det inte funkar så finns det en [byggd version här](https://drive.google.com/drive/folders/0Bx3ukLUfYv-3M2xaZTVRRzhZanc?usp=sharing) om man väldigt gärna vill köra det lokalt.

## Ändringar i API:et från labb2  
Jag fick lite problem med att lägga till positioner. Det funkade när jag gjorde labb 2, men nu var jag tvungen att skriva om det lite grann, det var dock ingen större ändring. 
  
I övrigt så märkte jag att det jag vill ha i bodyn när man skapar en resurs blev lite klumpigt. API:et förväntar sig { resurs: { data... } }, men det mest bekväma hade såklart varit att kunna skicka in { data... }. Jag har dock inte ändrat detta i mitt API utan formaterar istället min data själv.
