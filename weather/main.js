const cityInput=document.querySelector("#city-input");
const searchButton=document.querySelector("#search-button");
const weatherResult=document.querySelector("#weather-result");
searchButton.addEventListener("click",async()=>{
  const city=cityInput.value;
  if(city===""){
    weatherResult.textContent="都市名を入力して下さい";
    return;
  }
  const url=`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=ja&format=json`;
  const response=await fetch(url);
  const data=await response.json();
  if(!data.results){
    weatherResult.textContent="都市が見つかりません";
    return;
  }
  const {latitude,longitude,name}=data.results[0];
  const weatherUrl=`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`;
  const weatherResponse=await fetch(weatherUrl);
  const weatherData=await weatherResponse.json();
  const temperature=weatherData.current.temperature_2m;
  const weatherCode=weatherData.current.weather_code;
  let weatherText="";
  if(weatherCode===0){
    weatherText="晴れ";
    }
  else if(weatherCode>=1&&weatherCode<=3){
    weatherText="くもり";
  }
  else if(
    weatherCode===51||
    weatherCode===53||
    weatherCode===55||
    weatherCode===61||
    weatherCode===63||
    weatherCode===65||
    weatherCode===80||
    weatherCode===81||
    weatherCode===82|
    ){
      weatherText="雨";
  }
  else{
    weatherText="その他の天気";
  }
  weatherResult.textContent=`${name}の現在の天気は${weatherText}、気温は${temperature}℃です`;
  
  });
