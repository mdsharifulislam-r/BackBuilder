import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function ShowItem({name,type,required,setFieldData}:{name:string,type:string,required:string,setFieldData:React.Dispatch<React.SetStateAction<{
    name: string;
    type: string;
    required: boolean;
}[]>>}) {
    const Delete = ()=>{
        setFieldData(prev=>{
            const newArr = prev.filter(item=>item.name!=name)
            return newArr
        })
    }
  return (
    <tr>
      <td>{name}</td>
      <td>{type}</td>
      <td>{required}</td>
      <td>
        <button type="button" onClick={Delete} className="p-2 text-white rounded-md mr-2 bg-red-500">
          <FaTrash />
        </button>
       
      </td>
    </tr>
  );
}
