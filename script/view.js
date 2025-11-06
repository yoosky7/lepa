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

  // 프롤로그 이미지 스왑
  const arrow = document.querySelector('.arrow');

  if (arrow) {
    arrow.addEventListener('click', () => {
      const currentFront = document.querySelector('.Prologue-img.front');
      const currentBack = document.querySelector('.Prologue-img.back');
      
      if (currentFront && currentBack) {
        currentFront.classList.remove('front');
        currentFront.classList.add('back');
        
        currentBack.classList.remove('back');
        currentBack.classList.add('front');
      }
    });
  }
});