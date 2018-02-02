<template>
    <div class="dashboard-container">
      <component v-bind:is="currentRole"></component>
    </div>
</template>

<script>

    export default {
        name: "index"
    }
</script>

<style scoped>

</style>
