import { useState, useEffect } from 'react'
import { getUserInfo } from '@reelshort/services/shopping'
import { useRequest } from 'ahooks'
import { getToken } from '../lib'

const tokenInfo = getToken()

console.log({ tokenInfo })
export default function useUser(): any {
  const { uuid: uid } = tokenInfo
  const [user, updateUser] = useState(null)
  const [userError, setUserError] = useState(false)

  const { data: userData, run } = useRequest((id: number) => getUserInfo(id), {
    manual: true,
    onSuccess: (res: any) => {
      console.log('fetch user:', res)
      if (res.code === 0) {
        updateUser(res.data.user_info)
      } else {
        setUserError(true)
        // errorGet({
        //   parm1: 1001,
        //   parm2: res.code,
        //   parm5: '/api/getUserInfo'
        // })
      }
    },
    onError: () => {
      setUserError(true)
    }
  })

  useEffect(() => {
    if (!uid) {
      return
    }
    run(uid)
  }, [uid])

  return { user, updateUser, uid, userData, userError }
}
