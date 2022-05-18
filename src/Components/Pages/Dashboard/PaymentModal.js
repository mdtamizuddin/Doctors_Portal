
import React from 'react'
import { loadStripe } from '@stripe/stripe-js';
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';

const PaymentModal = ({ open, setOpen, payAppointment }) => {
    const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
    return (
        <div className='my-modal bg-slate-200'>
            
            <div className="card relative w-full h-64 max-w-lg py-10 px-10 border bg-base-100 shadow-xl">
            <button onClick={() => {setOpen(false)}} className='absolute btn-sm btn bg-white border right-0 top-0 z-10'>
            <i class="fa-solid text-2xl text-red-500 fa-xmark"></i>
            </button>
                {
                    <Elements stripe={stripePromise}>
                        <CheckoutForm payAppointment={payAppointment}/>
                    </Elements>
                }
            </div>
        </div>
    )
}

export default PaymentModal


const CheckoutForm = ({payAppointment}) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (elements == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <p className='mb-2'>{payAppointment.treatment}</p>
            <p className='mb-5'>Amount ${payAppointment.price}</p>
            <CardElement />
            <button className='btn btn-sm btn-secondary mt-10 text-white' type="submit" disabled={!stripe || !elements}>
                Pay
            </button>
        </form>
    );
};
