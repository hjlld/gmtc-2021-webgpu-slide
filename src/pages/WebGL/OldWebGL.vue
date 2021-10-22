<template>
  <q-page class="flex flex-center">
    <div class="row justify-center items-center content-center wrap q-gutter-md text-white text-left text-h4 text-weight-regular" >
      <div class="col-10 text-center text-h3 text-weight-bold">
        年迈的 WebGL
      </div>
      <div class="col-10 q-pa-md p-box">
        <ul>
            <li class="q-py-md">WebGL 1.0 映射自 OpenGL ES 2.0；WebGL 2.0 映射自 OpenGL ES 3.0</li>
            <li class="q-py-md">WebGL 的设计理念同源可以追溯到 1992 年 OpenGL 1.0 发布时，更早则可追溯到 1980 年代 IRIS GL 的时代</li>
            <li class="q-py-md">这也意味着 WebGL 并不与现代 GPU 的设计理念匹配，导致了很多 CPU 和 GPU 性能问题</li>
            <li class="q-py-md">同时也使得现代浏览器厂商在现代化的本地 GPU API 之上对 WebGL 进行实现的工作变的愈发困难</li>
            <li class="q-py-md">WebGL 2.0 Compute 标准是一次为 WebGL 添加通用计算功能的尝试，但是因为与本地 API 的不匹配导致这次努力异常的困难</li>
        </ul>
      </div>
    </div>
  </q-page>
</template>