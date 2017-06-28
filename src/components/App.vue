<template>
    <ul>
        <!--<li>123</li>-->
        <rule v-for="(item, index) in rules" :key="index"></rule>
    </ul>
</template>

<script>
    import Rule from './Rule.vue';

    export default {
        components: { Rule, },
        data () {
            return {
                rules: [{ id: 1, }, { id: 2, }, { id: 3, },],
            };
        },
    };
</script>