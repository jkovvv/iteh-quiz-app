Quiz App

Ova aplikacija omogućava korisnicima učestvovanje u kvizovima, pregled pokušaja i rezultata, dok kreatori kvizova mogu dodavati nove kvizove i pitanja.
Tehnologije korišćene u projektu

Frontend: React.js (React Router za navigaciju, Axios za HTTP zahteve)
Backend: Laravel (REST API za upravljanje kvizovima i korisničkim podacima)
Baza podataka: MySQL
Alati za razvoj: Git, GitHub

Pokretanje projekta na lokalnoj mašini
Zahtevi

    Node.js i npm instalirani
    PHP i Composer instalirani
    MySQL server

Instalacija i pokretanje
Backend (Laravel)

Kloniraj repozitorijum:

    git clone https://github.com/jkovvv/web-quiz-app.git
    cd quiz_laravel

Instaliraj PHP zavisnosti:

    composer install

Kreiraj .env fajl i unesi konfiguraciju baze podataka:

    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=laravelquiz
    DB_USERNAME=username
    DB_PASSWORD=password

Generiši aplikacijski ključ:

    php artisan key:generate

Pokreni migracije za bazu podataka:

    php artisan migrate

Pokreni backend server:

    php artisan serve

Frontend (React)

    Uđi u React folder:

    cd quiz_react

Instaliraj JavaScript zavisnosti:

    npm install

Konfiguriši axios.defaults.baseURL u app.js ili index.js fajlu tako da odgovara tvom lokalnom Laravel serveru (obično http://127.0.0.1:8000).
Pokreni frontend server:

    npm start

Funkcionalnosti aplikacije

    Registracija i prijava: Korisnici mogu da kreiraju nalog i prijave se.
    Učestvovanje u kvizovima: Korisnici mogu izabrati kviz i rešiti ga.
    Pregled rezultata: Korisnici mogu pregledati rezultate i pokušaje u kvizovima.
    Kreiranje kvizova: Kreatori kvizova mogu dodati nove kvizove i pitanja putem administrativnog panela.
    Export u CSV: Korisnici mogu preuzeti svoje rezultate kvizova u CSV formatu.
