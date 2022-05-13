const express = require("express");
const cors = require('cors');
const { v4: uuid } = require('uuid');
const app = express();
app.use(express.json());
app.use(cors());
let todoArr = [];

//   Read
app.get("/todoArr", (req, res) => {
  return res.send({
    todoArr,
  });
});

// Create
app.post("/todoArr", (req, res) => {
  const { title, content } = req.body;
  const unique = uuid().slice(0,8)
  console.log(req.body);
  todoArr.push({
    title: title,
    id: unique,
    content: content,
  });
  return res.json({ todoArr });
});

// update
app.put("/todoArr/:id", (req, res) => {
  const { titleVal, todoVal } = req.body;
  const updatedArr = todoArr.map((entry) => {
    if (entry.id === req.params.id) {
      return {
        title: titleVal,
        id: entry.id,
        todo: todoVal,
      };
    }
    return entry;
  });
  todoArr = [...updatedArr];
  return res.json({todoArr});
});

// delete 
app.delete("/todoArr/:id",(req,res)=>{
    const newArr = todoArr.filter((entry)=>{
        return entry.id !== req.params.id;
    });
    console.log(req.params.id);
    todoArr = [...newArr];
    return res.json({todoArr});
})

app.listen(8080, () => {
  console.log("server has started");
});
