const express = require('express');
const bodyParser = require('body-parser');
const app = express();
let availableLambs = 10; // Beispiel für verfügbare Lämmer

app.use(bodyParser.json());

app.get('/api/lamb-count', (req, res) => {
    res.json({ count: availableLambs });
});

app.post('/api/order-lamb', (req, res) => {
    const { firstName, lastName, pickupPerson, pickupDate } = req.body;
    
    if (availableLambs > 0) {
        availableLambs--;
        // Hier kannst du die Bestellung in einer Datenbank speichern
        res.status(200).json({ message: 'Bestellung erfolgreich' });
    } else {
        res.status(400).json({ message: 'Keine Lämmer mehr verfügbar' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});
