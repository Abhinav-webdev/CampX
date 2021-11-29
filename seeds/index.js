const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/CampX')

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6198b40f967891711a20d656',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: 'Point',
                coordinates: [-122.3301, 47.6038]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dqwsibspa/image/upload/v1637428917/CampX/pxo6fguqnxz3g0bad6sl.jpg',
                    filename: 'CampX/pxo6fguqnxz3g0bad6sl',
                },
                {
                    url: 'https://res.cloudinary.com/dqwsibspa/image/upload/v1637428915/CampX/ufwjcrocfdyjekwdinmv.jpg',
                    filename: 'CampX/ufwjcrocfdyjekwdinmv',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})