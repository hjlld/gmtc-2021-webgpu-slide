<template>
  <q-page class="flex flex-center">
    <div class="row justify-center items-center content-center wrap q-gutter-md text-white text-weight-regular full-width" style="line-height: 100%;" >
      <div class="col-10 text-center text-h3 text-weight-bold">
        WebGL 起源
      </div>
      <q-scroll-area class="col-10 p-box q-pa-xl" style="height: 80vh; width: 80%;">
        <q-timeline layout="dense" color="secondary">
          <q-timeline-entry heading>早期原型</q-timeline-entry>

          <q-timeline-entry side="right">
            <template v-slot:title>
              <span class="text-h4">Canvas3D</span>
            </template>
            <template v-slot:subtitle>
              <span class="text-h5">2006 年</span>
            </template>

            <div class="text-h5">一位名叫 <a target="_blank" class="text-white cursor-pointer	" @click="Vladimir = true">Vladimir Vukićević</a> 的美籍塞尔维亚裔软件工程师， 开始对即将到来的 HTML <kbd> {{`<canvas>`}} </kbd> 标签进行 OpenGL 原型的实现工作，他称之为“Canvas 3D”。
            </div>
          </q-timeline-entry>

          <q-timeline-entry side="right">            
            <template v-slot:title>
              <span class="text-h4">Mozilla 和 Opera</span>
            </template>
            <template v-slot:subtitle>
              <span class="text-h5">2007 年</span>
            </template>
            <div class="text-h5">Vladimir 同时也是 Mozilla 的员工，他的工作启发了 Mozilla 和当时另外一个重要的浏览器开发商 Opera；在 2007 年底，Mozilla 和 Opera 同时开始各自独立的 OpenGL 实现工作。</div>
          </q-timeline-entry>

          <q-timeline-entry heading>WebGL 1.0</q-timeline-entry>

          <q-timeline-entry side="right">
            <template v-slot:title>
              <span class="text-h4">WebGL 工作组</span>
            </template>
            <template v-slot:subtitle>
              <span class="text-h5">2009 年</span>
            </template>
            <div class="text-h5">非营利性组织 Khronos Group 创建了 WebGL 工作组，初始成员主要包括 Apple、Google、Mozilla 和 Opera。</div>
          </q-timeline-entry>

          <q-timeline-entry side="right">
            <template v-slot:title>
              <span class="text-h4">WebGL 1.0</span>
            </template>
            <template v-slot:subtitle>
              <span class="text-h5">2011 年 3 月</span>
            </template>
            <div class="text-h5">Khronos Group 正式发布 WebGL 1.0 标准</div>
          </q-timeline-entry>

          <q-timeline-entry heading>WebGL 2.0</q-timeline-entry>

          <q-timeline-entry side="right">
            <template v-slot:title>
              <span class="text-h4">WebGL 2.0 开始制定</span>
            </template>
            <template v-slot:subtitle>
              <span class="text-h5">2013 年</span>
            </template>
            <div class="text-h5">WebGL 工作组开始着手制定 WebGL 2.0 标准，但事情并没有想象中的那么顺利</div>
          </q-timeline-entry>

          <q-timeline-entry side="right">
            <template v-slot:title>
              <span class="text-h4">WebGL 2.0 正式发布</span>
            </template>
            <template v-slot:subtitle>
              <span class="text-h5">2017 年 2 月</span>
            </template>
            <div class="text-h5">Khronos Group 正式发布 WebGL 2.0 标准</div>
          </q-timeline-entry>

          <q-timeline-entry heading>蹉跎岁月</q-timeline-entry>

          <q-timeline-entry side="right">
            <template v-slot:title>
              <span class="text-h4">Goole、Mozilla 同步支持</span>
            </template>
            <template v-slot:subtitle>
              <span class="text-h5">2017 年 2 月</span>
            </template>
            <div class="text-h5">Chrome 56、Firefox 51 宣布支持 WebGL 2.0 标准</div>
          </q-timeline-entry>
          
          <q-timeline-entry side="right">
            <template v-slot:title>
              <span class="text-h4">在 WebGL 2.0 标准发布 4 年 7 个月之后……</span>
            </template>
            <template v-slot:subtitle>
              <span class="text-h5">2021 年 9 月 20 日</span>
            </template>
            <div class="text-h5">苹果宣布 Safari 15 正式支持 WebGL 2.0 标准</div>
          </q-timeline-entry>
        </q-timeline>
      </q-scroll-area>
      <q-dialog v-model="Vladimir">
        <q-card style="width: 70vw; max-width: 70vw;" class="bg-blue-grey-1">
          <q-card-section>
            <div class="text-h4">弗拉基米尔·弗基西维奇</div>
          </q-card-section>
          <q-card-section horizontal class="q-pa-xl">
            <q-card-section>
              <q-img src="~assets/img/Vladimir.jpg" style="min-width: 300px;"></q-img>
              <div><a href="https://commons.wikimedia.org/w/index.php?curid=14195244" target="_blanck">版权所有 Johnath CC BY-SA 3.0</a></div> 
            </q-card-section>
            <q-card-section class="text-h5" style="width: 70%;">
              <ul>
                <li class="q-mb-md">于 1979 年 4 月 29 日出生于塞尔维亚</li>
                <li class="q-mb-md">主要知名于开发开放源代码图形库，包括 Mozilla 项目中使用的图形库</li>
                <li class="q-mb-md">魔兽世界玩家，创办了早期魔兽世界的著名粉丝站点 WoWWiki </li>
                <li class="q-mb-md">目前就职于 Unity</li>
              </ul>
            </q-card-section>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  data() {
    return {
      Vladimir: false
    }
  }
})
</script>