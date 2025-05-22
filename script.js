const cities = [
  { name: 'Dhaka', style: 'bg-indigo-500 col-span-1 row-span-1' },
  { name: 'London', style: 'bg-green-500 col-span-2 row-span-1' },
  { name: 'New York', style: 'bg-pink-500 col-span-1 row-span-2' },
  { name: 'Tokyo', style: 'bg-yellow-400 col-span-1 row-span-1' },
  { name: 'Paris', style: 'bg-red-400 col-span-2 row-span-1' },
  { name: 'Sydney', style: 'bg-blue-400 col-span-1 row-span-1' },
  { name: 'Toronto', style: 'bg-purple-400 col-span-1 row-span-1' }
];

const API_KEY = '9863fe4edd8d0cffa5112a2b68312d35'; // replace with your OpenWeatherMap API key
const container = document.getElementById('weatherGrid');

cities.forEach(city => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${API_KEY}&units=metric`)
    .then(res => res.json())
    .then(data => {
      const box = document.createElement('div');
      box.className = `${city.style} text-white p-4 rounded-xl shadow-lg flex flex-col justify-between`;



      box.innerHTML = `
            <h2 class="text-2xl font-bold">${data.name}</h2>
            <p class="text-lg">${data.weather[0].main} - ${data.weather[0].description}</p>
            <p class="text-3xl font-semibold mt-2">${data.main.temp}°C</p>
            <div class="text-sm mt-auto opacity-80">
              Humidity: ${data.main.humidity}%<br>
              Wind: ${data.wind.speed} m/s 
              <br>Local Time: ${new Date((Date.now() + data.timezone * 1000) + new Date().getTimezoneOffset() * 60000).toLocaleTimeString()}

             
              
            </div>
          `;

      container.appendChild(box);
    })
    .catch(err => {
      const errorBox = document.createElement('div');
      errorBox.className = `${city.style} text-white p-4 rounded-xl shadow-lg`;
      errorBox.innerHTML = `<h2 class="text-xl font-bold">${city.name}</h2><p>Error loading weather</p>`;
      container.appendChild(errorBox);
    });
});