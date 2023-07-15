const express = require("express");
const cluster = require("node:cluster");
const os = require("os");

const totalCPU = os.cpus().length;
console.log(totalCPU);

if (cluster.isPrimary) {
    console.log(`Primary Cluster Worker Id ${process.pid} is running`);
  
    // Fork workers.
    for (let i = 0; i < totalCPU; i++) {
      cluster.fork();
    }
}else{
    const app = express();

    const PORT = 8000;
    app.get("/", function (req, res) {
        res.json({message:`hello from the server which have worker ID is ${process.pid}`})
    })

    app.listen(PORT,()=> {
        console.log(`server is running on PORT ${PORT}`);
    })
}
