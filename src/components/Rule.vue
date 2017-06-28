<template>
    <li ref="root">
        <input type="checkbox" name="enabled" :disabled="isEdit" v-model="rule.enabled"/>
        <label>
            <span>规则</span>
            <input v-if="isEdit" name="regex" type="text" :value="rule.regex"/>
            <span v-else v-text="rule.regex"></span>
        </label>
        <label>
            <select v-if="isEdit" name="method">
                <option v-for="(val, key) in CONFIG_METHOD" :value="key" :selected="key === rule.method">{{val}}</option>
                <!--<option value="change_referrer" :selected="'change_referrer' === rule.method">修改 referrer</option>-->
                <!--<option value="add_query_parameter" :selected="'add_query_parameter' === rule.method">为 query 增加参数</option>-->
            </select>
            <span v-else v-text="rule.method"></span>
            <input v-if="isEdit" name="content" type="text" :value="rule.content"/>
            <span v-else v-text="rule.content"></span>
        </label>
        <div v-if="isEdit">
            <button @click="doneEdit">确认</button>
            <button @click="isEdit = false">取消</button>
        </div>
        <div v-else>
            <button @click="isEdit = true">编辑</button>
            <button @click="doneDelete">删除</button>
        </div>
    </li>
</template>

<script>
    import { mapMutations, } from 'vuex';

    export default {
        name: 'Rule',
        props: [ 'rule', 'CONFIG_METHOD' ],
        data () {
            return {
                isEdit: false,
            };
        },
        methods: {
            ...mapMutations([
                'edit',
                'delete',
            ]),
            doneEdit () {
                this.edit({
                    id: this.rule.id,
                    value: {
                        id: this.rule.id,
                        enabled: this.$refs.root.querySelector('[name=enabled]').checked,
                        regex: this.$refs.root.querySelector('[name=regex]').value.trim(),
                        method: this.$refs.root.querySelector('[name=method]').value.trim(),
                        content: this.$refs.root.querySelector('[name=content]').value.trim(),
                    },
                });
                this.isEdit = false;
            },
            doneDelete () {
                this.delete({
                    id: this.rule.id,
                });
            }
        },
    };
</script>