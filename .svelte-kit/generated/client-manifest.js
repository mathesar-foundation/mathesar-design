export { matchers } from './client-matchers.js';

export const components = [
	() => import("../../src/routes/__layout.svelte"),
	() => import("../runtime/components/error.svelte"),
	() => import("../../src/routes/index.svelte"),
	() => import("../../src/routes/SchemaCard.svelte"),
	() => import("../../src/routes/schema/new.svelte"),
	() => import("../../src/routes/schema/[schemaId]/index.svelte"),
	() => import("../../src/routes/schema/[schemaId]/DataType.svelte"),
	() => import("../../src/routes/schema/[schemaId]/NavItem.svelte"),
	() => import("../../src/routes/schema/[schemaId]/SideBar.svelte"),
	() => import("../../src/routes/schema/[schemaId]/Toolbar.svelte"),
	() => import("../../src/routes/schema/[schemaId]/queries/[queryId]/index.svelte"),
	() => import("../../src/routes/schema/[schemaId]/queries/[queryId]/BaseTableSelector.svelte"),
	() => import("../../src/routes/schema/[schemaId]/queries/[queryId]/FormulaSettings.svelte"),
	() => import("../../src/routes/schema/[schemaId]/queries/[queryId]/SelectedColumns.svelte"),
	() => import("../../src/routes/schema/[schemaId]/queries/[queryId]/Transformations.svelte"),
	() => import("../../src/routes/schema/[schemaId]/queries/[queryId]/ColumnSelector.svelte"),
	() => import("../../src/routes/schema/[schemaId]/queries/[queryId]/ColumnSettings.svelte"),
	() => import("../../src/routes/schema/[schemaId]/queries/[queryId]/ColumnEditor.svelte"),
	() => import("../../src/routes/schema/[schemaId]/queries/[queryId]/TablePreview.svelte"),
	() => import("../../src/routes/schema/[schemaId]/queries/[queryId]/ColumnGroup.svelte"),
	() => import("../../src/routes/schema/[schemaId]/queries/[queryId]/Parameters.svelte"),
	() => import("../../src/routes/schema/[schemaId]/queries/[queryId]/Column.svelte"),
	() => import("../../src/routes/schema/[schemaId]/queries/[queryId]/Source.svelte"),
	() => import("../../src/routes/schema/[schemaId]/queries/[queryId]/Step.svelte"),
	() => import("../../src/routes/schema/[schemaId]/Column.svelte"),
	() => import("../../src/routes/schema/[schemaId]/Editor.svelte"),
	() => import("../../src/routes/schema/[schemaId]/tables/DataTypeSettings.svelte"),
	() => import("../../src/routes/schema/[schemaId]/tables/SelectionActions.svelte"),
	() => import("../../src/routes/schema/[schemaId]/tables/LinkTableWizard.svelte"),
	() => import("../../src/routes/schema/[schemaId]/tables/RecordSelector.svelte"),
	() => import("../../src/routes/schema/[schemaId]/tables/LinkTableForm.svelte"),
	() => import("../../src/routes/schema/[schemaId]/tables/ColumnCard.svelte"),
	() => import("../../src/routes/schema/[schemaId]/tables/ImportData.svelte"),
	() => import("../../src/routes/schema/[schemaId]/tables/Inspector.svelte"),
	() => import("../../src/routes/schema/[schemaId]/tables/Question.svelte"),
	() => import("../../src/routes/schema/[schemaId]/tables/Design.svelte"),
	() => import("../../src/routes/schema/[schemaId]/tables/Filter.svelte"),
	() => import("../../src/routes/schema/[schemaId]/tables/Popup.svelte"),
	() => import("../../src/routes/schema/[schemaId]/tables/Query.svelte"),
	() => import("../../src/routes/schema/[schemaId]/tables/[tableId]/index.svelte"),
	() => import("../../src/routes/schema/[schemaId]/tables/[tableId]/records/__layout.svelte"),
	() => import("../../src/routes/schema/[schemaId]/tables/[tableId]/records/RecordNavigation.svelte"),
	() => import("../../src/routes/schema/[schemaId]/tables/[tableId]/records/[recordId]/index.svelte"),
	() => import("../../src/routes/schema/[schemaId]/tables/[tableId]/records/[recordId]/EmbeddedQueries.svelte"),
	() => import("../../src/routes/schema/[schemaId]/tables/[tableId]/records/[recordId]/[queryId].svelte"),
	() => import("../../src/routes/schema/[schemaId]/Table.svelte"),
	() => import("../../src/routes/schema/[schemaId]/views/[viewId].svelte"),
	() => import("../../src/routes/schema/[schemaId]/Cell.svelte"),
	() => import("../../src/routes/schema/[schemaId]/Tabs.svelte")
];

