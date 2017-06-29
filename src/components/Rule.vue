<template>
    <div v-if="isEdit" class="item">
        <el-input placeholder="rule" ref="regex" v-model="regex">
            <el-select placeholder="behavior" ref="behavior" v-model="behavior" slot="append">
                <el-option v-for="(val, key) in CONFIG_BEHAVIOR" :key="key" :value="key" :label="val"></el-option>
            </el-select>
        </el-input>
        <el-input placeholder="content" ref="content" v-model="content">
            <el-button size="mini" slot="append" icon="check" @click="doneEdit"></el-button>
            <el-button size="mini" slot="append" icon="close" @click="isEdit = false"></el-button>
        </el-input>
    </div>
    <el-row v-else class="item">
        <el-col :span="1">
            <el-checkbox :checked="rule.enabled" name="enabled" @change="doneEnabled"></el-checkbox>
        </el-col>
        <el-col :span="20" class="content">
            <span v-text="rule.regex"></span>
            <span v-text="CONFIG_BEHAVIOR[rule.behavior]"></span>
            <span v-text="rule.content"></span>
        </el-col>
        <el-col :span="3" class="container-button">
            <el-button type="warning" size="mini" :plain="true" @click="isEdit = true" icon="edit"></el-button>
            <el-button type="danger" size="mini" :plain="true" @click="doneDelete" icon="delete"></el-button>
        </el-col>
    </el-row>
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
                        regex: this.regex.trim(),
                        behavior: this.behavior.trim(),
                        content: this.content.trim(),
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
    .item+.item {
        margin-top: 6px;
    }
    .el-button:not(:active):not(:visited):not(:hover) {
        border: 1px solid transparent;
    }
    .el-button+.el-button {
        margin-left: 0;
    }
    .content {
        padding: 0 5px;
    }
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