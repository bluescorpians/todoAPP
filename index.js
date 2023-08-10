const http = require("http");
const express = require("express");
const fs = require("fs");

const jsondata = JSON.parse(fs.readFileSync("data.json", "utf-8"));

const server = express();

server.use(express.json());
server.use(express.urlencoded());

server.get("/", (req, res) => {
  res.json(jsondata);
});

server.post("/", (req, res) => {
  let data = req.body;
  console.log(data);
  jsondata.todoData.push(data);
  res.send(200);
});





server.put("/", (req, res) => {
  const id = req.body.id;
  const idx = jsondata.todoData.findIndex((p) => p.id === id);

  console.log(req.body);
  console.log(idx);
  jsondata.todoData.splice(idx, 1, { ...req.body, id: id });
  res.send(200);
});


server.patch("/", (req, res) => {
  const id = req.body.id;
  const idx = jsondata.todoData.findIndex((p) => p.id === id);
  console.log(req.body);
  if(idx==-1){
    res.send("INDEX NOT FOUND");
    return;
  }
  console.log(idx);
  let temp=jsondata.todoData[idx];
  jsondata.todoData.splice(idx, 1, { ...temp,...req.body});
  res.send(200);
});

server.delete('/',(req,res)=>{
  const id=req.body.id;
  const idx=jsondata.todoData.findIndex(p=>p.id===id);
  jsondata.todoData.splice(idx,1);
  res.send(200);
})

server.listen(8080, () => {
  console.log("server started");
});
