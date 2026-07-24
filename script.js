document.getElementById("businessCardForm").addEventListener("submit", function(e) {

    e.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const job = document.getElementById("job").value;
    const postalCode = document.getElementById("postalCode").value;
    const profilePic = document.getElementById("profilePic").files[0];


    document.getElementById("cardName").textContent = name;
    document.getElementById("cardPhone").textContent = "Téléphone : " + phone;
    document.getElementById("cardEmail").textContent = "E-mail : " + email;
    document.getElementById("cardJob").textContent = "Métier : " + job;
    document.getElementById("cardPostalCode").textContent = "Code postal : " + postalCode;


    if (profilePic) {

        const reader = new FileReader();

        reader.onload = function(event) {
            document.getElementById("cardPhoto").src = event.target.result;
        };

        reader.readAsDataURL(profilePic);
    }


    document.getElementById("cardPreview").style.display = "block";
    document.getElementById("downloadBtn").style.display = "block";

});





// TELECHARGEMENT PDF

document.getElementById("downloadBtn").addEventListener("click", async function() {


    const card = document.getElementById("cardPreview");


    // Attendre que tout soit affiché
    await new Promise(resolve => setTimeout(resolve, 500));


    const canvas = await html2canvas(card, {

        scale: 3,
        backgroundColor: "#ffffff",

        useCORS: true,

        allowTaint: true

    });



    const image = canvas.toDataURL("image/png");



    const { jsPDF } = window.jspdf;



    const pdf = new jsPDF({

        orientation: "portrait",

        unit: "px",

        format: [
            canvas.width,
            canvas.height
        ]

    });



    pdf.addImage(

        image,

        "PNG",

        0,

        0,

        canvas.width,

        canvas.height

    );



    pdf.save("carte_de_visite.pdf");


});





// DATE ET HEURE

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
