
const userName = document.querySelector('#name');
const email = document.querySelector('#email');
const phone = document.querySelector('#phone');
const message = document.querySelector('#message');
const submitButton = document.querySelector('#submitButton'); 
const form = document.querySelector('#contactForm');

const checkName = () => {

    let valid = false;

    const max = 50,min=2;

    const tName = userName.value.trim();

    if (!isRequired(tName)) {
        showError(userName, 'Name cannot be blank.');
    } else if (!isBetween(tName.length, min, max)) {
        showError(userName, `Name must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(userName);
        valid = true;
    }
    return valid;
};

const checkEmail = () => {
    let valid = false;
    const tEmail = email.value.trim();
    if (!isRequired(tEmail)) {
        showError(email, 'Email cannot be blank.');
    } else if (!isEmailValid(tEmail)) {
        showError(email, 'Invalid Email')
    } else {
        showSuccess(email);
        valid = true;
    }
    return valid;
};

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const checkPhone = () => {
    let valid = false;

    const tPhone = phone.value.trim();

    const max = 12,min=10;

    const phoneRegex = /^\d{10}$/;

    if (!isRequired(tPhone)) {
        showError(phone, 'phone cannot be blank.');
    }else if (!isBetween(tPhone.length, min, max)) {
        showError(phone, `Invalid Mobile Number`)
        
    }else if (!phoneRegex.test(tPhone)) {
        showError(phone, `Invalid Format`)
        
    } else {
        showSuccess(phone);
        valid = true;
    }

    return valid;
};

const checkMessage = () => {
    let valid = false;

    const tMessage = message.value.trim();

    if (!isRequired(tMessage)) {
        showError(message, 'Message cannot be left blank.');
    } else {
        showSuccess(message);
        valid = true;
    }

    return valid;
};

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;

const showError = (input, message) => {
    const formField = input.parentElement;
    formField.classList.remove('success');
    formField.classList.add('error');
    const error = formField.querySelector('small');
    error.classList.remove('none');
    error.textContent = message;
};

const showSuccess = (input) => {
    const formField = input.parentElement;
    formField.classList.remove('error');
    formField.classList.add('success');
    const error = formField.querySelector('small');
    error.classList.add('none');
    error.textContent = '';
}

form.addEventListener('submit', function (e) {

    let isNameValid = checkName(),
        isEmailValid = checkEmail(),
        isPhoneValid = checkPhone(),
        isMessageValid = checkMessage()

    let isFormValid = isNameValid &&
        isEmailValid &&
        isPhoneValid &&
        isMessageValid;

    console.log(isFormValid)

    // submit to the server if the form is valid
    if (!isFormValid) {
        e.preventDefault();
        swal({
            title: "Invalid Entry!",
            text:"Enter the valid entry before submission",
            icon: "error",
            buttons: false,
            timer: 2000,
        });
    }
    else{
    swal({
        title: "Form Submitted Successfully",
        text:"We will Revert back to your message, Thankyou!",
        icon: "success",
        buttons: false,
        timer: 2000,
    });
    }
});

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'name':
            checkName();
            break;
        case 'email':
            checkEmail();
            break;
        case 'phone':
            checkPhone();
            break;
        case 'message':
            checkMessage();
            break;
    }
}));


// Password
// const checkConfirmPassword = () => {
//     let valid = false;
//     const confirmPassword = confirmPasswordEl.value.trim();
//     const password = passwordEl.value.trim();

//     if (!isRequired(confirmPassword)) {
//         showError(confirmPasswordEl, 'Please enter the password again');
//     } else if (password !== confirmPassword) {
//         showError(confirmPasswordEl, 'The password does not match');
//     } else {
//         showSuccess(confirmPasswordEl);
//         valid = true;
//     }

//     return valid;
// };
// const isPasswordSecure = (password) => {
//     const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
//     return re.test(password);
// };
