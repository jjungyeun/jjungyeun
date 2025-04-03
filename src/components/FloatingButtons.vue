<template>
    <div>
        <div class="floating-buttons" :class="{ desktop: isDesktop }" ref="buttonsContainer">
            <div v-show="!showButtons"
                class="floating-button share-button"
                @click="toggleButtons"
                data-tooltip="공유하기">
                <img class="floating-image" src="@/assets/images/share.png"/>
            </div>

            <div v-show="showButtons" class="expanded-buttons">
                <!-- 카카오톡 공유 버튼 -->
                <div class="floating-button kakao-button" 
                    @click="shareToKakao"
                    data-tooltip="카카오톡으로 공유"
                    >
                    <img class="floating-image" src="@/assets/images/kakaotalk.png"/>
                </div>
                <!-- 링크 복사 버튼 -->
                <div class="floating-button copy-button" 
                    @click="copyLink"
                    data-tooltip="청첩장 링크 복사"
                >
                    <img class="floating-image" src="@/assets/images/link-copy.png"/>
                </div>
                <!-- 닫기 버튼 -->
                <div class="floating-button x-button" 
                    @click="toggleButtons"
                    data-tooltip="닫기"
                >
                    <img class="floating-image" src="@/assets/images/x.png"/>
                </div>
            </div>
            
        </div>
        <Toast v-if="showToast" :message="toastMessage" position="top" />
    </div>
  </template>
  
  <script>
import Toast from "@/components/ToastComp.vue";

import { GuestStatus } from '@/constants';
import { format } from "date-fns";
import { ko } from "date-fns/locale";

export default {
    name: "FloatingButtons",
    components: { Toast },
    props: {
      guest_status: {
        type: Object,
        required: false,
        default: GuestStatus.DEFAULT,
      }
    },
    data() {
      return {
        showToast: false,
        toastMessage: "",
        isDesktop: window.innerWidth >= 480, // 초기 화면 크기에 따라 설정
        showButtons: false, // 링크 복사 버튼 표시 여부
        kakaoApiKey: import.meta.env.VITE_KAKAO_API_KEY,
      };
    },
    methods: {
      toggleButtons() {
        this.showButtons = !this.showButtons; // 버튼 표시 상태 토글
      },
      getShareMessage() {
        var message = `🗓️ ${this.formattedWeddingDate}`;

        if (this.guest_status == GuestStatus.JY_DAD || this.guest_status == GuestStatus.YJ_MOM) {
          message += `\n🚩 파티앤프렌즈 파블로홀`;
        } else if (this.guest_status == GuestStatus.JY_MOM) {
          message += `\n🚩 바오로차이나`;
        } else if (this.guest_status == GuestStatus.YJ_DAD) {
          message += `\n🚩 남악동경일식`;
        }

        return message;
      },
      shareToKakao() {
        const url = new URL(window.location.href);
        const fullPath = url.hash;

        Kakao.Share.sendCustom({
          templateId: 116773,
          templateArgs: {
            "DESCRIPTION": this.getShareMessage(),
            "PATH": fullPath,
          }
        });
      },
      copyLink() {
        const currentUrl = window.location.href; // 현재 페이지의 전체 URL 가져오기
        var shareMessage = "[신랑 김영진 ♥ 신부 원정연]\n결혼을 축하해주세요😊";
        shareMessage += "\n---------------";
        shareMessage += `\n${this.getShareMessage()}`;
        shareMessage += "\n---------------";
        shareMessage += "\n↓↓ 청첩장 보러가기 ↓↓"
        shareMessage += `\n${currentUrl}`;

        navigator.clipboard.writeText(shareMessage).then(() => {
          this.toastMessage = "청첩장 링크가 복사되었습니다😊";
          this.showToast = true;
        }).catch(err => {
          this.toastMessage = "청첩장 링크 복사에 실패했습니다😭";
          this.showToast = true;
        }).finally(() => {
          // 토스트가 사라진 후 상태 초기화
          setTimeout(() => {
            this.showToast = false;
          }, 2000);
        });
      },
      updateLayout() {
        this.isDesktop = window.innerWidth >= 480;
      },
    },
    mounted() {
      window.addEventListener("resize", this.updateLayout);
      Kakao.init(this.kakaoApiKey);
    },
    computed: {
      weddingDate() {
          return this.guest_status.date;
      },
      formattedWeddingDate() {
          // 시간 확인: 오전 12시 정각이면 시간 아예 생략
          // 분 값 확인: 0이면 분 생략, 그렇지 않으면 분 포함
          const hours = this.weddingDate.getHours();
          const minutes = this.weddingDate.getMinutes();

          // 오전 12시 정각 처리
          if (hours === 0 && minutes === 0) {
            return format(this.weddingDate, "yyyy.M.d(EEE)", { locale: ko });
          } else {
            return format(this.weddingDate, "yyyy.M.d(EEE) HH:mm", { locale: ko });
          }
      }
    },
    beforeDestroy() {
      window.removeEventListener("resize", this.updateLayout);
    },
  };
  </script>
  
  <style scoped>
  /* 공통 스타일 */
  .floating-buttons {
    position: fixed;
    display: flex;
    flex-direction: column-reverse; /* 버튼 확장 시 위로 올라가게 */
    align-items: flex-end;
    z-index: 1000;
  }

  /* 모바일 화면: 컨텐츠 내부 우측 하단 */
  .floating-buttons {
    right: 20px; /* 화면 우측에서 20px 떨어짐 */
    bottom: 20px; /* 화면 하단에서 20px 떨어짐 */

    /* 공유 버튼에는 툴팁 제외 */
    .share-button[data-tooltip]::after {
        display: none;
    }
  }

