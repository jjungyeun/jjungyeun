<template>
    <div class="modal-overlay" @click="handleClick">
      <div class="modal-content">
        <!-- 닫기 버튼 -->
        <div class="close-button">×</div>
  
        <!-- 화살표 -->
        <div class="arrow left" @click="prevImage">◀</div>
        
        
        <!-- 이미지 -->
        <div class="image-wrapper">
            <img 
            :src="images[currentIndex]"
            alt="Original Image"
            class="modal-image"
            />
            <!-- 페이지 표시 -->
            <div class="page-indicator">
            {{ currentIndex + 1 }} / {{ images.length }}
            </div>
        </div>
  
        <!-- 오른쪽 화살표 -->
        <div class="arrow right" @click="nextImage">▶</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isOpen: {
        type: Boolean,
        required: true,
      },
      images: {
        type: Array,
        required: true,
      },
      initialIndex: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        currentIndex: this.initialIndex, // 현재 이미지 인덱스
      };
    },
    methods: {
    handleClick(event) {
      // 클릭 대상이 이미지, 화살표 또는 페이지 표시가 아닌 경우 모달 닫기
      const excludedClasses = ["modal-image", "arrow", "page-indicator"];
        if (!excludedClasses.some((className) => event.target.classList.contains(className))) {
            this.close();
        }
    },
      close() {
        this.$emit("close"); // 부모 컴포넌트로 닫기 이벤트 전송
      },
      prevImage() {
        this.currentIndex =
          this.currentIndex > 0
            ? this.currentIndex - 1
            : this.images.length - 1; // 첫 번째에서 이전으로 가면 마지막 이미지로 이동
      },
      nextImage() {
        this.currentIndex =
          this.currentIndex < this.images.length - 1
            ? this.currentIndex + 1
            : 0; // 마지막에서 다음으로 가면 첫 번째 이미지로 이동
      },
    },
  };
  </script>
  
  <style scoped>
  /* 모달 오버레이 */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8); /* 어두운 반투명 배경 */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  /* 모달 콘텐츠 */
  .modal-content {
    position: relative;
    width: 95%;
    height: 95%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  /* 닫기 버튼 */
  .close-button {
    position: absolute;
    top: 10px; /* 화면 상단에 위치 */
    right: 10px; /* 화면 우측에 위치 */
    background: none;
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    z-index: 20;
  }
  
  .close-button:hover {
    color: var(--primary-color-purple);
  }
  
/* 이미지 래퍼 */
.image-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

  /* 이미지 */
  .modal-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain; /* 가로 또는 세로로 꽉 차게 */
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  }

/* 페이지 표시 */
.page-indicator {
  position: absolute;
  bottom: 20px; /* 이미지 아래쪽에 배치 */
  color: var(--text-color-white-gray);
  font-size: 13px;
  font-family: 'NanumSquareRoundR', sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 20;
}
  
  /* 화살표 */
  .arrow {
    position: absolute;
    top: 50%; /* 세로 중앙 정렬 */
    transform: translateY(-50%);
    color: var(--text-color-white-gray);
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 10;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .arrow.left {
    left: 10px; /* 왼쪽 화살표 위치 */
  }
  
  .arrow.right {
    right: 10px; /* 오른쪽 화살표 위치 */
  }
  </style>
  