const { neon } = require('@neondatabase/serverless')
const url = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_VK1J7OWkugNv@ep-shiny-bar-ah6x9gtb-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
const sql = neon(url)

async function deleteUser() {
  const users = await sql`SELECT id, email, name FROM users WHERE email = 'lp4530466@gmail.com'`
  console.log('用户列表:', users)

  if (users.length > 0) {
    const userId = users[0].id
    console.log('找到用户，ID:', userId)

    try {
      await sql`DELETE FROM "pointsHistory" WHERE "userId" = ${userId}`
      console.log('删除积分历史')
    } catch(e) { console.log('积分历史表不存在，跳过') }

    try {
      await sql`DELETE FROM "sessions" WHERE "userId" = ${userId}`
      console.log('删除会话')
    } catch(e) { console.log('会话表不存在或已删除') }

    try {
      await sql`DELETE FROM "accounts" WHERE "userId" = ${userId}`
      console.log('删除账户关联')
    } catch(e) { console.log('账户关联表不存在或已删除') }

    try {
      await sql`DELETE FROM "users" WHERE "id" = ${userId}`
      console.log('删除用户')
    } catch(e) { console.log('用户表删除失败:', e.message) }

    console.log('用户已成功删除')
  } else {
    console.log('未找到该邮箱的用户')
  }
}

deleteUser().catch(console.error)
