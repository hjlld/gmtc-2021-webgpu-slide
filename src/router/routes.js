
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'home', path: '', component: () => import('pages/Index.vue') },
      { name: 'aboutme', path: 'aboutme', component: () => import('pages/Aboutme.vue') },
      { name: 'what-happened-to-webgl', path: 'what-happened-to-webgl', component: () => import('pages/WebGL/Index.vue') },
      { name: 'history-of-webgl', path: 'history-of-webgl', component: () => import('pages/WebGL/History.vue') },
      { name: 'old-webgl', path: 'old-webgl', component: () => import('src/pages/WebGL/OldWebGL.vue') },
      { name: 'awkward-opengl', path: 'awkward-opengl', component: () => import('src/pages/WebGL/AwkwardOpenGL.vue') },
      { name: 'modern-graphic-industry', path: 'modern-graphic-industry', component: () => import('src/pages/WebGL/ModernGraphicIndustry.vue') },
      { name: 'webgpu-future-of-web-graphic', path: 'webgpu-future-of-web-graphic', component: () => import('src/pages/WebGPU/Index.vue') },
      { name: 'birth-of-webgpu', path: 'birth-of-webgpu', component: () => import('src/pages/WebGPU/BirthOfWebGPU.vue') },
      { name: 'what-is-webgpu', path: 'what-is-webgpu', component: () => import('src/pages/WebGPU/WhatIsWebGPU.vue') },
      { name: 'compare', path: 'compare', component: () => import('src/pages/WebGPU/Compare.vue') },
      { name: 'multiple-process-browser', path: 'multiple-process-browser', component: () => import('src/pages/WebGPU/BrowserProcess.vue') },
      { name: 'mental-model', path: 'mental-model', component: () => import('src/pages/WebGPU/MentalModel.vue') },
      { name: 'development-experience', path: 'development-experience', component: () => import('src/pages/WebGPU/DevelopmentExperience.vue') },
      { name: 'how-to-draw', path: 'how-to-draw', component: () => import('src/pages/WebGPU/HowToDraw.vue') },
      { name: 'bitonic-sort', path: 'bitonic-sort', component: () => import('src/pages/WebGPU/BitonicSort.vue') },
      { name: 'future', path: 'future', component: () => import('src/pages/Future/Index.vue') },
      { name: 'multithreading', path: 'multithreading', component: () => import('src/pages/Future/MultiThreading.vue') },
      { name: 'call-native-api', path: 'call-native-api', component: () => import('src/pages/Future/CallNativeAPI.vue') },
      { name: 'credit', path: 'credit', component: () => import('src/pages/Credit.vue') },
      { name: 'thanks', path: 'thanks', component: () => import('src/pages/Thanks.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
