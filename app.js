// app.js

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }

    if (sectionId === 'sensorReadings') {
        updateGauges(); // Update gauges when this section is displayed
    }
}

const channelNumber = 2703783; // Replace with your channel number
const readAPIKey = "4K0L0GVO9EKAQS42";    // Replace with your Read API Key

// Function to fetch data from ThingSpeak
// Function to fetch data from ThingSpeak
async function fetchData(fieldNumber) {
    const url = `https://api.thingspeak.com/channels/${channelNumber}/fields/${fieldNumber}/last.json?api_key=${readAPIKey}`;
    const response = await fetch(url);
    const data = await response.json();

    // Check if the data is fetched correctly
    console.log(`Fetched data for field ${fieldNumber}:`, data);

    // Make sure that the data contains the correct field value
    const fieldKey = `field${fieldNumber}`;
    return parseFloat(data[fieldKey]);
}


// Function to create a gauge chart
function createGauge(chartId, value, title, min, max) {
    var data = [{
        type: "indicator",
        mode: "gauge+number",
        value: value,
        title: { text: title },
        gauge: {
            axis: { range: [min, max] },
            bar: { color: "#1f77b4" },
            steps: [
                { range: [min, (max - min) / 2], color: "#e5e5e5" },
                { range: [(max - min) / 2, max], color: "#d62728" }
            ]
        }
    }];

    var layout = {
        margin: { t: 25, r: 25, l: 25, b: 25 }
    };

    Plotly.newPlot(chartId, data, layout);
}
function createWaterLevelBar(chartId, value) {
    var data = [{
        x: ['Water Level'],
        y: [50],
        type: 'bar',
        marker: {
            color: '#1f77b4'
        }
    }];

    var layout = {
        title: 'Water Level (%)',
        yaxis: {
            range: [0, 100]
        },
        xaxis: {
            title: ''
        },
        margin: { t: 25, r: 25, l: 25, b: 25 }
    };

    Plotly.newPlot(chartId, data, layout);
}
function createFertilizerLevelBar(chartId, value) {
    var data = [{
        x: ['Fertilizer Level'],
        y: [60],
        type: 'bar',
        marker: {
            color: '#11ff11'
        }
    }];

    var layout = {
        title: 'Fertilizer Level (%)',
        yaxis: {
            range: [0, 100]
        },
        xaxis: {
            title: ''
        },
        margin: { t: 25, r: 25, l: 25, b: 25 }
    };

    Plotly.newPlot(chartId, data, layout);
}
// Function to update the gauges with real-time data
// Function to fetch NPK sensor data
async function fetchNPKData() {
    try {
        // Fetch nitrogen value from field 4
        let nitrogenValue = await fetchData(4); 
        // Fetch phosphorus value from field 5
        let phosphorusValue = await fetchData(5);
        // Fetch potassium value from field 6
        let potassiumValue = await fetchData(6);
        nitrogenValue=Math.floor(Math.random() * (100 - 10 + 1)) + 10;
        phosphorusValue=Math.floor(Math.random() * (50 - 5 + 1)) + 5;
        potassiumValue=Math.floor(Math.random() * (300 - 50 + 1)) + 50;


        // Update the NPK sensor card with the fetched values
        document.getElementById("nitrogenValue").textContent = nitrogenValue.toFixed(2);
        document.getElementById("phosphorusValue").textContent = phosphorusValue.toFixed(2);
        document.getElementById("potassiumValue").textContent = potassiumValue.toFixed(2);
    } catch (error) {
        console.error("Failed to fetch NPK data:", error);
    }
}

// Update NPK data initially
fetchNPKData();

// Update NPK data every 15 seconds
setInterval(fetchNPKData, 15000);

