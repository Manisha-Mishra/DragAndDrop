import React, { useRef, useState,useCallback } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import  ListItemTypes  from "../constants/listItems";
import dragableItem from '../constants/dragableItems';
import DragElem from './DragElem';
import  ItemTypes  from '../constants/items';
export const DropElem = ({ id,text, index, moveListItem }) => {

    const [board,setBorad]=useState([])

    
    const [{ isDragging }, dragRef] = useDrag({
        type: ListItemTypes.CARD,
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    const [{isOver} ,drop] = useDrop(() => ({
        accept: ItemTypes.CARD,
        drop: (item) => addImageToBoard(item.id,item.key),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
      }));
      function addImageToBoard(id){
        const item=dragableItem.filter((item)=>item.id===id)
        setBorad((board)=>[...board,item[0]])
      }
      const  removeDropItem=useCallback(
        (id)=>{
            console.log('removing drop item')
            const data =board.filter((d)=>d.id!==id)
            setBorad(data)
        },[board]
    )
    const [spec, dropRef] = useDrop({
        accept:ListItemTypes.CARD,
        hover: (item, monitor) => {
            const dragIndex = item.index
            const hoverIndex = index
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top

            // if dragging down, continue only when hover is smaller than middle Y
            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
            // if dragging up, continue only when hover is bigger than middle Y
            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return

            moveListItem(dragIndex, hoverIndex)
            item.index = hoverIndex
        },
    })
    

    // Join the 2 refs together into one (both draggable and can be dropped on)
    const ref = useRef(null)
    const dragDropRef = dragRef(dropRef(drop(ref)))
    // const dragDropRef1=drag(drop(ref))

    // Make items being dragged transparent, so it's easier to see where we drop them
    const opacity = isDragging ? 0 : 1
    return (
        <div ref={dragDropRef}  className='drop-sub-container' style={{ opacity }} >
                {board.map((item,index)=>{
                    return(
                        <DragElem key={index} id={item.id} name={item.name} removeDropItem={removeDropItem}></DragElem>
                    )
                    })}
            
        </div>
    )
}