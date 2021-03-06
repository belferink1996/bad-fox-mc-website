import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useScreenSize } from '../../contexts/ScreenSizeContext'
import { AppBar, Avatar, IconButton } from '@mui/material'
import { MenuRounded } from '@mui/icons-material'
import Modal from '../Modal'
import BaseButton from '../BaseButton'
import CatalogMenu from './CatalogMenu'
import WalletMenu from './WalletMenu'
// import MintMenu from './MintMenu'
import Socials from './Socials'
import { HOME, MAP, TEAM } from '../../constants/scroll-nav'
import styles from './Header.module.css'

export default function Header({ scrollTo = () => null }) {
  const { isMobile } = useScreenSize()

  const router = useRouter()
  const isHome = router.asPath === '/'

  const [openMobileMenu, setOpenMobileMenu] = useState(false)

  useEffect(() => {
    if (isMobile) {
      setOpenMobileMenu(false)
    }
  }, [isMobile])

  const closeMenu = () => setOpenMobileMenu(false)

  const clickHome = () => {
    if (isHome) {
      scrollTo(HOME)
    } else {
      router.push('/')
    }
    setOpenMobileMenu(false)
  }

  const clickRoadmap = () => {
    scrollTo(MAP)
    setOpenMobileMenu(false)
  }

  const clickTeam = () => {
    scrollTo(TEAM)
    setOpenMobileMenu(false)
  }

  const clickMarket = () => {
    router.push('/market')
    setOpenMobileMenu(false)
  }

  const jsStyles = {
    nav: {
      width: isMobile ? '100%' : 'unset',
      height: isMobile ? '100vh' : '100%',
      justifyContent: 'center',
    },
    burger: {
      color: 'var(--white)',
      fontSize: '2rem',
    },
    btn: {
      width: 'fit-content',
      margin: isMobile ? '0.5rem' : 'unset',
    },
    alert: {
      width: 'fit-content',
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      zIndex: '999',
    },
  }

  return (
    <AppBar className={styles.root} position='sticky'>
      <div className='flex-row'>
        <IconButton onClick={clickHome} sx={{ margin: '1rem 1rem 1rem 0.5rem' }}>
          <Avatar
            alt=''
            src='/images/logo/white_alpha.png'
            sx={{ width: isMobile ? 55 : 69, height: isMobile ? 55 : 69 }}
          />
        </IconButton>
        <h1 style={{ fontSize: isMobile ? '1rem' : 'unset' }}>Bad Fox Motorcycle Club</h1>
      </div>

      {isMobile && !openMobileMenu ? (
        <IconButton onClick={() => setOpenMobileMenu(true)}>
          <MenuRounded style={jsStyles.burger} />
        </IconButton>
      ) : null}

      <Modal
        title=''
        onlyChildren={!isMobile}
        open={!isMobile || openMobileMenu}
        onClose={closeMenu}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      >
        <nav className={isMobile ? 'flex-col' : 'flex-row'} style={jsStyles.nav}>
          <BaseButton label='Home' onClick={clickHome} transparent style={jsStyles.btn} />

          {isHome ? <BaseButton label='Roadmap' onClick={clickRoadmap} transparent style={jsStyles.btn} /> : null}
          {isHome ? <BaseButton label='Team' onClick={clickTeam} transparent style={jsStyles.btn} /> : null}

          <BaseButton label='Market' onClick={clickMarket} transparent style={jsStyles.btn} />

          <CatalogMenu btnStyle={jsStyles.btn} closeMenu={closeMenu} />
          <WalletMenu btnStyle={jsStyles.btn} closeMenu={closeMenu} />
          {/* <MintMenu btnStyle={jsStyles.btn} closeMenu={closeMenu} /> */}
          <Socials closeMenu={closeMenu} />
        </nav>
      </Modal>
    </AppBar>
  )
}
