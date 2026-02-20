import MyOrderPage from './MyOrderPage'

const Profile = () => {
  return (
    <div className='min-h-screen flex flex-col'>
        <div className='container mx-auto grow p-4 md:p-6'>
            <div className='flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0'>
                {/* Left Section */}
                <div className='w-full md:w-1/3 lg:w-1/4 shadow-lg rounded-lg p-16 bg-zinc-200 hover:shadow-neutral-400'>
                    <h1 className='text-2xl md:text-3xl font-bold mb-4'>ShivX</h1>
                    <p className='text-lg  text-gray-600 mb-4'>test01gmail.com</p>
                    <button className='bg-gray-500 w-full py-2 px-4 cursor-pointer rounded-lg hover:bg-red-500 hover:text-white'>
                        LogOut
                    </button>
                </div>

                {/* Right Section */}
                <div className='w-full md:w-2/3 lg:w-3/4'>
                    <MyOrderPage/>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Profile