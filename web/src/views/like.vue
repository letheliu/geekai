<template>
  <div class="flex-1 p-4">
    <!-- Search Bar -->
    <div class="flex justify-between items-center mb-8">
      <div class="relative flex-1 max-w-2xl">
        <input
          class="w-full px-4 py-2 border rounded-lg pl-10"
          placeholder="AI绘图描述词"
          type="text"
        />
        <i class="fas fa-plus absolute left-3 top-3 text-gray-400"> </i>
      </div>
      <div class="ml-4">
        <button class="px-4 py-2 border rounded-lg flex items-center">
          <i class="fas fa-search mr-2"> </i>
          搜索图库
        </button>
      </div>
    </div>
    <!-- Empty State -->
    <div class="text-center mt-20">
      <p class="text-gray-600 mb-4">您还没有收藏任何图片</p>
      <div class="space-x-4">
        <span class="text-gray-600"> 您可以回到 </span>
        <button class="px-4 py-2 bg-navy-800 text-white rounded-lg" @click="toFind">
          灵感寻觅
        </button>
        <span class="px-4 py-2 text-gray-600">浏览图片</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const toFind = () => {
    router.push("/images-wall");
}
</script>

<style>
.bg-navy-800 {
  background-color: #1a2b4b;
}
</style>
