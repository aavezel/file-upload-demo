<template>
    <v-container grid-list-xl text-xs-center>
        <v-layout align-center justify-center fill-height>
            <v-flex xs12>
                <template v-if="is_empty">
                    <h2>The files haven't been uploaded yet. Click the red plus sign at right bottom .</h2>
                </template>
                <v-list two-line v-else>
                    <template v-for="(file, index) in files">
                        <file-list-item :key="file.id" :file="file" />
                        <v-divider v-if="index + 1 < files.length" :key="index"></v-divider>
                    </template>
                </v-list>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import {mapGetters} from 'vuex';
import FileListItem from './FileListItem';

export default {
    name: 'Home',
    data() {
        return {};
    },
    computed: {
        is_empty() {
            return this.files.length == 0;
        },
        ...mapGetters({
            files: 'filtred_files',
        }),
    },
    components: {
        'file-list-item': FileListItem,
    },
};
</script>
