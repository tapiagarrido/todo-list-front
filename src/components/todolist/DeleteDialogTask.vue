<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
            <h3 class="text-xl font-semibold text-center">Confirmar eliminación</h3>
            <p class="text-gray-600 mt-4">¿Estás seguro de que deseas eliminar la tarea: <strong>{{ tarea.titulo
                    }}</strong>?</p>

            <div class="flex gap-4 justify-end mt-6">
                <button class="flex items-center text-gray-600 hover:text-gray-800" @click="cerrarModal">
                    <span class="pi pi-times text-2xl"></span>
                    <span class="ml-2">Cancelar</span>
                </button>
                <button class="flex items-center text-red-600 hover:text-red-800" @click="eliminarTarea">
                    <span class="pi pi-trash text-2xl"></span>
                    <span class="ml-2">Eliminar</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { deleteTarea } from '@/api/todoListService';
import { defineProps, defineEmits } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

// Declaramos el prop que en realidad solo requerira el nombre y el id para la funcion delete
const props = defineProps({
    tarea: {
        type: Object,
        required: true
    }
});

// emit para cerrar modal
const emit = defineEmits(['cerrarModal'], ['tareaEliminada']);

// funcion para eliminar la tarea de manera definitiva
const eliminarTarea = async () => {
    try {
        const response = await deleteTarea(props.tarea.id);
        if (response.msg) {
            toast.info(response.msg);
            emit('cerrarModal');
            emit('tareaEliminada');
        }
    } catch (error) {
        console.log(error);

    }
    emit('cerrarModal');
};

const cerrarModal = () => {
    emit('cerrarModal');
};
</script>
