<template>
    <PokemonPage />
</template>

<script>
import PokemonPage from "./pages/PokemonPage";

export default {
    name: "App",
    components: {
        PokemonPage,
    },
};
</script>

<style>
#app {
    font-family: "Ubuntu", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #145595;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    position: relative;
}
PokemonPage {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 90vh;
}
</style>
