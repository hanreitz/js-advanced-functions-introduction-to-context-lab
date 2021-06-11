// Your code here
function createEmployeeRecord (empDataArray) {
  const [firstName, familyName, title, payPerHour] = empDataArray
  const empRecord = Object.assign ({}, 
    { firstName: firstName },
    { familyName: familyName },
    { title: title },
    { payPerHour: payPerHour },
    { timeInEvents: [] },
    { timeOutEvents: [] }
    )
  return empRecord
}

function createEmployeeRecords (csvData) {
  const empArray = csvData.map(createEmployeeRecord)
  return empArray
}

function findEmployeeByFirstName (empRecords, nameStr) {
  return empRecords.find(e => e.firstName === nameStr)
}

function createTimeInEvent (empRecord, str) {
  const timeObj = {
    type : 'TimeIn',
    date : str.split(' ')[0],
    hour : parseInt(str.split(' ')[1])
  }
  empRecord.timeInEvents.push(timeObj)
  return empRecord
}

function createTimeOutEvent (empRecord, str) {
  const timeObj = {
    type : 'TimeOut',
    date : str.split(' ')[0],
    hour : parseInt(str.split(' ')[1])
  }
  empRecord.timeOutEvents.push(timeObj)
  return empRecord
}

function hoursWorkedOnDate (empRecord, dateStr) {
  const clockIn = empRecord.timeInEvents.find(r => r.date === dateStr).hour
  const clockOut = empRecord.timeOutEvents.find(r => r.date === dateStr).hour
  return (clockOut - clockIn)/100
}

function wagesEarnedOnDate (empRecord, dateStr) {
  const hoursWorked = hoursWorkedOnDate(empRecord, dateStr)
  const hourlyWage = empRecord.payPerHour
  return hoursWorked * hourlyWage
}

function allWagesFor (empRecord) {
  const dateArray = empRecord.timeInEvents.map(e => e.date)
  return dateArray.reduce((i, d) => i + wagesEarnedOnDate(empRecord, d), 0)
}

function calculatePayroll (empRecordsArray) {
  return empRecordsArray.reduce((i, e) => i + allWagesFor(e), 0)
}

