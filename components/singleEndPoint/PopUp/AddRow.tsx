import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { changeDataChange } from "@/lib/Store/features/CartSlice";
import React, { ChangeEvent, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function AddRow() {
  const inputItem = ["string", "integer", "boolean", "float", "null"].map(
    (item) => (
      <option key={item} value={item}>
        {item.toUpperCase()}
      </option>
    )
  );
  const primary_id = useAppSelector(state=>state.cartReduicer.endpoint_id)
  const project_id = useAppSelector(state=>state.cartReduicer.project_id)
  const dispatch = useAppDispatch()
  const [formValues, setFormValues] = useState({
    name: "",
    type: "",
    required: false,
  });
  const AddValue = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    setFormValues((prev) => {
      if (name == "required") {
        if (value == "on") {
          return {
            ...prev,
            [name]: true,
          };
        }
        return {
          ...prev,
          [name]: false,
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const submit =async () => {
   
    
    const {name,required,type} = formValues
    console.log(name[0]);
    if(("1234567890~`!@#%^&*()_-+={}[]|:'?><,./".includes(name[0]))){
      toast.error("name first character cant be number or symbol")
      return
    }
    if(!name || !type){
      toast.error("Filled All the required field")
      return
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/schema/1`,{
        method:"POST",
        body:JSON.stringify({
            ...formValues,
            primary_id,
            project_id
        })
    })
    const data = await res.json()
    if(data.success){
        dispatch(changeDataChange())
        setFormValues({
            name:"",
            required:false,
            type:""
          })
    }else{
        toast.error(data.message)
    }
    
  };
  return (
    <div className="px-2">
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Field Name"
          value={formValues.name}
          onChange={AddValue}
          name="name"
          className="w-[40%] px-3 py-2 focus:outline-none border rounded-md text-sm"
        />
        <div className="flex gap-2">
          <select
            name="type"
            id=""
            onChange={AddValue}
            className="px-3 py-2 rounded-md bg-white border text-sm"
          >
            <option value="" disabled selected>
              DataType
            </option>
            {inputItem}
          </select>
          <div className="flex place-items-center gap-2">
            <input
              type="checkbox"
              onChange={AddValue}
              id="required"
              name="required"
            />
            <label htmlFor="required">Required</label>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={submit}
        className="text-sm mt-3 px-3 py-1 bg-blue-600 text-white rounded-md"
      >
        Add New
      </button>
    </div>
  );
}
