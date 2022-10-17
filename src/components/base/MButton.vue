<template>
    <button class="btn btn-test">{{text}}</button>
</template>
<script>
export default {
    name: "MButton",
    props: ["text"]
}
</script>
<style scoped>
.btn {
    border-radius: 4px;
    color: #fff;
    background-color: #2ca01c;
}

.btn-test {
    border: none;
}
</style>
