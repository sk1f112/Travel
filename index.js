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

/***************************************************Sticky header *****************************************************************/
const heroSection = document.querySelector('.section__hero');
const header = document.querySelector('.header');
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav__link');
const navLi = document.querySelectorAll('.nav__list-item');

document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('scroll', function(){
    let scrollTop = window.scrollY;
    if(scrollTop >= 500){
      header.classList.add('fixed');
      heroSection.style.paddingTop = `${header.offsetHeight}px`;
    } else {
      header.classList.remove('fixed');
      heroSection.style.paddingTop = `0px`;
    }
    //Active menu item when scroll
    sections.forEach((el, i) => {
      if(el.offsetTop - header.clientHeight <= scrollTop){
        navLinks.forEach(el => {
          if(el.classList.contains('active')){
            el.classList.remove('active');
          } 
        })
        navLi[i].querySelector('a').classList.add('active');
      }
    })
  })
})

//Modal
const btnModal = document.querySelector('.btn__header');
const modal = document.querySelector('.popup');
const popupContainer = document.querySelector('.popup__container');
const modalShadow = document.querySelector('.shadow');

let paddingOffSet = `${window.innerWidth - document.body.offsetWidth}px`;

let html;
function modalActive(modalType){
  if(modalType == "login"){
      popupContainer.removeChild(document.querySelector('.popup__content'))

      html = `
      <div class="popup__content">
        <h2 class="popup__title">Log in to your account</h2>
        <div class="popup__loggin-first">
            <a href="" class="popup__facebook">
                <img src="./assets/facebook.png" alt="facebook">
                Sign In with Facebook
            </a>
            <a href="" class="popup__google">
                <img src="./assets/google.png" alt="google">
                Sign In with Google
            </a>
        </div>
        <div class="popup__or">
            <h3 class="popup__or-text">or</h3>
            <span class="popup__line"></span>
        </div>
        <form action="#" class="popup__inputs inputs">
            <div class="inputs__container">
                <label for="email">Email</label>
                <input type="text" class="input" id="email">
            </div>
            <div class="inputs__container">
                <label for="password">Passoword</label>
                <input type="password" class="input" id="password">
            </div>

            <button class="modal__btn">Sign in</button>
        </form>
        <div class="modal__footer">
            <a href="#" class="modal__forgot">Forgot Your Password?</a>
            <span class="popup__line forgot"></span>
        </div>
        <div class="modal__text">Don’t have an account? <a href="#" class="modal__register"
       onclick="modalActive('reg')">Register</a></div>
      </div>
      `
  } 
  if(modalType == 'reg'){
    popupContainer.removeChild(document.querySelector('.popup__content'))
    html = `
    <div class="popup__content">
      <h2 class="popup__title">Create account</h2>
      <form action="#" class="popup__inputs inputs">
            <div class="inputs__container">
                <label for="email">Email</label>
                <input type="text" class="input" id="email">
            </div>
            <div class="inputs__container">
                <label for="password">Passoword</label>
                <input type="password" class="input" id="password">
            </div>
            <button class="modal__btn">Sign up</button>
        </form>
        <div class="modal__footer">
            <span class="popup__line reg"></span>    
            <div class="modal__text">Already have an account? <a href="#" onClick="modalActive('login')" class="modal__register">Log in</a></div> 
        </div>
    </div>
    `
  }
  popupContainer.insertAdjacentHTML('afterbegin',html)
  if(!modal.classList.contains('active')){
    modal.classList.add('active');
    modalShadow.classList.add('active'); 
    document.body.classList.add('lock')
    if(header.classList.contains('fixed')){
      header.style.paddingRight = paddingOffSet;
    }
    document.body.style.paddingRight = paddingOffSet;
  } 
}
  
function modalDisable(){
  modal.classList.remove('active');
  modalShadow.classList.remove('active');  
  document.body.classList.remove('lock');
  if(header.classList.contains('fixed')){
    header.style.paddingRight = `0px`;
  }
  document.body.style.paddingRight = `0px`;
};

modalShadow.addEventListener('click', modalDisable)