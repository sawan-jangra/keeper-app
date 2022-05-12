import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { v4 as uuid } from "uuid";

function App() {
  const [listArr, setListArr] = useState([]);
  const uniqId = uuid().slice(0, 8);

  useEffect(() => {
    fetch("http://localhost:8080/todoArr")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setListArr(result.todoArr);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
        }
      );
  }, []);

  function addNotes(notes) {
    console.log(notes);
    fetch("http://localhost:8080/todoArr/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
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
    fetch(`http://localhost:8080/todoArr/${noteId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setListArr(result.todoArr);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
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
