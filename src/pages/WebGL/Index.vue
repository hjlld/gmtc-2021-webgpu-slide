<template>
  <q-page class="flex flex-center">
    <div class="row justify-center items-center content-center wrap q-gutter-md text-white text-center text-h1 text-weight-bold full-width">
      <div class="col-12" v-if="show === 0">WebGL 不好用了吗？</div>
      <div class="col-8" v-else-if="show === 1">
        <q-img src="~assets/img/emo1.jpg" style="width: 100%;"></q-img>
      </div>
      <div class="col-8" v-else-if="show === 2">
        <q-img src="~assets/img/emo2.jpg" style="width: 100%;"></q-img>
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