// --- STATE MANAGEMENT ---
// This object holds all the resume data
const state = {
    personal: {
        fullName: "Alex Morgan",
        jobTitle: "Senior Product Designer",
        email: "alex@example.com",
        phone: "(555) 123-4567",
        address: "New York, NY",
        summary: "Creative designer with 5 years of experience in building user-centric digital products."
    },
    experience: [
        { id: 1, company: "TechFlow", role: "Senior Designer", date: "2021 - Present", desc: "• Led design system overhaul.\n• Increased user retention by 20%." }
    ],
    education: [
        { id: 1, school: "NYU", degree: "B.A. Design", date: "2017 - 2021", desc: "Graduated with honors." }
    ],
    skills: "Figma, React, HTML, CSS, Leadership",
    themeColor: "#2563eb"
};

// --- INITIALIZATION ---
// Runs when the webpage finishes loading
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons(); // Load icons
    renderColors();
    loadInitialValues();
    renderExperienceInputs();
    renderEducationInputs();
    renderPreview();
});

// --- RENDER FUNCTIONS (Update the Sidebar Inputs) ---

function loadInitialValues() {
    document.getElementById('input-fullname').value = state.personal.fullName;
    document.getElementById('input-jobtitle').value = state.personal.jobTitle;
    document.getElementById('input-email').value = state.personal.email;
    document.getElementById('input-phone').value = state.personal.phone;
    document.getElementById('input-address').value = state.personal.address;
    document.getElementById('input-summary').value = state.personal.summary;
    document.getElementById('input-skills').value = state.skills;
}

function renderColors() {
    const colors = ['#2563eb', '#059669', '#dc2626', '#7c3aed', '#ea580c', '#0f172a'];
    const container = document.getElementById('color-picker');
    container.innerHTML = colors.map(c => `
        <button onclick="setTheme('${c}')" class="w-8 h-8 rounded-full border-2 hover:scale-110 transition-transform ${state.themeColor === c ? 'border-slate-900' : 'border-transparent'}" style="background-color: ${c}"></button>
    `).join('');
}

