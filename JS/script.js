
// Lista donde se guardan las preguntas y sus respuestas
const listaTarjetas = [
    {
        pregunta: "¿Qué es una variable?",
        respuesta: "Es un espacio donde podemos guardar información."
    },
    {
        pregunta: "¿Qué es JavaScript?",
        respuesta: "Es un lenguaje de programacion que permite crear paginas interactivas."
    },
    {
        pregunta: "¿Qué es HTML?",
        respuesta: "Es el lenguaje que se utiliza para crear la estructura de una pagina web."
    },
    {
        pregunta: "¿Qué es CSS?",
        respuesta: "Es el lenguaje que permite darle estilos y colores a una pagina web."
    },
    {
        pregunta: "¿Qué es un número?",
        respuesta: "Es un tipo de dato que representa cantidades, como 10 o 25."
    },
    {
        pregunta: "¿Qué es un string?",
        respuesta: "Es un dato que contiene texto, por ejemplo Hola."
    },
    {
        pregunta: "¿Qué es un array?",
        respuesta: "Es una lista que permite guardar varios elementos."
    },
    {
        pregunta: "¿Qué es un objeto?",
        respuesta: "Es una estructura que guarda datos mediante propiedades."
    },
    {
        pregunta: "¿Qué es una función?",
        respuesta: "Es un bloque de codigo que realiza una tarea."
    },
    {
        pregunta: "¿Para qué sirve console.log()?",
        respuesta: "Sirve para mostrar informacion en la consola."
    },
    {
        pregunta: "¿Qué es una condición?",
        respuesta: "Es una expresion que permite tomar decisiones en el codigo."
    },
    {
        pregunta: "¿Para qué sirve if?",
        respuesta: "Sirve para ejecutar instrucciones cuando se cumple una condicion."
    },
    {
        pregunta: "¿Qué es un bucle?",
        respuesta: "Es una instruccion que permite repetir un bloque de codigo."
    },
    {
        pregunta: "¿Qué hace push()?",
        respuesta: "Agrega un nuevo elemento al final de una lista."
    },
    {
        pregunta: "¿Qué es el DOM?",
        respuesta: "Es la representacion de la pagina HTML que JavaScript puede modificar."
    },
    {
        pregunta: "¿Qué es un evento?",
        respuesta: "Es una accion que ocurre en la pagina, como hacer clic en un boton."
    },
    {
        pregunta: "¿Qué significa true?",
        respuesta: "Representa un valor verdadero."
    },
    {
        pregunta: "¿Qué significa false?",
        respuesta: "Representa un valor falso."
    },
    {
        pregunta: "¿Qué es null?",
        respuesta: "Es un valor que representa la ausencia intencional de informacion."
    },
    {
        pregunta: "¿Qué es una constante?",
        respuesta: "Es una variable cuyo valor no se puede reasignar."
    }
];


// Creamos la aplicacion utilizando Vue
const aplicacion = Vue.createApp({

    // data contiene los datos que utiliza la aplicacion
    data() {
        return {

            // Guardamos las preguntas dentro de Vue
            tarjetas: listaTarjetas,

            // Indica la posicion de la tarjeta actual
            indice: 0,

            // Controla si se muestra la pregunta o la respuesta
            mostrarRespuesta: false
        };
    },

    // Aqui se escriben las funciones que realizan las acciones
    methods: {

        // Avanza a la siguiente tarjeta
        siguiente() {

            // Comprobamos que no estemos en la ultima tarjeta
            if (this.indice < this.tarjetas.length - 1) {

                this.indice++;

                // Al cambiar de tarjeta mostramos nuevamente la pregunta
                this.mostrarRespuesta = false;
            }
        },

        // Regresa a la tarjeta anterior
        anterior() {

            // Verificamos que no estemos en la primera tarjeta
            if (this.indice > 0) {

                this.indice--;

                this.mostrarRespuesta = false;
            }
        },

        // Cambia entre la pregunta y la respuesta
        voltear() {

            // El signo ! cambia el valor por su contrario
            this.mostrarRespuesta = !this.mostrarRespuesta;
        }
    }
});


// COMPONENTE DE PROGRESO
// Recibe la posicion actual y la cantidad total de tarjetas
aplicacion.component("progreso", {

    // Props son los datos que recibe desde la aplicacion principal
    props: ["indice", "total"],

    // Calculamos el porcentaje de avance
    computed: {

        porcentaje() {

            // Sumamos uno porque las posiciones empiezan desde cero
            // Despues dividimos entre el total y multiplicamos por 100
            return Math.round(((this.indice + 1) / this.total) * 100);
        }
    },

    // Estructura HTML que muestra la barra de progreso
    template: `
        <div class="progreso-contenedor">

            <div class="progreso-fondo">

                <!-- El ancho cambia dependiendo del porcentaje -->
                <div
                    class="progreso-actual"
                    :style="{ width: porcentaje + '%' }">
                </div>

            </div>

            <!-- Mostramos el porcentaje y la posicion -->
            <span>{{ porcentaje }}%</span>
            <span>{{ indice + 1 }} de {{ total }}</span>

        </div>
    `
});


// COMPONENTE DE LA TARJETA
// Recibe el texto que debe mostrar
aplicacion.component("mi-tarjeta", {

    props: ["texto"],

    // Muestra el contenido dentro de una tarjeta
    template: `
        <div class="tarjeta-contenido">
            <p>{{ texto }}</p>
        </div>
    `
});


// COMPONENTE DE LOS BOTONES
// Se encarga de avisar cuando el usuario hace clic
aplicacion.component("controles", {

    // Recibe el estado de la respuesta
    props: ["mostrarRespuesta"],

    // Estos son los eventos que puede enviar al componente principal
    emits: ["anterior", "voltear", "siguiente"],

    // Estructura de los tres botones
    template: `
        <div class="controles">

            <!-- Envia el evento para retroceder -->
            <button @click="$emit('anterior')">
                ‹ Anterior
            </button>

            <!-- Envia el evento para mostrar u ocultar la respuesta -->
            <button @click="$emit('voltear')">
                {{ mostrarRespuesta ? "Ocultar respuesta" : "Ver respuesta" }}
            </button>

            <!-- Envia el evento para avanzar -->
            <button @click="$emit('siguiente')">
                Siguiente ›
            </button>

        </div>
    `
});


// Finalmente conectamos Vue con el contenedor del HTML
// A partir de aqui Vue controla todo lo que esta dentro de #contenedor
aplicacion.mount("#contenedor");
