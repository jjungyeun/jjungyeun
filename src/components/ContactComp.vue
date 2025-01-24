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
            <button class="contact-button">
              축하 연락하기
              <img class="chat-icon" src="@/assets/images/chat.png"/>
            </button>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "ContactComponent",
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
</style>