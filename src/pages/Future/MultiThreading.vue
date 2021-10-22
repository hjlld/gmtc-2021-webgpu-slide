<template>
  <q-page class="flex flex-center">
    <div class="row justify-center items-center content-center wrap q-gutter-md text-white text-left text-h4 text-weight-regular" v-if="show === 0">
      <div class="col-10 text-center text-h3 text-weight-bold">
        多线程（2022年？）
      </div>
      <div class="col-10 p-box q-pa-md">
        <ul>
            <li class="q-py-md">多线程是现代图形 API 的一个关键部分。与 OpenGL 不同，较新的 API 允许应用程序同时从多个线程编码命令、提交操作、向 GPU 传输数据等等，从而缓解了 CPU 的瓶颈。</li>
            <li class="q-py-md">多线程对于 WebGPU 特别重要，因为 IDL 绑定通常比 C 调用慢得多</li>
            <li class="q-py-md">一个 WebGPU 对象可以简单地被 postMessage() 到另一个线程，创建一个新的 WebGPU 对象，其中包含一个指向 GPU 进程中同一个（引用计数）对象的句柄</li>
        </ul>
      </div>
    </div>
    <div class="row justify-center items-center content-center wrap q-gutter-md text-white text-left text-h4 text-weight-regular full-width" v-if="show >= 1">
      <div class="col-10 text-center text-h3 text-weight-bold">
        主线程 与 子线程 的对话
      </div>
      <q-scroll-area ref="scrollArea" class="col-10 text-h4 text-weight-bold q-px-xl" style="height: 700px;">
        <q-chat-message
          avatar="https://cdn.quasar.dev/img/avatar4.jpg"
          sent
          bg-color="positive"
          v-if="show >= 2"
        >
          <template v-slot:name><span class="text-h5">主线程</span></template>
          <div>
            <q-spinner-dots size="2rem" v-if="show === 2"/>
            <div class="q-pa-md" v-if="show >= 3">const B1 = device.createBuffer(...);</div>
          </div>
        </q-chat-message>
        <q-chat-message
          avatar="https://cdn.quasar.dev/img/avatar4.jpg"
          sent
          bg-color="positive"
          v-if="show >= 4"
        >
          <template v-slot:name><span class="text-h5">主线程</span></template>
          <div>
            <q-spinner-dots size="2rem" v-if="show === 4"/>
            <div class="q-pa-md" v-if="show >= 5">嘿，我有个 B1 的 Buffer，你要不要看看？</div>
          </div>
        </q-chat-message>
        <q-chat-message
          avatar="https://cdn.quasar.dev/img/avatar4.jpg"
          sent
          stamp="PM 22:00"
          v-if="show >= 6"
        >
          <template v-slot:name><span class="text-h5">主线程</span></template>
          <div>
            <q-spinner-dots size="2rem" v-if="show === 6"/>
            <q-card flat bordered class="bg-grey-3" style="width: 350px;" v-if="show >= 7">
              <q-card-section horizontal class="justify-between">
                <q-card-section class="col q-pt-xs">
                  <div class="text-h4 q-mt-sm q-mb-xs">B1</div>
                  <div class="text-h6 text-grey">
                    GPUBuffer: 16 MB
                  </div>
                </q-card-section>
                <q-card-section class="col-5 flex flex-center">
                  <q-icon name="memory" class="text-accent" style="font-size: 64px;" />
                </q-card-section>
              </q-card-section>
              <q-separator />
              <q-card-actions>
                <q-btn flat round icon="event" />
                <q-btn flat>
                  发送自 postMessage()
                </q-btn>
              </q-card-actions>
            </q-card>
          </div>

        </q-chat-message>
        <q-chat-message
          avatar="https://cdn.quasar.dev/img/avatar3.jpg"
          bg-color="grey-2"
          stamp="PM 22:00"
          v-if="show >= 8"
        >
          <template v-slot:name><span class="text-h5">子线程</span></template>
          <div>
            <q-spinner-dots size="2rem" v-if="show === 8"/>
            <div class="q-pa-md" v-if="show >= 9">收到了，另存为 B2</div>
          </div>
        </q-chat-message>
        <q-chat-message
          avatar="https://cdn.quasar.dev/img/avatar3.jpg"
          bg-color="grey-2"
          stamp="PM 22:01"
          v-if="show >= 10"
        >
          <template v-slot:name><span class="text-h5">子线程</span></template>
          <div>
            <q-spinner-dots size="2rem" v-if="show === 10"/>
            <div class="q-pa-md" v-if="show >= 11">
              <div>const mapPromise = B2.mapAsync()</div>
              <div class="text-red text-h6">未发送</div>
            </div>
          </div>
        </q-chat-message>
        <q-chat-message
          avatar="https://cdn.quasar.dev/img/avatar4.jpg"
          sent
          bg-color="positive"
          stamp="PM 22:01"
          v-if="show >= 11"
        >
          <template v-slot:name><span class="text-h5">主线程</span></template>
          <div>
            <q-spinner-dots size="2rem" v-if="show === 11"/>
            <div class="q-pa-md" v-if="show >= 12">B1.mapAsync()</div>
          </div>
        </q-chat-message>
        <q-chat-message
          avatar="https://cdn.quasar.dev/img/avatar4.jpg"
          sent
          bg-color="positive"
          stamp="PM 22:01"
          v-if="show >= 13"
        >
          <template v-slot:name><span class="text-h5">主线程</span></template>
          <div>
            <q-spinner-dots size="2rem" v-if="show === 13"/>
            <div class="q-pa-md" v-if="show >= 14">我这里报错了，是你做了什么吗？</div>
          </div>
        </q-chat-message>
        <q-chat-message
          avatar="https://cdn.quasar.dev/img/avatar3.jpg"
          bg-color="grey-2"
          stamp="PM 22:02"
          v-if="show >= 15"
        >
          <template v-slot:name><span class="text-h5">子线程</span></template>
          <div>
            <q-spinner-dots size="2rem" v-if="show === 15"/>
            <div class="q-pa-md" v-if="show >= 16">因为我这里已经对这个 GPUBuffer 进行 mapAsync() 操作了</div>
          </div>
        </q-chat-message>
        <q-chat-message
          avatar="https://cdn.quasar.dev/img/avatar4.jpg"
          sent
          bg-color="positive"
          stamp="PM 22:03"
          v-if="show >= 17"
        >
          <template v-slot:name><span class="text-h5">主线程</span></template>
          <div>
            <q-spinner-dots size="2rem" v-if="show === 17"/>
            <div class="q-pa-md" v-if="show >= 18">那我来做些别的事吧</div>
          </div>
        </q-chat-message>
        <q-chat-message
          avatar="https://cdn.quasar.dev/img/avatar4.jpg"
          sent
          bg-color="positive"
          stamp="PM 22:03"
          v-if="show >= 19"
        >
          <template v-slot:name><span class="text-h5">主线程</span></template>
          <div>
            <q-spinner-dots size="2rem" v-if="show === 19"/>
            <div class="q-pa-md" v-if="show >= 20">
              <div>encoder.copyBufferToTexture(B1, T);</div>
              <div>const commandBuffer = encoder.finish();</div>
            </div>
          </div>
        </q-chat-message>
        <q-chat-message
          avatar="https://cdn.quasar.dev/img/avatar4.jpg"
          sent
          bg-color="positive"
          stamp="PM 22:04"
          v-if="show >= 21"
        >
          <template v-slot:name><span class="text-h5">主线程</span></template>
          <div>
            <q-spinner-dots size="2rem" v-if="show === 21"/>
            <div class="q-pa-md" v-if="show >= 22">为什么这次我这里没有报错呢？</div>
          </div>
        </q-chat-message>
        <q-chat-message
          avatar="https://cdn.quasar.dev/img/avatar3.jpg"
          bg-color="grey-2"
          stamp="PM 22:04"
          v-if="show >= 23"
        >
          <template v-slot:name><span class="text-h5">主线程</span></template>
          <div>
            <q-spinner-dots size="2rem" v-if="show === 23"/>
            <div class="q-pa-md" v-if="show >= 24">你这次没有报错，因为你做的操作不依赖于 GPUBuffer 的映射状态</div>
          </div>
        </q-chat-message>
        <q-chat-message
          avatar="https://cdn.quasar.dev/img/avatar4.jpg"
          sent
          bg-color="positive"
          stamp="PM 22:05"
          v-if="show >= 25"
        >
          <template v-slot:name><span class="text-h5">主线程</span></template>
          <div>
            <q-spinner-dots size="2rem" v-if="show === 25"/>
            <div class="q-pa-md" v-if="show >= 26">好的，那我就提交 GPU 执行了</div>
          </div>
        </q-chat-message>
        <q-chat-message
          avatar="https://cdn.quasar.dev/img/avatar4.jpg"
          sent
          bg-color="positive"
          stamp="PM 22:05"
          v-if="show >= 27"
        >
          <template v-slot:name><span class="text-h5">主线程</span></template>
          <div>
            <q-spinner-dots size="2rem" v-if="show === 27"/>
            <div class="q-pa-md" v-if="show >= 28">
              device.queue.submit([commandBuffer]);
            </div>
          </div>
        </q-chat-message>
        <q-chat-message
          avatar="https://cdn.quasar.dev/img/avatar4.jpg"
          sent
          bg-color="positive"
          stamp="PM 22:06"
          v-if="show >= 29"
        >
          <template v-slot:name><span class="text-h5">主线程</span></template>
          <div>
            <q-spinner-dots size="2rem" v-if="show === 29"/>
            <div class="q-pa-md" v-if="show >= 30">
              咦，为什么我这里又报错了？
            </div>
          </div>
        </q-chat-message>
        <q-chat-message
          avatar="https://cdn.quasar.dev/img/avatar3.jpg"
          bg-color="grey-2"
          stamp="PM 22:07"
          v-if="show >= 31"
        >
          <template v-slot:name><span class="text-h5">子线程</span></template>
          <div>
            <q-spinner-dots size="2rem" v-if="show === 31"/>
            <div class="q-pa-md" v-if="show >= 32">
              <div>因为 CPU 目前依然掌握着此缓冲区的所有权!</div>
              <div>稍等……</div>
            </div>
          </div>
        </q-chat-message>
        <q-chat-message
          avatar="https://cdn.quasar.dev/img/avatar3.jpg"
          bg-color="grey-2"
          stamp="PM 22:07"
          v-if="show >= 33"
        >
          <template v-slot:name><span class="text-h5">子线程</span></template>
          <div>
            <q-spinner-dots size="2rem" v-if="show === 33"/>
            <div class="q-pa-md" v-if="show >= 34">
              <div>await mapPromise</div>
              <div>B2.unmap()</div>
            </div>
          </div>
        </q-chat-message>
        <q-chat-message
          avatar="https://cdn.quasar.dev/img/avatar3.jpg"
          bg-color="grey-2"
          stamp="PM 22:08"
          v-if="show >= 35"
        >
          <template v-slot:name><span class="text-h5">子线程</span></template>
          <div>
            <q-spinner-dots size="2rem" v-if="show === 35"/>
            <div class="q-pa-md" v-if="show >= 36">
              好了，你再试试！
            </div>
          </div>
        </q-chat-message>
        <q-chat-message
          avatar="https://cdn.quasar.dev/img/avatar4.jpg"
          sent
          bg-color="positive"
          stamp="PM 22:09"
          v-if="show >= 37"
        >
          <template v-slot:name><span class="text-h5">主线程</span></template>
          <div>
            <q-spinner-dots size="2rem" v-if="show === 37"/>
            <div class="q-pa-md" v-if="show >= 38">
              device.queue.submit([commandBuffer]);
            </div>
          </div>
        </q-chat-message>
        <q-chat-message
          avatar="https://cdn.quasar.dev/img/avatar4.jpg"
          sent
          bg-color="positive"
          stamp="PM 22:10"
          v-if="show >= 39"
        >
          <template v-slot:name><span class="text-h5">主线程</span></template>
          <div>
            <q-spinner-dots size="2rem" v-if="show === 39"/>
            <div class="q-pa-md" v-if="show >= 40">
              好了，这次成功了！
            </div>
          </div>
        </q-chat-message>
      </q-scroll-area>
    </div>
  </q-page>
</template>
<script>
import { defineComponent, ref, watchEffect } from 'vue';
import AnimeTrigger from '../../plugin/anime-trigger';

export default defineComponent({

  setup() {

    const { show } = AnimeTrigger(40);
    const scrollArea = ref(null);
    let offset = 0;

    watchEffect(() => {

      if (show.value >= 2){

        offset += 80;
        scrollArea.value.setScrollPosition('vertical', offset, 500);

      }


    })

    return {

      show,
      scrollArea

    }

  }

  
})
</script>