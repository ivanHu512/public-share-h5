import React, { useMemo } from 'react'
import { IProduct } from '../../types'

interface ICurrency {
  iso_code: string
  position: number
  symbol: string
  rate: number
}
export interface IProps {
  data: IProduct
  currency?: ICurrency | null
  onClick?: () => void
  isSelected: boolean
}

const ProductItem: React.FC<IProps> = ({ data, onClick, isSelected }) => {
  const { coins, bonus, price, corner_pic } = data

  const handleItemClick = () => {
    if (onClick) {
      onClick()
    }
  }

  const discount_rate = useMemo(() => {
    return bonus ? ((bonus * 100) / coins).toFixed(0) : 0
  }, [bonus, coins])

  return (
    <div
      className={`product-item ${isSelected ? 'selected' : ''}`}
      onClick={handleItemClick}
    >
      {!!bonus && <div className='discount'>+{discount_rate}%</div>}
      {!!corner_pic && (
        <div className='corner'>
          <img src={corner_pic} alt='' />
        </div>
      )}

      <div className='price'>
        <div className='price_box'>${price}</div>
      </div>
      <div className='item-main'>
        <div className='coins-wrap'>
          <span className='coins-num'>{coins}</span>
          <span className='coins-text'>Coins</span>
        </div>
        {!!bonus && (
          <div className='bonus-box'>
            <div>+{bonus} Bonus</div>
          </div>
        )}
      </div>
    </div>
  )
}
export default ProductItem
