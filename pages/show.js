import { app } from "../main";
import showError from "./error";
import $ from 'jquery';

export function showPage(element) {
    $('#top').hide();
    $('#aloplane').hide();
    element.html(`
        <!-- ======================SECOND SECTION======================= -->
        <div class="app_section">
            <div class="app_header">
            <h3>All Passengers</h3>
            </div>
            <div class="app_content">
                <table class="app_content__reserve-table">
                    <thead>
                        <tr>
                            <th>TicketCode</th>
                            <th>ReservationCode</th>
                            <th>Fullname</th>
                            <th>Gender</th>
                            <th>Class</th>
                            <th>Seat</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${app.ticketsList.iterate(({ticketCode, reservationCode, lastname, othernames, gender, seatClass, seat})=> (
                            `
                            <tr>
                                <td>${ticketCode}</td>
                                <td>${reservationCode}</td>
                                <td>${lastname}, ${othernames}</td>
                                <td>${gender}</td>
                                <td>${seatClass}</td>
                                <td>${seat}</td>
                            </tr>
                            `
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    `)
}