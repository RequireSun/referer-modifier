<template>
    <div v-if="isEdit" class="list-item list-item-edit">
        <el-input placeholder="rule" ref="regex" v-model="editInput.regex" :class="stateValidate.regex ? '' : 'border-danger'">
            <el-select placeholder="behavior" ref="behavior" v-model="editInput.behavior" slot="append"
                       :class="stateValidate.behavior ? '' : 'border-danger'">
                <el-option v-for="(val, key) in CONFIG_BEHAVIOR" :key="key" :value="key" :label="val.label"></el-option>
            </el-select>
        </el-input>
        <el-input placeholder="content" v-model="editInput.content" :class="'mul-append' + (stateValidate.content ? '' : ' border-danger')">
            <el-button size="mini" slot="append" icon="check" @click="doneEdit"></el-button>
            <el-button size="mini" slot="append" icon="close" @click="cancelEdit"></el-button>
        </el-input>
    </div>
    <el-row v-else class="list-item">
        <el-col :span="1" style="padding-top: 3px;">
            <el-checkbox :checked="rule.enabled" name="enabled" @change="doneEnabled"></el-checkbox>
        </el-col>
        <el-col :span="20" class="list-content">
            <el-row>
                <el-col :span="9" class="list-content-text" v-text="rule.regex" :title="rule.regex"></el-col>
                <el-col :span="6">
                    <el-tag v-if="CONFIG_BEHAVIOR && CONFIG_BEHAVIOR[rule.behavior]"
                            :type="CONFIG_BEHAVIOR[rule.behavior]['style']"
                            :title="CONFIG_BEHAVIOR[rule.behavior]['label']">
                        {{CONFIG_BEHAVIOR[rule.behavior]['abbreviate']}}
                    </el-tag>
                </el-col>
                <el-col :span="9" class="list-content-text" v-text="rule.content" :title="rule.content"></el-col>
            </el-row>
        </el-col>
        <el-col :span="3" class="container-button" style="padding-top: 2px;">
            <el-popover ref="popover-delete" placement="left" v-model="visibleDelete"
                        trigger="click">
                <p>你确定要删除这条规则么？</p>
                <div style="text-align: right; margin: 0;">
                    <el-button size="mini" type="text" @click="visibleDelete = false">取消</el-button>
                    <el-button size="mini" type="danger" @click="doneDelete">确定</el-button>
                </div>
            </el-popover>
            <el-button type="warning" size="mini" :plain="true" @click="isEdit = true" icon="edit"></el-button>
            <el-button type="danger" size="mini" :plain="true" v-popover:popover-delete icon="delete"></el-button>
        </el-col>
    </el-row>
</template>

<script>
    import { mapMutations, } from 'vuex';
    import * as CONFIG from '../CONFIG.json';
    import validate from '../common/util.js';

    export default {
        name: 'Rule',
        props: [ 'rule', 'CONFIG_BEHAVIOR' ],
        data () {
            return this.getInitialState();
        },
        methods: {
            ...mapMutations([
                'edit',
                'delete',
            ]),
            getInitialState () {
                return {
                    isEdit: false,
                    visibleDelete: false,
                    stateValidate: {
                        regex: true,
                        behavior: true,
                        content: true,
                    },
                    editInput: {
                        regex: this.rule.regex,
                        behavior: this.rule.behavior,
                        content: this.rule.content,
                    },
                };
            },
            doneEdit () {
                if (!this.doneValidate({
                        regex: this.editInput.regex.trim(),
                        behavior: this.editInput.behavior.trim(),
                        content: this.editInput.content.trim(),
                    })) {
                    return;
                }
                this.edit({
                    id: this.rule.id,
                    value: {
                        id: this.rule.id,
                        enabled: this.rule.enabled,
                        regex: this.editInput.regex.trim(),
                        behavior: this.editInput.behavior.trim(),
                        content: this.editInput.content.trim(),
                    },
                });
                this.isEdit = false;
            },
            cancelEdit () {
                Object.assign(this, this.getInitialState());
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
            doneValidate ({ regex, behavior, content, }) {
                let validRes = validate([{
                    name: 'regex',
                    type: 'regex',
                    value: regex,
                }, {
                    name: 'behavior',
                    type: 'text',
                    value: behavior,
                }, {
                    name: 'content',
                    type: 'url',
                    value: content,
                }]);

                for (let i in this.stateValidate) {
                    if (this.stateValidate.hasOwnProperty(i)) {
                        this.stateValidate[i] = true;
                    }
                }

                if (!validRes['result']) {
                    let isIncorrect;

                    validRes['properties'].forEach(item => {
                        this.stateValidate[item['name']] = false;
                        'format' === item['type'] && (isIncorrect = false);
                    });

                    this.$message({
                        showClose: true,
                        message: CONFIG['notice_texts'][isIncorrect ? 'field_incorrect' : 'field_empty'],
                        type: 'warning',
                    });
                }
                return validRes['result'];
            }
        },
    };
</script>