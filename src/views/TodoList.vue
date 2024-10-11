<template>
    <div class="md:w-full xl:w-3/6 mx-auto h-[660px] p-2 rounded-3xl shadow-xl bg-slate-100">
        <h1 class="text-2xl text-center font-bold uppercase py-4">Gestor de Tareas</h1>
        <div class="flex flex-col gap-2 w-full my-6 px-4 scrollTarea" @scroll="llamadaScroll">
            <!--
                <h3 class="text-center text-amber-700 font-bold">Tareas Pendientes</h3>
            -->
            <CardListTask v-for="tarea in tareas" :key="tarea.id" :tarea="tarea" @refrescarLista="reiniciarLista" />
        </div>
        <div class="px-4 text-white text-end">
            <button class="px-4 bg-slate-600 hover:bg-slate-900 py-2 rounded-lg uppercase text-sm" @click="modalGuardar=!modalGuardar">nueva Tarea 
                <span class="pi pi-plus"></span>
            </button>
        </div>
    </div>

    <ModalGuardar v-if="modalGuardar" @cerrarModal="modalGuardar=false" @refrescarModal="reiniciarLista"/>
</template>

<script setup>
import ModalGuardar from "@/components/todolist/FormSaveTask.vue";
import { ref, onMounted } from "vue";
import CardListTask from "@/components/todolist/CardListTask.vue";
import { getTareas } from "@/api/todoListService";

// declaramos variables que almacenaran lista de tareas y los query params para peticion de datos
const tareas = ref([]);
const page = ref(1);
const cargarNuevo = ref(false);
const modalGuardar = ref(false);

const obtenerTareas = async () => {
    if(cargarNuevo.value) return;
    cargarNuevo.value = true;

    try {
        const response = await getTareas(page.value);
        // realizamos esta accion propagacion para concatenar los elementos previos con los nuevos
        tareas.value = [ ...tareas.value, ...response.tareas ];

    } catch (error) {
        console.log('Error al obtener tareas:', error)
    } finally {
        cargarNuevo.value = false;
    }
}

const llamadaScroll = (ev) => {
    const limiteScroll = ev.target.scrollHeight === ev.target.scrollTop + ev.target.clientHeight;
    if (limiteScroll && !cargarNuevo.value) {
        page.value += 1;
        obtenerTareas();
    }
}

// funcion para actualizar en base a eventos propagados por hijos
const reiniciarLista = () => {
    tareas.value=[];
    page.value=1;
    obtenerTareas();
}

onMounted(obtenerTareas);

</script>

<style scoped>
.scrollTarea {
    max-height: 480px;
    overflow-y: auto;
}
</style>