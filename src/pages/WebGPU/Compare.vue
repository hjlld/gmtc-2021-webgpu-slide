<template>
    <q-page class="flex flex-center">
        <div
            class="row justify-center items-center content-center wrap q-gutter-md text-white text-center text-weight-regular q-gutter-xl full-width"
            v-if="show === 0"
        >
            <div class="col-5">
                <q-img src="~assets/img/webgl-trees.png" style="width: 750px;"></q-img>
                <div class="text-h6">
                    <a
                        href="https://www.babylonjs.com/demos/webgpu/forestwebgl"
                        target="_blank"
                        class="text-white"
                    >https://www.babylonjs.com/demos/webgpu/forestwebgl</a>
                </div>
            </div>
            <div class="col-5 q-pa-md">
                <q-img src="~assets/img/webgpu-trees.png" style="width: 750px;"></q-img>
                <div class="text-h6">
                    <a
                        href="https://www.babylonjs.com/demos/webgpu/forestwebgpu"
                        target="_blank"
                        class="text-white"
                    >https://www.babylonjs.com/demos/webgpu/forestwebgpu</a>
                </div>
            </div>
        </div>
        <div 
            class="row justify-center items-center content-center wrap q-gutter-md text-white text-center text-weight-regular q-gutter-xl full-width"
            v-if="show === 1"
        >
            <div class="col-10 p-box q-pa-md text-h4">
                <highlight-code :code="glDemoCode"></highlight-code>
            </div>
        </div>
        <div 
            class="row justify-center items-center content-center wrap q-gutter-md text-white text-center text-weight-regular q-gutter-xl full-width"
            v-else-if="show === 2"
        >
            <div class="col-11 p-box q-pa-md text-h4">
                <highlight-code :code="gpuDemoCode"></highlight-code>
            </div>
        </div>
    </q-page>
</template>
<script>
import { defineComponent } from 'vue';
import AnimeTrigger from '../../plugin/anime-trigger';
import HighlightCode from '../../components/HighlightCode.vue';
import { glDemoCode, gpuDemoCode } from '../../assets/code/glCode';

export default defineComponent({

  components: {
    HighlightCode
  },

  setup() {

    const { show } = AnimeTrigger(2);

    return {

      show,
      glDemoCode,
      gpuDemoCode

    }

  }

  
})
</script>