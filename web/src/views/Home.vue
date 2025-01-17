<template>
  <div class="home">
    <div class="header">
      <div class="banner">
        <div class="logo">
          <el-image :src="logo" @click="router.push('/')" />
        </div>
        <div style="margin-left: 200px;">
          <el-input size="mini"></el-input>
        </div>
      </div>

      <div class="navbar">

        <el-dropdown :hide-on-click="true" class="user-info" trigger="click" v-if="loginUser.id">
          <span class="el-dropdown-link">
            <el-image :src="loginUser.avatar" />
          </span>
          <template #dropdown>
            <el-dropdown-menu class="user-info-menu">
              <el-dropdown-item @click="showConfigDialog = true">
                <el-icon>
                  <UserFilled />
                </el-icon>
                <span class="username">账户信息</span>
              </el-dropdown-item>

              <div>
                <el-dropdown-item>
                  <i class="iconfont icon-book"></i>
                  <a :href="docsURL" target="_blank">
                    用户手册
                  </a>
                </el-dropdown-item>

                <el-dropdown-item>
                  <i class="iconfont icon-github"></i>
                  <a :href="gitURL" target="_blank">
                    联系客服
                  </a>
                </el-dropdown-item>
              </div>
              <el-divider style="margin: 2px 0" />
              <el-dropdown-item @click="logout">
                <i class="iconfont icon-logout"></i>
                <span>退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <div v-else>
          <el-button size="small" color="#21aa93" @click="store.setShowLoginDialog(true)" round>登录</el-button>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="navigator">
        <ul class="nav-items">
          <li v-for="item in mainNavs" :key="item.url">
            <el-tooltip effect="light" :content="item.name" placement="right">
              <a @click="changeNav(item)" :class="item.url === curPath ? 'active' : ''">
                <el-image :src="item.icon" style="width: 30px;height: 30px" />{{ item.name }}
              </a>
            </el-tooltip>
            <!-- <span :class="item.url === curPath ? 'title active' : 'title'">{{ item.name }}</span> -->
          </li>

          <div style="position: absolute;bottom: 0;">
          <li >
            <el-tooltip effect="light" content="消费日志" placement="right">
              <a @click="changeNav({url: '/powerLog'})" :class="'/powerLog' === curPath ? 'active' : ''">
                <el-image src="/images/menu/log.png" style="width: 30px;height: 30px" />消费日志
              </a>
            </el-tooltip>
          </li>
          <li >
            <el-tooltip effect="light" content="客服..." placement="right">
              <a @click="openCustomerService">
                <el-image src="/images/menu/log.png" style="width: 30px;height: 30px" />客服...
              </a>
            </el-tooltip>
          </li>
        </div>

          <el-popover v-if="moreNavs.length > 0" placement="right-end" trigger="hover">
            <template #reference>
              <li>
                <a class="active">
                  <el-image src="/images/menu/more.png" style="width: 30px;height: 30px" />
                </a>
              </li>
            </template>
            <template #default>
              <ul class="more-menus">
                <li v-for="item in moreNavs" :key="item.url" :class="item.url === curPath ? 'active' : ''">
                  <a @click="changeNav(item)">
                    <el-image :src="item.icon" style="width: 20px;height: 20px" />
                    <span :class="item.url === curPath ? 'title active' : 'title'">{{ item.name }}</span>
                  </a>
                </li>
              </ul>
            </template>
          </el-popover>
        </ul>
      </div>

      <div class="content custom-scroll" :style="{ height: mainWinHeight + 'px' }">
        <router-view :key="routerViewKey" v-slot="{ Component }">
          <transition name="move" mode="out-in">
            <component :is="Component"></component>
          </transition>
        </router-view>
      </div>
    </div>

    <login-dialog :show="show" @hide="store.setShowLoginDialog(false)" @success="loginCallback" />
    <config-dialog v-if="loginUser.id" :show="showConfigDialog" @hide="showConfigDialog = false" />
  </div>
</template>

<script setup>

import { useRouter } from "vue-router";
import { onMounted, ref, watch } from "vue";
import { httpGet } from "@/utils/http";
import { ElMessage } from "element-plus";
import { UserFilled } from "@element-plus/icons-vue";
import { checkSession, getLicenseInfo, getSystemInfo } from "@/store/cache";
import { removeUserToken } from "@/store/session";
import LoginDialog from "@/components/LoginDialog.vue";
import { useSharedStore } from "@/store/sharedata";
import ConfigDialog from "@/components/UserInfoDialog.vue";
import { showMessageError } from "@/utils/dialog";

