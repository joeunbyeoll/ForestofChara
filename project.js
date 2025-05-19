const container = document.getElementById('container');

container.addEventListener('wheel', (e) => {
  e.preventDefault();

  // 마우스 휠 세로(deltaY) 움직임을 가로 스크롤에 적용
  // 적당한 속도 조절 위해 2 곱하기 (필요시 조절)
  container.scrollLeft += e.deltaY * 2;
}, { passive: false });
