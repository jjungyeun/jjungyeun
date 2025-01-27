<template>
    <div class="contents">
        <div class="account-comp">
            <h1 class="title">마음 전하실 곳</h1>
            <div class="description">
                참석이 어려우신 분들을 위해 기재했습니다.<br />
                너그러운 마음으로 양해 부탁드립니다.
            </div>
            <div
            class="dropdown-box"
            v-for="(accounts, key) in accountGroups"
            :key="key"
            @click="toggleGroup(key)"
            >
            <div class="dropdown-header">
                {{ key }}측에게
                <span class="arrow">{{ isExpanded(key) ? "▲" : "▼" }}</span>
            </div>
            <div v-if="isExpanded(key)" class="dropdown-content">
                <div
                class="account-card"
                v-for="(info, index) in accounts"
                :key="index"
                >
                <div class="account-header">
                    <span>{{ info.title }}</span>
                    <span class="account-name">{{ info.name }}</span>
                </div>
                <div class="account-body" @click.stop="copyToClipboard(info.account)">
                    <span>{{ info.account }}</span>
                    <img class="copy-button" src="@/assets/images/copy.png" />
                </div>
                </div>
            </div>
        </div>
        </div>
        <Toast v-if="showToast" :message="toastMessage" position="top" />
    </div>
    
</template>
  
<script>
import Toast from "@/components/ToastComp.vue";

  export default {
    name: "AccountComponent",
    components: { Toast },
    data() {
      return {
        showToast: false,
        toastMessage: "",
        // 현재 확장된 그룹
        expandedGroups: [],
        accountGroups: {
            신랑: [
                {
                    title: "신랑",
                    name: "김영진",
                    account: import.meta.env.VITE_GROOM_ACCOUNT,
                },
                {
                    title: "신랑 아버지",
                    name: "김원용",
                    account: import.meta.env.VITE_GROOM_FATHER_ACCOUNT,
                },
            ],
            // 신부측 계좌 정보
            신부: [
                {
                    title: "신부",
                    name: "원정연",
                    account: import.meta.env.VITE_BRIDE_ACCOUNT,
                },
                {
                    title: "신부 아버지",
                    name: "원성일",
                    account: import.meta.env.VITE_BRIDE_FATHER_ACCOUNT,
                },
                {
                    title: "신부 어머니",
                    name: "강연완",
                    account: import.meta.env.VITE_BRIDE_MOTHER_ACCOUNT,
                },
            ],
        }
      };
    },
    methods: {
    toggleGroup(groupKey) {
      if (this.expandedGroups.includes(groupKey)) {
        // 이미 확장된 상태라면 제거
        this.expandedGroups = this.expandedGroups.filter(
          (key) => key !== groupKey
        );
      } else {
        // 확장되지 않은 상태라면 추가
        this.expandedGroups.push(groupKey);
      }
    },
    isExpanded(groupKey) {
      // 해당 그룹이 확장된 상태인지 확인
      return this.expandedGroups.includes(groupKey);
    },
      copyToClipboard(account) {
        navigator.clipboard.writeText(account).then(() => {
          this.toastMessage = "계좌번호가 복사되었습니다😊";
          this.showToast = true;

          // 토스트가 사라진 후 상태 초기화
          setTimeout(() => {
            this.showToast = false;
          }, 2000);
        });
      },
    },
  };
</script>
  
<style scoped>
.contents {
  padding-top: 300px;
  padding-bottom: 300px;
  background-color: var(--background-light-gray);
}
.account-comp {
  width: 85%;
  margin: auto;
  text-align: center;
  font-family: 'NanumSquareRoundR', sans-serif;
  color: var(--text-color-dark-gray);
  padding: 20px;
}
.title {
  font-size: 25px;
  color: var(--text-color-point-navy);
}
.description {
  font-family: 'GangwonEduAllL', sans-serif;
  font-size: 19px;
  color: var(--text-color-light-gray);
  margin-top: 20px;
  margin-bottom: 50px;
}
.dropdown-box {
  margin-top: 15px;
  border-radius: 10px;
  padding: 25px 20px;
  background-color: var(--background-light-purple);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}
.dropdown-box:hover {
  background-color: var(--primary-color-purple);
}
.dropdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
}
.arrow {
    font-size: 14px;
    color: var(--text-color-light-gray);
}
.dropdown-content {
  margin-top: 30px;
}
.account-card {
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 10px;
  background-color: white;
}
.account-header {
  display: flex;
  justify-content: space-between;
  margin: 0 5px 15px;
  font-family: 'GangwonEduAllB', sans-serif;
  font-size: 17px;
  color: var(--text-color-light-gray);
}
.account-name {
    color: var(--text-color-dark-gray);
}
.account-body {
  background-color: var(--background-light-purple);
  border-radius: 10px;

  padding: 20px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  cursor: pointer;

  img {
    width: 15px;
  }
}
  </style>
  