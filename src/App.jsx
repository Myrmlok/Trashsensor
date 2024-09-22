import logo from './logo.svg';
import './App.css';
import { ComponentMap } from './component/map/map';
import axios from "axios";
import React from 'react';
import { ComponentTable } from './component/table/table';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
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
    <div>
        <ComponentMap data={data} loading={loading}></ComponentMap>
        <ComponentTable data={data} loading={loading}></ComponentTable>
    </div>
  );
}

export default App;
