<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full mx-4 lg:mx-0 lg:w-3/4 xl:w-2/3">
            <h3 class="text-xl font-semibold text-center">Modificar la tarea ID {{ tarea.id }}</h3>

            <div class="border-t border-gray-200 pt-4">
                <label for="titulo" class="block text-gray-700 font-semibold mb-2">Título:</label>
                <input type="text" id="titulo" v-model="tarea.titulo"
                    class="border border-gray-300 rounded p-2 w-full mb-4"
                    placeholder="Ingrese el título de la tarea" />

                <label for="descripcion" class="block text-gray-700 font-semibold mb-2">Descripción:</label>
                <textarea id="descripcion" v-model="tarea.descripcion"
                    class="border border-gray-300 rounded p-2 w-full mb-4" rows="4"
                    placeholder="Ingrese la descripción de la tarea"></textarea>

                <div class="flex gap-6 justify-end mt-6">
                    <div class="flex gap-4">
                        <button class="flex items-center text-gray-600 hover:text-gray-800" @click="cerrarModal">
                            <span class="pi pi-times text-2xl"></span>
                            <span class="ml-2">Cancelar</span>
                        </button>
                        <button class="flex items-center text-green-600 hover:text-green-800" @click="almacenarCambios">
                            <span class="pi pi-save text-2xl"></span>
                            <span class="ml-2">Guardar</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { modificarTarea } from '@/api/todoListService';
import { defineProps, defineEmits } from 'vue';
import { useToast } from 'vue-toastification';

// definimos variables para emitir y utilizar la data recibida desde el componente padre
const toast = useToast();
const emit = defineEmits(['cerrarModal'], ['actualizarTarea']);
const props = defineProps({
    tarea: {
        type: Object,
        required: true
    }
});

// funcion para almacenar cambios que no tienen que ver con completar tarea
const almacenarCambios = async () => {
    try {
        const response = await modificarTarea(props.tarea);
        if (response.msg) {
            toast.success(response.msg);
            emit('actualizarTarea');
            emit('cerrarModal');
        }

    } catch (error) {
        console.log(error);
        toast.error("Algo ha salido mal");

    }
}

const cerrarModal = () => {
    emit('cerrarModal');
}
</script>
