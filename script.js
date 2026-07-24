document.getElementById("businessCardForm").addEventListener("submit", function(e) {

    e.preventDefault();


    // Récupération des données
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const job = document.getElementById("job").value;
    const postalCode = document.getElementById("postalCode").value;
    const profilePic = document.getElementById("profilePic").files[0];


    // Affichage dans la carte
    document.getElementById("cardName").textContent = name;
    document.getElementById("cardPhone").textContent = "Téléphone : " + phone;
    document.getElementById("cardEmail").textContent = "E-mail : " + email;
    document.getElementById("cardJob").textContent = "Métier : " + job;
    document.getElementById("cardPostalCode").textContent = "Code postal : " + postalCode;



    // Gestion de la photo
    if (profilePic) {

        const reader = new FileReader();

        reader.onload = function(event) {

            document.getElementById("cardPhoto").src = event.target.result;

        };

        reader.readAsDataURL(profilePic);

    }



    // Afficher la carte
    const cardPreview = document.getElementById("cardPreview");

    cardPreview.style.display = "block";


    // Afficher bouton PDF
    document.getElementById("downloadBtn").style.display = "block";


});





// =============================
// TELECHARGEMENT PDF
// =============================

document.getElementById("downloadBtn").addEventListener("click", async function() {


    const card = document.getElementById("cardPreview");


    // Attendre le rendu
    await new Promise(resolve => setTimeout(resolve, 500));



    const canvas = await html2canvas(card, {

        scale: 3,

        backgroundColor: "#ffffff",

        useCORS: true

    });



    const image = canvas.toDataURL("image/png");



    const { jsPDF } = window.jspdf;



    // Taille carte de visite standard
    const pdf = new jsPDF({

        orientation: "landscape",

        unit: "mm",

        format: [85, 55]

    });



    pdf.addImage(

        image,

        "PNG",

        0,

        0,

        85,

        55

    );



    pdf.save("carte_de_visite.pdf");


});





// =============================
// DATE ET HEURE
// =============================

function updateDateTime() {


    const dateTimeElement = document.getElementById("dateTime");


    if (!dateTimeElement) return;



    const now = new Date();



    const options = {

        year: "numeric",

        month: "long",

        day: "numeric",

        hour: "2-digit",

        minute: "2-digit",

        second: "2-digit"

    };



    dateTimeElement.textContent =
        now.toLocaleDateString("fr-FR", options);


}



setInterval(updateDateTime, 1000);


updateDateTime();
