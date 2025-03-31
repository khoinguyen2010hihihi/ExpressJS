import express from 'express';
import dotenv from 'dotenv'
dotenv.config();  

const PORT = process.env.PORT

const app = express();

// app.get('/', (req, res) => {
//   res.status(200).json({
//     message: "Hello World",
//     name: "Khoi",
//     age: 19
//   })
// })

// app.listen(8000, () => {
//   console.log(`Sv is running on http://localhost:${PORT}`);
// })

app.get('/', (req, res) => {
  res.status(200).json({
    message: "Hello Bitch",
    name: "Nguyen Huu Khoi",
    age: 19
  })
})

app.listen(8000)

//Sự khác nhau giữa import và require
//So sánh giữa Web Server(Nginx, Apache) và Server Backend
//Tìm hiểu những cái vừa code và folder có trong project  
//IP là địa chỉ của 1 thiết bị duy nhất trên mạng
//Port là chuỗi số nguyên xác định một ứng dụng hay dịch vụ trên một thiết bị trong mạng
//Node JS là 1 runtime environment, giúp chạy JS trên server thay vì chỉ trên trình duyệt, V8 Engine, Hỗ trợ bất đồng bộ, tăng hiệu suất
//Express là 1 framework giúp code JS dễ dàng hơn 
