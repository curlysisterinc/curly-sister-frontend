/* eslint-disable camelcase */
/* eslint-disable object-shorthand */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable import/no-cycle */
/* eslint-disable camelcase */
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
    active,
    createdAt,
    email,
    email_verified,
    firstName,
    lastName,
    reset_password,
    role,
    source
  ) {
    const user = {
      active,
      createdAt,
      email,
      email_verified,
      firstName,
      lastName,
      reset_password,
      role,
      source
    };
    localStorage.setItem("user", JSON.stringify(user));
  },
  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  },
  deleteUser() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },
  userRole() {
    return JSON.parse(localStorage.getItem("token"));
  }
};
