<template>
    <codemirror @input="$emit('input',$event)" :value="value" :options="options">
    </codemirror>
</template>
<script>
import { codemirror } from 'vue-codemirror-lite'
require('codemirror/addon/fold/foldgutter.css')
require('codemirror/theme/night.css')
require('codemirror/addon/fold/foldcode')
require('codemirror/addon/fold/foldgutter')
require('codemirror/addon/fold/brace-fold')
require('codemirror/mode/javascript/javascript')
require('codemirror/mode/sql/sql')

const langOption = {
    json: 'application/json',
    sql: 'text/x-mysql'
}
export default {
    props: {
        lang: {},
        value: {}
    },
    data() {
        return {
            options: {
                tabSize: 4,
                styleActiveLine: true,
                lineNumbers: true,
                line: true,
                mode: langOption[this.lang],
                //theme: 'night',
                lineWrapping: true,
                foldGutter: true,
                gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
            }
        }
    },
    components: {
        codemirror
    }
}
</script>
<style lang="less">

</style>
