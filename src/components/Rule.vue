<template>
    <li>
        <input type="checkbox" :checked="enabled"/>
        123
    </li>
</template>

<script>
    export default {
        name: 'Rule',
        data () {
            return {
                enabled: true,
            };
        },
    };
</script>