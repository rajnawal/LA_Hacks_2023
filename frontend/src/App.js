import Alert from './Alert.jsx'
import {useState} from 'react'
function App() {

  const [data, setData] = useState([])
  const [lastChange, setLastChange] = useState(-1)
  
  const editData = () => {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;

    if(lastChange === -1){
      setData([strTime, ...data])
      setLastChange(date.getTime())
    } else if((date.getTime() - lastChange)/1000 > 10){
      setData([strTime, ...data])
      setLastChange(date.getTime())
    }
  
  }

  return (
    <> 
        <div className="alertsInfo">
          <div className="alerts effect8">
            {
              data.map((item, index) => {
                return <Alert key={index} time={item} />
              })
            }
          </div>
          <div className="info effect8">
            <p>Contact</p>
            <input type='tel' id="phoneNum" placeholder="Phone Number" />
          </div>
        </div>
        <button id="invisiblebtn" onClick={() => editData()}></button>
    </>
  );
}

export default App;
