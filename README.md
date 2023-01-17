## **Tripcards**

#### Visit [Tripcards](https://faulty-fly.surge.sh/) and search and save places for your next trip   

#### Tripcards is a destination focused travel app where users can create “tripcards” where they can save places based on their interests for any destination.


#### Users can search for places or activities such as arts, entertainment, restaurants, bookstores, shopping etc., view Yelp ratings and reviews and save the places to their own personalized destination “tripcard”.

#### **Features:**
- Any user can search by category and destination for places and view the results on the homepage
- A user can create a secure user account that uses the B-crypt hash
- A logged in user can:
  - search by category and/or destination to view places saved by other users 
  - search by username or destination to view tripcards for other users  
  - save places by first creating a tripcard for that destination and then add/delete places to their tripcard
  - view a list of all places saved on their tripcard
  - create multiple tripcards - one for each destination
  - choose to keep their tripcard private so that it is not visible to other users
  - mark tripcards as visited if they have visited the destination 
  - edit/delete their tripcard/s
  - edit/delete their profile
  - write/edit/delete reviews for any place saved by users


### **Data source**
#### The app uses multiple endpoints from the [Yelp Fusion API](https://fusion.yelp.com/) to source data :
 - business search - by keyword, category or location
 - business details - name, address, phone number, photos, rating
 - reviews - up to three review excerpts for a business


### **Technology Stack**
Front-End: HTML5 | CSS3 | JavaScript | React | React Bootstrap | React-Router | JSON Web Token

Back-End: Node.js | PostgreSQL | Express.js | JSON Schema | Axios | JWT Authentication | Bcrypt | RESTful APIs | SuperTest

### **Deployment**

Frontend deployed on Surge

Backend deployed on Heroku

#### Back end code available [here](https://github.com/ShaheenKhan99/capstone_2_backend) 
              
   
### Schema Design

![DB Schema](/DB_Schema_v5.png "DB_Schema diagram")



### Author

[Shaheen Khan](https://github.com/ShaheenKhan99)



