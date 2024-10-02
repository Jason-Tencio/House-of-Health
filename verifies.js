const receptionists  = [
    {
    firstName: "Jason",
    lastName: "Tencio",
    password: "Pass123@",
    ID: "1214",
    email: "jasonT@gmail.com",
},
{
    firstName: "Jose",
    lastName: "Jose",
    password: "123Pass@",
    ID: "4321",
    email: "joseJ@Docs.com",
},
{
    firstName: "Maximus",
    lastName: "Prime",
    password: "Maximus@",
    ID: "1234",
    email: "maximusP@gmail.com",
},
{
    firstName: "Joshua",
    lastName: "Lucas",
    password: "Joshua@gmail.com",
    ID: "1092",
    email: "joushua12@gmail.com",
},
{
    firstName: "Bob",
    lastName: "Marley",
    password: "BobMarley1$",
    ID: "2049",
    email: "marley@gmail.com",
},
{
    firstName: "Peter",
    lastName: "Griffen",
    password: "PeterGriffen&1",
    ID: "1434",
    email: "petergriffen@hotmail.com",
},
{
    firstName: "Rob",
    lastName: "Schnieder",
    password: "RobS#1",
    ID: "0578",
    email: "robschineder@gmail.com",
},
{
    firstName: "Craig",
    lastName: "Sanja",
    password: "CraigSanja23",
    ID: "0362",
    email: "Craigs@gmail.com",
},
{
    firstName: "Thiago",
    lastName: "Silva",
    password: "Thiago39!",
    ID: "0614",
    email: "Thiago@gmail.com",
},
{
    firstName: "Anakin",
    lastName: "Skywalker",
    password: "Anakin!",
    ID: "2124",
    email: "AnakinS@gmail.com",
},
];
function validate() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var password = document.getElementById("password").value;
    var ID = document.getElementById("ID").value;
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    var confirmationEmail = document.getElementById("confirmationEmail").checked;
    var transactionType = document.getElementById("transactionType").value;
    let validationSucceeds = true;

    var nameRegex = /^[A-Za-z]+$/;
    var passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&!])[A-Za-z\d@#$%^&!]{8,16}$/;
    var idRegex = /^\d{4}$/;
    var phoneRegex = /^(\d{10}|\d{3}[-\s]\d{3}[-\s]\d{4})$/;
    var emailRegex = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;

    if(firstName === "" || !nameRegex.test(firstName)) {
         alert("The receptionist's First Name is missing or name contains non-letters. Please re-enter.");
         document.getElementById("firstName").focus();
         validationSucceeds = false;
    }
    else if(lastName === "" || !nameRegex.test(lastName )) {
        alert("The receptionist's Last Name is missing or name contains non-letters. Please re-enter.");
        document.getElementById("lastName").focus();
        validationSucceeds = false;
    }
    else if(!password.match(passwordRegex)) {
        alert("The receptionist's Password must be 8-16 charachters long, have 1 uppercase letter, 1 lowercase letter, 1 special character, and 1 number. Please re-enter.")
        document.getElementById("password").focus();
        validationSucceeds = false;
    }
    else if(!ID.match(idRegex)) {
        alert("The receptionist's ID must be a 4 digit number. Please re-enter.");
        document.getElementById("ID").focus();
        validationSucceeds = false;
    }
    else if(!phone.match(phoneRegex)) {
        alert("The receptionist's Phone number must have a 10 digit number. Please re-enter.");
        document.getElementById("phone").focus();
        validationSucceeds = false;
    }
    else if(confirmationEmail ) {
        if (email === "") {
            alert("Your email confirmation is requested, but the email was not provided. Please re-enter.");
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
        verifyInput(firstName, lastName, password, ID, email, confirmationEmail, transactionType);
    }
}
function verifyInput() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var password = document.getElementById("password").value;
    var ID = document.getElementById("ID").value;
    var email = document.getElementById("email").value;
    var confirmationEmail = document.getElementById("confirmationEmail").checked;
    var transactionType = document.getElementById("transactionType").value; 

    for (var i = 0; i < receptionists.length; i++) {
        var receptionist = receptionists[i];
        if (receptionist.firstName === firstName &&
            receptionist.lastName === lastName &&
            receptionist.password === password &&
            receptionist.ID === ID &&
            (!confirmationEmail || receptionist.email === email)
        ) {
            alert("Welcome, " + firstName + " " + lastName + " to House of Health. You have entered the system for " + transactionType + ".");
            return true;
        }
    }
    alert("The account was not found for " + firstName + " " + lastName + ".");
    return false;
}