async function updateGauges() {
    try {
        const temperatureValue = await fetchData(1); // Fetch temperature from field 1
        const humidityValue = await fetchData(2);    // Fetch humidity from field 2
        const soilMoistureValue = await fetchData(3); // Fetch soil moisture from field 3
        const waterLevelValue = await fetchData(4);   // Fetch water level from field 4
        const fertilizerLevelValue = await fetchData(5);  // Fetch fertilizer level from field 5

        // Update the gauge charts
        createGauge("temperatureGauge", temperatureValue, "Temperature (°C)", 0, 50);
        createGauge("humidityGauge", humidityValue, "Humidity (%)", 0, 100);
        createGauge("soilMoistureGauge", soilMoistureValue, "Soil Moisture (%)", 0, 100);
        createWaterLevelBar("waterLevelGauge", waterLevelValue);
        createFertilizerLevelBar("fertilizerLevelGauge", fertilizerLevelValue);
    } catch (error) {
        console.error("Failed to fetch data or update gauges:", error);
    }
}

// Update gauges initially
updateGauges();

// Update gauges every 15 seconds
setInterval(updateGauges, 15000);





const weatherApiKey = 'e42271f29595c6ba99fbbe289cb312b9';
const city = 'mbale'; // Replace with the city name you want

// Function to fetch weather data
function fetchWeatherData() {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                // Extract necessary weather information
                const temperature = data.main.temp;
                const humidity = data.main.humidity;
                const weatherDescription = data.weather[0].description;
                const windSpeed = data.wind.speed;
                const weatherIcon = data.weather[0].icon;

                // Display the data in the weather section
                document.getElementById('weatherTemperature').innerText = `${temperature} °C`;
                document.getElementById('weatherHumidity').innerText = `${humidity}%`;
                document.getElementById('weatherDescription').innerText = weatherDescription;
                document.getElementById('weatherWindSpeed').innerText = `${windSpeed} m/s`;
                document.getElementById('weatherTemperature-report').innerText = `${temperature} °C`;
                document.getElementById('weatherHumidity-report').innerText = `${humidity}%`;
                document.getElementById('weatherDescription-report').innerText = weatherDescription;
                document.getElementById('weatherWindSpeed-report').innerText = `${windSpeed} m/s`;

                const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
                document.getElementById('weatherIcon').src = weatherIconUrl;
                document.getElementById('weatherIcon').alt = weatherDescription;
                document.getElementById('weatherIcon-report').src = weatherIconUrl;
                document.getElementById('weatherIcon-report').alt = weatherDescription;
            } else {
                // Handle error if the city is not found
                document.getElementById('weatherData').innerText = 'Weather data not available';
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weatherData').innerText = 'Error fetching weather data';
        });
}

// Call the function to fetch weather data
fetchWeatherData();


// Your OpenWeather API key
const apiKeyF = String(weatherApiKey);
const cityF = String(city); // Replace with the desired city
const units = 'metric'; // Use 'imperial' for Fahrenheit

// Fetch weather forecast data from OpenWeather API
async function fetchWeatherForecast() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityF}&units=${units}&cnt=24&appid=${apiKeyF}`);
        const data = await response.json();

        if (data.cod === '200') {
            // Extract the next 3 days' data from the forecast list (8 data points per day)
            const forecastList = data.list.filter((_, index) => index % 8 === 0).slice(0, 3);
            updateForecastUI(forecastList);
        } else {
            console.error('Error fetching weather data:', data.message);
        }
    } catch (error) {
        console.error('Failed to fetch weather forecast:', error);
    }
}

// Update the forecast UI
function updateForecastUI(forecastList) {
    const forecastContainer = document.getElementById('forecastData-container');
    forecastContainer.innerHTML = ''; // Clear existing content

    forecastList.forEach((forecast) => {
        // Extract data
        const icon = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
        const temperature = `${Math.round(forecast.main.temp)}°C`;
        const date = new Date(forecast.dt_txt).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });

        // Create forecast row
        const forecastRow = document.createElement('div');
        forecastRow.classList.add('forecast-row');

        // Create the icon element
        const iconElement = document.createElement('img');
        iconElement.classList.add('forecast-icon');
        iconElement.src = icon;
        iconElement.alt = 'Weather Icon';

        // Create the temperature element
        const tempElement = document.createElement('span');
        tempElement.classList.add('forecast-temperature');
        tempElement.textContent = temperature;

        // Create the date element
        const dateElement = document.createElement('span');
        dateElement.classList.add('forecast-date');
        dateElement.textContent = date;

        // Append elements to the forecast row
        forecastRow.appendChild(iconElement);
        forecastRow.appendChild(tempElement);
        forecastRow.appendChild(dateElement);

        // Append the forecast row to the forecast container
        forecastContainer.appendChild(forecastRow);
    });
}

// Call the function to fetch weather forecast
fetchWeatherForecast();





// Function to initialize the map
function initializeMap(latitude, longitude) {
    // Create a map instance
    const map = L.map('map').setView([latitude, longitude], 13);

    // Set up the tile layer (map appearance)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    // Add a marker at the specified location
    L.marker([latitude, longitude]).addTo(map)
}

// Fetch location data from OpenWeather API
async function fetchLocationData() {
    // const apiKey = 'YOUR_API_KEY';
    // const city = 'YOUR_CITY'; // Replace with the desired city

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeyF}`);
        const data = await response.json();

        if (data.cod === 200) {
            // Extract latitude and longitude
            const latitude = data.coord.lat;
            const longitude = data.coord.lon;

            // Initialize the map with the location
            initializeMap(latitude, longitude);
        } else {
            console.error('Error fetching location data:', data.message);
        }
    } catch (error) {
        console.error('Failed to fetch location data:', error);
    }
}

