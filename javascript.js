const dataDiri = { nama: "", alamat: "", email: "", jumlahBahasa: 0, jumlahHobi: 0 };
let daftarBahasa = [];
let daftarHobi = [];

const $ = (id) => document.getElementById(id);

function tampilkanForm(idYangDitampilkan) {
  ["formAwal", "formIsian", "formPilihan", "formHasil"].forEach((id) => {
    $(id).hidden = id !== idYangDitampilkan;
  });
  $("pesan").innerHTML = "";
}

function beriPesan(teks, jenis = "danger") {
  $("pesan").innerHTML = `<div class="alert alert-${jenis}" role="alert">${teks}</div>`;
}

function ambilJumlah(id, label) {
  const nilai = Number($(id).value);
  if (!Number.isInteger(nilai) || nilai < 1 || nilai > 20) {
    beriPesan(`Jumlah ${label} harus berupa bilangan bulat antara 1 sampai 20.`);
    $(id).focus();
    return null;
  }
  return nilai;
}

$("btnData").addEventListener("click", function () {
  dataDiri.nama = $("nama").value.trim();
  dataDiri.alamat = $("alamat").value.trim();
  dataDiri.email = $("email").value.trim();

  if (!dataDiri.nama || !dataDiri.alamat || !dataDiri.email) {
    beriPesan("Nama, alamat, dan email harus diisi.");
    return;
  }
  if (!$("email").checkValidity()) {
    beriPesan("Format email belum benar. Silakan periksa kembali.");
    $("email").focus();
    return;
  }

  const bahasa = ambilJumlah("jumlahBahasa", "bahasa");
  if (bahasa === null) return;
  const hobi = ambilJumlah("jumlahHobi", "hobi");
  if (hobi === null) return;

  dataDiri.jumlahBahasa = bahasa;
  dataDiri.jumlahHobi = hobi;

  $("inputBahasa").innerHTML = Array.from({ length: bahasa }, (_, i) => `
    <div class="mb-3">
      <label class="form-label" for="bahasa${i}">Bahasa ${i + 1}</label>
      <input class="form-control" type="text" id="bahasa${i}" placeholder="Masukkan bahasa ${i + 1}">
    </div>`).join("");

  $("inputHobi").innerHTML = Array.from({ length: hobi }, (_, i) => `
    <div class="mb-3">
      <label class="form-label" for="hobi${i}">Hobi ${i + 1}</label>
      <input class="form-control" type="text" id="hobi${i}" placeholder="Masukkan hobi ${i + 1}">
    </div>`).join("");

  tampilkanForm("formIsian");
});

$("btnDaftar").addEventListener("click", function () {
  daftarBahasa = [];
  daftarHobi = [];

  for (let i = 0; i < dataDiri.jumlahBahasa; i++) {
    const nilai = $(`bahasa${i}`).value.trim();
    if (!nilai) {
      beriPesan(`Bahasa ${i + 1} belum diisi.`);
      $(`bahasa${i}`).focus();
      return;
    }
    daftarBahasa.push(nilai);
  }

  for (let i = 0; i < dataDiri.jumlahHobi; i++) {
    const nilai = $(`hobi${i}`).value.trim();
    if (!nilai) {
      beriPesan(`Hobi ${i + 1} belum diisi.`);
      $(`hobi${i}`).focus();
      return;
    }
    daftarHobi.push(nilai);
  }

  $("pilihanBahasa").innerHTML = daftarBahasa.map((bahasa, i) => `
    <div class="choice-item">
      <div class="form-check">
        <input class="form-check-input" type="radio" name="bahasaDipilih" id="pilihBahasa${i}" value="${i}">
        <label class="form-check-label" for="pilihBahasa${i}">${escapeHTML(bahasa)}</label>
      </div>
    </div>`).join("");

  $("pilihanHobi").innerHTML = daftarHobi.map((hobi, i) => `
    <div class="choice-item">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="pilihHobi${i}" value="${i}">
        <label class="form-check-label" for="pilihHobi${i}">${escapeHTML(hobi)}</label>
      </div>
    </div>`).join("");

  tampilkanForm("formPilihan");
});

$("btnHasil").addEventListener("click", function () {
  const bahasaDipilih = document.querySelector('input[name="bahasaDipilih"]:checked');
  if (!bahasaDipilih) {
    beriPesan("Pilih satu bahasa terlebih dahulu.");
    return;
  }

  const hobiDipilih = daftarHobi.filter((_, i) => $(`pilihHobi${i}`).checked);
  if (hobiDipilih.length === 0) {
    beriPesan("Pilih minimal satu hobi.");
    return;
  }

  const daftarBahasaTeks = daftarBahasa.map(escapeHTML).join(", ");
  const daftarHobiTeks = daftarHobi.map(escapeHTML).join(", ");
  const bahasaPilihanTeks = escapeHTML(daftarBahasa[Number(bahasaDipilih.value)]);
  const hobiPilihanTeks = hobiDipilih.map(escapeHTML).join(", ");

  $("hasil").innerHTML =
    `Halo, nama saya <strong>${escapeHTML(dataDiri.nama)}</strong>, alamat ${escapeHTML(dataDiri.alamat)}, ` +
    `email ${escapeHTML(dataDiri.email)}. Saya mempunyai ${dataDiri.jumlahBahasa} pilihan bahasa yaitu ` +
    `${daftarBahasaTeks}, dan saya memilih ${bahasaPilihanTeks}. Saya juga mempunyai ` +
    `${dataDiri.jumlahHobi} pilihan hobi yaitu ${daftarHobiTeks}, dan saya memilih ${hobiPilihanTeks}.`;

  tampilkanForm("formHasil");
});

$("btnKembaliData").addEventListener("click", () => tampilkanForm("formAwal"));
$("btnKembaliIsian").addEventListener("click", () => tampilkanForm("formIsian"));
$("btnUlang").addEventListener("click", function () {
  $("nama").value = "";
  $("alamat").value = "";
  $("email").value = "";
  $("jumlahBahasa").value = "";
  $("jumlahHobi").value = "";
  daftarBahasa = [];
  daftarHobi = [];
  tampilkanForm("formAwal");
});

function escapeHTML(teks) {
  return String(teks).replace(/[&<>"']/g, (karakter) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[karakter]);
}
