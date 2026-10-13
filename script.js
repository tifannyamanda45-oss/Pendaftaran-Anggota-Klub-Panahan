// JS: Validasi Umur
// Umur < 15  -> tolak pendaftaran + alert()
// Data valid -> confirm("Kirim form pendaftaran ke pelatih?")

const form = document.getElementById("formDaftar");
const tabelJadwal = document.getElementById("tabelJadwal");
const inputJadwal = document.getElementById("jadwal");
const barisJadwal = tabelJadwal.querySelectorAll("tr");

// Pilih jadwal latihan dengan klik (atau Enter/Spasi) pada baris tabel
function pilihJadwal(baris) {
  barisJadwal.forEach(function (b) {
    b.classList.remove("dipilih");
  });
  baris.classList.add("dipilih");

  const sel = baris.querySelectorAll("td");
  inputJadwal.value =
    sel[0].textContent + " - " + sel[1].textContent + " (" + sel[2].textContent + ")";
}

barisJadwal.forEach(function (baris) {
  baris.tabIndex = 0;
  baris.addEventListener("click", function () {
    pilihJadwal(baris);
  });
  baris.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      pilihJadwal(baris);
    }
  });
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const umurInput = document.getElementById("umur").value.trim();
  const gender = document.getElementById("gender").value;
  const jadwal = inputJadwal.value;
  const umur = Number(umurInput);

  // Umur < 15 -> tolak pendaftaran (dicek lebih dulu)
  if (umurInput !== "" && umur < 15) {
    alert("Pendaftaran ditolak! Umur minimal 15 tahun.");
    return;
  }

  // Pastikan semua field terisi
  if (nama === "" || umurInput === "" || gender === "") {
    alert("Semua data (Nama, Umur, Jenis Kelamin) harus diisi!");
    return;
  }

  // Data valid -> konfirmasi
  const kirim = confirm("Kirim form pendaftaran ke pelatih?");

  if (kirim) {
    const info = jadwal !== "" ? " (" + jadwal + ")" : "";
    alert("Pendaftaran atas nama " + nama + info + " berhasil dikirim ke pelatih.");
    form.reset();
    barisJadwal.forEach(function (b) {
      b.classList.remove("dipilih");
    });
  }
});
