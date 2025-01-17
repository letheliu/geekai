<template>
    <div class="bg-white">
        <!-- Navigation Bar -->
        <nav class="flex justify-between items-center px-6 py-4">
            <!-- Left side logos -->
            <div class="flex space-x-2" style="margin-left: 100px;">
                <img alt="Zoomer logo 1" class="w-50 h-24" src="/images/logo.png" />
            </div>
            <!-- Center navigation items -->
            <div class="flex space-x-8">
                <a class="text-black text-sm" href="#">
                    FINDING
                    <br />
                    灵感寻觅
                </a>
                <a class="text-black text-sm" href="#">
                    LEARNING
                    <br />
                    风格LORA
                </a>
                <a class="text-black text-sm" href="#">
                    CREATING
                    <br />
                    效果生成
                </a>
                <a class="text-black text-sm" href="#">
                    REDRAW
                    <br />
                    局部重绘
                </a>
            </div>
            <!-- Right side buttons -->
            <div class="flex items-center space-x-4">
                <button class="text-black border border-gray-300 rounded px-4 py-1" @click="openCustomerService">
                    <i class="fas fa-headphones mr-2"></i>客服
                </button>
                <button class="bg-[#1a1a1a] text-white rounded px-4 py-1" @click="openLogin">
                    <i class="fas fa-user mr-2"></i>帐户密码登录
                </button>
            </div>
        </nav>
        <!-- Back Button -->
        <div class="absolute left-8 top-10">
            <button class="bg-gray-200 rounded-full p-4" @click="backTo">
                <i class="fas fa-arrow-left text-gray-600">
                </i>
            </button>
        </div>
        <!-- Main Content -->
        <div class="flex flex-col items-center justify-center mt-32">
            <h2 class="text-xl mb-8">
                微信登录
            </h2>
            <div class="border border-gray-200 p-4 w-64 h-64 flex items-center justify-center">
                <img alt="WeChat QR code for login" class="w-full h-full" height="200"
                    src="https://replicate.delivery/xezq/AaRWvLBvfjQHIiJvMQpqtOrGpE0r2Beah6cNMhduXdfXeXXQB/out-0.png"
                    width="200" />
            </div>
            <p class="text-gray-600 mt-4">
                使用微信扫一扫登录
            </p>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const backTo = () => {
    router.back();
}

const openLogin = () => {
    router.push("/login");
}

const openCustomerService = () => {
    window.open('https://chatbot.weixin.qq.com/webapp/Jrr5q312JT4YxtR8nMZ96acxKyT2yn?robotName=Zoomer', '_blank', 'width=706,height=800');
}

</script>
