const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(`https://www.google.kz/maps/@${latitude},${longitude}`);

      const coords = [latitude, longitude]; /*2*/

      const map = L.map("map").setView(coords /*3*/, 13); /*1*/

      L.tileLayer(
        "https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
        /*5(F)*/ {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }
      ).addTo(map); // copied from leaflet

      L.marker(coords /*4*/)
        .addTo(map) // copied from leaflet
        .bindPopup("A pretty CSS popup.<br> Easily customizable.") // copied from leaflet
        .openPopup(); // copied from leaflet
    },
    function () {
      alert("Could not get your position!");
    }
  );

/*12 videos
Module-5 = 5 lessons
Moduel-6 = 4 lessons
*/
