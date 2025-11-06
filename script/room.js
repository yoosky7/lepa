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

 function togglePrice(header) {
  const container = header.parentElement;
  const details = container.querySelector('.price-details');
  const icon = header.querySelector('.toggle-icon');

  const isOpen = window.getComputedStyle(details).display === 'block';

  details.style.display = isOpen ? 'none' : 'block';
  icon.textContent = isOpen ? '+' : '−';
}

// 여러 개의 price-header에 대응
const priceHeaders = document.querySelectorAll(".price-header");
priceHeaders.forEach(header => {
  header.addEventListener("click", () => {
    togglePrice(header);
  });
});


});