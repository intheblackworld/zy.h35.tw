<?php
include_once 'incl/startup.php';
$NewString = $_SERVER['HTTP_HOST'];

$TryStrpos = strpos($NewString, 'localhost');

if ($TryStrpos === false) {
    $title = "";
    $description = "";
    $keyword = "";
    $caseurl = "zy";

    $db_host = 'localhost';
    $db_user = 'htw';
    $db_pass = '748aSgl5Ni';
    $db_name = 'htw_web';
    $con = mysql_connect($db_host, $db_user, $db_pass);
    mysql_query("SET NAMES UTF8");
    mysql_select_db($db_name, $con);
    $query = "SELECT title,description,keyword FROM susers WHERE email = 'zy'";
    $result = mysql_query($query, $con);
    $row = mysql_fetch_row($result);

    $title = $row[0];
    $description = $row[1];
    $keyword = $row[2];
}
?>
<!DOCTYPE html>
<html lang="<?= _LANG_; ?>" itemscope itemtype="http://schema.org/WebSite" xmlns:og="http://ogp.me/ns#" xmlns:fb="https://www.facebook.com/2008/fbml">

<head>
    <?php
    include_once 'incl/meta.php';
    // $city = $_POST['widget-contact-form-city'];
    // $area = $_POST['widget-contact-form-area'];
    ?>
    <title><?= _SITENAME_; ?></title>

    <!-- house info -->
    <link href="css/template/contact-section.css?v1" rel="stylesheet" />
    <link href="css/template/form.css?v1" rel="stylesheet" />
    <link href="css/template/house-info.css" rel="stylesheet" />
    <link href="css/template/mobile-nav.css" rel="stylesheet" />
    <link href="css/template/footer.css?v1" rel="stylesheet" />
    <link href="css/template/dialog.css" rel="stylesheet" />
    <link href="css/template/indigator.css?v1" rel="stylesheet" />
    <link href="css/template/css/all.min.css" type="text/css" rel="stylesheet" />
    <!-- Google Tag Manager -->
    <link rel="stylesheet" href="css/style.css?v=16">
    <script>
        (function(w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js'
            });
            var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src =
                'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-WN5W6J2');
    </script>
    <!-- End Google Tag Manager -->
</head>

