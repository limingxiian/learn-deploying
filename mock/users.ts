// ./mock/users.ts
import { defineMock } from 'umi'

export default defineMock({
    // GET 接口
  'GET /api/user': {
    id: 1,
    name: 'Alice',
    age: 25,
  },
  
  // POST 接口（动态处理请求）
  'POST /api/login': (req, res) => {
    const { username, password } = req.body;
    // 延迟 1 秒返回
    setTimeout(() => {
        if (username === 'admin' && password === '123456') {
          res.send({ success: true });
        } else {
          res.status(401).send({ error: 'Invalid credentials' });
        }
    }, 1000);
  },
  
  // 支持路径参数
  'GET /api/users/:id': (req, res) => {
    const { id } = req.params;
    res.send({ id, name: `User ${id}` });
  },
})