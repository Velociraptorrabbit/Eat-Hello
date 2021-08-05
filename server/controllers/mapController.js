const axios = require("axios");

const mapController = {};

const apiKey = "AIzaSyDpYRJVFI4aIRS5LLZpKkuOIGcJkkyrGVI";

// mapController.testing = async (res, req, next) => {

//   try {
//     const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+toronto+canada&key=AIzaSyCaSo1pxwCY44jihxAMHhJjVJ3mHbFLsPw');
//     //console.log(response.data.results);
//     res.locals = { data : response.data.results };
//     // console.log('this is working. end of await');
//     return next();
//   } catch (err) {
//     console.log('mapController.testing error: ', err);
//     return next();
//   }

// };

mapController.getGeoCode = async (req, res, next) => {
  try {
    const zipCode = req.body.zipCode;
    const zipUrl = `https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:${zipCode}&key=${apiKey} `;
    const response = await axios.get(zipUrl);
    // res.locals = {
    //   lat: response.results[0].geometry.location.lat,
    //   lng: response.results[0].geometry.location.lng,
    // };
    res.locals = {
      lat: response.data.results[0].geometry.location.lat,
      lng: response.data.results[0].geometry.location.lng,
    };
    return next();
  } catch (err) {
    console.log("mapController.geoCode error: ", err);
    return next();
  }
};

mapController.sendRestaurant = async (req, res, next) => {
  // console.log('WE ARE INSIDE RESTAURANT CONTROLLER NOW');
  try {
    const menu = req.body.menu;
    const lat = req.body.lat;
    const lng = req.body.lng;
    // const lat = res.locals.lat;
    // const lng = res.locals.lng;
    // console.log(`menu:`, menu, `lat:`, lat, `lng:`, lng);
    const restaurantUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${menu}}&type=restaurant&location=${lat},${lng}&radius=10&key=${apiKey}`;

    const response = await axios.get(restaurantUrl);
    res.locals = { restaurants: response.data.results };
    return next();
    // console.log('here here here', res.locals.restaurants);
  } catch (err) {
    console.log("map controller err in Send Restraunt", err);
  }
};

module.exports = mapController;
