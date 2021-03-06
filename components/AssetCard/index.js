import Image from 'next/image'
import { Fragment, useState } from 'react'
import { Card, CardActionArea, CardContent, Divider, Typography } from '@mui/material'
import { useScreenSize } from '../../contexts/ScreenSizeContext'
import Loader from '../Loader'
import styles from './AssetCard.module.css'

const LoadingImage = ({ desktopSize, mobileSize, src, alt, color }) => {
  const { isMobile } = useScreenSize()
  const [loading, setLoading] = useState(true)

  return (
    <div className={styles.cardImageWrapper}>
      <Image
        className={styles.cardImage}
        src={src}
        alt={alt}
        width={isMobile ? mobileSize : desktopSize}
        height={isMobile ? mobileSize : desktopSize}
        onLoadingComplete={() => setLoading(false)}
      />
      {loading ? <Loader className={styles.cardLoader} color={color} /> : null}
    </div>
  )
}

function AssetCard({
  mainTitles = [],
  subTitles = [],
  imageSrc,
  imageSizeDesktop = 300,
  imageSizeMobile = 270,
  tableRows,
  noClick = false,
  onClick,
  itemUrl = 'https://jpg.store',
  backgroundColor = 'var(--charcoal)',
  color = 'var(--white)',
  style = {},
}) {
  return (
    <Card
      sx={{
        margin: '1rem 2rem',
        border: '1px solid var(--black)',
        borderRadius: '1rem',
        overflow: 'visible',
        background: backgroundColor,
        color,
        ...style,
      }}
    >
      <CardActionArea
        style={{ display: 'flex', flexDirection: 'column', cursor: noClick ? 'unset' : 'pointer' }}
        onClick={() => (noClick ? {} : onClick ? onClick() : window.open(itemUrl, '_blank'))}
      >
        <Fragment>
          {imageSrc ? (
            <LoadingImage
              desktopSize={imageSizeDesktop}
              mobileSize={imageSizeMobile}
              src={imageSrc}
              alt=''
              color={color}
            />
          ) : null}

          <CardContent style={{ maxWidth: 'unset', width: '100%', padding: '1rem' }}>
            <Typography variant='h5' fontSize='big'>
              {mainTitles.map((str, idx) => (
                <Fragment key={`card-string-${str}-${idx}`}>
                  {str}
                  {idx !== mainTitles.length - 1 ? <br /> : null}
                </Fragment>
              ))}
            </Typography>
            <Typography variant='body2' color={color ?? 'text.secondary'} fontSize='medium'>
              {subTitles.map((str, idx) => (
                <Fragment key={`card-string-${str}-${idx}`}>
                  {str}
                  {idx !== subTitles.length - 1 ? <br /> : null}
                </Fragment>
              ))}
            </Typography>
            {tableRows && tableRows.length ? (
              <Fragment>
                <Divider sx={{ margin: '0.5rem 0' }} />
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    {tableRows.map((row, idx) => (
                      <tr key={`${mainTitles[0]}-table-row-${idx}`}>
                        {row.map((str) => (
                          <td key={`${mainTitles[0]}-table-row-${idx}-item-${str}`}>
                            <Typography variant='div' color={color ?? 'text.secondary'} fontSize='smaller'>
                              {str}
                            </Typography>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Fragment>
            ) : null}
          </CardContent>
        </Fragment>
      </CardActionArea>
    </Card>
  )
}

export default AssetCard
