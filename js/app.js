window.addEventListener('load', () => {
    let textoUsuario = document.querySelector('#text-input');
    let resultado = document.querySelector('.mensaje');
    let mensajesPrevios = document.querySelectorAll('.mensaje-busqueda');
    const encriptar = document.querySelector('.encriptar');
    const desencriptar = document.querySelector('.desencriptar');
    let textoConvertido;
    const mensajeCopiado = document.querySelector('.texto-copiado')
    const conversiones = [['e', 'enter'], ['i', 'imes'], ['a', 'ai'], ['o', 'ober'], ['u', 'ufat']];

    function encriptacion(textoInput, indice1, indice2) {
        let texto = textoInput.value.trim();
        textoConvertido = texto;
        textoUsuario.value = '';
        conversiones.forEach(conversion => {
            textoConvertido = textoConvertido.replaceAll(conversion[indice1], conversion[indice2]);
        });

        if (texto) {
            resultado.style.backgroundImage = 'none';
            resultado.textContent = textoConvertido;
            mensajesPrevios.forEach(mensaje => {
                mensaje.style.display = 'none';
                mensajeCopiado.style.opacity = '0%';
            });
            return true;
        } else {
            Swal.fire("¡Por favor ingresa un texto!");
            return false;
        }
    }

    function tieneMayuscula(texto) {
        return /[A-Z]/.test(texto);
    }
    function tieneAcentos(texto) {
        const acentos = /[áéíóúÁÉÍÓÚ]/;
        return acentos.test(texto);
    }
    

    function validarTexto(text) {
        if (!textoUsuario.value.trim()) {
            Swal.fire("¡Por favor ingresa un texto!");
            return false;
        }
    
        if (tieneMayuscula(textoUsuario.value)) {
            Swal.fire({
                icon: "error",
                title: "¡Arriba las manos!",
                text: "¡Intentaste usar mayúsculas!",
            });
            return false;
        }
    
        if (tieneAcentos(textoUsuario.value)) {
            Swal.fire({
                icon: "error",
                title: "¡Ups!",
                text: "¡No se permiten acentos en el texto!",
            });
            return false;
        }
    
        return true;
    }
    

    encriptar.addEventListener('click', (e) => {
        if (validarTexto(textoUsuario.value)) {
            encriptacion(textoUsuario, 0, 1);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "¡Se encriptó con exito tu texto!",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });

    desencriptar.addEventListener('click', (e) => {
        if (validarTexto(textoUsuario.value)) {
            encriptacion(textoUsuario, 1, 0);
        }
    });

    document.getElementById("copy").addEventListener("click", function () {
        let copyText = resultado;
        copyText.select();
        navigator.clipboard.writeText(copyText.value);
        mensajeCopiado.style.opacity = '100%';
        window.getSelection().removeAllRanges();
    });
});
