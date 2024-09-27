import React from "react";

import { YMaps,Map, Placemark } from '@pbe/react-yandex-maps';
export default function ComponentMap(props) {
    const data=props.data.sort(c=>c.id);

    const repeatIds=[];
  return (<div className="component">
    
    <YMaps>
      <Map defaultState={{ center: [47.203948, 38.943917],zoom:13}}>
        { data.map(c=>{
          if(repeatIds.includes( c.id)){
            return null;
          }
          else
          var repeatPonts=data.filter(x=>x.lat===c.lat&&x.lng===c.lng).sort(x=>x.id);
          var count=0;
          return  <Placemark
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
                    return `<div>Наполненность ${repeatPonts.lenght==1?null:`контейнер${x.id}`}:${x.percent}%</div>`
                }).join('')
            }
            </div>
            </div>`
          }} ></Placemark>
        })}
      </Map>
  </YMaps>
  </div>);
}