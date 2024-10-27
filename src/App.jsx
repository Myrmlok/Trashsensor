import logo from './logo.svg';
import './App.css';

import axios from "axios";
import React, { useState } from 'react';

import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { ComponentTable } from './component/table/table';
import ComponentMap from './component/map/map';
function App() {
  const [data,setData]=React.useState([]);
  const [loading,setLoading]=React.useState(true);
  const [indxesVisiblePlacemark,setVisiblePlacemark]=useState([]);
  const [dataLenght,setDataLenght]=React.useState(0);
  React.useEffect(()=>{
    const load=async()=>{
        await axios.get("https://trash.skbkit.ru/api/now").then(answer=>{
            setDataLenght(answer.data.length);
            setData(answer.data.slice(0,7));
        }).catch(ex=>{
            console.log(ex);
        })
    }
    load();
    setLoading(false);
},[])
  return (
    <div className='mainDiv'>
      <h1 className="header">Инфомационная система "Trashsensor"</h1>
      <div className="componentsDiv">
      <ComponentTable data={data}  setData={setData} dataLenght={dataLenght}
       loading={loading} setLoading={setLoading}
       indxesChecked={indxesVisiblePlacemark} setIndexChecked={setVisiblePlacemark}></ComponentTable>
      <ComponentMap data={data} loading={loading}
          indxesVisiblePlacemark={indxesVisiblePlacemark} setVisiblePlacemark={setVisiblePlacemark}></ComponentMap>
      </div>
    </div>
  );
}

export default App;
