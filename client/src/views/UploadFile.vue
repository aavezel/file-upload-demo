<template>
    <v-container grid-list-xl text-xs-center>
        <v-layout align-center justify-center fill-height>
            <v-flex xs12>
                <template v-if="not_found">
                    <h2>File not found</h2>
                </template>
                <template v-else>
                    <h3>Upload file:</h3>
                    <v-form ref="form">
                        <v-text-field v-model="title" label="File title" disabled></v-text-field>
                        <v-file-input show-size label="File input" @change="change_files"></v-file-input>
                        <v-btn :disabled="!valid" color="success" class="mr-4" @click="submit">
                            Upload
                        </v-btn>
                    </v-form>
                </template>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import {mapState, mapActions} from 'vuex';

export default {
    name: 'UploadFile',
    data() {
        return {
            valid: false,
            file: null,
        };
    },
    computed: {
        ...mapState({
            files: (state) => state.files,
        }),
        file_id() {
            return this.$route.params.file_id;
        },
        current_file() {
            const index = this.files.findIndex((f) => f.id == this.file_id);
            if (index == -1) return null;
            return this.files[index];
        },
        not_found() {
            return this.current_file == null;
        },
        title() {
            if (this.not_found) return 'file not found';
            return this.current_file.title;
        },
    },
    methods: {
        submit() {
            const payload = { id: this.file_id, file: this.file }
            this.upload_file( payload );
            this.$router.push({name: 'Home'});
        },
        change_files(file) {
            this.valid = file != undefined;
            this.file = file;
        },
        ...mapActions({
            upload_file: 'UPLOAD_FILE',
        }),        
    },
    filters: {},
};
</script>
