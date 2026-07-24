document.getElementById("businessCardForm").addEventListener("submit", function(e) {

    e.preventDefault();


    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const job = document.getElementById("job").value;
    const postalCode = document.getElementById("postalCode").value;
    const profilePic = document.getElementById("profilePic").files[0];


    document.getElementById("cardName").textContent = name;
    document.getElementById("cardPhone").textContent = `Téléphone : ${phone}`;
    document.getElementById("cardEmail").textContent = `E-mail : ${email}`;
    document.getElementById("cardJob").textContent = `Métier : ${job}`;
    document.getElementById("cardPostalCode").textContent = `Code postal : ${postalCode}`;



    if (profilePic) {

        const reader = new FileReader();

        reader.onload = function(e) {
            document.getElementById("cardPhoto").src = e.target.result;
        };

        reader.readAsDataURL(profilePic);

    }



    const cardPreview = document.getElementById("cardPreview");

    cardPreview.style.display = "block";


    document.getElementById("downloadBtn").style.display = "block";


});





document.getElementById("downloadBtn").addEventListener("click", async function() {

    const element = document.getElementById("cardPreview");

    // Vérifie que la carte est visible
    element.style.display = "block";
    element.style.visibility = "visible";


    // Petite attente pour laisser le navigateur afficher la carte
    await new Promise(resolve => setTimeout(resolve, 500));


    const canvas = await html2canvas(element, {
        backgroundColor: "#ffffff",
        scale: 2
    });


    const imgData = canvas.toDataURL("image/png");


    const { jsPDF } = window.jspdf;


    const pdf = new jsPDF({
        orientation: "portrait",
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

});






function updateDateTime() {

    const dateTimeElement = document.getElementById("dateTime");


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



setInterval(updateDateTime, 1000);


updateDateTime();
