/**
 * This is the JavaScript file that we wrote for you to handle
 * certain features without having you worry too much about the
 * underlying tasks
 *
 * You do not need to change or remove this file. You are also
 * not required to use these functions.
 *
 * AUTHOR: @itsmingjie
 */

const WEATHER_API_KEY = "YOUR_API_KEY_HERE"

class Utils {

  static saveObject = (key, object) => {
    if (this._isEmpty(key)) {
      throw new Error("Key cannot be empty.")
    } else if (this._isFunction(object)) {
      throw new Error("Cannot save functions")
    } else if (object instanceof Node) {
      throw new Error("Cannot save DOM elements")
    }

    let serialized = JSON.stringify(object)
    localStorage.setItem(key, serialized)
  }

  static readObject = (key) => {
    if (this._isEmpty(key)) {
      throw new Error("Key cannot be empty.")
    }

    let serialized = localStorage.getItem(key)
    return JSON.parse(serialized)
  }

  static removeObject = (key) => {
    let object = this.readObject(key)

    if (object != null) {
      localStorage.removeItem(key)
    }

    return object
  }

    /** Easy API wrapper to handle weather services */
  static getWeather = (location) => {
    const key = WEATHER_API_KEY;
    return new Promise((resolve, reject) => {
      let response =
      fetch(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${location}`)
        .then((response) => {
          if (response.status >= 400 && response.status < 600) {
            throw new Error("Something is off. Check your query?");
          }
          return response.json()
        }).then(data => {

          resolve(data.current)
        })
        .catch((err) => {
          console.log(err)
        })
    })
  }

  static _isEmpty = (string) => {
    return (!string || 0 === string.length)
  }

  static _isFunction = (o) => {
    return o && {}.toString.call(o) === '[object Function]';
  }

}

class UtilsTester {

  static run = () => {
    this.primitiveSanityTest()
    this.objectSanityTest()
  }

  static primitiveSanityTest = () => {
    let x = 10
    let y = "Hello World"
    let z = false

    Utils.saveObject("x", x)
    Utils.saveObject("y", y)
    Utils.saveObject("z", z)

    console.assert(Utils.readObject("x") === x, "value of x is incorrect")
    console.assert(Utils.readObject("y") === y, "value of y is incorrect")
    console.assert(Utils.readObject("z") === z, "value of z is incorrect")
  }

  static objectSanityTest = () => {
    let car = { type:"Fiat", model: "500", color: "white" }
    Utils.saveObject("car", car)

    console.assert(this._objEq(Utils.readObject("car"), car), "value of car is incorrect")
  }

  /* from https://stackoverflow.com/a/6713782/11288183 */
  static _objEq = (x, y) => {
      if ( x === y ) return true;
    // if both x and y are null or undefined and exactly the same

  if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) return false;
    // if they are not strictly equal, they both need to be Objects

  if ( x.constructor !== y.constructor ) return false;
    // they must have the exact same prototype chain, the closest we can do is
    // test there constructor.

  for ( var p in x ) {
    if ( ! x.hasOwnProperty( p ) ) continue;
      // other properties were tested using x.constructor === y.constructor

    if ( ! y.hasOwnProperty( p ) ) return false;
      // allows to compare x[ p ] and y[ p ] when set to undefined

    if ( x[ p ] === y[ p ] ) continue;
      // if they have the same strict value or identity then they are equal

    if ( typeof( x[ p ] ) !== "object" ) return false;
      // Numbers, Strings, Functions, Booleans must be strictly equal

    if ( ! object_equals( x[ p ],  y[ p ] ) ) return false;
      // Objects and Arrays must be tested recursively
  }

  for ( p in y )
    if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) )
      return false;
        // allows x[ p ] to be set to undefined

  return true;
  }

}
