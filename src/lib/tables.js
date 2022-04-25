export var allSchemas = [
    {
        name: 'album_collection',
        description: 'Main schema for inventory use case',
        tables: [
            {
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
                //The view column is the same as a specific column from a specific table/view.
                //The view column is derived from a specific column from a specific table/view.
                //The view column is derived from multiple columns from the same table/view.
                //The view column is derived from multiple columns from different table/view.
                //The view column is computed and not derived from any columns from any tables/views.
                //The view column's provenance is unknown.
                name: 'Top Releases from Last Year',
                type: 'view',
                favorite: true,
                columns: [
                    {
                        // constant 
                        name: 'releaseName', 
                        type: 'text',
                        referencedTable: 'release',
                        referencedColumn: [
                            { name: 'releaseName', table:'release'}
                        ]
                    },{
                        // derived
                        // Official, Promotional, Bootleg, Pseudo-Release
                        name: 'releaseStatus', 
                        type: 'text', 
                        referencedTable: 'release',
                        referencedColumn: [
                            { name: 'statusCode', table:'release'}
                        ] 
                    },{
                        // derived multi column
                        name: 'countryLabel', 
                        type: 'text', 
                        referencedTable: 'release',
                        referencedColumn: [
                            { name: 'releaseCountry', table:'release'},
                            { name: 'releaseLabel', table:'release'}
                        ]
                    },{ 
                        // derived multi-table and column
                        name: 'avgTrackLength', 
                        type: 'text', 
                        referencedTable: ['release','track'],
                        referencedColumn: [
                            { name: 'releaseLength', table:'release'},
                            { name: 'trackId', table:'track'}
                        ]
                    },{ 
                        // calculated
                        name: 'calculated', 
                        type: 'text'
                    }
                    
                ],
                records: [
                    ['Aquarium','Promotional','UK_ARISTA',3000,true],
                    ['Aquarius','Promotional','UK_ARISTA',3000,null]
                ],
                color: 'purple'
            }]
    },{
        name: 'movie_collection',
        description: 'Schema for empty states',
        tables : []
    },{
        name: 'loading_error_schema',
        description: 'Schema for loading errors',
        tables : []
    }
]