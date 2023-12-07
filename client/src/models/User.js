/* eslint-disable camelcase */
class User {
  id = null;
  username = null;
  email = null;
  is_active = null;
  // account = null;
  language = "es";

  constructor(obj) {
    // IF AN OBJECT WAS PASSED THEN INITIALISE PROPERTIES FROM THAT OBJECT
    for (const prop in obj) {
      obj[prop] && (this[prop] = obj[prop]);
    }
  }

  fullName() {
    return `${this.persona.first_name} ${this.persona.last_name}`;
  }

  toString() {
    return `user-${this.id}`;
  }
}

export default User;
