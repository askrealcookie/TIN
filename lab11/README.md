# paint - serwer Node.js

Prosty backend HTTP do painta.

## Uruchomienie

```bash
npm install
npm start
```

nodemon

```bash
npm run dev
```

Serwer działa pod adresem:

```text
http://localhost:3000
```

Klienta można uruchomić przez otwarcie pliku `index.html` w przeglądarce. Backend musi być  uruchomiony.

## Endpointy

- `GET /palettes` - lista palet kolorów.
- `GET /palettes/:id` - jedna paleta.
- `GET /images` - lista zapisanych obrazków.
- `GET /images/:id` - jeden zapisany obrazek.
- `POST /images` - dodanie obrazka.
- `DELETE /images/:id` - usunięcie obrazka.

## Przykłady curl

Pobranie wszystkich palet:

```bash
curl http://localhost:3000/palettes
```

Pobranie jednej palety:

```bash
curl http://localhost:3000/palettes/1
```

Pobranie listy obrazków:

```bash
curl http://localhost:3000/images
```

Dodanie obrazka:

```bash
curl -X POST http://localhost:3000/images -H 'Content-Type: application/json' -d '{"gridSize":2,"cells":["#000000","","","#ff0000"]}'
```

Pobranie konkretnego obrazka:

```bash
curl http://localhost:3000/images/TUTAJ_WSTAW_ID
```

Usunięcie obrazka:

```bash
curl -X DELETE http://localhost:3000/images/TUTAJ_WSTAW_ID
```

Błędny JSON, który zwróci `400`:

```bash
curl -X POST http://localhost:3000/images -H 'Content-Type: application/json' -d '{bla blabla'
```
