import { useState,useCallback } from "react";
import DragContainer from "./DragContainer";
import  {DropElem} from "../component/DropElem";


const item=[
    {
        id:1,backgroundColor:'red',
        
    },{
        id:2,
       
        backgroundColor:'yellow'
    },{
        id:3,
        
        backgroundColor:'green'
    }
]

function DropContainer(){
    const [listItem, setlistItem] = useState(item)
    const moveListItem = useCallback(
        (dragIndex, hoverIndex) => {
            console.log('moveList')
            const dragItem = listItem[dragIndex]
            const hoverItem = listItem[hoverIndex]
            // Swap places of dragItem and hoverItem in the listItem array
            setlistItem(listItem => {
                const updatedlistItem = [...listItem]
                updatedlistItem[dragIndex] = hoverItem
                updatedlistItem[hoverIndex] = dragItem
                return updatedlistItem
            })

        },
        [listItem],
    )
    return(
        <>
        <DragContainer></DragContainer>
        <div className='drop-container'>
            {listItem.map((item,index)=>{
            return(
                <DropElem 
                    key={item.id} 
                    id={item.id}
                    index={index}  
                    moveListItem={moveListItem} 
                        >{item.id}
                </DropElem>
            )
        })}
        </div>
        </>
    )

} 
export default DropContainer;