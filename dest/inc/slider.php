<div class="swiper-container slider-beach">
    <div class="swiper-wrapper">
        <div class="swiper-slide slide-beach-1"></div>
        <div class="swiper-slide slide-beach-2"></div>
        <div class="swiper-slide slide-beach-3"></div>
    </div>
    <div class="swiper-arrow swiper-prev">
        <i class="icon icon-right-arrow"></i>
    </div>
    <div class="swiper-arrow swiper-next">
        <i class="icon icon-right-arrow"></i>
    </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.3.1/js/swiper.min.js"></script>
<script>
  var swiper = new Swiper('.slider-beach', {
    speed: 400,
    loop: true,
    grabCursor: true,
    nextButton: '.swiper-next',
    prevButton: '.swiper-prev'
  });
</script>