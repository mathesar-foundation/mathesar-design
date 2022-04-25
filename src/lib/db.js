var data = {
    tables: [],
    schemas: [],
    //patients: [],
    //prescribers: [],
    //runs: [],
    //reports: []
  };
  
  async function initialize() {
      let tables = await loadTables();
      let schemas = await loadSchemas();
    //let patients = await loadPatients();
    //let prescribers = await loadPrescribers();
    //let runs = await loadRuns();
    //let reports = await loadReports(patients, prescribers, runs);
    
    data = { tables, schemas };
    //data = { patients, prescribers, runs, reports };
  }

  async function loadTables() {
      let response = await fetch('/data/tables.json');
      let tables = await response.json();

      return tables;
  }

  async function loadSchemas() {
      let response = await fetch('/data/schemas.json');
      let schemas = await response.json();

      return schemas;
  }
  
  //async function loadPatients() {
  //  let response = await fetch('/data/patients.json');
  //  let patients = await response.json();
  //
  //  validateIds("Patients", patients);
  //
  //  return patients;
  //}
  
  //async function loadPrescribers() {
  //  let response = await fetch('/data/prescribers.json');
  //  let prescribers = await response.json();
  //
  //  validateIds("Prescribers", prescribers);
  //
  //  return prescribers;
  //}
  
  //async function loadRuns() {
  //  let response = await fetch('/data/runs.json');
  //  let runs = await response.json();
  //
  //  validateIds("Runs", runs);
  //
  //  return runs.map(r => ({...r, reports: []}));
  //}
  
  //async function loadReports(patients, prescribers, runs) {
  //  let response = await fetch('/data/reports.json');
  //  let reports = await response.json();
  //
  //  return reports.map(report => loadReport(patients, prescribers, runs, report));
  //}
  
  //function loadReport(patients, prescribers, runs, report) {
    // Fetch full objects based on given id
    //report.patient = findById('Patients', patients, report.patientId);
    //report.prescriber = findById('Prescribers', prescribers, report.prescriberId);
    //report.alternatives = getAlternativesList(report);
  //
    //report.run = findById('Runs', runs, report.runId);
    //report.run.reports.push(report);
  
    //if (report.recommendation && report.recommendation.type == 'switch') {
      // The .json stores a number to avoid duplicating/using invalid name
      //let idx = report.recommendation.medication;
  
      //if (report.alternatives.length < idx) {
        //throw `The index ${idx} is not valid for report ${report.id}`;
      //}
  
      //report.recommendation.medication = report.alternatives[idx - 1].name;
    //}
  
    //return report;
  //}
  
  //export function getAlternativesList(report) {
  //  let alternatives = [report.alternative1, report.alternative2, report.alternative3];
  //
  //  return alternatives.filter(alt => !!alt && !!alt.name.trim());
  //}
  
  //function validateIds(name, items) {
  //  let validIds = [...Array(items.length).keys()].map(x => x + 1);
  //  let realIds = items.map(it => it.id);
  //
  //  if (JSON.stringify(validIds) != JSON.stringify(realIds)) {
  //    throw `The ids in ${name} must be unique and in sequential order`;
  //  }
  //}
  
  //function findById(name, items, id) {
  //  let item = items.find(it => it.id == id);
  //
  //  if (!item) {
  //    throw `The id ${id} does not exist in ${name}`;
  //  }
  //
  //  return item;
  //}
  //
    async function getTables(schema) {
        return data.tables.find(table => table.schemaId == schema);
    }

    async function getSchemas() {
    return data.schemas;
    }

  //async function getPatients() {
  //  return data.patients;
  //}
  //
  //async function getPrescribers() {
  //  return data.prescribers;
  //}
  //
  //async function getRuns() {
  //  return data.runs;
  //}
  //
  async function getSchema(id) {
    return data.schemas.find(schema => schema.id == id);
  }
  //
  //async function getReports() {
  //  return data.reports;
  //}
  //
  //async function getReport(id) {
  //  return data.reports.find(run => run.id == id);
  //}
  //
  export default {
    initialize,
    getTables,
    getSchemas,
    getSchema
  //  getRuns,
  //  getRun,
  //  getPatients,
  //  getPrescribers,
  //  getReports,
  //  getReport
  };
  //