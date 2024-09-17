'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import React, { useState, useRef, useCallback } from 'react'

interface NeumorphismVideoOnHoverProps {
  label?: string
}

export default function NeumorphismVideoOnHover({
  label = 'Explore Now',
}: NeumorphismVideoOnHoverProps) {
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
      className='relative overflow-hidden bg-gray-100 dark:bg-gray-800 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-75'
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
        borderRadius: '25px',
        boxShadow: isHovered
          ? 'inset 3px 3px 6px #bebebe, inset -3px -3px 6px #ffffff'
          : '6px 6px 12px #bebebe, -6px -6px 12px #ffffff',
      }}
      aria-label={label}
      role='button'
    >
      <motion.video
        ref={videoRef}
        className='absolute inset-0 object-cover w-full h-full rounded-[25px]'
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
        className='absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-[25px]'
        animate={{ opacity: isHovered ? 0.6 : 1 }}
        transition={{ duration: 0.3 }}
        aria-hidden='true'
      />
      <motion.div
        className='absolute inset-0 z-20 flex items-center justify-center text-base font-medium transition-all duration-300 text-gray-800 dark:text-white'
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
