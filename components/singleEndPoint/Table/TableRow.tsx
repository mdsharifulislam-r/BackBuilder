import React from 'react'
export interface endpoint{name:string,primary_id:number,type:string,required:boolean,schema_id:number,is_user?:boolean}
export default function TableRow({content,index}:{content:endpoint,index:number}) {
  return (
    <tr className="bg-white border-b">
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
      {index+1}
    </td>
    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      {content?.name}
    </td>
    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      {content?.type}
    </td>
    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      {content?.required}
    </td>
  </tr>
  )
}
