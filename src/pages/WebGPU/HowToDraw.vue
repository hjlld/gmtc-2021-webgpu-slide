<template>
    <q-page class="flex flex-center">
        <div class="row justify-center items-center content-center wrap q-gutter-md text-white text-left text-h4 text-weight-regular" v-if="show === 0">
        <div class="col-10 text-center text-h3 text-weight-bold">
            WebGPU 开发体验
        </div>
        <div class="col-10 q-pa-md p-box">
            <ul>
                <li class="q-py-md">大量的异步方法，需要 Promise 知识和能力</li>
                <li class="q-py-md">良好的 TypeScript 支持，<kbd>npm i @webgpu/types -D</kbd></li>
                <li class="q-py-md">全新的 WGSL 语言，语法怪异，类似 Rust、TypeScript 的缝合怪</li>
                <li class="q-py-md">回滚 GLSL 4.5 也可以，<kbd>npm i @webgpu/glslang</kbd>，预编译为 SPIR-V 的二进制着色器代码</li>
                <li class="q-py-md">可以尽情使用全新的 ES 特性和浏览器功能</li>
            </ul>
        </div>
        </div>
        <div
            class="row justify-center items-center content-center wrap q-gutter-md text-white text-left text-h4 text-weight-regular"
            v-else-if="show === 1"
        >
            <div class="col-12 q-px-md p-box">
                <highlight-code :code="wgslCode" language="rust"></highlight-code>
            </div>
        </div>
        <div
            class="row justify-center items-center content-center wrap q-gutter-md text-white text-left text-h4 text-weight-regular"
            v-else-if="show === 2"
        >
            <q-scroll-area class="col-12 q-px-md p-box" style="width: 90vw;height: 90vh;">
                <highlight-code :code="howToDrawCode"></highlight-code>
            </q-scroll-area>
        </div>        
    </q-page>
</template>
<script>
import { defineComponent } from 'vue';
import HighlightCode from '../../components/HighlightCode.vue';
import { wgslCode, howToDrawCode } from '../../assets/code/glCode';
import AnimeTrigger from '../../plugin/anime-trigger';
export default defineComponent({

    components: {
        HighlightCode
    },

    setup() {

        const { show } = AnimeTrigger(2);

        return {

            howToDrawCode,
            wgslCode,
            show

        }

    }

})
</script>