class Employee {
    constructor (name, id, email) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.title = title;
        this.department = department;
        this.salary = salary;
        this.manager = manager;
    }

    getFirstName () {
        return this.first_name;
    }
    
    getLastName () {
        return this.last_name;
    }

    getTitle () {
        return this.title;
    }

}

module.exports = Employee;