import React from "react";
import "react-bootstrap/dist/react-bootstrap.min.js.LICENSE.txt"
import Table from 'react-bootstrap/Table'
import { Pagination } from "react-bootstrap";
import { PiSquareLogoFill } from "react-icons/pi";
import "./table.css"
export function ComponentTable(props) {
    const data=props.data;
    const loading=props.loading
    const [indxPagination,setIndexPagination]=React.useState(0)
   
    const countRows=7;
    let count=1;
    const itemsPagination=[];
    let getDataToPaganation=()=> {
      let dataToPaganation=[]
      for(let i=0;i<=data.length;i+=countRows){
        dataToPaganation.push(data.slice(i,i+countRows))
        
      }

      return dataToPaganation;
    }
    for (let i=0;i<Math.floor(data.length/countRows);i++){
        itemsPagination.push(
            <Pagination.Item key={i} aria-current={true} active={i===indxPagination}
            onClick={()=>setIndexPagination(i)}>
              {i+1}
            </Pagination.Item>
        )
    }
    const columns=[{
      dataField:'id',
      text:'ID'
    },
    {
      dataField:'name',
      text:'Название'
    },
    {
      dataField:'address',
      text:'Адрес'
    },
    {
      dataField:'lat',
      text:'Широта'
    },
    {
      dataField:'lng',
      text:'Долгота'
    },
    {
      dataField:'batLevel',
      text:'Заполненость'
    },
    {
      dataField:'percent',
      text:'Уровень батареи'
    },
    {
      dataField:'timeAt',
      text:'Время обновления'
    }]
  return (
    <div className="componentTable">
      <Table   bordered table-responsive  hover >
        <thead>
          <tr>
            <th><PiSquareLogoFill></PiSquareLogoFill></th>
            {columns.map(c=>{
              return <th> {c.text}</th>
            })}
          </tr>
        </thead>
        <tbody>
            {loading?<tr><td colSpan={10}>Loading...</td></tr>: getDataToPaganation()[indxPagination].map(c=>{
             
                
                
              return <tr>
                <td><input type="checkbox" name="" id="" /></td>
                <td>{c.id}</td>
                <td valign="center">{c.name}</td>
                <td valign="center">{c.address}</td>
                <td valign="center">{c.lat}</td>
                <td valign="center">{c.lng}</td>
                <td valign="center">{c.percent}%</td>
                <td valign="center">{c.batLevel}%</td>
                <td valign="center">{c.timeAt}</td>
                </tr>
            })}
        
        </tbody>
      </Table>
      <Pagination >
      <Pagination.Prev onClick={()=>{
              if(indxPagination>0){
                setIndexPagination(indxPagination-1)
              }
              else{
                setIndexPagination(itemsPagination.length-1);
              }
            }}>
              
            </Pagination.Prev>
            {itemsPagination}
            <Pagination.Next onClick={()=>{
              if(indxPagination<itemsPagination.length-1){
                setIndexPagination(indxPagination+1)
              }
              else{
                setIndexPagination(0)
              }
            }}></Pagination.Next>
           
      </Pagination>
    </div>
  );
}