//URL da API
const api_url = "PLACE_YOUR_API_URL_HERE";

// Multi-step logic & validation
const form = document.getElementById('reservaForm');
const steps = Array.from(document.querySelectorAll('.step'));
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const clearBtn = document.getElementById('clearBtn');
const progressBar = document.getElementById('progressBar');

let current = 0; // index do passo ativo

function updateProgress() {
    const pct = ((current + 1) / steps.length) * 100;
    progressBar.style.width = pct + '%';
}

function showStep(index) {
    steps.forEach((s, i) => s.classList.toggle('active', i === index));
    prevBtn.style.visibility = index === 0 ? 'hidden' : 'visible';
    nextBtn.style.display = index === steps.length - 1 ? 'none' : 'inline-flex';
    submitBtn.style.display = index === steps.length - 1 ? 'inline-flex' : 'none';
    updateProgress();
}

function validateStep(index) {
    const step = steps[index];
    const inputs = step.querySelectorAll("input, select, textarea");

    for (let el of inputs) {
        if (!el.checkValidity()) {
            el.reportValidity(); // mostra a mensagem do primeiro inválido
            return false;
        }
    }

    return true;
}

function next() {
    if (!validateStep(current)) return;
    if (current < steps.length - 1) { current++; showStep(current); }
}

function prev() { if (current > 0) { current--; showStep(current); } }

function back2begin() { current = 0; showStep(current); }

function createModal(content, isError = false) {
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.inset = "0";
    overlay.style.background = "rgba(0,0,0,.7)";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = "9999";

    const modal = document.createElement("div");
    modal.style.background = "var(--card)";
    modal.style.padding = "24px";
    modal.style.borderRadius = "var(--radius)";
    modal.style.maxWidth = "520px";
    modal.style.width = "90%";
    modal.style.boxShadow = "var(--shadow)";
    modal.style.textAlign = "left"; // para alinhar os parágrafos
    modal.style.color = "var(--text)";

    const title = document.createElement("h3");
    title.textContent = isError ? "Erro no envio" : "Sucesso!";
    title.style.marginTop = "0";
    title.style.textAlign = "center";
    modal.appendChild(title);

    const contentBox = document.createElement("div");
    if (typeof content === "string") {
        contentBox.innerHTML = content; // INSERE HTML DIRETO
    } else {
        contentBox.appendChild(content);
    }
    modal.appendChild(contentBox);

    const btns = document.createElement("div");
    btns.style.marginTop = "18px";
    btns.style.display = "flex";
    btns.style.gap = "12px";
    btns.style.justifyContent = "center";

    const retry = document.createElement("button");
    retry.className = "btn primary";
    retry.textContent = "Enviar outra resposta";
    retry.onclick = () => {
        overlay.remove();
        clearForm();
    };
    btns.appendChild(retry);

    if (isError) {
        const edit = document.createElement("button");
        edit.className = "btn";
        edit.textContent = "Editar formulário";
        edit.onclick = () => {
            overlay.remove();
        };
        btns.appendChild(edit);
    }

    modal.appendChild(btns);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
}

function handleResponse(status) {
    createModal(status.message, !status.ok);
}

let loadingOverlay = null;

function showLoading() {
    // Cria overlay de bloqueio
    loadingOverlay = document.createElement("div");
    loadingOverlay.style.position = "fixed";
    loadingOverlay.style.inset = "0";
    loadingOverlay.style.background = "rgba(0,0,0,0.7)";
    loadingOverlay.style.display = "flex";
    loadingOverlay.style.alignItems = "center";
    loadingOverlay.style.justifyContent = "center";
    loadingOverlay.style.zIndex = "9998";

    const spinner = document.createElement("div");
    spinner.textContent = "Tentando reservar o horário...";
    spinner.style.color = "#fff";
    spinner.style.fontSize = "18px";
    spinner.style.fontWeight = "700";
    loadingOverlay.appendChild(spinner);

    document.body.appendChild(loadingOverlay);
}

function hideLoading() {
    if (loadingOverlay) {
        loadingOverlay.remove();
        loadingOverlay = null;
    }
}


function clearForm() { form.reset(); current = 0; showStep(current); }

prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);
clearBtn.addEventListener('click', clearForm);

form.addEventListener('submit', async (ev) => {
    ev.preventDefault();

    if (!validateStep(current)) return;
    // Coleta dos dados para envio
    const raw = Object.fromEntries(new FormData(form).entries());
    const data = {
        registro: String(new Date()), // ou outro id se quiser
        consent: raw.consent || "",
        disciplina: raw.disciplina || "",
        turma: raw.turma || "",
        itinerario: raw.itinerario || "",
        lab: raw.laboratorio || "",
        horaInicio: raw.inicio || "",
        horaTermin: raw.termino || "",
        dia: raw.data || "",
        recorrencia: raw.ocorrencias || "",
        professor: raw.professor || "",
        email: raw.email || "",
    };


    // return console.log(JSON.stringify(data))

    showLoading();

    const res = await fetch(api_url + encodeURIComponent(JSON.stringify(data)));
    const json = await res.json();

    handleResponse(json);

    hideLoading();

    // google.script.run.withSuccessHandler(function (res) {
    //     handleResponse(res);
    //     hideLoading();
    // }).setupReserva(data, "fromHTML");
    // handleResponse({ "ok": true, "message": "Reserva feita com sucesso" })
    // handleResponse({ "ok": false, "message": "Reserva falhou" })
});

// Inicializa interface
showStep(current);