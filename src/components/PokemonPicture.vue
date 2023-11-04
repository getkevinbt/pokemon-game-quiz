<template>
    <div class="slider-container">
        <div class="left-arrow" @click="leftMove" v-show="center !== 0">
            <span class="material-symbols-outlined"> chevron_left </span>
        </div>
        <div
            :class="{
                'slider-content': true,
                'margin-auto-left': center === 0,
                'margin-auto-right': center === pokemons.length - 1,
            }"
            id="slider-content"
        >
            <div
                v-for="(pokemon, index) in pokemons"
                :key="pokemon"
                class="slide"
                @click="moveTo(index)"
                :class="{
                    'position-1': center - 2 === index,
                    'position-2': center - 1 === index,
                    'position-3': center === index,
                    'position-4': center + 1 === index,
                    'position-5': center + 2 === index,
                    'position-none': index < center - 2 || center + 2 < index,
                }"
            >
                <div
                    v-if="index === pokemons.length - 1 && loadingImg"
                    class="loader slider-skeleton"
                ></div>
                <div class="media">
                    <img
                        :src="getImageURL(pokemon.id)"
                        alt="Pokemon Picture"
                        :class="{
                            'hidden-pokemon':
                                index === pokemons.length - 1 && !showPokemon,
                        }"
                        @load="loaded"
                    />
                </div>
                <div v-if="index !== pokemons.length - 1" class="card-sections">
                    <div class="lower-section">
                        <div class="card-caption">{{ pokemon.name }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="right-arrow"
            v-show="center !== pokemons.length - 1"
            @click="rightMove"
        >
            <span class="material-symbols-outlined"> chevron_right </span>
        </div>
    </div>
</template>

<script>
import $ from "jquery";

export default {
    props: {
        pokemons: {
            type: Array,
            required: true,
        },
        showPokemon: {
            type: Boolean,
            required: true,
            default: false,
        },
        loadingImgTransmisor: {
            type: Boolean,
            required: true,
            default: false,
        },
        indicator: {
            type: Object,
            required: true,
        },
    },
    watch: {
        indicator() {
            this.center = this.pokemons.length - 1;
        },
        loadingImgTransmisor() {
            this.loadingImg = true;
        },
    },
    computed: {},
    data() {
        return {
            center: this.pokemons.length - 1,
            loadingImg: false,
        };
    },
    methods: {
        loaded() {
            this.loadingImg = false;
        },
        leftMove() {
            this.center = this.center - 1 >= 0 ? this.center - 1 : 0;
        },
        rightMove() {
            this.center =
                this.center + 1 < this.pokemons.length
                    ? this.center + 1
                    : this.pokemons.length - 1;
        },
        moveTo(index) {
            this.center = index;
        },
        getImageURL(id) {
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
        },
    },
    mounted() {
        const container = document.getElementById("slider-content");

        class Swipe {
            constructor(element) {
                this.xDown = null;
                this.yDown = null;
                this.element =
                    typeof element === "string" ? $(element) : element;

                this.element.addEventListener(
                    "touchstart",
                    function (evt) {
                        this.xDown = evt.touches[0].clientX;
                        this.yDown = evt.touches[0].clientY;
                    }.bind(this),
                    false
                );
            }

            onLeft(callback) {
                this.onLeft = callback;

                return this;
            }

            onRight(callback) {
                this.onRight = callback;

                return this;
            }

            handleTouchMove(evt) {
                if (!this.xDown || !this.yDown) {
                    return;
                }

                var xUp = evt.touches[0].clientX;
                var yUp = evt.touches[0].clientY;

                this.xDiff = this.xDown - xUp;
                this.yDiff = this.yDown - yUp;

                if (Math.abs(this.xDiff) > Math.abs(this.yDiff)) {
                    if (this.xDiff > 0) {
                        this.onLeft();
                    } else {
                        this.onRight();
                    }
                }

                this.xDown = null;
                this.yDown = null;
            }

            run() {
                this.element.addEventListener(
                    "touchmove",
                    (evt) => this.handleTouchMove(evt),
                    false
                );
            }
        }

        var swiper = new Swipe(container);

        swiper.onRight(() => this.leftMove());
        swiper.run();

        swiper.onLeft(() => this.rightMove());
        swiper.run();
    },
};
</script>

<style scoped>
.slider-container {
    align-items: center;
    display: flex;
    height: 52vh;
    justify-content: center;
    margin-top: 4.381vh;
    position: relative;
    user-select: none;
    width: 100vw;
}

.left-arrow,
.right-arrow {
    align-items: center;
    display: flex;
    height: 300px;
    justify-content: center;
    width: 10%;
}

.left-arrow span,
.right-arrow span {
    font-size: 48px;
}

.slider-content {
    align-items: center;
    display: flex;
    flex-direction: row;
    height: 100%;
    justify-content: center;
    overflow: hidden;
    perspective: 100px;
    position: relative;
    width: 80%;
}
.margin-auto-left {
    margin-left: auto;
}
.margin-auto-right {
    margin-right: auto;
}
.slider-content .slide {
    align-items: center;
    background: #303030;
    border-radius: 25px;
    display: flex;
    height: 90%;
    justify-content: center;
    left: 50%;
    max-height: 400px;
    max-width: 100%;
    position: absolute;
    transform-style: preserve-3d;
    transform: translate(-50%, 0) rotateY(0deg) scale(1, 1);
    transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out,
        left 0.5s ease-in-out, z-index 0s 0.25s ease-in-out,
        box-shadow 0.5s ease-in-out;
    width: 14rem;
    z-index: 0;
}

.slide.position-1 {
    left: 20% !important;
    opacity: 1 !important;
    transform: translate(-50%, 0) rotateY(-2deg) scale(0.8, 0.8) !important;
    z-index: 1 !important;
}
.slide.position-2 {
    left: 35% !important;
    opacity: 1 !important;
    transform: translate(-50%, 0) rotateY(-1deg) scale(0.9, 0.9) !important;
    z-index: 2 !important;
}
.slide.position-3 {
    cursor: pointer;
    left: 50% !important;
    opacity: 1 !important;
    transform: translate(-50%, 0) rotateY(0deg) scale(1, 1) !important;
    z-index: 4 !important;
}
.slide.position-3:hover {
    transform: translate(-50%, 0) rotateY(0deg) scale(1.05, 1.05) !important;
}
.slide.position-4 {
    left: 65% !important;
    opacity: 1 !important;
    transform: translate(-50%, 0) rotateY(1deg) scale(0.9, 0.9) !important;
    z-index: 2 !important;
}
.slide.position-5 {
    left: 80% !important;
    opacity: 1 !important;
    transform: translate(-50%, 0) rotateY(2deg) scale(0.8, 0.8) !important;
    z-index: 1 !important;
}
.slide.position-none {
    left: 50%;
    opacity: 1;
    transform: translate(-50%, 0) rotateY(0deg) scale(0.7, 0.7);
    z-index: 0;
}
.loader {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border-radius: 25px;
}
.slider-skeleton {
    background-image: linear-gradient(
        90deg,
        #ccc 0px,
        rgb(229 229 229 / 90%) 40px,
        #ccc 80px
    );
    background-size: 300%;
    background-position: 100% 0;
    animation: shimmer 1.5s infinite;
}
@keyframes shimmer {
    to {
        background-position: -100% 0;
    }
}
.slider-container span {
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 50%;
}
.slide > * {
    color: white;
    letter-spacing: -0.001em;
}
.media,
.card-sections {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 25px;
    overflow: hidden;
}
.media {
    top: 5%;
    left: 5%;
    width: 90%;
    height: 90%;
}
.media {
    display: flex;
    align-items: center;
    justify-content: center;
}

.media img {
    position: absolute;
    max-width: 100%;
    max-height: 100%;
}
.hidden-pokemon {
    filter: brightness(0);
}
.card-sections {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    top: initial;
    bottom: 0;
    height: min-content;
}

.lower-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

@media screen and (max-width: 620px) {
    .slide.position-1,
    .slide.position-5 {
        opacity: 0.5 !important;
    }
    .slide.position-2,
    .slide.position-4 {
        opacity: 0.95 !important;
    }
}

@media screen and (max-width: 445px) {
    .slide.position-1,
    .slide.position-5 {
        opacity: 0 !important;
    }
    .slide.position-2,
    .slide.position-4 {
        opacity: 0.5 !important;
    }
}
@media screen and (max-width: 415px) {
    /* .slider-container {
        height: 250px;
        margin-bottom: 15px;
    } */
    .slider-container .slide {
        opacity: 0 !important;
    }
    .slide.position-3 {
        opacity: 1 !important;
    }
    .slide.position-1,
    .slide.position-2 {
        left: -50% !important;
        transform: translate(-50%, 0) rotateY(0deg) scale(0.7, 0.7) !important;
    }
    .slide.position-4,
    .slide.position-5 {
        left: 150% !important;
        transform: translate(-50%, 0) rotateY(0deg) scale(0.7, 0.7) !important;
    }
    .slide.position-3:hover {
        transform: translate(-50%, 0) !important;
    }
}
</style>
