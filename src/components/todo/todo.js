import React,{useContext} from "react";
import uuid from "uuid/v4";
import Counter from "../counter/counter.js";
import { When } from "../if";
import { LoginContext } from '../auth/context.js';
import Auth from '../auth/auth.js'
import "./todo.scss";

const ToDo =props=> {
  
   let state = { todoList: [], item: {}, editing: false };
  

  const loginContext = useContext(LoginContext);

  const handleInputChange = e => {
    let item = {
      text: e.target.value,
      complete: !!e.target.complete,
      id: e.target.id || uuid()
    };
    this.setState({ item });
  };

  const addItem = e => {
    e.preventDefault();
    e.target.reset();
    this.setState({ todoList: [...this.state.todoList, this.state.item] });
  };

  const updateItem = e => {
    e.preventDefault();
    this.saveItem(this.state.item);
  };

  const toggleComplete = id => {
    let item = state.todoList.filter(i => i.id === id)[0] || {};
    if (item.id) {
      item.complete = !item.complete;
      saveItem(item);
    }
  };

  const saveItem = updatedItem => {
    this.setState({
      todoList: this.state.todoList.map(item =>
        item.id === updatedItem.id ? updatedItem : item
      ),
      editing: false
    });
  };

  const toggleEdit = id => {
    let editing = this.state.editing === id ? false : id;
    this.setState({ editing });
  };


    return (
      <>
        <section className="todo">
        <Auth capability={loginContext.capability}>
        <div>
            <Counter count={state.todoList.length} />
          </div>
        </Auth>

        <Auth capability={loginContext.capability}>
        <div>
            <form onSubmit={addItem}>
              <input
                placeholder="Add To Do List Item"
                onChange={handleInputChange}
              />
            </form>
          </div>

        </Auth>

      

          <div>
            <ul>
              {state.todoList &&
                state.todoList.map(item => (
                  <li
                    className={`complete-${item.complete.toString()}`}
                    key={item.id}
                  >
                    <span onClick={() => toggleComplete(item.id)}>
                      {item.text}
                    </span>
                    <button onClick={() => toggleEdit(item.id)}>
                      edit
                    </button>
                    <When condition={state.editing === item.id}>
                      <form onSubmit={updateItem}>
                        <input
                          onChange={handleInputChange}
                          id={item.id}
                          complete={item.complete}
                          defaultValue={item.text}
                        />
                      </form>
                    </When>
                  </li>
                ))}
            </ul>
          </div>
        </section>
      </>
    );

}

export default ToDo;
