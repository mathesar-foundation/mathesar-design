import { writable } from 'svelte/store'

export let schemaStore = writable({
    id: null,
    name:null,
    tables:[]
});

