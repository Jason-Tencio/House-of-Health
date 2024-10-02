const receptionists = [
    { 
        firstName: 'Jason',
        lastName: 'Tencio',
        password: '123456',
        receptionistID: '12345',
        email: 'jason@example.com',
    },
    { 
        firstName: 'Alice',
        lastName: 'Smith',
        password: 'abcdef',
        receptionistID: '54321',
        email: 'alice@example.com',
    },
    { 
        firstName: 'Bob',
        lastName: 'Johnson',
        password: 'qwerty',
        receptionistID: '98765',
        email: 'bob@example.com',
    },
    { 
        firstName: 'Emily',
        lastName: 'Williams',
        password: 'secure123',
        receptionistID: '13579',
        email: 'emily@example.com',
    },
    { 
        firstName: 'Ron',
        lastName: 'Swanson',
        password: 'davidpass',
        receptionistID: '24680',
        email: 'david@example.com',
    },
    { 
        firstName: 'Linda',
        lastName: 'Petter',
        password: 'password1',
        receptionistID: '11223',
        email: 'linda@example.com',
    },
    { 
        firstName: 'Michael',
        lastName: 'Oliver',
        password: 'pass123',
        receptionistID: '998877',
        email: 'michael@example.com',
    },
    { 
        firstName: 'Sophia',
        lastName: 'Smith',
        password: 'sophia456',
        receptionistID: '556677',
        email: 'sophia@example.com',
    },
    { 
        firstName: 'Bobby',
        lastName: 'Moore',
        password: 'danielpass',
        receptionistID: '334455',
        email: 'daniel@example.com',
    },
    { 
        firstName: 'Clark',
        lastName: 'Superman',
        password: 'olivia789',
        receptionistID: '112233',
        email: 'olivia@example.com',
    },
];
function validate() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var password = document.getElementById("password").value;
    var receptionistID = document.getElementById("ID").value;
    var phoneNumber = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    var emailConfirmation = document.getElementById("emailConfirmation").checked;
    var transactionType = document.getElementById("transactionType").value;
    let validationSucceeds = true;

    var nameRegex = /^[A-Za-z]+$/;
    var passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&!])[A-Za-z\d@#$%^&!]{8,16}$/;
    var receptionistIDRegex = /^\d{4}$/;
    var phoneNumber = /^(\d{10}|\d{3}[-\s]\d{3}[-\s]\d{4})$/;
    var emailRegex = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;

    if(firstName === "" || !nameRegex.test(firstName)) {
         alert("The receptionist's First Name missing or name contains non-letters. Please try again.");
         document.getElementById("firstName").focus();
         validationSucceeds = false;
    }
    else if(lastName === "" || !nameRegex.test(lastName )) {
        alert("The receptionist's Last Name missing or name contains non-letters. Please try again.");
        document.getElementById("lastName").focus();
        validationSucceeds = false;
    }
    else if(!password.match(passwordRegex)) {
        alert("The receptionist's Password must be 8-16 charachters long, have 1 uppercase letter, 1 lowercase letter, 1 special character, and 1 number. Please try again.")
        document.getElementById("password").focus();
        validationSucceeds = false;
    }
    else if(!receptionistID.match(receptionistIDRegex)) {
        alert("The receptionist's ID must be a 4 digit number. Please try again.");
        document.getElementById("ID").focus();
        validationSucceeds = false;
    }
    else if(!phoneNumber.match(phoneNumberRegex)) {
        alert("The receptionist's Phone number must have a 10 digit number. Please try again.");
        document.getElementById("phone").focus();
        validationSucceeds = false;
    }
    else if(emailConfirmation ) {
        if (email === "") {
            alert("Your email confirmation is requested, but email is not provided. Please try again.");
            document.getElementById("email").focus();
            validationSucceeds = false;
        }
        if(!email.match(emailRegex)) {
            alert("Your email must have an @ symbol followed by a period and a domain that is 3 to 5 characters.");
            validationSucceeds = false;
        }
    }
    else if(transactionType === "") {
        alert("Please select a transaction type.");
        validationSucceeds = false;
    }
    else if (validationSucceeds) {
        verifyInput(firstName, lastName, password, receptionistID, email, emailConfirmation, transactionType);
    }
}
function verifyInput() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var password = document.getElementById("password").value;
    var receptionistID = document.getElementById("receptionistID").value;
    var email = document.getElementById("email").value;
    var emailConfirmation = document.getElementById("emailConfirmation").checked;
    var transactionType = document.getElementById("transactionType").value; 

    for (var i = 0; i < receptionists.length; i++) {
        var receptionist = receptionists[i];
        if (receptionist.firstName === firstName &&
            receptionist.lastName === lastName &&
            receptionist.password === password &&
            receptionist.receptionistID === receptionistID &&
            (!emailConfirmation || receptionist.email === email)
        ) {
            alert("Welcome " + firstName + " " + lastName + ". You have entered the system for " + transactionType + ".");
            return true;
        }
    }
    alert("The account was not found for " + firstName + " " + lastName + ".");
    return false;
}