const router = useRouter();
const logo = ref('');
const mainNavs = ref([])
const moreNavs = ref([])
const curPath = ref(router.currentRoute.value.path)
const title = ref("")
const mainWinHeight = window.innerHeight - 50
const loginUser = ref({})
const version = ref(process.env.VUE_APP_VERSION)
const routerViewKey = ref(0)
const showConfigDialog = ref(false)
const license = ref({ de_copy: true })
const docsURL = ref(process.env.VUE_APP_DOCS_URL)
const gitURL = ref(process.env.VUE_APP_GIT_URL)

const store = useSharedStore();
const show = ref(false)
watch(() => store.showLoginDialog, (newValue) => {
  show.value = newValue
});

const openCustomerService = () => {
  window.open('https://chatbot.weixin.qq.com/webapp/Jrr5q312JT4YxtR8nMZ96acxKyT2yn?robotName=Zoomer', '_blank', 'width=706,height=800');
}

// 监听路由变化
router.beforeEach((to, from, next) => {
  curPath.value = to.path
  next();
});

if (curPath.value === "/external") {
  curPath.value = router.currentRoute.value.query.url
}
const changeNav = (item) => {
  curPath.value = item.url
  if (item.url.indexOf("http") !== -1) { // 外部链接
    router.push({ name: 'ExternalLink', query: { url: item.url } })
  } else {
    router.push(item.url)
  }
}

const myMenu = [
  { id: 1, name: '首页', icon: '/images/menu/index.png', url: '/', sort_num: 1, enable: true },
  { id: 2, name: '灵感寻觅', icon: '/images/menu/find.png', url: '/images-wall', sort_num: 2, enable: true },
  { id: 3, name: 'zoomer社区', icon: '/images/menu/social.png', url: '/social', sort_num: 3, enable: true },
  { id: 4, name: '我的收藏', icon: '/images/menu/like.png', url: '/like', sort_num: 4, enable: true },
  { id: 5, name: '风格Lora', icon: '/images/menu/lora.png', url: '/lora', sort_num: 5, enable: true },
  { id: 6, name: 'AI绘图', icon: '/images/menu/draw.png', url: '/sd', sort_num: 6, enable: true },
  { id: 7, name: '局部重绘', icon: '/images/menu/redraw.png', url: '/dalle', sort_num: 7, enable: true },
  { id: 8, name: 'AI设计工作板', icon: '/images/menu/work.png', url: '#', sort_num: 8, enable: false },
  { id: 9, name: '会员中心', icon: '/images/menu/msg.png', url: '/member', sort_num: 9, enable: true }
];

onMounted(() => {
  getSystemInfo().then(res => {
    logo.value = res.data.logo
    title.value = res.data.title
  }).catch(e => {
    ElMessage.error("获取系统配置失败：" + e.message)
  })
  // 获取菜单
  httpGet("/api/menu/list").then(res => {
    console.log("mainNavs:", res.data);
    // mainNavs.value = res.data
    mainNavs.value = myMenu;
      console.log("mainNavs:", mainNavs);
    // 根据窗口的高度计算应该显示多少菜单
    const rows = Math.floor((window.innerHeight - 100) / 90)
    if (myMenu.length > rows) {
      mainNavs.value = myMenu.slice(0, rows)
      moreNavs.value = myMenu.slice(rows)
    }
  }).catch(e => {
    ElMessage.error("获取系统菜单失败：" + e.message)
  })

  getLicenseInfo().then(res => {
    license.value = res.data
  }).catch(e => {
    license.value = { de_copy: false }
    showMessageError("获取 License 配置：" + e.message)
  })

  init()
})

const init = () => {
  checkSession().then(user => {
    loginUser.value = user
  }).catch(() => {
  })
}

const logout = function () {
  httpGet('/api/user/logout').then(() => {
    removeUserToken()
    router.push('/login');
    // store.setShowLoginDialog(true)
    // loginUser.value = {}
    // // 刷新组件
    // routerViewKey.value += 1
  }).catch(() => {
    ElMessage.error('注销失败！');
  })
}

const loginCallback = () => {
  init()
  // 刷新组件
  routerViewKey.value += 1
}
</script>

<style lang="stylus" scoped>
@import "@/assets/css/custom-scroll.styl"
@import "@/assets/css/home.styl"
</style>
