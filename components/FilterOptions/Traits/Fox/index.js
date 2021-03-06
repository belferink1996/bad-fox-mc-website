import { MenuItem, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useScreenSize } from '../../../../contexts/ScreenSizeContext'
import traitsData from '../../../../data/traits/fox'
import BaseButton from '../../../BaseButton'
import styles from './FoxTraitsOptions.module.css'

const FoxTraitsOptions = ({ callbackSelectedCategory = () => {}, children }) => {
  const { isMobile } = useScreenSize()
  const [selectedCategory, setSelectedCategory] = useState('Skin')

  useEffect(() => {
    callbackSelectedCategory(selectedCategory)
  }, [selectedCategory])

  return (
    <div className={styles.categoryButtons}>
      {isMobile ? (
        <TextField
          select
          label='Category'
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          sx={{ width: 300 }}
        >
          {Object.keys(traitsData).map((category) => (
            <MenuItem key={`category-option-${category}`} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
      ) : (
        Object.keys(traitsData)
          .sort((a, b) => a[0].localeCompare(b[0]))
          .map((category) =>
            category !== 'Gender' ? (
              <BaseButton
                key={`category-button-${category}`}
                label={category}
                onClick={() => setSelectedCategory(category)}
                backgroundColor='var(--brown)'
                hoverColor='var(--orange)'
                className={selectedCategory === category ? styles.selectedButton : ''}
              />
            ) : null
          )
      )}

      {children}
    </div>
  )
}

export default FoxTraitsOptions
