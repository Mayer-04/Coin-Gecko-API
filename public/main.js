const dataTable = document.querySelector('[data-table]');

const exchange = async () => {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/exchanges?per_page=20');
        const data = await response.json();
        mostrarCriptomonedas(data);
    } catch (error) {
        throw new Error(`Error al obtener los exchanges: ${error}`);
    }
};

const mostrarCriptomonedas = (exchanges) => {
    const contenedor = document.querySelector('[data-container]');
    const div = document.createElement('div');
    const tabla = `
    <table class="table p-4 bg-white rounded-lg shadow">
        <thead>
            <tr>
                <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                    #
                </th>
                <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                    Intercambios
                </th>
                <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                    País
                </th>
                <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                    Volumen en 24 h (normalizado)
                </th>
                <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                    Volumen en 24 h    
            </tr>
        </thead>
        <tbody>
            ${exchanges.map((exchange, index) => `
            <tr class="text-gray-700">
                 <td class="border-b-2 p-4 dark:border-dark-5">
                    ${index + 1}
                </td>
                <td class="border-b-2 p-4 dark:border-dark-5">
                <div class="flex items-center">
                 <img class="m-2" src="${exchange.image}" alt="${exchange.name}"></img>
                     <span>${exchange.name}</span>
                </div>
                </td>
                <td class="border-b-2 p-4 dark:border-dark-5">
                    ${exchange.country}
                </td>
                <td class="border-b-2 p-4 dark:border-dark-5">
                    ${exchange.trade_volume_24h_btc_normalized} US$
                </td>
                <td class="border-b-2 p-4 dark:border-dark-5">
                    ${exchange.trade_volume_24h_btc} US$
                </td>
            </tr>
            `).join('')}
        </tbody>
    </table>
    `;
    div.innerHTML = tabla;
    contenedor.appendChild(div);
};

exchange();
