<?php
$host = $_SERVER['HTTP_HOST'];
$GLOBALS['mode'] = getenv('MODE') ?: 'development';

$dbPath = getenv('DB_PATH') ?: 'localhost';
$dbAccount = 'justice';
$dbPassword = "xMuMl1fNBvQVugzV";
$dbName = "justice";

$mysqli = new mysqli($dbPath, $dbAccount, $dbPassword, $dbName);

if ($mysqli->connect_error) die("Connection failed: " . $mysqli->connect_error);

$mysqli->set_charset("utf8");
?>
