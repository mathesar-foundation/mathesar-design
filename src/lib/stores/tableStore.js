import { writable } from 'svelte/store'

export let tableStore = writable({
    id: null,
    name:null,
    columns: [],
    records: [],
    type:null
});