$(function () {
    var $root = $('html');
    var $btn = $('.menu-btn');
    var $menu = $('#mobileMenu');
    var BREAKPOINT = 639;
    var LOCK_SCROLL = true;

    if ($btn.length === 0 || $menu.length === 0) return;//

    function ensureInitial() {
        if (window.innerWidth < BREAKPOINT) {
            $menu.hide();
            $root.removeClass('is-menu-open');
            $btn.attr({ 'aria-expanded': 'false', 'aria-label': '메뉴 열기' });
            if (LOCK_SCROLL) $('body').css('overflow', '');
        }
    }

    function openMenu() {
        $menu.stop(true, true).slideDown(220);
        $root.addClass('is-menu-open');
        $btn.attr({ 'aria-expanded': 'true', 'aria-label': '메뉴 닫기' });
        if (LOCK_SCROLL) $('body').css('overflow', 'hidden');
    }
    function closeMenu() {
        $menu.stop(true, true).slideUp(200);
        $root.removeClass('is-menu-open');
        $btn.attr({ 'aria-expanded': 'false', 'aria-label': '메뉴 열기' });
        if (LOCK_SCROLL) $('body').css('overflow', '');
    }
    function toggleMenu(e) {
        e.preventDefault();
        $root.hasClass('is-menu-open') ? closeMenu() : openMenu();
    }

    $btn.on('click', toggleMenu);
    $('#mobileMenu a').on('click', closeMenu);

    // 바깥 클릭 닫기
    $(document).on('click', function (e) {
        if (!$root.hasClass('is-menu-open')) return;
        if ($(e.target).closest('#mobileMenu, .menu-btn, .mobile-top').length) return;
        closeMenu();
    });

    // ESC 닫기
    $(document).on('keydown', function (e) {
        if (e.key === 'Escape' && $root.hasClass('is-menu-open')) closeMenu();
    });

    // 리사이즈: 데스크탑 가면 닫기
    $(window).on('resize', function () {
        if (window.innerWidth >= BREAKPOINT && $root.hasClass('is-menu-open')) closeMenu();
    });

    ensureInitial();
});
