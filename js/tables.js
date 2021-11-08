var allTables = [{
    name: 'artist',
    type: 'table',
    constraints: [
        { column: 'releaseId', type: 'foreignKey' }
    ],
    columns: [
        { name: 'id', type: 'number', readOnly: true },
        { name: 'artistName', type: 'text' },
        { name: 'IPICode', type: 'number' },
        { name: 'ISNICode', type: 'number' },
        { name: 'leadSinger', type: 'number' },
        { name: 'type', type: 'text' }
    ],
    records: [
        ['67', 'Aqua','677447438706','','Lene Nystrøm','Group'],
        ['68', 'Patti Smith','960892312462','','Patti Smith','Person'],
        ['69', 'Elvis Costello','897519219900','','Elvis Costello','Person'],
        ['70', 'Kylie Minogue','454790589633','','Kylie Minogue','Person'],
        ['71', 'Artic Monkeys','975890775212','','Alex Turner','Group'],
        ['72', 'Scorpions','225410006708','','Rudolf Schenker','Group']
    ],
    color: 'purple'
}, {
    name: 'release',
    type: 'table',
    columns: [
        { name: 'id', type: 'number', readOnly: true },
        { name: 'releaseName', type: 'text' },
        { name: 'releaseGenre', type: 'text' }
    ],
    records: [
        ['20', 'Aquarius', 'Pop'],
        ['21', 'Aquarium', 'Pop'],
        ['22', 'Spike', 'Rock'],
        ['23', 'Golden', 'Pop'],
        ['24', 'AM', 'Pop'],
        ['25', 'Animal Magnetism', 'Rock']
    ],
    color: 'green'
}, {
    name: 'track',
    type: 'table',
    columns: [
        { name: 'id', type: 'number', readOnly: true },
        { name: 'ISRC', type: 'text' },
        { name: 'trackName', type: 'text' },
        { name: 'trackLength', type: 'duration' }
    ],
    records: [
        ['460', 'X63000000226', 'Turn Back Time', 180000],
        ['461', 'GBXHC1810600', 'Roses are Red', 180000],
        ['462', 'DKBKA9700408', 'Barbie Girl', 180000],
        ['463', 'GBBKA0000502', 'Around the World', 180000],
        ['464', 'USGF19822012', 'My Oh My', 180000],
        ['465', 'DKBKA0000105', 'Love And Lust', 180000]
    ],
    color: 'pink'
}, {
    name: 'track_artist',
    type: 'table',
    columns: [
        { name: 'id', type: 'number', readOnly: true },
        { name: 'trackId', type: 'fk', lookupField: 'trackName', lookupTable: 'track' },
        { name: 'artistId', type: 'fk', lookupField: 'artistName', lookupTable: 'artist' },
    ],
    records: [
        ['500', '460', ''],
        ['501', '461', ''],
        ['502', '462', ''],
        ['503', '463', '']
    ],
    color: 'pink'
}, {
    name: 'release_track',
    type: 'table',
    columns: [
        { name: 'id', type: 'number', readOnly: true },
        { name: 'releaseId', type: 'fk', lookupField: 'id', lookupTable: 'release' },
        { name: 'trackId', type: 'fk', lookupField: 'id', lookupTable: 'track' }
    ],
    records: [
        ['60', '21', '461'],
        ['61', '21', '462'],
        ['62', '21', '463'],
        ['63', '21', '464']
    ],
    color: 'pink'
}, {
    name: 'Releases by Artist',
    type: 'view',
    columns: [
        { name: 'artistName', type: 'text', referencedTable: 'artist' },
        { name: 'releaseName', type: 'text', referencedTable: 'release' }
    ],
    records: [
        ['Aqua', 'Aquarius'],
        ['Elvis Costello', 'Spike'],
        ['Kylie Minogue', 'Golden'],
        ['Artic Monkeys', 'AM'],
        ['Scorpions', 'Animal Magnetism']
    ],
    color: 'purple'
}, {
    name: 'Release with Track',
    type: 'view',
    columns: [
        { name: 'releaseName', type: 'text', referencedTable: 'release' },
        { name: 'trackName', type: 'summary', referencedTable: 'release_track', summaryOf: 'trackId' }
    ],
    records: [
        ['Aquarius', 'Roses are Red,Around the World,Good Morning Sunshine'],
        ['Aquarium', '']
    ],
    color: 'purple'
}];

let loadedTables = allTables.map((data, index) => {
    return {
        'id': index,
        'name': data.name,
        'columns': data.columns.map((col, i) => i == 0 ? ({ ...col, isLookup: true }) : ({ ...col, isLookup: false })),
        'records': data.records,
        'type': data.type,
    }
}
);

module.exports = { loadedTables };