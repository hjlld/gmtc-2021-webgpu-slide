<template>
    <div ref="root" class="canvas-container">
    </div>
</template>
<script>
import { onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router';
import { Shadertoy } from 'hiwebgl-shadertoy-webgpu/dist/Shadertoy';

export default {

    props: {

        shadertoyID: {
            type: String,
            required: false,
            default: ''
        },

        shaderCode: {
            type: String,
            required: false,
            default: ''
        }

    },

    setup( props ) {

        const root = ref(null);

        let shadertoy;
        let thisShadertoyID = props.shadertoyID;
        let thisShaderCode = props.shaderCode;

        onMounted(async () => {

            const app = root.value;
            shadertoy = await Shadertoy.Create( app );
            if ( props.shadertoyID ) {
                await shadertoy.GetCodeByID( props.shadertoyID );
            } else {
                shadertoy.SetCode(props.shaderCode)
            }
            await shadertoy.InitRenderer();
            shadertoy.Render();

        })

        onBeforeRouteUpdate( async () => {
            if ( thisShaderCode !== props.shaderCode || thisShadertoyID !== props.shadertoyID ) {
                shadertoy.StopRender();
                if ( props.shadertoyID ) {
                    await shadertoy.GetCodeByID( props.shadertoyID );
                } else {
                    shadertoy.SetCode(props.shaderCode)
                }
                shadertoy.__iTimeArray[ 0 ] = 0;
                await shadertoy.InitRenderer();
                shadertoy.Render();

                thisShaderCode = props.shaderCode;
                thisShadertoyID = props.shadertoyID;

            }
        })
        

        return {

            root,
            shadertoy,
            thisShadertoyID,
            thisShaderCode

        }

    }


}

</script>
<style scoped>
.canvas-container {

    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;

}
</style>