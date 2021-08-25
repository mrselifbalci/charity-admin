import React, {useState} from 'react'
import Modal from 'react-modal';
import axios from 'axios'
import { useEffect } from 'react';

Modal.setAppElement('#root'); 


export const EditModal = ({apiBaseUrl, modalIsOpen, setModalIsOpen, id, setReload, reload}) => {
    const [firstname,setFirstname]=useState('')
    const [lastname,setLastname]=useState('')
    const [amount,setAmount]=useState('')
    const [comments,setComments]=useState('')
    const [type,setType]=useState('')
    const [cardType,setCardType]=useState('')
    const [cardNumber,setCardNumber]=useState('')
    const [expirationDate,setExpirationDate]=useState('')
    const [securityCode,setSecurityCode]=useState('')
    const [postcode,setPostcode]=useState('')
    

    const handleSubmit=(id)=>{
        const updatedNews={
            firstname,
            lastname,
            amount,
            type,
            comments,
            type_of_card:cardType,
            card_number:cardNumber,
            expiration_date:expirationDate,
            security_code:securityCode,
            postcode
        }
        axios.put(`${apiBaseUrl}/donations/${id}`,updatedNews)
        .then(res=>{
            setReload(!reload)
			setModalIsOpen(false)
        })
        .catch(err=>{console.log(err)})
    }


    const editGiftCard= async (id)=>{
       await  axios
        .get(`${apiBaseUrl}/donations/${id}`)
        .then((res) => { 
            setFirstname(res.data.data.firstname)
            setLastname(res.data.data.lastname)
            setType(res.data.data.type)
            setAmount(res.data.data.amount)
            setComments(res.data.data.comments)
            setCardType(res.data.data.type_of_card)
            setCardNumber(res.data.data.card_number)
            setExpirationDate(res.data.data.expiration_date)
            setSecurityCode(res.data.data.security_code)
            setPostcode(res.data.data.postcode)
        })
        .catch((err) => {
            console.log(err);
        });
        setModalIsOpen(true)
            
    }
    useEffect(() => {
        if(id !== '') {
            editGiftCard(id)
        }
    }, [id])
    return (
        <div>
             <Modal
				isOpen={modalIsOpen}
				onRequestClose={() => setModalIsOpen(false)}
				style={{
					overlay: {
						backgroundColor: 'rgba(211, 211, 211, 0.60)'
					},
					content: {
						height: "auto",
                        backgroundColor: '#347ca5',
                        width:"90%",
                        
                        
        			},
				}}
			>
                <div className="giftcard-close-modal-x" onClick={() => setModalIsOpen(false)}>X</div>
				<div className="giftcard-content">
                <form className="giftcard-form" onSubmit={(e)=>{e.preventDefault();handleSubmit(id)}}>
                    <div className='giftcard-form-row'>
					<div>
					<label htmlFor="giftcard-firstname">
							First Name
						</label>
						<input
							required
							value={firstname}
							onChange={(e) => setFirstname(e.target.value)}
							type="text"
							id="giftcard-firstname"
							name="giftcard-firstname"
							placeholder="Enter your firstname"
						/>
					</div>
					<div>
					<label htmlFor="giftcard-lastname">
							Last Name
						</label>
						<input
							required
							value={lastname}
							onChange={(e) => setLastname(e.target.value)}
							type="text"
							id="giftcard-lastname"
							name="giftcard-lastname"
							placeholder="Enter your lastname"
						/>

					</div>			
                    </div>
                    <div className='giftcard-form-row'>
                    <div>
						<label htmlFor="giftcard-type">
							Please enter the type of gift card
						</label>
						<input
							required
							value={cardType}
							onChange={(e) => setCardType(e.target.value)}
							type="text"
							id="giftcard-type"
							name="giftcard-type"
							placeholder="Enter the type of gift card (Amazon, eBay, Trendyol...)"
						/>
					</div>
                    <div>
						<label htmlFor="giftcard-postcode">
							Please enter your post code
						</label>
						<input
							required
							value={postcode}
							onChange={(e) => setPostcode(e.target.value)}
							type="text"
							id="giftcard-postcode"
							name="giftcard-postcode"
							placeholder="Enter your postcode"
						/>
					</div>
                    </div>
					
					<div className="giftcard-form-row">
						<div>
							<label htmlFor="giftcard-number">
								Please enter the gift card number
							</label>
							<input
								required
								value={cardNumber}
								onChange={(e) => setCardNumber(e.target.value)}
								type="text"
								id="giftcard-number"
								name="giftcard-number"
								placeholder="Enter the gift card number"
							/>
						</div>
						<div>
							<label
								htmlFor="giftcard-security"
							>
								Gift Card security code (PIN,CVV)
							</label>
							<input
								required
								value={securityCode}
								type="text"
								id="giftcard-security"
								name="giftcard-security"
								placeholder="Enter the security code"
								onChange={(e) => setSecurityCode(e.target.value)}
							/>
						</div>
					</div>
					<div className="giftcard-form-row">
						<div>
							<label htmlFor="giftcard-balance">
								Gift card balance? (Leave blank if unknown.)
							</label>
							<input
								required
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
								type="number"
								id="giftcard-balance"
								name="giftcard-balance"
								placeholder="Enter the balance"
							/>
						</div>
						<div>
							<label htmlFor="giftcard-expiration">
								Card Expiration (MM/YY) (Leave blank if none)
							</label>
							<input
								required
								value={expirationDate}
								onChange={(e) => setExpirationDate(e.target.value)}
								type="text"
								id="giftcard-expiration"
								name="giftcard-expiration"
								placeholder="Enter expiration date"
							/>
						</div>
					</div>
				
					<div className="giftcard-edit-textarea">
					<div>
                    <label htmlFor="giftcard-info">
							Please tell us if you have any additional information that
							may help us process your gift card. (optional)
						</label>
						<textarea
				
							value={comments}
							onChange={(e) => setComments(e.target.value)}
							type="text"
							id="giftcard-info"
							rows="4"
							name="giftcard-info"
							placeholder="Enter additional information"
						/>
                    </div>
					</div>
					<div className="giftcard-form-submit-row">
						<button className='giftcard-edit-submitButton' type="submit">Update</button>
					</div>
				</form>
                </div>
			</Modal>
        </div>
    )
}