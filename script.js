async function fetchData() {
    try {
        const response = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=QF2TQzzWN1vxXPGVY6UCbib8s6Jlly5eTyhnXOt4X5jyOUmLM9xppr2UP9WKhry7h0Nrz3F1TFQtC6Af7yMDNm4MZk1DS6qsm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnO_SecaivPBekCHQCuLnl9MnZE_BEL0vgzu6VMj-LpgXpbDBs3f-UK0aNN6FBpC-8lC8lVjenL1GNIJYBNc0j4ghh8oSjm9bC9z9Jw9Md8uu&lib=MHJGUzrccgGL0JFfx8Nqd9VUvbkCy_f6O');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Ambil tag id container
const containerDisplay = document.getElementById('container')

// Komponen Card untuk render semua data
const cardComponent = (title, body) => {
    // Buat Card
    const data = `
        <div class="border rounded-md p-4 flex justify-between items-start gap-x-3">
            <div>
               <h1 class="font-bold mb-3">${title}</h1>
               <span class="text-sm text-gray-500">${body}</span>
            </div>
            <div>
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
               </svg>
            </div>
         </div>
    `

    // Tambahkan kedalam elemen container yang sudah kita definisikan sebelumnya
    containerDisplay.insertAdjacentHTML('afterbegin', data)
}

// Komponen Alert jika terdapat error
const alertComponent = (message) => {
    const data = `
    <table>
    <tr>
      <th>Company</th>
      <th>Contact</th>
      <th>Country</th>
    </tr>
    <tr>
      <td>Alfreds Futterkiste</td>
      <td>Maria Anders</td>
      <td>Germany</td>
    </tr>
    <tr>
      <td>Centro comercial Moctezuma</td>
      <td>Francisco Chang</td>
      <td>Mexico</td>
    </tr>
  </table>
 `
    containerDisplay.insertAdjacentHTML('afterbegin', data)
}

function render() {
    fetchData()
        .then((response) => {
            alertComponent()
            // response.forEach(result => {
            //     cardComponent(result.title, result.body);
            // });
        })
        .catch((error) => {
            // alertComponent(error.message)
        });
}

render();