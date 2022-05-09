# Specs

## Design for visual query builder ("Data Explorer") #1065

Representing different relationships between tables [DONE]
Starting with a formula column vs. a direct column
Column choices [DONE]
Representing Formulas
Representing Filters [DONE]
Representing Aggregations [DONE]
How to set and show "base table" [DONE]
Where to put the query builder in the navigation [DONE]

## Support for listing database views #455

Users should be able to browse through a list of all available views in the currently open schema. This should probably happen in a different page with a paginated view. [DONE]
Users should be able to access all views through the left pane. [DONE]
Users should be able to search for views by name from the left pane, even if they are not visible in the left pane. [DONE]
Users should be able to open a view in a tab. The design for what happens when a view is opened will be covered in Support for opening and interacting with a View #466. [DONE]

## Support for opening and interacting with a View #466

Data Type
Sources
Formula
Link?
Rows: Similar to table rows (at least as far as viewing goes, editing will be different and is out of scope for this issue)
Sorts: Similar to tables.
Groups: Similar to tables.
Structure Editable?: The user should be able to see whether the View structure is editable (i.e. whether it can be modified using the Data Explorer)
Query. This is the underlying SQL query that defines the view, It should support syntax highlighting and be able to be copied easily. Please note that this only

## Support for editing records within a view #456

Identifying editable columns
Editing directly represented data
When the user tries to edit data in a cell that is directly editable, we should allow them to edit the data using the appropriate input method for the cell's data type.
We should indicate to the user that editing the cell is actually editing the underlying table's data and will be updated everywhere.
There should be a way for the user to edit the underlying record, not just the specific cell.
Please note that the record might have foreign key fields, so we will need a way to integrate foreign key autocompletion when they are editing that record.

## Support for creating a database view from scratch #781

The user clicks on a "new view" button (or something similar).
We open the Data Explorer (see Design for visual query builder ("Data Explorer") #1065)
There should be some indication that the data explorer was opened in response to a View creation request.
The user can save the output as a View.

## Support for editing the structure of a database view #783

Scenario 1: The database view structure can be edited
The user clicks on a button or menu that allows them to edit the structure of a view.
We open the Data Explorer with pre-filled sections (see Design for visual query builder ("Data Explorer") #1065)
There should be some indication that the data explorer was opened in response to a View editing request.
The user can edit the View structure and either save the view or save as a new view.
Scenario 2: The database view structure cannot be edited
There may be some views whose structure cannot be edited. We should convey this to the user somehow, either by hiding the option or disabling it.

## Support for creating a view based on an existing table or view #782

The user should be able save existing filters or sorts applied to a table as a view.
The user can hide columns in a table. At this point, they should be prompted to create a view of the table without the hidden columns if they want to save the way it looks.
The user can reorder columns in a table. At this point, they should be prompted to create a view of the table where the columns are reordered if they want to save the way it looks.
The user should be able to reorder columns in a view.
The user should be able to hide columns in a view.
The user should be able to change filters or sorts in a view.
The user should be able to save groups in a table or a view as a new "summarized" view.

## Support for materialized views #834

The user navigates to a materialized view.
The user navigates to a regular view.

## Support for Adding Formula Columns in Data Explorer #1252

Browsing the list of available formulas and identifying the formula you need quickly
Searching the available formulas
Formula placement within the data explorer

## Issues supporting or depending on queries and views

- Left pane UX improvements #723
- Design for List data type #978
- Design for Range Data Type #1274
- Update design for checking for duplicate rows. #1028
- Support for deleting a database view #454
- Support for renaming a view #805
