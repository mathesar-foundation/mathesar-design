export function addNew(object) {
    return {
        name: 'Table',
        type: 'table',
        columns: [
            { name: 'id', type: 'number', readOnly: true }
        ],
        records: [
            [''],
        ],
        color: 'purple'
    }
}
