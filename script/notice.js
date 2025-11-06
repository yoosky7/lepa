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

    const posts = [
        {
            번호: 1,
            제목: "가을맞이 특별 할인 이벤트 진행 중입니다.",
            글쓴이: "관리자",
            조회: 123,
            날짜: "2025-10-21",
            내용: "추석 연휴 전 예약 시 15% 할인 적용됩니다. \n 쿠폰번호 : FALL2025"
        },
        {
            번호: 2,
            제목: "수영장 온수 사용 안내드립니다.",
            글쓴이: "관리자",
            조회: 456,
            날짜: "2025-09-15",
            내용: "가을/겨울 시즌에는 수영장 온수 사용이 가능하며, \n 이용 시간은 오후 10시까지입니다."
        },
        {
            번호: 3,
            제목: "바비큐장 사전 예약 필수 안내드립니다.",
            글쓴이: "관리자",
            조회: 78,
            날짜: "2025-10-01",
            내용: "바비큐장은 오후 6시 ~ 10시 이용 가능하며, \n 체크인 시 예약 부탁드립니다."
        },
        {
            번호: 4,
            제목: "투숙객 전용 무료 조식 제공 안내드립니다.",
            글쓴이: "관리자",
            조회: 82,
            날짜: "2025-11-01",
            내용: "매일 오전 8시 ~ 9시 30분까지 카페테리아에서 \n 조식이 무료로 제공됩니다."
        },
        {
            번호: 5,
            제목: "연말 예약 오픈 안내드립니다.",
            글쓴이: "관리자",
            조회: 155,
            날짜: "2025-09-06",
            내용: "12월 성수기 예약이 시작되었습니다. \n 조기 예약 시 특별 사은품이 제공됩니다."
        }
    ];

    let viewSortState = 0;
    let dateSortState = 0;

    const table = document.getElementById("grid-table");
    const viewBtn = document.getElementById("sort-views");
    const dateBtn = document.getElementById("sort-date");

    function renderRows(data) {
        document.querySelectorAll(".row.data, .detail-row").forEach(row => row.remove());

        data.forEach((post, index) => {
            const row = document.createElement("div");
            row.className = "row data";
            row.innerHTML = `
            <div class="cell">${post.번호}</div>
            <div class="cell title-cell" data-index="${index}">${post.제목}</div>
            <div class="cell">${post.글쓴이}</div>
            <div class="cell">${post.조회}</div>
            <div class="cell">${post.날짜}</div>
            `;
            table.appendChild(row);
        });

        document.querySelectorAll(".title-cell").forEach(cell => {
            cell.addEventListener("click", () => {
            const index = cell.dataset.index;
            const existingDetail = cell.parentElement.nextElementSibling;
            if (existingDetail && existingDetail.classList.contains("detail-row")) {
                existingDetail.remove();
            } else {
                const detailRow = document.createElement("div");
                detailRow.className = "detail-row";
                detailRow.innerHTML = `<div class="detail-cell">${posts[index].내용}</div>`;
                cell.parentElement.after(detailRow);
            }
            });
        });
    }

    function applySort() {
        let sorted = [...posts];

        if (viewSortState === 1) {
            sorted.sort((a, b) => b.조회 - a.조회);
        } else if (viewSortState === 2) {
            sorted.sort((a, b) => a.조회 - b.조회);
        }

        if (dateSortState === 1) {
            sorted.sort((a, b) => new Date(b.날짜) - new Date(a.날짜));
        } else if (dateSortState === 2) {
            sorted.sort((a, b) => new Date(a.날짜) - new Date(b.날짜));
        }

        renderRows(sorted);
    }

    viewBtn.addEventListener("click", () => {
        viewSortState = (viewSortState + 1) % 3;
        viewBtn.classList.toggle("active", viewSortState !== 0);
        applySort();
    });

    dateBtn.addEventListener("click", () => {
        dateSortState = (dateSortState + 1) % 3;
        dateBtn.classList.toggle("active", dateSortState !== 0);
        applySort();
    });

    renderRows(posts);

});