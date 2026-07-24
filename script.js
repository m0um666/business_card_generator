document.getElementById("businessCardForm").addEventListener("submit", function(e) {
    e.preventDefault();

    // Récupérer les valeurs du formulaire
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const job = document.getElementById("job").value;
    const postalCode = document.getElementById("postalCode").value;
    const profilePic = document.getElementById("profilePic").files[0];

    // Mettre à jour l'aperçu de la carte
    document.getElementById("cardName").textContent = name;
    document.getElementById("cardPhone").textContent = `Téléphone : ${phone}`;
    document.getElementById("cardEmail").textContent = `E-mail : ${email}`;
    document.getElementById("cardJob").textContent = `Métier : ${job}`;
    document.getElementById("cardPostalCode").textContent = `Code postal : ${postalCode}`;

    // Gestion de la photo
    if (profilePic) {
        const reader = new FileReader();

        reader.onload = function(e) {
            document.getElementById("cardPhoto").src = e.target.result;
        };

        reader.readAsDataURL(profilePic);
    } else {
        document.getElementById("cardPhoto").src = "";
    }

    // Afficher la carte
    const cardPreview = document.getElementById("cardPreview");

    if (cardPreview) {
        cardPreview.style.display = "block";
    }

    // Afficher le bouton téléchargement
    const downloadBtn = document.getElementById("downloadBtn");

    if (downloadBtn) {
        downloadBtn.style.display = "block";
    }
});


// Téléchargement PDF
document.getElementById("downloadBtn").addEventListener("click", async function() {

    const element = document.getElementById("cardPreview");

    if (!element) {
        console.error("Carte introuvable");
        return;
    }

    // Attendre que les images soient chargées
    const images = element.querySelectorAll("img");

    await Promise.all(
        [...images].map(img => {
            if (img.complete) return Promise.resolve();

            return new Promise(resolve => {
                img.onload = resolve;
                img.onerror = resolve;
            });
        })
    );

    try {

        const canvas = await html2canvas(element, {
            scale: 3,
            backgroundColor: "#ffffff",
            logging: true
        });

        const imgData = canvas.toDataURL("image/png");

        const { jsPDF } = window.jspdf;

        const pdf = new jsPDF({
            orientation: "landscape",
            unit: "px",
            format: [canvas.width, canvas.height]
        });

        pdf.addImage(
            imgData,
            "PNG",
            0,
            0,
            canvas.width,
            canvas.height
        );

        pdf.save("carte_de_visite.pdf");

    } catch(error) {
        console.error("Erreur PDF :", error);
    }

});

});


// Date et heure en direct
function updateDateTime() {

    const dateTimeElement = document.getElementById("dateTime");

    if (!dateTimeElement) {
        return;
    }

    const now = new Date();

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    };

    dateTimeElement.textContent = now.toLocaleDateString("fr-FR", options);
}


// Mise à jour chaque seconde
setInterval(updateDateTime, 1000);


// Initialisation
updateDateTime();
