const express = require('express')
const app = express()

app.use(express.json())

// リクエストのたびにログを出す
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

// メモを仮で保存する配列（DBの代わり）
let posts = [
  { id: 1, title: 'はじめてのメモ', content: 'Expressの練習中' },
  { id: 2, title: '2つ目のメモ',   content: 'Next.jsと比べてみよう' },
]

// GET: メモ一覧を返す
app.get('/api/posts', (req, res) => {
  res.json(posts)
})

// POST: メモを追加する
app.post('/api/posts', (req, res) => {
  const { title, content } = req.body
  const newPost = { id: posts.length + 1, title, content }
  posts.push(newPost)
  res.json(newPost)
})

// DELETE: メモを削除する
app.delete('/api/posts/:id', (req, res) => {
  const id = Number(req.params.id)
  posts = posts.filter(post => post.id !== id)
  res.json({ success: true })
})

app.listen(3001, () => {
  console.log('サーバー起動 → http://localhost:3001')
})
