document.getElementById("downloadBtn").addEventListener("click", async function() {

    const element = document.getElementById("cardPreview");

    // Créer une copie visible pour html2canvas
    const clone = element.cloneNode(true);

    clone.style.display = "block";
    clone.style.visibility = "visible";
    clone.style.position = "absolute";
    clone.style.left = "-9999px";
    clone.style.top = "0";
    clone.style.background = "white";
    clone.style.color = "black";
    clone.style.width = "280px";

    document.body.appendChild(clone);


    await new Promise(resolve => setTimeout(resolve, 300));


    try {

        const canvas = await html2canvas(clone, {
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


    } catch(error) {

        console.error("Erreur PDF :", error);

    }


    // Supprimer la copie
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
