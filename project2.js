const receptionists = [
    {
        firstName: "John",
        lastName: "Doe",
        password: "Password1!",
        receptionistId: 1234,
        email: "arvi@example.com",
    },
    {
        firstName: "Jane",
        lastName: "Doe",
        password: "Password2!",
        receptionistId: 5678,
        email: "jane.doe@hoh.com",
    },
    {
        firstName: "Jason",
        lastName: "Tencio",
        password: "Password8!",
        receptionistId: 1325,
        email: "jason@example.com",
    },

    {
        firstName: "Arvi",
        lastName: "Rivera",
        password: "Password2!",
        receptionistId: 1221,
        email: "lucy.rivera@hoh.com",
    },
    {
        firstName: "Antonio",
        lastName: "Pena",
        password: "Password5!",
        receptionistId: 2225,
        email: "antonio.rodriguez@hoh.com",
    },
    {
        firstName: "Brandon",
        lastName: "Arias",
        password: "Password6!",
        receptionistId: 4224,
        email: "brandon.arias@hoh.com",
    },
    {
        firstName: "Jennifer",
        lastName: "Rosado",
        password: "Password7!",
        receptionistId: 3668,
        email: "jennifer.rosada@hoh.com",
    },
    {
        firstName: "Christina",
        lastName: "Cubillo",
        password: "Password8!",
        receptionistId: 7777,
        email: "christina.cubillo@hoh.com",
    },
    {
        firstName: "Hermione ",
        lastName: "Pujols",
        password: "Password9!",
        receptionistId: 5846,
        email: "hermione.pujols@hoh.com",
    },
    {
        firstName: "Eligio",
        lastName: "Russo",
        password: "Password10!",
        receptionistId: 4589,
        email: "eligio.russo@hoh.com",
    },
    
];

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("receptionist-login-form");
    const emailInput = document.getElementById("email");
    const emailCheckbox = document.getElementById("email-confirmation");

    emailCheckbox.addEventListener("change", function () {
        emailInput.required = emailCheckbox.checked;
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const firstName = document.getElementById("first-name").value;
        const lastName = document.getElementById("last-name").value;
        const password = document.getElementById("password").value;
        const receptionistId = parseInt(document.getElementById("receptionist-id").value);
        const phoneNumber = document.getElementById("phone-number").value;
        const email = document.getElementById("email").value;
        const transaction = document.getElementById("transaction").value;

        let isValid = true;

        if (firstName.trim() === "") {
            alert("Please enter your first name.");
            document.getElementById("first-name").focus();
            isValid = false;
        } else if (lastName.trim() === "") {
            alert("Please enter your last name.");
            document.getElementById("last-name").focus();
            isValid = false;
        } else if (!/^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/.test(password) || password.length > 16) {
            alert("Password must have at least 1 uppercase letter, 1 special character, 1 numeric character, and be at most 16 characters long.");
            document.getElementById("password").focus();
            isValid = false;
        } else if (!/^\d{4}$/.test(receptionistId)) {
            alert("Receptionist ID must be a 4-digit number.");
            document.getElementById("receptionist-id").focus();
            isValid = false;
        } else if (!/^\d{10}$/.test(phoneNumber.replace(/[\s-]/g, "")) || !isValidPhoneNumber(phoneNumber)) {
            alert("Receptionist phone number must consist of 10 digits delimited by spaces or dashes.");
            document.getElementById("phone-number").focus();
            isValid = false;
        } else if (emailInput.required && !isValidEmail(email)) {
            alert("Invalid email address. Please check your email.");
            document.getElementById("email").focus();
            isValid = false;
        }

        if (isValid) {
            const isVerified = verify(firstName, lastName, password, receptionistId, email);

            if (isVerified) {
    alert(`Welcome, ${firstName} ${lastName}! You have entered the system for ${transaction}.`);
    
    document.getElementById("receptionist-login-form").reset();
}
        }
    });
});

function isValidEmail(email) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
}


function isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    return phoneRegex.test(phoneNumber);
}


function togglePasswordVisibility() {
    const passwordField = document.getElementById("password");
    const icon = document.getElementById("showPasswordButton");

    if (passwordField.type === "password") {
        passwordField.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        passwordField.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}

function verify(firstName, lastName, password, receptionistId, email) {
    const matchedReceptionist = receptionists.find(receptionist => {
        return (
            receptionist.firstName === firstName &&
            receptionist.lastName === lastName &&
            receptionist.receptionistId === parseInt(receptionistId)
        );
    });

    if (matchedReceptionist) {
        if (matchedReceptionist.password === password) {
            return true;
        } else {
            alert("Invalid password. Please check your password.");
            form.querySelector("#password").focus();
        }
    } else {
        alert(`Receptionist ${firstName} ${lastName} cannot be found.`);
        form.querySelector("#first-name").focus();
    }

    return false;
}
