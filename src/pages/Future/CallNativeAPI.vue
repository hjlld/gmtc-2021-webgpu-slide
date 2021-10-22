<template>
  <q-page class="flex flex-center">
    <div class="row justify-center items-center content-center wrap q-gutter-md text-white text-left text-h4 text-weight-regular full-width" >
      <div class="col-10 text-center text-h3 text-weight-bold">
        调用本地图形能力 - 实时光线追踪
      </div>
      <div class="col-8 p-box q-pa-md" v-if="show === 0">
          <q-img src="~assets/img/dxr1.png"></q-img>
      </div>
      <div class="col-8 p-box q-pa-md" v-else-if="show === 1">
          <q-img src="~assets/img/dxr2.png"></q-img>
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