<body class="stop-scroll">
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WN5W6J2" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    <div id="app">

        <header class="header">
            <div class="header_logo">
                <a href="#kv" @click="setPage('dot-1')"><img src="img/logo.png" alt="正義聯盟 | 七大逆天神力，給你成家超能力"></a>
            </div>
            <div class="header_inner">
                <ul class="menu">
                    <li class="menu_item" v-for="(item, index) in menu">
                        <a class="menu_link" :href="`#section-${item.anchor}`" @click="setPage(item.dot)">
                            <img :src="item.icon" class="menu_icon" :alt="'正義聯盟-'+item.title">
                            {{item.title}}
                        </a>
                    </li>
                    <li class="menu_item">
                        <a class="menu_link js-news" @click="switchStatus('newsModal', true)">
                            <img src="img/icon-reservation.png" class="menu_icon" alt="正義聯盟-最新消息">
                            最新消息
                        </a>
                    </li>
                </ul>

                <ul class="social">
                    <li class="social_item">
                        <a class="social_link social-fb" href="#section-p10" @click="setPage('dot-11')">
                            <img src="img/icon-fb.png" alt="正義聯盟facebook">
                        </a>
                    </li>
                    <li class="social_item">
                        <a class="social_link social-msg" href="#section-p10" @click="setPage('dot-11')">
                            <img src="img/icon-messager.png" alt="正義聯盟messager">
                        </a>
                    </li>
                    <li class="social_item">
                        <a class="social_link social-map" href="#section-p10" @click="setPage('dot-11')">
                            <img src="img/icon-map.png" alt="正義聯盟地圖">
                        </a>
                    </li>
                </ul>
            </div>

            <div class="header_mobile">
                <button class="menu_switch" :class="{on: status.sidemenu}" @click="switchSidemenuStatus" aria-label="選單">
                    <span class="menu_line"></span>
                    <span class="menu_line"></span>
                    <span class="menu_line"></span>
                </button>
            </div>
        </header>

        <div class="indigator" v-if="!isMobile">
            <div class="list-indigator">
                <a :class="`dot active`" id="dot-1" href="#kv" @click="setPage('dot-1')"></a>
                <a :class="`dot`" id="dot-2" href="#kv2" @click="setPage('dot-2')"></a>
                <a :class="`dot`" id="dot-3" href="#section-p2" @click="setPage('dot-3')"></a>
                <a :class="`dot`" id="dot-4" href="#section-p3" @click="setPage('dot-4')"></a>
                <a :class="`dot`" id="dot-5" href="#section-p4" @click="setPage('dot-5')"></a>
                <a :class="`dot`" id="dot-6" href="#section-p5" @click="setPage('dot-6')"></a>
                <a :class="`dot`" id="dot-7" href="#section-p6" @click="setPage('dot-7')"></a>
                <a :class="`dot`" id="dot-8" href="#section-p7" @click="setPage('dot-8')"></a>
                <a :class="`dot`" id="dot-9" href="#section-p8" @click="setPage('dot-9')"></a>
                <!-- <a :class="`dot`" id="dot-10" href="#section-p9" @click="setPage('dot-10')"></a> -->
                <!-- <a :class="`dot`" id="dot-11" href="#section-p10" @click="setPage('dot-11')"></a> -->
                <!-- <a :class="`dot`" href="#section-reservation"></a> -->
            </div>
            <a :class="`contact-indigator`" href="#section-p9">預約賞屋</a>
        </div>
        <!-- <div class="reservation" v-if="!isMobile" @click="setPageTransform('p8')">
            <a class="reservation_link js-reservation">
                預約賞屋
            </a>
        </div> -->

        <div class="reservation" v-if="isMobile" @click="switchStatus('footer', !status.footer)">
            <a class="reservation_link js-reservation" href="#section-p9">
                預約賞屋
            </a>
        </div>

        <div class="sidemenu" :class="{on: status.sidemenu}">
            <nav class="sidemenu_inner">
                <ul class="sidemenu_menu" @click="switchSidemenuStatus">
                    <li class="menu_item" v-for="(item, index) in menu">
                        <a class="menu_link" :href="`#section-${item.anchor}`" @click="setPage(item.dot)">
                            <img :src="item.icon" class="menu_icon" :alt="'正義聯盟-'+item.title">
                            {{item.title}}
                        </a>
                    </li>
                    <li class="menu_item">
                        <a class="menu_link js-reservation" @click="switchStatus('newsModal', true)">
                            <img src="img/icon-reservation.png" class="menu_icon" alt="正義聯盟-最新消息">
                            最新消息
                        </a>
                    </li>
                </ul>

                <ul class="sidemenu_social">
                    <li class="social_item">
                        <a class="social_link social-fb" href="#section-p10" @click="setPage('dot-11')">
                            <img src="img/icon-fb.png" alt="正義聯盟facebook">
                        </a>
                    </li>
                    <li class="social_item">
                        <a class="social_link social-msg" href="#section-p10" @click="setPage('dot-11')">
                            <img src="img/icon-messager.png" alt="正義聯盟facebook messager">
                        </a>
                    </li>
                    <li class="social_item">
                        <a class="social_link social-map" href="#section-p10" @click="setPage('dot-11')">
                            <img src="img/icon-map.png" alt="正義聯盟地圖">
                        </a>
                    </li>
                </ul>
            </nav>
        </div>

        <div id="cover" class="cover cover-kv" :class="{out: !status.cover}">
            <div class="cover_logo">
                <img src="img/cover-logo.png" alt="正義聯盟">
            </div>
        </div>

        <main class="wrapper" :style="pageStyleObject">
            <div id="kv" class="section section-kv on">
                <div class="kv_prelude">
                    <div class="kv_prelude_bg"></div>
                    <!-- <div class="kv-footer"></div> -->
                </div>
                <div class="prelude_title">
                    傳說中有一顆星球，<br class="show-under-sm" />在那裡錢與空間都會變大<br />
                    <span class="text-highlight">NOW！</span>
                    租屋終結者降臨<br />正義聯盟光速啟航，<br class="show-under-sm" />拯救地球人成家夢想！
                </div>

                <div class="prelude_bg">
                    <div class="superman">
                        <div class="superman_floating">
                            <div class="float_body">
                                <img src="img/superman.png" alt="superman">
                            </div>
                            <div class="float_cloak"></div>
                        </div>
                        <div class="superman_flying">
                            <div class="fly_body">
                                <img src="img/superman.png" alt="superman">
                            </div>
                            <div class="float_cloak"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="section section-kv " id="kv2">
                <div class="kv_story js-story">
                    <div class="compass">
                        <div class="compass_slide">
                            <div class="compass_item" v-for="(item, index) in compass.swiper" :data-compass-index="index">
                                <div class="compass_icon">
                                    <img :src="item.icon" :alt="item.name">
                                </div>
                                <div class="compass_name">
                                    <img :src="item.title" :alt="item.name">
                                </div>
                            </div>
                        </div>
                        <div class="compass_wrap">
                            <div class="compass_content text-border-lighter" v-html="compass.use.content"></div>
                        </div>
                    </div>
                    <div class="story_header">
                        <h2 class="story_title"><span class="text-highlight text-big">7</span>大宇宙超能力，加速成家購屋力</h2>
                        <span class="story_subtitle">終結租屋惡夢，青春正盛變身當房東！</span>
                    </div>
                    <div class="kv_story_bg"></div>
                </div>
            </div>

            <div class="section section-youtube-video" id="section-p2">
                <main class="youtube-video">

                    <div class="youtube-slideshow default">
                        <div class="slideshow_wrapper">
                            <template v-for="(item, key) in videos.items">
                                <div class="video_item video-embed">
                                    <iframe width="560" height="315" :src="'https://www.youtube.com/embed/'+item.videoId" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                </div>
                            </template>
                        </div>
                        <button class="slide-ctrl slide_prev" v-if="videos.items.length > 1" aria-label="上一張"></button>
                        <button class="slide-ctrl slide_next" v-if="videos.items.length > 1" aria-label="下一張"></button>
                        <div class="slide-dots" v-if="videos.items.length > 1">
                            <button class="slide-dot" v-for="(item, key) in videos.items" @click="setVideoActive(key)" :class="{active: key == videos.active}"></button>
                        </div>
                    </div>
                    <div class="leaflets">
                        <div class="leaflets-items embed" @click="triggerLeafletsModal(index)" v-for="(item, index) in leaflets.items">
                            <span class="embed_cover" :style="{ 'background-image': 'url(css/img/leaflets/' + item.thumb + ')' }"></span>
                            <img class="embed_img" :src="'css/img/leaflets/' + item.thumb" :alt="item.name">
                        </div>
                    </div>

                </main>
            </div>

            <div class="section section-livable" id="section-p3">
                <main class="livable planet-sec">
                    <div class="section_box livable_box"></div>
                    <div class="section_planet circle-livable">
                        <img src="img/p2-planet.png" class="hide-under-lg" alt="WOW 直擊衛星基地 美翻!宜居宜遊">
                    </div>
                    <div class="section_title monster_title">
                        <img src="img/title/p2-title.png" alt="WOW 直擊衛星基地 美翻!宜居宜遊">
                    </div>
                    <div class="section_content">
                        <p class="section_info">
                            52公頃浩瀚規格，北台灣最大自辦重劃區「洲子洋」，緊鄰424公頃「大台北都會公園」怪獸級綠海，媲美侏儸紀公園森林，超綠能超動能，激發生活超潛能！</p>
                    </div>
                    <button class="btn livable_btn" aria-label="觀看大圖" @click="switchStatus('livableModal', true)">觀看</button>

                    <div class="livable_bg"></div>
                </main>
            </div>

            <div class="section section-speed" id="section-p4">
                <main class="speed planet-sec">
                    <div class="section_box speed_box"></div>
                    <div class="section_planet circle-speed">
                        <img src="img/p3-planet.png" class="hide-under-lg" alt="BOOM 正義聯盟出擊 極速!時間超人">
                    </div>
                    <div class="section_title monster_title">
                        <img src="img/title/p3-title.png" alt="BOOM 正義聯盟出擊 極速!時間超人">
                    </div>
                    <div class="section_img">
                        <img src="img/p3-circle.png" alt="BOOM 正義聯盟出擊 極速!時間超人">
                    </div>
                    <div class="section_content">
                        <p class="section_info">
                            300秒新莊副都心，600秒台北國門，中山高、五楊高、汐五高三大高速公路網，台1、台64、台65、新北環快4大快速道，環狀線、蘆洲線、機場線、五股泰山線，超時空瞬間移動，多波漲幅高潮不斷，增值力超越新莊更勝新板！
                        </p>
                    </div>
                </main>
            </div>

            <div class="section section-monster" id="section-p5">
                <main class="monster planet-sec">
                    <div class="section_box monster_box"></div>
                    <div class="section_planet circle-monster">
                        <img src="img/p4-planet.png" class="hide-under-lg" alt="GOGO 侏羅紀大森林 綠光!環境超嗨">
                    </div>
                    <div class="section_title monster_title">
                        <img src="img/title/p4-title.png" alt="GOGO 侏羅紀大森林 綠光!環境超嗨">
                    </div>
                    <div class="section_content">
                        <p class="section_info">424公頃水岸大台北都會公園，霸氣搶占16座大安森林公園，橫跨侏儸紀恐龍時代壯闊綠海，高濃度芬多精鮮氧刺激活化細胞，樂陶陶微醺漫步雲端步調，揪團共遊樂活節奏！</p>
                    </div>
                    <div class="custom_slideshow monster-slideshow default">
                        <div class="slideshow_wrapper">
                            <template v-for="(item, key) in slideshow['monster'].items">
                                <div class="slideshow-item" :class="{active: key == slideshow['monster'].active}" :key="key" :style="{ 'background-image': 'url(css/img/monster/' + item.pic + ')' }"></div>
                                <img class="slideshow-hide" :src="'css/img/monster/' + item.pic" :alt="item.name + ' - 正義連盟侏羅紀大森林'">
                            </template>
                        </div>
                    </div>
                    <div class="slideshow_title">{{slideshow['monster'].items[slideshow['monster'].active].name}}</div>

                    <div class="monster_bg"></div>
                </main>
            </div>

            <div class="section section-greensea" id="section-p6">
                <main class="greensea planet-sec">
                    <div class="section_box greensea_box"></div>
                    <div class="section_planet circle-greensea">
                        <img src="img/p5-planet.png" class="hide-under-lg" alt="YOYO 全方位大商圈 便利!激動超人">
                    </div>
                    <div class="section_title greensea_title">
                        <img src="img/title/p5-title.png" alt="YOYO 全方位大商圈 便利!激動超人">
                    </div>
                    <div class="section_content">
                        <p class="section_info">工商路戰鬥級全方位商圈，全聯、屈臣氏、寶雅、燦坤…藥妝百貨到位，郵局銀行超商金流便利到位！麥當勞、85度C、傳統市場、美食小吃吃好飽喝足好日子一舉到位！</p>
                    </div>
                    <div class="custom_slideshow greensea-slideshow default">
                        <div class="slideshow_wrapper">
                            <template v-for="(item, key) in slideshow['greensea'].items">
                                <div class="slideshow-item" :class="{active: key == slideshow['greensea'].active}" :key="key" :style="{ 'background-image': 'url(css/img/greensea/' + item.pic + ')' }"></div>
                                <img class="slideshow-hide" :src="'css/img/greensea/' + item.pic" :alt="item.name + ' - 正義連盟全方位大商圈'">
                            </template>
                        </div>
                    </div>

                    <div class="slideshow_title">{{slideshow['greensea'].items[slideshow['greensea'].active].name}}</div>

                    <div class="greensea_bg"></div>
                </main>
            </div>

            <div class="section section-team" id="section-p7">
                <main class="team">
                    <div class="section_title team_title">
                        <img src="img/title/p7-title.png" class="p7-title show-under-lg" alt="COOL 正義聯盟出擊">
                    </div>
                    <div class="team_shield">
                        <div class="shield"><img src="img/team/shield.png"></div>
                        <div class="shield_bg"></div>
                        <div class="team_public">
                            <div class="team_content">
                                <div class="team_name">
                                    <img src="img/team/public-info.png" alt="正義聯盟外觀設計 徐慈姿">
                                </div>
                                <button class="btn team_work" @click="triggerTeamModal('female')" aria-label="開啟作品">經典作品</button>
                            </div>
                            <div class="team_cover">
                                <img src="img/team/public.png" alt="正義聯盟外觀設計 徐慈姿">
                            </div>
                        </div>
                        <div class="team_exterior">
                            <div class="team_content">
                                <div class="team_name">
                                    <img src="img/team/exterior-info.png" alt="正義聯盟外觀設計 呂建勳">
                                </div>
                                <button class="btn team_work" @click="triggerTeamModal('male')" aria-label="開啟作品">經典作品</button>
                            </div>
                            <div class="team_cover">
                                <img src="img/team/exterior.png" alt="正義聯盟外觀設計 呂建勳">
                            </div>
                        </div>
                    </div>
                    <div class="section_content team-content">
                        <img src="img/title/p7-title.png" class="p7-title hide-under-lg" alt="COOL 正義聯盟出擊">
                        <p class="section_info team-info">正義聯盟重裝出擊，最強戰力磅礡登場，哈佛名門億萬豪宅御用建築設計師，聯手兩岸盛名珩荷空間設計總監徐慈姿，以台北十大豪宅規格，七星級飯店公設，國際級水岸公園生活，釋放宇宙最強超硬派設計天團能量。</p>
                    </div>
                    <div class="team-footer"></div>
                </main>
            </div>

            <div class="section section-intro" id="section-p8">
                <main class="intro">
                    <button class="intro_open" :class="{on: status.intro}" @click="switchStatus('intro', true)" aria-label="開啟正義聯盟基本資料"></button>
                    <div class="intro_content text-border-white" :class="{on: status.intro}">
                        <h2 class="intro_title">【正義聯盟基本資料】</h2>
                        <div class="intro_info">
                            <dl class="intro_dl">
                                <dt class="intro_dt">建造執照：</dt>
                                <dd class="intro_dd">108股建字第00042號</dd>
                                <dt class="intro_dt">建設公司：</dt>
                                <dd class="intro_dd">中德建設股份有限公司</dd>
                                <dt class="intro_dt">建築師：</dt>
                                <dd class="intro_dd">呂建勳建築師</dd>
                                <dt class="intro_dt">公設比：</dt>
                                <dd class="intro_dd">32.5%</dd>
                                <dt class="intro_dt">容積率：</dt>
                                <dd class="intro_dd">299.99%</dd>
                                <dt class="intro_dt">建蔽率：</dt>
                                <dd class="intro_dd">36.99%</dd>
                                <dt class="intro_dt">基地坪數：</dt>
                                <dd class="intro_dd">832.37坪</dd>
                                <dt class="intro_dt">基地位置：</dt>
                                <dd class="intro_dd">新北市五股區新五路三段2號旁</dd>
                                <dt class="intro_dt">企劃銷售：</dt>
                                <dd class="intro_dd">海沃創意行銷</dd>
                                <dt class="intro_dt">銷售坪數：</dt>
                                <dd class="intro_dd">18-33坪</dd>
                                <dt class="intro_dt">樓層規劃：</dt>
                                <dd class="intro_dd">A棟地上14樓、B棟地上14樓，地下6層</dd>
                                <dt class="intro_dt">可售戶數：</dt>
                                <dd class="intro_dd">182戶</dd>
                                <dt class="intro_dt">汽車車位：</dt>
                                <dd class="intro_dd">205車位</dd>
                                <dt class="intro_dt">本案特色：</dt>
                                <dd class="intro_dd">大廳挑高約4米2、百坪公設大會館</dd>
                                <dd class="intro_dd">約二百坪景觀中庭花園、空中花園</dd>
                            </dl>
                        </div>
                        <button class="intro_close" :class="{on: status.intro}" @click="switchStatus('intro', false)" aria-label="關閉正義聯盟基本資料"></button>
                    </div>
                    <div class="intro_bulid">
                        <img src="img/bulid.png" alt="正義聯盟">
                    </div>
                    <div class="intro_cover"></div>
                </main>
            </div>
            <div style="background: #fff">
                <!-- 預約參觀區塊 -->
                <!-- 公版開始 -->
                <section class="sectionMP" style="padding: 0;height: auto;" id="section-p9">
                    <div class="order-bg">
                        <h3 class="order-title">預約賞屋</h3>
                        <h3 class="order-subtitle"></h3>
                        <div class="order section section-template">
                            <div>
                                <form id="myform" class="form" action="contact-form.php" role="form" method="post">
                                    <div class="group">
                                        <div class="row">
                                            <label><span style="color: red">*</span> 姓名</label>
                                            <input id="name" type="text" aria-required="true" name="widget-contact-form-name" class="form-control required name" placeholder="" />
                                        </div>
                                        <div class="row">
                                            <label><span style="color: red">*</span> 手機</label>
                                            <input id="phone" type="text" name="widget-contact-form-phone" class="form-control required" placeholder="" />
                                        </div>
                                        <div class="row">
                                            <label>E-mail</label>
                                            <input id="email" type="email" aria-required="true" name="widget-contact-form-email" class="form-control email" placeholder="" />
                                        </div>
                                        <div class="row">
                                            <label>居住城市</label>
                                            <select id="selectcity" name="widget-contact-form-city" class="form-control" style="height:56px;"></select>
                                        </div>
                                        <div class="row">
                                            <label>居住地區</label>
                                            <select id="selectarea" name="widget-contact-form-area" class="form-control" style="height:56px;"></select>
                                            </el-select>
                                        </div>
                                    </div>
                                    <div class="group">
                                        <div class="row">
                                            <textarea type="text" class="form-control" id="widget-contact-form-antispam" name="widget-contact-form-msg" placeholder="輸入您的留言"></textarea>
                                            <input type="hidden" id="utm_source" value="<?= $_GET['utm_source'] ?>" name="utm_source">
                                            <input type="hidden" id="utm_medium" value="<?= $_GET['utm_medium'] ?>" name="utm_medium">
                                            <input type="hidden" id="utm_content" value="<?= $_GET['utm_content'] ?>" name="utm_content">
                                            <input type="hidden" id="utm_campaign" value="<?= $_GET['utm_campaign'] ?>" name="utm_campaign">
                                        </div>
                                    </div>
                                </form>
                                <div class="control" style="text-align: center;">
                                    <input type="checkbox" id="checkbox_form" class="messageCheckbox privacy-checkbox form-check-input" style="width: 17px;height: 17px;">
                                    <span class="privacy-announce">本人知悉並同意<a @click="switchStatus('agreementModal', true)"><span>『個資告知事項聲明』</span></a>內容</span>
                                    <div style="color:#f00 !important;" id="msgerror" class="m-b-10"></div>
                                </div>
                                <script src="https://www.google.com/recaptcha/api.js" async defer></script>
                            <div class="g-recaptcha"  style="width: 304px;margin: 0 auto;z-index:2;" data-sitekey="6Lep-78UAAAAAMaZLtddpvpixEb8cqu7v7758gLz"></div>
                                <a href="javascript:SendScore();" class="form-submit" id="form-submit" style="display: flex;justify-content: center;align-items: center;">
                                    立即預約
                                </a>
                            </div>
                            <script type="text/javascript" src="js/form.js?v3"></script>
                        </div>
                        <div class="contact-info section section-contact" id="section-p10">
                            <img class="logo" src="css/template/logo.png" alt />
                            <div class="info">
                                <div class="btn flex-c" @click="showCallDialog()">
                                    <span class="flex-c">
                                        <i class="fa fa-phone"></i>
                                        02-2293-1666
                                    </span>
                                </div>
                                <a class="btn flex-c hidden-xs" href="https://m.me/2066330633489731" target="_blank" @click="window.dotq = window.dotq || [];

