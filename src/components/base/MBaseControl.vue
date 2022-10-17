
<script>
export default {
    name: "MInput",
    props: {
        rules: {
            Type: String,
            default: null
        }
    },
    data() {
        return {
            isValidate: true
        }
    },
    methods: {
    }
}
</script>
<style>
@import url(@/css/base/input.css);
</style>