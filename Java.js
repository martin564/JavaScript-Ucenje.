/*
Да се креира хиерархија на класи за водење на евиденција за лаборатории во еден факултет. За секоја лабораторија е познато името на лабораторијата, името на институтот на кој припаѓа и бројот на работни места во неа. Почетната вредност на лабораторијата е 120000 денари,
а се зголемува за 5% за секое работно место. Лабораториите може да бидат софтверски или хардверски.
За софтверска лабораторија дополнително се чува бројот на софтверите кои се дел од лабораторијата (максимум 15),
низа со насловите на секој софтвер и низа од индикатори која кажува дали софтверот е лиценциран или слободен.
Вкупната вредност на софтверската лабораторија се одредува со тоа што почетната вредност лабораторијата се зголемува 5000 денари по работно место ако софтверот е лиценциран и 5 денари по работно место ако софтверот е слободен.
За хардверска лабораторија дополнително се чува информација за типот на хардверска лабораторија (високострујна или нискострујна), бројот на парчиња хардвер кои се дел од лабораторијата (максимум 30) и низа со цените на секое парче хардвер.
Вредноста на лабораторијата со алати се добива со тоа што на почетната вредност и се додава 100000 ако е високострујна или 2000 ако е нискострујна а потоа на сумата се додава цената на секое од парчињата хардвер што се дел од лабораторијата.
Во секоја од класите да се дефинира конструктор со параметри, методи за печатење на сите информации за објект од соодветната класа и метода за пресметка на вредноста на објект од соодветната класа. */



// Базна класа за лабораторија
class Laboratory {
    constructor(name, institute, workstations) {
        this.name = name;
        this.institute = institute;
        this.workstations = workstations;
        this.baseValue = 120000;
    }

    // Метод за пресметка на вредноста на лабораторијата
    calculateValue() {
        return this.baseValue + this.workstations * (this.baseValue * 0.05);
    }

    // Метод за печатење информации за лабораторијата
    printInfo() {
        console.log(`Name: ${this.name}`);
        console.log(`Institute: ${this.institute}`);
        console.log(`Workstations: ${this.workstations}`);
        console.log(`Base Value: ${this.baseValue} denars`);
    }
}

// Класа за софтверска лабораторија
class SoftwareLaboratory extends Laboratory {
    constructor(name, institute, workstations, softwareTitles, isLicensed) {
        super(name, institute, workstations);
        this.softwareTitles = softwareTitles.slice(0, 15); // Максимум 15 софтвери
        this.isLicensed = isLicensed.slice(0, 15); // Максимум 15 лиценцирани
    }

    // Метод за пресметка на вредноста на софтверската лабораторија
    calculateValue() {
        let value = super.calculateValue();
        for (let i = 0; i < this.softwareTitles.length; i++) {
            if (this.isLicensed[i]) {
                value += 5000 * this.workstations;
            } else {
                value += 5 * this.workstations;
            }
        }
        return value;
    }

    // Метод за печатење информации
    printInfo() {
        super.printInfo();
        console.log("Software Titles:");
        this.softwareTitles.forEach((title, index) => {
            console.log(`  - ${title} (${this.isLicensed[index] ? "Licensed" : "Free"})`);
        });
        console.log(`Total Value: ${this.calculateValue()} denars`);
    }
}

// Класа за хардверска лабораторија
class HardwareLaboratory extends Laboratory {
    constructor(name, institute, workstations, hardwareType, hardwarePrices) {
        super(name, institute, workstations);
        this.hardwareType = hardwareType; // "high" или "low"
        this.hardwarePrices = hardwarePrices.slice(0, 30); // Максимум 30 парчиња хардвер
    }

    // Метод за пресметка на вредноста на хардверската лабораторија
    calculateValue() {
        let value = super.calculateValue();
        value += this.hardwareType === "high" ? 100000 : 2000;
        value += this.hardwarePrices.reduce((sum, price) => sum + price, 0);
        return value;
    }

    // Метод за печатење информации
    printInfo() {
        super.printInfo();
        console.log(`Hardware Type: ${this.hardwareType === "high" ? "High Voltage" : "Low Voltage"}`);
        console.log("Hardware Prices:");
        this.hardwarePrices.forEach((price, index) => {
            console.log(`  - Piece ${index + 1}: ${price} denars`);
        });
        console.log(`Total Value: ${this.calculateValue()} denars`);
    }
}

// Пример за користење
const softwareLab = new SoftwareLaboratory(
    "Software Lab 1",
    "Institute of Computer Science",
    10,
    ["Software A", "Software B", "Software C"],
    [true, false, true]
);

const hardwareLab = new HardwareLaboratory(
    "Hardware Lab 1",
    "Institute of Electronics",
    5,
    "high",
    [30000, 45000, 25000, 10000]
);

console.log("Software Laboratory Info:");
softwareLab.printInfo();
console.log("\nHardware Laboratory Info:");
hardwareLab.printInfo();
