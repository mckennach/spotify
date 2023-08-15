import { atom } from "recoil";

export const currentSearchTerm = atom({
    key: 'currentSearchTerm',
    default: 'Panda Bear'
})


export const currentSearchData = atom({
    key: 'currentSearchData',
    default: false
})
