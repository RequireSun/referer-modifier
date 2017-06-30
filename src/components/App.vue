<template>
    <div class="container">
        <el-row class="list-item" style="margin-bottom: 6px; border-radius: 4px; background-color: #f2f6f8;">
            <el-col :span="6" :offset="18" class="container-button">
                <el-button type="success" size="mini" class="fa fa-refresh" style="width: 22px;" @click="refresh"></el-button>
                <el-button type="primary" size="mini" icon="plus" @click="isAdd = true"></el-button>
            </el-col>
        </el-row>
        <div v-if="isAdd" class="list-item list-item-edit">
            <el-input placeholder="rule" ref="regex" v-model="regex">
                <el-select placeholder="behavior" ref="behavior" v-model="behavior" slot="append">
                    <el-option v-for="(val, key) in CONFIG_BEHAVIOR" :key="key" :value="key" :label="val.label"></el-option>
                </el-select>
            </el-input>
            <el-input placeholder="content" v-model="content" class="mul-append">
                <el-button size="mini" slot="append" icon="check" @click="doneAdd"></el-button>
                <el-button size="mini" slot="append" icon="close" @click="isAdd = false"></el-button>
            </el-input>
        </div>
        <rule v-for="(rule, index) in rules" :key="rule.id" :rule="rule" :CONFIG_BEHAVIOR="CONFIG_BEHAVIOR"></rule>
    </div>
</template>

<script>
    import { mapMutations, } from 'vuex';
    import Rule from './Rule.vue';

    export default {
        components: { Rule, },
        data () {
            return {
                isAdd: false,
                regex: '',
                behavior: '',
                content: '',
            };
        },
        computed: {
            rules () {
                return this.$store.state.rules;
            },
            CONFIG_BEHAVIOR () {
                return this.$store.state.CONFIG_BEHAVIOR;
            },
        },
        methods: {
            ...mapMutations([
                'add',
                'edit',
                'refresh',
            ]),
            doneAdd () {
                if (this.isAdd) {
                    this.add({
                        id: Date.now(),
                        regex: this.regex.trim(),
                        behavior: this.behavior.trim(),
                        content: this.content.trim(),
                    });

                    this.regex= '';
                    this.behavior= '';
                    this.content= '';
                    this.isAdd = false;
                }
            },
        },
    };
</script>