window.dotq.push(

{

  'projectId': '10000',

  'properties': {

    'pixelId': '10084299',

    'qstrings': {

      'et': 'custom',

      'ea': 'FB10084299'

    }

} } );
">
                                    <span class="flex-c">
                                        <i class="fab fa-facebook-messenger"></i>FB Messenger 諮詢
                                    </span>
                                </a>
                                <div class="btn flex-c visible-xs" @click="showMessengerDialog()">
                                    <span class="flex-c">
                                        <i class="fab fa-facebook-messenger"></i>FB Messenger 諮詢
                                    </span>
                                </div>
                                <a class="btn flex-c" href="https://www.facebook.com/%E6%AD%A3%E7%BE%A9%E8%81%AF%E7%9B%9F-%E5%B0%8F%E5%AE%85%E8%AE%8A%E8%BA%AB-%E6%AD%A3%E7%BE%A9%E7%9C%8B%E6%88%91-2066330633489731/" target="_blank">
                                    <span class="flex-c">
                                        <i class="fab fa-facebook-f"></i>前往粉絲專頁
                                    </span>
                                </a>
                                <div class="address flex-c">新北市五股區新五路二段558號旁</div>
                                <a class="google-btn flex-c hidden-xs" href="https://goo.gl/maps/md3qUjA8GZr4WwGK6" target="_blank" @click="window.dotq = window.dotq || [];

