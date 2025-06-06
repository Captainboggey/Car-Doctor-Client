import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import BookingRow from './BookingRow';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Bookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([])
    const axiosSecure = useAxiosSecure()
    const url = `/bookings?email=${user?.email}`
    useEffect(() => {
        // fetch(url,{credentials:'include'})
        //     .then(res => res.json())
        //     .then(data => setBookings(data))
          axiosSecure.get(url)
          .then(res=>setBookings(res?.data))
          .catch(error =>console.log(error))

    }, [])
    const handleDelete = id =>{
        const proceed = confirm('Are you sure you want to delete');
        if(proceed){
           fetch(`https://car-doctor-server-4.vercel.app/bookings/${id}`,{
            method:"DELETE"
           })
           .then(res=>res.json())
           .then(data=>{
            // console.log(data);
            if(data.deletedCount>0){
                alert("deleted successfully")
                const remaining = bookings.filter(booking=> booking._id !== id)
                setBookings(remaining)
            }
           })
        }
    }

    const handleConfirm = id =>{
        fetch(`https://car-doctor-server-4.vercel.app/bookings/${id}`,{
            method:"PATCH",
            headers:{
                "content-type": "application/json"
            },
            body: JSON.stringify({status: 'confirm'})
        })
        .then(res=>res.json())
        .then(data=>{
            // console.log(data)
            if(data.modifiedCount>0){
                // update state
                const remaining = bookings.filter(booking=>booking._id !== id);
                const updated = bookings.find(booking =>booking._id === id);
                updated.status = 'confirm'
                const newBookings = [updated, ...remaining];
                setBookings(newBookings);
            }
        })
    }
    return (
        <div>
            <h2 className="text-5xl">Your Bookings: {bookings.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                
                               
                            </th>
                            <th>Image</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            bookings.map(booking => <BookingRow handleConfirm={handleConfirm} handleDelete={handleDelete} booking={booking} key={booking._id}></BookingRow>)
                        }


                    </tbody>
                    {/* foot */}

                </table>
            </div>
        </div>
    );
};

export default Bookings;