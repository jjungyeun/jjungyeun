<template>
    <div class="contents">
        <div class="wedding-countdown">
            <!-- 상단 타이틀 -->
            <div class="title">WEDDING DAY</div>
            <div class="date-text">{{ formattedWeddingDate }}</div>
            <div class="date-subtext">{{ formattedSubWeddingDate }}</div>

            <div class="row">
                <hr class="divider" />
            </div>
        
            <!-- 달력 -->
            <div class="calendar">
                <div class="calendar-header">
                    <!-- 요일 헤더 -->
                    <span v-for="day in daysOfWeek" :key="day">{{ day }}</span>
                </div>
                <div class="calendar-body">
                    <span
                        v-for="(day, index) in calendarDays" :key="index"
                        :class="{ 'current-day': day === weddingDay, 'empty-day': !day }">
                        {{ day || '' }}
                    </span>
                </div>
            </div>

            <div class="row">
                <hr class="divider" />
            </div>
        
            <!-- 남은 시간 -->
            <div class="countdown">
                <div class="countdown-item" v-for="(time, key) in remainingTime" :key="key">
                    <div class="countdown-box">
                        <span class="value">{{ time }}</span>
                        <span class="label">{{ ddayTags[key] }}</span>
                    </div>
                </div>
            </div>
        
            <!-- 하단 메시지 -->
            <p class="footer-text">{{ daysUntilWedding }}</p>
        </div>
    </div>
</template>
  
<script>
  import { format, getDaysInMonth, startOfMonth } from "date-fns";
  import { ko } from "date-fns/locale";

  export default {
    name: "CalendarComponent",
    props: {
        guest_status: {
          type: Object,
          required: true,
        }
    },
    data() {
      return {
        days: Array.from({ length: 31 }, (_, i) => i + 1), // 1일부터 31일까지
        remainingTime: {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        },
        ddayTags: {
            "days": "일",
            "hours": "시간",
            "minutes": "분",
            "seconds": "초",
        }
      };
    },
    computed: {
        weddingDate() {
            return this.guest_status.date;
        },
        weddingDay() {
        return this.weddingDate.getDate();
        },
        daysUntilWedding() {
          // 오늘 날짜와 결혼 날짜를 "날짜만" 비교
          const nowDate = new Date();
          const today = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate()); // 오늘 날짜만
          const wedding = new Date(this.weddingDate.getFullYear(), this.weddingDate.getMonth(), this.weddingDate.getDate()); // 결혼 날짜만

          const diff = wedding - today; // 밀리초 단위 차이
          const remainDate = Math.floor(diff / (1000 * 60 * 60 * 24)); // 남은 일수 계산

          console.log(diff, remainDate); // 디버깅용

          if (remainDate > 0) {
            return `영진 & 정연 결혼이 ${remainDate}일 남았습니다`;
          } else if (remainDate === 0) {
            return "영진 & 정연 결혼의 날입니다";
          } else {
            return `영진 & 정연 결혼이 ${-remainDate}일 지났습니다`;
          }
        },
        formattedWeddingDate() {
            // 시간 확인: 오전 12시 정각이면 시간 아예 생략
            // 분 값 확인: 0이면 분 생략, 그렇지 않으면 분 포함
            const hours = this.weddingDate.getHours();
            const minutes = this.weddingDate.getMinutes();

            // 오전 12시 정각 처리
            if (hours === 0 && minutes === 0) {
              return format(this.weddingDate, "yyyy년 M월 d일 EEEE", { locale: ko });
            }

            // 일반 시간 출력
            if (minutes === 0) {
              return format(this.weddingDate, "yyyy년 M월 d일 EEEE a h시", { locale: ko });
            } else {
              return format(this.weddingDate, "yyyy년 M월 d일 EEEE a h시 m분", { locale: ko });
            }
        },
        formattedSubWeddingDate() {
          const hours = this.weddingDate.getHours();
          const minutes = this.weddingDate.getMinutes();

          // 오전 12시 정각 처리
          if (hours === 0 && minutes === 0) {
            return format(this.weddingDate, "EEEE, MMMM d, yyyy");
          } else {
            return format(this.weddingDate, "EEEE, MMMM d, yyyy  h:mm a");
          }
        },
        daysOfWeek() {
            return ["일", "월", "화", "수", "목", "금", "토"];
        },
        calendarDays() {
            // 해당 월의 첫 번째 날짜와 총 날짜 계산
            const firstDayOfMonth = startOfMonth(this.weddingDate); // 월의 첫 번째 날짜
            const totalDays = getDaysInMonth(this.weddingDate); // 해당 월의 총 날짜
            const startDay = firstDayOfMonth.getDay(); // 첫 번째 요일 (0: 일요일, 6: 토요일)

            // 빈 칸(첫 주 앞부분)과 실제 날짜로 구성된 배열 생성
            return Array.from({ length: startDay }, () => null) // 빈 칸 추가
                .concat(Array.from({ length: totalDays }, (_, i) => i + 1)); // 날짜 추가
        },
    },
    mounted() {
        this.updateCountdown();
        setInterval(this.updateCountdown, 1000); // 1초마다 남은 시간 업데이트
    },
    methods: {
        updateCountdown() {
            const now = new Date();
            const diff = this.weddingDate - now;

            if (diff > 0) {
              // 날짜가 남아 있을 경우, 남은 시간 계산
              this.remainingTime.days = Math.floor(diff / (1000 * 60 * 60 * 24));
              this.remainingTime.hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
              this.remainingTime.minutes = Math.floor((diff / (1000 * 60)) % 60);
              this.remainingTime.seconds = Math.floor((diff / 1000) % 60);
            } else {
              // 날짜가 지났을 경우, 경과 시간 계산
              const elapsed = Math.abs(diff); // 절대값으로 경과 시간 계산
              this.remainingTime.days = Math.floor(elapsed / (1000 * 60 * 60 * 24));
              this.remainingTime.hours = Math.floor((elapsed / (1000 * 60 * 60)) % 24);
              this.remainingTime.minutes = Math.floor((elapsed / (1000 * 60)) % 60);
              this.remainingTime.seconds = Math.floor((elapsed / 1000) % 60);
            }
        },
    },
  };
