<template>
    <div class="container" v-loading.body="isLoading">
        <el-row class="list-item" style="margin-bottom: 6px; border-radius: 4px; background-color: #f2f6f8;">
            <el-col :span="6">
                <el-switch v-model="enabled" on-color="#13ce66" off-color="#ff4949" @change="doneEnabled"></el-switch>
            </el-col>
            <el-col :span="6" :offset="12" class="container-button">
                <el-button type="success" size="mini" class="fa fa-refresh" style="width: 22px;" @click="doneRefresh"></el-button>
                <el-button type="primary" size="mini" icon="plus" @click="isAdd = true"></el-button>
            </el-col>
        </el-row>
        <div v-if="isAdd" class="list-item list-item-edit">
            <el-input placeholder="rule" ref="regex" v-model="addInput.regex" :class="stateValidate.regex ? '' : 'border-danger'">
                <el-select placeholder="behavior" ref="behavior" v-model="addInput.behavior" slot="append"
                           :class="stateValidate.behavior ? '' : 'border-danger'">
                    <el-option v-for="(val, key) in CONFIG_BEHAVIOR" :key="key" :value="key" :label="val.label"></el-option>
                </el-select>
            </el-input>
            <el-input placeholder="content" v-model="addInput.content"
                      :class="'mul-append' + (stateValidate.content ? '' : ' border-danger')">
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
                isLoading: false,
                addInput: {
                    regex: '',
                    behavior: '',
                    content: '',
                },
                stateValidate: {
                    regex: true,
                    behavior: true,
                    content: true,
                },
            };
        },
        computed: {
            enabled () {
                return this.$store.state.enabled;
            },
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
                    if (!this.doneValidate({
                            regex: this.addInput.regex.trim(),
                            behavior: this.addInput.behavior.trim(),
                            content: this.addInput.content.trim(),
                        })) {
                        this.$message({
                            showClose: true,
                            message: 'Please fill out the form completely',
                            type: 'warning',
                        });
                        return;
                    }

                    this.add({
                        id: Date.now(),
                        enabled: true,
                        regex: this.addInput.regex.trim(),
                        behavior: this.addInput.behavior.trim(),
                        content: this.addInput.content.trim(),
                    });

                    this.addInput = {
                        regex: '',
                        behavior: '',
                        content: '',
                    };
                    this.isAdd = false;
                }
            },
            doneRefresh () {
                let _t = Date.now();
                this.isLoading = true;
                this.refresh();
                let _diff = 500 - (Date.now() - _t);
                if (0 < _diff) {
                    setTimeout(() => this.isLoading = false, _diff)
                } else {
                    this.isLoading = false;
                }
            },
            doneEnabled (tarStatus) {
                chrome.browserAction.setIcon({
                    path: tarStatus ? 'image/logo-run.png' : 'image/logo.png',
                });
                this.$store.commit('enabled', tarStatus);
            },
            doneValidate ({ regex, behavior, content, }) {
                let res = true;
                if (!regex) {
                    this.stateValidate.regex = false;
                    res = false;
                } else {
                    this.stateValidate.regex = true;
                }
                if (!behavior) {
                    this.stateValidate.behavior = false;
                    res = false;
                } else {
                    this.stateValidate.behavior = true;
                }
                if (!content) {
                    this.stateValidate.content = false;
                    res = false;
                } else {
                    this.stateValidate.content = true;
                }
                return res;
            }
        },
    };
</script>