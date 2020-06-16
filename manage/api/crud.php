<?php
if (!isset($_SESSION['UID']) && !isset($_SESSION['TOKEN'])) {
    errorCode('尚未登入');
}

$_id = null;
$_data = null;
$_post = null;
$_date = date('Y-m-d H:i:s');
$_userid = $_SESSION['UID'];
$_grade = +$_SESSION['GRADE'];
$_method;

switch (true) {
    case (isset($_GET["update"]) && isset($_GET["id"]) && isset($_POST['mData'])):
        $_id = $_GET["id"];
        $_data = json_decode($_POST['mData'], true);
        $_method = 'update';
        break;

    case (isset($_GET["read"]) && isset($_GET["id"])):
        $_id = $_GET["id"];
        $_data = true;
        $_method = 'read';
        break;

    case (isset($_GET["delete"]) && !isset($_GET["id"])):
        $_id = $_GET["delete"];
        $_data = true;
        $_method = 'delete';
        break;

    case (isset($_GET["sort"]) && isset($_POST['mData'])):
        $_data = json_decode($_POST['mData'], true );
        $_method = 'sort';
        break;

    case (isset($_GET["create"]) && isset($_POST['mData'])):
        $_data = json_decode($_POST['mData'], true );
        $_method = 'create';
        break;

    case (isset($_GET["export"])):
        $_id = isset($_GET['id']) ? $_GET['id'] : null;
        $_data = isset($_POST['mData']) ? json_decode($_POST['mData'], true ) : true;
        $_method = 'export';
        break;

    case (isset($_GET["list"])):
        $_id = isset($_GET['list']) ? $_GET['list'] : null;
        $_data = true;
        $_method = 'list';
        break;

    default:
}

if (!$_method) {
    errorCode('操作錯誤！');
}

if (!$_data) {
    errorCode('請輸入資料');
}
?>
