## Repository of Kanban Application 
 Kanban is management tool used in production. Operators have components which tey use in production, organised in form of shelf Array
 Each Shelf can hold limited number of items, and Wahrehouse should refill items which are running out to avoid production stoppage
 Each time production takes an item from shelf, this is logged by barcode scanner
 application shows visual representation of shelf Array an state of Each shelf

# How does it help?

Operators dont have to use any cards as in case of ususal Kanban (type kanban in wiki for more info)
They only use barcode scanner, and dont care about the rest (informing warehouse that items are running out)

Warehouse operators immediately see the exact amount of items that should be refilled

# Management

Application allows to organize shelf in custom order - they can be dragged through entire shelf Array
It also allows to configure it automatically, using predefined .xls files.

## Instalation

This is full application - backend and frontend, and can fully work only with working SQL servers 

# Backend

extract the /backend directory

### `npm install` 
then 
### `npm start`

# Frontend

extract the /frontend directory

### `npm install` 
then set API_BASE in /src/Backend/endpoints.ts to your choice
### `npm start`








