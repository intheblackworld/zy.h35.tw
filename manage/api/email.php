<?php
include_once '../_config/init.php';
include_once '../_config/db.php';
include_once '_api.php';

if (isset($_SESSION['GRADE']) && $_SESSION['GRADE'] > 1) {
    $table = 'account';

    if (isset($_GET['e']) && strlen($_GET['e'])) {
        $e = $_GET['e'];

        $query = "SELECT email FROM {$table} WHERE email = '{$e}'";
        $res = mysqli_query($mysqli, $query);

        if ($res) {
            echo $res->num_rows;
        } else {
            errorCode('資料庫連線錯誤：' . $mysqli->error);
        }
    }
}
?>
