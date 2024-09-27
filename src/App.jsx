import logo from './logo.svg';
import './App.css';

import axios from "axios";
import React from 'react';

import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { ComponentTable } from './component/table/table';
import ComponentMap from './component/map/map';
function App() {
  const [data,setData]=React.useState([]);
  const [loading,setLoading]=React.useState(true)
  React.useEffect(()=>{
    const load=async()=>{
        await axios.get("https://trash.skbkit.ru/api/now").then(answer=>{
            setData(answer.data);
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
        <ComponentTable data={data} loading={loading}></ComponentTable>
        <ComponentMap data={data} loading={loading}></ComponentMap>
      </div>
    </div>
  );
}

export default App;
