
let nama, belakang, email, jumlah, hobi = [];

function halamanHobi() {
    nama = document.getElementById("namaDepan").value.trim();
    belakang = document.getElementById("namaBelakang").value.trim();
    email = document.getElementById("email").value.trim();
    jumlah = Number(document.getElementById("jumlah").value);

    if (!nama || !belakang) return alert("Nama harus diisi!");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Email tidak valid!");
        document.getElementById("email").focus();
        return;
    }
    if (!Number.isInteger(jumlah) || jumlah < 1 || jumlah > 20)
        return alert("Jumlah hobi harus 1-20!");

    document.getElementById("inputHobi").innerHTML =
        Array.from({length: jumlah}, (_, i) =>
            `<label>Hobi ${i + 1}:</label>
             <input id="hobi${i + 1}" placeholder="Masukkan hobi ${i + 1}">`
        ).join("");

    document.getElementById("formAwal").hidden = true;
    document.getElementById("formHobi").hidden = false;
}

function halamanHasil() {
    hobi = [];

    for (let i = 1; i <= jumlah; i++) {
        let nilai = document.getElementById("hobi" + i).value.trim();
        if (!nilai) return alert("Hobi " + i + " belum diisi!");
        hobi.push(nilai);
    }

    document.getElementById("pilihHobi").innerHTML =
        '<option value="">-- Pilih Hobi --</option>' +
        hobi.map((h, i) => `<option value="${i}">${h}</option>`).join("");

    document.getElementById("formHobi").hidden = true;
    document.getElementById("formHasil").hidden = false;
    document.getElementById("hasil").textContent = "Silakan pilih hobi.";

    document.getElementById("pilihHobi").onchange = function() {
        document.getElementById("hasil").textContent = this.value === ""
            ? "Silakan pilih hobi."
            : `Halo, nama saya ${nama} ${belakang}. Email saya ${email}, dan hobi yang saya pilih adalah ${hobi[this.value]}.`;
    };
}

function kembaliAwal() {
    document.getElementById("formAwal").hidden = false;
    document.getElementById("formHobi").hidden = true;
    document.getElementById("formHasil").hidden = true;
}
