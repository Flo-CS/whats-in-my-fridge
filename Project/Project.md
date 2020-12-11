# Features & Ideas
## User stories 
- User can add a product by entering barcode or by scanning barcode
- User can select the quantity and the subdivision of the product (ex: with yogurts) when adding a product 
- User can recover information like subdivision when adding a product if he added this product in the past
- User can cards with picture and principal infos of products in the main view
- User can see the remove button when he hover a product card in the main view
- User can select quantity/subdivision to remove from product quantity
- User can click on a card in the main view to show the details page of this product
- User can edit infos of a product (got with the openfoodfacts API if the product is found)
- User can reset/update (modified) infos of a product, this will get data from openfoodfacts API
- User can search for a product
- User can sort products by name, last date added, quantity * subdivision 
- User can see stats about products
- User can see some info about his account
# Server
## Database & stored info
### Choices
- NOSQL DB (document) because data format will not always be the same => Mongo DB
### Schema
- Users (doc)
    - User ID
    - User email
    - User password (hashed + salted)
    - User data (doc) link *1
    - Last login date
    - Account created date
- Users data (doc)
    - User data (doc with ID) *1
        - Products (doc)
            - Product 
                - ...Product infos (From openfoodfacts)
                - Quantity
                - Product subdivision
                - Last add date
        - Stats (doc)
            - "Still to be determined"
## API
### Endpoints
#### Auth
- POST api/auth/register => Register user (body: email, password)
- POST api/auth/login => Login user (body: email, password)
- POST api/auth/logout => Logout user
- All this endpoints return an object like {auth: Bool, token: Object}
#### Products
- GET api/products/?range=INT-INT => Get all products => {products, littleStats}
- GET api/products/:id => Get one products infos => {product}
- GET api/products/stats => Get computed stats => {stats}
- PUT api/products/:id => Modify product infos (body: newData) => {product}
- DELETE api/products/:id => Delete product
# Client
## Choices
- React
- Redux
- React router
- Tailwind CSS
## Pages
### Behavior
- Go to home page if user connected else if go to login
- Go to login if not connected
### Login
- Email + password + confirm password inputs
- Confirm button
- Go to register page button
### Register
- Email + password+ confirm password inputs
- Confirm button
- Go to login page button
### Home
- List of all stocked products with most important infos
- Click on a product show one product page
- Can sort product by:
    - Last added date
    - By nutriscore (still to be determined)
    - By quantity
    - By Name
    - Possibility to reverse
### One product page
- Principal infos of the product (still to be determined)
- Possibility to show all additional infos
- Show the quantity in stock
- Show gauges with ingredient like sugar, fat
### Stats page
- Create stats with all stocked products
    - Nutrition quality score
    - Average gauges with average ingredient like sugar, fat, salt...
    - And more (still to be determined)