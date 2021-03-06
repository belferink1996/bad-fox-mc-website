import Image from 'next/image'
import { useScreenSize } from '../../contexts/ScreenSizeContext'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import data from '../../data/sneaks.json'
import styles from './Sneaks.module.css'

const Sneaks = () => {
  const { isMobile, width } = useScreenSize()

  const imageSize = isMobile ? 300 : 350
  const slidesPerView = Math.floor((width * 0.9) / imageSize)

  return (
    <div className={styles.root}>
      <Swiper modules={[Navigation, Pagination]} loop navigation pagination={{ type: 'bullets' }} slidesPerView={slidesPerView}>
        {data.map((str) => (
          <SwiperSlide key={str}>
            <Image src={str} alt='' width={imageSize} height={imageSize} className={styles.img} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Sneaks