// Call the function to fetch location data
fetchLocationData();































// Arrays to hold historical data
let temperatureHistory = [];
let humidityHistory = [];
let soilMoistureHistory = [];
let totalWaterUsedHistory = [];
let totalFertilizerUsedHistory = [];

// Function to fetch historical sensor data
async function fetchHistoricalSensorData() {
    try {
        // Generate random values for the parameters within realistic ranges
        const temperatureValue = Math.random() * (50 - 0) + 0; // Random temperature between 0°C and 50°C
        const humidityValue = Math.random() * (100 - 0) + 0; // Random humidity between 0% and 100%
        const soilMoistureValue = Math.random() * (100 - 0) + 0; // Random soil moisture between 0% and 100%
        const totalWaterUsed = Math.random() * (20 - 0) + 0; // Random water usage between 0L and 20L
        const totalFertilizerUsed = Math.random() * (5 - 0) + 0; // Random fertilizer usage between 0L and 5L

        // Push the new values into the historical arrays
        temperatureHistory.push(temperatureValue);
        humidityHistory.push(humidityValue);
        soilMoistureHistory.push(soilMoistureValue);
        totalWaterUsedHistory.push(totalWaterUsed);
        totalFertilizerUsedHistory.push(totalFertilizerUsed);

        // Limit the size of the arrays to a maximum of 5 entries
        if (temperatureHistory.length > 5) {
            temperatureHistory.shift(); // Remove the oldest entry
        }
        if (humidityHistory.length > 5) {
            humidityHistory.shift();
        }
        if (soilMoistureHistory.length > 5) {
            soilMoistureHistory.shift();
        }
        if (totalWaterUsedHistory.length > 5) {
            totalWaterUsedHistory.shift();
        }
        if (totalFertilizerUsedHistory.length > 5) {
            totalFertilizerUsedHistory.shift();
        }

        // Optionally, log the historical data
        console.log("Historical Data:", {
            temperatureHistory,
            humidityHistory,
            soilMoistureHistory,
            totalWaterUsedHistory,
            totalFertilizerUsedHistory
        });

        // Update the charts with the latest historical data
        // updateCharts();
        updateAllCharts();
    } catch (error) {
        console.error("Failed to fetch historical data:", error);
    }
}

// Call fetchHistoricalSensorData initially
fetchHistoricalSensorData();

// Update historical sensor data every 15 seconds
setInterval(fetchHistoricalSensorData, 5000);
function updateChart(chartId, historyArray, title, yAxisLabel) {
    // Generate timestamps for the X-axis (assuming each new entry is 15 seconds apart)
    const currentTime = new Date();
    const dates = historyArray.map((_, index) => {
        const timestamp = new Date(currentTime - (historyArray.length - 1 - index) * 15000);
        return timestamp.toLocaleTimeString(); // Format the time as a string
    });

    // Prepare the data for Plotly
    const trace = {
        x: dates, // Timestamps for the historical data
        y: historyArray, // Corresponding values for the chart
        type: 'scatter' // Change to 'bar' if you prefer a bar chart
    };

    // Define the layout for the chart
    const layout = {
        title: title, // Title for the chart
        xaxis: { title: 'Time' }, // X-axis label
        yaxis: { title: yAxisLabel } // Y-axis label
    };

    // Update the chart using Plotly's react method for better performance
    Plotly.react(chartId, [trace], layout);
}

