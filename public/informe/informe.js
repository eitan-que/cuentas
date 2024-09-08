document.addEventListener('DOMContentLoaded', function() {
    const filterSelector = document.getElementById('filterSelector');
    const dataRangeFilter = document.getElementById('dataRangeFilter');
    const recentFilter = document.getElementById('recentFilter');
    const reasonFilter = document.getElementById('reasonFilter');
    const amountFilter = document.getElementById('amountFilter');
    const addFilterButton = document.getElementById('addFilterButton');
    const clearFiltersButton = document.getElementById('clearFiltersButton');
    const filtersContainer = document.getElementById('filtersContainer');

    let filters = [];

    filterSelector.addEventListener('change', function() {
        // Ocultar todos los filtros
        dataRangeFilter.classList.add('hidden');
        recentFilter.classList.add('hidden');
        reasonFilter.classList.add('hidden');
        amountFilter.classList.add('hidden');

        // Mostrar el filtro seleccionado
        const selectedValue = filterSelector.value;
        if (selectedValue === 'dateRange') {
            dataRangeFilter.classList.remove('hidden');
        } else if (selectedValue === 'recent') {
            recentFilter.classList.remove('hidden');
        } else if (selectedValue === 'reason') {
            reasonFilter.classList.remove('hidden');
        } else if (selectedValue === 'amount') {
            amountFilter.classList.remove('hidden');
        }
    });

    addFilterButton.addEventListener('click', function() {
        const selectedValue = filterSelector.value;
        if (selectedValue) {
            addFilter(selectedValue);
        } else {
        }
    });

    clearFiltersButton.addEventListener('click', function() {
        filters = [];
        updateFiltersDisplay();
        fetchDataAndFilter();
    });

    function addFilter(filterType) {
        let filter = { type: filterType };

        if (filterType === 'dateRange') {
            const startDate = document.getElementById('startDate').value;
            const endDate = document.getElementById('endDate').value;

            if (!startDate && !endDate) {
                return;
            }

            filter.startDate = startDate ? new Date(startDate) : null;
            filter.endDate = endDate ? new Date(endDate) : null;
            filter.display = 
            filter.startDate && filter.endDate
                ? `Desde ${filter.startDate.toLocaleDateString()} hasta ${filter.endDate.toLocaleDateString()}`
                : filter.startDate
                ? `Desde ${filter.startDate.toLocaleDateString()}`
                : filter.endDate
                ? `Hasta ${filter.endDate.toLocaleDateString()}`
                : '';

        } else if (filterType === 'recent') {
            filter.recent = document.getElementById('recent').value;
            if (filter.recent === 'day') {
                filter.display = `Menos de 1 día`;
            } else if (filter.recent === 'week') {
                filter.display = `Menos de 1 semana`;
            } else if (filter.recent === 'month') {
                filter.display = `Menos de 1 mes`;
            } else if (filter.recent === 'year') {
                filter.display = `Menos de 1 año`;
            }
        } else if (filterType === 'reason') {
            filter.reason = document.getElementById('reason').value;
            if (!filter.reason) {
                return;
            }
            filter.display = `Razón: ${filter.reason}`;
            
        } else if (filterType === 'amount') {
            const minAmountValue = document.getElementById('minAmount').value;
            const maxAmountValue = document.getElementById('maxAmount').value;

            if (!minAmountValue && !maxAmountValue) {
                return;
            }

            filter.minAmount = minAmountValue ? parseFloat(minAmountValue) : NaN;
            filter.maxAmount = maxAmountValue ? parseFloat(maxAmountValue) : NaN;
            filter.display = 
            !isNaN(filter.minAmount) && !isNaN(filter.maxAmount)
                ? `Entre ${filter.minAmount} y ${filter.maxAmount}`
                : !isNaN(filter.maxAmount)
                ? `Menor a ${filter.maxAmount}`
                : !isNaN(filter.minAmount)
                ? `Mayor a ${filter.minAmount}`
                : '';
        }

        filters.push(filter);
        updateFiltersDisplay();
        fetchDataAndFilter();
    }

    function updateFiltersDisplay() {
        filtersContainer.innerHTML = '';
    
        if (filters.length === 0) {
            document.querySelector('.actualFilters').classList.add('hidden');
        } else {
            document.querySelector('.actualFilters').classList.remove('hidden');
            filters.forEach((filter, index) => {
                const filterElement = document.createElement('div');
                filterElement.classList.add('actualFilter');
                filterElement.classList.add(`${filter.type}Box`);
                filterElement.id = `filter-${index}`;
                filterElement.innerHTML = `
                    <span>${filter.display}</span>
                    <button onclick="removeFilter(${index})">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0,0,256,256">
                        <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(8.53333,8.53333)"><path d="M15,3c-6.627,0 -12,5.373 -12,12c0,6.627 5.373,12 12,12c6.627,0 12,-5.373 12,-12c0,-6.627 -5.373,-12 -12,-12zM16.414,15c0,0 3.139,3.139 3.293,3.293c0.391,0.391 0.391,1.024 0,1.414c-0.391,0.391 -1.024,0.391 -1.414,0c-0.154,-0.153 -3.293,-3.293 -3.293,-3.293c0,0 -3.139,3.139 -3.293,3.293c-0.391,0.391 -1.024,0.391 -1.414,0c-0.391,-0.391 -0.391,-1.024 0,-1.414c0.153,-0.154 3.293,-3.293 3.293,-3.293c0,0 -3.139,-3.139 -3.293,-3.293c-0.391,-0.391 -0.391,-1.024 0,-1.414c0.391,-0.391 1.024,-0.391 1.414,0c0.154,0.153 3.293,3.293 3.293,3.293c0,0 3.139,-3.139 3.293,-3.293c0.391,-0.391 1.024,-0.391 1.414,0c0.391,0.391 0.391,1.024 0,1.414c-0.153,0.154 -3.293,3.293 -3.293,3.293z"></path></g></g>
                    </svg>
                    </button>
                `;
                filtersContainer.appendChild(filterElement);
            });
        }
    }    

    window.removeFilter = function(index) {
        filters.splice(index, 1);
        updateFiltersDisplay();
        fetchDataAndFilter();
    };

    function fetchDataAndFilter() {
        fetch('/api/get-cuentas')
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById('dataRowsContainer');
                container.innerHTML = ''; // Limpiar los datos existentes
                let totalMonto = 0;
                data.forEach((cuenta, index) => {
                    let include = true;
                    filters.forEach(filter => {
                        if (filter.type === 'dateRange') {
                            const cuentaFecha = new Date(cuenta.fecha);
                            include = include && (!filter.startDate || cuentaFecha >= filter.startDate) && (!filter.endDate || cuentaFecha <= filter.endDate);
                        } else if (filter.type === 'recent') {
                            const cuentaFecha = new Date(cuenta.fecha);
                            const now = new Date();
                            if (filter.recent === 'day') {
                                const oneDayAgo = new Date(now);
                                oneDayAgo.setDate(now.getDate() - 1);
                                include = include && cuentaFecha >= oneDayAgo;
                            } else if (filter.recent === 'week') {
                                const oneWeekAgo = new Date(now);
                                oneWeekAgo.setDate(now.getDate() - 7);
                                include = include && cuentaFecha >= oneWeekAgo;
                            } else if (filter.recent === 'month') {
                                const oneMonthAgo = new Date(now);
                                oneMonthAgo.setMonth(now.getMonth() - 1);
                                include = include && cuentaFecha >= oneMonthAgo;
                            } else if (filter.recent === 'year') {
                                const oneYearAgo = new Date(now);
                                oneYearAgo.setFullYear(now.getFullYear() - 1);
                                include = include && cuentaFecha >= oneYearAgo;
                            }
                        } else if (filter.type === 'reason') {
                            include = include && cuenta.razon.includes(filter.reason);
                        } else if (filter.type === 'amount') {
                            const cuentaMonto = parseFloat(cuenta.monto);
                            include = include && (!isNaN(filter.minAmount) ? cuentaMonto >= filter.minAmount : true) &&
                                    (!isNaN(filter.maxAmount) ? cuentaMonto <= filter.maxAmount : true);
                        }
                    });

                    if (include) {
                        const dataRow = document.createElement('div');
                        dataRow.classList.add('dataRow');
                        dataRow.innerHTML = `
                            <div class="dataGridItem">${cuenta.fecha}</div>
                            <div class="dataGridItem">${cuenta.hora}</div>
                            <div class="dataGridItem">$${cuenta.monto}</div>
                            <div class="dataGridItem">${cuenta.razon}</div>
                        `;
                        container.appendChild(dataRow);
                        totalMonto += parseFloat(cuenta.monto);
                    }
                });
                document.getElementById('totalMonto').innerText = `$${totalMonto.toFixed(2)}`;
            })
            .catch(error => console.error('Error al cargar los datos:', error));
    }

    // Cargar datos sin filtros al inicio
    fetchDataAndFilter();
});