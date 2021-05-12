<?php
#下3段式抓 為案件編號 $case_code
#$case_code_test 是用來判斷是否為1的測試頁
#$case_code = "jw";特殊案使用
$src =$_SERVER['SERVER_NAME']; 
$case_code_test = substr(substr($src,0,strpos($src,'.')),-1);
$case_code = substr($src,0,strpos($src,$case_code_test=='1'?'1':$case_code_test=='5'?'-':'.'));

$pdo = new pdo('mysql:host=localhost;dbname=htw_web', 'htw', '748aSgl5Ni');
$pdo->exec("SET NAMES 'utf8'");
$sql = "SELECT title,description,keyword,p0 FROM susers WHERE email = '" . $case_code . "'";
$dataList = $pdo->query($sql)->fetchAll();
$docTitle = $dataList[0]['title'];
$siteName = $dataList[0]['title'];
$docDesc = $dataList[0]['description'];
$keyWords = $dataList[0]['keyword'];
if ($dataList[0]['p0']) {
$p0 = "<meta name='facebook-domain-verification' content='". $dataList[0]['p0'] ."' />";
}
$ogType = 'website';
?>
<title><?php echo $docTitle; ?></title>
<meta name="description" content="<?php echo $docDesc ?>">
<meta name="keywords" content="<?php echo $keyWords ?>">
<meta property="og:locale" content="zh_TW" />
<meta property="og:type" content="<?php echo $ogType ?>" />
<meta property="og:title" content="<?php echo $docTitle; ?>" />
<meta property="og:description" content="<?php echo $docDesc ?>" />
<meta property="og:site_name" content="<?php echo $siteName; ?>" />
<meta name="twitter:description" content="<?php echo $docDesc ?>" />
<meta name="twitter:title" content="<?php echo $docTitle; ?>" />
<meta itemprop="name" content="<?php echo $docTitle; ?>">
<meta itemprop="description" content="<?php echo $docDesc ?>">
<?php echo $p0 ?>