/***************************Burger******************************/
const burger = document.querySelector('.burger');
const burgerMenu = document.querySelector('.nav__list');
const shadow = document.querySelector('.header__shadow')
const burgerLink = document.querySelectorAll('.nav__link')
const burgerBtn = document.querySelector('.btn__header')

if(burger){
  burger.addEventListener('click', show);
  shadow.addEventListener('click', show);
  burgerLink.forEach(item => {
      item.addEventListener('click', removeAll);
  });
}

function show() {
    burgerMenu.classList.toggle('active');
    burgerBtn.classList.toggle('active')
    burger.classList.toggle('active');
    shadow.classList.toggle('active');
    document.body.classList.toggle('lock')

}

function removeAll(){
  document.body.classList.remove('lock')
  burgerMenu.classList.remove('active');
  burgerBtn.classList.remove('active')
  burger.classList.remove('active');
  shadow.classList.remove('active');
};

/******************************************End burger************************************/

/********************************************Swiper ***************************************/

const swiper = new Swiper('.swiper', {
  //Бесконечность слайдера
  loop: true,

  // Пагинация
  pagination: {
    el: '.swiper__pagination',
    clickable: true,
  },

  // Стрелки слайда
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  //Слайд по центру
  centeredSlides: true,
  //Нажатие на слайд для активности
  slideToClickedSlide: true,
  //Количество слайдов на показ
  slidesPerView: 1.7,
  //Отступ между слайдами
  spaceBetween: 60,
  //С какого слайда начать
  initialSlide: 1,
  breakpoints: {
    320: {
      slidesPerView: 1.1,
    },
    768: {
      slidesPerView: 1.7,
    }
  }
});


/*************************************************Animation ***************************************************/

let animItem = document.querySelectorAll('.anim');

if(animItem.length > 0){
  window.addEventListener('scroll', AnimScroll)
  function AnimScroll(){
    for(let i = 0; i < animItem.length; i++){
      const item = animItem[i];
      const itemHeight = item.offsetHeight;
      const itemOffset = offset(item).top;
      const itemStart = 4;

      let itemPoint = window.innerHeight - itemHeight / itemStart;

      if(itemHeight > window.innerHeight){
        itemPoint = window.innerHeight - window.innerHeight / itemStart;
      }

      if((pageYOffset > itemOffset - itemPoint) && pageYOffset < (itemOffset + itemHeight)){
        item.classList.add('_active');
      } else {
        if(!item.classList.contains('no_hide')){
          item.classList.remove('_active');
        }
      }
    }
  }
  function offset(el1) {
    const rect = el1.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  }
  setTimeout(() => {
    AnimScroll()
  }, 300);
}


