import { app, handleAddPassenger, handleDeletePassenger, handleInputChange, handleMakeReservation, reserveForm } from "../main";
import $ from "jquery";
import showError from "./error";
import ticketForm from "./ticket";
import flatpickr from "flatpickr";


const expiryDateConfig = {
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "F j, Y",
    minDate: "today",
}

let expiryDateInstance;

export default function reservePage(element) {
    $('#top').show();
    $('#aloplane').show();
    if(app.capacity === 0){
        showError(element, "This Flight Is Completely Booked");
        return;
    };

    element.html(`
        <!-- ======================FIRST SECTION======================= -->
        <div class="app_section" style="background-color: rgb(249 250 251 / var(--tw-bg-opacity));">
            <div class="app_header">
            <h3 style="color: #4F46E5;">Reserver Contact</h3>
            </div>
            <div class="app_content">
                <div class="app_content__contact">
                    <div class="form-input">
                        <label for="reserve_lastname">Last name</label>
                        <input type="text" class="reserve-input" id="reserve_lastname" data-section="contact" data-key="lastname" data-index="0" name="lastname" placeholder="Last name" value="${reserveForm.contact[0].lastname}">
                    </div>
                    <div class="form-input">
                        <label for="reserve_firstname">First name and other names</label>
                        <input type="text" class="reserve-input" id="reserve_firstname" data-section="contact" data-key="othernames" data-index="0" name="firstname" placeholder="First name and other names" value="${reserveForm.contact[0].othernames}">
                    </div>
                    <div class="form-input">
                        <label for="reserve_email">Email</label>
                        <input type="email" class="reserve-input" id="reserve_email" data-section="contact" data-key="email" data-index="0" name="email" placeholder="Email" value="${reserveForm.contact[0].email}">
                    </div>
                    <div class="form-input">
                        <label for="reserve_number">Number</label>
                        <input type="text" class="reserve-input" id="reserve_number" data-section="contact" data-key="number" data-index="0" name="number" placeholder="Number" value="${reserveForm.contact[0].number}">
                    </div>
                </div>
            </div>
        </div>

        <!-- ======================SECOND SECTION======================= -->
        <div class="app_section">
            <div class="app_header">
                <h3 style="color:rgba(239, 68, 68, var(--tw-text-opacity));">Passengers</h3>
                <button type="button" class="add-passenger" ${(app.capacity - reserveForm.passengers.length) < 1? 'disabled': ''} style="font-family: 'Poppins',sans-serif;">Add Passenger</button>
            </div>
            <div class="app_content">
                ${reserveForm.passengers.map((passenger, index)=>(
                    ticketForm({index, ...passenger})
                ))}
            </div>
        </div>

        <!-- ======================THIRD SECTION======================= -->
        <div class="app_section" style="background-color: rgb(249 250 251 / var(--tw-bg-opacity));">
            <div class="app_header">
            <h3>Payment Details</h3>
            </div>
            <div class="app_content">
                <div class="app_content__payment">
                    <div class="form-input">
                        <label for="cardType">Card Type</label>
                        <select name="cardtype" class="reserve-input" id="cardType" data-section="payment" data-key="cardType" data-index="0">
                            <option value="" disabled ${reserveForm.payment[0].cardType === "" ? 'selected' : ''} hidden>Card Type</option>
                            <option value="Visa" ${reserveForm.payment[0].cardType === "Visa" ? 'selected' : ''}>Visa</option>
                        </select>
                    </div>
                    <div class="form-input">
                        <label for="cardNumber">Card Number</label>
                        <input type="text" class="reserve-input" id="cardNumber" data-section="payment" data-key="cardNumber" data-index="0" name="number" placeholder="Card Number" value="${reserveForm.payment[0].cardNumber}">
                    </div>
                    <div class="form-input">
                        <label for="cardName">Name on card</label>
                        <input type="text" class="reserve-input" id="cardName" data-section="payment" data-key="cardName" data-index="0" name="name" placeholder="Name on card" value="${reserveForm.payment[0].cardName}">
                    </div>
                    <div class="form-input">
                        <label for="expiryDate">Expiry Date</label>
                        <input type="text" class="reserve-input" id="expiryDate" data-section="payment" data-key="expiryDate" data-index="0" name="expirydate" placeholder="Expiry Date" value="${reserveForm.payment[0].expiryDate}">
                    </div>
                    <div class="form-input">
                        <label for="cvv">CVV</label>
                        <input type="text" class="reserve-input" id="cvv" data-section="payment" data-key="cvv" data-index="0" name="cvv" maxlength="3" placeholder="CVV" value="${reserveForm.payment[0].cvv}">
                    </div>
                </div>
            </div>
        </div>

        <!-- ======================MAKE RESERVATION BUTTON======================= -->
        <div class="app_button" style = "display:flex; justify-content:center; align-items:center;">
            <button type="button" id="make-reservation" style="border-radius:20px; font-family: 'Poppins', sans-serif;">Make Reservation</button>
        </div>
    `);

    // event handler to add new passenger
    handleAddPassenger($("button.add-passenger"));
    
    // event handler to remove passenger
    handleDeletePassenger($("button.remove-passenger"));

    // event listener to make the reservation
    handleMakeReservation($("#make-reservation"));
    
    // if flatpickr for #expiry-date exist destroy it
    if(expiryDateInstance) expiryDateInstance.destroy();

    expiryDateInstance = flatpickr("#expiryDate", expiryDateConfig);


    return $(".reserve-input").on("change", function (){handleInputChange(this)});
}