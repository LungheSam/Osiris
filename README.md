# Osiris - Smart Agriculture IoT Web Application

## Overview
Welcome to **Osiris**, the smart agriculture IoT web application developed during the **GreenGrowth AgriHack Hackathon** held in **Kampala, October 18-20, 2024**. This project aims to enhance sustainable farming practices through the integration of IoT technology, enabling real-time monitoring, data analysis, and intelligent recommendations for precision agriculture.

## Features
- **Dashboard Overview**: Displays an overview of the system status, alerts, and key metrics.
- **Sensor Readings**: Real-time monitoring of environmental parameters such as temperature, humidity, soil moisture, water usage, and fertilizer levels.
- **Historical Data**: Charts and visualizations for sensor readings over the past 3 days.
- **Daily Reports**: Aggregated daily sensor data and weather reports.
- **Recommendations and Resources**: Provides agricultural recommendations based on data and access to helpful resources, including articles, books, and online courses.
- **Email Notifications**: Automated email reports with key data and recommendations sent every 15 seconds.

## Technology Stack
- **Frontend**: HTML, CSS, JavaScript
- **Visualization**: Plotly.js for interactive charts
- **Backend**: Node.js (optional for future enhancements)
- **APIs**:
  - OpenWeather API for weather data
  - ThingSpeak API for IoT data

## Getting Started
Follow these instructions to get the project up and running on your local machine.

### Prerequisites
- A code editor (e.g., VS Code)
- A web browser (e.g., Google Chrome)
- [Node.js](https://nodejs.org/) (optional for future backend integrations)

### Installation
1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/osiris-iot-webapp.git
   cd osiris-iot-webapp


2. **Setup APIs**
   - Get your API keys for ThingSpeak and OpenWeather.
   - Update the JavaScript files with your API keys.

3. **Run the Application**
   - Open `index.html` in your web browser to view the web app.

## Project Structure
```
osiris-iot-webapp/
├── index.html          # Main HTML file
├── styles.css
├── app.js

```

## Configuration
To configure the web app for your specific IoT setup:
1. **API Keys**: Update the API keys in the `app.js` file.
2. **ThingSpeak Channels**: Set your channel numbers and field mappings for temperature, humidity, soil moisture, etc.
3. **Email Settings**: Configure the email service (e.g., SMTP) in `email.js` to automate sending notifications.

## Usage
1. **Real-Time Monitoring**: View live sensor data on the dashboard.
2. **Historical Data Analysis**: Navigate to the "Reports" section to see historical charts and daily summaries.
3. **Recommendations**: Check the "Recommendations" section for smart farming tips and curated resources.
4. **Automated Emails**: Receive frequent updates via email with important insights and alerts.

## Future Enhancements
- **SMS Alerts**: Integrate SMS notifications for critical alerts.
- **Mobile App**: Develop a mobile version for field use.
- **Machine Learning**: Implement predictive analytics to forecast future environmental trends.

## Contributing
We welcome contributions to this project! Please follow the steps below:
1. **Fork the Repository**
2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/new-feature
   ```
3. **Commit Your Changes**
   ```bash
   git commit -m "Add a new feature"
   ```
4. **Push to the Branch**
   ```bash
   git push origin feature/new-feature
   ```
5. **Create a Pull Request**

## Acknowledgements
- **GreenGrowth AgriHack Hackathon** for the opportunity to develop this solution.
- **OpenWeather API** and **ThingSpeak** for providing data services.
- All the team members and mentors for their valuable input.