/* 모바일 툴팁 스타일 */
.floating-button[data-tooltip]::after {
  content: attr(data-tooltip);
  position: absolute;
  right: 100%; /* 기본 위치: 버튼 왼쪽 */
  transform: translateY(-50%) translateX(-10px);
  white-space: nowrap;
  opacity: 1;
  visibility: visible;
  z-index: 1000; /* 겹치지 않게 */
  transition: opacity 0.2s ease, transform 0.2s ease;

  color: var(--text-color-dark-gray);
  font-size: 12px;
  font-weight: bold;
  text-shadow: 
    -1px -1px 0 rgba(255, 253, 240, 0.2), /* 왼쪽 위 */
    1px -1px 0 rgba(255, 253, 240, 0.2),  /* 오른쪽 위 */
    -1px 1px 0 rgba(255, 253, 240, 0.2),  /* 왼쪽 아래 */
    1px 1px 0 rgba(255, 253, 240, 0.2);   /* 오른쪽 아래 */
}
.floating-button.kakao-button::after {
    top: calc(50% - 55px);
}
.floating-button.copy-button::after {
    top: 50%;
}
.floating-button.x-button::after {
    top: calc(50% + 55px);
}

  /* PC 화면: 컨텐츠 박스 오른쪽에 고정 */
  .floating-buttons.desktop {
    right: clamp(10px, calc(50% - 250px - 50px), 2000px); /* 가운데 컨텐츠 박스의 오른쪽에 붙음 */
    .floating-button {
        border: 0px;
        background-color: var(--background-yellow);
    }
    .floating-image {
        width: 30px;
    }
    
    .floating-button[data-tooltip]::after {
        top: 50%; /* 버튼 세로 중앙 */
        background-color: rgba(33, 46, 59, 0.9);
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 13px;
        opacity: 0; /* 기본적으로 숨김 */
        visibility: hidden;
        font-weight: normal;
        text-shadow:none;
    }

    .floating-button:hover::after {
        opacity: 1;
        visibility: visible;
        transform: translateY(-50%) translateX(-15px); /* 툴팁이 부드럽게 나타남 */
    }

    .share-button[data-tooltip]::after {
        display: block;
    }
  }
  
  /* 버튼 스타일 */
  .floating-button {
    margin-top: 10px;
    border-radius: 50%;
    padding: 10px;
    cursor: pointer;
    background-color: rgba(255, 253, 240, 0.2);
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease, background-color 0.2s ease;
  }

  .floating-image {
    width: 25px;
    vertical-align: middle;
  }
  
  .floating-button:hover {
    transform: scale(1.05);
  }

  

.expanded-buttons {
  animation: slideDown 0.3s ease-out; /* 버튼 슬라이드 애니메이션 */
}
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
  </style>
  