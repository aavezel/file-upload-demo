<template>
    <v-container grid-list-xl text-xs-center>
        <v-layout align-center justify-center fill-height>
            <v-flex xs12>
                <h1>Page Not Found</h1>
                <h3 class="mb-4">The page you are looking for does not exist or has changed</h3>
                <router-link :to="{name: 'Home'}">
                    back to home page >
                </router-link>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
// @ is an alias to /src

export default {
    name: 'PageNotFound',
};
</script>
