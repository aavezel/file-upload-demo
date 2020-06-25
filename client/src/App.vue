<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
            <v-list dense>
                <v-list-item v-for="page in pages" :key="page.title" :to="page.to">
                    <v-list-item-action>
                        <v-icon>{{ page.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            {{ page.title }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
                <span class="hidden-sm-and-down">File storage</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
                flat
                solo-inverted
                hide-details
                prepend-inner-icon="mdi-magnify"
                label="Search"
                class="hidden-sm-and-down"
                v-model="filter"
                v-if="isHome"
            ></v-text-field>
        </v-app-bar>
        <v-main>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-main>
        <v-btn bottom color="pink" dark fab fixed right :to="{name: 'AddFile'}" v-if="isHome">
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </v-app>
</template>

<script>
import debounce from 'lodash.debounce';
import {mapState, mapMutations} from 'vuex';

export default {
    props: {
        source: String,
    },
    data: () => ({
        dialog: false,
        drawer: null,
        pages: [
            {title: 'Files', icon: 'storage', to: '/'},
            {title: 'About', icon: 'info', to: '/about'},
        ],
    }),
    methods: {
        setFilesFilterThrottle: debounce(function(new_filter) {
            this.setFilesFilter(new_filter);
        }, 500),
        ...mapMutations({
            setFilesFilter: 'SET_FILES_FILTER',
        }),
    },
    computed: {
        filter: {
            get() {
                return this.store_filter;
            },
            set(value) {
                this.setFilesFilterThrottle(value);
            },
        },
        isHome() {
            return this.$route.name === 'Home';
        },
        ...mapState({
            store_filter: (state) => state.files_filter,
        }),
    },
};
</script>
