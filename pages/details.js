import { app } from "../main";


export default function showDetails(element, msg="An Error Occured") {
    element.html(`
    <div class="detail">
        <h5 class="detail_title"><i class="fa-solid fa-plane-departure"></i>Departure</h5>
        <div class="detail_content">${app.departure}</div>
    </div>
    <div class="detail">
        <h5 class="detail_title"><i class="fa-solid fa-plane-arrival"></i>Destination</h5>
        <div class="detail_content">${app.destination}</div>
    </div>
    <div class="detail">
        <h5 class="detail_title"><i class="fa-solid fa-plane"></i>Airline</h5>
        <div class="detail_content">${app.airline}</div>
    </div>
    <div class="detail">
        <h5 class="detail_title"><i class="fa-solid fa-calendar"></i>Departure date</h5>
        <div class="detail_content">${app.leavingAt}, ${app.leavingTime}</div>
    </div>
    <div class="detail">
        <h5 class="detail_title"><i class="fa-solid fa-calendar"></i>Destination date</h5>
        <div class="detail_content">${app.arrivingAt}, ${app.arrivingTime}</div>
    </div>
    <div class="detail">
        <h5 class="detail_title"><i class="fa-solid fa-couch"></i>Available seats</h5>
        <div class="detail_content">${app.capacity}</div>
    </div>
    `)
}