// 가로 스크롤 설정
const container = document.getElementById('container');

container.addEventListener('wheel', (e) => {
  e.preventDefault();

  const maxScrollLeft = container.scrollWidth - container.clientWidth;
  if (maxScrollLeft <= 0) return;

  let scrollAmount = e.deltaY;
  if (e.deltaMode === 1) scrollAmount *= 16;
  else if (e.deltaMode === 2) scrollAmount *= container.clientHeight;

  container.scrollLeft += scrollAmount;
}, { passive: false });

// 로딩 및 입장 버튼 관련
window.addEventListener('DOMContentLoaded', () => {
  const loadingText = document.getElementById('loadingText');
  const enterBtn = document.getElementById('enterBtn');
  let percent = 0;

  if (!loadingText || !enterBtn) {
    console.error('loadingText 또는 enterBtn 요소를 찾을 수 없습니다!');
    return;
  }

  enterBtn.classList.add('hidden');
  enterBtn.style.opacity = 0;
  enterBtn.style.pointerEvents = 'none';

  const loadingInterval = setInterval(() => {
    percent++;
    loadingText.textContent = `Loading ${percent}%`;

    if (percent >= 100) {
      clearInterval(loadingInterval);
      enterBtn.classList.remove('hidden');
      enterBtn.style.opacity = 1;
      enterBtn.style.pointerEvents = 'auto';
    }
  }, 30);

  enterBtn.addEventListener('click', () => {
    // 로딩 오버레이 숨기기
    document.getElementById('loadingOverlay').style.display = 'none';

    // introGrid 실행 (이제 버튼 클릭 후 실행)
    runIntroGrid(container1, text1, triggers1);
    runIntroGrid(container2, text2, triggers2);
    runIntroGrid(container3, text3, triggers3);

    // 알파벳 텍스트 애니메이션 예시
    const animText = "entering to the forest of Chara";
    const animContainer = document.createElement('div');
    animContainer.id = "animatedText";
    document.body.appendChild(animContainer);

    for (let i = 0; i < animText.length; i++) {
      const span = document.createElement('span');
      span.textContent = animText[i];
      span.style.animationDelay = `${i * 0.05}s`;
      animContainer.appendChild(span);
    }

    setTimeout(() => {
      animContainer.remove();
    }, 4000);
  });
});

// 오버레이 없이 PNG 이미지 토글 부분 (수정 없음)
const trigger = document.getElementById("videoTrigger");
const image = document.createElement("img");
const youtube = document.getElementById("youtubePopup");

image.src = "img/domamusic2.png";
image.id = "popupImage";
image.style.position = "fixed";
image.style.top = "20px";
image.style.left = "20px";
image.style.zIndex = "9999";
image.style.display = "none";
image.style.pointerEvents = "auto";
image.style.cursor = "pointer";
image.style.maxWidth = "400px";
image.style.height = "auto";
image.style.userSelect = "none";

document.body.appendChild(image);

let isImageVisible = false;

trigger.addEventListener("click", () => {
  isImageVisible = !isImageVisible;
  image.style.display = isImageVisible ? "block" : "none";
  youtube.style.display = isImageVisible ? "block" : "none";
});

image.addEventListener("click", () => {
  image.style.display = "none";
  youtube.style.display = "none";
  isImageVisible = false;
});

// 커서 숨기기
const musicEl = document.querySelector('.music');

musicEl.addEventListener('mouseenter', () => {
  document.body.style.cursor = 'none';
});

musicEl.addEventListener('mouseleave', () => {
  document.body.style.cursor = '';
});

// runIntroGrid 함수
function runIntroGrid(container, characters, triggerIndexes) {
  container.innerHTML = '';

  const grid = document.createElement('div');
  grid.classList.add('grid');
  container.appendChild(grid);

  const cells = [];
  const triggerCells = [];

  for (let i = 0; i < characters.length; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    grid.appendChild(cell);
    cells.push(cell);

    if (triggerIndexes.includes(i)) {
      cell.classList.add('trigger');
      triggerCells.push(cell);
    }
  }

  let currentTrigger = 0;

  function activateTrigger(index) {
    const cell = triggerCells[index];
    if (!cell) return;

    cell.classList.add('blinking');
    cell.addEventListener('click', function handleClick() {
      if (cell.classList.contains('clicked')) return;
      cell.classList.remove('blinking');
      cell.classList.add('clicked');
      cell.removeEventListener('click', handleClick);

      if (index + 1 < triggerCells.length) {
        activateTrigger(index + 1);
      } else {
        revealAll();
      }
    });
  }

  function revealAll() {
    for (let i = 0; i < cells.length; i++) {
      setTimeout(() => {
        cells[i].textContent = characters[i];
        cells[i].classList.add('revealed');
      }, i * 100);
    }
  }

  activateTrigger(currentTrigger);
}

// 변수 선언 (container3 추가, triggers3도 새로 선언)
const container1 = document.getElementById('introGridContainer1');
const container2 = document.getElementById('introGridContainer2');
const container3 = document.getElementById('introGridContainer3');

const text1 = "Hello, this is the Forest of Chara — a quiet corner somewhere on Earth.";
const triggers1 = [10, 25, 45];

const text2 = "Many lizards live in this forest. To survive, they often rely on a behavior called 'Autotomy'.";
const triggers2 = [7, 15, 50];

const text3 = "Have you heard of autotomy? It’s when a lizard detaches part of its body to escape danger.";
const triggers3 = [18, 24, 45];

// runIntroGrid 호출는 버튼 클릭 후에 실행되므로 여기서는 제거

