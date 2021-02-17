function ValidationErrors(errors) {
  this.errors = errors;
}

export const validateObject = (obj) => {
  const errors = Object.keys(obj).reduce((acc, cur) => (obj[cur] ? acc : [...acc, cur]), []);
  if (errors.length > 0) {
    throw new ValidationErrors(errors);
  }
};

export const debounce = (callback, wait) => {
  let timeout = null;
  return (...args) => {
    const next = () => callback(...args);
    clearTimeout(timeout);
    timeout = setTimeout(next, wait);
  };
};
