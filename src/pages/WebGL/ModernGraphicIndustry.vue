<template>
  <q-page class="flex flex-center">
    <div class="row justify-center items-center content-center wrap q-gutter-md text-white text-left text-h4 text-weight-regular" v-if="show === 0">
      <div class="col-10 text-center text-h3 text-weight-bold">
        现代图形工业
      </div>
      <div class="col-10 p-box q-pa-md">
        <ul>
            <li class="q-py-md">DirectX 12、Vulkan、Metal 成为并列的三大现代图形框架，他们全面释放了 GPU 的可编程能力，让开发者可以最大限度的自由操控 GPU</li>
            <li class="q-py-md">在当年 PBR 渲染还被视为次时代的高端技术，现在已经是遍地开花</li>
            <li class="q-py-md">在当年遥不可及的光线追踪技术，现在已经可以藉由 Nvidia RTX 显卡的专门的硬件处理单元实现实时光线追踪</li>
            <li class="q-py-md">当年只能作为产品草稿图和预览图的 GPU 实时渲染，随着基于深度学习的人工智能降噪技术的提出，直接迈步成为生产环境可用的可靠渲染方式之一</li>
        </ul>
      </div>
    </div>

    <div class="row justify-center items-center content-center wrap q-gutter-md text-white text-left text-h4 text-weight-regular full-width" v-if="show === 1">
      <div class="col text-center">
        <q-img src="~assets/img/tomb2.jpg" style="width: 800px;"></q-img>
        <div class="q-mt-md">古墓丽影8 - 2008 年</div>
      </div>
      <div class="col-6 text-center">
        <q-img src="~assets/img/tomb1.jpeg" style="width: 800px;"></q-img>
        <div class="q-mt-md">古墓丽影9 - 2013 年</div>
      </div>
    </div>

  </q-page>
</template>
<script>
import { defineComponent } from 'vue';
import AnimeTrigger from '../../plugin/anime-trigger';

export default defineComponent({

  setup() {

    const { show } = AnimeTrigger(1);

    return {

      show

    }

  }

  
})
</script>