<template>
    <ul>
        <li>123</li>
        <!--<rule v-for="item in rules"></rule>-->
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