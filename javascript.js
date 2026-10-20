const dataDiri = {
  nama: "",
  alamat: "",
  email: "",
  jumlahBahasa: 0,
  jumlahHobi: 0
};

let daftarBahasa = [];
let daftarHobi = [];

const $ = (id) => document.getElementById(id);

// Menampilkan satu bagian form
function tampilkanForm(idYangDitampilkan) {
  ["formAwal", "formIsian", "formPilihan", "formHasil"].forEach((id) => {
    $(id).hidden = id !== idYangDitampilkan;
  });

  $("pesan").innerHTML = "";
}

// Menampilkan pesan kesalahan
function beriPesan(teks) {
  $("pesan").innerHTML =
    `<div class="alert alert-danger" role="alert">${teks}</div>`;
}

// Memeriksa jumlah agar berupa bilangan bulat 1 sampai 20
function ambilJumlah(id, label) {
  const nilai = Number($(id).value);

  if (
    $(id).value.trim() === "" ||
    !Number.isInteger(nilai) ||
    nilai < 1 ||
    nilai > 20
  ) {
    beriPesan(`Jumlah ${label} harus berupa bilangan bulat antara 1 sampai 20.`);
    $(id).focus();
    return null;
  }

  return nilai;
}

// Memeriksa data diri dan membuat kolom bahasa serta hobi
$("btnData").addEventListener("click", function () {
  dataDiri.nama = $("nama").value.trim();
  dataDiri.alamat = $("alamat").value.trim();
  dataDiri.email = $("email").value.trim();

  if (!dataDiri.nama || !dataDiri.alamat || !dataDiri.email) {
    beriPesan("Nama, alamat, dan email harus diisi.");
    return;
  }

  if (!$("email").checkValidity()) {
    alert("Format email salah. Silakan masukkan ulang email.");
    $("email").value = "";
    $("email").focus();
    return;
  }

  const bahasa = ambilJumlah("jumlahBahasa", "bahasa");
  if (bahasa === null) return;

  const hobi = ambilJumlah("jumlahHobi", "hobi");
  if (hobi === null) return;

  dataDiri.jumlahBahasa = bahasa;
  dataDiri.jumlahHobi = hobi;

  // Membuat kolom bahasa sesuai jumlah yang dimasukkan
  $("inputBahasa").innerHTML = "";

  for (let i = 0; i < bahasa; i++) {
    $("inputBahasa").innerHTML += `
      <div class="mb-3">
        <label class="form-label" for="bahasa${i}">
          Bahasa ${i + 1}
        </label>
        <input class="form-control" type="text" id="bahasa${i}"
          placeholder="Masukkan bahasa ${i + 1}">
      </div>`;
  }

  // Membuat kolom hobi sesuai jumlah yang dimasukkan
  $("inputHobi").innerHTML = "";

  for (let i = 0; i < hobi; i++) {
    $("inputHobi").innerHTML += `
      <div class="mb-3">
        <label class="form-label" for="hobi${i}">
          Hobi ${i + 1}
        </label>
        <input class="form-control" type="text" id="hobi${i}"
          placeholder="Masukkan hobi ${i + 1}">
      </div>`;
  }

  tampilkanForm("formIsian");
});

// Menyimpan input bahasa dan hobi ke dalam array
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

  // Membuat radio button untuk pilihan satu bahasa
  $("pilihanBahasa").innerHTML = daftarBahasa.map((bahasa, i) => `
    <div class="choice-item">
      <div class="form-check">
        <input class="form-check-input" type="radio"
          name="bahasaDipilih" id="pilihBahasa${i}" value="${i}">
        <label class="form-check-label" for="pilihBahasa${i}">
          ${escapeHTML(bahasa)}
        </label>
      </div>
    </div>`).join("");

  // Membuat checkbox untuk pilihan hobi
  $("pilihanHobi").innerHTML = daftarHobi.map((hobi, i) => `
    <div class="choice-item">
      <div class="form-check">
        <input class="form-check-input" type="checkbox"
          id="pilihHobi${i}" value="${i}">
        <label class="form-check-label" for="pilihHobi${i}">
          ${escapeHTML(hobi)}
        </label>
      </div>
    </div>`).join("");

  tampilkanForm("formPilihan");
});

// Menampilkan hasil sesuai pilihan pengguna
$("btnHasil").addEventListener("click", function () {
  const bahasaDipilih =
    document.querySelector('input[name="bahasaDipilih"]:checked');

  if (!bahasaDipilih) {
    beriPesan("Pilih satu bahasa terlebih dahulu.");
    return;
  }

  const hobiDipilih = daftarHobi.filter((hobi, i) => {
    return $(`pilihHobi${i}`).checked;
  });

  if (hobiDipilih.length === 0) {
    beriPesan("Pilih minimal satu hobi.");
    return;
  }

  const daftarBahasaTeks =
    daftarBahasa.map(escapeHTML).join(", ");

  const daftarHobiTeks =
    daftarHobi.map(escapeHTML).join(", ");

  const bahasaPilihanTeks =
    escapeHTML(daftarBahasa[Number(bahasaDipilih.value)]);

  const hobiPilihanTeks =
    hobiDipilih.map(escapeHTML).join(", ");

  $("hasil").innerHTML =
    `Hallo, nama saya <strong>${escapeHTML(dataDiri.nama)}</strong>, ` +
    `alamat ${escapeHTML(dataDiri.alamat)}, email ${escapeHTML(dataDiri.email)}. ` +
    `Saya mempunyai ${dataDiri.jumlahBahasa} pilihan bahasa yaitu ` +
    `${daftarBahasaTeks}, dan saya memilih ${bahasaPilihanTeks}. ` +
    `Saya juga mempunyai ${dataDiri.jumlahHobi} pilihan hobi yaitu ` +
    `${daftarHobiTeks}, dan saya memilih ${hobiPilihanTeks}.`;

  tampilkanForm("formHasil");
});

// Kembali ke form sebelumnya
$("btnKembaliData").addEventListener("click", function () {
  tampilkanForm("formAwal");
});

$("btnKembaliIsian").addEventListener("click", function () {
  tampilkanForm("formIsian");
});

// Mengosongkan form untuk memulai kembali
$("btnUlang").addEventListener("click", function () {
  $("nama").value = "";
  $("alamat").value = "";
  $("email").value = "";
  $("jumlahBahasa").value = "";
  $("jumlahHobi").value = "";

  $("inputBahasa").innerHTML = "";
  $("inputHobi").innerHTML = "";
  $("pilihanBahasa").innerHTML = "";
  $("pilihanHobi").innerHTML = "";

  daftarBahasa = [];
  daftarHobi = [];

  tampilkanForm("formAwal");
});

// Mencegah teks input dibaca sebagai kode HTML
function escapeHTML(teks) {
  return String(teks).replace(/[&<>"']/g, function (karakter) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[karakter];
  });
}
