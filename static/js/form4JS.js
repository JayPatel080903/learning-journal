function getDate() {
    const d = new Date();
    let text = d.toDateString();
    document.getElementById("todayDate").innerHTML = text;
}

async function checkReflection() {
    let name = document.getElementById("fname").value;
    let reflection = document.getElementById("reflection").value;

    let entry = { name, reflection };

    let response = await fetch("/api/reflections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry)
    });

    if (response.ok) {
        document.myForm.reset();
        await submitted();
    } else {
        console.error("Failed to submit reflection");
    }
    return false;
}

async function submitted() {
    let output = "";
    try {
        let response = await fetch("/api/reflections");
        if (response.ok) {
            let reflections = await response.json();
            reflections.reverse();

            if (reflections.length === 0) {
                output = `<i>No reflections found.</i>`;
            } else {
                for (let r of reflections) {
                    output += `
                        <div class="reflection-card glass-card">
                            <div class="ref-name gradient-text">${r.name}</div>
                            <div class="ref-date">${r.date}</div>
                            <div class="ref-text">${r.reflection}</div>
                        </div>
                    `;
                }
            }
        } else {
            output = "<i>Error loading reflections.</i>";
        }
    } catch (error) {
        output = "<i>Error loading reflections.</i>";
    }
    const viewAll = document.getElementById("viewAll");
    if (viewAll) viewAll.innerHTML = output;
}

function init() {
    getDate();
    submitted();
}
