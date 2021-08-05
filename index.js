require("dotenv").config();
const Search = require("./models/search");
const { listPlaces } = require("./helpers/inquirer");
const { pause, inquirerMenu } = require("./helpers/inquirer");
const { readInput } = require("./helpers/inquirer");
const main = async () => {
  const search = new Search();
  let opt;
  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        const searchTerm = await readInput("City: ");

        const places = await search.city(searchTerm);

        const selectedId = await listPlaces(places);
        if (selectedId === 0) continue;

        const selectedPlace = places.find((index) => index.id === selectedId);

        search.addHistory(selectedPlace.name);

        const weather = await search.weatherPlace(
          selectedPlace.lat,
          selectedPlace.lng
        );

        console.clear();
        console.log("\nInformation of the city\n".green);
        console.log("City:", selectedPlace.name.green);
        console.log("Lat:", selectedPlace.lat);
        console.log("Lng", selectedPlace.lng);
        console.log("Temperature", weather.temp);
        console.log("Min", weather.min);
        console.log("Max", weather.max);
        console.log("Weather", weather.description.green);
        break;

      case 2:
        search.history.forEach((place, index) => {
          const id = `${index + 1}.`.green;
          console.log(`${id} ${place}`);
        });
        break;
    }

    if (opt !== 0) await pause();
  } while (opt !== 0);
  {
  }
};

main();