</script>
  
<style scoped>
  .contents {
    height: 1000px;
    background-color: var(--text-color-point-navy);
  }
  .wedding-countdown {
    margin: auto;
    text-align: center;
    font-family: 'ChosunNm', sans-serif;
    color: var(--text-color-white-gray);
    padding: 20px;
  }
  .title {
    font-size: 45px;
    font-weight: lighter;
    color: var(--text-color-point-gold);
    margin-bottom: 50px;
  }
  .date-text {
    font-size: 20px;
    font-family: 'GangwonEduAllL', sans-serif;
  }
  .date-subtext {
    font-size: 15px;
    font-style: italic;
    font-family: 'GangwonEduAllL', sans-serif;
    color: var(--text-color-lightlight-gray);
    margin-top: 8px;
  }
  .calendar {
    margin: 30px auto 0;
    max-width: 300px;
  }
  .calendar-header {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    color: var(--text-color-point-yellow);
    font-size: 18px;
  }
  .calendar-body {
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
  }
  .calendar-body span {
    padding: 10px;
    text-align: center;
    align-items: center;
  }
  .calendar-body .current-day {
    border-radius: 50%;
    background: var(--text-color-point-gold);
    color: var(--text-color-point-navy);
    font-weight: bold;
  }
  .calendar-body span.empty-day {
    background: none; /* 빈 날짜는 배경 제거 */
  }
  .countdown {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
  }
  .countdown-box {
    width: 70px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background-color: var(--background-yellow);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    font-family: 'Cafe24Shiningstar', sans-serif;
  }
  .value {
    font-size: 35px;
    color: var(--text-color-dark-gray);
    margin-bottom: 5px;
  }
  .label {
    font-size: 22px;
    color: var(--text-color-light-gray);
    margin-left: 2px;
  }
  .footer-text {
    margin-top: 25px;
    font-size: 17px;
    color: var(--text-color-lightlight-gray);
  }
.divider {
  border: 0px;
  border-top: 1px solid var(--text-color-light-gray);
  margin: 30px auto;
}
</style>
  