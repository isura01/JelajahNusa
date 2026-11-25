/* ---------- 1. Data paket wisata ---------- */
var dataPaket = {
  bali: {
    nama: "Bali Escape",
    destinasi: "Bali",
    durasi: "3 Hari 2 Malam",
    harga: 2450000,
    foto: "assets/images/bali.jpg",
    deskripsi: "Nikmati pantai berpasir, pura-pura bersejarah, dan budaya Bali yang hangat. Perjalanan ditutup dengan menyaksikan sunset yang menawan di tepi pantai.",
    fasilitas: ["Transportasi selama tour", "Hotel 2 malam", "Tiket masuk wisata", "Pemandu berpengalaman", "Sarapan setiap pagi", "Dokumentasi foto"]
  },
  bromo: {
    nama: "Bromo Sunrise Trip",
    destinasi: "Bromo, Jawa Timur",
    durasi: "2 Hari 1 Malam",
    harga: 1350000,
    foto: "assets/images/bromo.jpg",
    deskripsi: "Berangkat dini hari untuk melihat matahari terbit dari Penanjakan, lalu menyusuri lautan pasir menuju kawah Gunung Bromo.",
    fasilitas: ["Transportasi jeep Bromo", "Penginapan 1 malam", "Tiket masuk TNBTS", "Pemandu lokal", "Sarapan", "Jaket dan masker"]
  },
  rajaampat: {
    nama: "Raja Ampat Discovery",
    destinasi: "Raja Ampat, Papua Barat Daya",
    durasi: "4 Hari 3 Malam",
    harga: 5750000,
    foto: "assets/images/raja-ampat.jpg",
    deskripsi: "Island hopping ke gugusan pulau karst, lalu snorkeling di antara terumbu karang dan ikan warna-warni yang menjadi daya tarik utama Raja Ampat.",
    fasilitas: ["Transfer pelabuhan", "Homestay 3 malam", "Perahu island hopping", "Peralatan snorkeling", "Pemandu lokal", "Makan 3 kali sehari"]
  },
  labuanbajo: {
    nama: "Labuan Bajo Explorer",
    destinasi: "Labuan Bajo, Nusa Tenggara Timur",
    durasi: "3 Hari 2 Malam",
    harga: 3950000,
    foto: "assets/images/labuan-bajo.jpg",
    deskripsi: "Kunjungi Pulau Komodo, berlayar di antara pulau-pulau eksotis, dan nikmati pemandangan laut dari atas bukit saat matahari terbenam.",
    fasilitas: ["Kapal sailing", "Hotel 2 malam", "Tiket Taman Nasional Komodo", "Pemandu berpengalaman", "Makan di atas kapal", "Transfer bandara"]
  }
};

/* ---------- 2. Fungsi bantuan ---------- */

