<template>
    <main class="ml-48 p-4">
        <!-- Navigation -->
        <nav class="mb-4">
            <div class="flex items-center space-x-8">
                <span>
                    Lora
                </span>
                <span class="bg-gray-900 text-white px-4 py-1 rounded">
                    免费
                </span>
                <span>
                    会员
                </span>
                <span>
                    企业会员
                </span>
            </div>
            <div class="flex items-center space-x-8 mt-4">
                <span>
                    设计类型
                </span>
                <span>
                    全部
                </span>
                <span>
                    家居产品
                </span>
                <span>
                    居住空间
                </span>
                <span>
                    商业空间
                </span>
                <span>
                    建筑景观
                </span>
                <span>
                    辅助工作
                </span>
            </div>
            <div class="flex items-center space-x-8 mt-4">
                <span>
                    排序
                </span>
                <span class="bg-gray-900 text-white px-4 py-1 rounded">
                    推荐
                </span>
                <span>
                    最热
                </span>
                <span>
                    最新
                </span>
            </div>
        </nav>
        <!-- Grid -->
        <div class="grid grid-cols-3 gap-4">
            <div class="relative" v-for="n in 6">
                <img alt="Modern minimalist interior with natural light, wooden floors, and white walls"
                    class="w-full h-64 object-cover rounded-lg" height="300"
                    src="https://replicate.delivery/xezq/OvgP19ESaKJ5B9i91RehdAMr1i9fkRDba2u7qxLFlWtCJ7FUA/out-0.png"
                    width="400" />
                <div
                    class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent text-white rounded-b-lg">
                    <div class="flex justify-between items-center">
                        <div>
                            <div>
                                居住空间
                            </div>
                            <div class="text-sm">
                                法式自然极简风/黑白摩登
                            </div>
                        </div>
                        <button class="bg-white text-black px-4 py-1 rounded text-sm" @click="toDrawWithLora(n)">
                            使用LORA
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const toDrawWithLora = (n) => {
    router.push({path: "/sd", query: { lora: n}});
}

</script>