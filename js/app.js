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
        let texto = textoInput.value; // Obtener el valor del input
        textoConvertido = texto; // Asignar el valor del input a textoConvertido
        textoUsuario.value = ''
        conversiones.forEach(conversion => {
            textoConvertido = textoConvertido.replaceAll(conversion[indice1], conversion[indice2]);
        });
        
        if (texto !== '') {
            resultado.style.backgroundImage = 'none';
            resultado.textContent = textoConvertido;
            mensajesPrevios.forEach(mensaje => {
            mensaje.style.visibility = 'hidden';
            mensajeCopiado.style.opacity = '0%'
            });
        }
    }
    

    encriptar.addEventListener('click', (e) => {
        encriptacion(textoUsuario, 0, 1)

        
    })
    desencriptar.addEventListener('click', (e) => {
        encriptacion(textoUsuario, 1, 0)

    });
    document.getElementById("copy").addEventListener("click", function () {
        let copyText = resultado;
        copyText.select();
        navigator.clipboard.writeText(copyText.value);
        mensajeCopiado.style.opacity = '100%'
        window.getSelection().removeAllRanges();

    });

});
