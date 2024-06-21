import {React} from 'react'
import { CartBag } from '../icons'
// to access the store value - import useSelector hook
import { useSelector } from 'react-redux'

const NavBar = (props) => {
    //This syntax extracts the amount property directly from the state.cart object.
    //Usage: Suitable when you need only one or a few specific properties from the state.cart object.

    const {amount} = useSelector((state) => state.cart)
    
    /* This syntax directly accesses the amount property from state.cart.
    Usage: Ideal when you specifically want the value of amount and do not need the entire state.cart object.
    
    // const amount = useSelector((state) => state.cart.amount)

    /*
    Use Destructuring: Use the first approach (const {amount} = ...) when you need to access multiple properties from state.cart or prefer to destructure explicitly.
    
    Direct Access: Use the second approach (const amount = ...) when you only need a single property like amount and want a straightforward access without extra syntax.
    */

    console.log(useSelector((state)=>{console.log('store-state', state)})) // cart :  {cartItems: Array(0), amount: 0, total: 0, isLoading: true}
    
    
    return(
        <nav>
            <div className='nav-center'>
                <h3>redux toolkit</h3>
                <div className='nav-container'>
                    <CartBag />
                {/* <CartIcon /> */}
                <div className='amount-container'>
                    <p className='total-amount'>{amount}</p>
                </div>
                </div>
            </div>
        </nav>  
    )
}

export default NavBar