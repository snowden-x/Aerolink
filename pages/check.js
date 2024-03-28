import { app, foundReservation, handleCancelReservation, handleCheckReservation } from "../main";
import $ from 'jquery';

export default function checkPage(element) {
    $('#top').hide(); // Hide the section with id 'top'
    $('#aloplane').hide();

    element.html(`
        <!-- ======================SECOND SECTION======================= -->
        <section class = "check-section">
            <div class = "map">
                <img src="./public/flightmap.png" alt="map" style="width: 90%; height: auto; margin-left: 10px; margin-right: 2px;">
            </div>

            <div class="checkform-section" style="width:80%; height:80%; padding:1px;">
                <div class="app_section" style="display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
                    <div class="app_header">
                        <h3 style="text-align:center !important;">Check Reservation</h3>
                    </div>
                    <div class="app_content">
                        <div class="app_content__check">
                            <div class="form-input">
                                <label for="search-reservation"></label>
                                <form>
                                    <input type="text" name="search-code" id="search-code" placeholder="Reservation code">
                                    <input type="text" name="search-reservation" id="search-reservation" placeholder="Last name" style="outline-color: blue;">
                                    <button type="submit" style="border-radius:20px; font-family:'Poppins',sans-serif; margin-top: 20px;">Search</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>


        <!-- ======================THIRD SECTION======================= -->
        ${!!foundReservation ? (`<div class="app_section">
            <div class="app_header">
                <h3>My Reservation</h3>
            </div>
            <div class="app_content">
                <table class="app_content__reserve-table">
                    <thead>
                        <tr>
                        <th>ReservationCode</th>
                        <th>FlightCode</th>
                        <th>Fullname</th>
                        <th>Email</th>
                        <th>Tickets</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>`) : ''}
    `);

    // added eventlistener to search for reservation on click
    handleCheckReservation($(".app_content__check form"));

    // added eventlistener to cancel reservation on click 
    handleCancelReservation($("button.cancel"));
}