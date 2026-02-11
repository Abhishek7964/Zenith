export function validateLogin(formData, generatedCaptcha) {
  console.log(formData);
  const errors = {};

  if (!formData.username) {
    errors.username = "Username is required";
  }

  if (!formData.password) {
    errors.password = "Password is required";
  }

  if (!formData.inputCaptcha) {
    errors.inputCaptcha = "Captcha is required";
  } else if (formData.inputCaptcha !== generatedCaptcha) {
    errors.inputCaptcha = "Captcha does not match";
  }

  return errors;
}
