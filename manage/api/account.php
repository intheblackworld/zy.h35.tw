<?php
include_once '../_config/init.php';
include_once '../_config/db.php';
include_once '_api.php';
include_once 'crud.php';

$table = 'account';

switch ($_method) {
    case "read":

        $query = null;

        if ($_grade === 9) {

            $query = "SELECT * FROM {$table}
                      WHERE id = {$_id}";

        } else if ($_grade === 2) {

            $query = "SELECT * FROM {$table}
                      WHERE id = {$_id}
                      AND status != 0";

        } else if ($_grade === 1) {

            $query = "SELECT email FROM {$table}
                      WHERE id = {$_id}
                      AND status != 0";

        }

        $res = mysqli_query($mysqli, $query);

        if ($mysqli->error) {
            errorCode('資料庫連線錯誤：' . $mysqli->error);
        }

        if ($res && $res->num_rows) {

            $aso = mysqli_fetch_assoc($res);
            echo json_encode($aso, JSON_UNESCAPED_UNICODE);

        } else {

            errorCode(null, 'index.php');
        }

        break;

    case "delete":

        if ($_grade > 1) {
            $query = "DELETE FROM {$table} WHERE id = '{$_id}'";

            if ($res = mysqli_query($mysqli, $query)) {

                echo $res;

            } else {

                errorCode('資料庫連線錯誤：' . $mysqli->error);

            }
        } else {

            errorCode(null, 'index.php');

        }

        break;

    case "create":

        if ($_grade > 1) {
            $email = mysqli_real_escape_string($mysqli, trim($_data['email']));
            $password = mysqli_real_escape_string($mysqli, trim($_data['new_password']));
            $grade = +mysqli_real_escape_string($mysqli, trim($_data['grade']));
            $status = +mysqli_real_escape_string($mysqli, trim($_data['status']));

            if (!empty($password)) {
                $password = md5($password);

                $query = "INSERT INTO {$table} SET
                          email = '{$email}',
                          password = '{$password}',
                          grade = '{$grade}',
                          status = '{$status}',
                          updated_uid = '{$_userid}',
                          last_login = '{$_date}'
                ";

                if ($res = mysqli_query($mysqli, $query)) {

                    $q = "SELECT * FROM {$table} ORDER BY id DESC LIMIT 1";
                    $r = mysqli_query($mysqli, $q);
                    $a = mysqli_fetch_assoc($r);

                    echo $a['id'];

                } else {

                    errorCode('資料庫連線錯誤：' . $mysqli->error);

                }
            } else {

                errorCode('沒有設定密碼！');

            }

        } else {

            errorCode(null, 'index.php');

        }

        break;

    case "update":

        $email = mysqli_real_escape_string($mysqli, trim($_data['email']));

        if (isset($_data['new_password'])) {
            $password = mysqli_real_escape_string($mysqli, trim($_data['new_password']));
        }

        $query;
        $hasError = false;

        if ($_grade > 1) {
            $grade = +mysqli_real_escape_string($mysqli, trim($_data['grade']));
            $status = +mysqli_real_escape_string($mysqli, trim($_data['status']));

            $query = "UPDATE {$table} SET
                      email = '{$email}',
                      grade = '{$grade}',
                      status = '{$status}',
                      updated_uid = '{$_userid}'";

        } else if ($_grade === 1) {

            $query = "UPDATE {$table} SET
                      email = '{$email}',
                      updated_uid = '{$_userid}'";

        } else {
            $hasError = '權限不足';
        }

        if (isset($password)) {

            if (strlen($password) >= 8) {
                $password = md5($password);
                $query .= ", password = '{$password}'";
            } else {

                $hasError = '密碼至少要 8 個字母';

            }

        }

        $query .= " WHERE id = '{$_id}'";

        if (!$hasError) {

            if ($res = mysqli_query($mysqli, $query)) {

                echo $res;

            } else {

                errorCode('資料庫連線錯誤：' . $mysqli->error);

            }

        } else {

            errorCode($hasError);

        }

        break;

    default:
}
?>
