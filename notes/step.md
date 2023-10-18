1. generate models

npx sequelize model:generate --name ReviewImage --attributes reviewId:integer,url:string

npx sequelize model:generate --name Booking --attributes spotId:integer,userId:integer,startDate:date,endDate:date

npx sequelize model:generate --name Review --attributes spotId:integer,userId:integer,review:string,stars:integer

npx sequelize model:generate --name Spot --attributes ownerId:integer,address:string,city:string,state:string,country:string,lat:decimal,lng:decimal,name:string,description:string,price:decimal

npx sequelize model:generate --name SpotImage --attributes spotId:integer,url:string,preview:boolean
