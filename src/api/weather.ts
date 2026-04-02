const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY as string;

if (!API_KEY) {
  throw new Error("VITE_OPENWEATHER_API_KEY is missing");
}

type OpenWeatherResponse = {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{ description: string; icon: string }>;
  wind: { speed: number };
};

export async function fetchWeather(city: string): Promise<{
  city: string;
  temperature: number;
  description: string;
  feelsLike: number;
  humidity: number;
  wind: number;
  icon: string;
}> {
  const url = new URL("https://api.openweathermap.org/data/2.5/weather");
  url.searchParams.set("q", city);
  url.searchParams.set("appid", API_KEY);
  url.searchParams.set("units", "metric");
  url.searchParams.set("lang", "id");

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error("Kota tidak ditemukan atau API error");
  }

  const data = (await response.json()) as OpenWeatherResponse;

  return {
    city: data.name,
    temperature: data.main.temp,
    description: data.weather[0]?.description ?? "-",
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
    wind: data.wind.speed,
    icon: `https://openweathermap.org/img/wn/${data.weather[0]?.icon}@2x.png`,
  };
}
