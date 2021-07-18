import {useEffect,useState} from 'react';
import axios from 'axios';
import'./App.css';
import Weather from './component/Weather';
import { Dimmer, Loader } from 'semantic-ui-react';
const App=()=>{
const [lat,setLat]=useState([]);
const [long,setLong]=useState([]);
const [data, setData] = useState([]);
useEffect(()=>{ 
  const fetchData = async () => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });

  const result=await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_API_KEY}`);
    setData(result.data);
    console.log(result.data);
   
  }
fetchData();
},[lat,long]);
return (
  <div className="App">
  {(typeof data.main != 'undefined') ? (
    <Weather weatherData={data}/>
  ): (
    <div>
      <Dimmer active>
        <Loader>Loading..</Loader>
      </Dimmer>
   </div>
 )}
  
</div>
);
}

export default App;