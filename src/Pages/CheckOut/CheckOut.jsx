import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';

const CheckOut = () => {
    const service = useLoaderData()
    const {user}=useContext(AuthContext)
    const { title, _id ,price,img} = service;
    const handleBookService = e =>{
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const date = form.date.value;
        const email = user?.email;
        const booking ={
            customerName: name,
             email,
             img,
            date,
            service: title,
            service_id: _id,
            price: price,

        }
        fetch('http://localhost:5000/bookings',{
            method: "POST",
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify(booking)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.insertedId){
                alert("Booking Added Successfully!")
            }
        })
        
    }
    return (
        <div className=''>
            <h2 className='text-center text-3xl'>Book: {title}</h2>
            <form onSubmit={handleBookService} className="card-body">
                <div className='grid gird-col-1 md:grid-cols-2 gap-6'>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" placeholder="name" defaultValue={user?.displayName} className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Date</span>
                    </label>
                    <input type="date" name='date' className="input input-bordered" required />
                    
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name='email' placeholder="email" defaultValue={user?.email} className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Due Amount</span>
                    </label>
                    <input type="text" defaultValue={"$"+price} className="input input-bordered" required />
                    
                </div>
                </div>
                <div className="form-control mt-6">
                    
                    <input type="submit" value="Order Confirm" className='btn btn-block btn-primary' />
                </div>
            </form>
        </div>
    );
};

export default CheckOut;