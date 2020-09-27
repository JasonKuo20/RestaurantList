// require packages used in the project
const express = require("express");
const app = express();
const port = 3000;

// require express-handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// sources form restaurant.json
const restaurantList = require("./restaurant.json");

// setting static files
app.use(express.static("public"));

// routes setting
app.get('/', (req, res) => {
  res.render('index', {
    restaurants: restaurantList.results
  })
})

app.get('/restaurants/:restaurants_id', (req, res) => {
  //console.log('restaurants_id', req.params.movie_id)
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurants_id)
  res.render('show', {
    restaurant: restaurant
  })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
      restaurant.category.toLowerCase().includes(keyword.toLowerCase())

  })
  res.render('index', {
    restaurants: restaurants,
    keyword: keyword
  })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});