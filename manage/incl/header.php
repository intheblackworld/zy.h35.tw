<header class="header">
    <div class="inner">
        <a class="brand" href="index.php">正義聯盟</a>
        <nav class="menu">
            <a class="menu_item" href="index.php">首頁</a>
            <?php if (+$_SESSION['GRADE'] > 1) {?>
            <a class="menu_item" href="accounts.php">帳號</a>
            <?php } ?>
            <a class="menu_item" href="logout.php">登出</a>
        </nav>
    </div>
</header>
