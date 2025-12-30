# Weather-App

This is a solution to the [Weather app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- Search for weather information by entering a location in the search bar
- View current weather conditions including temperature, weather icon, and location details
- See additional weather metrics like "feels like" temperature, humidity percentage, wind speed, and precipitation amounts
- Browse a 7-day weather forecast with daily high/low temperatures and weather icons
- View an hourly forecast showing temperature changes throughout the day
- Switch between different days of the week using the day selector in the hourly forecast section
- Toggle between Imperial and Metric measurement units via the units dropdown 
- Switch between specific temperature units (Celsius and Fahrenheit) and measurement units for wind speed (km/h and mph) and precipitation (millimeters) via the units dropdown
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./screenshots/weather%20app%20mobile.png)

![](./screenshots/weather%20app%20desktop.png)

### Links

- Solution URL: [Add solution URL here](https://github.com/konraddissake1808/Weather-App)

- Live Site URL: [Add live site URL here](https://weather-pol6x1kxr-konrad-dissakes-projects.vercel.app/)

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - For styles
- [MongoDB Atlas](https://www.mongodb.com/products/platform?msockid=1e5dea0b621c6d713e20ffb063b06c96) - Cloud NoSQL Database service
- [Open-Meteo](https://open-meteo.com/) - Weather data API
- [Nominatim](https://nominatim.org/) - Geocoding API

### What I learned

- How to manipulate an external API's data and intergrate it.
- How to integrate multiple API's in one project and make them work together
- I learned how to use array indexes as keys for the rendering of component elements.
```jsx
        <div id='hourlyForcastDropdownContainer'>
            {day.map((days, index) => (
              <div key={index} id={`forecastDayOption${index}`}>    
                <div id={`hourlyForecastButton${index}`} className='mb-1 bg-neutral-800 rounded-lg dropdownButton'>
                  <button onClick={() => buttonClick(days ?? '', index)} className=' font-dm-sans font-medium text-base text-neutral-0 h-[39px] px-1.5'>{days}</button>
                </div>
              </div>
            ))}
        </div>
```

### Continued development

- Improve the code efficience

## Author

- Github - [konraddissake1808](https://github.com/konraddissake1808)
- Frontend Mentor - [@konraddissake1808](https://www.frontendmentor.io/profile/konraddissake1808)
- LinkedIn - [Konrad Dissake Ngando](https://www.linkedin.com/in/konrad-dissake-ngando)