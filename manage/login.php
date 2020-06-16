<?php
include_once '_config/init.php';
include_once '_config/db.php';
include_once 'incl/startup.php';

$siteKey = '6Lft1qsUAAAAAOLVkQuuXaWlHsprJ4Pw9iEd27r1';
$secret = '6Lft1qsUAAAAABzm3lB1tJayHZ5t8YQMlNEC5kEt';

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['recaptcha_response'])) {
    $recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
    $recaptcha_secret = $secret;
    $recaptcha_response = $_POST['recaptcha_response'];

    $recaptcha = file_get_contents($recaptcha_url . '?secret=' . $recaptcha_secret . '&response=' . $recaptcha_response);
    $recaptcha = json_decode($recaptcha);

    if ($recaptcha->success) {
        if (!isset($_SESSION['UID']) && !isset($_SESSION['TOKEN'])) {
            $adminEmail = mysqli_real_escape_string($mysqli, trim($_POST['email']));
            $adminPassword = mysqli_real_escape_string($mysqli, trim($_POST['password']));

            $adminPassword = md5($adminPassword);

            if (!empty($adminEmail) && !empty($adminPassword)) {

                $query = "SELECT id, grade
                          FROM account
                          WHERE email = '{$adminEmail}'
                          AND password = '{$adminPassword}'
                          AND status = 1";

                $res = mysqli_query($mysqli, $query);

                if ($res->num_rows) {
                    $row = mysqli_fetch_assoc($res);
                    $date = date('Y-m-d H:i:s');
                    $token = bin2hex(openssl_random_pseudo_bytes(32));

                    $query = "DELETE FROM loginUser WHERE uid = '{$row["id"]}'";
                    $res = mysqli_query($mysqli, $query);

                    if ($res) {

                        $query = "INSERT INTO loginUser SET
				                	uid = '{$row["id"]}',
				                	token = '{$token}',
				                	remote_addr = '{$_SERVER['REMOTE_ADDR']}',
				                	agent = '{$_SERVER['HTTP_USER_AGENT']}',
				                	login_time = '{$date}'
				                ";

                        if (mysqli_query($mysqli, $query)) {
                            session_regenerate_id();

                            $_SESSION['UID'] = $row['id'];
                            $_SESSION['TOKEN'] = $token;
                            $_SESSION['GRADE'] = +$row["grade"];
                            $_SESSION['LAST_REMOTE_ADDR'] = $_SERVER['REMOTE_ADDR'];
                            $_SESSION['LAST_USER_AGENT'] = $_SERVER['HTTP_USER_AGENT'];

                            header('Location: index.php');
                            exit();
                        }
                    }
                }
            }
        } else {
            $_SESSION = array();
            session_destroy();
            session_regenerate_id();

            $_SESSION['LAST_REMOTE_ADDR'] = $_SERVER['REMOTE_ADDR'];
            $_SESSION['LAST_USER_AGENT'] = $_SERVER['HTTP_USER_AGENT'];
        }
    }
}
?>
    <!DOCTYPE html>
    <html
        lang="<?=_LANG_;?>"
        itemscope itemtype="http://schema.org/WebSite"
        xmlns:og="http://ogp.me/ns#"
        xmlns:fb="https://www.facebook.com/2008/fbml">
    <head>
        <?php
        include_once 'incl/meta.php';
        include_once 'incl/setting.php';
        ?>
    </head>
    <body>
        <div id="app">
            <div class="login">
                <form class="flex f-align:c f-align:m" method="post" action="<?=$_SERVER['PHP_SELF'];?>">
                    <div class="form_grp box@md:4">
                        <h1 class="display-1 u-align:c u-mgn-b:2rem">Justice</h1>

                        <div class="form_ctrl u-mgn-b:1rem">
                            <input type="text" class="input" placeholder="Account" name="email" v-model="email" @blur="validate">
                        </div>
                        <div class="form_ctrl u-mgn-b:1rem">
                            <input type="password" class="input" placeholder="Password" name="password" v-model="password" @blur="validate">
                        </div>
                        <div class="divider-dots"></div>
                        <div class="form_ctrl u-align:c">
                            <input type="hidden" name="recaptcha_response" v-model="recaptch" value="">
                            <input type="submit" class="btn-outline clr:primary :rounded" value="Login" name="submit" :disabled="!usableSubmit">
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <?php include_once 'incl/script.php';?>
        <script src='//www.google.com/recaptcha/api.js?hl=zh-TW&render=<?=$siteKey;?>'></script>
        <script>
            $.login();

            grecaptcha.ready(function() {
                grecaptcha.execute('<?=$siteKey;?>', {action: 'login'}).then(function(token) {
                    vm.recaptch = token
                });
            });
        </script>
    </body>
</html>
<?php mysqli_close($mysqli); ?>
