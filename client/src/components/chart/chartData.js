
export const daysInMonth = (m) => {
    if (m === 1 || m === 3 || m === 5 || m === 7 || m === 8 || m === 10 || m === 12) {
        return new Array(31).fill(0).map((_, ind) => (ind + 1));
    }
    if (m === 2) return new Array(28).fill(0).map((_, ind) => (ind + 1));
    else return new Array(30).fill(0).map((_, ind) => (ind + 1));
}

export const dateWiseData = (allItems) => {
    var dataArray = []
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    for (let i = 1; i <= 31; i++) {
        let tot = 0
        for (let j = 0; j < allItems.length; j++) {
            const timeStr = allItems[j].time || allItems[j].date;
            if (!timeStr) continue;

            let itemDay, itemMonth, itemYear;

            // Handle DD/MM/YYYY string format
            if (typeof timeStr === 'string' && timeStr.includes('/')) {
                const parts = timeStr.split('/');
                itemDay = parseInt(parts[0], 10);
                itemMonth = parseInt(parts[1], 10) - 1; // JS months are 0-indexed
                itemYear = parseInt(parts[2], 10);
            } else {
                // Fallback to standard Date parsing
                const d = new Date(timeStr);
                itemDay = d.getDate();
                itemMonth = d.getMonth();
                itemYear = d.getFullYear();
            }

            if (itemDay === i && itemMonth === currentMonth && itemYear === currentYear) {
                tot += allItems[j].totalEnergy || 0;
            }
        }
        dataArray.push([i, tot])
    }
    return dataArray;
}

export const chartData = (dataArray, title) => {
    const data = {
        labels: daysInMonth(new Date().getMonth() + 1),
        datasets: [
            {
                label: 'Calories Intake (kcal)',
                data: dataArray?.map(ele => ele[1]),
                backgroundColor: '#F97316', // Primary Orange
                hoverBackgroundColor: '#EA580C',
                borderRadius: 4,
            },
        ],
    }
    return data;
}

export const lineChartData = (dataArray, title) => {
    const data = {
        labels: daysInMonth(new Date().getMonth() + 1),
        datasets: [
            {
                label: '7-Day Trend',
                data: dataArray?.map(ele => ele[1]),
                fill: true,
                backgroundColor: 'rgba(14, 165, 233, 0.1)', // Light Sky Blue Area
                borderColor: '#0EA5E9', // Sky Blue Line
                tension: 0.4,
                pointRadius: 3,
                pointHoverRadius: 6,
                borderWidth: 2,
            },
        ],
    }
    return data;
}

export const singleProductData = (product) => {
    let title = product.Category
    let protein = product.Data.Protein || 0;
    let carb = product.Data.Carbohydrate || 0;
    let fat = product.Data.Fat?.['Total Lipid'] || 0;
    
    return {
        labels: ['Protein', 'Carbs', 'Fat'],
        datasets: [{
            label: title,
            data: [protein, carb, fat],
            backgroundColor: [
                '#10B981', // Green for protein
                '#3B82F6', // Blue for carbs
                '#EF4444'  // Red for fat
            ],
            borderWidth: 0,
            hoverOffset: 10,
        }],
    }
}




