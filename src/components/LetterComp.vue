<template>
    <div class="contents">
        <img src="@/assets/images/ribbon.png" class="ribbon" />

        <div class="letter">
            <div v-if="guest_type === GuestType.GUEST">
                <span>서로를 바라보며 다짐한 사랑과 믿음으로</span> <br/>
                두 사람의 새로운 여정을 시작하고자 합니다.<br/>
                <br/>
                행복한 날도, 살다 지치는 날도<br/>
                언제나 서로의 곁에 함께하겠습니다.<br/>
                <br/>
                많은 분들과 함께 기쁨을 나누고 싶었지만,<br/>
                <span>저희 두 사람의 뜻에 따라 가까운 가족들만 모시고</span><br/>
                소박하게 서약의 시간을 갖기로 했습니다.<br/>
                <br/>
                소중한 분들과 함께하지 못해<br/>
                진심으로 아쉬운 마음을 전하며,<br/>
                <span>너른 마음으로 이해해 주시길 부탁드립니다.</span><br/>
                <br/>
                <span>멀리서 전해 주시는 축복도</span><br/>
                <span>깊이 새기고 예쁘게 잘 살아가겠습니다.</span><br/>
            </div>
            <div v-else>
                <span>서로를 바라보며 다짐한 사랑과 믿음으로</span> <br/>
                두 사람의 새로운 여정을 시작하고자 합니다.<br/>
                <br/>
                행복한 날도, 살다 지치는 날도<br/>
                <span>언제나 서로의 곁에 함께하겠습니다.</span><br/>
                <br/>
                저희의 새로운 시작에<br/>
                <span>따뜻한 축복을 더해 주신다면</span><br/>
                이 날이 더욱 빛나고 <br/>
                소중한 추억으로 남을 것입니다.<br/>
                <br/>
                <span>함께해 주시는 소중한 발걸음에</span><br/>
                <span>진심으로 감사드립니다.</span><br/>
            </div>
        </div>
        
        <img src="@/assets/images/ribbon.png" class="ribbon" />
    </div>
</template>

<script>
import { GuestType } from '@/constants';

export default {
  name: "LetterComponent",
  data() {
    return {
        guest_type: GuestType.FAMILY,
    }
  },
  computed: {
    GuestType() {
      return GuestType;
    },
  },
};
</script>

<style scoped>
.contents {
  margin-top: 400px;
  margin-bottom: 400px;
}

.ribbon {
    width: 30%;
}

.letter {
  margin-top: 70px;
  margin-bottom: 70px;

  font-size: 20px;
  font-weight: lighter;
  color: var(--text-color-dark-gray);
  font-family: 'GangwonEduAllL', sans-serif;

  span {
    font-family: 'GangwonEduAllB', 'GangwonEduAllL', sans-serif;
    color: var(--text-color-point-navy);
  }
}
</style>