


const BookingRow = ({ booking }) => {
    const { date, service, price, img,_id } = booking

    const handleDelete = id =>{
        const proceed = confirm('Are you sure you want to delete');
        if(proceed){
           fetch(``)
           .then(res=>res.json())
           .then(data=>{
            console.log(data);
           })
        }
    }

    return (
        <tr>
            <th>
                <button onClick={()=>handleDelete(_id)} className="btn btn-circle btn-sm">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </th>
            <td>

                <div className="avatar">
                    <div className="rounded h-24 w-24">
                        {img && <img
                            src={img}
                            alt="Avatar Tailwind CSS Component" />}
                    </div>
                </div>


            </td>
            <td>
                {service}
            </td>
            <td>
                ${price}
            </td>
            <td>{date}</td>
            <th>
                <button className="btn btn-ghost btn-xs">details</button>
            </th>
        </tr>
    );
};

export default BookingRow;