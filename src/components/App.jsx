import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import {API_URL} from "../utils"

function App() {
  const [listArr, setListArr] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/todoArr`)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setListArr(result.todoArr);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  function addNotes(notes) {
    console.log(notes);
    fetch(`${API_URL}/todoArr`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(notes),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setListArr(result.todoArr);
        },
        
        (error) => {
          console.log(error);
        }
      );
  }

  function delNotes(noteId) {
    console.log(noteId);
    fetch(`${API_URL}/todoArr/${noteId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setListArr(result.todoArr);
        },
        (error) => {
          console.log(error);
        }
      );

  }

  return (
    <div>
      <Header />
      <CreateArea addFn={addNotes} />
      {listArr.map((entry) => {
        return (
          <Note
            key={entry.id}
            id= {entry.id}
            title={entry.title}
            content={entry.content}
            delete={delNotes}
          />
        );
      })}

      <Footer />
    </div>
  );
}

export default App;
