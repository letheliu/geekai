<template>
  <div class="min-h-screen" id="app">
    <!-- Navigation -->
    <nav class="absolute top-0 left-0 right-0 z-10 p-4">
      <div class="flex items-center">
        <div class="flex space-x-2">
          <img alt="Zoomer logo 1" class="w-50 h-24" src="/images/logo.png" />
        </div>
      </div>
    </nav>
    <!-- Side Navigation -->
    <!-- <div class="absolute left-10 top-20 z-10">
      <div class="bg-[#001F3F] text-white px-4 py-2 rounded-r mb-2 flex items-center">
        <i class="fas fa-home mr-2">
        </i>
        <span class="text-sm">
          首页
        </span>
      </div>
    </div> -->
    <!-- Main Content -->
    <div class="flex flex-col h-screen">
      <div class="mt-50 flex-grow" style="margin-top: 120px;">
        <img src="/images/backgroud.png"
          alt="Luxurious modern living room with floor-to-ceiling windows overlooking a lush garden. The room features minimalist wooden furniture including low-profile daybeds and a central coffee table. Natural sunlight streams through the trees creating a serene atmosphere. The space has cream-colored curtains and a neutral color palette."
          class="w-full h-full object-cover" width="1920" height="1080" />
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="bg-[#001F3F] text-white px-16 py-4 rounded-full">
            <h1 class="envision-text text-4xl">ENVISION</h1>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Navigation -->
    <div class="absolute bottom-10 left-10 flex flex-col space-y-2">
      <div @click="openCustomerService"
        class="flex items-center bg-white px-4 py-2 rounded-md cursor-pointer hover:bg-gray-100 transition-colors">
        <i class="fas fa-headphones mr-2"></i>
        <span>客服</span>
      </div>
      <div class="bg-[#001F3F] text-white px-4 py-2 rounded-md" @click="openWxLogin">
        <i class="fas fa-user mr-2"></i>
        <span>登录</span>
      </div>
    </div>
  </div>

</template>

<script setup>

import { useRouter } from "vue-router";

const router = useRouter()

// if (isMobile()) {
//   router.push("/mobile")
// }

const openCustomerService = () => {
  window.open('https://chatbot.weixin.qq.com/webapp/Jrr5q312JT4YxtR8nMZ96acxKyT2yn?robotName=Zoomer', '_blank', 'width=706,height=800');
}

const openWxLogin = () => {
  router.push("/wxLogin")
}
</script>

<style lang="stylus" scoped>
@import '@/assets/iconfont/iconfont.css'
@import "@/assets/css/index.styl"
</style>
