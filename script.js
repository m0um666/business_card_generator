// GENERATION CARTE

document
.getElementById("businessCardForm")
.addEventListener("submit",function(e){


e.preventDefault();



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



const photo =
document.getElementById("profilePic").files[0];



if(photo){


const reader=new FileReader();


reader.onload=function(e){

document.getElementById("cardPhoto").src=e.target.result;

};


reader.readAsDataURL(photo);


}



document.getElementById("cardPreview").style.display="block";


document.getElementById("downloadBtn").style.display="block";



});






// EXPORT PDF


document
.getElementById("downloadBtn")
.addEventListener("click",async function(){



const element=document.getElementById("cardPreview");



const canvas =
await html2canvas(element,{

backgroundColor:"#ffffff",

scale:3,

useCORS:true

});



const imgData =
canvas.toDataURL("image/png");



const {jsPDF}=window.jspdf;



const pdf=new jsPDF({

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







// DATE


function updateDateTime(){


const now=new Date();


document.getElementById("dateTime")
.textContent=

now.toLocaleDateString(
"fr-FR",
{

year:"numeric",

month:"long",

day:"numeric",

hour:"2-digit",

minute:"2-digit",

second:"2-digit"

}

);


}



setInterval(updateDateTime,1000);

updateDateTime();
