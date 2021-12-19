var allTables = [
{
    name: 'artist',
    type: 'table',
    constraints: [
        {type:'Primary Key', columns:['id']},
        {type:'Unique', columns:['IPICode']},
        {type:'Not Null', columns:['artistName']}
    ],
    columns: [
        { name: 'id', type: 'number', readOnly: true, isPrimaryKey: true },
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
    constraints: [
        {type:'Primary Key', columns:['id']},
        {type:'Foreign Key', columns:['rcrdLblName','rcrdLblCountry'], referenceTable:'recordLabel', referenceColumns:['name','country']},
        {type:'Foreign Key', columns:['artistId'], referenceTable:'artist', referenceColumns:['id']}
    ],
    columns: [
        { name: 'id', type: 'number', readOnly: true, isPrimaryKey: true },
        { name: 'releaseName', type: 'text' },
        { name: 'releaseGenre', type: 'text' },
        { name: 'rcrdLblName', type: 'fk', lookupField: 'name', lookupTable: 'recordLabel' },
        { name: 'rcrdLblCountry', type: 'fk', lookupField: 'country', lookupTable: 'recordLabel' },
        { name: 'artistId', type: 'fk', lookupField: 'id', lookupTable: 'artist' }
    ],
    records: [
        ['20', 'Aquarius', 'Pop','56','56','67'],
        ['21', 'Aquarium', 'Pop','56','56',''],
        ['22', 'Spike', 'Rock','57','57',''],
        ['23', 'Golden', 'Pop','57','57',''],
        ['24', 'AM', 'Pop','56','56',''],
        ['25', 'Animal Magnetism', 'Rock','56','56','']
    ],
    color: 'green'
}, {
    name: 'track',
    type: 'table',
    constraints: [
        {type:'Primary Key', columns:['id']}
    ],
    columns: [
        { name: 'id', type: 'number', readOnly: true, isPrimaryKey: true },
        { name: 'ISRC', type: 'text' },
        { name: 'trackName', type: 'text' },
        { name: 'trackLength', type: 'duration' },
        { name: 'hasRating', type: 'boolean' }
    ],
    records: [
        ['460', 'X63000000226', 'Turn Back Time', 180000, true],
        ['461', 'GBXHC1810600', 'Roses are Red', 180000, true],
        ['462', '', 'Barbie Girl', 180000, false],
        ['463', 'GBBKA0000502', 'Around the World', 180000, null],
        ['464', 'USGF19822012', 'My Oh My', 180000, true],
        ['465', 'DKBKA0000105', 'Love And Lust', 180000, true]
    ],
    color: 'pink'
}, {
    name: 'track_artist',
    type: 'table',
    constraints: [
        {type:'Primary Key', columns:['id']},
        {type:'Foreign Key', columns:['trackId'], referenceTable:'track', referenceColumns:['id']},
        {type:'Foreign Key', columns:['artistId'], referenceTable:'artist', referenceColumns:['id']}
    ],
    columns: [
        { name: 'id', type: 'number', readOnly: true, isPrimaryKey: true },
        { name: 'trackId', type: 'fk', lookupField: 'id', lookupTable: 'track' },
        { name: 'artistId', type: 'fk', lookupField: 'id', lookupTable: 'artist' },
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
    constraints: [
        {type:'Primary Key', columns:['id']},
        {type:'Foreign Key', columns:['releaseId'], referenceTable:'release', referenceColumns:['id']},
        {type:'Foreign Key', columns:['trackId'], referenceTable:'track', referenceColumns:['id']}
    ],
    columns: [
        { name: 'id', type: 'number', readOnly: true, isPrimaryKey: true },
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
},{
    name: 'recordLabel',
    type: 'table',
    constraints: [
        {type:'Primary Key', columns:['name','country']},
        {type:'Foreign Key', columns:['name'], referenceTable:'release',referenceColumns:['id']}
    ],
    columns: [
        { name: 'id', type: 'number', readOnly: true },
        { name: 'name', type: 'text', isPrimaryKey: true },
        { name: 'country', type: 'text', isPrimaryKey: true }
    ],
    records: [
        ['56', 'RCA Records', 'UK'],
        ['57', 'RCA Records', 'US']
    ],
    color: 'blue'
},{
    name: 'award',
    type: 'table',
    constraints: [
        {type:'Primary Key', columns:['id']}
    ],
    columns: [
        { name: 'id', type: 'number', readOnly: true },
        { name: 'name', type: 'text' },
        { name: 'date', type: 'date' }
    ],
    records: [
        ['879', 'Grammy', '2020-08-20'],
        ['880', 'Grammy', '2020-08-20']
    ],
    color: 'blue'
},{
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
}, {
    name: 'Best Tracks',
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
}, {
    name: 'Favorite Playlist 2020',
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
}, {
    name: 'Artists by Total Tracks',
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
}, {
    name: 'Top Releases from Last Year',
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
}, {
    name: 'View of Track',
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
}, {
    name: 'Unnamed View',
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
}, {
    name: 'Award winning artists',
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
}, {
    name: 'Tracks by Rating',
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
}, {
    name: 'New Tracks',
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
}, {
    name: 'Unnamed View (2)',
    type: 'view',
    columns: [],
    records: [],
    color: 'purple'
}];

let loadedTables = allTables.map((data, index) => {
    function randomDate(start, end) {return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));}
    const lastUpdate = randomDate(new Date(2020, 0, 1), new Date());

    console.log(lastUpdate.toString().slice(0,10))

    return {
        'id': index,
        'name': data.name,
        'constraints' : data.constraints,
        'columns': data.columns.map((col, i) => i == 0 ? ({ ...col, isLookup: true }) : ({ ...col, isLookup: false })),
        'records': data.records,
        'type': data.type,
        'color' : data.color,
        'lastUpdated' : lastUpdate.toString().slice(0,15)
    }
}
);




module.exports = { loadedTables };