function renderExperienceInputs() {
    const container = document.getElementById('experience-list');
    container.innerHTML = state.experience.map(exp => `
        <div class="p-3 border rounded bg-slate-50 relative group">
            <button onclick="removeExperience(${exp.id})" class="absolute top-2 right-2 text-slate-400 hover:text-red-500"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
            <input class="w-full mb-2 p-2 text-sm border rounded" placeholder="Company" value="${exp.company}" oninput="updateExperience(${exp.id}, 'company', this.value)">
            <input class="w-full mb-2 p-2 text-sm border rounded" placeholder="Role" value="${exp.role}" oninput="updateExperience(${exp.id}, 'role', this.value)">
            <input class="w-full mb-2 p-2 text-sm border rounded" placeholder="Date (e.g., 2021 - Present)" value="${exp.date}" oninput="updateExperience(${exp.id}, 'date', this.value)">
            <div class="relative">
                <textarea class="w-full p-2 text-sm border rounded h-20" placeholder="• Description..." oninput="updateExperience(${exp.id}, 'desc', this.value)">${exp.desc}</textarea>
                <button onclick="polishExperience(${exp.id})" class="absolute bottom-2 right-2 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded hover:bg-purple-200 flex gap-1 items-center">
                    <i data-lucide="sparkles" class="w-3 h-3"></i> Polish
                </button>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}

function renderEducationInputs() {
    const container = document.getElementById('education-list');
    container.innerHTML = state.education.map(edu => `
        <div class="p-3 border rounded bg-slate-50 relative group">
            <button onclick="removeEducation(${edu.id})" class="absolute top-2 right-2 text-slate-400 hover:text-red-500"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
            <input class="w-full mb-2 p-2 text-sm border rounded" placeholder="School" value="${edu.school}" oninput="updateEducation(${edu.id}, 'school', this.value)">
            <input class="w-full mb-2 p-2 text-sm border rounded" placeholder="Degree" value="${edu.degree}" oninput="updateEducation(${edu.id}, 'degree', this.value)">
            <input class="w-full mb-2 p-2 text-sm border rounded" placeholder="Date" value="${edu.date}" oninput="updateEducation(${edu.id}, 'date', this.value)">
        </div>
    `).join('');
    lucide.createIcons();
}

// --- LOGIC: UPDATERS (Update State & Re-render) ---

function setTheme(color) {
    state.themeColor = color;
    renderColors();
    renderPreview();
}

function updatePersonal() {
    state.personal.fullName = document.getElementById('input-fullname').value;
    state.personal.jobTitle = document.getElementById('input-jobtitle').value;
    state.personal.email = document.getElementById('input-email').value;
    state.personal.phone = document.getElementById('input-phone').value;
    state.personal.address = document.getElementById('input-address').value;
    state.personal.summary = document.getElementById('input-summary').value;
    renderPreview();
}

function updateExperience(id, field, value) {
    const item = state.experience.find(e => e.id === id);
    if (item) {
        item[field] = value;
        renderPreview();
    }
}

function addExperience() {
    const newId = Date.now();
    state.experience.unshift({ id: newId, company: "", role: "", date: "", desc: "• " });
    renderExperienceInputs();
    renderPreview();
}

function removeExperience(id) {
    state.experience = state.experience.filter(e => e.id !== id);
    renderExperienceInputs();
    renderPreview();
}

function updateEducation(id, field, value) {
    const item = state.education.find(e => e.id === id);
    if (item) item[field] = value;
    renderPreview();
}

function addEducation() {
    state.education.unshift({ id: Date.now(), school: "", degree: "", date: "", desc: "" });
    renderEducationInputs();
    renderPreview();
}

function removeEducation(id) {
    state.education = state.education.filter(e => e.id !== id);
    renderEducationInputs();
    renderPreview();
}

// --- LOGIC: PREVIEW RENDERER (Updates the A4 Page) ---

function renderPreview() {
    // Header
    const nameEl = document.getElementById('preview-name');
    nameEl.innerText = state.personal.fullName;
    nameEl.style.color = state.themeColor;
    document.getElementById('preview-header-border').style.borderColor = state.themeColor;
    document.getElementById('preview-title').innerText = state.personal.jobTitle;

    // Contact Info
    const contactHTML = [];
    if (state.personal.email) contactHTML.push(`<span class="flex items-center gap-1"><i data-lucide="mail" class="w-3 h-3"></i> ${state.personal.email}</span>`);
    if (state.personal.phone) contactHTML.push(`<span class="flex items-center gap-1"><i data-lucide="phone" class="w-3 h-3"></i> ${state.personal.phone}</span>`);
    if (state.personal.address) contactHTML.push(`<span class="flex items-center gap-1"><i data-lucide="map-pin" class="w-3 h-3"></i> ${state.personal.address}</span>`);
    document.getElementById('preview-contact').innerHTML = contactHTML.join('');

    // Summary Section
    const summarySec = document.getElementById('preview-summary-section');
    if (state.personal.summary) {
        summarySec.classList.remove('hidden');
        document.getElementById('preview-summary').innerText = state.personal.summary;
    } else {
        summarySec.classList.add('hidden');
    }

    // Experience Section
    const expSec = document.getElementById('preview-experience-section');
    const expList = document.getElementById('preview-experience-list');
    if (state.experience.length > 0) {
        expSec.classList.remove('hidden');
        expList.innerHTML = state.experience.map(exp => `
            <div>
                <div class="flex justify-between items-baseline mb-1">
                    <h4 class="font-bold text-lg text-slate-800">${exp.role}</h4>
                    <span class="text-sm font-medium text-slate-500 whitespace-nowrap">${exp.date}</span>
                </div>
                <div class="text-base font-semibold mb-2" style="color: ${state.themeColor}">${exp.company}</div>
                <div class="text-sm text-slate-600 leading-relaxed whitespace-pre-line pl-1">${exp.desc}</div>
            </div>
        `).join('');
    } else {
        expSec.classList.add('hidden');
    }

    // Education Section
    const eduSec = document.getElementById('preview-education-section');
    const eduList = document.getElementById('preview-education-list');
    if (state.education.length > 0) {
        eduSec.classList.remove('hidden');
        eduList.innerHTML = state.education.map(edu => `
            <div>
                <div class="flex justify-between items-baseline mb-1">
                    <h4 class="font-bold text-lg text-slate-800">${edu.school}</h4>
                    <span class="text-sm font-medium text-slate-500 whitespace-nowrap">${edu.date}</span>
                </div>
                <div class="text-base text-slate-700 font-medium">${edu.degree}</div>
            </div>
        `).join('');
    } else {
        eduSec.classList.add('hidden');
    }

    // Skills Section
    const skillsInput = document.getElementById('input-skills').value;
    state.skills = skillsInput;
    const skillSec = document.getElementById('preview-skills-section');
    if (skillsInput) {
        skillSec.classList.remove('hidden');
        document.getElementById('preview-skills-list').innerHTML = skillsInput.split(',').map(s => `
            <span class="px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-700">${s.trim()}</span>
        `).join('');
    } else {
        skillSec.classList.add('hidden');
    }

    // Re-initialize icons for the new content
    lucide.createIcons();
}

// --- LOGIC: GEMINI AI INTEGRATION ---

async function callGemini(prompt) {
    const apiKey = document.getElementById('api-key').value;
    if (!apiKey) {
        alert("Please enter your Google Gemini API Key in the top box first!");
        return null;
    }
    
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
    } catch (error) {
        console.error(error);
        alert("AI Error. Check your API Key or Internet Connection.");
        return null;
    }
}

async function generateSummary() {
    const job = state.personal.jobTitle;
    if (!job) return alert("Enter a Job Title first!");
    
    const btn = event.currentTarget;
    const originalText = btn.innerHTML;
    btn.innerText = "Thinking...";
    
    const prompt = `Write a professional, concise resume summary (max 40 words) for a ${job}. Focus on impact and skills. No flowery language.`;
    const result = await callGemini(prompt);
    
    if (result) {
        state.personal.summary = result;
        loadInitialValues(); // Updates input box
        renderPreview();     // Updates preview
    }
    btn.innerHTML = originalText;
}

async function polishExperience(id) {
    const item = state.experience.find(e => e.id === id);
    if (!item || !item.desc) return;

    const btn = event.currentTarget;
    const originalText = btn.innerHTML;
    btn.innerText = "...";

    const prompt = `Rewrite these resume bullets to be punchy and results-oriented using action verbs. Keep it concise:\n${item.desc}`;
    const result = await callGemini(prompt);

    if (result) {
        updateExperience(id, 'desc', result);
        renderExperienceInputs(); // Re-render input to show new text
    }
    btn.innerHTML = originalText;
}

async function suggestSkills() {
    const job = state.personal.jobTitle;
    if (!job) return alert("Enter a Job Title first!");

    const btn = event.currentTarget;
    const originalText = btn.innerHTML;
    btn.innerText = "...";

    const prompt = `List 10 comma-separated technical and soft skills for a ${job}. Output ONLY the list.`;
    const result = await callGemini(prompt);

    if (result) {
        document.getElementById('input-skills').value = result;
        renderPreview();
    }
    btn.innerHTML = originalText;
}
