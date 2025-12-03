import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { usePay } from '../../hooks'

import { lang } from '../../lib'
import './index.scss'

const Profile: React.FC = () => {
  const { user } = usePay()
  const [isError, setIsError] = useState(false)

  const userCoins = useMemo(() => {
    const coins = user?.coins || 0
    const bonus = user?.bonus || 0
    return coins - bonus
  }, [user])

  const handlerError = useCallback(() => {
    setIsError(true)
  }, [])

  return (
    <div className='profile'>
      <div className='user'>
        {!user ? (
          <div className='avatar skeleton'></div>
        ) : (
          <div className='avatar'>
            <img
              src={
                isError
                  ? 'https://v-mps.crazymaplestudios.com/images/368ac340-876e-11ee-aed2-cfe3d80f70eb.png'
                  : user.pic
              }
              alt='avatar'
              onError={handlerError}
            />
          </div>
        )}
        <div className='info'>
          {!user ? (
            <>
              <div className='uname skeleton'></div>
              <div className='uid skeleton'></div>
            </>
          ) : (
            <>
              <div className='uname'>{user?.uname}</div>
              <div className='uid'>UID : {user?.uid}</div>
            </>
          )}
          {!user ? (
            <div className='coins skeleton'></div>
          ) : (
            <div className='coins'>
              <span className='icon'></span>
              <span className='coin-num'>
                Coins : <span>{user?.coins}</span>
              </span>
              <span className='bonus-num'>
                Bonus: <span>{user?.bonus}</span>
              </span>
            </div>
          )}
        </div>
      </div>
      {!user ? null : (
        <div className='notice-wrap'>
          <div className='notice'>
            <label>{lang().notice}:</label>
            <div className='notice-text'>{lang().noticeText}</div>
          </div>
        </div>
      )}
    </div>
  )
}
export default Profile
