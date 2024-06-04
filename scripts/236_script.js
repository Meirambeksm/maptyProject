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

let map, mapEvent; /*4*/

if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(`https://www.google.kz/maps/@${latitude},${longitude}`);

      const coords = [latitude, longitude];

      map = L.map("map").setView(coords, 13); /*5*/

      L.tileLayer("https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Handling clicks on map
      map.on("click", function (mapE) {
        mapEvent = mapE; /*6*/
        form.classList.remove("hidden"); /*2*/
        inputDistance.focus(); /*3*/
      });
    },

    function () {
      alert("Could not get your position!");
    }
  );

form.addEventListener("submit", function (e) {
  e.preventDefault(); /*8*/
  // Clear input fields
  inputDistance.value =
    inputDuration.value =
    inputCadence.value =
    inputElevation.value =
      ""; /*9*/
  // Display the marker
  // console.log(mapEvent);
  const { lat, lng } = mapEvent.latlng;
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: "running-popup",
      })
    )
    .setPopupContent("Workout")
    .openPopup();
}); /*7 cut and paste from map.on() event listener*/

inputType.addEventListener("change", function () {
  inputElevation
    .closest(".form__row")
    .classList.toggle("form__row--hidden"); /*10*/
  inputCadence
    .closest(".form__row")
    .classList.toggle("form__row--hidden"); /*11*/
});

/*
1. Comment out the function of the event listener 
12(F). There is no lesson #237 
*/

/*9 videos
Module-5 = 5 lessons
Moduel-6 = 4 lessons
*/
