import Queue from "./queue";
import { TicketList } from "./ticket";
import { ReservationList } from "./reservation";
import { getData, saveData } from "../main";

export const  economyPrice = 1005.99;
export const  businessPrice = 1600.99;
export const  firstClassPrice = 3000.99;
class ReservationSystem {
    constructor() {
        this.airline = "Ghana Airways";
        this.model="Boeing 727";
        this.departure = "Accra, Ghana";
        this.departureAirport="Kotoka International Airport";
        this.departureIATA="GHA-ACC"
        this.destination = "Kumasi, Ghana";
        this.destinationAirport="Kumasi Airport";
        this.destinationIATA="GHA-KMS"
        this.leavingAt = "March 28, 2024";
        this.arrivingAt = "March 28, 2024";
        this.leavingTime = "06:17";
        this.arrivingTime = "10:40";
        this.capacity = 137;
        this.economySeats = new Queue(getData("econ_seat"));
        this.businessSeats = new Queue(getData("bus_seat"));
        this.firstClassSeats = new Queue(getData("first_seat"));
        this.economyPrice = 1005.99;
        this.businessPrice = 1600.99;
        this.firstClassPrice = 3000.99;
        this.ticketsList = new TicketList();
        this.reservationsList = new ReservationList();

        // populate the linked lists
        this.ticketsList.populate(getData("tickets"));
        this.reservationsList.populate(getData("reservations"));
    }

    /** ADD A RESERVATION - 
     *  add a reservation to the linked list of reservation and 
     *  add the reservation's tickets in the ticket linked list
     * 
     * @param reservation the reservation object of type Reservation class to be added
     * @param tickets the list of tickets object to be added
     * 
     * @returns success | failed
     */
    addReservation(reservation, tickets) {
        let newReservationCode = this.#generateCode();
        this.reservationsList.push({reservationCode: newReservationCode, ...reservation});

        tickets.forEach(ticket => {
            let ticketCode = this.#generateCode();
            let {seat, price} = this.#getSeatDetail(ticket.seatClass);

            // TODO: if ticket seatClass is economy class || business class || first class set the ticketSeat and ticketPrice

            this.ticketsList.push({ticketCode, reservationCode: newReservationCode, seat, price, ...ticket });
            this.capacity -= 1;
        });

        // TODO: handle some errors

        this.saveProgress();

        return "success";
    }

    /** CANCEL A RESERVATION -
     *  cancel a reseravtion that has been made by providing the
     *  the reservation code
     * 
     *  @param rCode the reservation code of the reservation to be cancelled
     * 
     *  @returns success | failed
     */
    cancelReservation(rCode) {
        // remove specific reservation
        this.reservationsList.remove(rCode); 

        // remove all tickets having the reservation code
        let reclaimedSeats = this.ticketsList.remove(rCode);

        // loop through the object list of all reclaimed seats and 
        // add them to the respective seat queue
        reclaimedSeats.forEach(data => {
            switch (data.class) {
                case "Economy":
                    this.economySeats.enqueue(data.seat);
                    break;
                case "Business":
                    this.businessSeats.enqueue(data.seat);
                    break;
                case "First Class":
                    this.firstClassSeats.enqueue(data.seat);
                    break;
                default:
                    break;
            }

            this.capacity += 1;
        });

        // save apllication progress after cancelling
        this.saveProgress();

        return "success";
    }

    /** PRINT A PARTICULAR RSERVATION -
     *  This methods invokes a funtion that uses the pdfkit library to
     *  create a pdf format of the reservation details of a particular 
     *  reservation including its tickets
     * 
     * @param rCode the reservation code to be printed
     * 
     * @returns success | failed
     */
    printReservation(rCode) {

    }

    /** CHECK IF A RESERVATION EXISTS -
     * This method when called checks if a reservation exists 
     * in the linked list of reservations based on the provided
     * reservation secret code and the lastname of reserver
     * 
     * @param rCode the reservation code of the reservation to be looked up
     * @param lastname the lastname of the individual that made the reservation
     * 
     * @returns the reservation object || null
    */
    checkReservation(rCode, lastname) {
        return this.reservationsList.get(rCode, lastname);
    }

    /** SAVE PROGRESS -
     * This method is called when ever there is any mutation such as
     * creating, deleting or modification done in the aplication.
     * 
     * @returns void
     */
    saveProgress() {
        let reservations = [],
            tickets = []

         // converting linked list of reseravtions to normal list in other to save it
        this.reservationsList.iterate((current)=> reservations.push({...current}), false);

        // converting linked list of tickets to normal list in other to save it
        this.ticketsList.iterate((current)=> tickets.push({...current}), false);
        
        // save reservations
        saveData("reservations", reservations);

        // save tickets
        saveData("tickets", tickets);

        // save the list of busness class seats left
        saveData("bus_seats", this.businessSeats.items);

        // save the list of economy class seats left
        saveData("econ_seats", this.economySeats.items);

        // save the list of first class seats left
        saveData("first_seats", this.firstClassSeats.items);

        // save the total capacity of passengers left
        saveData("capacity", this.capacity);
    }

    /** GENERATE 8 RANDOM DIGITS - 
     * This method is called when ever there is the need to generate ids
     * for newly created tickets and reservations
     * 
     * @returns a string of 8 characters
     */
    #generateCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 14; i++) {
            // for each loop select the a random character from the string of characters 
            // and add to the code that is to be returned
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters[randomIndex];
        }
        return code;
    }

    #getSeatDetail(seatType){
        switch (seatType) {
            case "Economy":
                return {seat: this.economySeats.dequeue(), price: this.economyPrice}
            case "Business":
                return {seat: this.businessSeats.dequeue(), price: this.businessPrice}
            case "FirstClass":
                return {seat: this.firstClassSeats.dequeue(), price: this.firstClassPrice}
            default:
                break;
        }

    }
}

export default ReservationSystem;