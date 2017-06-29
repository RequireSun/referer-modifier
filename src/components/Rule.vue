<template>
    <el-row v-if="isEdit" ref="root" style="width: 420px;">
        <el-col :span="24">
            <el-input placeholder="rule" ref="regex" v-model="regex">
                <el-select placeholder="behavior" ref="behavior" v-model="behavior" slot="append">
                    <el-option v-for="(val, key) in CONFIG_BEHAVIOR" :key="key" :value="key" :label="val"></el-option>
                </el-select>
            </el-input>
            <el-input placeholder="content" ref="content" v-model="content">
                <el-button size="mini" slot="append" icon="check" @click="doneEdit"></el-button>
                <el-button size="mini" slot="append" icon="close" @click="isEdit = false"></el-button>
            </el-input>
        </el-col>
    </el-row>
    <div v-else ref="root" style="vertical-align: middle; width: 420px;">
        <el-checkbox :checked="rule.enabled" name="enabled" @change="doneEnabled"></el-checkbox>
        <label>
            <span v-text="rule.regex"></span>
        </label>
        <label>
            <span v-text="CONFIG_BEHAVIOR[rule.behavior]"></span>
            <span v-text="rule.content"></span>
        </label>
        <el-button-group>
            <el-button :plain="true" size="mini" type="warning" @click="isEdit = true" icon="edit"></el-button>
            <el-button type="danger" size="mini" @click="doneDelete" icon="delete"></el-button>
        </el-button-group>
    </div>
</template>

<script>
    import { mapMutations, } from 'vuex';

    export default {
        name: 'Rule',
        props: [ 'rule', 'CONFIG_BEHAVIOR' ],
        data () {
            return {
                isEdit: false,
                regex: this.rule.regex,
                behavior: this.rule.behavior,
                content: this.rule.content,
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
                        enabled: this.rule.enabled,
                        regex: this.regex,
                        behavior: this.behavior,
                        content: this.content,
                    },
                });
                this.isEdit = false;
            },
            doneEnabled (e) {
                if (this.isEdit) {
                    return;
                }
                this.edit({
                    id: this.rule.id,
                    value: {
                        id: this.rule.id,
                        enabled: e.target.checked,
                        regex: this.rule.regex,
                        behavior: this.rule.behavior,
                        content: this.rule.content,
                    },
                });
            },
            doneDelete () {
                this.delete({
                    id: this.rule.id,
                });
            },
        },
    };
</script>

<style>
    .el-select {
        width: 160px;
    }
    .el-input:first-of-type>input {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }
    .el-input-group--append:first-of-type>input {
        border-top-right-radius: 0;
    }
    .el-input:last-of-type>input {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
    }
    .el-input-group--append:last-of-type>input {
        border-bottom-right-radius: 0;
    }
    .el-input+.el-input {
        margin-top: -1px;
    }
    .el-input>input, .el-input>.el-input-group__append {
        border-radius: 0;
    }
    .el-input:first-of-type>.el-input-group__append {
        border-top-right-radius: 4px;
    }
    .el-input:last-of-type>.el-input-group__append {
        border-bottom-right-radius: 4px;
    }
</style>