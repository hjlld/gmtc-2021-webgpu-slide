"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.WebGPUSort = void 0;
var ComputeShaderCode_wgsl_1 = require("./ComputeShaderCode.wgsl");
var WebGPUSort = /** @class */ (function () {
    function WebGPUSort() {
        if (!navigator.gpu) {
            throw new Error('WebGPU not supported!');
        }
    }
    WebGPUSort.prototype.Init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, navigator.gpu.requestAdapter({
                                powerPreference: 'high-performance'
                            })];
                    case 1:
                        _a.adapter = _c.sent();
                        if (!this.adapter) {
                            throw new Error('Adapter init failed!');
                        }
                        _b = this;
                        return [4 /*yield*/, this.adapter.requestDevice()];
                    case 2:
                        _b.device = _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WebGPUSort.prototype.Validate = function (array) {
        var length = array.length;
        for (var i = 0; i < length; i++) {
            if (i !== length - 1 && array[i] > array[i + 1]) {
                console.error('validation error:', i, array[i], array[i + 1]);
                return false;
            }
        }
        return true;
    };
    WebGPUSort.prototype.Run = function (array) {
        return __awaiter(this, void 0, void 0, function () {
            var maxThreadNum, maxDispatchNum, maxBufferSize, length, byteLength, threadgroupsPerGrid, offset, inputBuffer, inputRange, shaderModule1, bindGroupLayout1, pipelineLayout1, pipeline1, bindGroup1, i, commandEncoder, passEncoder, uniform, uniformBuffer, shaderModule2, bindGroupLayout2, pipelineLayout2, pipeline2, bindGroup2, k, j, commandEncoder2, passEncoder2, lastCommandEncoder, resultBufferToRead, resultMappedRange, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.device) {
                            throw new Error('Device not found!');
                        }
                        maxThreadNum = this.device.limits.maxComputeWorkgroupSizeX || 256;
                        maxDispatchNum = this.device.limits.maxComputeWorkgroupsPerDimension || 65535;
                        maxBufferSize = this.device.limits.maxStorageBufferBindingSize || 134217728;
                        length = array.length;
                        byteLength = array.byteLength;
                        console.log("Buffer size: " + byteLength / 1024 / 1024 + " MiB");
                        if (byteLength > maxBufferSize) {
                            throw new Error('Array is too large!');
                        }
                        threadgroupsPerGrid = Math.max(1, length / maxThreadNum);
                        if (threadgroupsPerGrid > maxDispatchNum) {
                            throw new Error("Max workgroup dimension size is limited to " + maxDispatchNum + "!");
                        }
                        offset = Math.log2(length) - (Math.log2(maxThreadNum * 2 + 1));
                        inputBuffer = this.device.createBuffer({
                            label: 'input',
                            mappedAtCreation: true,
                            size: byteLength,
                            usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST
                        });
                        inputRange = inputBuffer.getMappedRange();
                        new Float32Array(inputRange).set(array);
                        inputBuffer.unmap();
                        shaderModule1 = this.device.createShaderModule({
                            label: 'shader1',
                            code: ComputeShaderCode_wgsl_1.shader1(maxThreadNum)
                        });
                        bindGroupLayout1 = this.device.createBindGroupLayout({
                            entries: [
                                {
                                    binding: 0,
                                    visibility: GPUShaderStage.COMPUTE,
                                    buffer: {
                                        type: 'storage'
                                    }
                                }
                            ]
                        });
                        pipelineLayout1 = this.device.createPipelineLayout({
                            bindGroupLayouts: [bindGroupLayout1]
                        });
                        return [4 /*yield*/, this.device.createComputePipelineAsync({
                                label: 'pipeline1',
                                compute: {
                                    module: shaderModule1,
                                    entryPoint: 'main'
                                },
                                layout: pipelineLayout1
                            })];
                    case 1:
                        pipeline1 = _a.sent();
                        bindGroup1 = this.device.createBindGroup({
                            layout: bindGroupLayout1,
                            entries: [
                                {
                                    binding: 0,
                                    resource: {
                                        buffer: inputBuffer
                                    }
                                }
                            ]
                        });
                        for (i = 0; i < offset; i++) {
                            commandEncoder = this.device.createCommandEncoder();
                            passEncoder = commandEncoder.beginComputePass();
                            passEncoder.setPipeline(pipeline1);
                            passEncoder.setBindGroup(0, bindGroup1);
                            passEncoder.dispatch(threadgroupsPerGrid, 1, 1);
                            passEncoder.endPass();
                            this.device.queue.submit([commandEncoder.finish()]);
                        }
                        uniform = new Uint32Array([0, 0, 0, 0]);
                        uniformBuffer = this.device.createBuffer({
                            size: 16,
                            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
                        });
                        shaderModule2 = this.device.createShaderModule({
                            label: 'shader2',
                            code: ComputeShaderCode_wgsl_1.shader2(maxThreadNum)
                        });
                        bindGroupLayout2 = this.device.createBindGroupLayout({
                            entries: [
                                {
                                    binding: 0,
                                    visibility: GPUShaderStage.COMPUTE,
                                    buffer: {
                                        type: 'uniform'
                                    }
                                },
                                {
                                    binding: 1,
                                    visibility: GPUShaderStage.COMPUTE,
                                    buffer: {
                                        type: 'storage'
                                    }
                                }
                            ]
                        });
                        pipelineLayout2 = this.device.createPipelineLayout({
                            bindGroupLayouts: [bindGroupLayout2]
                        });
                        return [4 /*yield*/, this.device.createComputePipelineAsync({
                                label: 'pipeline2',
                                compute: {
                                    module: shaderModule2,
                                    entryPoint: 'main'
                                },
                                layout: pipelineLayout2
                            })];
                    case 2:
                        pipeline2 = _a.sent();
                        bindGroup2 = this.device.createBindGroup({
                            layout: bindGroupLayout2,
                            entries: [
                                {
                                    binding: 0,
                                    resource: {
                                        buffer: uniformBuffer
                                    }
                                },
                                {
                                    binding: 1,
                                    resource: {
                                        buffer: inputBuffer
                                    }
                                }
                            ]
                        });
                        if (threadgroupsPerGrid > 1) {
                            for (k = threadgroupsPerGrid >> offset; k <= length; k = k << 1) {
                                for (j = k >> 1; j > 0; j = j >> 1) {
                                    commandEncoder2 = this.device.createCommandEncoder();
                                    passEncoder2 = commandEncoder2.beginComputePass();
                                    passEncoder2.setPipeline(pipeline2);
                                    passEncoder2.setBindGroup(0, bindGroup2);
                                    uniform[0] = k;
                                    uniform[1] = j;
                                    this.device.queue.writeBuffer(uniformBuffer, 0, uniform);
                                    passEncoder2.dispatch(threadgroupsPerGrid, 1, 1);
                                    passEncoder2.endPass();
                                    this.device.queue.submit([commandEncoder2.finish()]);
                                }
                            }
                        }
                        lastCommandEncoder = this.device.createCommandEncoder();
                        resultBufferToRead = this.device.createBuffer({
                            size: byteLength,
                            usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ
                        });
                        lastCommandEncoder.copyBufferToBuffer(inputBuffer, 0, resultBufferToRead, 0, byteLength);
                        this.device.queue.submit([lastCommandEncoder.finish()]);
                        console.time('GPU sort - result buffer map async');
                        return [4 /*yield*/, resultBufferToRead.mapAsync(GPUMapMode.READ)];
                    case 3:
                        _a.sent();
                        console.timeEnd('GPU sort - result buffer map async');
                        resultMappedRange = resultBufferToRead.getMappedRange();
                        result = new Float32Array(resultMappedRange);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    WebGPUSort.prototype.Dispose = function () {
        var _a;
        (_a = this.device) === null || _a === void 0 ? void 0 : _a.destroy();
    };
    return WebGPUSort;
}());
exports.WebGPUSort = WebGPUSort;
