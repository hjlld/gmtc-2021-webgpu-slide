<template>
    <q-page class="flex flex-center">
        <div
            class="row justify-center items-center content-center wrap q-gutter-md text-white text-center text-h4 text-weight-regular"
            v-if="show === 0"
        >
            <div class="col-10 text-center text-h3 text-weight-bold">多进程的浏览器架构</div>
            <div class="col-5 q-pa-md">
                <q-img src="~assets/img/edge1.png" style="width: 800px;"></q-img>
            </div>
            <div class="col-5 q-pa-md">
                <q-img src="~assets/img/edge2.png" style="width: 800px;"></q-img>
            </div>
        </div>
        <div
            class="row justify-center items-center content-center wrap q-gutter-md text-white text-center text-h4 text-weight-regular full-width"
            v-if="show === 1"
        >
            <div class="col-10 q-pa-md p-box">
                <q-img src="~assets/img/edge3.png" style="width: 90%;"></q-img>
            </div>
        </div>
        <div
            class="row justify-center items-center content-center wrap q-gutter-md text-white text-center text-h4 text-weight-regular full-width"
            v-if="show === 2"
        >
            <div class="col-11 q-pa-md p-box">
                <q-markup-table separator="cell">
                    <thead>
                        <tr class="higher-row">
                            <th class="text-left"></th>
                            <th class="text-center"><span class="text-h4">普通的 ArrayBuffer	</span></th>
                            <th class="text-center"><span class="text-h4">共享内存</span></th>
                            <th class="text-center"><span class="text-h4">可映射的 GPU 缓存</span></th>
                            <th class="text-center"><span class="text-h4">不可映射的 GPU 缓存（或纹理）</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="higher-row">
                        <td class="text-right"><span class="text-h4">内容进程中的 CPU</span></td>
                        <td class="text-center"><span class="text-h4"><b>可见</b></span></td>
                        <td class="text-center"><span class="text-h4"><b>可见</b></span></td>
                        <td class="text-center"><span class="text-h4">不可见</span></td>
                        <td class="text-center"><span class="text-h4">不可见</span></td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr class="higher-row">
                        <td class="text-right"><span class="text-h4">GPU 进程中的 CPU</span></td>
                        <td class="text-center"><span class="text-h4">不可见</span></td>
                        <td class="text-center"><span class="text-h4"><b>可见</b></span></td>
                        <td class="text-center"><span class="text-h4"><b>可见</b></span></td>
                        <td class="text-center"><span class="text-h4">不可见</span></td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr class="higher-row">
                        <td class="text-right"><span class="text-h4">GPU</span></td>
                        <td class="text-center"><span class="text-h4">不可见</span></td>
                        <td class="text-center"><span class="text-h4">不可见</span></td>
                        <td class="text-center"><span class="text-h4"><b>可见</b></span></td>
                        <td class="text-center"><span class="text-h4"><b>可见</b></span></td>
                        </tr>
                    </tbody>
                </q-markup-table>
            </div>
        </div>
        <div
            class="row justify-center items-center content-center wrap q-gutter-md text-white text-center text-h4 text-weight-regular full-width"
            v-if="show === 3"
        >
            <div class="col-10 q-pa-md p-box">
                <q-img src="~assets/img/figure1.svg" style="width: 75%;"></q-img>
            </div>
        </div>
    </q-page>
</template>
<script>
import { defineComponent } from 'vue';
import AnimeTrigger from '../../plugin/anime-trigger';

export default defineComponent({

    setup() {

        const { show } = AnimeTrigger(3);

        return {

            show

        }

    }


})
</script>
<style scoped>
.higher-row {
    height: 4em;
}
</style>