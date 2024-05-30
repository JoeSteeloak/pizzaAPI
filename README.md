# Pizza API
Detta repository innehåller kod för ett enklare REST API byggt med Express. API:t hanterar en databas åt en pizzeria för att lagra menyn, användare, bokningar, och meddelande till restaurangen.

## Länk
En liveversion av APIet finns tillgänglig på följande URL: https://pizzaapi-kzs1.onrender.com/api 

## Användare
Användares lösenord hashas med Bcrypt innan lagring.

## Autentisering
om ändpunkten är *protected* krävs en giltig JWT som kan hämtas med korrekt användarnamn och lösenord

## Användning - Användare
Nedan finns beskrivet hur man nå APIet på olika vis:

|Metod  |Ändpunkt     |Beskrivning                                                                           |
|-------|-------------|--------------------------------------------------------------------------------------|
|POST    |/api/register    |Lägg till ny användare. Kräver att ett användar-objekt skickas med                                                     |
|POST    |/api/login |Logga in, ger tillbaka en JWT som är giltig i 1 timme. Kräver att ett användar-objekt skickas med                                              |


Ett användar-objekt returneras/skickas som JSON med följande struktur:
```
{
   "username": "kalle",
   "password": "1234",
}
```
## Användning - Meny

|Metod  |Ändpunkt     |Beskrivning                                                                           |
|-------|-------------|--------------------------------------------------------------------------------------|
|POST    |/menu/register     | *protected* skapar ny rätt i menyn. Kräver att ett meny-objekt skickas med                                                  |
|GET    |/menu/getmenu | hämtar hela menyn                                               |
|POST   |/menu/getmenu:foodname      |hämtar en rätt från menyn                            |
|DELETE    |/menu/deletemenu:foodname  |*protected* Tar bort en rätt från menyn|
|UPDATE |/menu/updatemenu:foodname  |*protected* Uppdaterar en rätt på menyn. Kräver att ett meny-objekt skickas med                                                       |

Ett meny-objekt returneras/skickas som JSON med följande struktur:
```
{
   "foodname": "Margharita",
   "price": 80,
   "ingredients": "Ost, tomatsås",
   }
```

## Användning - meddelande

|Metod  |Ändpunkt     |Beskrivning                                                                           |
|-------|-------------|--------------------------------------------------------------------------------------|
|POST    |/message     | Lagrar ett meddelande-objekt i databasen. Kräver att ett meddelande-objekt skickas med                                                     |
|GET    |/message |*protected* Hämtar alla meddelanden                                               |
|DELETE   |/message:id    | *protected* raderar ett specifikt meddelande                           |
                                                      |

Ett meddelande-objekt returneras/skickas som JSON med följande struktur:
```
{
   "name": "Kalle",
   "email": "Kalle@tjalle.com",
   "message": "Hej, fin restaurang.",
   }
```
## Användning - bokningar

|Metod  |Ändpunkt     |Beskrivning                                                                           |
|-------|-------------|--------------------------------------------------------------------------------------|
|POST    |/booking     | Lagrar ett boknings-objekt i databasen. Kräver att ett boknings-objekt skickas med                                                     |
|GET    |/booking |*protected* Hämtar alla bokningar                                               |
|DELETE   |/booking:id    | *protected* raderar en specifik bokning                          |
                                                      |

Ett boknings-objekt returneras/skickas som JSON med följande struktur:
```
{
   "name": "Kalle",
   "phonenumber": "0410465456",
   "numberOfGuests": 4,
   "date": " 2024-05-17"
}
```
