import GlassmorphismVideoOnHover from '@/components/glassmorphism-video-on-hover'
import NeubrutalismVideoOnHover from '@/components/neubrutalism-video-on-hover'
import NeumorphismVideoOnHover from '@/components/neumorphism-video-on-hover'
import VideoOnHoverButton from '@/components/video-on-hover-button'

export default function ButtonsPage() {
  return (
    <div className='container mx-auto px-4 py-16'>
      <h1 className='text-3xl font-bold mb-8'>Button Components</h1>
      <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
        <div className='flex flex-col items-center p-4 bg-card rounded-lg shadow'>
          <h2 className='text-xl font-semibold mb-4'>Video on Hover Button</h2>
          <VideoOnHoverButton />
        </div>
        <div className='flex flex-col items-center p-4 bg-card rounded-lg shadow'>
          <h2 className='text-xl font-semibold mb-4'>Video on Hover Button</h2>
          <NeubrutalismVideoOnHover />
        </div>
        <div className='flex flex-col items-center p-4 bg-card rounded-lg shadow'>
          <h2 className='text-xl font-semibold mb-4'>Video on Hover Button</h2>
          <NeumorphismVideoOnHover />
        </div>
        <div className='flex flex-col items-center p-4 bg-card rounded-lg shadow'>
          <h2 className='text-xl font-semibold mb-4'>Video on Hover Button</h2>
          <GlassmorphismVideoOnHover />
        </div>
        {/* Add more button components here */}
      </div>
    </div>
  )
}
