<template>
    <div class="contents">
        <div class="gallery">
            
            <div class="title">GALLERY</div>
            <div class="description">사진을 클릭하시면 전체 화면 보기가 가능합니다.</div>

            <div class="thumbnails-container"
                @mousedown="startDrag"
                @mousemove="onDrag"
                @mouseup="endDrag"
                @mouseleave="endDrag">
                
                <!-- 왼쪽 화살표 -->
                <button class="arrow left" @click="prevThumbnail">◀</button>
        
                <div class="thumbnail-wrapper">
                    <img :src="thumbnails[currentIndex]"
                        alt="Thumbnail"
                        class="thumbnail"
                        draggable="false"
                        @mousedown.prevent
                        @click="handleClick"
                    />
                </div>
        
                <!-- 오른쪽 화살표 -->
                <button class="arrow right" @click="nextThumbnail">▶</button>
            </div>
            <!-- 썸네일 하단 숫자 -->
            <div class="thumbnail-index">
            {{ currentIndex + 1 }} / {{ thumbnails.length }}
            </div>
        </div>
  
      <GalleryModal
        v-if="isModalOpen"
        :isOpen="isModalOpen"
        :images="images"
        :initialIndex="currentIndex"
        @close="closeModal"
      />
    </div>
  </template>
  
  <script>
  import GalleryModal from "@/components/GalleryModal.vue";

import photoThumb1 from "@/assets/images/gallery/photo1_thumb.jpg";
import photoThumb2 from "@/assets/images/gallery/photo2_thumb.jpg";
import photoThumb3 from "@/assets/images/gallery/photo3_thumb.jpg";
import photoThumb4 from "@/assets/images/gallery/photo4_thumb.jpg";

import photo1 from "@/assets/images/gallery/photo1.jpg";
import photo2 from "@/assets/images/gallery/photo2.jpg";
import photo3 from "@/assets/images/gallery/photo3.jpg";
import photo4 from "@/assets/images/gallery/photo4.jpg";

export default {
    components: { GalleryModal },
    data() {
      return {
        isModalOpen: false,
        currentIndex: 0, // 현재 선택된 썸네일 인덱스
        thumbnails: [
            photoThumb1, photoThumb2, photoThumb3, photoThumb4,
        ],
        images: [
            photo1, photo2, photo3, photo4,
        ],
        isDragging: false, // 드래그 중 여부
        dragStartX: 0, // 드래그 시작 X 좌표
        dragOffset: 0, // 드래그로 이동한 거리
        parentWidth: 0,
        clickPrevented: false, // 드래그 시 클릭 방지 플래그
      };
    },
  computed: {
    clonedThumbnails() {
      return [this.thumbnails[this.thumbnails.length - 1], this.thumbnails[0]];
    },
  },
    methods: {
      openModal(index) {
        this.isModalOpen = true;
      },
      closeModal() {
        this.isModalOpen = false;
      },
      prevThumbnail() {
        if (this.currentIndex > 0) {
          this.currentIndex--;
        } else {
            this.currentIndex = this.thumbnails.length - 1;
        }
      },
      nextThumbnail() {
        if (this.currentIndex < this.thumbnails.length - 1) {
          this.currentIndex++;
        } else {
            this.currentIndex = 0;
        }
      },
    handleClick() {
      if (this.clickPrevented) {
        // 드래그 중 발생한 클릭은 무시
        this.clickPrevented = false;
        return;
      }
      this.openModal(this.currentIndex);
    },
}
};
  </script>
  
  <style scoped>
  .contents {
    height: 1000px;
    background-color: white;
    font-family: 'NanumSquareRoundR', sans-serif;
    color: var(--text-color-light-gray);
  }
  .gallery {
    margin: auto;
    width: 100%;
  }
  .title {
    font-size: 45px;
    color: var(--text-color-point-navy);
    font-family: 'ChosunNm', sans-serif;
    font-weight: lighter;
    margin-bottom: 20px;
  }
  .description {
    font-size: 14px;
    margin-bottom: 30px;
  }
  .thumbnails-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 500px;
    width: 100%;
  }

.thumbnail-wrapper {
    display: flex;
    align-items: center;
    width: 70%;
    height: 100%;
    overflow: hidden;
}

.thumbnail-index {
  margin-top: 10px;
  font-size: 13px;
  color: var(--text-color-light-gray);
}
  .thumbnail {
    width: 100%;
    border-radius: 10px;
    cursor: pointer;
    transition: transform 0.3s ease;
    object-fit: contain;
  }
  .arrow {
    position: absolute;
    background: none;
    border: none;
    font-size: 15px;
    color: var(--text-color-light-gray);
    cursor: pointer;
    z-index: 10;
  }
  .arrow.left {
    left: 20px; /* 왼쪽 화살표 위치 */
  }
  .arrow.right {
    right: 20px; /* 오른쪽 화살표 위치 */
  }
  .arrow:hover {
    color: var(--primary-color-purple);
  }
  </style>
  