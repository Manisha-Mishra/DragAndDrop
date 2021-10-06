import React from 'react'
import {useDrag} from 'react-dnd'; 
import  ItemTypes  from '../constants/items';


const DragElem=({id,name,removeDropItem})=>{
    const [{isDragging,}, drag] = useDrag({
        type:ItemTypes.CARD,
        item:{id},
       
        collect: monitor => ({
          isDragging: !!monitor.isDragging()
         
        }),
        end(item,monitor){
          if(monitor.didDrop()){
            removeDropItem(item.id)
          }
        }
       })
    return(
      <div 
        id={id} 
        ref={drag}
        className='dargable-elem-1' 
        style={{backgroundColor: isDragging ? "#fbb" : "palegoldenrod"}}>
                      {name}
      </div>
    )
}

export default DragElem;