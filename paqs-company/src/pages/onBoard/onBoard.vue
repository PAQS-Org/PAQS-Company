<template>
  <transition
    name="fade"
    mode="out-in"
  >
    <q-page class="flex flex-center colors">
      <div
        :key="message"
        class="square twitter"
      >
        <span />
        <span />
        <span />
        <div class="content">
          <img
            src="../../assets/images/main-01.svg"
            alt="company_logo"
          >
          <div class="containers">
            Make your
            <div class="flips">
              <div><div>product</div></div>
              <div><div>brand</div></div>
              <div><div>customers feel</div></div>
            </div>
            AweSoMe!
          </div>
        </div>
      </div>
    </q-page>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      message: 'Welcome',
    };
  },
  mounted() {
    // Automatically navigate to another page or route after 3 seconds
    setTimeout(() => {
      this.message = 'Redirecting...';
      setTimeout(() => {
        this.$router.push('/auth/login'); // Change '/dashboard' to your desired route
      }, 1000); // Wait for the transition to complete before navigating
    }, 5000); // 5 seconds
  },
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.containers {
  color: #999;
  text-transform: uppercase;
  font-size: 36px;
  font-weight: bold;
  /* padding-top: 200px; */
  position: relative;
  width: 100%;
  bottom: 4%;
  display: block;
}

.flips {
  height: 50px;
  overflow: hidden;
}

.flips > div > div {
  color: #fff;
  padding: 4px 12px;
  height: 45px;
  margin-bottom: 45px;
  display: inline-block;
}

.flips div:first-child {
  animation: show 5s linear infinite;
}

.flips div div {
  background: #d4651b;
}
.flips div:first-child div {
  background: #f4e10e;
}
.flips div:last-child div {
  background: #0ae072;
}

@keyframes show {
  0% {
    margin-top: -270px;
  }
  5% {
    margin-top: -180px;
  }
  33% {
    margin-top: -180px;
  }
  38% {
    margin-top: -90px;
  }
  66% {
    margin-top: -90px;
  }
  71% {
    margin-top: 0px;
  }
  99.99% {
    margin-top: 0px;
  }
  100% {
    margin-top: -270px;
  }
}
.square {
  position: relative;
  margin: 0 10px;
  width: 400px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.colors {
  background-color: cornsilk;
}

.square span:nth-child(1) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid black;
  border-radius: 32% 58% 69% 43% / 48% 32% 59% 55%;
  transition: 0.5s;
  animation: animate 6s linear infinite;
}

.linkedin:hover span:nth-child(1) {
  border: none;
  background: #f07e6e;
}

.twitter:hover span:nth-child(1) {
  border: none;
  background: #84cdfa;
}

.github:hover span:nth-child(1) {
  border: none;
  background: #5ad1cd;
}

.square span:nth-child(2) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid black;
  border-radius: 38% 62% 63% 37% / 41% 44% 56% 59%;
  transition: 0.5s;
  animation: animate 4s linear infinite;
}

.linkedin:hover span:nth-child(2) {
  border: none;
  background: #f07e6e;
}

.twitter:hover span:nth-child(2) {
  border: none;
  background: #84cdfa;
}

.github:hover span:nth-child(2) {
  border: none;
  background: #5ad1cd;
}

.square span:nth-child(3) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid black;
  border-radius: 31% 45% 74% 35% / 38% 56% 51% 87%;
  transition: 0.5s;
  animation: animate2 10s linear infinite;
}

.linkedin:hover span:nth-child(3) {
  border: none;
  background: #f07e6e;
}

.twitter:hover span:nth-child(3) {
  border: none;
  background: #84cdfa;
}

.github:hover span:nth-child(3) {
  border: none;
  background: #5ad1cd;
}

.content {
  position: relative;
  /* margin-top: 30%; */
  color: #fff;
  text-align: center;
  transition: 0.5s;
  z-index: 1000;
}

.content a {
  position: relative;
  display: inline-block;
  /* margin-top: 10px; */
  border: 2px solid #fff;
  padding: 6px 18px;
  text-decoration: none;
  color: #fff;
  font-weight: 600;
  border-radius: 73% 27% 44% 56% / 49% 44% 56% 51%;
}

.content a:hover {
  background: white;
  color: #333;
}
img {
  max-width: 60%;
}
@keyframes animate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes animate2 {
  0% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
