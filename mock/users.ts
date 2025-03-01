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
          res.send({
            code: 200,
            data: {
              id: 1,
              name: 'admin',
              roleId: '1',
              roleName: 'admin',
              token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJsb2dpbiIsImxvZ2luSWQiOiJzeXNfdXNlcjoxIiwicm5TdHIiOiJwR2RBSUhibFRSRTJINHF3NWx1Zm1KMHFHSEk3V1VmbCIsInVzZXJJZCI6MX0.xpPtH2i-gtiU9IDFdAAP-P5pTSN1h6qVLH97OmfxUoo',
            },
            msg: '登录成功',
          });
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