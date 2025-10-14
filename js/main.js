// DOM ready
$(function () {
  var $root = $('html');
  var $btn = $('.menu-btn');
  var $menu = $('#mobileMenu');
  var BREAKPOINT = 639;
  var LOCK_SCROLL = true;

  if ($btn.length === 0 || $menu.length === 0) return;

  // 초기 상태 정리(모바일일 때 메뉴 닫기)
  function ensureInitial() {
    if (window.innerWidth < BREAKPOINT) {
      $menu.hide();
      $root.removeClass('is-menu-open');
      $btn.attr({ 'aria-expanded': 'false', 'aria-label': '메뉴 열기' });
      if (LOCK_SCROLL) $('body').css('overflow', '');
    }
  }

  // 메뉴 열기
  function openMenu() {
    $menu.stop(true, true).slideDown(220);
    $root.addClass('is-menu-open');
    $btn.attr({ 'aria-expanded': 'true', 'aria-label': '메뉴 닫기' });
  }

  // 메뉴 닫기
  function closeMenu() {
    $menu.stop(true, true).slideUp(200);
    $root.removeClass('is-menu-open');
    $btn.attr({ 'aria-expanded': 'false', 'aria-label': '메뉴 열기' });
    if (LOCK_SCROLL) $('body').css('overflow', '');
  }

  // 메뉴 토글 핸들러
  function toggleMenu(e) {
    e.preventDefault();
    $root.hasClass('is-menu-open') ? closeMenu() : openMenu();
  }

  // 버튼 클릭 시 토글
  $btn.on('click', toggleMenu);

  // 모바일 메뉴 링크 클릭 시 닫기
  $('#mobileMenu a').on('click', closeMenu);

  // 바깥 클릭 시 닫기
  $(document).on('click', function (e) {
    if (!$root.hasClass('is-menu-open')) return;
    if ($(e.target).closest('#mobileMenu, .menu-btn, .mobile-top').length) return;
    closeMenu();
  });

  // ESC 키로 닫기
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape' && $root.hasClass('is-menu-open')) closeMenu();
  });

  // 리사이즈 시 상태 정리(데스크톱 전환 시 강제 닫기)
  $(window).on('resize', function () {
    if (window.innerWidth >= BREAKPOINT && $root.hasClass('is-menu-open')) closeMenu();
  });

  // 초기 실행
  ensureInitial();

  // 스크롤다운
  $(document).on('click', '.scroll-down-btn', function (e) {
    e.preventDefault();
    var href = $(this).attr('href') || '#container2';
    var id = href.replace(/^#/, '');
    var $t = $('#' + id);
    if (!$t.length) return;

    var headerH = $('header').outerHeight() || 0;
    var y = $t.offset().top - headerH;

    $('html, body').stop(true).animate({ scrollTop: y }, 500, 'swing');
  });
});

// lottie 애니메이션
lottie.loadAnimation({
  container: document.getElementById('lottie-container'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: './loan-ui.json' // 파일이 index.html과 같은 폴더에 있다고 가정
});


//content8 커버 애니메이션
document.addEventListener('DOMContentLoaded', function () {
  const section = document.querySelector('.container8');
  const left    = document.querySelector('.cover-left');
  const right   = document.querySelector('.cover-right');
  if (!section || !left || !right) return;

  const INITIAL_GAP_PX = 900;
  const COMPLETE_AT    = 0.5;

  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  let ticking = false;

  function progressByViewport() {
    const r  = section.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = vh + r.height;
    const seen  = vh - r.top;
    return clamp(seen / total, 0, 1);
  }

  function update() {
    const t0 = progressByViewport(); 
    const t  = clamp(t0 / COMPLETE_AT, 0, 1);

    const W = section.clientWidth || window.innerWidth;
    const p = clamp((INITIAL_GAP_PX / W) * 100, 0, 100);

    const leftX  = -(p + (100 - p) * t);
    const rightX =  +(p + (100 - p) * t);

    left.style.transform  = `translate3d(${leftX}%, 0, 0)`;
    right.style.transform = `translate3d(${rightX}%, 0, 0)`;
    ticking = false;
  }

  function onScrollOrResize() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }

  window.addEventListener('scroll',  onScrollOrResize, { passive: true });
  window.addEventListener('resize',  onScrollOrResize, { passive: true });
  update();
});