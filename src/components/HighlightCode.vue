<template>

    <prism :language="language" :class="fontClass">{{ code }}</prism>

</template>
<script>
import 'prismjs';
import Prism from 'vue-prism-component';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-javascript';

export default {

    components: {

        'prism': Prism

    },

    props: {

        code: {

            type: String,

            required: true

        },

        language: {

            type: String,

            default: 'javascript'

        },

        fontClass: {

            type: String,

            default: 'display-1'

        }

    }

}
</script>
<style scoped>
@import "../../node_modules/prismjs/themes/prism-tomorrow.css";
</style>