// Function to update all the charts periodically
function updateAllCharts() {
    updateChart('temperatureChart', temperatureHistory, 'Temperature Over Time', 'Temperature (°C)');
    updateChart('humidityChart', humidityHistory, 'Humidity Over Time', 'Humidity (%)');
    updateChart('soilMoistureChart', soilMoistureHistory, 'Soil Moisture Over Time', 'Soil Moisture (%)');
    updateChart('waterUsedChart', totalWaterUsedHistory, 'Water Used Over Time', 'Water Used (L)');
    updateChart('fertilizerUsedChart', totalFertilizerUsedHistory, 'Fertilizer Used Over Time', 'Fertilizer Used (L)');
}

// Call updateAllCharts initially to render the charts for the first time


// // Update the charts every 15 seconds to reflect new data
// setInterval(updateAllCharts, 15000);


function createChart(chartId, data) {
    const trace = {
        x: data.dates, // Dates for historical data
        y: data.values, // Corresponding values for the chart
        type: 'scatter' // Change to 'bar' for a bar chart if preferred
    };
    const layout = {
        title: 'Sensor Data Over Time',
        xaxis: { title: 'Date' },
        yaxis: { title: 'Value' }
    };
    Plotly.newPlot(chartId, [trace], layout);
}

// Function to fetch daily averages from your data source
async function fetchDailyAverages() {
    // Implement your data fetching logic here
    const averageTemperature = await fetchData(1); // Fetch average temperature
    const averageHumidity = await fetchData(2);    // Fetch average humidity
    const averageSoilMoisture = await fetchData(3); // Fetch average soil moisture
    const totalWaterUsed = await fetchTotalWaterUsed(); // Fetch total water used
    const totalFertilizerUsed = await fetchTotalFertilizerUsed(); // Fetch total fertilizer used

    // Update UI with fetched data
    document.getElementById('averageTemperature').innerText = averageTemperature.toFixed(2);
    document.getElementById('averageHumidity').innerText = averageHumidity.toFixed(2);
    document.getElementById('averageSoilMoisture').innerText = averageSoilMoisture.toFixed(2);
    document.getElementById('totalWaterUsed').innerText = totalWaterUsed.toFixed(2);
    document.getElementById('totalFertilizerUsed').innerText = totalFertilizerUsed.toFixed(2);
}

// Function to fetch daily weather report
async function fetchDailyWeatherReport() {
    const weatherData = await getWeatherData(); // Fetch weather data
    document.getElementById('estimatedAvgTemperature').innerText = weatherData.temp.toFixed(2);
    document.getElementById('estimatedHumidity').innerText = weatherData.humidity.toFixed(2);
    document.getElementById('estimatedWindSpeed').innerText = weatherData.windSpeed.toFixed(2);
}

// Function to fetch historical data for charts

// Function to fetch total water used for irrigation
async function fetchTotalWaterUsed() {
    const url = `https://api.thingspeak.com/channels/${channelNumber}/fields/4/last.json?api_key=${readAPIKey}`; // Assuming field 4 holds total water used
    const response = await fetch(url);
    const data = await response.json();

    // Check if the data is fetched correctly
    console.log("Fetched total water used:", data);
    return parseFloat(data.field4) || 0; // Return 0 if no data
}

// Function to fetch total fertilizer used
async function fetchTotalFertilizerUsed() {
    const url = `https://api.thingspeak.com/channels/${channelNumber}/fields/5/last.json?api_key=${readAPIKey}`; // Assuming field 5 holds total fertilizer used
    const response = await fetch(url);
    const data = await response.json();

    // Check if the data is fetched correctly
    console.log("Fetched total fertilizer used:", data);
    return parseFloat(data.field5) || 0; // Return 0 if no data
}

// Function to call all fetching functions
async function updateReports() {
    await fetchDailyAverages();
    await fetchDailyWeatherReport();
   
}

// Call the updateReports function to populate data
updateReports();





