<template>
  <q-page class="flex flex-center">
    <div class="row justify-center items-center content-center wrap q-gutter-md text-white text-left text-h4 text-weight-regular full-width" style="line-height: 100%;" >
      <div class="col-10 text-center text-h3 text-weight-bold">
        WebGPU 的诞生
      </div>
      <q-scroll-area class="col-10 p-box q-pa-xl" style="height: 80vh; width: 80%;">
        <q-timeline layout="dense" color="secondary">
          <q-timeline-entry heading>WebGL 之外的全新构想</q-timeline-entry>

          <q-timeline-entry side="right">
            <template v-slot:title>
              <span class="text-h4">“WebGL Next”</span>
            </template>
            <template v-slot:subtitle>
              <span class="text-h5">2016 年 6 月 8 日</span>
            </template>

            <div class="text-h5">
              在 WebGL 工作组双年会上，Google 展示了题为“精确网页图形接口”的幻灯片演示，其中探索了构建一个全新的 API 来代替 WebGL 的想法和原则，并称之为“WebGL Next”。
            </div>
          </q-timeline-entry>

          <q-timeline-entry side="right">            
            <template v-slot:title>
              <span class="text-h4">百家争鸣</span>
            </template>
            <template v-slot:subtitle>
              <span class="text-h5">2017 年 1 月 24 日</span>
            </template>
            <div class="text-h5">
              Khornos Group 举办了讨论 WebGL Next 的研讨会，Google 团队展示了运行在 Chromium 上基于 OpenGL 的全新图形 API 的原型，同时还可以基于 OpenGL 和 Metal 独立运行。这个被叫做 NXT 的图形标准原型借鉴了 Vulkan、D3D12 和 Metal API 的概念。同时，Apple 和 Mozilla 也展示了基于 Safari 和 Servo 的原型，二者都非常接近于 Metal API。
            </div>
          </q-timeline-entry>

          <q-timeline-entry heading>WebGPU 被首次提出</q-timeline-entry>

          <q-timeline-entry side="right">
            <template v-slot:title>
              <span class="text-h4">Apple 先行一步</span>
            </template>
            <template v-slot:subtitle>
              <span class="text-h5">2017 年 2 月 7 日</span>
            </template>
            <div class="text-h5">
              Apple WebKit 团队正式向 W3C 社区工作组提出设计全新 API 的提案。同时他们还提出了一个名为 WebGPU 的技术概念验证的提案，这是一个基于苹果 Metal API 概念的图形标准。随后，工作组采纳了 WebGPU 这个名字作为未来新标准的命名，并将 Apple 最初的那个提案的名字改名为 WebMetal，以避免重名造成的误解和冲突。
            </div>
          </q-timeline-entry>

          <q-timeline-entry side="right">
            <template v-slot:title>
              <span class="text-h4">GPUWeb 工作组成立</span>
            </template>
            <template v-slot:subtitle>
              <span class="text-h5">2017 年 2 月 16 日</span>
            </template>
            <div class="text-h5">
              W3C 的 “GPU for the Web” 社区工作组正式成立，尽管此前 Apple、Google、Mozilla 都曾提出实验性原型，但最终只有 Apple 的提案正式进入了 “gpuweb-proposals” 的代码仓库。
            </div>
          </q-timeline-entry>

          <q-timeline-entry side="right">
            <template v-slot:title>
              <span class="text-h4">WebGL 的最后一搏</span>
            </template>
            <template v-slot:subtitle>
              <span class="text-h5">2017 年 3 月 21 日</span>
            </template>
            <div class="text-h5">
              Mozilla 向 Khronos Group 的代码仓库提交了一个基于 Vulkan 名为 WebGL Next 的提案。
            </div>
          </q-timeline-entry>

          <q-timeline-entry heading>WebGPU 胜出</q-timeline-entry>

          <q-timeline-entry side="right">
            <template v-slot:title>
              <span class="text-h4">浏览器厂商站到了 WebGPU 这边</span>
            </template>
            <template v-slot:subtitle>
              <span class="text-h5">2018 年 6 月 1 日</span>
            </template>
            <div class="text-h5">
              Google Chrome 团队宣布将开始着手 WebGPU 标准的实现工作。这也在事实上宣布 WebGPU 标准的胜出和 WebGL 的终结 —— 不会再有 WebGL 3.0 和 WebGL Next 了。
            </div>
          </q-timeline-entry>

          <q-timeline-entry heading>茁壮成长</q-timeline-entry>

          <q-timeline-entry side="right">
            <template v-slot:title>
              <span class="text-h4">Chrome Origin Trial</span>
            </template>
            <template v-slot:subtitle>
              <span class="text-h5">2021 年 9 月 ~ 2022 年 2 月</span>
            </template>
            <div class="text-h5">从 Chrome 94 开始到 Chrome 97，Chrome 团队将开始 WebGPU 的 Origin Trial。开发者只需要填写申请表获取一个 Token，然后在 HTML 文件的 <kbd>{{`<meta>`}}</kbd> 标签中填入此 Token，Chrome 浏览器将会为此网页开启 WebGPU 支持。</div>
          </q-timeline-entry>
          
          <q-timeline-entry side="right">
            <template v-slot:title>
              <span class="text-h4">1.0 正式发布？</span>
            </template>
            <template v-slot:subtitle>
              <span class="text-h5">2021 年底</span>
            </template>
            <div class="text-h5">工作组希望在 2021 年底能够正式发布 WebGPU 1.0 标准</div>
          </q-timeline-entry>
        </q-timeline>
      </q-scroll-area>
    </div>
  </q-page>
</template>