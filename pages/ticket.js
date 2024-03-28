import { reserveForm } from "../main";
import { economyPrice } from "../classes/system";
import { businessPrice } from "../classes/system";
import { firstClassPrice } from "../classes/system";

window.updatePrice = function(selectElement) {
    const selectedOption = selectElement.value;
    const priceBadge = selectElement.parentElement.querySelector('.price-badge');
    priceBadge.textContent = "GHS " + getPriceBadge(selectedOption);
};

export default function ticketForm({index, lastname, othernames, seatClass, age, gender}, reservationSystem) {
    
    return `
        <div class="app_content__passenger">
            <div class="passenger-header">
                <h4><i class="fa-solid fa-caret-right"></i> 0${index+1}</h4>
                <button type="button" data-index="${index}" class="remove-passenger" ${index === 0? 'disabled': ''} style="font-family: 'Poppins',sans-serif; display: ${index === 0 ? 'none' : ''};">Remove Passenger</button>
            </div>
            <div class="passenger-form">
                <div class="form-input">
                    <label for="ticket_lastname_${index}">Last name</label>
                    <input type="text" class="reserve-input" id="ticket_lastname_${index}" data-section="passengers" data-key="lastname" data-index="${index}" name="lastname" placeholder="Last name" value="${lastname}">
                </div>
                <div class="form-input">
                    <label for="ticket_firstname_${index}">First name and other names</label>
                    <input type="text" class="reserve-input" id="ticket_firstname_${index}" data-section="passengers" data-key="othernames" data-index="${index}" name="firstname" placeholder="First name and other names" value="${othernames}">
                </div>
                <div class="form-input" >
                    <label for="ticket_class_${index}">Class</label>
                    <select name="class" class="reserve-input" id="ticket_class_${index}" data-section="passengers" data-key="seatClass" data-index="${index}" onchange="updatePrice(this)">
                        <option value="" disabled  ${seatClass === "" ? 'selected' : ''} hidden>Class</option>
                        <option value="Economy"  ${seatClass === "Economy" ? 'selected' : ''}>Economy</option>
                        <option value="Business" ${seatClass === "Business" ? 'selected' : ''}>Business</option>
                        <option value="First Class"  ${seatClass === "First Class" ? 'selected' : ''}>First Class</option>
                        
                    </select>
                    <div style="margin-top: 40px; margin-left: 100px;">
                        <span class="price-badge" style="padding: 10px; --tw-text-opacity: 1; background-color: rgba(239, 68, 68, 0.8 ); color: #fff; border-radius: 5px;">${getPriceBadge(seatClass)}</span>
                    </div>
                    
                </div>
                <div class="form-input">
                    <label for="ticket_age_${index}">Age</label>
                    <select name="age" class="reserve-input" id="ticket_age_${index}" data-section="passengers" data-key="age" data-index="${index}">
                        <option value="" disabled ${age === "" ? 'selected' : ''} hidden>Age</option>
                        <option value="Adult" ${age === "Adult" ? 'selected' : ''}>Adult(18+)</option>
                        <option value="Child" ${age === "Child" ? 'selected' : ''}>Child(below 18)</option>
                    </select>
                </div>
                <div class="form-input">
                    <label for="ticket_gender_${index}">Gender</label>
                    <select name="gender" class="reserve-input" id="ticket_gender_${index}" data-section="passengers" data-key="gender" data-index="${index}">
                        <option value="" disabled ${gender === "" ? 'selected' : ''} hidden>Gender</option>
                        <option value="Male" ${gender === "Male" ? 'selected' : ''}>Male</option>
                        <option value="Female" ${gender === "Female" ? 'selected' : ''}>Female</option>
                    </select>
                </div>
            </div>
        </div>
    `
}

function getPriceBadge(seatClass) {
    console.log("Seat Class:", seatClass);
    switch (seatClass) {
        case "Economy":
            console.log("Economy Price:", economyPrice);
            return economyPrice;
        case "Business":
            console.log("Economy Price:", businessPrice);
            return businessPrice;
        case "First Class":
            console.log("Economy Price:", firstClassPrice);
            return firstClassPrice;
        default:
            return '';
    }
}

function updatePrice(selectElement) {
    const selectedOption = selectElement.value;
    const priceBadge = selectElement.parentElement.querySelector('.price-badge');
    priceBadge.textContent = getPriceBadge(selectedOption);
}