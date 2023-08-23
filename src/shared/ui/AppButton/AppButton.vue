<template>
    <button class="button"><slot /></button>
</template>

<style scoped>
.button {
    padding: 4px 8px;
    text-transform: uppercase;
    border: 1px solid rgb(59, 58, 58);
    border-radius: 5px;
    font-size: 12px;
}
</style>