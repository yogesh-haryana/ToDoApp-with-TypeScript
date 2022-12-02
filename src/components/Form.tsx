import React, { Fragment, useState } from "react";
import { SlLike } from "react-icons/sl";
import { CiSquareRemove } from "react-icons/ci";

import "./Form.css";

type FormElement = React.FormEvent<HTMLFormElement>

interface HaveToDo {
  text: string,
  complete: boolean
}

const Form = (): JSX.Element => {
  const [value, setValue] = useState<string>("");
  const [toDos, setToDos] = useState<HaveToDo[]>([]);

  const handleSubmit = (e: FormElement): void => {
    e.preventDefault();
    AddToDos(value);
    setValue("");
  }

  const AddToDos = (text: string): void => {
    const newToDos: HaveToDo[] = [...toDos, { text, complete: false }];
    setToDos(newToDos);
  }

  const CompleteToDo = (index: number): void => {
    const newToDos: HaveToDo[] = [...toDos];
    newToDos[index].complete = !newToDos[index].complete;
    setToDos(newToDos);
  }

  const removeToDo = (index: number): void => {
    const newToDos: HaveToDo[] = [...toDos];
    newToDos.splice(index, 1);
    setToDos(newToDos);
  }

  return (
    <Fragment>
      <p className="heading"> ToDo App </p>
      <form onSubmit={e => handleSubmit(e)}>
        <input type="text" placeholder="What to do..." value={value} onChange={e => setValue(e.target.value)}></input>
        <button className="submitButton" type="submit">Submit</button>

      </form>
      <div className="tableContainer">
        <table className="toDoTable">
          <thead>
            <td>S. No.</td>
            <td>What To Do?</td>
            <td>Status</td>
            <td>Remove</td>
          </thead>
          <tbody>
            {toDos.map((todo: HaveToDo, index: number) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td> {todo.text}</td>
                  <td>
                    <SlLike className="likeIcon"
                      onClick={() => CompleteToDo(index)}
                      style={{ fill: todo.complete ? "green" : "red" }}
                    />
                  </td>
                  <td><CiSquareRemove className="removeIcon" onClick={() => removeToDo(index)} /></td>

                </tr>)
            })
            }
          </tbody>
        </table>
      </div>
    </Fragment>
  )
}

export default Form;
