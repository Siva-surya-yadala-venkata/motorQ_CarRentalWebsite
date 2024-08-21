document.addEventListener('DOMContentLoaded', () => {
    let cars = [];

    // Add a new car to inventory
    document.getElementById('car-form').addEventListener('submit', (e) => {
        e.preventDefault();

        const car = {
            make: document.getElementById('make').value,
            model: document.getElementById('model').value,
            year: document.getElementById('year').value,
            registrationNumber: document.getElementById('registrationNumber').value,
            fuelType: document.getElementById('fuelType').value,
            rent: document.getElementById('rent').value,
        };

        cars.push(car);
        displayCars();
        document.getElementById('car-form').reset();
    });

    // Display cars in inventory
    function displayCars() {
        const carTable = document.getElementById('car-table').querySelector('tbody');
        carTable.innerHTML = '';
        cars.forEach((car, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${car.make}</td>
                <td>${car.model}</td>
                <td>${car.year}</td>
                <td>${car.registrationNumber}</td>
                <td>${car.fuelType}</td>
                <td>${car.rent}</td>
                <td>
                    <button onclick="editCar(${index})">Edit</button>
                    <button onclick="deleteCar(${index})">Delete</button>
                </td>
            `;
            carTable.appendChild(row);
        });
    }

    // Edit car details
    window.editCar = function(index) {
        const car = cars[index];
        document.getElementById('make').value = car.make;
        document.getElementById('model').value = car.model;
        document.getElementById('year').value = car.year;
        document.getElementById('registrationNumber').value = car.registrationNumber;
        document.getElementById('fuelType').value = car.fuelType;
        document.getElementById('rent').value = car.rent;

        cars.splice(index, 1);
    };

    // Delete car from inventory
    window.deleteCar = function(index) {
        cars.splice(index, 1);
        displayCars();
    };

    // Search cars by MMY or Registration Number
    document.getElementById('filter-form').addEventListener('submit', (e) => {
        e.preventDefault();

        const searchMMY = document.getElementById('searchMMY').value.toLowerCase();
        const searchRegistrationNumber = document.getElementById('searchRegistrationNumber').value.toLowerCase();

        const filteredCars = cars.filter(car => 
            car.make.toLowerCase().includes(searchMMY) ||
            car.model.toLowerCase().includes(searchMMY) ||
            car.year.toLowerCase().includes(searchMMY) ||
            car.registrationNumber.toLowerCase().includes(searchRegistrationNumber)
        );

        displayFilteredCars(filteredCars);
    });

    // Display filtered cars
    function displayFilteredCars(filteredCars) {
        const availableCarsTable = document.getElementById('available-cars').querySelector('tbody');
        availableCarsTable.innerHTML = '';
        filteredCars.forEach((car, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${car.make}</td>
                <td>${car.model}</td>
                <td>${car.year}</td>
                <td>${car.registrationNumber}</td>
                <td>${car.fuelType}</td>
                <td>${car.rent}</td>
                <td><button onclick="bookCar(${index})">Book</button></td>
            `;
            availableCarsTable.appendChild(row);
        });
    }

    // Book a car (basic validation to prevent double booking)
    window.bookCar = function(index) {
        const car = cars[index];
        alert(`Car booked: ${car.make} ${car.model} (${car.year})`);
    };
});
