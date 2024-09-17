'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import React, { useState, useRef } from 'react'

interface ExploreButtonProps {
  label?: string
}

export default function ExploreButton({
  label = 'Explore Now',
}: ExploreButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoTime, setVideoTime] = useState(0)

  const handleHoverStart = () => {
    setIsHovered(true)
    if (videoRef.current) {
      videoRef.current.currentTime = videoTime
      videoRef.current.play().catch((error) => {
        console.error('Video play failed:', error)
      })
    }
  }

  const handleHoverEnd = () => {
    setIsHovered(false)
    if (videoRef.current) {
      setVideoTime(videoRef.current.currentTime)
      videoRef.current.pause()
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleHoverStart()
    }
  }

  const handleKeyUp = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleHoverEnd()
    }
  }

  return (
    <motion.button
      className='relative overflow-hidden rounded-md shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-75'
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      onFocus={handleHoverStart}
      onBlur={handleHoverEnd}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      style={{ width: '180px', height: '50px' }}
      aria-label={label}
      role='button'
    >
      <motion.video
        ref={videoRef}
        className='absolute inset-0 object-cover w-full h-full'
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        muted
        playsInline
        loop
        preload='auto'
        aria-hidden='true'
      >
        <source src='/test.mp4' type='video/mp4' />
      </motion.video>
      <motion.div
        className='absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900'
        initial={{ opacity: 1 }}
        animate={{ opacity: isHovered ? 0.4 : 1 }}
        transition={{ duration: 0.3 }}
        aria-hidden='true'
      />
      <motion.div
        className='absolute inset-0 z-20 flex items-center justify-center text-sm font-medium transition-all duration-300 text-gray-800 dark:text-white'
        initial={{ x: 0 }}
        animate={{ x: isHovered ? 5 : 0 }}
        transition={{ type: 'spring', stiffness: 700, damping: 30 }}
      >
        <motion.span
          className='mr-2'
          animate={{ x: isHovered ? -5 : 0 }}
          transition={{ type: 'spring', stiffness: 700, damping: 30 }}
        >
          {label}
        </motion.span>
        <motion.div
          animate={{ x: isHovered ? 5 : 0, opacity: isHovered ? 0 : 1 }}
          transition={{ type: 'spring', stiffness: 700, damping: 30 }}
          aria-hidden='true'
        >
          <ArrowRight className='w-5 h-5' />
        </motion.div>
      </motion.div>
    </motion.button>
  )
}
