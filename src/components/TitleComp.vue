<template>
    <div class="contents">
      <!-- 상단 제목 -->
      <div class="title">우리 결혼합니다</div>

      <!-- 사진 영역 -->
      <div class="photo-frame">
        <canvas id="flowerCanvas" class="flower-canvas"></canvas>
        <img src="@/assets/images/title.png" alt="Wedding Main Photo" class="photo" />
      </div>

      <!-- 하단 텍스트 -->
      <div class="details">
          <div class="couple-name">신랑 김영진 ♥ 신부 원정연</div>
          <div class="date-time">
              {{ formattedWeddingDate }}
          </div>
      </div>
    </div>
</template>

<script>
import { GuestType, GuestStatus } from '@/constants';
import { format } from "date-fns";

import flowerSrc1 from "@/assets/images/leaf1.png";
import flowerSrc2 from "@/assets/images/leaf2.png";

export default {
  name: "TitleComponent",
  props: {
    guest_type: {
      type: String,
      required: true,
      validator(value) {
        return Object.values(GuestType).includes(value);
      }
    },
    guest_status: {
      type: Object,
      required: false,
      default: GuestStatus.JY_DAD,
    }
  },
  computed: {
    GuestType() {
      return GuestType;
    },
    GuestStatus() {
      return GuestStatus;
    },
    weddingDate() {
        return this.guest_status.date;
    },
    formattedWeddingDate() {
        // 시간 확인: 오전 12시 정각이면 시간 아예 생략
        const hours = this.weddingDate.getHours();
        const minutes = this.weddingDate.getMinutes();

        // 오전 12시 정각 처리
        if (hours === 0 && minutes === 0) {
          return format(this.weddingDate, "yyyy. M. d. EEEE");
        } else {
          return format(this.weddingDate, "yyyy. M. d EEE HH:mm");
        }
    },
  },
  mounted() {
    const canvas = document.getElementById("flowerCanvas");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      const parent = canvas.parentElement; // 부모 컨테이너 가져오기
      if (!parent) {
        console.error("Canvas의 부모 요소를 찾을 수 없습니다.");
        return;
      }

      const dpr = window.devicePixelRatio || 1;
      canvas.width = parent.offsetWidth * dpr;
      canvas.height = parent.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    }

    // 캔버스 크기 설정
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles = [];
    const particleCount = 20;

    // 꽃잎 이미지 배열
    const images = [new Image(), new Image()];
    images[0].src = flowerSrc1; // 첫 번째 꽃잎 이미지
    images[1].src = flowerSrc2; // 두 번째 꽃잎 이미지

    // 파티클 클래스
    class Particle {
      constructor(images) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 7;
        this.speedX = Math.random() * -0.3 - 0.2; // 수평 이동 속도 (-0.5 ~ -0.2)
        this.speedY = Math.random() * 0.3 + 0.2; // 수직 이동 속도 (0.2 ~ 0.5)
        this.opacity = Math.random() * 0.3 + 0.7; // 투명도 (0.7 ~ 1.0)
        this.rotation = Math.random() * 360; // 초기 회전 각도
        this.rotationSpeed = Math.random() * 2 - 1; // 회전 속도 (-1 ~ 1)
        this.image = images[Math.floor(Math.random() * images.length)]; // 랜덤 이미지 선택
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        // 화면 아래로 나가면 다시 위로 이동
        if (this.y > canvas.height) {
          this.y = 0 - this.size;
          this.x = Math.random() * canvas.width;
          this.speedY = Math.random() * 0.3 + 0.2;
        }

        // 화면 왼쪽 밖으로 나가면 오른쪽으로 재배치
        if (this.x < 0 - this.size) {
          this.x = canvas.width + this.size;
        }
      }

      draw(ctx) {
        ctx.save(); // Canvas 상태 저장
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x + this.size / 2, this.y + this.size / 2); // 회전 중심 설정
        ctx.rotate((this.rotation * Math.PI) / 180); // 회전 적용
        ctx.drawImage(this.image, -this.size / 2, -this.size / 2, this.size, this.size); // 이미지 그리기
        ctx.restore(); // Canvas 상태 복구
      }
    }

    // 모든 이미지가 로드된 후 파티클 초기화
    Promise.all(
      images.map(
        (img) =>
          new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = () => {
              console.error("이미지 로드 실패:", img.src);
              reject(new Error(`이미지 로드 실패: ${img.src}`));
            };
          })
      )
    ).then(() => {
      initParticles();
      animate();
    })
    .catch((error) => {
      console.error("꽃잎 초기화 실패:", error);
    });

    function initParticles() {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(images));
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw(ctx);
      });
      requestAnimationFrame(animate);
    }
  },
};
</script>

<style scoped>
.contents {
  padding-top: 100px;
}

/* 제목 스타일 */ 
.title {
  font-size: 45px;
  font-weight: lighter;
  font-style: italic;
  color: var(--primary-color-purple);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  font-family: 'Cafe24Shiningstar', sans-serif;
}

/* 사진 프레임 */
.photo-frame {
    position: relative;
    display: flex; /* Flexbox로 가로/세로 중앙 정렬 */
    justify-content: center; /* 가로 중앙 */
    width: 80%; /* 사진 프레임 너비 */
    max-width: 350px; /* 최대 너비 제한 */
    aspect-ratio: 3 / 4;
    overflow: hidden;
    margin-top: 50px;
}

/* 사진 스타일 */
.photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.flower-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* 클릭 이벤트가 캔버스 아래로 전달되도록 설정 */
  z-index: 1; /* 이미지 위에 표시되도록 설정 */
}

/* 하단 텍스트 영역 */
.details {
  margin-top: 40px;
}

/* 커플 이름 */
.couple-name {
  font-size: 26px;
  color: var(--text-color-dark-gray);
  font-family: 'ChosunNm', sans-serif;
}

/* 날짜와 시간 */
.date-time {
  font-size: 20px;
  color: var(--text-color-light-gray);
  margin-top: 30px;
}
</style>