export const glDemoCode =
`let gl = this.canvas.getContext( 'webgl' );
    gl.createShader( type );
    gl.shaderSource( shader, sourceCode );
    gl.compileShader( shader );
    gl.createProgram();
    gl.attachShader( program, shader );
    gl.linkProgram( program );
    gl.useProgram( program );
    gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer );
    gl.bufferData( gl.ARRAY_BUFFER, dataView, gl.STATIC_DRAW );
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
    gl.drawArrays( mode, 0, size );
`

export const gpuDemoCode =
`let adapter = await navigator.gpu.requestAdapter();
let device = await adapter.requestDevice();
let context = canvas.getContext('webgpu');
let context.configure({ ... });
let commandEncoder = device.createCommandEncoder();
    let renderPassEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
    let renderPipeline = await device.createRenderPipelineAsync(pipelineDescriptor);
    renderPassEncoder.setPipeline(renderPipeline);
    renderPassEncoder.drawIndexed(indexCount, 1, 0, 0, 0);
    renderPassEncoder.endPass();
device.queue.submit([ commandEncoder.finish() ]);
`

export const howToDrawCode =
`// 获取硬件设备
let adapter = await navigator.gpu.requestAdapter();
let device = await adapter.requestDevice();

// 可以用 Canvas，也可以不用 Canvas，还可以用很多 Canvas；用的话就把 Canvas 与设备相连
let context = canvas.getContext( 'webgpu' );
let context.configure( { ... });

// 创建命令编码器，所有 GPU 指令都是通过它发给 GPU 的
let commandEncoder = device.createCommandEncoder();
    
    // 创建渲染通道、渲染管线、着色器……等等所有你想做的 GPU 指令
    let renderPassEncoder = commandEncoder.beginRenderPass( renderPassDescriptor );
    let renderPipeline = await device.createRenderPipelineAsync( renderPipelineDescriptor );
    renderPassEncoder.setPipeline( renderPipeline );
    renderPassEncoder.drawIndexed( indexCount, 1, 0, 0, 0 );
    renderPassEncoder.endPass();

// 结束命令编码器并发送到 GPU 设备的指令队列中
device.queue.submit( [ commandEncoder.finish() ] );
`

export const wgslCode = 
`[[block]]
struct Uniforms {
    [[size(64)]]uPMatrix: mat4x4<f32>;
    [[size(64)]]uMVMatrix: mat4x4<f32>;
};

[[group(0), binding(0)]]
var<uniform> uniforms: Uniforms;

[[stage(vertex)]]
fn main (
    [[location(0)]] aVertexPosition : vec3<f32>
) -> [[builtin(position)]] vec4<f32> {
    return uniforms.uPMatrix * uniforms.uMVMatrix * vec4<f32>(aVertexPosition, 1.0);
}`

export const cpuSortCode = 
`Array.sort( 
        
    ( a, b ) => {

        return a - b;

    }

);






`

export const gpuSortCode =
`let adapter = await navigator.gpu.requestAdapter();
let device = await adapter.requestDevice();
let commandEncoder = device.createCommandEncoder();
let passEncoder = commandEncoder.beginComputePass();
let shaderModule = device.createShaderModule({code: shaderCode});
let pipeline = await device.createComputePipelineAsync({
    compute: {
        module: shaderModule,
        entryPoint: 'main'
    }
});
passEncoder.setPipeline(pipeline);
passEncoder.dispatch(threadgroupsPerGrid, 1, 1);
passEndocer.endPass();
device.queue.submit( [ commandEncoder.finish() ] );
`