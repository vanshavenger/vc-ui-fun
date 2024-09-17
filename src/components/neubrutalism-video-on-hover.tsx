'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import React, { useState, useRef, useCallback } from 'react'

interface NeubrutalismVideoOnHoverProps {
  label?: string
}

export default function NeubrutalismVideoOnHover({
  label = 'Explore Now',
}: NeubrutalismVideoOnHoverProps) {
  const [isHovered, setIsHovered] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoTime, setVideoTime] = useState(0)

  const handleHoverStart = useCallback(() => {
    setIsHovered(true)
    if (videoRef.current) {
      videoRef.current.currentTime = videoTime
      videoRef.current.play().catch((error) => {
        console.error('Video play failed:', error)
      })
    }
  }, [videoTime])

  const handleHoverEnd = useCallback(() => {
    setIsHovered(false)
    if (videoRef.current) {
      setVideoTime(videoRef.current.currentTime)
      videoRef.current.pause()
    }
  }, [])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        handleHoverStart()
      }
    },
    [handleHoverStart]
  )

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        handleHoverEnd()
      }
    },
    [handleHoverEnd]
  )

  return (
    <motion.button
      className='relative overflow-hidden bg-yellow-300 dark:bg-purple-600 border-4 border-black dark:border-white transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-opacity-75'
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      onFocus={handleHoverStart}
      onBlur={handleHoverEnd}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      style={{
        width: '180px',
        height: '50px',
        borderTopRightRadius: '16px',
        borderBottomLeftRadius: '16px',
        borderTopLeftRadius: '4px',
        borderBottomRightRadius: '4px',
        borderTopWidth: '6px',
        borderRightWidth: '2px',
        borderBottomWidth: '2px',
        borderLeftWidth: '6px',
        boxShadow: isHovered
          ? '2px 2px 0 0 #000'
          : '6px 6px 0 0 #000, inset -4px -4px 0 0 #000',
      }}
      aria-label={label}
      role='button'
    >
      <motion.video
        ref={videoRef}
        className='absolute inset-0 object-cover w-full h-full rounded-[0px_12px_0px_12px]'
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        muted
        playsInline
        loop
        preload='auto'
        aria-hidden='true'
      >
        <source src='/test.mp4' type='video/mp4' />
      </motion.video>
      <motion.div
        className='absolute inset-0 bg-yellow-300 dark:bg-purple-600 rounded-[0px_12px_0px_12px]'
        animate={{ opacity: isHovered ? 0.6 : 1 }}
        transition={{ duration: 0.3 }}
        aria-hidden='true'
      />
      <motion.div
        className='absolute inset-0 z-20 flex items-center justify-center text-base font-bold transition-all duration-300 text-black dark:text-white'
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
        <AnimatePresence>
          {!isHovered && (
            <motion.div
              initial={{ opacity: 1, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              aria-hidden='true'
            >
              <ArrowRight className='w-5 h-5' />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  )
}
