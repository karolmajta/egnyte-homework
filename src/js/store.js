import {default as immstruct} from "immstruct";

export const createStore = (initial) => {
    const struct = immstruct(initial);

    return {
        on: (name, fn) => struct.on(name, fn),
        cursor: () => struct.cursor()
    };
};