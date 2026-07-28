// ==============================
// GÉNÉRATION DE LA CARTE
// ==============================


const form = document.getElementById("businessCardForm");

const cardPreview = document.getElementById("cardPreview");

const downloadBtn = document.getElementById("downloadBtn");



form.addEventListener("submit", function(e) {


    e.preventDefault();



    // Informations carte

    document.getElementById("cardName").textContent =
        document.getElementById("name").value;



    document.getElementById("cardPhone").textContent =
        "📞 " + document.getElementById("phone").value;



    document.getElementById("cardEmail").textContent =
        "✉️ " + document.getElementById("email").value;



    document.getElementById("cardJob").textContent =
        "💼 " + document.getElementById("job").value;



    document.getElementById("cardPostalCode").textContent =
        "📍 " + document.getElementById("postalCode").value;




    // Photo de profil

    const photo =
        document.getElementById("profilePic").files[0];



    if(photo){


        const reader = new FileReader();



        reader.onload = function(e){

            document.getElementById("cardPhoto").src =
                e.target.result;

        };


        reader.readAsDataURL(photo);


    }




    // Affichage carte

    cardPreview.style.display = "block";

setTimeout(() => {

    cardPreview.classList.add("show");

}, 50);

    downloadBtn.style.display = "block";


});






// ==============================
// EXPORT PDF
// ==============================


downloadBtn.addEventListener("click", async function(){



    const element = document.getElementById("cardPreview");

    const photo = document.getElementById("cardPhoto");



    // Sauvegarde opacité

    const ancienneOpacite = photo.style.opacity;



    photo.style.opacity = "1";




    const canvas = await html2canvas(element, {

        backgroundColor:"#ffffff",

        scale:3,

        useCORS:true,

        allowTaint:true

    });





    // Restauration

    photo.style.opacity = ancienneOpacite;





    const imgData =
        canvas.toDataURL("image/png");




    const { jsPDF } = window.jspdf;




    const pdf = new jsPDF({

        orientation:"landscape",

        unit:"px",

        format:[400,280]

    });





    pdf.addImage(

        imgData,

        "PNG",

        25,

        25,

        350,

        230

    );




    pdf.save("carte_de_visite.pdf");



});








// ==============================
// DATE & HEURE
// ==============================


function updateDateTime(){


    const now = new Date();




    const date =
        now.toLocaleDateString("fr-FR", {

            weekday:"long",

            day:"2-digit",

            month:"long",

            year:"numeric"

        });





    const heure =
        now.toLocaleTimeString("fr-FR", {

            hour:"2-digit",

            minute:"2-digit",

            second:"2-digit"

        });





    document.getElementById("dateTime").textContent =

        `📅 ${date} • 🕒 ${heure}`;



}




setInterval(updateDateTime,1000);


updateDateTime();