export const dictionary = {
	"": [[0, 2], [1]],
	"SchemaCard": [[0, 3], [1]],
	"schema/new": [[0, 4], [1]],
	"schema/[schemaId]": [[0, 5], [1]],
	"schema/[schemaId]/DataType": [[0, 6], [1]],
	"schema/[schemaId]/NavItem": [[0, 7], [1]],
	"schema/[schemaId]/SideBar": [[0, 8], [1]],
	"schema/[schemaId]/Toolbar": [[0, 9], [1]],
	"schema/[schemaId]/queries/[queryId]": [[0, 10], [1]],
	"schema/[schemaId]/queries/[queryId]/BaseTableSelector": [[0, 11], [1]],
	"schema/[schemaId]/queries/[queryId]/FormulaSettings": [[0, 12], [1]],
	"schema/[schemaId]/queries/[queryId]/SelectedColumns": [[0, 13], [1]],
	"schema/[schemaId]/queries/[queryId]/Transformations": [[0, 14], [1]],
	"schema/[schemaId]/queries/[queryId]/ColumnSelector": [[0, 15], [1]],
	"schema/[schemaId]/queries/[queryId]/ColumnSettings": [[0, 16], [1]],
	"schema/[schemaId]/queries/[queryId]/ColumnEditor": [[0, 17], [1]],
	"schema/[schemaId]/queries/[queryId]/TablePreview": [[0, 18], [1]],
	"schema/[schemaId]/queries/[queryId]/ColumnGroup": [[0, 19], [1]],
	"schema/[schemaId]/queries/[queryId]/Parameters": [[0, 20], [1]],
	"schema/[schemaId]/queries/[queryId]/Column": [[0, 21], [1]],
	"schema/[schemaId]/queries/[queryId]/Source": [[0, 22], [1]],
	"schema/[schemaId]/queries/[queryId]/Step": [[0, 23], [1]],
	"schema/[schemaId]/Column": [[0, 24], [1]],
	"schema/[schemaId]/Editor": [[0, 25], [1]],
	"schema/[schemaId]/tables/DataTypeSettings": [[0, 26], [1]],
	"schema/[schemaId]/tables/SelectionActions": [[0, 27], [1]],
	"schema/[schemaId]/tables/LinkTableWizard": [[0, 28], [1]],
	"schema/[schemaId]/tables/RecordSelector": [[0, 29], [1]],
	"schema/[schemaId]/tables/LinkTableForm": [[0, 30], [1]],
	"schema/[schemaId]/tables/ColumnCard": [[0, 31], [1]],
	"schema/[schemaId]/tables/ImportData": [[0, 32], [1]],
	"schema/[schemaId]/tables/Inspector": [[0, 33], [1]],
	"schema/[schemaId]/tables/Question": [[0, 34], [1]],
	"schema/[schemaId]/tables/Design": [[0, 35], [1]],
	"schema/[schemaId]/tables/Filter": [[0, 36], [1]],
	"schema/[schemaId]/tables/Popup": [[0, 37], [1]],
	"schema/[schemaId]/tables/Query": [[0, 38], [1]],
	"schema/[schemaId]/tables/[tableId]": [[0, 39], [1]],
	"schema/[schemaId]/tables/[tableId]/records/RecordNavigation": [[0, 40, 41], [1]],
	"schema/[schemaId]/tables/[tableId]/records/[recordId]": [[0, 40, 42], [1]],
	"schema/[schemaId]/tables/[tableId]/records/[recordId]/EmbeddedQueries": [[0, 40, 43], [1]],
	"schema/[schemaId]/tables/[tableId]/records/[recordId]/[queryId]": [[0, 40, 44], [1]],
	"schema/[schemaId]/Table": [[0, 45], [1]],
	"schema/[schemaId]/views/[viewId]": [[0, 46], [1]],
	"schema/[schemaId]/Cell": [[0, 47], [1]],
	"schema/[schemaId]/Tabs": [[0, 48], [1]]
};