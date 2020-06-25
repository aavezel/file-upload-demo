<template>
    <v-container grid-list-xl text-xs-center>
        <v-layout align-center justify-center fill-height>
            <v-flex xs12>
                <v-list two-line>
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
        ...mapGetters({
            files: 'filtred_files',
        }),
    },
    components: {
        'file-list-item': FileListItem,
    },
};
</script>
