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





document.getElementById("downloadBtn").addEventListener("click", function() {


    const element = document.getElementById("cardPreview");


    html2canvas(element).then((canvas) => {


        const imgData = canvas.toDataURL("image/png");


        // Correction jsPDF
        const { jsPDF } = window.jspdf;


        const pdf = new jsPDF();


        pdf.addImage(
            imgData,
            "PNG",
            10,
            10
        );


        pdf.save("carte_de_visite.pdf");


    });


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
