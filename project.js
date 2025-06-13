window.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('container');
  const loadingText = document.getElementById('loadingText');
  const enterBtn = document.getElementById('enterBtn');
  const loadingOverlay = document.getElementById('loadingOverlay');
  const popups = document.querySelectorAll('.popup-container');

const designWidth = 1920;
const designHeight = 1080;

function pxToVw(px) {
  return (px / designWidth) * 100 + 'vw';
}

function pxToVh(px) {
  return (px / designHeight) * 100 + 'vh';
}

  let percent = 0;
  const minOpacity = 0.43;

  enterBtn.classList.add('hidden');
  enterBtn.style.opacity = 0;
  enterBtn.style.pointerEvents = 'none';

  let blackCircleCount = 0;
  const maxBlackCircles = 25;
  const maxTotalCircles = 55;

  let totalCircles = 0;

  const yellowPositions = [
    { x: 300, y: 600, image: 'img/domama.png', width: 450 },
    { x: 1400, y: 300, image: 'img/domama2.png', width: 500 },
    { x: 2400, y: 300, image: 'img/domama3.png', width: 400 },
    { x: 3400, y: 600, image: 'img/domama4.png', width: 400 },
    { x: 4500, y: 250, image: 'img/domama5.png', width: 350 },
    { x: 5290, y: 720, image: 'img/domama6.png', width: 600, triggerLetter: true }
  ];

  const loadingInterval = setInterval(() => {
    percent++;
    loadingText.textContent = `Loading ${percent}%`;
    let alpha = 1 - (percent / 100) * (1 - minOpacity);
    loadingOverlay.style.backgroundColor = `rgba(255, 255, 255, ${alpha.toFixed(2)})`;

    if (percent >= 100) {
      clearInterval(loadingInterval);
      enterBtn.classList.remove('hidden');
      enterBtn.style.opacity = 1;
      enterBtn.style.pointerEvents = 'auto';
      loadingOverlay.style.backgroundColor = `rgba(255, 255, 255, ${minOpacity})`;
    }
  }, 30);

  function typeText(el, text, speed = 105, callback) {
    if (!el || el.dataset.typed === 'true') return;
    el.dataset.typed = 'true';

    let i = 0;
    el.innerHTML = '';

    function type() {
      if (i < text.length) {
        if (text[i] === '\n') {
          el.innerHTML += '<br>';
        } else {
          el.innerHTML += text[i];
        }
        i++;

        const isSpace = text[i - 1] === " ";
        const thisSpeed = isSpace ? speed * 0.1 : speed;

        setTimeout(() => {
          const blink = el.querySelector('.blink-bar');
          if (blink) blink.remove();
          type();
        }, thisSpeed);
      } else {
        const finalText = text.replace(/\n/g, '<br>');
        el.innerHTML = finalText;
        if (callback) callback();
      }
    }
    type();
  }

  function showImage(pos, size) {
    const img = document.createElement('img');
    img.src = pos.image;

    img.style.position = 'absolute';
    img.style.left = `${pos.x + size / 2}px`;
    img.style.top = `${pos.y + size / 2}px`;
    img.style.transform = 'translate(-50%, -50%)';
    img.style.zIndex = 9999;
    img.style.pointerEvents = 'auto';
    img.style.transition = 'opacity 0.3s ease';
    img.style.opacity = '1';

    const imgWidth = pos.width || 400;
    img.style.width = `${imgWidth}px`;
    img.style.height = 'auto';

    container.appendChild(img);

    setTimeout(() => {
      img.style.opacity = '1';

      if (pos.triggerLetter) {
        const linkText2 = document.createElement('div');
        linkText2.id = 'fixedLetter';
        linkText2.textContent = 'Go deeper into the forest';

        Object.assign(linkText2.style, {
          position: 'absolute',
          bottom: '5vh',
          left: '355vw',
          fontFamily: 'AlefB',
          fontSize: '1.125vw',
          color: 'black',
          cursor: "url('https://joeunbyeoll.github.io/ForestofChara/img/cursorr.png'), auto",
          zIndex: '9999',
          transition: 'background 0.3s ease, transform 0.3s ease'
        });

        linkText2.addEventListener('mouseover', () => {
          linkText2.style.transform = 'scale(1.05)';
        });

        linkText2.addEventListener('mouseout', () => {
          linkText2.style.transform = 'scale(1)';
        });

        linkText2.addEventListener('click', () => {
          window.location.href = 'forest.html';
        });

        container.appendChild(linkText2);
      }
    }, 0);
  }

  function createYellowCirclesOnce() {
    let yellowIndex = 0;

    const intervalId = setInterval(() => {
      if (yellowIndex >= yellowPositions.length) {
        clearInterval(intervalId);
        return;
      }

      const pos = yellowPositions[yellowIndex];
      const circle = document.createElement('div');
      circle.classList.add('circle', 'yellow');

      const size = 15;
      circle.style.position = 'absolute';
      circle.style.left = `${pos.x}px`;
      circle.style.top = `${pos.y}px`;
      circle.style.width = `${size}px`;
      circle.style.height = `${size}px`;

      circle.style.pointerEvents = 'auto';
      circle.style.zIndex = '2000';

      if (yellowIndex === yellowPositions.length - 1) {
        const linkText = document.createElement('div');
        linkText.textContent = 'Click me!';
        Object.assign(linkText.style, {
          position: 'absolute',
          left: `${pos.x + size / 2}px`,
          top: `${pos.y - 10}px`,
          transform: 'translate(-50%, -100%)',
          fontFamily: 'AlefB',
          fontSize: '16px',
          color: 'yellow',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: '2001',
        });
        container.appendChild(linkText);

        circle.addEventListener('click', () => {
          circle.remove();
          linkText.remove();
          showImage(pos, size);
        });
      } else {
        circle.addEventListener('click', () => {
          circle.remove();
          showImage(pos, size);
        });
      }

      container.appendChild(circle);
      yellowIndex++;
    }, 300);
  }

  function createStaticCircle() {
    if (totalCircles >= maxTotalCircles - yellowPositions.length) return;

    totalCircles++;

    const circle = document.createElement('div');
    circle.classList.add('circle');

    const circleDiameter = 15;
    const padding = 30;

    const containerWidth = container.scrollWidth - circleDiameter - 2 * padding;
    const containerHeight = container.clientHeight - circleDiameter - 2 * padding;

    // 수정된 부분: 좌우 전체에서 균등 분포
    const x = padding + Math.random() * containerWidth;
    const y = padding + Math.random() * containerHeight;

    circle.style.position = 'absolute';
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    circle.style.width = `${circleDiameter}px`;
    circle.style.height = `${circleDiameter}px`;

    const shouldBeBlack = Math.random() < 0.3 && blackCircleCount < maxBlackCircles;

    if (shouldBeBlack) {
      circle.classList.add('black');
      blackCircleCount++;
      circle.style.pointerEvents = 'auto';
      circle.style.zIndex = '2000';

      circle.addEventListener('click', () => {
        circle.remove();
        blackCircleCount--;
      });
    } else {
      circle.style.pointerEvents = 'none';
      circle.style.zIndex = '1000';
    }

    container.appendChild(circle);
  }

  function startStaticCircleGeneration() {
    createYellowCirclesOnce();

    const intervalId = setInterval(() => {
      if (totalCircles >= maxTotalCircles - yellowPositions.length) {
        clearInterval(intervalId);
        return;
      }
      createStaticCircle();
    }, 300);
  }

  enterBtn.addEventListener('click', () => {
    loadingOverlay.style.display = 'none';

    typeText(
      document.getElementById("text1"),
      "Hello, \nthis                   is      the\n          Forest    of   Chara,\n a\n      quiet\n                corner\n somewhere   on   Earth.",
      100,
      () => {
        typeText(
          document.getElementById("text1s"),
          "안녕하세요. \n이 곳은\n지\n구\n어\n딘\n가\n의\n모퉁이, 차라의 숲입니다."
        );
      }
    );

    startStaticCircleGeneration();

    const scrollTexts = [
      {
        id: 'text2',
        text: "Many lizards live in this forest.\nTo    survive,    they    often\nrely   on   a   behavior\n        called\n'Autotomy'. \nHave  you  heard  of  autotomy?\nIt’s when a lizard detaches part of \ni t s   b o d y   t o  e s c a p e   d a n g e r."
      },
      {
        id: 'text3',
        text: "They bend their bodies and \nrenew  t h e m s e l v e s\n     to\n       keep\n        living.\nThere are times in life\nwhen we  all  want  to  run  away\nbecause  we  live  an  endlessly  busy  life."
      },
      {
        id: 'text4',
        text: "How  did  you  end  up  here?\n And  do  you  feel  like  running  away  now?\n  Here in this place, your autotomy is not a weakness,\n   but the courage to move forward...\n    Go deeper into the forest and let it all out."
      },
    ];

    const typedMap = new Map();
    scrollTexts.forEach(({ id, text }) => {
      const el = document.getElementById(id);
      if (el) {
        el.dataset.text = text;
        typedMap.set(id, false);
      }
    });

    container.addEventListener('scroll', () => {
      scrollTexts.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el || typedMap.get(id)) return;

        const rect = el.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        if (
          rect.left >= containerRect.left &&
          rect.left <= containerRect.left + container.clientWidth * 0.6
        ) {
          typeText(el, el.dataset.text);
          typedMap.set(id, true);
        }
      });
    });
  });

  container.addEventListener('wheel', (e) => {
    e.preventDefault();
    container.scrollLeft += e.deltaY;
  }, { passive: false });
});
