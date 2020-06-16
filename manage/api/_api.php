<?php
/*
 * 狀態說明
 * 0->刪除，1->顯示或啟用，2->隱藏或停用
 *
 * 權限說明
 * 1->一般使用者，2->管理員
*/

function getRowsFromResult($result) {
    if (is_object($result) && +$result->num_rows) {
        $rows = array();

        while($row = $result->fetch_assoc()) {
            array_push($rows, $row);
        }

        return $rows;
    }
}

function errorCode($errorMsg = null, $path = null) {
    if ($errorMsg) {
        header('HTTP/1.1 500 Internal Server Error');
        echo $errorMsg;
        exit();
    }

    if ($path) {
        header('Location:' . $path);
        exit();
    }
}
?>
