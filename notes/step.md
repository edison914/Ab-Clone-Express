1. generate models

npx sequelize model:generate --name ReviewImage --attributes reviewId:integer,url:string

npx sequelize model:generate --name Booking --attributes spotId:integer,userId:integer,startDate:date,endDate:date

npx sequelize model:generate --name Review --attributes spotId:integer,userId:integer,review:string,stars:integer

npx sequelize model:generate --name Spot --attributes ownerId:integer,address:string,city:string,state:string,country:string,lat:decimal,lng:decimal,name:string,description:string,price:decimal

npx sequelize model:generate --name SpotImage --attributes spotId:integer,url:string,preview:boolean

2. updated `options` in Model for using schema in render.
    //Seeder to be update as well??

3. create relationship in model
    //User hasMany bookings
    //bookings belongTo User

    //User hasMany reviews
    //reviews belongsto User

    //User hasMany spots
    //spots belongsto User

    //Review hasMany reviewImage
    //reviewImage belongsTo Review

    //Spot hasMany Review
    //Review belongsTo Spot

    //Spot hasMany spotImage
    //spotImage belongsto Spot

    //Spot hasMany Booking
    //Booking belongsto Spot

    //update bookings and reviews migration with referece???? only if you are defining relationship not using association.

    Need to eliminate some redundant relationship

4. create seeder files
    //npx sequelize seed:generate
