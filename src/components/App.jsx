import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [listArr, setListArr] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:8080/todoArr")
      .then(res => res.json())
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
      )
  },[]);


  function addNotes(notes) {
    setListArr((preValue) => {
      return [...preValue, notes];
    });
  }
  console.log(listArr);

  function delNotes(index) {
    console.log(listArr[index]);
    const item = listArr[index].id;
    fetch(`http://localhost:8080/todoArr/${item}`,{
      method:"DELETE"
    })
      .then(res => res.json())
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
      )

    // setListArr((preValue) => {
    //   return preValue.filter((val, iNo) => {
    //     return iNo !== index;
    //   });
    // });
  }

  return (
    <div>
      <Header />
      <CreateArea addFn={addNotes} />
      {listArr.map((entry, index) => {
        return (
          <Note
            key={index}
            id={index}
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
