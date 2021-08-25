import React,{useState,useEffect} from 'react'
import axios from 'axios' 
import { Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../../../styles/news.css'
import { useHistory } from 'react-router-dom';
import {FaEdit} from 'react-icons/fa'
import { EditModal } from './Modals';


export default function GiftCardDetail({apiBaseUrl}) {
    
    const { id } = useParams();
    const history = useHistory()
    const [giftcard,setGiftcard]=useState({})
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [param, setParam] = useState('');
 useEffect(() => {
     axios 
     .get(`${apiBaseUrl}/donations/${id}`)
     .then((res)=>{
         setGiftcard(res.data.data)   
     })
     .catch((err) => {
        console.log(err);
    });
 }, [])
    return (
        <div className="giftcard-details-container"> 
        <EditModal apiBaseUrl={apiBaseUrl} modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} id={param}/>
            {/* <div className='giftcard-details-info'>
            <div>
                <p><strong>Name</strong></p>
                <span>{giftcard.firstname + ' '+ giftcard.lastname}</span>
            </div>
            <div>
                <p><strong>Type of Gift Card</strong></p>
                <span>{giftcard.type_of_card}</span>
            </div>
            <div>
                <p><strong>Amount</strong></p>
                <span>{giftcard.amount}</span>
            </div>
            <div>
                <p><strong>Postcode</strong></p>
                <span>{giftcard.postcode}</span>
            </div>
            </div>
            <div className='giftcard-details-card-details'>
               <div>
               <p> <strong> Card Number:</strong></p>
                <span>{giftcard.card_number}</span>
               </div>
                <div>
                <p> <strong> Expiration Date:</strong></p>
                <span>{giftcard.expiration_date}</span>
                </div>
                <div>
                <p> <strong> Security Number:</strong></p>
                <span>{giftcard.security_code}</span>
                </div>
            </div> */}
            
            
            <table>
                <tr>
                    <th>Name</th>
                    <th>Type of Gift Card</th>
                    <th>Amount</th>
                    <th>Postcode</th>
                </tr>
                <tr>
                    <td>{giftcard.firstname + ' '+ giftcard.lastname}</td>
                    <td>{giftcard.type_of_card}</td>
                    <td>{giftcard.amount}</td>
                    <td>{giftcard.postcode}</td>
                </tr>
                <tr>
                    <th>Card Number</th>
                    <th>Expiration Date</th>
                    <th>Security Number</th>
                </tr>
                <tr>
                    <td>{giftcard.card_number}</td>
                    <td>{giftcard.expiration_date}</td>
                    <td>{giftcard.security_code}</td>
                </tr>
            </table>
            <div className='giftcard-details-comments'>
                <p><strong>Comments</strong></p>
                <p className='giftcard-details-comments-content'>{giftcard.comments}</p>
            </div>
            <div className='giftcard-details-back-div'>
                <button className='giftcard-details-back-btn' onClick={() => history.goBack()}>Back to Gift Cards</button>
                <button className='giftcard-details-edit-btn' onClick={() => {setModalIsOpen(true); setParam(id)}}><FaEdit className='giftcard-details-edit-icon'/>Edit</button>
            </div>
        </div>
    )
}
