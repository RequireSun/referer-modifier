<template>
    <div>
        <el-tree :data="testData" :render-content="renderContent"></el-tree>
        <ul>
            <rule v-for="(rule, index) in rules" :key="rule.id" :rule="rule" :CONFIG_METHOD="CONFIG_METHOD"></rule>
            <li v-if="isAdd" ref="addForm">
                <label>
                    <span>规则</span>
                    <input name="regex" type="text"/>
                </label>
                <label>
                    <select name="method">
                        <option v-for="(val, key) in CONFIG_METHOD" :value="key">{{val}}</option>
                        <!--<option value="change_referrer">修改 referrer</option>-->
                        <!--<option value="add_query_parameter">为 query 增加参数</option>-->
                    </select>
                    <input name="content" type="text"/>
                </label>
                <button @click="doneAdd">确定</button>
                <button @click="isAdd = false">取消</button>
            </li>
        </ul>
        <button @click="isAdd = true">Add</button>
    </div>
</template>

<script>
    import { mapMutations, } from 'vuex';
    import Rule from './Rule.vue';

    export default {
        components: { Rule, },
        data () {
            return {
                testData: [
                    { id: 123, regex: '456', content: '789', method: 'change_referrer', },
                    { id: 223, regex: '456', content: '789', method: 'change_referrer', },
                ],
                isAdd: false,
            };
        },
        computed: {
            rules () {
                return this.$store.state.rules;
            },
            CONFIG_METHOD () {
                return this.$store.state.CONFIG_METHOD;
            }
        },
        methods: {
            ...mapMutations([
                'add',
                'edit',
            ]),
            doneAdd () {
                if (this.$refs.addForm) {
                    const root = this.$refs.addForm;
                    this.add({
                        id: Date.now(),
                        regex: root.querySelector('[name=regex]').value.trim(),
                        method: root.querySelector('[name=method]').value.trim(),
                        content: root.querySelector('[name=content]').value.trim(),
                    });
//                    this.$store.commit('add', {
//                        id: Date.now(),
//                        regex: root.querySelector('[name=regex]').value.trim(),
//                        method: root.querySelector('[name=method]').value.trim(),
//                        content: root.querySelector('[name=content]').value.trim(),
//                    });
                    this.isAdd = false;
                }
            },
            renderContent (h, { node, data, store }) {
                return h(Rule, {
                    props: {
                        key: node.id,
                        rule: node,
                        CONFIG_METHOD: data.CONFIG_METHOD,
                    },
                });
//                return (
//                    <rule :key="node.id" :rule="node" :CONFIG_METHOD="CONFIG_METHOD"></rule>
//                );
            },
        },
//        data () {
//            return {
//                rules: [
//                    { id: 1, enabled: false, regex: 'abc', content: '456', },
//                    { id: 2, enabled: true, regex: 'abc', content: '456', },
//                    { id: 3, enabled: false, regex: 'abc', content: '456', },
//                ],
//            };
//        },
    };
</script>