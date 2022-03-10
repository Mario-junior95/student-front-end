const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const validateDateRegEx = /^\d{4}-\d{2}-\d{2}$/;

const validate = (name, values, stateError) => {
  let errors = stateError;

  switch (name) {
    case "firstName":
      errors.firstName =
        values.length < 5 ? "Full Name must be 5 characters long!" : "";
      break;
    case "lastName":
      errors.lastName =
        values.length < 5 ? "Last Name must be 5 characters long!" : "";
      break;
    case "email":
      errors.email = validEmailRegex.test(values)
        ? ""
        : "The Email must be a valid email address!";
      break;
    case "password":
      errors.password =
        values.length < 5 ? "Password must be 5 characters long!" : "";
      break;
    case "passwordConfirmation":
      errors.passwordConfirmation =
        values.length < 5 ? "Password does not match!" : "";
      break;
    case "dateOfBirth":
      errors.dateOfBirth = !values.match(validateDateRegEx)
        ? "Invalid date format"
        : "";
      break;
    default:
      break;
  }

  return errors;
};
export { validate };
