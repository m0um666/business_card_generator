console.log("SCRIPT OK");
// Génération de la carte de visite
document.getElementById("businessCardForm").addEventListener("submit", function (e) {
    e.preventDefault();

    document.getElementById("cardName").textContent = document.getElementById("name").value;
    document.getElementById("cardPhone").textContent = "📞 " + document.getElementById("phone").value;
    document.getElementById("cardEmail").textContent = "✉️ " + document.getElementById("email").value;
    document.getElementById("cardJob").textContent = "💼 " + document.getElementById("job").value;
    document.getElementById("cardPostalCode").textContent = "📍 " + document.getElementById("postalCode").value;

    const photo = document.getElementById("profilePic").files[0];

    if (photo) {
        const reader = new FileReader();

        reader.onload = function (event) {
            document.getElementById("cardPhoto").src = event.target.result;
            document.getElementById("cardPhoto").style.display = "block";
        };

        reader.readAsDataURL(photo);
    } else {
        document.getElementById("cardPhoto").style.display = "none";
    }

    document.getElementById("cardPreview").style.display = "block";
    document.getElementById("downloadBtn").style.display = "inline-block";
});


// Télécharger en PDF
document.getElementById("downloadBtn").addEventListener("click", async function () {

    const element = document.getElementById("cardPreview");

    const clone = element.cloneNode(true);

    clone.style.display = "block";
    clone.style.visibility = "visible";
    clone.style.position = "absolute";
    clone.style.left = "-9999px";
    clone.style.top = "0";
    clone.style.background = "#ffffff";
    clone.style.color = "#000000";
   clone.style.width = "350px";
    clone.style.height = "200px";
    clone.style.padding = "15px";
    clone.style.overflow = "hidden";

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
    orientation: "landscape",
    unit: "px",
    format: [400, 250]
});

        pdf.addImage(
    imgData,
    "PNG",
    25,
    25,
    350,
    200
);
        pdf.save("carte_de_visite.pdf");

    } catch (error) {

        console.error("Erreur PDF :", error);

    }

    clone.remove();
});


// Date et heure
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
