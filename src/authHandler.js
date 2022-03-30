/* eslint-disable object-shorthand */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable import/no-cycle */

export default {
  handle(TOKEN) {
    this.set(TOKEN);
  },
  set(TOKEN) {
    localStorage.setItem("token", TOKEN);
  },
  get() {
    return localStorage.getItem("token");
  },
  delete() {
    return localStorage.removeItem("token");
  },
  setUserInfo(
    _id,
    firstName,
    lastName,
    email,
    emailVerified,
    name,
    userInitials
  ) {
    const user = {
      _id: _id,
      name: name,
      firstName: firstName,
      lastName: lastName,
      email: email,
      emailVerified: emailVerified,
      userInitials: userInitials,
    };
    localStorage.setItem("user", JSON.stringify(user));
  },
  getUser() {
    return localStorage.getItem("user");
  },
  deleteUser() {
    return JSON.parse(localStorage.removeItem("user"));
  },
  userRole() {
    return JSON.parse(localStorage.getItem("userRole"));
  },
};
