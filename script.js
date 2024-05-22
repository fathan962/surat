document.getElementById('downloadWord').addEventListener('click', downloadWord);
document.getElementById('downloadPDF').addEventListener('click', downloadPDF);

function downloadWord() {
    fetch('data/database.json')
        .then(response => response.json())
        .then(data => {
            let content = JSON.stringify(data, null, 2);
            let blob = new Blob(['\ufeff', content], {
                type: 'application/msword'
            });
            saveAs(blob, 'data.doc');
        })
        .catch(error => console.error('Error fetching JSON:', error));
}

function downloadPDF() {
    fetch('data/database.json')
        .then(response => response.json())
        .then(data => {
            let doc = new jspdf.jsPDF();
            let content = JSON.stringify(data, null, 2);
            doc.text(content, 10, 10);
            doc.save('data.pdf');
        })
        .catch(error => console.error('Error fetching JSON:', error));
}
