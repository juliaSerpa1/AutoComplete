const addressForm = document.querySelector("#address-form");
const cepInput = document.querySelector("#cep");
const addressInput = document.querySelector("#address");
const cityInput = document.querySelector("#city");
const neighborhood = document.querySelector("#neighborhood");
const regionInput = document.querySelector("#region");
const formInputs = document.querySelectorAll("[data-input]");

const closeButton = document.querySelector("#close-message");

const fadeElement = document.querySelector("#fade");

// Valida CEP input
cepInput.addEventListener("keypress", (e) => {

    const onlyNumbers = /[0-9]/;
    const key = String.fromCharCode(e.keyCode);

    // Permitir apenas números
    if(!onlyNumbers.test(key)){
        e.preventDefault();
        return;
    }
});

// Evento de pegar rua
cepInput.addEventListener("keyup", (e) => {
    const inputValue = e.target.value 

    // Checa se tem a quant. necessaria do cep
    if(inputValue.length ===8){
        getAddress(inputValue);
    }
});

//Fechar modal

closeButton.addEventListener("click", (e) => toggleMessage());

const getAddress = async (cep)=>{
    toggleLoader();

    cepInput.blur();

    const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;

    const response = await fetch(apiUrl);

    const data = await response.json();

    // Mensagem de erro e reseta formulario
    if(data.erro === "true"){

        if(!addressInput.hasAttribute("disabled")){
            toggleDisabled();
        }

        addressForm.reset();
        //toggleLoader();
        toggleMessage("Cep invalido!")
        return;
    }
    // validação de input
    if(addressInput.value === ""){
        toggleDisabled();
    }

    addressInput.value = data.logradouro;
    cityInput.value = data.localidade;
    neighborhood.value = data.bairro;
    regionInput.value = data.uf;

    toggleLoader();
};

// Adiciona ou remove atributos desabilitados
const toggleDisabled = ()=>{

    if(regionInput.hasAttribute("disabled")){
        formInputs.forEach((input) =>{
            input.removeAttribute("disabled");
        });
    }else{
        formInputs.forEach((input) => {
            input.setAttribute("disabled", "diseble");
        });
    }

}


// Mostra ou ocultar loader
const toggleLoader = () =>{
    const loaderElement = document.querySelector("#loader");

    fadeElement.classList.toggle("hide");
    loaderElement.classList.toggle("hide");
};

const toggleMessage = (msg) =>{
    const messageElement = document.querySelector("#message");

    const messageElementText = document.querySelector("#message p");

    messageElementText.innerText = msg;

    fadeElement.classList.toggle("hide");
    messageElement.classList.toggle("hide");
};
// salvando rua

addressForm.addEventListener("submit", (e)=>{
    e.preventDefault();

    toggleLoader();

    setTimeout(()=>{
        toggleLoader();

        toggleMessage("Endereço salvo com sucesso!");

        addressForm.reset();

        toggleDisabled();
    }, 1500);
})