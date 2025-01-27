<template>
    <div class="contents">
        <!-- 상단 제목 -->
        <div class="title">우리 결혼합니다</div>

        <!-- 사진 영역 -->
        <div class="photo-frame">
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
};
</script>

<style scoped>
.contents {
  margin-top: 100px;
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
    display: flex; /* Flexbox로 가로/세로 중앙 정렬 */
    justify-content: center; /* 가로 중앙 */
    width: 80%; /* 사진 프레임 너비 */
    max-width: 350px; /* 최대 너비 제한 */
    overflow: hidden;
    margin-top: 50px;
}

/* 사진 스타일 */
.photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
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