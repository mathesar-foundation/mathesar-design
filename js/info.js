var info = {
    tableRelationships: {
        title: 'Setting up Relationships',
        content: `
        <p>If you need to link multiple <span>artist</span> records to each <span>release</span>, you will need to create a linked column on the <span>release</span> table instead of this table.</p>
        <a href="#">Click here to go to the release table.</a>
        <p>If each <span>artist</span> record might be linked to multiple <span>release</span> records and each <span>release</span> record should be linked with multiple <span>artist</span> records, you will need to create a new table with columns linking to both tables.</p>
        <a href="#">Click here to create that table.</a>`
    }

};

module.exports = { info };