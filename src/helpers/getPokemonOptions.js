import pokemonApi from "../api/pokemonApi";

let promiseArr = [];

const getChoices = async () => {
    promiseArr.sort(() => Math.random() - 0.5);
    try {
        let choices = await Promise.all(promiseArr.slice(0, 4));
        promiseArr.shift();
        return choices.map(({ data }) => {
            return { name: fixName(data.name), id: data.id };
        });
    } catch (error) {
        console.error(error);
        return { msg: "error charging data." };
    }
};

const build = async () => {
    promiseArr = [];
    Array.from(Array(649))
        .map((_, index) => index + 1)
        .forEach((e) => {
            const promise = pokemonApi.get(`/${e}`);
            promiseArr.push(promise);
        });
};

const fixName = (name) =>
    name
        .split(" ")
        .map(
            (e) => e.split("")[0].toUpperCase() + e.split("").slice(1).join("")
        )
        .join(" ");

export { getChoices, build };
