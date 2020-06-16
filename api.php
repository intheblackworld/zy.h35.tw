<?php
include_once 'manage/_config/db.php';
include_once 'manage/api/_api.php';

if (isset($_POST['justice'])) {
    $table = 'booking';
    $_data = $_POST['justice'];
    $_userid = 0;
    $_date = date('Y-m-d H:i:s');

    $name = mysqli_real_escape_string($mysqli, trim($_data['name']));
    $job = mysqli_real_escape_string($mysqli, trim($_data['job']));
    $city_id = +mysqli_real_escape_string($mysqli, trim($_data['city_id']));
    $district_id = +mysqli_real_escape_string($mysqli, trim($_data['district_id']));
    $phone = mysqli_real_escape_string($mysqli, trim($_data['phone']));
    $email = mysqli_real_escape_string($mysqli, trim($_data['email']));
    $message = mysqli_real_escape_string($mysqli, trim($_data['message']));
    $note = '';
    $status = 1;

    if (!empty($name) && !empty($phone) && !empty($email)) {
        $query = "INSERT INTO {$table} SET
            name = '{$name}',
            job = '{$job}',
            city_id = '{$city_id}',
            district_id = '{$district_id}',
            phone = '{$phone}',
            email = '{$email}',
            message = '{$message}',
            note = '{$note}',
            status = '{$status}',
            created_at = '{$_date}',
            updated_uid = '{$_userid}',
            updated_at = '{$_date}'
        ";

        if ($res = mysqli_query($mysqli, $query)) {
            echo $res;
        } else {
            errorCode('資料庫連線錯誤：' . $mysqli->error);
        }

    } else {

        errorCode('資料填寫不齊全');

    }
}

mysqli_close($mysqli);
?>
