<template>
    <div class="flex flex-col items-center text-center p-4">
        <h1 class="text-2xl font-bold mb-4">Gracias por la oportunidad</h1>
        <p class="text-sm text-gray-600 mb-6">
            Hola, soy Gustavo. Dejé esta página primero para usar el vue-router y segundo para agradecer el interés en mi candidatura y permitirme avanzar hasta este punto. Debo decir que disfruté el volver a utilizar un stack completo. Me esforcé en dejar lo más comentado y claro el código; quizás en algunos casos utilicé muchos recursos técnicos, como en el caso del backend en donde utilicé TypeScript para darle más confiabilidad al código y para que fuera más claro el tipado de los datos. También quise agregar la seguridad generando un registro, login y el middleware para manejar el token, pero en honor al tiempo y en vista de que quizás hasta podía ser contraproducente al momento de evaluar, dejé desconectada la parte de autenticación, aunque lista para usar.
        </p>

        <LottieAnimation 
            :animation-data="Regards" 
            :autoplay="true" 
            :loop="true" 
            :speed="1" 
            ref="animacionLottie"
            style="width: 500px; height: 500px;"
        />
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { LottieAnimation } from "lottie-web-vue";
import Regards from "../assets/bye.json";

const animacionLottie = ref(null);

onMounted(() => {
    setTimeout(() => {
        if (animacionLottie.value) {
            animacionLottie.value.goToAndPlay(150, true);
        }
    }, 500);
});
</script>
