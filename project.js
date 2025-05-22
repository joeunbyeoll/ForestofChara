// 1. 가로 스크롤 컨테이너
const container = document.getElementById('container');
const textEl = document.getElementById('text');

const fullText = "Hello This is Forest of Chara";
let currentIndex = 0;
let isTyping = false;
const triggerPoint = 200; // 스크롤 위치(px)
const typingSpeed = 100;

// 2. 타자기 효과 함수
function typeNextChar() {
  if (currentIndex < fullText.length) {
    textEl.textContent += fullText.charAt(currentIndex);
    currentIndex++;
    setTimeout(typeNextChar, typingSpeed);
  } else {
    isTyping = false;
  }
}

// 3. 휠을 이용한 가로 스크롤
container.addEventListener('wheel', (e) => {
  // 기본 휠 스크롤 막음
  e.preventDefault();

  // 스크롤 가능할 만큼 요소가 충분히 길어야 함
  const maxScrollLeft = container.scrollWidth - container.clientWidth;
  if (maxScrollLeft <= 0) return; // 스크롤 거리 없으면 return

  // 휠 방향에 따라 가로 이동
  let scrollAmount = e.deltaY;
  if (e.deltaMode === 1) scrollAmount *= 16;
  else if (e.deltaMode === 2) scrollAmount *= container.clientHeight;

  container.scrollLeft += scrollAmount;
}, { passive: false });

// 4. 스크롤 위치에 따라 타자기 효과 한 번만 실행
container.addEventListener('scroll', () => {
  if (container.scrollLeft > triggerPoint && !isTyping && currentIndex === 0) {
    isTyping = true;
    typeNextChar();
  }
});
