const tugas = document.getElementById('tugas');
const tambahTugas = document.getElementById('tambahTugas');
const filter = document.getElementById('filter');
const tugasList = document.getElementById('tugasList');
const jumlahTugas = document.getElementById('jumlahTugas');

let arrayTugas = [];

function berbagaiTugas(data) {

    tugasList.innerHTML = "";

    data.forEach(function (item, index) {

        tugasList.innerHTML += `
                                <div class="tugas-tugas">

                                    <div class="tugas-left">

                                    <input type="checkbox" class="tugas-selesai" data-index="${index}" ${item.selesai ? "checked" : ""}>

                                    <p class="nama-tugas"> ${item.nama} </p>

                                    </div>

                                    <div>

                                    <button onclick="editTugas(${index})" class="edit-tugas">Edit</button>

                                    <button onclick="hapusTugas(${index})" id="hapusTugas">Hapus</button>

                                    </div>

                                </div>
                            `;

    })

    const checkbox = document.querySelectorAll(".tugas-selesai");

    checkbox.forEach(function (cek) {

        cek.addEventListener("change", function () {

            const index = cek.dataset.index;

            arrayTugas[index].selesai = cek.checked;

            berbagaiTugas(arrayTugas);

        })

    })

    // TOTAL TUGAS 

    jumlahTugas.textContent = arrayTugas.length;

}

function membuatTugas(event) {

    event.preventDefault();

    if (tugas.value === "") {

        alert("Tidak Boleh Kosong");

        return;

    }

    else {

        arrayTugas.push({

            nama: tugas.value,

            selesai: false

        })
    }

    tugas.value = "";

    berbagaiTugas(arrayTugas);
}

// MENGHUBUNGKAN TAMBAH KE TUGAS 

tambahTugas.addEventListener("click", membuatTugas);

// SEMUA TAMPIL 

document.getElementById("semua").addEventListener("click", function () {

    berbagaiTugas(arrayTugas);

});

// HANYA AKTIF 

document.getElementById('aktif').addEventListener("click", function () {

    const aktifFilter = arrayTugas.filter(function (item) {

        return item.selesai === false;

    });

    berbagaiTugas(aktifFilter)

});

// SELESAI 

document.getElementById("selesai").addEventListener("click", function () {

    const selesaiFilter = arrayTugas.filter(function (item) {

        return item.selesai === true;

    })

    berbagaiTugas(selesaiFilter)
});

// EDIT TUGAS 

function editTugas(index) {
    let tugasBaru = prompt("Ubah tugas:", arrayTugas[index].nama);

    if (tugasBaru !== null && tugasBaru.trim() !== "") {

        arrayTugas[index].nama = tugasBaru;

        berbagaiTugas(arrayTugas);
    }
}

// HAPUS TUGAS 

function hapusTugas(index) {

    arrayTugas.splice(index, 1);

    berbagaiTugas(arrayTugas);
}

// HAPUS SELESAI 

function hapusSelesai() {

    arrayTugas = arrayTugas.filter(function (item) {

        return item.selesai === false;

    });

    berbagaiTugas(arrayTugas);
}

// FILTER NAMA 

const namaFilter = document.getElementById("filter");

namaFilter.addEventListener("input", function () {

    const filterTugas = arrayTugas.filter(function (item) {

        return item.nama.toLowerCase().includes(namaFilter.value.toLowerCase());

    })

    berbagaiTugas(filterTugas);
})

// BUTTON AKTIF 

const tombol = document.querySelectorAll(".menyala");

tombol.forEach(function (button) {
    button.addEventListener("click", function () {

        tombol.forEach(function (item) {

            item.classList.remove("active");
            
        })

        button.classList.add("active");
    });
});