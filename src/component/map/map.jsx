import React from "react";

import { YMaps,Map, Placemark } from '@pbe/react-yandex-maps';
import "./map.css"
export default function ComponentMap(props) {
    const data=props.data.sort(c=>c.id);
    const indxesVisiblePlacemark=props.indxesVisiblePlacemark;
    const setVisiblePlacemark=props.setVisiblePlacemark;
    const repeatIds=[];
  return (<div className="component">
    
    <YMaps >
      <Map defaultState={{ center: [47.203948, 38.943917],zoom:13}} className="componentMap">
        { data.map(c=>{
          let repeatPonts=data.filter(x=>x.lat===c.lat&&x.lng===c.lng).sort(x=>x.id);
          if(repeatIds.includes(c.id)){
            return null;
          } 
          return  <Placemark
          instanceRef={ref => {
            let flag=true;
            for(let i=0;i<repeatPonts.length;i++){
              if(indxesVisiblePlacemark.includes(repeatPonts[i].id)){
                flag=false;
                ref &&ref.balloon.open();
                return;
              }
            }
            if(flag && ref &&ref.balloon.isOpen()){
              ref && ref.balloon.close();
            }
            ref && ref.events.add("click",()=>{
              setVisiblePlacemark([...indxesVisiblePlacemark,...repeatPonts.map(el=>el.id)]);
            })
            ref && ref.balloon.events.add("close",()=>{
              setVisiblePlacemark(indxesVisiblePlacemark.filter(c=>!repeatPonts.some(el=>el.id==c)));
            })
          }}
          modules={["geoObject.addon.balloon"]}
           key={c.id} defaultGeometry={[c.lat, c.lng]} properties={{
            balloonContentBody:`<div>
            <div>id: ${repeatPonts[0].id}</div>
            <div>Название: ${c.name}</div>
            <div>Адрес: ${c.address}</div>
            <div>
            ${
                repeatPonts.map(x=>{
                repeatIds.push(x.id);
                    return (indxesVisiblePlacemark.includes(x.id)?`<div>Наполненность ${repeatPonts.lenght==1?null:`контейнер${x.id}`}:${x.percent}%</div>`:null)
                }).join('')
            }
            </div>
            </div>`
          }}></Placemark>
        })}
      </Map>
  </YMaps>
  </div>);
}