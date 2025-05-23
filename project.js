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

// 텍스트 요소
const text1El = document.getElementById('text1');
const text2El = document.getElementById('text2');
const text3El = document.getElementById('text3');
const text4El = document.getElementById('text4');

// 텍스트 내용
const text1 = "Hello.\nThis is the Forest of Chara.\nA quiet corner somewhere on Earth. In this forest, many lizards live their lives.\n \nThey often resort to a behavior called 'Autotomy' to survive.";
const text2 = "Have you ever heard of 'Autotomy'? \n'Autotomy' is the behavior in which a lizard, when threatened, voluntarily detaches a part of its body to escape. They bend their bodies and renew themselves to keep living.";
const text3 = "There are times in life when we all want to run away — because we live an endlessly busy life.\n \nHow did you end up here? And do you feel like running away now?";
const text4 = "Here in this place, your autotomy is not a weakness, but the courage to move forward. Feel free to lay down your worries here and let them go.";

// 인덱스 객체로 관리
const index1 = { value: 0 };
const index2 = { value: 0 };
const index3 = { value: 0 };
const index4 = { value: 0 };

let text1Typing = false, text2Typing = false, text3Typing = false, text4Typing = false;

function typeText(targetEl, text, indexRef, callback) {
  if (indexRef.value < text.length) {
    const char = text.charAt(indexRef.value);
    targetEl.innerHTML += char === '\n' ? '<br>' : char;
    indexRef.value++;
    setTimeout(() => typeText(targetEl, text, indexRef, callback), 110);
  } else if (callback) {
    callback();
  }
}

// 텍스트 트리거 위치
const text1TriggerPoint = 280;
const text2TriggerPoint = 1800;
const text3TriggerPoint = 3500;
const text4TriggerPoint = 4700;

container.addEventListener('scroll', () => {
  const scrollX = container.scrollLeft;

  if (scrollX > text1TriggerPoint && !text1Typing && index1.value === 0) {
    text1Typing = true;
    typeText(text1El, text1, index1);
  }

  if (scrollX > text2TriggerPoint && !text2Typing && index2.value === 0) {
    text2Typing = true;
    typeText(text2El, text2, index2);
  }

  if (scrollX > text3TriggerPoint && !text3Typing && index3.value === 0) {
    text3Typing = true;
    typeText(text3El, text3, index3);
  }

  if (scrollX > text4TriggerPoint && !text4Typing && index4.value === 0) {
    text4Typing = true;
    typeText(text4El, text4, index4);
  }
});

// ✅ 오버레이 없이 PNG 이미지 토글 표시
const trigger = document.getElementById("videoTrigger"); // .music div
const image = document.createElement("img");

image.src = "img/domamusic.png"; // PNG 이미지 경로
image.id = "popupImage";
image.style.position = "fixed";
image.style.top = "100px";
image.style.left = "100px";
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
});

image.addEventListener("click", () => {
  image.style.display = "none";
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
