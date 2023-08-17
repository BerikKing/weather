import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const [weather, setWeather] = useState(null);

    const submitForm = (event) => {
        event.preventDefault();

        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${event.target[0].value}&appid=99a94c8f55ccdf9e745dfd07c96f9da3`
        )
            .then((res) => res.json())
            .then((res) => {
                if (res.cod === 200) {
                    setWeather(res);
                } else {
                    toast(res.message);
                }
            });
    };

    const cityTranslations = {
        Almaty: "Алматы",
        NewYork: "Нью-Йорк",
        Moscow: "Москва",
        // Добавьте остальные города
      };

    return (
        <div className="App">
            <h1>Прогноз погоды</h1>

            <form onSubmit={submitForm}>
                <input type="text" placeholder="Название города" />
                <button type="submit">Получить погоду</button>
            </form>

            {weather && (
                <div>
                    <h2>Погода в городе {cityTranslations[weather.name]}</h2>
                    <p>Температура: {Math.round(weather.main.temp - 273.15)} °C </p>
                    <p>Описание: {weather.weather[0].description}</p>
                </div>
            )}

                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <ToastContainer />
        </div>
    );
}

export default App;
