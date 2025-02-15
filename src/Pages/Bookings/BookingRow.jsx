


const BookingRow = ({booking}) => {
    const {date,service,price,img}=booking
    
    return (
        <tr>
            <th>
                <label>
                    <input type="checkbox" className="checkbox" />
                </label>
            </th>
            <td>
               
                    <div className="avatar">
                        <div className="rounded h-24 w-24">
                           { img &&<img
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