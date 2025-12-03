import React from 'react'
import styles from './index.module.scss'

interface IProps {
  data: {
    title: string
    desc: string
    cover: string
    image_urls: string[]
  }
}

/**
 *
 * @param props
 * @returns
 */
const FallGroundStaticV2 = (props: IProps) => {
  const { data } = props
  return (
    <div className={styles.fall_ground_box3}>
      <div className={styles.header}>
        <div className={styles.header_icon}></div>
        <div className={styles.header_title}>ReelShort</div>
      </div>
      <div className={styles.cover}>
        <img src={data?.image_urls?.[0] || data?.cover} />
      </div>
      <div className={styles.title}>{data?.title}</div>
      <div className={styles.desc}>{data?.desc}</div>
    </div>
  )
}
FallGroundStaticV2.displayName = 'FallGroundStaticV2'
export default FallGroundStaticV2
