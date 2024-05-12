# `Airbnb Express Sequelize Server`

Airbnb Express Sequelize Server is a fullstack app that I developed that simulates basic functionality of a typical booking site. The app was devleoped using Sequelize and Express.js as the backend, and React.js as the frontend. The use of Vue.js as the primary front-end tooling and build system. The demo provides user with features such as sign-up, sign-in, broswer existing spots, review spot detail, create a spot, and leave a review.

<img width="1481" alt="Screenshot 2023-12-14 at 2 05 16 PM" src="https://github.com/edison914/project-ab-express-sequelize-with-auth/assets/101605994/6ce11cce-1177-4097-af78-c4b592804fb2">


## MVP - Feature & Implmentation

*Sign-up*
The server allows the new user to sign up an account using the sign-up link in the Navigation bar when current session of the user is = 'null'. A popup modal is then shown when sign-up link is clicked. All info on the forms are required to be properly filled out in order to create a user, else the server will return errors from the express backend. The sign-up button is also grey out unless all info are filled out.

<img width="1481" alt="Screenshot 2023-12-14 at 2 05 16 PM" src="https://github.com/edison914/project-ab-express-sequelize-with-auth/assets/101605994/9fafc5d4-3e83-4972-a45c-119ede29a65b">

*CURD of Spots*
The server allows users to browse various spots on the home page. It displays spots owned when the current logged-in user's ID is equal to the spot owner's ID on the Manage Spot page. Additionally, it allows users to update or delete various spots based on whether the logged-in user ID is equal to the owner ID of the spots.

<img width="1481" alt="Screenshot 2023-12-14 at 2 05 16 PM" src="https://github.com/edison914/project-ab-express-sequelize-with-auth/assets/101605994/f5bd85d1-974d-4949-8db2-284287e7cca3">


*CURD of Reviews*
The server allows users to browse various reviews based on the particular spot ID. It displays all spots on the spot detail page. Additionally, it allows users to create or update reviews through a popup modal, based on whether the logged-in user ID is not equal to the owner ID of the spot. Lastly it allows users to delete its review if whether the user has already created a review for the current spot on the Spot detail page.

<img width="1481" alt="Screenshot 2023-12-14 at 2 05 16 PM" src="https://github.com/edison914/project-ab-express-sequelize-with-auth/assets/101605994/9c7f369a-7d50-402f-823b-6afbb6fb11cd">

<img width="1481" alt="Screenshot 2023-12-14 at 2 05 16 PM" src="https://github.com/edison914/project-ab-express-sequelize-with-auth/assets/101605994/c1592e2d-0202-4f35-966a-9675be8d909d">

*Future Features*
CRUD Action of booking.
Implmentation of Google API for locations
Implementation of pictures storages in AWS

## Redux States
The Redux store is used in this App to store all the states globally.
A sample structure:
```JavaScript
{
  reviews: { //to store all reviews related info.
    id: {
      id: 1,
      spotId: 1,
      userId: 1,
      reviews: `This place is beantuful`
      stars: 4,
      .......
    }
  },
  session: { //to store current user info to be used with auth to perform CRUD actions.
    user: {
      id: 1,
      firstName: `John`,
      lastName: `Doe`,
      email: `john-doe@gmail.com`
      userName: `john-doe`,
    }
  },
  spots: { //to store all spots related info.
    id: {
      id: 1,
      ownerId: 1,
      address: `111 Eddie Drive`,
      city: `Fairfax`,
      state: `Virginia`.
      .......
    }
  },
  bookings: { //to store all spots related info.
    `This state is to be implemented/used in later features. Not currently use`
  }
}
```


## DB Diagram for the Backend Database
<img width="742" alt="airbnb_dbdiagram" src="https://github.com/edison914/project-ab-express-sequelize-with-auth/assets/101605994/4c2d6744-86b7-4aa9-b62b-4016364eb2b0">
