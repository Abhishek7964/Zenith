export function validateRegister(formData) {
  const error = {};

  if (formData.name) formData.name = formData.name.trim();
  if (formData.username) formData.username = formData.username.trim();
  if (formData.email) formData.email = formData.email.trim();
  if (formData.password) formData.password = formData.password.trim();
  if (formData.contact) formData.contact = formData.contact.trim();

  if (!formData.name) {
    error.name = "Name is required";
  }

  if (!formData.username) {
    error.username = "Username is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email) {
    error.email = "Email is required";
  } else if (!emailRegex.test(formData.email)) {
    error.email = "Invalid email format";
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!formData.password) {
    error.password = "Password is required";
  } else if (!passwordRegex.test(formData.password)) {
    error.password =
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character";
  }

  const contactRegex = /^[6-9]\d{9}$/;
  if (formData.contact && !contactRegex.test(formData.contact)) {
    error.contact = "Contact number must be a valid 10-digit number";
  }

  return error;
}
