export const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePassword = (password, confirmPassword) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/; 
    if (!passwordRegex.test(password)) {
        return "Password must be at least 6 characters long and contain both letters and numbers.";
    }
    if (password !== confirmPassword) {
        return "Passwords do not match.";
    }
    return null; // Null means validation passed
};

export const validateName = (name) => {
    return name.trim().length > 2;
};

export const validatePhone = (phone) => {
    return /^[0-9]\d{9}$/.test(phone); // Indian phone number validation
};
