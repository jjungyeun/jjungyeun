<template>
    <div class="contents">
        <div class="contact">
          
          <div class="title">CONTACT</div>

          <div class="row">
            <p class="person">
              <span class="name">김원용 · 우혜경 <img src="@/assets/images/white_flower.png" /></span>  
              <span>의 장남</span>
            </p>
            <p class="person">
              <span>신랑</span>  
              <span class="name"><span>YOUNGJIN</span> 영진</span>
            </p>
          </div>

          <div class="row">
            <hr class="divider" />
          </div>

          <!-- 신부 정보 -->
          <div class="row">
            <p class="person">
              <span class="name">원성일 · 강연완</span>  
              <span>의 장녀</span>
            </p>
            <p class="person">
              <span>신부</span>  
              <span class="name"><span>JUNGYEUN</span> 정연</span>
            </p>
          </div>

          <!-- 축하 버튼 -->
          <div class="button-container">
            <button class="contact-button" @click="showContactInfo = true">
              축하 연락하기
              <img class="chat-icon" src="@/assets/images/chat.png"/>
            </button>
          </div>

          <!-- 연락처 팝업 -->
          <div class="popup" v-if="showContactInfo" @click.self="showContactInfo = false">
            <div class="popup-content">
              <!-- 닫기 버튼 (오른쪽 상단 X 버튼) -->
              <button class="close-button" @click="showContactInfo = false">✖</button>

              <!-- 신랑에게 -->
              <div class="contact-group">
                <p class="popup-title">신랑에게</p>
                <div class="button-group">
                  <a :href="'tel:' + contacts.groomPhone" class="action-button">
                    <img class="pop-icon" src="@/assets/images/phone.png"/>
                  </a>
                  <a :href="'sms:' + contacts.groomPhone" class="action-button">
                    <img class="pop-icon" src="@/assets/images/message.png"/>
                  </a>
                </div>
              </div>

              <!-- 신랑 아버지에게 -->
              <div class="contact-group">
                <p class="popup-title">신랑 아버지에게</p>
                <div class="button-group">
                  <a :href="'tel:' + contacts.groomFatherPhone" class="action-button">
                    <img class="pop-icon" src="@/assets/images/phone.png"/></a>
                  <a :href="'sms:' + contacts.groomFatherPhone" class="action-button">
                    <img class="pop-icon" src="@/assets/images/message.png"/></a>
                </div>
              </div>

              <hr />

              <!-- 신부에게 -->
              <div class="contact-group">
                <p class="popup-title">신부에게</p>
                <div class="button-group">
                  <a :href="'tel:' + contacts.bridePhone" class="action-button">
                    <img class="pop-icon" src="@/assets/images/phone.png"/></a>
                  <a :href="'sms:' + contacts.bridePhone" class="action-button">
                    <img class="pop-icon" src="@/assets/images/message.png"/></a>
                </div>
              </div>

              <!-- 신부 부모님에게 (같은 행에) -->
              <div class="contact-group multi-row">
                <div class="parent-info">
                  <p class="popup-title">신부 아버지에게</p>
                  <div class="button-group">
                    <a :href="'tel:' + contacts.brideFatherPhone" class="action-button">
                      <img class="pop-icon" src="@/assets/images/phone.png"/></a>
                    <a :href="'sms:' + contacts.brideFatherPhone" class="action-button">
                      <img class="pop-icon" src="@/assets/images/message.png"/></a> 
                  </div>
                </div>
                <div class="parent-info">
                  <p class="popup-title">신부 어머니에게</p>
                  <div class="button-group">
                    <a :href="'tel:' + contacts.brideMotherPhone" class="action-button">
                      <img class="pop-icon" src="@/assets/images/phone.png"/></a>
                    <a :href="'sms:' + contacts.brideMotherPhone" class="action-button">
                      <img class="pop-icon" src="@/assets/images/message.png"/></a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
    </div>
</template>

<script>
export default {
  name: "ContactComponent",
  data() {
    return {
      showContactInfo: false, // 팝업 표시 상태
      contacts: {
        groomPhone: import.meta.env.VITE_GROOM_PHONE,
        groomFatherPhone: import.meta.env.VITE_GROOM_FATHER_PHONE,
        bridePhone: import.meta.env.VITE_BRIDE_PHONE,
        brideFatherPhone: import.meta.env.VITE_BRIDE_FATHER_PHONE,
        brideMotherPhone: import.meta.env.VITE_BRIDE_MOTHER_PHONE,
      }
    };
  },
};
</script>

<style scoped>
.contents {
  margin-top: 400px;
  height: 800px;
  background-color: var(--background-light-purple);
}

.title {
  font-size: 45px;
  color: var(--text-color-point-navy);
  font-family: 'ChosunNm', sans-serif;
  margin-bottom: 60px;
}

.contact {
  width: 100%;
  margin: auto;

  font-size: 20px;
  font-weight: lighter;
  color: var(--text-color-dark-gray);
  font-family: 'ChosunNm', sans-serif;
}

/* 행 스타일 */
.row {
  text-align: center;
  font-size: 20px;
  color: var(--text-color-dark-gray);
  margin: 10px 0;
}

.person {
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between; /* 좌우 배치 */
  align-items: center;
  padding: 0 17%;

  span {
    span {
      font-size: 15px;
      font-weight: normal;
      font-style: italic;
      color: var(--text-color-light-gray);
      margin-right: 5px;
    }
  }
}

.name {
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 20px;
    height: 20px;
  }
}

/* 구분선 */
.divider {
  width: 70%;
  border: 0;
  border-top: 1px solid #ccc;
  margin: 40px auto;
}

/* 버튼 스타일 */
.button-container {
  margin-top: 40px;
  width: 100%;
  height: 50px;
  text-align: center;
}

.contact-button {
  height: 100%;
  width: 70%;
  background-color: var(--primary-color-purple); /* 보라색 버튼 */

  display: flex;
  justify-content: space-between;
  align-items: center;

  color: white;
  font-size: 16px;

  margin: 50px auto;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;

  cursor: pointer;
}

.contact-button:hover {
  background-color: #a586c4; /* 버튼 호버 색상 */
}

.chat-icon {
  width: 20px;
}

/* 연락처 팝업 스타일 */
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 팝업 배경 */
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: 'NanumSquareRoundR', sans-serif;
}

.popup-content {
  background-color: var(--primary-color-purple);
  border-radius: 10px;
  padding: 20px;
  width: 80%;
  max-width: 350px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
}

/* 닫기 버튼 (X 버튼) */
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  color: var(--text-color-dark-gray);
}

.close-button:hover {
  color: #000;
}

.contact-group {
  margin-bottom: 20px;
}

.button-group {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.multi-row {
  display: flex;
  justify-content: space-between;
}

.parent-info {
  flex: 1;
  text-align: center;
}

.action-button {
  align-items: center;
  background-color: var(--background-light-purple);
  color: var(--text-color-dark-gray);
  border: none;
  border-radius: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  padding: 10px 20px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  font-size: 15px;
}

.action-button:hover {
  background-color: #a586c4;
}

.popup-title {
  font-weight: bold;
  margin-bottom: 10px;
}

.pop-icon {
  width: 25px;
}
</style>