import React, { useState, useEffect } from 'react'
import './index.css';
const getlocalData = ()=> {
  const  datas = localStorage.getItem("myItems");
  if(datas){
    return JSON.parse(datas);
  }
  else{
    return [];
  }
}

export const App = () => {
  const [inputData , setInputData] = useState("");
  const [items, setItems] = useState(getlocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  const addItem = () => {
    if(!inputData){
      alert("Please enter something");
    }
    else if(inputData && toggleButton){
      setItems(
        items.map((currElem) => {
          if(currElem.id === isEditItem){
            return{
              ...currElem, name: inputData
            };
          }
          return currElem;
        })
      );
      setInputData([]);
      setIsEditItem(null);
      setToggleButton(false);
    }
    else{
      const newInputData = {
        id:new Date().getTime().toString(), 
        name:inputData,
      }; 
      setItems([...items, newInputData]);
      setInputData("");
    }
  };

  const editItem = (index)=> {
    const editedItem = items.find((currElem)=> {
      return currElem.id === index;
    });
    setInputData(editedItem.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  const deleteItem = (index) => {
    const updatedItems = items.filter((currElem) => {
      return currElem.id !== index;
    });
    setItems(updatedItems);
  };
  
  useEffect(()=>{
    localStorage.setItem("myItems" ,JSON.stringify(items));
  }, [items]);

  return (
    <>
    <div className='main-child'>
      <div className='child-div'>
        <h1>React CRUD </h1>
        <div className='addItems'>
          <input type='text' placeholder='Write Something' className='form-control' value={inputData} onChange={(e)=> setInputData(e.target.value)}/>
          {toggleButton ? (<button className='add-btn' onClick={addItem}>Edit</button>) : (<button className='add-btn' onClick={addItem}>Add</button>)}
          
        </div>
        <div className='showItems'>
          {items.map((currElem) => {
            return (
              <div className='eachItem' key={currElem.id}>
                <h3>{currElem.name}</h3>
                <div className='todo-btn'>
                  <button className='edit-btn' onClick={()=> editItem(currElem.id)}>Edit</button>
                  <button className='delete-btn' onClick={() => deleteItem(currElem.id)}>Delete</button>
                </div>                        
              </div>
            )
          })}

        </div>
      </div>
    </div>
    </>
  )
}
export default App