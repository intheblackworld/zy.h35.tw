<?php
include_once 'incl/startup.php';
?>
<!DOCTYPE html>
<html lang="zh-tw">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta name="author" content="" />
    <link rel="shortcut icon" href="img/favicon.png?v=1">
    <!--SEO meta-->
    <?php
    include_once 'incl/meta.php';
    // $city = $_POST['widget-contact-form-city'];
    // $area = $_POST['widget-contact-form-area'];
    ?>
    <title><?= _SITENAME_; ?></title>

    <link href="./css/plugins.css" rel="stylesheet">
    <link href="./css/style.css" rel="stylesheet">
    <link href="./css/responsive.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="./css/custom.css" />
    <link href="./css/color-variations/blue.css" rel="stylesheet" type="text/css" media="screen">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.0/jquery-confirm.min.css">

<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WN5W6J2');</script>
<!-- End Google Tag Manager -->
<script type="application/javascript">(function(w,d,t,r,u){w[u]=w[u]||[];w[u].push({'projectId':'10000','properties':{'pixelId':'10084299'}});var s=d.createElement(t);s.src=r;s.async=true;s.onload=s.onreadystatechange=function(){var y,rs=this.readyState,c=w[u];if(rs&&rs!="complete"&&rs!="loaded"){return}try{y=YAHOO.ywa.I13N.fireBeacon;w[u]=[];w[u].push=function(p){y([p])};y(c)}catch(e){}};var scr=d.getElementsByTagName(t)[0],par=scr.parentNode;par.insertBefore(s,scr)})(window,document,"script","https://s.yimg.com/wi/ytc.js","dotq");</script>
</head>

<body style="background: #333; display: block !important; opacity: 1 !important;">

<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WN5W6J2"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->

    <!-- Wrapper -->
    <div id="wrapper" style="background:#c8c300;">

    <section class="p-t-60 m-t-0" style="background:#333;    background: #333;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;">
            <div class="container">
                <div class="row">
                    <div class="col-md-4 col-md-offset-4 text-center text-light">
                        <!-- <img class="img-responsive m-b-20 p-30" src="images/logo.png?d=2" alt=""> -->
                        <h2 class="m-b-10" style="color: #fff;text-align: center;margin-bottom: 20px;font-size: 32px;">感謝您的來電</h2>
                        <!-- <p class="lead" style="color: #fff;text-align: center;margin-bottom: 20px;font-size: 24px;">感謝您的預約，我們將會有專人跟您聯繫</p> -->
                        <a class="m-t-10 btn btn-rounded btn-reveal btn-xs btn_tel" href="/" style="    color: #fff;text-align: center;margin-bottom: 20px;font-size: 24px;border: 1px solid #fff;padding: 10px;margin: 0 auto;display: block;"><span>回首頁</span><i class="fa fa-home"></i></a>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <!-- end: Wrapper -->

    <!--Plugins-->
    <script src="./js/jquery.js"></script>

    <script src="./js/plugins.js"></script>

    <!--Template functions-->
    <script src="./js/functions.js"></script>

    <script src="./js/custom.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.0/jquery-confirm.min.js"></script>

    <script type="text/javascript">
    $( document ).ready(function() {
        document.location.href="tel:0222931666";
    });
    </script>

</body>

</html>
