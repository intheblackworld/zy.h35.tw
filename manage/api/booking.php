<?php
include_once '../_config/init.php';
include_once '../_config/db.php';
include_once '_api.php';
include_once 'crud.php';

$table = 'booking';

function updateDate($method = true) {
    global $mysqli, $table, $_data, $_userid, $_date, $_id;

    $note = mysqli_real_escape_string($mysqli, trim($_data['note']));
    $booking = mysqli_real_escape_string($mysqli, trim($_data['booking']));
    $status = +mysqli_real_escape_string($mysqli, trim($_data['status']));

    $query = "UPDATE {$table} SET
            note = '{$note}',
            booking = '{$booking}',
            status = '{$status}',
            updated_uid = '{$_userid}',
            updated_at = '{$_date}'
            WHERE id = {$_id}
        ";

    if ($res = mysqli_query($mysqli, $query)) {

        if ($method) echo $res;

    } else {
        errorCode('資料庫連線錯誤：' . $mysqli->error);
    }
}

switch ($_method) {
    case "read":

        $query = "SELECT
                    b.id as id,
                    b.name as name,
                    b.job as job,
                    b.phone as phone,
                    b.email as email,
                    b.message as message,
                    b.note as note,
                    b.booking as booking,
                    b.status as status,
                    b.created_at as created_at,
                    (SELECT name FROM city WHERE id = b.city_id) as city,
                    (SELECT name FROM district WHERE id = b.district_id) as district
                  FROM {$table} as b
                  WHERE id = {$_id}";

        $res = mysqli_query($mysqli, $query);

        if ($mysqli->error) {
            errorCode('資料庫連線錯誤：' . $mysqli->error);
        }

        if ($res->num_rows) {

            $aso = mysqli_fetch_assoc($res);

            $row = array(
                "id" => $aso['id'],
                "name" => $aso['name'],
                "city" => $aso['city'],
                "district" => $aso['district'],
                'job' => $aso['job'],
                "phone" => $aso['phone'],
                "email" => $aso['email'],
                "message" => $aso['message'],
                "note" => $aso['note'],
                "booking" => $aso['booking'],
                "status" => $aso['status'],
                "created_at" => $aso['created_at']
            );

            echo json_encode($row, JSON_UNESCAPED_UNICODE);

        } else {

            errorCode(null, 'works.php');

        }

        break;

    case "delete":

        $query = "UPDATE {$table} SET
            status = 0,
            updated_uid = '{$_userid}',
            updated_at = '{$_date}'
            WHERE id = '{$_id}'
        ";

        if ($res = mysqli_query($mysqli, $query)) {

            include_once 'api_sitemap.php';
            echo 1;

        } else {

            errorCode('資料庫連線錯誤：' . $mysqli->error);

        }

        break;

    case "create":

        $name = mysqli_real_escape_string($mysqli, trim($_data['name']));
        $job = mysqli_real_escape_string($mysqli, trim($_data['job']));
        $city_id = +mysqli_real_escape_string($mysqli, trim($_data['city_id']));
        $district_id = +mysqli_real_escape_string($mysqli, trim($_data['district_id']));
        $phone = mysqli_real_escape_string($mysqli, trim($_data['phone']));
        $email = mysqli_real_escape_string($mysqli, trim($_data['email']));
        $message = mysqli_real_escape_string($mysqli, trim($_data['message']));
        $note = mysqli_real_escape_string($mysqli, trim($_data['note']));
        $status = +mysqli_real_escape_string($mysqli, trim($_data['status']));

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

            $new_query = "SELECT id FROM {$table} ORDER BY id DESC LIMIT 1";
            $new_res = mysqli_query($mysqli, $new_query);
            $new_id = mysqli_fetch_assoc($new_res)['id'];

            echo $new_id;

        } else {

            errorCode('資料庫連線錯誤：' . $mysqli->error);

        }

        break;

    case "update":

        updateDate();

        break;

    default:
}
//*/

?>
