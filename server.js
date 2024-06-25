const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.json());

function readData() {
    const rawData = fs.readFileSync('data.json');
    return JSON.parse(rawData);
}

function writeData(data) {
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
}

// Endpunkt: Anzahl der verfügbaren Lämmer abrufen
app.get('/api/lamb-count', (req, res) => {
    const data = readData();
    res.json({ count: data.availableLambs });
});

// Endpunkt: Verfügbare Abholdaten abrufen
app.get('/api/pickup-dates', (req, res) => {
    const data = readData();
    res.json({ dates: data.pickupDates });
});

// Endpunkt: Lamm-Bestellung aufgeben
app.post('/api/order-lamb', (req, res) => {
    const { firstName, lastName, pickupPerson, pickupDate } = req.body;
    const data = readData();

    if (data.availableLambs > 0) {
        data.availableLambs--;
        writeData(data);
        res.status(200).json({ message: 'Bestellung erfolgreich' });
    } else {
        res.status(400).json({ message: 'Keine Lämmer mehr verfügbar' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});
