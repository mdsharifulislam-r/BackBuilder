'use client'
import { ChangeEvent, useState } from 'react'
import { catagories } from '../Courses/SideBar'
import { setServers } from 'dns'
function Item({text,func}:{text:string,func:any}){
    
    return <button type='button' className='px-2 py-1 text-sm  flex gap-3 text-slate-700 bg-dark rounded-md'>{text} <span onClick={()=>func(text)}>x</span></button>
}
export default function SuggetionForm() {
    const [lists,setList]=useState([...catagories])
    const [selected,setSlelcted]=useState<string[]>([])
    const dataList = lists.map(item=>{
        return <option key={item} value={item}/>
    })
    const itemList =selected.map(item=>{
        return <Item key={item} func={deleteValue} text={item}/>
    })

    function addValue(e: ChangeEvent<HTMLInputElement>){
        if(lists.some(item=>item.toLowerCase()==e.target.value.toLowerCase()))
        {
            setSlelcted([...selected,lists.filter(item=>item.toLowerCase()==e.target.value.toLowerCase())[0]])
            setList(lists.filter(item=>item.toLowerCase()!==e.target.value.toLowerCase()))
            e.target.value=""
        }

    }
    function deleteValue(item:string){
        setSlelcted(selected.filter(select=>select!==item))
        setList([...lists,item])
    }
  return (
    <div className='py-5'>
      <div className='w-full min-h-20 flex gap-2 place-items-start flex-wrap border border-primary shadow-xl p-3 rounded-md'>
        {itemList}
        <input onChange={addValue}  list='list' type="text" className='focus:outline-none' placeholder='Select your intrested topics' />
        <datalist id="list">
            {dataList}
        </datalist>
        <input required type="text"name='intrestTypes' value={selected.toString()} className='hidden' />
      </div>
    </div>
  )
}
