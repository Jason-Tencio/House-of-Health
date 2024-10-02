<?php
$MySQLserver = "sql1.njit.edu";
$username = "jft8";
$password = "ForcaBarca14!!";
$dbname = "jft8";
$con = mysqli_connect ($MySQLserver, $username, $password $dbname); 
if(mysqli_connect_errno()){
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
?>