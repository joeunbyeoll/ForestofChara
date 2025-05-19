const container = document.getElementById('container');

container.addEventListener('wheel', (e) => {
  e.preventDefault();

  // deltaMode에 따라 보정
  let scrollAmount = e.deltaY;

  if (e.deltaMode === 1) { // 라인 단위
    scrollAmount *= 16; // 대략 한 라인당 16px
  } else if (e.deltaMode === 2) { // 페이지 단위
    scrollAmount *= container.clientHeight;
  }

  container.scrollLeft += scrollAmount * 1.5; // 속도 조절 가능
}, { passive: false });
