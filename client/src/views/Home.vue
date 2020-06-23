<template>
    <v-container grid-list-xl text-xs-center>
        <v-layout align-center justify-center fill-height>
            <v-flex xs12>
                <v-list two-line>
                    <template v-for="(file, index) in files">
                        <v-list-item :key="file.id">
                            <v-list-item-content>
                                <v-list-item-title v-html="file.title"></v-list-item-title>
                                <v-list-item-subtitle>
                                    {{ file.filename }}
                                    {{ file.date_add | date_str('added: ') }}
                                    {{ file.date_upload | date_str('upload: ') }}
                                </v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-action class="d-flex flex-row ">
                                <v-btn color="green darken-1" icon v-if="file.filename == null">
                                    <v-icon>cloud_upload</v-icon>
                                </v-btn>
                                <v-btn color="indigo darken-2" icon v-else><v-icon>cloud_download</v-icon></v-btn>
                                <v-btn color="red darken-2" icon><v-icon>delete_forever</v-icon></v-btn>
                            </v-list-item-action>
                        </v-list-item>
                        <v-divider v-if="index + 1 < files.length" :key="index"></v-divider>
                    </template>
                </v-list>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import {mapState} from 'vuex';

export default {
    name: 'Home',
    data() {
        return {};
    },
    computed: {
        ...mapState({
            files: (state) => state.files,
        }),
    },
    filters: {
        date_str(value, prefix = '') {
            if (value == null) return '';
            const date = new Date(value);
            return prefix + date.toLocaleString();
        },
    },
};
</script>
