<?php
include_once '_config/init.php';
include_once '_config/db.php';

if(isset($_SESSION['UID'])){
    $query = "DELETE FROM loginUser WHERE uid = '{$_SESSION['UID']}'";
    mysqli_query($mysqli, $query);
}

$_SESSION = array();
session_destroy();

header('Location:login.php');
mysqli_close($mysqli);
?>
