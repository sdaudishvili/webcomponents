function ValidationErrors(errors) {
  this.errors = errors;
}

const validateObject = (obj) => {
  const errors = Object.keys(obj).reduce((acc, cur) => (obj[cur] ? acc : [...acc, cur]), []);
  if (errors.length > 0) {
    throw new ValidationErrors(errors);
  }
};

export default validateObject;
