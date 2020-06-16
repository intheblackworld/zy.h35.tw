<?php
include_once '_config/init.php';
include_once '_config/db.php';
include_once '_config/session.php';
include_once 'incl/startup.php';

if ($_SESSION['GRADE'] < 2) {
    header('Location:index.php');
}

$table = 'account';

$query = "SELECT id, email, grade, status
          FROM {$table}
          WHERE status != 0
          AND grade != 9";

$res = mysqli_query($mysqli, $query);
$row = array();

if (mysqli_num_rows($res)) {
    foreach($res as $key => $value) {
        array_push($row, $value);
    }
}
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
                    <header class="container-header">
                        <h1>帳戶管理</h1>
                        <a class="btn clr:primary" href="account.php">
                            <i class="icon fas fa-plus"></i>
                            新增
                        </a>
                    </header>
                    <hr class="hr-spacer">
                    <template v-if="items && items.length">
                        <table class="table :outline :responsive-card">
                            <thead>
                            <tr>
                                <th>帳號</th>
                                <th>權限</th>
                                <th width="10%"></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="v in range(page.start, page.end)" v-if="items[v]">
                                <td data-label="帳號">{{items[v].email}}</td>
                                <td data-label="權限">{{+items[v].grade > 1 ? '管理員' : '一般使用者'}}</td>
                                <td class="u-text-wrap:nw">
                                    <a class="btn-link" :href="'account.php?id=' + items[v].id">
                                        <i class="icon far fa-eye"></i>
                                    </a>
                                    <button class="btn-link" @click="dele(items[v].id, items[v].email, v)">
                                        <i class="icon far fa-trash-alt"></i>
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <?php include_once 'incl/pagination.php';?>
                    </template>
                    <div class="empty-tip" v-else>
                        <div class="empty-tip_symbol">
                            <i class="fas fa-info-circle"></i>
                        </div>
                        <h6 class="empty-tip_title">沒有資料</h6>
                        <p>目前還沒有建立任何資料，按下「新增帳戶」開始建立帳戶</p>
                        <a class="btn clr:primary" href="account.php">新增帳戶</a>
                    </div>
                </main>
                <?php include_once 'incl/notice.php';?>
            </div>
            <?php include_once 'incl/footer.php';?>
        </div>
        <?php include_once 'incl/script.php';?>
        <script>
            $.list('account', <?=count($row) ? json_encode($row, JSON_UNESCAPED_UNICODE) : '[]';?>);
        </script>
    </body>
</html>
<?php mysqli_close($mysqli); ?>
