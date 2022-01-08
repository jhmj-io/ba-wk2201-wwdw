# bitacademy-challenge-wk2201
Goede voornemens het hele jaar door - Wie Waagt die Wint

## Inleiding
Het kernprobleem van  deze challenge is: de data moet "ergens" te bewonderen zijn. Liefst zou ik dat willen doen door te streamen naar [Digitale Buitenreclame](https://www.jcdecaux.nl/digitale-buitenreclame). Om dat voor elkaar te krijgen is  een bron voor streaming nodig. In eerste instantie gekeken naar [Netlify](https://www.netlify.com/). Netlify heeft geen Python optie. Omdat Netlify zijn/haar "ijzer" huurt bij [Amazon Web Services](https://aws.amazon.com/) bedacht om de bron voor (toekomstige) streaming rechtstreeks bij AWS onder te brengen. De aanpak van Netlify volgend gekozen voor Lambda Cloud Functions de en Simple Storage Service (S3) Cloud Storage.
Gebruikte talen en tooling: Python, Javascript, HTML, CSS, CloudFunctions en CloudStorage. Een werkende [live demo](https://jhmj-io.github.io/ba-wk2201-wwdw/) op github.io.



## Toelichting code
Het belangrijkste van deze uitwerking is data storage and retrieval. Daarvoor een backend API gemaakt met Python AWS Lambda CloudFunctions en AWS S3 Cloud Storage. Omdat de data publiek te bewonderen is, zijn de data export API's (GET) publiek te gebruiken - geen authorisatie. Voor het gebruik van de storage API's (POST/PUT) is wel authorisatie nodig. Een op de server bekend sessie token. De Python code hiervoor  wordt besproken in het notebook [wwdw](https://github.com/jhmj-io/ba-wk2201-wwdw/blob/main/wwdw.ipynb). Gegevens uitwisseling van de [live demo](https://jhmj-io.github.io/ba-wk2201-wwdw/) met de [backend](https://8lgmayxgl6.execute-api.eu-central-1.amazonaws.com/default/wwdw) wordt gedaan met de [Web Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). De HTML, CSS en Javascript van de [live demo](https://jhmj-io.github.io/ba-wk2201-wwdw/) wordt niet besproken.

        Het aantal regels code (NON BLANK)
        --------------------------------
        40 lambda/lambda_function.py
        95 lambda/usermethods.py
        24 lambda/usersmethods.py
        71 public/index.html
        134 public/wwdw.css
        242 public/wwdw.js
        56 public/wwdw-data.js
        --------------------------------
        662 total


## Challenge vragen - antwoorden

Zie [live demo](https://jhmj-io.github.io/ba-wk2201-wwdw//)


1. Vraag: Iets dat jouw goede voornemen(s) opvraagt en weergeeft. Antwoord: door in te loggen op de [live demo](https://jhmj-io.github.io/ba-wk2201-wwdw/) biedt deze een invoerscherm voor het invullen en bewaren van je goede voornemens. De [live demo](https://jhmj-io.github.io/ba-wk2201-wwdw/) geeft deze daarna ook weer. 

2. Vraag: Noteer tussenstappen/meetpunten. Antwoord: in het invoerscherm kan je tevens tussenstappen toevoegen.

3. Vraag: De data is ergens te bewonderen. Antwoord: de [live demo](https://jhmj-io.github.io/ba-wk2201-wwdw/) is publiek toegankelijk en iedereen kan er de data van de waaghalzen en hun gedoe met goede voornemens bewonderen.

4. Vraag: Mogelijkheid om resultaten of gedachte toe te voegen. Antwoord: door opnieuw in te loggen kun je voornemens wijzigen en er actieplan-stappen en gedachten en resultaten aan toevoegen.


## Conclusie
De [live demo](https://jhmj-io.github.io/ba-wk2201-wwdw/) "Wie Waagt die Wint - Goede Voornemens het hele jaar door" voldoet aan de eisen van de challenge. Door deze challenge leren werken met AWS. Top! De backend en [live demo](https://jhmj-io.github.io/ba-wk2201-wwdw/) zijn een experiment. Een features als verwijderen ontbreekt en bij een toegevoegd voornemen, stap of gedachte heeft de CSS een taaie bug. En een crash kan gebeuren :P In dat geval de [live demo](https://jhmj-io.github.io/ba-wk2201-wwdw/) opnieuw laden Ctrl+F5. Nu nog het streamen naar [Digitale Buitenreclame](https://www.jcdecaux.nl/digitale-buitenreclame) :)
