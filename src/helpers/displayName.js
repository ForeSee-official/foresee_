export const displayName = (user) => {
  if (true) {
    if (user.lastName && user.firstName) {
      return user.lastName + user.firstName;
    } else {
      return user.givenName + " " + user.surName;
    }
  } else {
    if (user.surName && user.giveName) {
      return user.surName + user.giveName;
    } else {
      return user.lastName + user.firstName;
    }
  }
};
