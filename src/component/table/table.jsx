import React from "react";
import "react-bootstrap/dist/react-bootstrap.min.js.LICENSE.txt"
import Table from 'react-bootstrap/Table'
import { Pagination } from "react-bootstrap";
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
            <Pagination.Item key={i} active={i===indxPagination} onClick={()=>setIndexPagination(i)}
            >{i+1}
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
    <div className="col-auto">
      <Table bordered table-responsive striped hover >
        <thead>
          <tr>
            {columns.map(c=>{
              return <th> {c.text}</th>
            })}
          </tr>
        </thead>
        <tbody>
            
            {loading?"loading": getDataToPaganation()[indxPagination].map(c=>{
             
                
                
              return <tr>
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
      <Pagination>
            {itemsPagination}
      </Pagination>
    </div>
  );
}