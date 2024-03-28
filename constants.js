export const airlines = [
    {
      airline: "Ghana Airways",
      model: "Boeing 727",
      capacity: 137,
      economySeats: {
        total: 87,
        columns: ["A", "B", "D", "E", "F", "J", "K"],
        rows: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
      },
      businessSeats: {
        total: 30,
        columns: ["A", "B", "D", "E", "J", "K"],
        rows: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
      },
      firstClassSeats: {
        total: 20,
        columns: ["A", "D", "E", "K"],
        rows: [24, 25, 26, 27, 28]
      }
    }
]

export const departureLocations = [
  { location: 'Accra, Ghana', airport: 'Kotoka International Airport', IATA: 'GHA-ACC'},
  { location: 'Kumasi, Ghana', airport: 'Kumasi Airport', IATA: 'GHA-KMS'},
]

export const destinationLocations = [
  { location: 'Tamale, Ghana', airport: 'Tamale International Airport', IATA: 'GHA-TML'},
  { location: 'Takoradi, Ghana', airport: 'Takoradi Airport', IATA: 'GHA-TKD'},
  { location: 'Abidjan, Côte d\'Ivoire', airport: 'Félix-Houphouët-Boigny International Airport', IATA: 'CIV-ABJ'},
  { location: 'Diapaga, Burkina Faso', airport: 'Diapaga Airport', IATA: 'BFA-DIP'},
  { location: 'Lomé, Togo', airport: 'Lomé-Tokoin Airport', IATA: 'TOG-LFW'},
]

export const availableDeparturtimes = [
  {time: "4:30", name: "Dawn"},
  {time: "13:20", name: "Day"},
  {time: "17:45", name: "Dusk"}
]