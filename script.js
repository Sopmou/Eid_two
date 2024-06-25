document.addEventListener('DOMContentLoaded', () => {
    const lambCountElement = document.getElementById('lambCount');
    const form = document.getElementById('lambOrderForm');
    
    async function fetchLambCount() {
        try {
            const response = await fetch('eid-two.vercel.app/api/lamb-count');
            const data = await response.json();
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
        const response = await fetch('https://formspree.io/f/mzbnnwkp', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
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
