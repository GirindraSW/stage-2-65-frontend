import { useEffect, useState } from "react";
import { fetchWeather } from "../api/weather";
import { useDebounce } from "../hooks/debounce";

type WeatherData = {
  city: string;
  temperature: number;
  description: string;
  feelsLike: number;
  humidity: number;
  wind: number;
  icon: string;
};

export function WeatherApp() {
  const [cityInput, setCityInput] = useState("");
  const [query, setQuery] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedInput = useDebounce(cityInput, 3000);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = cityInput.trim();
    if (!cleaned) {
      setError("Nama kota tidak boleh kosong");
      setWeatherData(null);
      return;
    }
    setError(null);
    setQuery(cleaned);
  };

  useEffect(() => {
    const cleaned = debouncedInput.trim();
    if (!cleaned) {
      setWeatherData(null);
      setError(null);
      return;
    }
    setQuery(cleaned);
  }, [debouncedInput]);

  useEffect(() => {
    if (!query) return;

    let isActive = true;

    const run = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchWeather(query);
        if (isActive) {
          setWeatherData(data);
        }
      } catch (err: any) {
        if (isActive) {
          setWeatherData(null);
          setError(err?.message || "Gagal mengambil data cuaca");
        }
      } finally {
        if (isActive) setLoading(false);
      }
    };

    run();

    return () => {
      isActive = false;
    };
  }, [query]);

  return (
    <div className="weather">
      <header className="weather__header">
        <p className="weather__eyebrow">Checkpoint 1 - Weather App</p>
        <h1>City Weather Snapshot</h1>
        <p className="weather__sub">
          Ketik nama kota untuk auto-search (3 detik). Atau klik Search untuk
          langsung fetch.
        </p>
      </header>

      <form className="weather__form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Contoh: Jakarta"
          value={cityInput}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p className="weather__status">Loading...</p>}
      {error && !loading && <p className="weather__error">{error}</p>}

      {weatherData && !loading && (
        <section className="weather__card">
          <div className="weather__summary">
            <div>
              <h2>{weatherData.city}</h2>
              <p className="weather__desc">{weatherData.description}</p>
            </div>
            <div className="weather__temp">
              <img
                src={weatherData.icon}
                alt={weatherData.description}
                width={72}
                height={72}
              />
              <span>{Math.round(weatherData.temperature)}°C</span>
            </div>
          </div>

          <div className="weather__stats">
            <div>
              <span>Feels like</span>
              <strong>{Math.round(weatherData.feelsLike)}°C</strong>
            </div>
            <div>
              <span>Humidity</span>
              <strong>{weatherData.humidity}%</strong>
            </div>
            <div>
              <span>Wind</span>
              <strong>{Math.round(weatherData.wind)} m/s</strong>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
