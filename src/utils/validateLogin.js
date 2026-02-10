export function validateLogin(formData) {
    const errors = {};

    if(!formData) {
        alert("Something went wrong!")
    }

    if(!formData.username) {
        errors.username = 'Username is required'
    }

    if(!formData.password) {
        errors.password = 'Password is required'
    }

    return errors;
} 