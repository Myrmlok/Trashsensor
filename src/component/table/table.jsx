import React, { useState } from "react";
import "react-bootstrap/dist/react-bootstrap.min.js.LICENSE.txt"
import Table from 'react-bootstrap/Table'
import { Pagination } from "react-bootstrap";
import { PiSquareLogoFill } from "react-icons/pi";
import "./table.css"
import axios from "axios";
export function ComponentTable(props) {
    const data=props.data;
    const [loading,setLoading]=React.useState(props.loading);
    const dataLenght =props.dataLenght;
    const [indxPagination,setIndexPagination]=React.useState(0)
    const idsSelected=props.indxesChecked;
    const [countTableTrs,setCountTableTrs]=React.useState(7);
    function addOrRemoveSelected(indx){
      if(!idsSelected.includes(indx)){
       props.setIndexChecked([...idsSelected,indx])
      }
      else{
        props.setIndexChecked( idsSelected.filter(c=>c!=indx));
      }
    }
    const itemsPagination=[];
    let getDataToPaganation=(i)=> {
      let load=async()=>{
         await axios.get(`https://trash.skbkit.ru/api/now?_start=${i}&_end=${i+1}&_sort=createdAt&_order=ASC`).then(c=>{
           props.setData(c.data);
           props.setLoading(true);
         }).catch(er=>{console.log(er)})
      }
      load();
      setLoading(false);
    }
    for (let i=0;i<Math.floor(dataLenght/countTableTrs);i++){
        itemsPagination.push(
            <Pagination.Item key={i} aria-current={false} active={i===indxPagination}
            onClick={()=>{
              setIndexPagination(i)
              getDataToPaganation(i);
            }}>
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
      <Table   bordered table-responsive   >
        <thead>
          <tr>
            <th><PiSquareLogoFill></PiSquareLogoFill></th>
            {columns.map(c=>{
              return <th> {c.text}</th>
            })}
          </tr>
        </thead>
        <tbody>
            {data.length<7?<tr><td colSpan={10}>Loading...</td></tr>:data.map(c=>{
              return <tr className={idsSelected.includes(c.id)?"selected":""}>
                <td><input type="checkbox" checked={idsSelected.includes(c.id)} onChange={()=>{
                  addOrRemoveSelected(c.id);}
                }  name="" id="" /></td>
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
      <div className="componentPagination">
      <Pagination >
      <Pagination.Prev onClick={()=>{
              if(indxPagination>0){
                getDataToPaganation(indxPagination-1)
                setIndexPagination(indxPagination-1)
                
              }
              else{
                getDataToPaganation(itemsPagination.length-1)
                setIndexPagination(itemsPagination.length-1);
              }
             
            }}>
              
            </Pagination.Prev>
            {itemsPagination}
            <Pagination.Next onClick={()=>{
              if(indxPagination<itemsPagination.length-1){
                getDataToPaganation(indxPagination+1);
                setIndexPagination(indxPagination+1)
                
              }
              else{
                getDataToPaganation(0);
                setIndexPagination(0)
              }
              
            }}></Pagination.Next>
           
      </Pagination>
      </div>
    </div>
  );
}