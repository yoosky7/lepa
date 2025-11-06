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

  const slider = document.getElementById('slider');
  if (slider) {
    const originalSlides = Array.from(slider.children);
    const totalSlides = originalSlides.length;
  
    let currentIndex = 1;
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
  
    // 슬라이드 복제
    const firstClone = originalSlides[0].cloneNode(true);
    const lastClone = originalSlides[totalSlides - 1].cloneNode(true);
    slider.insertBefore(lastClone, originalSlides[0]);
    slider.appendChild(firstClone);
  
    // 초기 위치 설정
    slider.style.transform = `translateX(-${100 * currentIndex}%)`;
  
    function nextSlide() {
      currentIndex++;
      slider.style.transition = 'transform 0.5s ease';
      slider.style.transform = `translateX(-${100 * currentIndex}%)`;
      slider.addEventListener('transitionend', handleLoop, { once: true });
    }
  
    function prevSlide() {
      currentIndex--;
      slider.style.transition = 'transform 0.5s ease';
      slider.style.transform = `translateX(-${100 * currentIndex}%)`;
      slider.addEventListener('transitionend', handleLoop, { once: true });
    }
  
    function handleLoop() {
      const maxIndex = slider.children.length - 1;
    
      if (currentIndex === 0) {
        slider.style.transition = 'none';
        currentIndex = totalSlides;
        slider.style.transform = `translateX(-${100 * currentIndex}%)`;
    
        // 트랜지션 복구
        setTimeout(() => {
          slider.style.transition = 'transform 0.5s ease';
        }, 20);
      } else if (currentIndex === maxIndex) {
        slider.style.transition = 'none';
        currentIndex = 1;
        slider.style.transform = `translateX(-${100 * currentIndex}%)`;
    
        // 트랜지션 복구
        setTimeout(() => {
          slider.style.transition = 'transform 0.5s ease';
        }, 20);
      }
    }
  
    slider.addEventListener('mousedown', (e) => {
      e.preventDefault();
      isDragging = true;
      startX = e.pageX;
      slider.style.transition = 'none';
    });
  
    slider.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const deltaX = e.pageX - startX;
      currentTranslate = -100 * currentIndex + (deltaX / slider.offsetWidth) * 100;
      slider.style.transform = `translateX(${currentTranslate}%)`;
    });
  
    window.addEventListener('mouseup', (e) => {
      if (!isDragging) return;
      isDragging = false;
  
      const deltaX = e.pageX - startX;
      const threshold = slider.offsetWidth * 0.2;
  
      if (deltaX < -threshold) {
        nextSlide();
      } else if (deltaX > threshold) {
        prevSlide();
      } else {
        slider.style.transition = 'transform 0.5s ease';
        slider.style.transform = `translateX(-${100 * currentIndex}%)`;
      }
    });
  
    slider.addEventListener('mouseleave', () => {
      if (isDragging) {
        isDragging = false;
        slider.style.transition = 'transform 0.5s ease';
        slider.style.transform = `translateX(-${100 * currentIndex}%)`;
      }
    });
  
    // 버튼 이벤트 연결
    const slidePrevBtn = document.querySelector(".slide-btn.prev");
    const slideNextBtn = document.querySelector(".slide-btn.next");
  
    if (slidePrevBtn) {
      slidePrevBtn.addEventListener("click", prevSlide);
    }
    if (slideNextBtn) {
      slideNextBtn.addEventListener("click", nextSlide);
    }
  }  
});
