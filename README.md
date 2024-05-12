# `Airbnb Express Sequelize Server`

Airbnb Express Sequelize Server is a fullstack app that I developed that simulates basic functionality of a typical booking site. The app was devleoped using Sequelize and Express.js as the backend and React.js packaged in vite as the frontend. The demo provides user with features such as sign-up, sign-in, broswer existing spots, review spot detail, create a spot, and leave a review.

<img width="1481" alt="Screenshot 2023-12-14 at 2 05 16 PM" src="https://github.com/edison914/project-ab-express-sequelize-with-auth/assets/101605994/6ce11cce-1177-4097-af78-c4b592804fb2">


## MVP - Feature & Implmentation

*Sign-up*
The server allows the new user to sign up an account using the sign-up link in the Navigation bar when current session of the user is = 'null'. A popup modal is then shown when sign-up link is clicked. All info on the forms are required to be properly filled out in order to create a user, else the server will return errors from the express backend. The sign-up button is also grey out unless all info are filled out.

*CRUD of Spots*

*CRUD of Review*

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
