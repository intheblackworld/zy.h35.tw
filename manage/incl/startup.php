<?php
define('_WEBSITE_', (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === "on" ? "https" : "http") . '://' . $_SERVER['HTTP_HOST']);
define('_LANG_', 'zh-Hant');
define('_LOCALE_', 'zh_TW');
define('_SITENAME_', '正義聯盟預約看屋後台管理');

$get_page_name = explode('/', $_SERVER["PHP_SELF"]);
$get_page_name = explode('.', $get_page_name[count($get_page_name) - 1])[0];

function getUpdatedHtmlTag($files, $id = false) {
    $path = dirname($_SERVER['SCRIPT_FILENAME']) . '/';

    if (isset($GLOBALS['mode'])) {
        $env = ($GLOBALS['mode'] == 'development');
    } else {
        $env = (preg_match('/[demo|backend|kei|matcher]\.tw/', $_SERVER['SERVER_NAME'])) ? true : false;
    }

    $file = (count($files) > 1 && $env) ? $files[1] : $files[0];
    $local_file = $path . $file;
    $tag = (preg_match('/.css/', $file)) ? 'css' : 'js';

    if (file_exists($local_file)) {
        $timestamp = filemtime($local_file);

        switch ($tag) {
            case 'js':
                echo '<script src="' . $file . '?v='. $timestamp . '"></script>'."\n";
                break;

            case 'css':
                echo '<link rel="stylesheet" href="' . $file . '?v='. $timestamp . '" ' . $id . ' />'."\n";
                break;

            default:
        }
    }
}
?>
