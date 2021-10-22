<template>
  <q-page class="flex flex-center">
    <div class="row justify-center items-center content-center wrap q-gutter-md text-white text-left text-h4 text-weight-regular" >
      <div class="col-10 text-center text-h3 text-weight-bold">
        尴尬的 OpenGL
      </div>
      <div class="col-10 p-box q-pa-md">
        <ul>
            <li class="q-py-md">当年力挺 HTML5 并唾弃 Flash 的 Apple，在 Jobs 故去后，也抛弃了 OpenGL 这一开放标准，自立门户研发推出了全新的 Metal 图形框架</li>
            <li class="q-py-md">而 WebGL 的拥有者，Khronos Group 也逐渐放弃了 OpenGL 这一 WebGL 标准的基础，全力打造现在的明星产品 Vulkan 标准</li>
            <li class="q-py-md">事实上，WebGL 现在并不运行在 OpenGL 上，由于 ANGLE 的存在，实现了 WebGL 与本地 API 的转换实现（尽管非常难）</li>
            <li class="q-py-md">OpenGL 已经不适用于（也没有人用于）高端图形领域，尤其是 AAA 游戏开发</li>
            <li class="q-py-md">OpenGL 会继续存在，服务于低端和嵌入式图形领域，如科研等；OpenGL SC 服务于军工、航天、车机等安全关键行业</li>
        </ul>
      </div>
    </div>
  </q-page>
</template>