<template>
    <div class="min-h-screen flex flex-col">
        <!-- Barra de navegación -->
        <NavLayout />

        <!-- Main -->
        <main class="flex-1 container mx-auto py-6">
            <router-view />
        </main>

        <!-- Pie de página -->
        <FooterLayout />

    </div>
</template>

<script setup>
import NavLayout from "./NavLayout.vue";
import FooterLayout from "./FooterLayout.vue";
</script>
