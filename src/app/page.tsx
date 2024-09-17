import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className='container mx-auto px-4 py-16'>
      <h1 className='text-4xl font-bold mb-8 text-center'>
        Welcome to VC-UI Components
      </h1>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-3xl mx-auto'>
        <Link href='/buttons' className='w-full'>
          <Button size='lg' className='w-full'>
            Explore Buttons
          </Button>
        </Link>
        {/* Add more component category links here */}
      </div>
    </div>
  )
}
