import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [cityName, setCityName] = useState('delhi');
    const [weatherData, setWeatherData] = useState({})
    const [loading, setLoading] = useState(false)
    const getWeather = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`https://open-weather13.p.rapidapi.com/city/${cityName}/EN`, {
                headers: {
                    'X-RapidAPI-Key': 'c2463bcfe3msha791d79ecb32aa8p1a26a8jsn70fcb89c9791',
                    'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
                }
            });

            setWeatherData(response.data)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    useEffect(()=>{
        getWeather()
    },[])

    return (
        <div className='min-h-[100vh] w-full flex flex-col'>

            <div className="min-h-[60vh] w-full flex justify-center items-center">
                <div className=' w-full md:w-[80%] h-full text-center py-2 rounded-md border-2'>
                    <div>
                        <h1 className='font-bold text-4xl'>Weather</h1>
                        <p>Enter a city name to get the current weather</p>
                    </div>
                    <div className='mt-10 p-4'>
                        <p className='text-black text-left'>City</p>
                        <input
                            className='p-2 w-full rounded-md mt-2 border-[1px] border-slate-300 outline-none'
                            type="text"
                            placeholder='Enter city name'
                            value={cityName}
                            onChange={(e) => setCityName(e.target.value)}
                        />
                        <button
                            onClick={getWeather}
                            className='bg-black rounded-md w-full text-white py-2 mt-4 hover:opacity-80 duration-200'>{loading ? "searching..." : 'search'}</button>
                    </div>
                </div>
            </div>
            <div className="min-h-[40vh] w-full px-2 py-10 flex flex-col justify-between items-center border-2">
                <div className='text-center w-full h-[50%]'>
                    <h1 className='text-4xl font-bold mb-2'> {weatherData?.main?.temp}&deg;C</h1>
                </div>
                <div className="w-full h-[50%] flex justify-between px-4">
                    <div>
                        <h1 className='font-bold text-2xl'>Humitidity</h1>
                        <p>{weatherData?.main?.humidity}%</p>
                    </div>
                    <div>
                        <h1 className='font-bold text-2xl'>Wind speed</h1>
                        <p>{weatherData?.wind?.speed} km / hour</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
