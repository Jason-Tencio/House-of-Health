<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <title>Information</title>
    <link rel="stylesheet" href="project4.css">
    <script>
        function Home() {
            window.location.href = "search.html";
        }
    </script>
</head>
<body>
    <h1>Patient Database</h1>
    <table>
        <thead>
            <th>Patient First Name</th>
            <th>Patient Last Name</th>
            <th>Patient ID</th>
        </thead>
        <tbody>
            <?php
                include "project4.php";
                $result = mysqli_query($con, "SELECT * FROM Patient");
                while ($row = mysqli_fetch_assoc($result)){
                    echo "<tr>";
                    echo "<td>" . $row['PatientFirstName'] . "</td>";
                    echo "<td>" . $row['PatientLastName'] . "</td>";
                    echo "<td>" . $row['PatientID'] . "</td>";
                    echo "</tr>";
                }
            ?>
        </tbody>
    </table>
    <button onclick="Home()">Go Back Button</button>
</body> 
</html>