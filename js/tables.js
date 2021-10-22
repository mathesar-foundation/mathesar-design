var tables = {
    tables: [{
        name: 'artists',
        id: 0,
        constraints: [
            { column: 'releaseId', type: 'foreignKey'}
        ],
        columns: [
            { name: 'id', type: 'number', readOnly: true },
            { name: 'artistName', type: 'text' },
            { name: 'releaseId', type: 'fk', lookupField: 'releaseName', lookupTable: 'release' },
            { name: 'trackId', type: 'text' }
        ],
        records: [
            [449, 'Aqua', 'Aquarius', ''],
            [450, 'Patti Smith', 'Horses', ''],
            [451, 'Elvis Costello', 'Spike', ''],
            [451, 'Kylie Minogue', 'Golden', ''],
            [451, 'Artic Monkeys', 'AM', ''],
            [453, 'Scorpions', 'Animal Magnetism', '']
        ],
        color: 'purple'
    }, {
        name: 'release',
        id: 1,
        columns: [
            { name: 'id', type: 'number', readOnly: true },
            { name: 'releaseName', type: 'text' },
            { name: 'releaseGenre', type: 'text' }
        ],
        records: [
            [20, 'Aquarius', 'Pop'],
            [21, 'Aquarium', 'Pop'],
            [22, 'Spike', 'Rock'],
            [23, 'Golden', 'Pop'],
            [24, 'AM', 'Pop'],
            [25, 'Animal Magnetism', 'Rock']
        ],
        color: 'green'
    }, {
        name: 'track',
        id: 2,
        columns: [
            { name: 'id', type: 'number', readOnly: true },
            { name: 'trackName', type: 'text' },
            { name: 'trackLength', type: 'duration' }
        ],
        records: [
            [460, 'Turn Back Time', 180000],
            [461, 'Roses are Red', 180000],
            [462, 'Barbie Girl', 180000],
            [463, 'Around the World', 180000],
            [464, 'My Oh My', 180000],
            [465, 'Love And Lust', 180000]
        ],
        color: 'pink'
    }, {
        name: 'track_artist',
        id: 3,
        columns: [
            { name: 'id', type: 'number', readOnly: true },
            { name: 'trackId', type: 'fk', lookupField: 'trackName', lookupTable: 'track' },
            { name: 'artistId', type: 'fk', lookupField: 'artistName', lookupTable: 'artist' },
        ],
        records: [
            [500, 'Around the World', ''],
            [501, 'Barbie Girl', ''],
            [502, 'Turn Back Time', ''],
            [503, 'Roses are Red', '']
        ],
        color: 'pink'
    }, {
        name: 'release_track',
        id: 8,
        columns: [
            { name: 'id', type: 'number', readOnly: true },
            { name: 'releaseId', type: 'fk', lookupField: 'releaseName', lookupTable: 'release' },
            { name: 'trackId', type: 'fk', lookupField: 'trackName', lookupTable: 'track' }
        ],
        records: [
            ['60', 'Aquarius', 'Roses are Red'],
            ['61', 'Aquarius', 'Around the World'],
            ['62', 'Aquarius', 'Barbie Girl'],
            ['63', 'Aquarius', 'Good Morning Sunshine']
        ],
        color: 'pink'
    }],
    views: [{
        name: 'Releases by Artist',
        id: 4,
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
        id: 10,
        columns: [
            { name: 'releaseName', type: 'text', referencedTable: 'release' },
            { name: 'trackName', type: 'summary', referencedTable: 'release_track', summaryOf: 'trackId' }
        ],
        records: [
            ['Aquarius', 'Roses are Red,Around the World,Good Morning Sunshine'],
            ['Aquarium', '']
        ],
        color: 'purple'
    }
    ]
};

module.exports = { tables };