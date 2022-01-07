# bitacademy-challenge-wk2201
Goede voornemens het hele jaar door - Wie Waagt die Wint

## Inleiding
Het kernprobleem van  deze challenge is: de data moet "ergens" te bewonderen zijn. Liefst zou dat willen doen in de vorm van streamen naar [Digitale Buitenreclame](https://www.jcdecaux.nl/digitale-buitenreclame). Maar om dat voor elkaar te krijgen zal er eerst een bron voor streaming nodig zijn. In deze uitwerking ben ik daar mee aan de slag gegaan. In eerste instantie gekeken naar [Netlify](https://www.netlify.com/). Netlify blijkt zijn/haar "ijzer" te huren bij [Amazon Web Services](https://aws.amazon.com/). Helaas geen Python. Toen besloten om de bron voor (toekomstige) streaming bij AWS onder te brengen. De aanpak van Netlify volgend gekozen: Lambda Cloud Functions de en Simple Storage Service (S3) Cloud Storage.
Gebruikte talen en tooling: Python, Javascript, HTML, CSS, CloudFunctions en CloudStorage. Een werkende [live demo](https://jhmj-io.github.io/ba-wk2201-wwdw/) op github.io.



## Toelichting code
Het belangrijkste van deze uitwerking is data store and retrieval. Daarvoor een backend API gemaakt met Python AWS Lambda CloudFunctions en AWS S3 Cloud Storage. Omdat de data publiek te bewonderen is, zijn de data export (GET) API's publiek te gebruiken - geen autorisatie. Voor het gebruik van de store API's (POST/PUT) is wel authorisatie nodig. Een op de server bekend sessie token. De Python code hiervoor  wordt besproken in [wwdw.ipynb](https://github.com/jhmj-io/ba-wk2201-wwdw/blob/main/wwdw.ipynb). De HTML, CSS en Javascript van de [live demo](https://jhmj-io.github.io/ba-wk2201-wwdw/) wordt niet besproken. Gegevens uitwisseling van de [live demo](https://jhmj-io.github.io/ba-wk2201-wwdw/) met de [backend](https://8lgmayxgl6.execute-api.eu-central-1.amazonaws.com/default/wwdw) wordt gedaan met de [Web Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). 


## Challenge vragen - antwoorden

Zie [live demo](https://jhmj-io.github.io/ba-wk2201-wwdw//)


1. Vraag: Jouw goede voornemen(s) opvraagt en weergeeft. Antwoord: door in te loggen op de live demo biedt deze een invoerscherm voor het invullen en bewaren van je goede voornemens. De live demo geeft deze daarna ook weer. 

2. Vraag: Noteer tussenstappen/meetpunten. Antwoord: in het invoerscherm kan je tevens tussenstappen toevoegen.

3. Vraag: De data is ergens te bewonderen. Antwoord: de live demo is publiek toegankelijk en iedereen kan er de data van de waaghalzen en hun gedoe met goede voornemens bewonderen.

4. Vraag: Mogelijkheid om resultaten of gedachte toe te voegen. Antwoord: door opnieuw in te loggen kun je voornemens wijzigen en er actieplan-stappen en gedachten en resultan toevoegen.


## Conclusie
De live demo site "Wie Waagt die Wint - Goede Voornemens het hele jaar door" voldoet aan de eisen van de challenge. Door deze challenge leren werken met AWS. Daar ben ik heel blij mee. De gemaakte backend en [live demo](https://jhmj-io.github.io/ba-wk2201-wwdw/) zijn een experiment. Nogal wat features als bijvoorbeeld toevoegen van voornemens, stappen en gedachten werken niet. En crash kan voorkomen :P In dat geval de [live demo](https://jhmj-io.github.io/ba-wk2201-wwdw/) opnieuw laden. Nu nog het streamen naar [Digitale Buitenreclame](https://www.jcdecaux.nl/digitale-buitenreclame).
