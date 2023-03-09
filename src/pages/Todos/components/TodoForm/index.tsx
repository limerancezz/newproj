import { Button } from 'antd';
import React, { useState } from 'react'

const TodoForm = ({ addTodo, del }: { addTodo: (p: string) => void, del: () => void }) => {
  const [value, setvalue] = useState('');

  const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setvalue(e.target.value);
  };

  const handleSubmit = () => {

    if (!value) return;
    addTodo(value);
    setvalue('');
  };

  return (
    <div className={"container"}>
      <div className="app-title text-center"> TODO DEMO</div>
      <div className={"form-group row todo-form"}>
        <input className={"form-control col-md-8 "} type={"text"} placeholder={"Add a ToDo"} value={value} onChange={handleChange} />
        <Button className={"form-control btn-primary col-md-4 submit-button"} type='primary' onClick={() => handleSubmit()} >Add</Button>
        <Button className={"form-control btn-primary col-md-4 submit-button"} type='primary' danger onClick={del} >Del</Button>
      </div>
    </div>
  )
};

export default TodoForm;
