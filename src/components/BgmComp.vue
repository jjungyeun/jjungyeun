<template>
<div class="bgm-container">
    <!-- 음악 재생/일시정지 버튼 -->
    <div @click="toggleBgm" class="bgm-button"
        :class="{ playing: isPlaying }">
        <img :src="isPlaying ? pauseImg : playImg" alt="음악 컨트롤 버튼" />
    </div>
    <!-- 오디오 요소 -->
    <audio ref="bgm" :src="bgmSrc" loop autoplay></audio>
</div>
</template>

<script>
import bgmSrc from "@/assets/audio/bgm-iu.mp3";
import playImg from "@/assets/images/play.png";
import pauseImg from "@/assets/images/pause.png";

export default {
    data() {
        return {
            isPlaying: false, // 음악 재생 상태
            bgmSrc, // 오디오 경로
            playImg, // 재생 이미지 경로
            pauseImg, // 일시정지 이미지 경로
        };
    },
    methods: {
        toggleBgm() {
            const bgm = this.$refs.bgm;
            if (this.isPlaying) {
                bgm.pause();
            } else {
                bgm.play();
            }
            this.isPlaying = !this.isPlaying; // 상태 변경
        },
        initBgm() {
            // 첫 상호작용 시 자동 재생
            const bgm = this.$refs.bgm;
            bgm.play()
                .then(() => {
                    this.isPlaying = true; // 성공적으로 재생된 경우 상태 업데이트
                })
                .catch((error) => {
                    console.error("오디오 초기 재생 오류:", error);
                });

            // 이벤트 리스너 제거 (한 번만 실행)
            window.removeEventListener("click", this.initBgm);
            window.removeEventListener("touchstart", this.initBgm);
        },
    },
    mounted() {
        // 볼륨 설정 (50%)
        this.$refs.bgm.volume = 0.5;
        window.addEventListener("click", this.initBgm, { once: true }); // 한 번만 실행
        window.addEventListener("touchstart", this.initBgm, { once: true }); // 모바일 대응
    },
};
</script>

<style scoped>
/* 플로팅 버튼 컨테이너 */
.bgm-container {
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 1000;
}

/* 재생/일시정지 버튼 스타일 */
.bgm-button {
    border: none;
    width: 25px;
    height: 25px;
    display: flex;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary-color-light-purple), var(--primary-color-dark-purple));
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

/* PC 버전 */
@media (min-width: 480px) {
  .bgm-container {
    top: 30px;
    left: calc(50% - 225px);
  }
}

/* 배경 회전 애니메이션 */
.bgm-button::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: inherit; /* 부모의 배경 그라데이션 상속 */
  border-radius: 50%;
  z-index: 0; /* 이미지 아래로 배치 */
  animation: none; /* 기본 상태에서 애니메이션 없음 */
}

/* 재생 중 배경 회전 */
.bgm-button.playing::before {
  animation: spin 2s linear infinite; /* 회전 애니메이션 */
}

.bgm-button img {
    width: 12px;
    height: 12px;
    margin: auto;
    position: relative;
    z-index: 1;
}

/* 마우스 올렸을 때 */
.bgm-button:hover {
    transform: scale(1.1); /* 크기 확대 (10%) */
}

/* 회전 애니메이션 */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

</style>
  