window.dotq.push(

{

  'projectId': '10000',

  'properties': {

    'pixelId': '10084299',

    'qstrings': {

      'et': 'custom',

      'ea': 'map10084299'

    }

} } );">
                                    <span class="flex-c">
                                        <i class="fab fa-facebook-messenger"></i>導航 Google 地圖
                                    </span>
                                </a>
                                <div class="google-btn flex-c visible-xs" @click="showMapDialog()">
                                    <span class="flex-c">
                                        <i class="fas fa-map-marker-alt"></i>導航 Google 地圖
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div style="padding-top: 1px;"></div>
                        <div class="google-map">
                            <iframe title="googlemap" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14453.945935711365!2d121.4427984!3d25.0853884!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb5b865f4dbe302b9!2z5q2j576p6IGv55uf!5e0!3m2!1szh-TW!2stw!4v1578392028255!5m2!1szh-TW!2stw" width="100%" height="455" frameBorder="0" style="border: 0" allowFullScreen></iframe>
                        </div>
                    </div>
                </section>
                <div class="footer">
                    <img src="./css/img/footerLogo.png" alt="心天畝的圖片" />
                    <a href=" https://www.h35.tw/admin/test/login.php" target="_blank">網頁製作</a>
                </div>
                <!-- <div class="footer">
                    <img src="./img/footerLogo.png?v1" alt />
                    <a href=" https://www.h35.tw/admin/test/login.php" target="_blank">網頁製作</a>
                </div> -->
                <script type="text/javascript">
                    var mobiles = new Array(
                        "midp", "j2me", "avant", "docomo", "novarra", "palmos", "palmsource",
                        "240x320", "opwv", "chtml", "pda", "windows ce", "mmp/",
                        "blackberry", "mib/", "symbian", "wireless", "nokia", "hand", "mobi",
                        "phone", "cdm", "up.b", "audio", "sie-", "sec-", "samsung", "htc",
                        "mot-", "mitsu", "sagem", "sony", "alcatel", "lg", "eric", "vx",
                        "NEC", "philips", "mmm", "xx", "panasonic", "sharp", "wap", "sch",
                        "rover", "pocket", "benq", "java", "pt", "pg", "vox", "amoi",
                        "bird", "compal", "kg", "voda", "sany", "kdd", "dbt", "sendo",
                        "sgh", "gradi", "jb", "dddi", "moto", "iphone", "android",
                        "iPod", "incognito", "webmate", "dream", "cupcake", "webos",
                        "s8000", "bada", "googlebot-mobile"
                    )
                    var ua = navigator.userAgent.toLowerCase();

                    var isMobile = false;

                    for (var i = 0; i < mobiles.length; i++) {
                        if (ua.indexOf(mobiles[i]) > 0) {
                            isMobile = true;
                            break;
                        }
                    }
                    const callAndRedirectToThanks = () => {
                        // document.location.href = 'tel:22931666';
                        window.dotq = window.dotq || [];

                        window.dotq.push(

                            {

                                'projectId': '10000',

                                'properties': {

                                    'pixelId': '10084299',

                                    'qstrings': {

                                        'et': 'custom',

                                        'ea': 'call10084299'

                                    }

                                }
                            });
                        window.location.href = "call.php";
                        // 跳轉感謝頁
                    }

                    const showCallDialog = () => {
                        if (!isMobile) {
                            return
                        }
                        $('.call-dialog').addClass('show')
                        $('.mobile-nav').addClass('on')
                    }

                    const hideCallDialog = () => {
                        $('.call-dialog').removeClass('show')
                        // $('.mobile-nav').removeClass('on')
                    }

                    const showMessengerDialog = () => {
                        if (!isMobile) {
                            window.dotq = window.dotq || [];

                            window.dotq.push(

                                {

                                    'projectId': '10000',

                                    'properties': {

                                        'pixelId': '10084299',

                                        'qstrings': {

                                            'et': 'custom',

                                            'ea': 'FB10084299'

                                        }

                                    }
                                });

                            window.open('https://m.me/2066330633489731')
                            return
                        }
                        $('.messenger-dialog').addClass('show')
                        $('.mobile-nav').addClass('on')
                    }

                    const hideMessengerDialog = () => {
                        $('.messenger-dialog').removeClass('show')
                        // $('.mobile-nav').removeClass('on')
                    }

                    const showMapDialog = () => {
                        if (!isMobile) {
                            window.dotq = window.dotq || [];

                            window.dotq.push(

                                {

                                    'projectId': '10000',

                                    'properties': {

                                        'pixelId': '10084299',

                                        'qstrings': {

                                            'et': 'custom',

                                            'ea': 'map10084299'

                                        }

                                    }
                                });
                            window.open('https://goo.gl/maps/md3qUjA8GZr4WwGK6')
                            return
                        }
                        $('.map-dialog').addClass('show')
                        $('.mobile-nav').addClass('on')
                    }

                    const hideMapDialog = () => {
                        $('.map-dialog').removeClass('show')
                        // $('.mobile-nav').removeClass('on')
                    }
                </script>
                <script src="js/AddressSelectList.js"></script>
                <script type="text/javascript">
                    window.onload = function() {
                        AddressSeleclList.Initialize('selectcity', 'selectarea')
                    }
                </script>
                <!-- 公版結束 -->
            </div>

        </main>
        <footer>
            <!-- <div v-if="!status.footer" class="toogle-btn">
                <div @click="switchStatus('footer', true)">點擊展開</div>
            </div>
            <div v-if="status.footer" class="toogle-btn on">
                <div @click="switchStatus('footer', false)">點擊縮小</div>
            </div> -->
            <div class="mobile-nav on" v-if="isMobile">
                <a class="nav-item" @click="showCallDialog()">
                    <i class="fas fa-phone"></i>
                    <div class="label">撥打電話</div>
                </a>

                <a class="nav-item" href="#section-p9">
                    <i class="fas fa-pen"></i>
                    <div class="label">預約賞屋</div>
                </a>
                <a class="nav-item" @click="showMessengerDialog()">
                    <i class="fab fa-facebook-messenger"></i>
                    <div class="label">FB諮詢</div>
                </a>
                <a class="nav-item" @click="showMapDialog()">
                    <i class="fas fa-map-marker-alt"></i>
                    <div class="label">地圖導航</div>
                </a>
                <div class="dialog call-dialog">
                    <div class="dialog-content">
                        <i class="fas fa-times" @click="hideCallDialog()"></i>
                        <i class="fas fa-phone"></i>
                        <div class="dialog-desc">賞屋專線</div>
                        <div class="info">02-2293-1666</div>
                        <div class="cta" @click="callAndRedirectToThanks()">撥打電話</div>
                    </div>
                </div>
                <div class="dialog messenger-dialog">
                    <div class="dialog-content">
                        <i class="fas fa-times" @click="hideMessengerDialog()"></i>
                        <i class="fab fa-facebook-messenger"></i>
                        <div class="dialog-desc">FB Messenger</div>
                        <div class="info">線上諮詢</div>
                        <a class="cta" href="https://m.me/2066330633489731" target="_blank" @click="window.dotq = window.dotq || [];

