<?php
include_once '_config/init.php';
include_once '_config/db.php';
include_once '_config/session.php';
include_once 'incl/startup.php';

$table = 'booking';

$query = "SELECT
            b.id as id,
            b.name as name,
            b.job as job,
            b.phone as phone,
            b.email as email,
            b.message as message,
            b.note as note,
            b.booking as booking,
            b.created_at as created_at,
            (SELECT name FROM city WHERE id = b.city_id) as city,
            (SELECT name FROM district WHERE id = b.district_id) as district
          FROM {$table} as b
          WHERE b.status != 0";

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
                        <h1>預約看屋</h1>
                        <button class="btn clr:dark" :disabled="!(items && items.length)" @click="downloadXLSX">
                            <i class="icon fas fa-plus"></i>
                            匯出名單
                        </button>
                    </header>
                    <hr class="hr-spacer">
                    <template v-if="items && items.length">
                        <table class="table :outline :responsive-card">
                            <thead>
                            <tr>
                                <th>客戶姓名</th>
                                <th>填單時間</th>
                                <th>地區</th>
                                <th width="20%">預約狀況</th>
                                <th width="10%"></th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="v in range(page.start, page.end)" v-if="items[v]">
                                    <td data-label="客戶姓名">{{items[v].name}}</td>
                                    <td data-label="填單時間">{{items[v].created_at}}</td>
                                    <td data-label="地區">{{items[v].city + items[v].district}}</td>
                                    <td data-label="預約狀況">
                                        <span :class="{
                                            'u-clr:danger': +items[v].booking === 0,
                                            'u-clr:success': +items[v].booking === 1,
                                            'u-bk:40': +items[v].booking === 2,
                                            'u-clr:warning': +items[v].booking === 3
                                        }">
                                            {{bookingStatus(items[v].booking)}}
                                        </span>
                                    </td>
                                    <td class="u-text-wrap:nw">
                                        <a class="btn-link" :href="'booking.php?id=' + items[v].id">
                                            <i class="icon far fa-eye"></i>
                                        </a>
                                        <button class="btn-link" @click="dele(items[v].id, items[v].name, v)">
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
                        <p>目前還沒有任何預約，請等待資料</p>
                    </div>
                </main>
                <?php include_once 'incl/notice.php';?>
            </div>
            <?php include_once 'incl/footer.php';?>
        </div>
        <?php include_once 'incl/script.php';?>
        <script>
            $.list('booking', <?=count($row) ? json_encode($row, JSON_UNESCAPED_UNICODE) : '[]';?>);
        </script>
    </body>
</html>
<?php mysqli_close($mysqli); ?>
