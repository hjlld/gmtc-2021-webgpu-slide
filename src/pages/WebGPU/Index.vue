<template>
  <q-page class="flex flex-center">
    <div class="row justify-center items-center content-center wrap q-gutter-md text-white text-center text-h1 text-weight-bold" >
      <div class="col-12" v-if="show === 0">
        WebGPU 网页图形的未来
      </div>
      <div class="col-10 text-h3 text-weight-bold p-box q-pa-xl" style="line-height: 120%;" v-else-if="show === 1">
        WebGPU 是由 W3C GPU for the Web 社区工作组开发的新标准，其中包括 Apple、Mozilla、Microsoft、Google 等主要成员。
      </div>
      <div class="col-10 text-h3 text-weight-bold p-box q-pa-xl" style="line-height: 120%;" v-else-if="show === 2">
        WebGPU 的目的在于提供现代 3D 图形和计算能力。和 WebGL 不一样的地方在于，WebGPU 并不是基于某个已经实现的本地图形标准制定的，而是参考了 Vulkan、Metal 和 D3D12 的 API 的设计理念，旨在基于这些本地图形标准，提供跨平台的高性能图形接口。
      </div>

    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import AnimeTrigger from '../../plugin/anime-trigger';

export default defineComponent({

  setup() {

    const { show } = AnimeTrigger(2);

    return {

      show

    }

  }

  
})

</script>