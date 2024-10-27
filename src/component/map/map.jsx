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
          var repeatPonts=data.filter(x=>x.lat===c.lat&&x.lng===c.lng).sort(x=>x.id);
          var count=0;
          return  <Placemark
          instanceRef={ref => {
            if(indxesVisiblePlacemark.includes(c.id)){
              ref && ref.balloon.open();
              
            }
            ref &&ref.balloon.events.add("close",()=>{
                let count=0;
                for(let el in repeatPonts){
                  if(indxesVisiblePlacemark.includes(el)){
                    count=count+1;
                  }
                }
                console.log(count);
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
                  repeatIds.push(x.id)
                    count+=1
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