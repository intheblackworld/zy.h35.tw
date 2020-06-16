<?php
if (isset($_SESSION['UID']) && isset($_SESSION['TOKEN'])) {

    $query = "SELECT token
              FROM loginUser
              WHERE uid = '{$_SESSION['UID']}'";

    $res = mysqli_query($mysqli, $query);
    $aso = mysqli_fetch_assoc($res);
    $token = $aso['token'];

    if ($_SESSION['TOKEN'] !== $token) {

        header('Location:logout.php');

    }

} else {

    header('Location:logout.php');

}
?>
