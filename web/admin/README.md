# Administrace
Jedná se o CMS od Strapi, ve kterém spravuji informace, které se mají zobrazit studentům. 

# Závislosti
- Node.js
- NPM
- Balíčky (pomocí `npm install`)

# Spuštění
Webové stránky lze pro vývoj spustit pomocí příkazu `npm run develop`. Obyčejné spuštění a hostování provedete pomocí příkazu `npm run start`.

# Entity
Administrace obsahuje následující entity:

- Presentations - samotné prezentace s určenou hodinou
- Schoolworks   - domácí úkoly (homeworks bohužel nejde) 
- Subjects      - samotné předměty, které propojují ostatní entity a zobrazují je 
- Tests         - informace o testech s otázkama pro cvičení
- Pages         - stránky určené pro staticky text