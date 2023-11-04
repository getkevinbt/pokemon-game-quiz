<template>
    <h1 class="waiting" v-if="pokemons.length === 0">Wait please...</h1>

    <div class="page-container" v-else>
        <h1>Who is this pokemon?</h1>
        <h3 class="successes-counter">{{ successes_counter }}</h3>

        <PokemonPicture
            :show-pokemon="showPokemon"
            :pokemons="pokemons"
            :loadingImgTransmisor="loadingImgTransmisor"
            :indicator="indicator"
        />

        <PokemonOptions
            v-if="!showAnswer"
            :pokemons="pokemonArr"
            @selection-pokemon="checkAnswer"
        />

        <template v-if="showAnswer">
            <h2 class="fade-in">{{ message }}</h2>
            <button class="btn" v-if="lose" @click="newGame">New</button>
            <button class="btn" v-else @click="getChoices">Next</button>
        </template>
    </div>
</template>

<script>
import PokemonOptions from "@/components/PokemonOptions";
import PokemonPicture from "@/components/PokemonPicture";

import { build, getChoices } from "@/helpers/getPokemonOptions";

export default {
    components: { PokemonOptions, PokemonPicture },
    data() {
        return {
            pokemonArr: [],
            showPokemon: false,
            showAnswer: false,
            lose: false,
            message: "",
            pokemons: [],
            loadingImgTransmisor: false,
            indicator: new Date(),
            successes_counter: 0,
        };
    },
    methods: {
        async getChoices() {
            this.loadingImgTransmisor = !this.loadingImgTransmisor;
            this.pokemonArr = await getChoices();
            this.pokemons.push(this.pokemonArr[0]);
            this.indicator = new Date();
            this.pokemonArr.sort(() => Math.random() - 0.5);
            this.showAnswer = false;
            this.showPokemon = false;
        },
        async startUp() {
            await build();
            this.getChoices();
        },
        checkAnswer(selectedId) {
            this.showAnswer = true;
            this.showPokemon = true;

            if (selectedId === this.pokemons[this.pokemons.length - 1].id) {
                this.successes_counter++;
                this.message = `Right, it is ${
                    this.pokemons[this.pokemons.length - 1].name
                }`;
            } else {
                this.lose = true;
                this.message = `Oops, it is ${
                    this.pokemons[this.pokemons.length - 1].name
                }`;
            }
        },
        newGame() {
            this.lose = false;
            this.pokemonArr = [];
            this.pokemons = [];
            this.showAnswer = false;
            this.showPokemon = false;
            this.startUp();
            this.successes_counter = 0;
        },
    },
    mounted() {
        this.startUp();
    },
};
</script>
<style scoped>
.waiting {
    left: 50%;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
}
.page-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
}
.page-container > h1 {
    font-size: min(5.7vh, 9vw);
    margin: 3.8vh 0;
}
.successes-counter {
    font-size: min(5.48vh, 8.5vw);
    margin: 0;
    padding: 0;
}
.btn {
    background-color: #303030;
    border-radius: 10px;
    border: 3px solid #353535;
    color: #ccc;
    cursor: pointer;
    margin: 0 auto;
    max-width: 270px;
    padding: 20px 0;
    width: 70%;
}
</style>
