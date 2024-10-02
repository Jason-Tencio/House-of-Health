document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("login-form");
    var emailInput = document.getElementById("email");
    var emailCheckbox = document.getElementById("emailConfirmation");

    emailCheckbox.addEventListener("change", function () {
        var requiredLabel = document.getElementById("required-label");
        requiredLabel.style.display = emailCheckbox.checked ? "inline" : "none";
        emailInput.required = emailCheckbox.checked;
    });
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        var firstName = document.getElementById("firstName").value;
        var lastName = document.getElementById("lastName").value;
        var password = document.getElementById("password").value;
        var receptionistID = parseInt(document.getElementById("receptionistID").value);
        var phoneNumber = document.getElementById("phoneNumber").value;
        var email = document.getElementById("email").value;

        let isValid = validateForm(firstName, lastName, password, receptionistID, phoneNumber, email);

        if (isValid) {
            authenticateReceptionist(firstName, lastName, password, receptionistID, email)
                .then((isAuthenticated) => {
                    if (isAuthenticated) {
                        handleSelectedAction();
                    } else {
                        alert("Authentication failed. Please check your credentials.");
                    }
                })
                .catch((error) => {
                    console.error("Authentication error:", error);
                    alert("An error occurred during authentication. Please try again.");
                });
        }
    });

    fetchDataAndDisplay(); 
});

async function authenticateReceptionist(firstName, lastName, password, receptionistID, email) {
    var url = "project4.php";
    var method = "POST";
    var body = JSON.stringify({
        firstName,
        lastName,
        password,
        receptionistID,
        email,
    });

    try {
        var response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body,
        });

        if (!response.ok) {
            throw new Error(`Server returned ${response.status} ${response.statusText}`);
        }
        var data = await response.json();

        return data.isAuthenticated;
    } catch (error) {
        console.error("Authentication request failed:", error);
        throw new Error("Authentication request failed");
    }
}

function handleSelectedAction() {
    var dropdown = document.getElementById("action-dropdown");
    var selectedAction = dropdown.options[dropdown.selectedIndex].value;

    switch (selectedAction) {
        case "search-receptionist":
            displayReceptionistRecords();
            break;
        case "update-patient-record":
            confirmUpdate();
            break;
        case "make-appointment":
            verifyPatientAndRedirect();
            break;
        default:
            alert("Invalid action selected.");
    }
}

function displayReceptionistRecords() {
    fetch("search.php")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Server returned ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then((records) => {
            updateRecordsUI(records);
        })
        .catch((error) => {
            console.error("Error fetching records:", error);
            alert("An error occurred while fetching records. Please try again.");
        });
}

function updateRecordsUI(records) {
    var recordsContainer = document.getElementById("records-container");

    recordsContainer.innerHTML = "";

    for (var i = 0; i < records.length; i++) {
        var record = records[i];

        var recordDiv = document.createElement("div");
        recordDiv.innerHTML =
            "Record ID: " + record.id + "<br>" + "Name: " + record.name + "<br>" + "Details: " + record.details + "<br><br>";
        recordsContainer.appendChild(recordDiv);
    }
}

function confirmUpdate() {
    var patientID = prompt("Enter the Patient ID:");
    if (patientID) {
        var shots = prompt("Enter new Shots:");
        var illness = prompt("Enter new Illness:");
        if (shots || illness) {
            fetch("update.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    update_patient: true,
                    patient_id: patientId,
                    shots: shots,
                    illness: illness,
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Server returned ${response.status} ${response.statusText}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.success) {
                        displayUpdatedPatient(data.data);
                    } else {
                        alert("Error updating records: " + data.message);
                    }
                })
                .catch((error) => {
                    console.error("Error updating records:", error);
                    alert("An error occurred while updating records. Please try again.");
                });
        } else {
            alert("No changes made.");
        }
    } else {
        alert("Update canceled.");
    }
}

function displayUpdatedPatient(patientData) {
    var table = document.getElementById("result-table");
    var newRow = table.insertRow(table.rows.length);
    var id = patientData.id;
    var name = patientData.firstName + " " + patientData.lastName;
    var shotsGiven = patientData.shotsGiven;
    var illnesses = patientData.illnesses;
    var cellId = newRow.insertCell(0);
    var cellName = newRow.insertCell(1);
    var cellShotsGiven = newRow.insertCell(2);
    var cellIllnesses = newRow.insertCell(3);

    cellId.innerHTML = id;
    cellName.innerHTML = name;
    cellShotsGiven.innerHTML = shotsGiven;
    cellIllnesses.innerHTML = illnesses;

    alert("Patient records updated successfully.");
}

function verifyPatientAndRedirect() {
    var patientName = document.getElementById("patientName").value;
    var patientId = document.getElementById("patientID").value;
    var isValid = validatePatientDetails(patientName, patientId);
    if (isValid) {
        fetch("verifyPatient.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                verify_patient: true,
                patient_name: patientName,
                patient_id: patientId,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Server returned ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                if (data.exists) {
                    alert("Patient verified. Proceed to schedule appointment.");
                    window.location.href = "scheduleAppointment.html";
                } else {
                    alert("Patient does not exist. Create an account before scheduling an appointment.");
                    window.location.href = "cancelAppointment.html";
                }
            })
            .catch((error) => {
                console.error("Error verifying patient:", error);
                alert("An error occurred while verifying patient. Please try again.");
            });
    } else {
        alert("Invalid patient details. Please correct these details before scheduling an appointment.");
    }
}

async function validateForm() {
    try {
        var patientId = document.getElementById("patient_id").value;
        var patientName = document.getElementById("patient_name").value;

        if (patientId.trim() === "" || patientName.trim() === "") {
            alert("Please enter a valid Patient Name and ID.");
            return false;
        }
        var response = await fetch("verifyPatient.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                verify_patient: true,
                patient_id: patientId,
                patient_name: patientName,
            }),
        });
        if (!response.ok) {
            throw new Error(`Server returned ${response.status} ${response.statusText}`);
        }
        var data = await response.json();
        if (data.exists) {
            alert("Patient verified. Please Proceed to schedule appointment.");
            return true;
        } else {
            alert("Patient not found. Please create an account before scheduling an appointment.");
            return false;
        }
    } catch (error) {
        console.error("There was an error verifying the patient:", error);
        alert("An error has occurred while verifying patient. Please try again soon.");
        return false;
    }
}
