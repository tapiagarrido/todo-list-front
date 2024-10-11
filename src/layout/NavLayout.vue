<template>
    <nav class="bg-gray-800 text-white p-1">
        <div class="container mx-auto flex justify-between items-center">
            <div class="text-lg font-semibold">
                <img src="../assets/logo.svg" alt="logo de la aplicacion" width="50">
            </div>
            <div class="space-x-4 px-4">
                <router-link to="/todo-list" class="hover:underline">Lista de Tareas</router-link>
                <router-link to="/information" class="hover:underline">Información</router-link>
            </div>
        </div>
    </nav>
</template>