<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer v-model="leftDrawerOpen">
      <q-list :value="currentSelected(i)" v-for="(chapter, i) in contentTable">
        <q-item-label header>{{ chapter.mainTitle }}</q-item-label>
        <q-item
          clickable
          v-ripple
          v-for="(slide, j) in chapter.slides"
          :key="j"
          inset
          @click="jump(i, j)"
        >
          <q-item-section>
            <q-item-label>{{ slide.title }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-page-sticky position="top-left" :offset="[18, 18]" style="z-index: 2;">
        <q-btn fab icon="menu" color="primary" @click="toggleLeftDrawer"/>
      </q-page-sticky>
      <router-view v-slot="{ Component }" >
        <transition
          appear
          :enter-active-class="animationDirection.enter"
          :leave-active-class="animationDirection.leave"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
    <shader-renderer :shadertoyID="shadertoyID" :shaderCode="shaderCode"></shader-renderer>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
import ShaderRenderer from '../components/ShaderRenderer.vue';
import content from "../assets/content-table";
import waveBackground from '../assets/shaders/wave-background';
import jasz_universe from "../assets/shaders/jasz_universe";
import mario from '../assets/shaders/mario';

export default defineComponent({
  name: "MainLayout",

  components: {
    'shader-renderer': ShaderRenderer
  },

  setup() {

    const router = useRouter();
    const route = useRoute();
    const header = ref(null);
    const leftDrawerOpen = ref(false);
    const animationDirection = ref({
      enter: 'animated fadeInRight',
      leave: 'animated fadeOutLeft'
    });

    let chapterIndex = 0;
    let slideIndex = 0;
    let shadertoyID = ref('');
    let shaderCode = ref(jasz_universe);

    const renderShader = routeName => {
      switch (routeName) {
        case 'home':
        case 'what-happened-to-webgl':
        case 'webgpu-future-of-web-graphic':
        case 'development-experience':
        case 'future':
          shaderCode.value = jasz_universe;
          shadertoyID.value = '';
          break;
        case 'aboutme':
        case 'history-of-webgl':
        case 'bad-part-of-opengl':
        case 'modern-graphic-industry':
        case 'birth-of-webgpu':
        case 'what-is-webgpu':
        case 'compare':
        case 'multiple-process-browser':
        case 'mental-model':
        case 'how-to-draw':
        case 'bitonic-sort':
        case 'multithreading':
        case 'call-native-api':
        case 'credit':
          shadertoyID.value = '';
          shaderCode.value = waveBackground;
          break;
        case 'thanks':
          shadertoyID.value = '';
          shaderCode.value = mario;
          break;
        default:
          break;
      }
    }

    renderShader(route.name)

    onBeforeRouteUpdate((to, from) => {
      renderShader(to.name)
    });

    const contentTable = content;

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
      if (leftDrawerOpen.value) {
        header.value.$el.style.width = '100%';
      } else {
        header.value.$el.style.width = '10%';
      }
    }

    const jump = (chapterIdx, slideIdx) => {
      chapterIndex = chapterIdx;
      slideIndex = slideIdx;

      router.push({
        path: contentTable[chapterIndex].slides[slideIndex].path,
      });
    };

    const currentSelected = (i) => {
      if (chapterIndex === i) {
        return slideIndex;
      } else {
        return false;
      }
    };

    const next = () => {
      if (slideIndex === contentTable[chapterIndex].slides.length - 1) {
        if (chapterIndex === contentTable.length - 1) {
          chapterIndex = 0;
        } else {
          chapterIndex++;
        }
        slideIndex = 0;
      } else {
        slideIndex++;
      }

      animationDirection.value = {
        enter: 'animated fadeInRight',
        leave: 'animated fadeOutLeft'
      };

      router.push({
        path: contentTable[chapterIndex].slides[slideIndex].path,
      });
    };

    const previous = () => {
      if (slideIndex === 0) {
        if (chapterIndex === 0) {
          return;
        } else {
          chapterIndex--;
        }

        slideIndex = contentTable[chapterIndex].slides.length - 1;
      } else {
        slideIndex--;
      }

      animationDirection.value = {
        enter: 'animated fadeInLeft',
        leave: 'animated fadeOutRight'
      };

      router.push({
        path: contentTable[chapterIndex].slides[slideIndex].path,
      });
    };

    for (let i = 0; i < contentTable.length; i++) {
      for (let j = 0, slides = contentTable[i].slides; j < slides.length; j++) {
        if (slides[j].path === route.path) {
          chapterIndex = i;
          slideIndex = j;
          break;
        }
      }
    }

    window.addEventListener(
      "keyup",
      (event) => {
        if (event.key === "ArrowRight") {
          next();
        }
        if (event.key === "ArrowLeft") {
          previous();
        }
      },
      false
    );

    return {
      header,
      leftDrawerOpen,
      toggleLeftDrawer,
      chapterIndex,
      slideIndex,
      jump,
      currentSelected,
      next,
      previous,
      contentTable,
      shaderCode,
      shadertoyID,
      animationDirection
    };
  },
});
</script>
