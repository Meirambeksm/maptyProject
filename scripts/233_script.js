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
]; /*1*/

const form = document.querySelector(".form"); /*2*/
const containerWorkouts = document.querySelector(".workouts"); /*3*/
const inputType = document.querySelector(".form__input--type"); /*4*/
const inputDistance = document.querySelector(".form__input--distance"); /*5*/
const inputDuration = document.querySelector(".form__input--duration"); /*6*/
const inputCadence = document.querySelector(".form__input--cadence"); /*7*/
const inputElevation = document.querySelector(".form__input--elevation"); /*8*/

if (navigator.geolocation)
  /*11*/
  navigator.geolocation.getCurrentPosition(
    function (position) {
      console.log(position); /*10*/
      const { latitude } = position.coords; /*12*/
      const { longitude } = position.coords; /*13*/
      console.log(latitude, longitude); /*14*/
      console.log(
        `https://www.google.kz/maps/@${latitude},${longitude}`
      ); /*15(F)*/
    },
    function () {
      alert("Could not get your position"); /*9*/
    }
  );

/*12 videos
Module-5 = 5 lessons
Moduel-6 = 4 lessons
*/
