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

class App {
  #map; /*8*/
  #mapEvent; /*9*/
  constructor() {
    this._getPosition(); /*6*/

    form.addEventListener("submit", this._newWorkout.bind(this) /*16*/);

    inputType.addEventListener("change", this._toggleElevationField /*21(F)*/);
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this) /*5*/,
        function () {
          alert("Could not get your position!");
        }
      );
  } /*2*/

  _loadMap(position /*4*/) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(`https://www.google.kz/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];

    this.#map /*10*/ = L.map("map").setView(coords, 13);

    L.tileLayer("https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map /*11*/);

    // Handling clicks on map
    this.#map /*12*/
      .on("click", this._showForm.bind(this) /*18*/);
  } /*3*/

  _showForm(mapE /*17*/) {
    this.#mapEvent /*13*/ = mapE;
    form.classList.remove("hidden");
    inputDistance.focus();
  }

  _toggleElevationField() {
    /*20*/
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
  }

  _newWorkout(e) {
    /*14*/
    e.preventDefault();
    // Clear input fields
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        "";
    // Display the marker
    const { lat, lng } = this.#mapEvent.latlng; /*19*/
    L.marker([lat, lng])
      .addTo(this.#map) /*15*/
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
  }
}

const app = new App(); /*7*/

/*
REFACTORING:
1. Cut and paste navigator.geolocation.getCurrentPosition to _getPosition of the class App
2. Cut and paste function (position) from _getPosition method to _loadMap method of the class App
 */
