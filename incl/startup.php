<?php
ob_start("ob_gzhandler");

define('_WEBSITE_', (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === "on" ? "https" : "http") . '://' . $_SERVER['HTTP_HOST']);
define('_LANG_', 'zh-Hant');
define('_LOCALE_', 'zh_TW');
define('_SITENAME_', '正義聯盟 | 小宅變身 正義看我 | 官網');


$_keywords = '正義聯盟,正義聯盟建案,正義聯盟社區,五股正義聯盟,五股建案,五股買房,洲子洋重劃區建案,五股新建案';
$_description = '怪獸級18坪2房、零負評27坪3房，大台北高房價剋星，E化超能建築，北市豪宅大師呂建勳攜手宇宙超級英雄團隊，這一次要拯救你的成家夢想。接待中心：新北市五股區新五路二段558號，正義聯盟專線：02-2293-1666';
$_thumbnail =  _WEBSITE_ . '/img/opengraph.jpg';
$_favicon = 'img/favicon.png';

define('_KEYWORDS_', $_keywords);
define('_DESCRIPTION_', $_description);
define('_THUMBNAIL_', $_thumbnail);
define('_FAVICON_', $_favicon);

$get_page_name = explode('/', $_SERVER["PHP_SELF"]);
$get_page_name = explode('.', $get_page_name[count($get_page_name) - 1])[0];

function getUpdatedHtmlTag($files, $id = false)
{
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
                echo '<script src="' . $file . '?v=' . $timestamp . '"></script>' . "\n";
                break;

            case 'css':
                echo '<link rel="stylesheet" href="' . $file . '?v=' . $timestamp . '" ' . $id . ' />' . "\n";
                break;

            default:
        }
    }
}

function getFileVersion($file) {
    $ver = '';

    if (file_exists($file)) {
        $ver = '?v=' . filemtime($file);
    }

    echo _WEBSITE_ . '/' . $file . $ver;
}

?>
