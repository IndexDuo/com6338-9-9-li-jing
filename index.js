const submitButton = document.querySelector("button");
const userInput = document.querySelector("input");
const apiKey = "1abc0289565385241e18d438704fb24f";
const weatherSection = document.getElementById("weather");

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(userInput.value);
    weatherSection.innerHTML = "";
    const location = userInput.value;
    userInput.value = "";
    // console.log(userInput.value);
    const displayWeather = async () => {
        try {
            const rawData = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`
            );
            const res = await rawData.json();
            // console.log(res);
            if (
                "data" in res &&
                (res?.cod == "404" || res?.data.cod == "404")
            ) {
                // console.log("not found");
                let notFoundHeading = document.createElement("h2");
                notFoundHeading.textContent = "Location Not Found";
                weatherSection.append(notFoundHeading);
            } else {
                // console.log(res);
                // console.log("found");
                const {
                    name,
                    sys: { country },
                    coord: { lon, lat },
                    weather: [{ icon: icon, description: description }],
                    main: { temp, feels_like },
                } = res;
                const cityCountry = document.createElement("h2");
                cityCountry.textContent = `${name}, ${country}`;
                weatherSection.append(cityCountry);

                const googleMap = document.createElement("a");
                googleMap.href = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
                googleMap.target = "__BLANK";
                googleMap.textContent = "Click to view map";
                weatherSection.appendChild(googleMap);
                // console.log(googleMap);

                const image = document.createElement("img");
                image.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
                weatherSection.appendChild(image);

                const skyPara = document.createElement("p");
                skyPara.style.textTransform = "capitalize";
                skyPara.textContent = `${description}`;
                weatherSection.appendChild(skyPara);

                const tempPara = document.createElement("p");
                tempPara.textContent = `Current: ${temp}`;
                weatherSection.appendChild(tempPara);

                const feelsLikePara = document.createElement("p");
                feelsLikePara.textContent = `Feels like: ${feels_like}`;
                weatherSection.appendChild(feelsLikePara);

                const lastUpdatedPara = document.createElement("p");
                const dt = res.dt * 1000;
                const date = new Date(dt);
                const timeString = date.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                });
                lastUpdatedPara.textContent = `Last updated: ${timeString}`;
                weatherSection.appendChild(lastUpdatedPara);
            }
        } catch (err) {
            console.log(err);
        }
    };

    displayWeather();
});
