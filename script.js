let currentPage = 1;
const rowsPerPage = 25;
let data = [];
let totalPageCount = 0;

async function fetchData() {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbz14NyIwqp-zFhJSLII9YhxDG0qbqaWAXtIgF6GRM16OTjeXuQnjd8vc6yQrwja37mZbw/exec');
        const data = await response.json();
        return data.records;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Ambil tag id container
const containerDisplay = document.getElementById('table-container');
const paginationDisplay = document.getElementById('pagination-container');

const tableComponent = (data, page = 1, rowsPerPage = 25) => {
    page--;
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedData = data.slice(start, end);

    let table = `
        <table class="table">
            <thead>
                <tr>
                    <th>NO. PIRT</th>
                    <th>NAMA BRANDING PRODUK</th>
                    <th>JENIS PANGAN</th>
                    <th>KEMASAN</th>
                    <th>TANGGAL PENGAJUAN</th>
                    <th>TELP</th>
                    <th>PEMILIK</th>
                    <th>ALAMAT</th>
                    <th>STATUS PIRT</th>
                    <th>BERLAKU HINGGA</th>
                </tr>
            </thead>
            <tbody>
    `;

    paginatedData.forEach(item => {
        table += `
            <tr>
                <td>${item['NO._PIRT'] ? item['NO._PIRT'] : 'N/A'}</td>
                <td>${item.NAMA_BRANDING_PRODUK ? item.NAMA_BRANDING_PRODUK : 'N/A'}</td>
                <td>${item.JENIS_PANGAN ? item.JENIS_PANGAN : 'N/A'}</td>
                <td>${item.KEMASAN ? item.KEMASAN : 'N/A'}</td>
                <td>${item.TANGGAL_PENGAJUAN ? new Date(item.TANGGAL_PENGAJUAN).toLocaleDateString() : 'N/A'}</td>
                <td>${item.TELP ? item.TELP : 'N/A'}</td>
                <td>${item.PEMILIK ? item.PEMILIK : 'N/A'}</td>
                <td>${item.ALAMAT ? item.ALAMAT : 'N/A'}</td>
                <td>${item.STATUS_PIRT ? item.STATUS_PIRT : 'N/A'}</td>
                <td>${item.BERLAKU_HINGGA ? new Date(item.BERLAKU_HINGGA).toLocaleDateString() : 'N/A'}</td>
            </tr>
        `;
    });

    table += `
            </tbody>
        </table>
    `;

    containerDisplay.innerHTML = table;
    setupPagination(data, paginationDisplay, rowsPerPage);
}

const setupPagination = (data, wrapper, rowsPerPage) => {
    wrapper.innerHTML = '';

    const pageCount = Math.ceil(data.length / rowsPerPage);
    totalPageCount = pageCount;
    let startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
    let endPage = Math.min(startPage + 4, pageCount);

    for (let i = startPage; i <= endPage; i++) {
        let btn = paginationButton(i, data);
        wrapper.appendChild(btn);
    }

    if (endPage < pageCount) {
        let nextBtn = document.createElement('button');
        nextBtn.innerText = '>>';
        nextBtn.addEventListener('click', () => {
            currentPage = endPage + 1;
            tableComponent(data, currentPage, rowsPerPage);
        });
        wrapper.appendChild(nextBtn);
    }
}

const paginationButton = (page, data) => {
    const button = document.createElement('button');
    button.innerText = page;

    if (currentPage === page) button.classList.add('active');

    button.addEventListener('click', () => {
        currentPage = page;
        tableComponent(data, currentPage, rowsPerPage);

        let currentBtn = document.querySelector('.pagination button.active');
        if (currentBtn) currentBtn.classList.remove('active');

        button.classList.add('active');
    });

    return button;
}

const alertComponent = (message) => {
    const data = `
        <div class="alert alert-danger" role="alert">
            ${message}
        </div>
    `;

    containerDisplay.innerHTML = data;
}

async function render() {
    data = await fetchData();

    if (data && data.length > 0) {
        tableComponent(data, currentPage, rowsPerPage);
    } else {
        alertComponent('Tidak ada data ditemukan');
    }
}

render();
