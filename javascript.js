function buatInputHobi() {
    let j = document.getElementById("jumlah").value;
    let tempat = document.getElementById("inputHobi");
    tempat.innerHTML = "";

    if (j < 1 || j > 20 || !Number.isInteger(+j)) return;

    for (let i = 1; i <= j; i++) {
        tempat.innerHTML += `<label>Hobi ${i}:</label>
        <input id="hobi${i}" placeholder="Masukkan hobi ${i}">`;
    }
}

function submitForm() {
    let nama = document.getElementById("namaDepan").value.trim();
    let belakang = document.getElementById("namaBelakang").value.trim();
    let email = document.getElementById("email").value.trim();
    let j = +document.getElementById("jumlah").value;

    if (!nama || !belakang) return alert("Nama harus diisi!");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        return alert("Email tidak valid!");
    if (!Number.isInteger(j) || j < 1 || j > 20)
        return alert("Jumlah hobi harus 1-20!");

    let hobi = [];

    for (let i = 1; i <= j; i++) {
        let input = document.getElementById("hobi" + i);
        if (!input || !input.value.trim())
            return alert("Hobi " + i + " belum diisi!");
        hobi.push(input.value.trim());
    }

    let d = document.getElementById("dropdownContainer");
    d.innerHTML = '<select id="pilihHobi"><option value="">-- Pilih Hobi --</option>' +
        hobi.map(h => `<option>${h}</option>`).join("") + '</select>';

    document.getElementById("pilihHobi").onchange = function() {
    document.getElementById("hasil").innerHTML =
        `<p>Halo, nama saya ${nama} ${belakang}. 
        Alamat email saya adalah ${email}, dan hobi yang saya pilih adalah ${this.value}.</p>`;
    };

    alert("Data berhasil dimasukkan!");
}
