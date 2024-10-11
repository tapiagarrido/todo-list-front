<template>
    <div class="bg-white shadow-lg rounded-lg p-6 h-full">
        <div class="flex gap-2">
            <div class="w-11/12">
                <h2 :class="{'finish-task': tarea.completada}" class="text-lg font-semibold mb-2">{{ tarea.titulo }}</h2>
                <p :hidden="!tarea.completada" class="text-sm text-green-800">Finalizada: {{formatearFechaNacional(tarea.updatedAt)}}</p>
            </div>
            <div class="xl:mt-4 flex items-center w-1/12">
                <button @click="mostrarModalDetalle = !mostrarModalDetalle">
                    <span class="pi pi-ellipsis-v"></span>
                </button>
            </div>
        </div>
    </div>

    <ModalDetalle v-if="mostrarModalDetalle" :tareaId="tarea.id" @refrescarModal="refrescarLista" @cerrarModal="mostrarModalDetalle=false"/>
    
</template>

<script setup>
import { defineProps,ref, defineEmits } from 'vue';
import { formatearFechaNacional } from '@/utils/formatDate';

import ModalDetalle from "@/components/todolist/ModalTaskDetail.vue";

const emit = defineEmits(['refrescarLista']);

// definimos un ref para manejar apertura del modal
const mostrarModalDetalle = ref(false);

// Definimos el props para recibir las tareas desde el padre
const props = defineProps({
    tarea: {
        type: Object,
        required: true,
        default: () => ({
            titulo: 'Tarea de ejemplo',
            descripcion: 'Aqui se agrega una descripción de la tarea',
            completada: false
        })
    }
});


const refrescarLista = ()=>{
    emit('refrescarLista')
}
</script>

<style>
.finish-task {
    text-decoration: line-through;
}
</style>