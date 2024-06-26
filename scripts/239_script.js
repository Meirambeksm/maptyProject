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

class Workout {
  date = new Date(); /*5*/
  id = (Date.now() + "").slice(-10); /*6*/

  constructor(coords, distance, duration) {
    /*1*/
    this.coords = coords; /*2*/
    this.distance = distance; /*3*/
    this.duration = duration; /*4*/
  }
}

class Running extends Workout {
  constructor(coords, distance, duration, cadence) {
    /*7*/
    super(coords, distance, duration); /*8*/
    this.cadence = cadence; /*9*/
    this.pace = this.calcPace(); /*15*/
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance; /*13*/
    return this.pace; /*14*/
  }
}
class Cycling extends Workout {
  constructor(coords, distance, duration, elevationGain) {
    /*10*/
    super(coords, distance, duration); /*11*/
    this.elevationGain = elevationGain; /*12*/
    this.calcSpeed(); /*18*/
  }

  calcSpeed() {
    // km/h
    this.speed = this.distance / (this.duration / 60); /*16*/
    return this.speed; /*17*/
  }
}

const run1 = new Running(
  [39, -12],
  5.2,
  24,
  178
); /*19 to check - to be removed*/
const cylce1 = new Cycling(
  [39, -12],
  27,
  95,
  523
); /*20 to check - to be removed*/
console.log(run1, cylce1); /*21(F) to check - to be removed*/

// Application Architecture
class App {
  #map;
  #mapEvent;
  constructor() {
    this._getPosition();

    form.addEventListener("submit", this._newWorkout.bind(this));

    inputType.addEventListener("change", this._toggleElevationField);
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert("Could not get your position!");
        }
      );
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(`https://www.google.kz/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];

    this.#map = L.map("map").setView(coords, 13);

    L.tileLayer("https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling clicks on map
    this.#map.on("click", this._showForm.bind(this));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove("hidden");
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
  }

  _newWorkout(e) {
    e.preventDefault();
    // Clear input fields
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        "";
    // Display the marker
    const { lat, lng } = this.#mapEvent.latlng;
    L.marker([lat, lng])
      .addTo(this.#map)
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

const app = new App();

/*
 */
