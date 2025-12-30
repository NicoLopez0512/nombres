document.addEventListener("DOMContentLoaded", cargarRegistros);

function agregarRegistro() {
    const fecha = document.getElementById("fechaInput").value;
    const nombre = document.getElementById("nombreInput").value.trim();

    if (fecha === "" || nombre === "") {
        alert("Debes ingresar fecha y nombre");
        return;
    }

    let registros = JSON.parse(localStorage.getItem("registros")) || [];

    registros.push({
        fecha: fecha,
        nombre: nombre
    });

    localStorage.setItem("registros", JSON.stringify(registros));

    document.getElementById("nombreInput").value = "";
    mostrarRegistros();
}

function cargarRegistros() {
    mostrarRegistros();
}

function mostrarRegistros() {
    const tabla = document.getElementById("tablaRegistros");
    tabla.innerHTML = "";

    let registros = JSON.parse(localStorage.getItem("registros")) || [];

    registros.forEach(registro => {
        const fila = document.createElement("tr");

        const tdFecha = document.createElement("td");
        tdFecha.textContent = registro.fecha;

        const tdNombre = document.createElement("td");
        tdNombre.textContent = registro.nombre;

        fila.appendChild(tdFecha);
        fila.appendChild(tdNombre);
        tabla.appendChild(fila);
    });
}

function exportarExcel() {
    let registros = JSON.parse(localStorage.getItem("registros")) || [];

    if (registros.length === 0) {
        alert("No hay datos para exportar");
        return;
    }

    let datos = registros.map((r, index) => ({
        "N°": index + 1,
        "Fecha": r.fecha,
        "Nombre": r.nombre
    }));

    let hoja = XLSX.utils.json_to_sheet(datos);
    let libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, "Registros");

    XLSX.writeFile(libro, "registro_personas.xlsx");
}
