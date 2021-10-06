import { useCallback, useState } from 'react';
import DragElem from '../component/DragElem';
import dragableItem from '../constants/dragableItems';

function DragContainer (){
    const [dragItem,setDragElem]=useState(dragableItem)
    const removeDropItem=useCallback(
      (id)=>{  
            // console.log('removing drop item',id)
            const data =dragItem.filter((d)=>d.id!==id)
            // console.log('data',data)
            setDragElem(data)
            // console.log('dragelem',dragItem)
        },[dragItem]
    )
   
    return(<>
    <div className='drag-container'>
        {dragItem.map((item)=>{
            console.log(item)
            return(
                <DragElem removeDropItem={removeDropItem} key={item.id} id={item.id} name={item.name} ></DragElem>
            )
        })}
    </div>
    </>
    )
}

export default DragContainer;