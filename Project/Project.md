# Features & Ideas
- When manually adding/scanning the product barcode
    - Select if it's a product removing or adding
    - Possibilty to select a quantity by product or product division
    - Possibilty to select a product division (for instance for yogurts) *Only in adding mode
- When a user totally remove a product don't remove it from the database, just set the quantity to 0 to avoid user to set product division each time he add it again

# Server
## Database & stored info
### Choices
- NOSQL DB (document) because data format will not always be the same => Mongo DB
### Schema
- Users (doc)
    - User ID
    - User email
    - User password (hashed + saled)
    - User data (doc) link *1
    - Last login date
    - Account created date
- Users data (doc)
    - User data (doc with ID) *1
        - Products (doc)
            - Product 
                - ...Product infos (From openfoodfacts)
                - Quantity
                - Product division
                - Last add date

        - Stats (doc)
            - "Still to be determined"
## API
### Endpoints
#### Auth
- api/auth/register => Register user (body: email, password)
- api/auth/login => Login user (body: email, password)
- api/auth/logout => Logout user
- All return {auth: Bool, token: Object}
#### Products
- api/products/?range=INT-INT => Get all products => {products and basic infos: Array}
- api/products/:id => Get one products infos => 
    {product:
        {data: Object
        quantity: Int
        lastDateAdded: iso8601 Date}
    }
- api/products/stats => Get computed stats => {stats: Object}
# Client
# Choices
- React
- Redux
- React router
- Tailwind CSS
## Pages
### Behaviour
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
- List of all stocked products with most importants infos
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
    - Average gauges with average ingredient like sugar...
    - And more (still to be determined)