<template>
    <v-container grid-list-xl text-xs-center>
        <v-layout align-center justify-center fill-height>
            <v-flex xs12>
                <h3>Add new file:</h3>
                <v-form v-model="valid" ref="form">
                    <v-text-field v-model="title" :rules="titleRules" label="File title" required></v-text-field>
                    <v-btn :disabled="!valid" color="success" class="mr-4" @click="submit">
                        Add
                    </v-btn>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    name: 'AddFile',
    data() {
        return {
            valid: false,
            title: '',
            titleRules: [
                (v) => !!v || 'Title is required',
                (v) => v.length > 3 || 'Title must be less than 3 characters',
            ],
        };
    },
    methods: {
        async submit() {
            await this.add_file(this.title);            
            this.$router.push({name: 'Home'});
        },
        ...mapActions({
            add_file: 'ADD_FILE',
        }),
    },
    computed: {},
    filters: {},
};
</script>