// Mengubah angka 2450000 menjadi "Rp2.450.000"
function formatRupiah(angka) {
  return "Rp" + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Mengecek format email sederhana
function emailValid(email) {
  var pola = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pola.test(email);
}

// Menampilkan notifikasi (toast). jenis: "sukses" atau "error"
function tampilkanNotif(pesan, jenis) {
  var ikon = document.getElementById("toastIcon");
  document.getElementById("toastPesan").textContent = pesan;

  if (jenis === "error") {
    ikon.className = "bi bi-exclamation-circle-fill toast-icon error";
  } else {
    ikon.className = "bi bi-check-circle-fill toast-icon";
  }

  var toast = bootstrap.Toast.getOrCreateInstance(document.getElementById("toastNotif"), { delay: 4500 });
  toast.show();
}

// Menandai input salah / benar
function tandaiSalah(inputId, errorId, pesan) {
  document.getElementById(inputId).classList.add("is-invalid");
  document.getElementById(errorId).textContent = pesan;
}

function tandaiBenar(inputId) {
  document.getElementById(inputId).classList.remove("is-invalid");
}

// Menghapus tanda salah saat pengguna mulai mengetik lagi
function bersihkanSaatMengetik(daftarId) {
  for (var i = 0; i < daftarId.length; i++) {
    var elemen = document.getElementById(daftarId[i]);
    elemen.addEventListener("input", function () {
      this.classList.remove("is-invalid");
    });
    elemen.addEventListener("change", function () {
      this.classList.remove("is-invalid");
    });
  }
}

/* ---------- 3. Navbar ---------- */
var navbar = document.getElementById("mainNav");

function aturNavbar() {
  if (window.scrollY > 60) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", aturNavbar);
aturNavbar();

// Menutup menu HP setelah salah satu link diklik
var menuCollapse = document.getElementById("menuNav");
var semuaLink = document.querySelectorAll("#menuNav a");

for (var i = 0; i < semuaLink.length; i++) {
  semuaLink[i].addEventListener("click", function () {
    if (menuCollapse.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(menuCollapse).hide();
    }
  });
}

/* ---------- 4. Modal detail paket ---------- */
var modalPaketEl = document.getElementById("modalPaket");
var modalPaket = new bootstrap.Modal(modalPaketEl);
var paketTerpilih = "";       // menyimpan id paket yang sedang dibuka
var pindahKeBooking = false;  // penanda: setelah modal tertutup, scroll ke form booking

function bukaDetailPaket(idPaket) {
  var paket = dataPaket[idPaket];
  paketTerpilih = idPaket;

  document.getElementById("modalJudul").textContent = paket.nama;
  document.getElementById("modalFoto").src = paket.foto;
  document.getElementById("modalFoto").alt = "Foto paket " + paket.nama;
  document.getElementById("modalDestinasi").textContent = paket.destinasi;
  document.getElementById("modalDurasi").textContent = paket.durasi;
  document.getElementById("modalHarga").textContent = formatRupiah(paket.harga);
  document.getElementById("modalDeskripsi").textContent = paket.deskripsi;

  // isi daftar fasilitas
  var daftar = document.getElementById("modalFasilitas");
  daftar.innerHTML = "";
  for (var i = 0; i < paket.fasilitas.length; i++) {
    var item = document.createElement("li");
    item.textContent = paket.fasilitas[i];
    daftar.appendChild(item);
  }

  modalPaket.show();
}

// Pasang event klik pada semua tombol "Detail Paket"
var tombolDetail = document.getElementsByClassName("btn-detail");
for (var j = 0; j < tombolDetail.length; j++) {
  tombolDetail[j].addEventListener("click", function () {
    bukaDetailPaket(this.getAttribute("data-paket"));
  });
}

// Tombol "Pesan Paket": isi form booking dengan paket terpilih lalu pindah ke form
document.getElementById("btnPesanPaket").addEventListener("click", function () {
  document.getElementById("bkPaket").value = paketTerpilih;
  tandaiBenar("bkPaket");
  hitungTotal();
  pindahKeBooking = true;
  modalPaket.hide();
});

modalPaketEl.addEventListener("hidden.bs.modal", function () {
  if (pindahKeBooking) {
    pindahKeBooking = false;
    document.getElementById("booking").scrollIntoView({ behavior: "smooth", block: "center" });
    tampilkanNotif("Paket " + dataPaket[paketTerpilih].nama + " dipilih. Lengkapi data booking Anda.", "sukses");
    document.getElementById("bkNama").focus({ preventScroll: true });
  }
});

/* ---------- 5. Form booking ---------- */
var formBooking = document.getElementById("formBooking");
var inputTanggal = document.getElementById("bkTanggal");

// Tanggal keberangkatan tidak boleh sebelum hari ini
var hariIni = new Date();
var bulan = ("0" + (hariIni.getMonth() + 1)).slice(-2);
var tanggal = ("0" + hariIni.getDate()).slice(-2);
var teksHariIni = hariIni.getFullYear() + "-" + bulan + "-" + tanggal;
inputTanggal.setAttribute("min", teksHariIni);

// Menghitung estimasi total = harga paket x jumlah peserta
function hitungTotal() {
  var idPaket = document.getElementById("bkPaket").value;
  var jumlah = parseInt(document.getElementById("bkJumlah").value, 10);
  var total = 0;

  if (idPaket !== "" && jumlah > 0) {
    total = dataPaket[idPaket].harga * jumlah;
  }
  document.getElementById("bookingTotal").textContent = formatRupiah(total);
}

document.getElementById("bkPaket").addEventListener("change", hitungTotal);
document.getElementById("bkJumlah").addEventListener("input", hitungTotal);
bersihkanSaatMengetik(["bkNama", "bkEmail", "bkTelepon", "bkPaket", "bkTanggal", "bkJumlah"]);

formBooking.addEventListener("submit", function (event) {
  event.preventDefault();

  var nama = document.getElementById("bkNama").value.trim();
  var email = document.getElementById("bkEmail").value.trim();
  var telepon = document.getElementById("bkTelepon").value.trim();
  var paket = document.getElementById("bkPaket").value;
  var tgl = document.getElementById("bkTanggal").value;
  var jumlah = parseInt(document.getElementById("bkJumlah").value, 10);
  var valid = true;

  if (nama === "") {
    tandaiSalah("bkNama", "errBkNama", "Nama lengkap wajib diisi.");
    valid = false;
  } else {
    tandaiBenar("bkNama");
  }

  if (email === "") {
    tandaiSalah("bkEmail", "errBkEmail", "Email wajib diisi.");
    valid = false;
  } else if (!emailValid(email)) {
    tandaiSalah("bkEmail", "errBkEmail", "Format email tidak valid. Contoh: nama@email.com");
    valid = false;
  } else {
    tandaiBenar("bkEmail");
  }

  if (telepon === "") {
    tandaiSalah("bkTelepon", "errBkTelepon", "Nomor telepon wajib diisi.");
    valid = false;
  } else if (!/^[0-9+]{9,15}$/.test(telepon)) {
    tandaiSalah("bkTelepon", "errBkTelepon", "Nomor telepon harus 9-15 digit angka.");
    valid = false;
  } else {
    tandaiBenar("bkTelepon");
  }

  if (paket === "") {
    tandaiSalah("bkPaket", "errBkPaket", "Silakan pilih paket wisata.");
    valid = false;
  } else {
    tandaiBenar("bkPaket");
  }

  if (tgl === "") {
    tandaiSalah("bkTanggal", "errBkTanggal", "Tanggal keberangkatan wajib diisi.");
    valid = false;
  } else if (tgl < teksHariIni) {
    tandaiSalah("bkTanggal", "errBkTanggal", "Tanggal tidak boleh sebelum hari ini.");
    valid = false;
  } else {
    tandaiBenar("bkTanggal");
  }

  if (isNaN(jumlah) || jumlah < 1 || jumlah > 20) {
    tandaiSalah("bkJumlah", "errBkJumlah", "Jumlah peserta antara 1 sampai 20 orang.");
    valid = false;
  } else {
    tandaiBenar("bkJumlah");
  }

  if (valid) {
    var total = formatRupiah(dataPaket[paket].harga * jumlah);
    tampilkanNotif("Terima kasih, " + nama + "! Pemesanan " + dataPaket[paket].nama + " untuk " + jumlah + " orang (" + total + ") berhasil disimulasikan.", "sukses");
    formBooking.reset();
    hitungTotal();
  } else {
    tampilkanNotif("Data booking belum lengkap. Periksa kolom yang ditandai merah.", "error");
  }
});

/* ---------- 6. Form kontak ---------- */
var formKontak = document.getElementById("formKontak");
bersihkanSaatMengetik(["ktNama", "ktEmail", "ktSubjek", "ktPesan"]);

formKontak.addEventListener("submit", function (event) {
  event.preventDefault();

  var nama = document.getElementById("ktNama").value.trim();
  var email = document.getElementById("ktEmail").value.trim();
  var subjek = document.getElementById("ktSubjek").value.trim();
  var pesan = document.getElementById("ktPesan").value.trim();
  var valid = true;

  if (nama === "") {
    tandaiSalah("ktNama", "errKtNama", "Nama lengkap tidak boleh kosong.");
    valid = false;
  } else {
    tandaiBenar("ktNama");
  }

  if (email === "") {
    tandaiSalah("ktEmail", "errKtEmail", "Email tidak boleh kosong.");
    valid = false;
  } else if (!emailValid(email)) {
    tandaiSalah("ktEmail", "errKtEmail", "Format email tidak valid. Contoh: nama@email.com");
    valid = false;
  } else {
    tandaiBenar("ktEmail");
  }

  if (subjek === "") {
    tandaiSalah("ktSubjek", "errKtSubjek", "Subjek tidak boleh kosong.");
    valid = false;
  } else {
    tandaiBenar("ktSubjek");
  }

  if (pesan === "") {
    tandaiSalah("ktPesan", "errKtPesan", "Pesan tidak boleh kosong.");
    valid = false;
  } else {
    tandaiBenar("ktPesan");
  }

  if (valid) {
    tampilkanNotif("Pesan berhasil dikirim (simulasi). Tim JelajahNusa akan segera menghubungi Anda.", "sukses");
    formKontak.reset();
  } else {
    tampilkanNotif("Pesan belum terkirim. Periksa kolom yang ditandai merah.", "error");
  }
});

/* ---------- 7. Galeri foto ---------- */
var modalGaleri = new bootstrap.Modal(document.getElementById("modalGaleri"));
var itemGaleri = document.getElementsByClassName("gallery-item");

for (var k = 0; k < itemGaleri.length; k++) {
  itemGaleri[k].addEventListener("click", function () {
    var foto = this.getAttribute("data-img");
    var keterangan = this.getAttribute("data-caption");
    document.getElementById("galeriFoto").src = foto;
    document.getElementById("galeriFoto").alt = keterangan;
    document.getElementById("galeriCaption").textContent = keterangan;
    modalGaleri.show();
  });
}
