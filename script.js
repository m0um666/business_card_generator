document.getElementById("downloadBtn").addEventListener("click", async function() {

    const element = document.getElementById("cardPreview");


    // Clone pour capture
    const clone = element.cloneNode(true);

    clone.style.display = "block";
    clone.style.visibility = "visible";
    clone.style.position = "absolute";
    clone.style.left = "-9999px";
    clone.style.top = "0";
    clone.style.background = "white";
    clone.style.color = "black";
    clone.style.width = "350px";
    clone.style.height = "200px";
    clone.style.opacity = "1";


    document.body.appendChild(clone);



    await new Promise(resolve => setTimeout(resolve, 300));


    try {


        const canvas = await html2canvas(clone, {

            backgroundColor: "#ffffff",

            scale: 3

        });



        const imgData = canvas.toDataURL("image/png");



        const { jsPDF } = window.jspdf;



        // Vraie taille carte de visite
        const pdf = new jsPDF({

            orientation: "landscape",

            unit: "mm",

            format: [85, 55]

        });



        pdf.addImage(

            imgData,

            "PNG",

            0,

            0,

            85,

            55

        );



        pdf.save("carte_de_visite.pdf");



    } catch(error) {

        console.error("Erreur PDF :", error);

    }



    clone.remove();


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
