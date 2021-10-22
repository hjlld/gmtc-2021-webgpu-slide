<template>
  <q-page class="flex flex-center">
    <div class="row justify-center items-center content-center wrap q-gutter-md text-white text-left text-h4 text-weight-regular" v-if="show === 0">
      <div class="col-10 text-center text-h3 text-weight-bold">
        GPU 通用计算 - <del>WebGL 2.0</del> WebGPU Compute Shader
      </div>
      <div class="col-10 q-pa-md p-box">
        <ul>
            <li class="q-py-md">Intel 公司曾提交了 WebGL 2.0 Compute 标准，该标准来自 OpenGL ES 3.1 Compute </li>
            <li class="q-py-md">但只有 Chrome 浏览器实现了这一标准，Chrome 团队在实现 WebGL 2.0 Compute 时遇到了巨大的阻力</li>
            <li class="q-py-md">本质是因为 WebGL 并不与现代 GPU 的设计理念匹配，导致了很多 CPU 和 GPU 性能问题</li>
            <li class="q-py-md">Intel 公司决定停止继续开发 WebGL 2.0 Compute，而将注意力转移到 WebGPU 上</li>
            <li class="q-py-md">Google 已经将 WebGL 2.0 Compute 支持从 Chrome 中移除，该标准已经名存实亡</li>
        </ul>
      </div>
    </div>
    <div class="row justify-center items-center content-center wrap q-gutter-md text-white text-left text-h4 text-weight-regular" v-else-if="show === 1">
      <div class="col-10 text-center text-h3 text-weight-bold">
        双调排序 - 這是一种可以并行计算的排序方法
      </div>
      <div class="col-4 text-h5 text-weight-bold p-box q-px-md">
        <highlight-code :code="cpuSortCode"></highlight-code>
      </div>
      <div class="col-7 text-h5 text-weight-bold p-box q-px-md">
        <highlight-code :code="gpuSortCode"></highlight-code>
      </div>
    </div>
    <div class="p-box row justify-center items-center content-center wrap q-gutter-md text-white text-left text-h4 text-weight-regular" style="width: 90%;" v-else-if="show === 2">
      <div class="col-3 text-center text-h5 text-weight-bold">
        <div class="q-mb-md">CPU 排序</div>
        <div>
          <q-btn color="secondary" class="q-mb-md" size="xl" @click="CPUSort()">开始排序</q-btn>
        </div>
        <div class="q-mb-md text-h3" v-if="cpuTime !== 0">{{`${Math.round(cpuTime)} ms`}}</div>
      </div>
      <div class="col text-center text-h5 text-weight-bold">
        <div class="q-mb-md">
          <kbd>Array.length = Math.pow( 2, 23 ); //8,388,608</kbd>
        </div>
        <div>
          <q-btn color="secondary" size="xl" @click="randomizeArray()">初始化数组</q-btn>
        </div>
      </div>
      <div class="col-3 text-center text-h5 text-weight-bold">
        <div class="q-mb-md">GPU 排序</div>
        <div>
          <q-btn color="secondary" size="xl" class="q-mb-md" @click="GPUSort()">开始排序</q-btn>
        </div>
        <div class="q-mb-md text-h3" v-if="gpuTime !== 0">{{`${Math.round(gpuTime)} ms`}}</div>
      </div>
      <q-scroll-area class="col-11 text-left text-caption text-weight-lighter q-pa-xl" style="height: 500px;">
        {{ textArray }}
      </q-scroll-area>
    </div>
  </q-page>
</template>
<script>
import { defineComponent, ref } from 'vue';
import AnimeTrigger from '../../plugin/anime-trigger';
import HighlightCode from '../../components/HighlightCode.vue';
import { cpuSortCode, gpuSortCode } from '../../assets/code/glCode';
import { WebGPUSort } from '../../plugin/WebGPUSort';

export default defineComponent({

    components: {
      HighlightCode
    },

    setup() {

        const { show } = AnimeTrigger(2);

        const array = new Float32Array({length: Math.pow(2, 23)});

        const textArray = ref('');

        const cpuTime = ref(0);
        const gpuTime = ref(0);
        

        const arrayToText = ( array ) => {

            let LENGTH = 275;

            let slicedArray = array.slice( 0, LENGTH );

            textArray.value = ''

            for ( let i = 0; i < slicedArray.length; ++ i ) {

                 textArray.value += `${ slicedArray[ i ].toString() }, `

            }

        }

        const GPUSort = async () => {

          const sort = new WebGPUSort();

          await sort.Init();

          const start = performance.now();

          const result = await sort.Run( array );

          arrayToText( result );

          gpuTime.value = performance.now() - start;

          if ( sort.Validate( result ) ) {

              console.log( 'GPU sort validation passed!' )

          } else {

              throw new Error( 'GPU sort validation NOT passed!' )

          };

        };

        const randomizeArray = () => {

            cpuTime.value = 0;

            gpuTime.value = 0;

            for ( let i = 0; i < array.length; ++ i ) {

                array[ i ] = Math.random();

            }

            arrayToText( array );

        };

        const CPUSort = () => {

            cpuTime.value = 0;

            let cpuArray = array.slice( 0 );

            let startTime = performance.now();

            cpuArray.sort( ( a, b ) => {

                return a - b;

            })

            cpuTime.value = performance.now() - startTime;

            arrayToText( cpuArray );

        };

        return {
            cpuSortCode,
            gpuSortCode,
            show,
            array,
            textArray,
            cpuTime,
            gpuTime,
            GPUSort,
            CPUSort,
            arrayToText,
            randomizeArray,
        }

    }


})
</script>