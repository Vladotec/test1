const parallax = document.getElementById("home-img-lg");
const parallax1 = document.getElementById("parallax1");
const parallax2 = document.getElementById("parallax2");
const icon = document.getElementById('icon');


// heard
document.querySelectorAll('.paw-button').forEach(elem => {
  elem.addEventListener('click', e => {
      if(!elem.classList.contains('animation')) {
          elem.classList.add('animation');
      } else {
          elem.classList.remove('animation');
      }
      e.preventDefault();
  });
});

 // Добавляем событие клика
 icon.addEventListener('click', () => {
  // Запуск конфетти
  confetti({
    particleCount: 100, // Количество частиц
    spread: 70,         // Разлет частиц
    origin: { x: 0.5, y: 0.5 } // Откуда стартует (центр элемента)
  });
});

// Функция для обработки параллакса
function parallaxEffect(element, factorX = 0, factorY = 0, offset = 0) {
  window.addEventListener("scroll", function() {
      let offsetScroll = window.scrollY - offset;
      let backgroundPosX = offsetScroll * factorX;
      let backgroundPosY = offsetScroll * factorY;

      if (factorX !== 0) {
          element.style.backgroundPositionX = backgroundPosX + "px";
      }
      if (factorY !== 0) {
          element.style.backgroundPositionY = backgroundPosY + "px";
      }
  });
}

// Применяем параллакс-эффект для каждого элемента
parallaxEffect(parallax, -0.3, 0, 0);         // для parallax по оси X
parallaxEffect(parallax1, 0, 0.1, 3100);      // для parallax1 по оси Y
parallaxEffect(parallax2, 0, -0.1, 4800);     // для parallax2 по оси Y

// Функция для блокировки прокрутки при открытом меню
function blockScrolling() {
  document.body.style.overflow = 'hidden'; // Блокировка прокрутки
}

function allowScrolling() {
  document.body.style.overflow = ''; // Восстановление прокрутки
}

// Функция для закрытия меню при клике (если используем чекбокс)
function myFunction() {
  document.getElementById("check").checked = false;
  allowScrolling(); // Разблокируем прокрутку
}

// Оптимизация для функции "reveal" (анимируем элементы при прокрутке)
function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;

      if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add("active");
      } else {
          reveals[i].classList.remove("active");
      }
  }
}

// Функция для оптимизации прокрутки (throttle)
let throttleTimeout;
window.addEventListener("scroll", function() {
  if (!throttleTimeout) {
      throttleTimeout = setTimeout(() => {
          reveal(); // Вызов функции reveal
          throttleTimeout = null; // Сбросить таймаут
      }, 100); // Прокрутка будет обрабатываться не чаще, чем раз в 100 мс
  }
});

// Инициализация для блокировки прокрутки при открытом меню
const checkbox = document.getElementById('check');
checkbox.addEventListener('change', function() {
  if (this.checked) {
      blockScrolling(); // Блокируем прокрутку, когда меню открыто
  } else {
      allowScrolling(); // Восстанавливаем прокрутку, когда меню закрыто
  }
});