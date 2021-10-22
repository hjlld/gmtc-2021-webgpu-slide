import { ref, onMounted, onBeforeUnmount } from 'vue';

export default function animeTrigger(max) {
   
    const show = ref(0);

    const trigger = e => {

        if (e.key === ' ' || e.key === 'Spacebar') {

            if ( show.value === max ) {

                show.value = 0;

                return;

            }

            show.value++;

        }


    }

    onMounted(() => {

        window.addEventListener( 'keyup', trigger );

    });

    onBeforeUnmount(() => {

        window.removeEventListener( 'keyup', trigger );

    })

    return {

        show

    }

}