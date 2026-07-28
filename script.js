// ==============================
// GÉNÉRATION DE LA CARTE
// ==============================

document
    .getElementById("businessCardForm")
    .addEventListener("submit", function (e) {


        e.preventDefault();



        // Informations

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



        if (photo) {


            const reader = new FileReader();



            reader.onload = function (e) {

                document.getElementById("cardPhoto").src =
                    e.target.result;

            };



            reader.readAsDataURL(photo);


        }




        // Affichage de la carte

        document.getElementById("cardPreview").style.display = "block";


        document.getElementById("downloadBtn").style.display = "block";



    });









// ==============================
// EXPORT EN PDF
// ==============================

document
    .getElementById("downloadBtn")
    .addEventListener("click", async function () {



        const element =
            document.getElementById("cardPreview");



        // Correction opacité image pendant export

        const photo =
            document.getElementById("cardPhoto");



        const ancienneOpacite =
            photo.style.opacity;



        photo.style.opacity = "1";





        const canvas =
            await html2canvas(element, {


                backgroundColor:"#ffffff",


                scale:3,


                useCORS:true,


                allowTaint:true


            });





        // remettre l'opacité après capture

        photo.style.opacity =
            ancienneOpacite;






        const imgData =
            canvas.toDataURL("image/png");






        const { jsPDF } =
            window.jspdf;






        const pdf =
            new jsPDF({


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


    const now =
        new Date();





    const date =
        now.toLocaleDateString(
            "fr-FR",
            {

                weekday:"long",

                day:"2-digit",

                month:"long",

                year:"numeric"

            }
        );





    const heure =
        now.toLocaleTimeString(
            "fr-FR",
            {

                hour:"2-digit",

                minute:"2-digit",

                second:"2-digit"

            }
        );






    document.getElementById("dateTime").textContent =

        `📅 ${date} • 🕒 ${heure}`;



}






// Mise à jour toutes les secondes

setInterval(updateDateTime,1000);


// Affichage immédiat

updateDateTime();
