<template>
    <div v-if="isEdit" class="list-item list-item-edit">
        <el-input placeholder="rule" ref="regex" v-model="regex">
            <el-select placeholder="behavior" ref="behavior" v-model="behavior" slot="append">
                <el-option v-for="(val, key) in CONFIG_BEHAVIOR" :key="key" :value="key" :label="val.label"></el-option>
            </el-select>
        </el-input>
        <el-input placeholder="content" v-model="content" class="mul-append">
            <el-button size="mini" slot="append" icon="check" @click="doneEdit"></el-button>
            <el-button size="mini" slot="append" icon="close" @click="isEdit = false"></el-button>
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
                    <el-tag :type="CONFIG_BEHAVIOR[rule.behavior]['style']"
                            :title="CONFIG_BEHAVIOR[rule.behavior]['label']">
                        {{CONFIG_BEHAVIOR[rule.behavior]['abbreviate']}}
                    </el-tag>
                </el-col>
                <el-col :span="9" class="list-content-text" v-text="rule.content" :title="rule.content"></el-col>
            </el-row>
        </el-col>
        <el-col :span="3" class="container-button" style="padding-top: 2px;">
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