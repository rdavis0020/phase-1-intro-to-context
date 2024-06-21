function createEmployeeRecord(arr) {
    let employeeRecord = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
    return employeeRecord;
}

function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
}

function createTimeInEvent(employeeRecord, dateTimeString) {
    let [date, hour] = dateTimeString.split(" ");

    let timeInEvent = {
        type: "TimeIn",
        date: date,
        hour: parseInt(hour,)
    };

    employeeRecord.timeInEvents.push(timeInEvent);
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateTimeString) {
    let [date, hour] = dateTimeString.split(" ");

    let timeOutEvent = {
        type: "TimeOut",
        date: date,
        hour: parseInt(hour,)
    };

    employeeRecord.timeOutEvents.push(timeOutEvent);
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
    let timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    let timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);

    return (timeOutEvent.hour - timeInEvent.hour) / 100;
}

function wagesEarnedOnDate(employeeRecord, date) {
    let hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
    let datesWorked = employeeRecord.timeInEvents.map(event => event.date);

    let totalWages = datesWorked.reduce((total, date) => {
        return total + wagesEarnedOnDate(employeeRecord, date);
    }, 0);

    return totalWages;
}

function allWagesFor(employeeRecord) {
    let datesWorked = [...new Set(employeeRecord.timeInEvents.map(event => event.date))];

    let totalWages = datesWorked.reduce((total, date) => {
        return total + wagesEarnedOnDate(employeeRecord, date);
    }, 0);

    return totalWages;
}

function calculatePayroll(employeeRecords) {
    let totalPayroll = employeeRecords.reduce((total, employeeRecord) => {
        return total + allWagesFor(employeeRecord);
    }, 0);

    return totalPayroll;

}