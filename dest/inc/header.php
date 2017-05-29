    <base href="http://localhost:3000/edsa-dev/svi/dest/"/>

    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="SKYPE_TOOLBAR" content="SKYPE_TOOLBAR_PARSER_COMPATIBLE" />
    <meta name="author" content="Андрій Терещук">
    <meta name="robots" content="all">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="shortcut icon" href="images/favicon.ico"/>

    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/grid.css">
    <link rel="stylesheet" href="css/dev.css">
    <link rel="stylesheet" href="css/icons.css">
    <link rel="stylesheet" href="css/decorate.css">
    <link rel="stylesheet" href="css/responsive.css">
</head>
<body>

<?php include_once("inc/analyticstracking.php") ?>

<div class="wrapper">

<header>
    <div class="wrap container">
        <div class="row between-xs middle-xs m-0">
            <div class="logo">
                <a href="/">
                    <img src="images/logo.png" alt="">
                </a>
            </div>
            <div>
                <div class="place pull-left flex ml-10">
                    <i class="icon icon-phone"></i>
                    <span class="phones ml-5"><b>(097)</b> 654 1951, <b class="pl-5">(063)</b> 795 2131</span>
                </div>
                <div class="lang pull-left flex ml-20" id="lang">
                    <i class="icon icon-land"></i>
                    <div class="lang-current ml-5">UA</div>
                    <a href="/ru" class="lang-item">RU</a>
                    <div class="lang-arrow ml-5"></div>
                </div>
            </div>
        </div>
    </div>
</header>

<section id="menu">
    <nav class="wrap container">
        <div class="row between-xs middle-xs m-0">
            <div>
                <input type="checkbox" id="menu-check">
                <label for="menu-check">
                    <div class="icon icon-menu"></div>
                    <div class="icon icon-close"></div>
                </label>
                <ul class="menu">
                    <li>
                        <a href onclick="return false;">Житло</a>
                        <ul class="sub-menu">
                            <li><a href="/homes/1"><img src="gallery/hotels/b1-2.jpg" alt=""><span>Б1</span></a></li>
                            <li><a href="/homes/2"><img src="gallery/hotels/b2.jpg" alt=""><span>Б2</span></a></li>
                            <li><a href="/homes/3"><img src="gallery/hotels/b3.jpg" alt=""><span>Б3</span></a></li>
                            <li><a href="/homes/4"><img src="gallery/hotels/b4.jpg" alt=""><span>Б4</span></a></li>
                        </ul>
                    </li>
                    <li><a href="/about-svilake">Про нас</a></li>
                    <li><a href="/booking">Бронювання</a></li>
                    <li><a href="/contacts">Контакти</a></li>
                    <li><a href="/routes">Як добратись</a></li>
                    <li><a href="/trips">Екскурсії</a></li>
                </ul>
            </div>

            <div class="social-links">
                <div class="tel">
                    <a href="tel:+380976541951">
                        <i class="icon icon-star mr-5"></i>
                        <span>0976541951</span>
                    </a>
                    <a href="tel:+380637952131">
                        <img class="mr-5" src="images/life.png" alt="">
                        <span>0637952131</span>
                    </a>
                </div>
                <a href="https://www.facebook.com/groups/svilake/" class="icon icon-facebook" target="_blank" title="група у Facebook"></a>
                <a href="http://vk.com/svilake" class="icon icon-vk" target="_blank" title="група у VK"></a>
                <a href="/" class="icon icon-home ml-20" title="на Головну"></a>
            </div>
        </div>
    </nav>
</section>
