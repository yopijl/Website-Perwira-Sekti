let currentPage = 1;
const rowsPerPage = 25;
let data = [];
let filteredData = [];
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

const containerDisplay = document.getElementById('card-container');
const paginationDisplay = document.getElementById('pagination-container');
const searchBar = document.getElementById('search-bar');
const searchType = document.getElementById('search-type');
const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', () => {
  const query = searchBar.value.toLowerCase();
  const type = searchType.value;

  filteredData = data.filter(item => item[type].toString().toLowerCase().includes(query));
  currentPage = 1;
  cardComponent(filteredData, currentPage, rowsPerPage);
});

const cardComponent = (data, page = 1, rowsPerPage = 25) => {
  page--;
  const start = page * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedData = data.slice(start, end);

  let cards = paginatedData.map(item => `
    <div class="card">
      <h4 onclick="showDetailModal(${JSON.stringify(item).replace(/"/g, '&quot;')})">${item['NO._PIRT']}</h4>
      <p>${item.NAMA_BRANDING_PRODUK}</p>
      <p>Kemasan: ${item.KEMASAN}</p>
      <p>Status: ${item.STATUS_PIRT}</p>
      <p>Berlaku Hingga: ${item.BERLAKU_HINGGA ? new Date(item.BERLAKU_HINGGA).toLocaleDateString() : 'N/A'}</p>
    </div>
  `).join('');

  containerDisplay.innerHTML = cards;
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
      cardComponent(data, currentPage, rowsPerPage);
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
    cardComponent(data, currentPage, rowsPerPage);

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
  filteredData = data;

  if (data && data.length > 0) {
    cardComponent(filteredData, currentPage, rowsPerPage);
  } else {
    alertComponent('Tidak ada data ditemukan');
  }
}

function showDetailModal(item) {
  const modalBody = document.querySelector('.modal-body');
  modalBody.innerHTML = `
    <p><strong>NO. PIRT:</strong> ${item['NO._PIRT']}</p>
    <p><strong>NAMA BRANDING PRODUK:</strong> ${item.NAMA_BRANDING_PRODUK}</p>
    <p><strong>JENIS PANGAN:</strong> ${item.JENIS_PANGAN}</p>
    <p><strong>KEMASAN:</strong> ${item.KEMASAN}</p>
    <p><strong>TANGGAL PENGAJUAN:</strong> ${item.TANGGAL_PENGAJUAN ? new Date(item.TANGGAL_PENGAJUAN).toLocaleDateString() : 'N/A'}</p>
    <p><strong>TELP:</strong> ${item.TELP}</p>
    <p><strong>PEMILIK:</strong> ${item.PEMILIK}</p>
    <p><strong>ALAMAT:</strong> ${item.ALAMAT}</p>
    <p><strong>STATUS PIRT:</strong> ${item.STATUS_PIRT}</p>
    <p><strong>BERLAKU HINGGA:</strong> ${item.BERLAKU_HINGGA ? new Date(item.BERLAKU_HINGGA).toLocaleDateString() : 'N/A'}</p>
  `;
  $('#detailModal').modal('show');
}

render();