document.addEventListener('DOMContentLoaded', () => {
    const lambCountElement = document.getElementById('availableLambs');
    const form = document.getElementById('pickupDates');
    
    async function fetchLambCount() {
        try {
            const response = await fetch('https://eid-two.vercel.app/api/lamb-count');
            const text = await response.text();  // Ändere hier, um den Text zu lesen
            console.log('Serverantwort:', text); // Logge die Serverantwort
            const data = JSON.parse(text);       // Versuche, den Text als JSON zu parsen
            lambCountElement.textContent = data.count;
        } catch (error) {
            console.error('Fehler beim Abrufen der Lämmeranzahl:', error);
        }
    }
    
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        try {
            const response = await fetch('https://eid-two.vercel.app/api/lamb-count', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                alert('Bestellung erfolgreich!');
                fetchLambCount(); // Aktualisiere die Lämmeranzahl
            } else {
                alert('Fehler bei der Bestellung');
            }
        } catch (error) {
            console.error('Fehler bei der Bestellung:', error);
            alert('Fehler bei der Bestellung');
        }
    });
    
    fetchLambCount();
});
