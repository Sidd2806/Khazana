import { IoMdClose } from 'react-icons/io'
import CartContent from '../Cart/CartContent'
import { useNavigate } from 'react-router-dom'

const CartDrawer = ({drawerOpen,toggleDrawer}) => {
  const navigate=useNavigate();
  const handleCheckout =()=>{
    toggleDrawer()
    navigate("/checkout")
  }
   
  return (
    <div className={`fixed top-0 right-0 w-3/4 z-50 sm:w-1/2 md:w-120 bg-slate-200 h-full shadow-lg transform transition-transform duration-300 flex flex-col ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}>
        {/* close button */}
         <div className='flex justfiy-end p-4'>
            <button onClick={toggleDrawer}>
                <IoMdClose className='h-6 w-6 text-gray-600' />
            </button>
         </div>
         {/* Card component with scrollable area */}
         <div className='grow p-4 overflow-y-auto'>
            <h2 className='text-xl font-semibold mb-4'>You Cart</h2>
            <CartContent />
         </div>
         {/* checkout button and taxes reminder */}
          <div className='p-4 sticky bottom-0'>
            <button className='w-full bg-yellow-500  py-3 rounded-full font-bold hover:bg-amber-600'
            onClick={handleCheckout}>
                Checkout
            </button>
            <p className='text-sm mt-2 text-red-400 text-center tracking-tighter'>*shipping taxes, and discount codes are calculated at checkout </p>
          </div>
    </div>
  )
}

export default CartDrawer 