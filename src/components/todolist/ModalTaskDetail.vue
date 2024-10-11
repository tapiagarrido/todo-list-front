<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full mx-4 lg:mx-0 lg:w-3/4 xl:w-2/3">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg text-gray-500 font-semibold">Detalle de la tarea ID {{ tarea.id }}</h3>
                <button class="rounded text-gray-500 hover:text-gray-800" @click="cerrarModal">
                    <span class="pi pi-times text-xl"></span>
                </button>
            </div>

            <div class="border-t border-gray-200 pt-4">
                <h4 class="text-xl font-bold text-gray-800 mb-4 text-center uppercase">{{ tarea.titulo }}</h4>
                <p class="text-gray-600 mb-4"><span class="text-black font-semibold">Descripción:</span> {{
                    tarea.descripcion }}</p>
                <p class="text-slate-700" v-if="tarea.createdAt">Creada: {{ formatearFechaNacional(tarea.createdAt) }}
                </p>
                <p :hidden="!tarea.completada" class="text-green-700" v-if="tarea.updatedAt">Completada: {{
                    formatearFechaNacional(tarea.createdAt) }}
                </p>
            </div>
            <div class="flex gap-6 justify-between mt-6 border-t-2 pt-4" v-if="!tarea.completada">
                <div class="flex gap-4">
                    <button @click="modalEditar = !modalEditar"
                        class="flex items-center text-blue-600 hover:text-blue-800">
                        <span class="pi pi-pencil text-2xl"></span>
                        <span class="ml-2">Editar</span>
                    </button>
                    <button @click="modalBorrar = !modalBorrar"
                        class="flex items-center text-red-600 hover:text-red-800">
                        <span class="pi pi-trash text-2xl"></span>
                        <span class="ml-2">Eliminar</span>
                    </button>
                </div>
                <button @click="finalizarTarea()" class="flex items-center text-green-600 hover:text-green-800">
                    <span class="pi pi-check text-2xl"></span>
                    <span class="ml-2">Completar</span>
                </button>
            </div>
        </div>
    </div>

    <ModalEditar v-if="modalEditar" @cerrarModal="modalEditar = false" :tarea="tarea" @actualizarTarea="()=>emit('refrescarModal')"/>
    <ModalEliminar v-if="modalBorrar" @cerrarModal="modalBorrar = false" @tareaEliminada="()=>{emit('cerrarModal'), emit('refrescarModal')}"
        :tarea="tarea" />
</template>


<script setup>
import ModalEditar from "@/components/todolist/FormEditTask.vue";
import ModalEliminar from "@/components/todolist/DeleteDialogTask.vue";
import { getTarea, modificarTarea } from '@/api/todoListService';
import { defineProps, defineEmits, ref, watch } from 'vue';
import { formatearFechaNacional } from '@/utils/formatDate';
import { useToast } from 'vue-toastification';

// props para recibir el id que sera utilizado en la funcion de peticion de tarea por id
const props = defineProps({
    tareaId: {
        type: Number,
        Required: true
    }
})

// instanciamos el toast
const toast = useToast();

// Definimos un emit para poder cerrar el modal cambiando el estado en el padre
const emit = defineEmits(['cerrarModal', 'refrescarModal']);

// definimos variables para manejar data y modales
const tarea = ref({});
const modalEditar = ref(false);
const modalBorrar = ref(false);


// llamamos la funcion para traer una tarea
const obtenerTarea = async (id) => {
    try {
        const response = await getTarea(id);
        tarea.value = response.tarea;
        toast.success(response.msg);
    } catch (error) {
        console.log("Error al obtener la tarea:", error);
        toast.error('Hubo un problema con la tarea');
    }
}

// Funcion para completar la tarea utilizando el put
const finalizarTarea = async () => {
    try {
        const response = await modificarTarea({ ...tarea.value, completada: true });
        if (response.tarea) {
            toast.success('Tarea completa con exito');
            emit('refrescarModal');
            cerrarModal();
        }
    } catch (error) {
        console.log(error)
    }
}

// usaremos watch para esperar a que tareaId este disponible
watch(
    () => props.tareaId,
    (id) => {
        if (id) {
            obtenerTarea(id);
        }
    },
    { immediate: true }
);


// funcion disparada desde el boton cerrar
const cerrarModal = () => {
    emit('cerrarModal');
}
</script>