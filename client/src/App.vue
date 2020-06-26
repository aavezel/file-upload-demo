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
            <v-btn-toggle v-model="service"  group>
                <v-btn value="dummy">Dummy</v-btn>
                <v-btn value="http">Http</v-btn>
                <v-btn value="ws">WS</v-btn>
            </v-btn-toggle>
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
                <div class="loading" v-if="is_loading">
                    <v-progress-circular indeterminate color="primary" :size="150" :width="12"></v-progress-circular>
                </div>
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
import {mapState, mapMutations,mapActions} from 'vuex';

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
        ...mapActions({
            makeService: "MAKE_SERVICE",
        })
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
        service: {
            get() {
                return this.store_service;
            },
            set(value) {
                this.makeService({store: value});
            }
        },
        isHome() {
            return this.$route.name === 'Home';
        },
        ...mapState({
            is_loading: (state) => state.is_loading,
            store_filter: (state) => state.files_filter,
            store_service : (state) => state.service_name,
        }),        
    },
};
</script>
<style scoped>
.loading {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding-top: 5em;
    text-align: center;
    backdrop-filter: blur(5px);
    background: rgba(255, 255, 255, 0.1);
    z-index: 1000;
}
</style>
