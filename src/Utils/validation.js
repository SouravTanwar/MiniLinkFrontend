export const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
};


export const confirmPasswordMatch = (password, confirmPassword) => {
    return password === confirmPassword;
};

export const validateName = (name) => {
    return name.trim().length > 2;
};

export const validatePhone = (phone) => {
    return /^[0-9]\d{9}$/.test(phone);
};

export const validateUrl = (url) => {
    return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(url);
};

