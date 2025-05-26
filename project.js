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

// 🔵 로딩 화면 및 입장 버튼
window.addEventListener('DOMContentLoaded', () => {
  const loadingText = document.getElementById('loadingText');
  const enterBtn = document.getElementById('enterBtn');
  let percent = 0;

  const loadingInterval = setInterval(() => {
    percent++;
    loadingText.textContent = `Loading ${percent}%`;

    if (percent >= 100) {
      clearInterval(loadingInterval);
      enterBtn.classList.remove('hidden');
      enterBtn.style.opacity = 1;
    }
  }, 30);

  enterBtn.addEventListener('click', () => {
    document.getElementById('loadingOverlay').style.display = 'none';
     runIntroGrid();

    // 알파벳 텍스트 애니메이션
    const text = "entering to the forest of Chara";
    const container = document.createElement('div');
    container.id = "animatedText";
    document.body.appendChild(container);

    for (let i = 0; i < text.length; i++) {
      const span = document.createElement('span');
      span.textContent = text[i];
      span.style.animationDelay = `${i * 0.05}s`;
      container.appendChild(span);
    }

    // 몇 초 후에 텍스트 사라지게 하고 싶다면 이 코드 추가
    setTimeout(() => {
      container.remove();
    }, 4000);
  });
});
enterBtn.classList.add('show');


// ✅ 오버레이 없이 PNG 이미지 토글 표시
const trigger = document.getElementById("videoTrigger"); // .music div
const image = document.createElement("img");
const youtube = document.getElementById("youtubePopup");

image.src = "img/domamusic2.png"; // PNG 이미지 경로
image.id = "popupImage";
image.style.position = "fixed";
image.style.top = "20px";
image.style.left = "20px";
image.style.zIndex = "9999";
image.style.display = "none";
image.style.pointerEvents = "auto";
image.style.cursor = "pointer";
image.style.maxWidth = "400px"; // 크기 조절 가능
image.style.height = "auto";
image.style.userSelect = "none";

// 이미지 요소를 body에 추가
document.body.appendChild(image);

let isImageVisible = false;

trigger.addEventListener("click", () => {
  isImageVisible = !isImageVisible;
  image.style.display = isImageVisible ? "block" : "none";
  youtube.style.display = isImageVisible ? "block" : "none";  // iframe 토글 추가
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

function runIntroGrid(container, characters, triggerIndexes) {
  container.innerHTML = ''; // 초기화

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



const container1 = document.getElementById('introGridContainer1');
const container2 = document.getElementById('introGridContainer2');

const text1 = "Hello, this is the Forest of Chara — a quiet corner somewhere on Earth.";
const triggers1 = [10, 25, 45];

const text2 = "Many lizards live in this forest. To survive, they often rely on a behavior called 'Autotomy'.";
const triggers2 = [7, 15, 50];

const text3 = "Have you heard of autotomy? It’s when a lizard detaches part of its body to escape danger.";
const triggers2 = [18, 24, 55];



runIntroGrid(container1, text1, triggers1);
runIntroGrid(container2, text2, triggers2);




