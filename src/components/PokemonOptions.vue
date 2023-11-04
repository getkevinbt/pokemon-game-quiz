<template>
    <div class="options-container">
        <ul>
            <li
                v-for="pokemon in pokemons"
                :key="pokemon.id"
                @click="$emit('selectionPokemon', pokemon.id)"
            >
                {{ pokemon.name }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        pokemons: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style scoped>
.options-container {
    align-items: center;
    display: flex;
    justify-content: center;
    height: 19.4vh;
}
ul {
    align-items: stretch;
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    height: 100%;
    list-style: none;
    margin: 1.158vh 0 0;
    max-width: 600px;
    padding: 0;
    width: 70%;
}
li {
    align-items: center;
    background-color: #303030;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    color: #ccc;
    cursor: pointer;
    display: flex;
    font-size: 1.853vh;
    height: 100%;
    justify-content: center;
    margin: auto;
    transition: all 0.2s;
    width: 100%;
}

li:hover {
    background-color: rgba(0, 0, 0, 0.05);
}
</style>
