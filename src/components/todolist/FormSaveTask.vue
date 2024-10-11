<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full mx-4 lg:mx-0 lg:w-3/4 xl:w-2/3">
            <h3 class="text-xl font-semibold text-center">Crear Nueva Tarea</h3>

            <div class="border-t border-gray-200 pt-4">
                <label for="titulo" class="block text-gray-700 font-semibold mb-2">Título:</label>
                <input type="text" id="titulo" v-model="titulo" class="border border-gray-300 rounded p-2 w-full mb-4"
                    placeholder="Ingrese el título de la tarea" />
                <label for="descripcion" class="block text-gray-700 font-semibold mb-2">Descripción:</label>
                <textarea id="descripcion" v-model="descripcion" class="border border-gray-300 rounded p-2 w-full mb-4"
                    rows="4" placeholder="Ingrese la descripción de la tarea"></textarea>
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
import { guardarTarea } from '@/api/todoListService';
import { ref, defineEmits } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();
const titulo = ref('');
const descripcion = ref('');
const errors = ref({});


// definimos el emit para cerrar modal
const emit = defineEmits(['cerrarModal','refrescarModal']);

// Función para validar los campos
const validarFormulario = () => {
    errors.value = {};

    if (!titulo.value) {
        errors.value.titulo = 'El título es obligatorio.';
    }

    if (!descripcion.value) {
        errors.value.descripcion = 'La descripción es obligatoria.';
    }

    if (errors.value.titulo) toast.error(errors.value.titulo);
    if (errors.value.descripcion) toast.error(errors.value.descripcion);

    return Object.keys(errors.value).length === 0;
};

// Función para almacenar cambios
const almacenarCambios = async () => {

    // si hay errores no se podra continuar a la api
    if (!validarFormulario()) return; 

    try {
        const response = await guardarTarea({titulo: titulo.value, descripcion: descripcion.value, completada:false});
        if(response.msg){
            toast.success(response.msg);
            emit('refrescarModal');
            cerrarModal();
        }
    } catch (error) {
        console.log(error)
    }

};

// cuando cerremos el modal reiniciamos los campos almacenados en las variables
const cerrarModal = () => {
    titulo.value = ''; 
    descripcion.value = ''; 
    errors.value = {}; 
    emit('cerrarModal');
};
</script>
