<template>
    <div>
        <!--<el-tree :data="rules" :render-content="renderContent" node-key="id"></el-tree>-->
        <rule v-for="(rule, index) in rules" :key="rule.id" :rule="rule" :CONFIG_BEHAVIOR="CONFIG_BEHAVIOR"></rule>
        <div v-if="isAdd" ref="addForm">
            <label>
                <span>规则</span>
                <input name="regex" type="text"/>
            </label>
            <label>
                <select name="behavior">
                    <option v-for="(val, key) in CONFIG_BEHAVIOR" :value="key">{{val}}</option>
                    <!--<option value="change_referrer">修改 referrer</option>-->
                    <!--<option value="add_query_parameter">为 query 增加参数</option>-->
                </select>
                <input name="content" type="text"/>
            </label>
            <el-button-group>
                <el-button type="success" size="mini" icon="check" @click="doneAdd"></el-button>
                <el-button type="danger" size="mini" icon="close" @click="isAdd = false"></el-button>
            </el-button-group>
        </div>
        <el-button type="primary" icon="plus" @click="isAdd = true"></el-button>
        <ul style="display: none;">
            <rule v-for="(rule, index) in rules" :key="rule.id" :rule="rule" :CONFIG_BEHAVIOR="CONFIG_BEHAVIOR"></rule>
            <li v-if="isAdd" ref="addForm">
                <label>
                    <span>规则</span>
                    <input name="regex" type="text"/>
                </label>
                <label>
                    <select name="behavior">
                        <option v-for="(val, key) in CONFIG_BEHAVIOR" :value="key">{{val}}</option>
                        <!--<option value="change_referrer">修改 referrer</option>-->
                        <!--<option value="add_query_parameter">为 query 增加参数</option>-->
                    </select>
                    <input name="content" type="text"/>
                </label>
                <el-button-group>
                    <el-button type="success" size="mini" @click="doneAdd" icon="check">确定</el-button>
                    <el-button type="danger" size="mini" @click="isAdd = false" icon="close">取消</el-button>
                </el-button-group>
            </li>
        </ul>
    </div>
</template>

<script>
    import { mapMutations, } from 'vuex';
    import Rule from './Rule.vue';

//    const pipe = {
//        enabled: rules => rules.filter(item => item.enabled).map(item => item['id']),
//    };

    export default {
        components: { Rule, },
        data () {
            return {
                isAdd: false,
            };
        },
        computed: {
            rules () {
                return this.$store.state.rules;
            },
            CONFIG_BEHAVIOR () {
                return this.$store.state.CONFIG_BEHAVIOR;
            },
//            enabledId () {
//                return pipe['enabled'](this.rules);
//            },
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
                        behavior: root.querySelector('[name=behavior]').value.trim(),
                        content: root.querySelector('[name=content]').value.trim(),
                    });
                    this.isAdd = false;
                }
            },
//            handleCheckChange (data, checked, indeterminate) {
//                this.edit(data['id'], { ...data, enabled: checked, });
//            },
//            renderContent (h, { node, data, store }) {
//                return h(Rule, {
//                    props: {
//                        key: data.id,
//                        rule: data,
//                        CONFIG_BEHAVIOR: this.CONFIG_BEHAVIOR,
//                    },
//                });
////                return (
////                    <rule :key="node.id" :rule="node" :CONFIG_METHOD="CONFIG_METHOD"></rule>
////                );
//            },
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