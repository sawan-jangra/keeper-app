import React, { useState, useRef, useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {
  const [list, setContent] = useState({ title: "", content: ""});
  
  // for UI design
  const [expand,setExpand] = useState(false);

  function handleChange(event) {
    const { value, name } = event.target;
    setContent((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  }
  function handleClick(event) {
    props.addFn(list);
    setContent({ title: "", content: "" });
    event.preventDefault();
  }

  function handleAreaClick(){
    setExpand(true);
  }

  const inputRef = useRef(null);

  useEffect(()=>{
    if(expand){
      inputRef.current.focus();
    }
  },[expand]);

  return (
    <div>
      <form className="create-note">
        {expand && <input
          ref={inputRef}
          onChange={handleChange}
          name="title"
          value={list.title}
          placeholder="Title"
          style={{display:expand?"initial":"none"}}
        />}
        <textarea
          onChange={handleChange}
          onClick={handleAreaClick}
          name="content"
          placeholder="Take a note..."
          rows={expand?"3":"1"}
          value={list.content}
        />
        <Zoom in={expand?true:false}>
        <Fab onClick={handleClick}><AddIcon/></Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
