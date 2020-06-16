<?php
include_once '_config/init.php';
include_once '_config/db.php';
include_once '_config/session.php';
include_once 'incl/startup.php';

$isEdit = isset($_GET['id']);

$division = 'booking';
$listPage = 'index.php';
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
                        <div class="box@md:8">
                            <h1>預約單</h1>
                        </div>
                        <hr class="hr-spacer">
                        <div class="box@md:4">
                            <div class="form_grp u-mgn-b:2rem">
                                <label class="form_label">客戶姓名</label>
                                <div class="form_ctrl">
                                    <input type="text" class="input" v-model="form.name" readonly>
                                </div>
                            </div>
                            <hr class="hr-double-line">
                            <div class="form_grp u-mgn-b:2rem">
                                <label class="form_label">職業</label>
                                <div class="form_ctrl">
                                    <input type="text" class="input" v-model="form.job" readonly>
                                </div>
                            </div>
                            <hr class="hr-double-line">
                            <div class="form_grp u-mgn-b:2rem">
                                <label class="form_label">居住地區</label>
                                <div class="form_ctrl">
                                    <input type="text" class="input" v-model="form.area" readonly>
                                </div>
                            </div>
                            <hr class="hr-double-line">
                            <div class="form_grp u-mgn-b:2rem">
                                <label class="form_label">聯絡電話</label>
                                <div class="form_ctrl">
                                    <input type="text" class="input" v-model="form.phone" readonly>
                                </div>
                            </div>
                            <hr class="hr-double-line">
                            <div class="form_grp u-mgn-b:2rem">
                                <label class="form_label">聯絡信箱</label>
                                <div class="form_ctrl">
                                    <input type="text" class="input" v-model="form.email" readonly>
                                </div>
                            </div>
                            <hr class="hr-double-line">
                            <div class="form_grp u-mgn-b:2rem">
                                <label class="form_label">客戶訊息</label>
                                <div class="form_ctrl">
                                    <textarea class="input" v-model="form.message" readonly></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="box@md:4">
                            <div class="form_grp u-mgn-b:2rem">
                                <label class="form_label">填單時間</label>
                                <div class="form_ctrl">
                                    <input type="text" class="input" v-model="form.created_at" readonly>
                                </div>
                            </div>
                            <hr class="hr-double-line">
                            <div class="form_grp u-mgn-b:2rem">
                                <label class="form_label">看屋狀態</label>
                                <div class="form_ctrl">
                                    <select class="input" v-model="form.booking">
                                        <option value="0">未聯繫</option>
                                        <option value="1">已預約</option>
                                        <option value="2">已取消</option>
                                        <option value="3">客戶失約</option>
                                        <option value="4">已完成看屋</option>
                                    </select>
                                </div>
                            </div>
                            <hr class="hr-double-line">
                            <div class="form_grp u-mgn-b:2rem">
                                <label class="form_label">備註</label>
                                <div class="form_ctrl">
                                    <textarea class="input" v-model="form.note"></textarea>
                                </div>
                            </div>
                            <hr class="hr-double-line">
                            <div class="flex f-align:j">
                                <div class="box">
                                    <a class="btn" href="index.php">取消</a>
                                </div>
                                <div class="box u-align:r">
                                    <button class="btn clr:primary" @click="save">送出</button>
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
