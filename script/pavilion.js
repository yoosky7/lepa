document.addEventListener("DOMContentLoaded", () => {
  // 메뉴 열기/닫기
  const openBtn = document.querySelector(".menu-btn.open-btn"); 
  const closeBtn = document.querySelector(".close-btn");
  const menuWrap = document.querySelector(".hd-menu-wrap");

  if (openBtn && menuWrap) {
    openBtn.addEventListener("click", () => {
      const isOpen = menuWrap.classList.contains("open");
      menuWrap.classList.toggle("open", !isOpen);
      openBtn.classList.toggle("open", !isOpen);
      openBtn.classList.toggle("hide", !isOpen);
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      menuWrap.classList.remove("open");
      openBtn.classList.remove("open", "hide");
    });
  }



  // 메뉴 이미지 슬라이드
  const images = [
    "../images/menu-img2.jpg",
    "../images/menu-img3.jpg",
    "../images/menu-img4.jpg",
    "../images/menu-img5.jpg",
    "../images/menu-img6.jpg"
  ];
  let index = 0;
  const imgElement = document.querySelector(".menu-img img");

  function changeMenuImage() {
    if (imgElement) {
      imgElement.style.opacity = 0;
      setTimeout(() => {
        index = (index + 1) % images.length;
        imgElement.src = images[index];
        imgElement.style.opacity = 1;
      }, 200);
    }
  }

  if (imgElement) {
    setInterval(changeMenuImage, 2000);
  }

  // 배너 이미지 슬라이드
  const bannerImages = [
    "../images/banner-img2.png",
    "../images/banner-img3.png",
    "../images/banner-img4.png",
    "../images/banner-img5.png",
    "../images/banner-img6.png"
  ];
  let bannerIndex = 0;
  const bannerImg = document.querySelector(".banner-img img");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  let bannerTimer;

  function changeBannerImage(direction = 1) {
    if (bannerImg) {
      bannerImg.style.opacity = 0;
      setTimeout(() => {
        bannerIndex = (bannerIndex + direction + bannerImages.length) % bannerImages.length;
        bannerImg.src = bannerImages[bannerIndex];
        bannerImg.style.opacity = 1;
      }, 300);
    }
  }

  function startBannerTimer() {
    bannerTimer = setInterval(() => {
      changeBannerImage(1);
    }, 4000);
  }

  function resetBannerTimer() {
    clearInterval(bannerTimer);
    startBannerTimer();
  }

  if (bannerImg) {
    startBannerTimer();
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      changeBannerImage(-1);
      resetBannerTimer();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      changeBannerImage(1);
      resetBannerTimer();
    });
  }

  // 텍스트 순차 애니메이션
  const texts = document.querySelectorAll(".slide-text");
  let current = 0;
  const interval = 10000;

  function transitionToNext() {
    const currentEl = texts[current];
    currentEl.classList.remove("active", "fade-in");
    currentEl.classList.add("fade-out");
  
    current = (current + 1) % texts.length;
    const nextEl = texts[current];
    nextEl.classList.remove("fade-out");
    nextEl.classList.add("fade-in", "active");
  }  

  // 첫 텍스트 표시
  texts[current].classList.add("active");

  setInterval(() => {
    transitionToNext();
  }, interval);
});

document.addEventListener("DOMContentLoaded", () => {
  const texts = document.querySelectorAll(".slide-text");
  const pageNumberEl = document.querySelector(".page-number");
  let current = 0;
  const interval = 10000;

  function transitionToNext() {
    const currentEl = texts[current];
    currentEl.classList.remove("active", "fade-in");
    currentEl.classList.add("fade-out");

    current = (current + 1) % texts.length;
    const nextEl = texts[current];
    nextEl.classList.remove("fade-out");
    nextEl.classList.add("fade-in", "active");

    // ✅ 페이지 번호 업데이트
    if (pageNumberEl) {
      pageNumberEl.textContent = current + 1;
    }
  }

  // 첫 텍스트 표시
  texts[current].classList.add("active");
  if (pageNumberEl) {
    pageNumberEl.textContent = current + 1;
  }

  setInterval(() => {
    transitionToNext();
  }, interval);
});

const leftImages = [
    "../images/Resort-left-img1.jpg",
    "../images/Resort-left-img2.jpg",
    "../images/Resort-left-img3.jpg",
    "../images/Resort-left-img4.jpg",
    "../images/Resort-left-img5.jpg",
    "../images/Resort-left-img6.jpg",
    "../images/Resort-left-img7.jpg",
    "../images/Resort-left-img8.jpg"
];

  const rightImages = [
    "../images/Resort-right-img1.jpg",
    "../images/Resort-right-img2.jpg",
    "../images/Resort-right-img3.png",
    "../images/Resort-right-img4.jpg",
    "../images/Resort-right-img5.jpg",
    "../images/Resort-right-img6.jpg",
    "../images/Resort-right-img7.jpg",
    "../images/Resort-right-img8.jpg"
];

const slideTexts = document.querySelectorAll('.slide-text');
const leftImg = document.getElementById('slide-left');
const rightImg = document.getElementById('slide-right');
const pageNumber = document.querySelector('.page-number');

let currentIndex = 0;

function updateSlide(index) {
  leftImg.src = leftImages[index];
  rightImg.src = rightImages[index];

  slideTexts.forEach((text, i) => {
    text.classList.remove('active');
    if (i === index) {
      text.classList.add('active');
    }
  });
  pageNumber.textContent = index + 1;
}

// 10초마다 자동 슬라이드
setInterval(() => {
  currentIndex = (currentIndex + 1) % leftImages.length;
  updateSlide(currentIndex);
}, 10000); // 10000ms = 10초

// 초기화
updateSlide(currentIndex);

// ROOM VIEW 자동 슬라이드
const cards = document.querySelectorAll('.room-card');
let current = 0;

function updateCards() {
  cards.forEach((card, i) => {
    card.classList.remove('active', 'next', 'below', 'hidden');
    const diff = (i - current + cards.length) % cards.length;
    if (diff === 0) card.classList.add('active');
    else if (diff === 1) card.classList.add('next');
    else if (diff === 2) card.classList.add('below');
    else card.classList.add('hidden');
  });
}

setInterval(() => {
  current = (current + 1) % cards.length;
  updateCards();
}, 5000);

updateCards();
