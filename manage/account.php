<?php
include_once '_config/init.php';
include_once '_config/db.php';
include_once '_config/session.php';
include_once 'incl/startup.php';

$isEdit = isset($_GET['id']);

$division = 'account';
$listPage = 'accounts.php';
?>
<!DOCTYPE html>
<html lang="<?=_LANG_;?>"
      itemscope
      itemtype="http://schema.org/WebSite"
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
            <?php include_once 'incl/header.php';?>
            <div class="wrap">
                <main class="container">
                    <div class="flex f-align:c">
                        <div class="box@md:6">
                            <header class="container-header">
                                <h1><?=$isEdit ? '編輯' : '新增';?>帳戶</h1>
                            </header>
                            <hr class="hr-spacer">
                            <div class="form_grp is:required u-mgn-b:2rem" :class="{'is:danger' : hasError.email}">
                                <label class="form_label">Email</label>
                                <div class="form_ctrl">
                                    <input type="text" class="input" v-model="form.email" @input="eMailValidator" @blur="validator">
                                    <span class="form_note" v-if="error.email">{{msg.email}}</span>
                                </div>
                            </div>
                            <hr class="hr-double-line">
                            <div class="form_grp <?=(!isset($_GET['id']) ? 'is:required' : '');?> u-mgn-b:2rem" <?=(!isset($_GET['id']) ? ':class="{\'is:danger\': hasError.new_password}"' : '');?>>
                                <label class="form_label">密碼</label>
                                <div class="form_ctrl u-mgn-b:1rem">
                                    <input type="text" class="input" v-model="form.new_password" <?=(!isset($_GET['id']) ? '@blur="validator"' : '');?>>
                                </div>
                                <div class="form_ctrl">
                                    <button class="btn" @click="generatePassword">產生密碼</button>
                                </div>
                            </div>
                            <hr class="hr-double-line">
                            <div class="form_grp u-mgn-b:2rem">
                                <label class="form_label">管理權限</label>
                                <div class="form_ctrl u-mgn-b:1rem">
                                    <div class="option-grp">
                                        <label class="option">
                                            <input type="radio" class="option_input" v-model="form.grade" name="grade" value="1">
                                            <span class="option_obj">一般使用者</span>
                                        </label>
                                        <label class="option">
                                            <input type="radio" class="option_input" v-model="form.grade" name="grade" value="2">
                                            <span class="option_obj">管理員</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <hr class="hr-double-line">
                            <div class="form_grp u-mgn-b:2rem">
                                <label class="form_label">使用狀態</label>
                                <div class="form_ctrl u-mgn-b:1rem">
                                    <div class="option-grp">
                                        <label class="option">
                                            <input type="radio" class="option_input" v-model="form.status" name="status" value="1" checked>
                                            <span class="option_obj">啟用</span>
                                        </label>
                                        <label class="option">
                                            <input type="radio" class="option_input" v-model="form.status" name="status" value="2">
                                            <span class="option_obj">停用</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <hr class="hr-double-line">
                            <div class="flex f-align:j">
                                <div class="box">
                                    <a class="btn" href="accounts.php">取消</a>
                                </div>
                                <div class="box u-align:r">
                                    <button class="btn clr:primary" @click="save" :disabled="!status.usableSubmit">送出</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <?php include_once 'incl/notice.php';?>
            </div>
            <?php include_once 'incl/footer.php';?>
        </div>
        <?php include_once 'incl/script.php';?>
        <script>
            $.handler('<?=$division;?>', <?=isset($_GET['id']) ? $_GET['id'] : 'null';?>);
        </script>
    </body>
</html>
<?php mysqli_close($mysqli); ?>
<!-- $}Y)mgwvu9Dj -->
