# web-recipe-book

A web app for uploading and viewing recipes online.

## Demonstration Video

[![Demonstration Video](https://img.youtube.com/vi/fBQc91eLqrY/0.jpg)](https://youtu.be/fBQc91eLqrY)

## Tech Stack

- SvelteKit
- Tailwind CSS
- Express
- MongoDB

## Setup

1.  `git clone https://github.com/omackenzie/web-recipe-book`
2.  Create a MongoDB cloud database and a collection named "recipes". If you are unsure how to do this, there are many tutorials online.
3.  Create a .env file in the backend directory. Set the value "MONGO_URI" to the connection URL for your database, like in .envexample.
4.  In the base directory `npm run install-all`
5.  To run the project `npm run dev` OR, to run the frontend and backend seperately, `npm run serve:server` and `npm run serve:client`

## Future Features

- User authentication using OAuth
- Rating and commenting on recipes
- Deleting recipes

## Credits

The project structure for the backend was largely inspired by [Brad Traversy's MERN tutorial](https://github.com/bradtraversy/mern-tutorial)

All recipes and their related images are sourced from [taste.com.au](https://www.taste.com.au/). This is for testing purposes only.
