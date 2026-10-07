
// 1. Contador global para el menú
let cartCounter = 0;
const cartCounterEl = document.getElementById('cart-counter');

// 2. Lógica de la página de Registro
const termsCheckbox = document.getElementById('terminos');
const submitBtn = document.getElementById('btn-enviar');
const formRegistro = document.getElementById('form-registro');

if (termsCheckbox && submitBtn && formRegistro) {
    // El botón se habilita solo si el checkbox está marcado
    termsCheckbox.addEventListener('change', function() {
        submitBtn.disabled = !this.checked;
    });

    submitBtn.addEventListener('click', function(e) {
        e.preventDefault(); 
        
        // Verificamos por JS que no haya campos vacíos (no usamos 'required' en HTML)
        const inputs = formRegistro.querySelectorAll('input:not([type="checkbox"])');
        let todoLleno = true;
        
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                todoLleno = false;
            }
        });

        if (!todoLleno) {
            alert("Por favor, llena todos los campos antes de enviar el registro.");
        } else {
            alert("¡Registro completado con éxito! Bienvenido a nuestro Vivero.");
            formRegistro.reset();
            submitBtn.disabled = true; // Volver a deshabilitar tras reiniciar
        }
    });
}

// 3. Lógica de la página Quiénes Somos
const btnVerMas = document.getElementById('btn-ver-mas');
const infoExtra = document.getElementById('info-extra');

if (btnVerMas && infoExtra) {
    btnVerMas.addEventListener('click', function() {
        if (infoExtra.classList.contains('oculta')) {
            infoExtra.classList.remove('oculta');
            btnVerMas.textContent = "Ocultar información del equipo";
        } else {
            infoExtra.classList.add('oculta');
            btnVerMas.textContent = "Ver más sobre el proyecto";
        }
    });
}

// 4. Lógica de la página Catálogo
const botonesAgregar = document.querySelectorAll('.btn-agregar');
if (botonesAgregar.length > 0) {
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', function() {
            cartCounter++;
            if (cartCounterEl) {
                cartCounterEl.textContent = cartCounter;
            }
            alert("¡Planta agregada a tu carrito verde!");
        });
    });
}

// 5. Lógica de la página Carrito
const inputsCantidad = document.querySelectorAll('.input-qty');
const spanTotal = document.getElementById('total-precio');

function recalcularTotal() {
    let total = 0;
    inputsCantidad.forEach(input => {
        const precio = parseFloat(input.getAttribute('data-precio'));
        const cantidad = parseInt(input.value);
        
        if (!isNaN(cantidad) && cantidad >= 0) {
            total += (precio * cantidad);
        }
    });
    
    if (spanTotal) {
        spanTotal.textContent = total.toFixed(2);
    }
}

if (inputsCantidad.length > 0) {
    // Escuchar cambios en las cajitas de texto de cantidad
    inputsCantidad.forEach(input => {
        input.addEventListener('input', recalcularTotal);
    });
    // Calcular la primera vez que carga la página
    recalcularTotal(); 
}

// 6. Lógica de la página Búsqueda
const btnBuscar = document.getElementById('btn-buscar');
const inputBuscar = document.getElementById('input-busqueda');
const areaResultados = document.getElementById('area-resultados');

if (btnBuscar && inputBuscar && areaResultados) {
    btnBuscar.addEventListener('click', function() {
        const texto = inputBuscar.value.trim();
        if (texto !== '') {
            areaResultados.innerHTML = "<strong>Resultados para la búsqueda de:</strong> " + texto;
        } else {
            areaResultados.innerHTML = "Por favor, ingresa el nombre de una planta o accesorio.";
        }
    });
}
