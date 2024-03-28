class Reservation {
    constructor({reservationCode,lastname, totalReserved, othernames, email, number, cardType, cardNumber, cardName, expiryDate, cvv}) {
        this.reservationCode = reservationCode;
        this.lastname = lastname;
        this.othernames = othernames
        this.totalReserved = totalReserved;
        this.email = email;
        this.number = number;
        this.cardType = cardType;
        this.cardNumber = cardNumber;
        this.cardName = cardName;
        this.expiryDate = expiryDate;
        this.cvv = cvv;
        this.next = null;
    }
}

class ReservationList {
    constructor() {
        this.head = null;
    }

    /** POPULATE THE LINKED LIST - 
     * method to initialise the linked list on page load with data from the file or localstorage
     * 
     * @param reservations the list of reservationns fetched from localstorage
     */
    populate(reservations){
        for(let reservation of reservations) {
            this.push(reservation);
        }
    }

    /** REMOVE A RESERVATION NODE - 
     * method that removes a particular node from the linked list of
     * reservations if the provided reservationCode matches any node in the list
     * 
     * @param reservationCode the reservation code to remove
     */
    remove(reservationCode) {
        let current = this.head;
        let prev = null; // Keep track of the previous node
    
        while (current) {
            if (current.reservationCode === reservationCode) {
                if (current === this.head) {
                    this.head = current.next; // Move the head to the next ticket
                } else {
                    // Update the next reference of the previous node to skip the current node
                    prev.next = current.next;
                }
                return; // Exit the method after removing the node
            }
    
            prev = current; // Update the previous node reference
            current = current.next; // Move to the next node
        }
    }

    /** PUSH RESERVATION TO LIST - 
     * method that adds a new reservation to the linked list of reservations
     * 
     * @param reservation the reservation object to be added to the linked list
     */
    push(reservation){
        let newReservation = new Reservation(reservation);

        if (!this.head) {
            this.head = newReservation;
        } else {
            newReservation.next = this.head;
            this.head = newReservation;
        }
    }

    /** CHECK IF RESEERVATION EXISTS - 
     * method that checks if a reservation exists from the provided
     * reservationCode and lastname
     * 
     * @param rCode the rservation code
     * @param lastname the last name of the reserver
     */
    check(rCode, lastname) {
        let current = this.head;
        while (current) {
            if (current.lastname === lastname && current.reservationCode === rCode) {
                return current;
            }
            current = current.next;
        }
    }
    
    /** GET A PARTICULAR RSERVATION - 
     * returns a reservation based on the provided reservation code
     * 
     * @param reservationCode the reservation code
     */
    get(reservationCode) {
        let current = this.head;
        while (current) {
            if (current.reservationCode === reservationCode) {
                return current;
            }
            current = current.next;
        }
    }

    /** LOOP THROUGH LINKEDLIST - 
     * method that loops through each node in the linked list and runs a 
     * callback function
     * 
     * @param callback the function to be called on each iteration of the loop
     * @param isRender boolean value to check if the function wishes to render an html content based on the current reservation
     */
    iterate(callback, isRender = true) {
        let current = this.head;

        let htmlString = '';

        while (current !== null) {
            let result = callback(current);

            if(isRender) htmlString += result;
            current = current.next;
        }

        return htmlString;
    }
}

export {Reservation, ReservationList};