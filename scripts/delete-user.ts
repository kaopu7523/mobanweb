import { config } from 'dotenv'
config()

import { db } from '../lib/db'
import { users, accounts, sessions, pointsHistory } from '../lib/schema'
import { eq } from 'drizzle-orm'

async function deleteUser() {
  const email = 'lp4530466@gmail.com'

  // 删除积分历史
  await db.delete(pointsHistory).where(eq(pointsHistory.userId, 'viFtI7yblJC-K0ArUnFlD'))
  console.log('删除积分历史记录')

  // 删除会话
  await db.delete(sessions).where(eq(sessions.userId, 'viFtI7yblJC-K0ArUnFlD'))
  console.log('删除会话记录')

  // 删除账户关联
  await db.delete(accounts).where(eq(accounts.userId, 'viFtI7yblJC-K0ArUnFlD'))
  console.log('删除账户关联记录')

  // 删除用户
  await db.delete(users).where(eq(users.id, 'viFtI7yblJC-K0ArUnFlD'))
  console.log('删除用户记录')

  console.log(`用户 ${email} 已成功删除`)
}

deleteUser().catch(console.error)