window.dotq.push(

{

  'projectId': '10000',

  'properties': {

    'pixelId': '10084299',

    'qstrings': {

      'et': 'custom',

      'ea': 'FB10084299'

    }

} } );">立即諮詢</a>
                    </div>
                </div>
                <div class="dialog map-dialog">
                    <div class="dialog-content">
                        <i class="fas fa-times" @click="hideMapDialog()"></i>
                        <i class="fas fa-map-marker-alt"></i>
                        <div class="dialog-desc">接待會館</div>
                        <div class="info">新北市五股區新五路二段558號旁</div>
                        <a class="cta" href="https://goo.gl/maps/md3qUjA8GZr4WwGK6" target="_blank" @click="window.dotq = window.dotq || [];

window.dotq.push(

{

  'projectId': '10000',

  'properties': {

    'pixelId': '10084299',

    'qstrings': {

      'et': 'custom',

      'ea': 'map10084299'

    }

} } );">開啟導航</a>
                    </div>
                </div>
            </div>
            <!-- <span class="footer_span"><span class="text-highlight">正義聯盟</span> | GO 超移居計畫搶先劃位 02-2293-1666</span> -->
        </footer>

        <transition name="bounce">
            <div id="modal_reservation" key="s" class="modal modal-reservation" v-show="status.reservation">
                <div class="modal_container">
                    <h2 class="modal_title">預約賞屋</h2>
                    <div class="modal_scroll">
                        <form class="flex f-align:a modal_form" id="myform" class="form" action="contact-form.php" role="form" method="post">
                            <div class="form-col-6">
                                <div class="form_grp">
                                    <label class="form_label">姓名</label>
                                    <div class="form_ctrl">
                                        <input id="name" type="text" aria-required="true" name="widget-contact-form-name" class="name form-control required" placeholder="" />
                                    </div>
                                </div>
                                <div class="form_grp">
                                    <label class="form_label">手機</label>
                                    <div class="form_ctrl">
                                        <input id="phone" type="text" name="widget-contact-form-phone" class="form-control required" placeholder="" />
                                    </div>
                                </div>
                                <div class="form_grp">
                                    <label class="form_label">電子信箱</label>
                                    <div class="form_ctrl">
                                        <input id="email" type="email" aria-required="true" name="widget-contact-form-email" class="form-control email input" placeholder="" />
                                    </div>
                                </div>
                                <div class="form_grp">
                                    <label class="form_label">居住城市</label>
                                    <div class="form_ctrl">
                                        <select id="city" name="widget-contact-form-city" class="form-control" style="height:56px;"></select>
                                    </div>
                                </div>
                                <div class="form_grp" v-if="form.district_id">
                                    <label class="form_label">行政區</label>
                                    <div class="form_ctrl">
                                        <select id="area" name="widget-contact-form-area" class="form-control" style="height:56px;"></select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-col-6">
                                <div class="form_grp">
                                    <div class="form_ctrl">
                                        <textarea type="text" class="form-control" id="msg" name="widget-contact-form-msg" placeholder="輸入您的留言"></textarea>
                                        <input type="hidden" id="utm_source" value="<?= $_GET['utm_source'] ?>" name="utm_source">
                                        <input type="hidden" id="utm_medium" value="<?= $_GET['utm_medium'] ?>" name="utm_medium">
                                        <input type="hidden" id="utm_content" value="<?= $_GET['utm_content'] ?>" name="utm_content">
                                        <input type="hidden" id="utm_campaign" value="<?= $_GET['utm_campaign'] ?>" name="utm_campaign">
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div class="modal_check">
                            <div class="modal_step_agree">
                                <label class="modal_step_check_group">
                                    <input type="checkbox" id="checkbox_form" class="messageCheckbox modal-check-input" />
                                    <span class="checkmark"></span>
                                </label>
                                <span class="text-center">本人知悉並同意「<a class="argee_link link_underline" @click="switchStatus('agreementModal', true)">個資告知事項聲明</a>」內容</span>
                                <div style="color:#f00 !important;" id="msgerror" class="m-b-10"></div>
                            </div>
                            <div class="modal_btn">
                                <a href="javascript:SendScore();" class="btn clr:primary" id="form-submit">
                                    立即預約
                                </a>
                                <!-- <button class="btn clr:primary" @click="send" :disabled="!status.usableSubmit" aria-label="立即預約">立即預約</button> -->
                            </div>
                        </div>
                    </div>
                    <div class="modal_ctrls">
                        <button class="modal-close" @click="switchStatus('reservation', false)" aria-label="關閉彈出視窗"></button>
                    </div>
                </div>
            </div>
        </transition>

        <transition name="bounce">
            <div id="modal_messages" class="modal modal-messages" v-if="status.messagesModal">
                <div class="modal_container">
                    <div class="modal_steps modal-message" v-show="status.formSent">
                        <p class="modal_steps_msg">預約成功</p>
                        <button class="btn btn-msg" @click="closeModalMessages('done')" aria-label="OK">OK</button>
                    </div>
                    <div class="modal_steps modal-message" v-show="!status.formSent">
                        <p class="modal_steps_msg">預約失敗</p>
                        <button class="btn btn-msg" @click="closeModalMessages('again')" aria-label="再試一次">再試一次</button>
                    </div>
                    <div class="modal_ctrls">
                        <button class="modal-close" @click="switchStatus('messagesModal', false)" aria-label="關閉彈出視窗"></button>
                    </div>
                </div>
            </div>
        </transition>


        <transition name="fade">
            <div id="modal_newsModal" class="modal modal-newsModal" :class="{on: status.newsModal}" v-if="status.newsModal">
                <div class="modal_container">
                    <h2 class="modal_title">敬啟期待</h2>
                    <button class="modal-ok" @click="switchStatus('newsModal', false)" aria-label="關閉彈出視窗">OK</button>
                </div>
            </div>
        </transition>

        <transition name="fade">
            <div id="modal_msgModal" class="modal modal-msgModal" :class="{on: status.msgModal}" v-if="status.msgModal">
                <div class="modal_container">
                    <h2 class="modal_title">敬啟期待</h2>
                    <button class="modal-ok" @click="switchStatus('msgModal', false)" aria-label="關閉彈出視窗">OK</button>
                </div>
            </div>
        </transition>

        <transition name="bounce">
            <div id="modal_cubeModal" class="modal modal-cubeModal" v-if="status.cubeModal">
                <div class="modal_container">
                    <div class="modal_ablum">
                        <div class="modal_work">
                            <img :src="cube.use.pic" :alt="cube.use.title" class="modal_image">
                        </div>
                        <div class="modal_slide_ctrls">
                            <button class="slide-ctrl modal_slide_prev slide_prev" aria-label="上一張"></button>
                            <button class="slide-ctrl modal_slide_next slide_next" aria-label="下一張"></button>
                        </div>
                        <h3 class="modal_ablum_title">
                            <span class="modal_ablum_info">{{cube.use.title}}</span>
                        </h3>
                        <div class="modal_ctrls">
                            <button class="modal-close" @click="switchStatus('cubeModal', false)" aria-label="關閉彈出視窗"></button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>


        <transition name="bounce">
            <div id="modal_livable" class="modal modal-livable" v-if="status.livableModal">
                <div class="modal_container">
                    <div class="modal_ablum">
                        <div class="modal_work">
                            <img src="img/livable_pad.jpg" alt="WOW 直擊衛星基地 美翻!宜居宜遊" class="modal_image">
                        </div>
                        <div class="modal_ctrls">
                            <button class="modal-close" @click="switchStatus('livableModal', false)" aria-label="關閉彈出視窗"></button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

        <transition name="bounce">
            <div id="modal_leaflets" class="modal modal-leaflets" v-if="status.leafletsModal">
                <div class="modal_container">
                    <div class="modal_ablum">
                        <div class="modal_work">
                            <img :src="'css/img/leaflets/'+leaflets.use.img" :alt="leaflets.use.name" class="modal_image">
                        </div>
                        <div class="modal_ctrls">
                            <button class="modal-close" @click="switchStatus('leafletsModal', false)" aria-label="關閉彈出視窗"></button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

        <transition name="bounce">
            <div id="modal_teamModal" class="modal modal-teamModal" v-if="status.teamModal">
                <div class="modal_container">
                    <div class="modal_ablum">
                        <div class="modal_work">
                            <img class="modal_image" :src="team.use.img" :alt="team.use.title+'-'+team.use.name" class="modal_image">
                        </div>
                        <div class="modal_slide_ctrls">
                            <button class="slide-ctrl modal_slide_prev slide_prev" aria-label="上一個作品" @click="prevTeamModal"></button>
                            <button class="slide-ctrl modal_slide_next slide_next" aria-label="下一個作品" @click="nextTeamModal"></button>
                        </div>
                        <h3 class="modal_ablum_title">
                            <span class="modal_ablum_info" :style="team.use.style">{{team.use.title}}</span>
                        </h3>
                        <div class="modal_ctrls">
                            <button class="modal-close" @click="switchStatus('teamModal', false)" aria-label="關閉彈出視窗"></button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>


        <transition name="fade">
            <div id="modal_agreement" class="modal modal-agreement" v-if="status.agreementModal">
                <div class="modal_container">
                    <div class="modal_scroll">
                        <div class="modal_content text-preline">
                            隱私權政策
                            非常歡迎您光臨本網站，為了讓您能夠安心使用本網站的各項服務與資訊，特此向您說明本網站的隱私權保護政策，以保障您的權益，請您詳閱下列內容：

                            一、隱私權保護政策的適用範圍
                            隱私權保護政策內容，包括本網站如何處理在您使用網站服務時收集到的個人識別資料。隱私權保護政策不適用於本網站以外的相關連結網站，也不適用於非本網站所委託或參與管理的人員。

                            二、個人資料的蒐集、處理及利用方式
                            當您造訪本網站或使用本網站所提供之功能服務時，我們將視該服務功能性質，請您提供必要的個人資料，並在該特定目的範圍內處理及利用您的個人資料；非經您書面同意，本網站不會將個人資料用於其他用途。
                            本網站在您使用服務信箱、問卷調查等互動性功能時，會保留您所提供的姓名、電子郵件地址、聯絡方式及使用時間等。
                            於一般瀏覽時，伺服器會自行記錄相關行徑，包括您使用連線設備的IP位址、使用時間、使用的瀏覽器、瀏覽及點選資料記錄等，做為我們增進網站服務的參考依據，此記錄為內部應用，決不對外公佈。
                            為提供精確的服務，我們會將收集的問卷調查內容進行統計與分析，分析結果之統計數據或說明文字呈現，除供內部研究外，我們會視需要公佈統計數據及說明文字，但不涉及特定個人之資料。

                            三、資料之保護
                            本網站主機均設有防火牆、防毒系統等相關的各項資訊安全設備及必要的安全防護措施，加以保護網站及您的個人資料採用嚴格的保護措施，只由經過授權的人員才能接觸您的個人資料，相關處理人員皆簽有保密合約，如有違反保密義務者，將會受到相關的法律處分。
                            如因業務需要有必要委託其他單位提供服務時，本網站亦會嚴格要求其遵守保密義務，並且採取必要檢查程序以確定其將確實遵守。

                            四、網站對外的相關連結
                            本網站的網頁提供其他網站的網路連結，您也可經由本網站所提供的連結，點選進入其他網站。但該連結網站不適用本網站的隱私權保護政策，您必須參考該連結網站中的隱私權保護政策。

                            五、與第三人共用個人資料之政策
                            本網站絕不會提供、交換、出租或出售任何您的個人資料給其他個人、團體、私人企業或公務機關，但有法律依據或合約義務者，不在此限。

                            前項但書之情形包括不限於：

                            經由您書面同意。
                            法律明文規定。
                            為免除您生命、身體、自由或財產上之危險。
                            與公務機關或學術研究機構合作，基於公共利益為統計或學術研究而有必要，且資料經過提供者處理或蒐集著依其揭露方式無從識別特定之當事人。
                            當您在網站的行為，違反服務條款或可能損害或妨礙網站與其他使用者權益或導致任何人遭受損害時，經網站管理單位研析揭露您的個人資料是為了辨識、聯絡或採取法律行動所必要者。
                            有利於您的權益。
                            本網站委託廠商協助蒐集、處理或利用您的個人資料時，將對委外廠商或個人善盡監督管理之責。

                            六、Cookie之使用
                            為了提供您最佳的服務，本網站會在您的電腦中放置並取用我們的Cookie，若您不願接受Cookie的寫入，您可在您使用的瀏覽器功能項中設定隱私權等級為高，即可拒絕Cookie的寫入，但可能會導至網站某些功能無法正常執行 。

                            七、隱私權保護政策之修正
                            本網站隱私權保護政策將因應需求隨時進行修正，修正後的條款將刊登於網站上。
                        </div>
                    </div>
                    <div class="modal_ctrls">
                        <button class="modal-close" @click="switchStatus('agreementModal', false)" aria-label="關閉彈出視窗"></button>
                    </div>
                </div>
            </div>
        </transition>

    </div>
    <?php include_once 'incl/script.php'; ?>
    <script>
        $.fn.inView = function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
            return elementBottom > viewportTop + 100 && elementTop < viewportBottom + 100;

        };
        $.fn.allInView = function() {
            if (!this.length) return false;
            var rect = this.get(0).getBoundingClientRect();
            return (
                (rect.top - 100) >= 0 &&
                rect.left >= 0 &&
                (rect.bottom - 100) <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        };


        $(window).on('scroll', function() {
            const section_list = [
                '#kv', // 1
                '#kv2',
                '#section-p2',
                '#section-p3',
                '#section-p4',
                '#section-p5',
                '#section-p6',
                '#section-p7',
                '#section-p8',
                '#section-p9',
                '#section-p10', // 11
            ]
            // var e = t.findIndex(function(e) {
            //                 return $(document).scrollTop() + 100 <= e
            //             }) - 1;
            //             $("a[href^='#sec']").each(function(t, n) {
            //                 t == e ? $(n).find("div").addClass("bg-white") : $(n).find("div").removeClass("bg-white")
            //             })
            section_list.forEach((section, index) => {
                if ($(section).inView()) {
                    // if (!$('.dot').hasClass('active')) {

                    // } else {
                    //     if (index == 10) {
                    //         $(`#dot-${index + 1}`).addClass('active')
                    //     }
                    // }
                    $(`#dot-${index + 1}`).addClass('active')
                    // $(`#dot-${index + 1}`).addClass('active')
                    // if (section == '#kv2') {
                    //     $('#kv').addClass('out').removeClass('on')
                    // }
                    $(section).addClass('on').removeClass('out')

                } else {
                    $(`#dot-${index}`).removeClass('active')
                    $(`#dot-${index + 1}`).removeClass('active')
                    $(section).addClass('out').removeClass('on')
                }
            })


        });
    </script>
</body>

</html>