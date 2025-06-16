export const SUPPORTED_CARDS = {
    credit: {
        name: "Credit Card",
        icon: "CRC",
        types: [
            {
                name: "Visa",
                network: "Visa",
                color: "#1A1F71"
            },
            {
                name: "Mastercard",
                network: "Mastercard",
                color: "#EB001B"
            },
            {
                name: "American Express",
                network: "Amex",
                color: "#2E77BB"
            },
            {
                name: "Discover",
                network: "Discover",
                color: "#86B817"
            },
            {
                name: "Capital One",
                network: "Visa / Mastercard",
                color: "#004977"
            },
            {
                name: "Chase",
                network: "Visa / Mastercard",
                color: "#117ACA"
            }
        ]
    },
    debit: {
        name: "Debit Card",
        icon: "DBC",
        types: [
            {
                name: "Visa Debit",
                network: "Visa",
                color: "#1A1F71"
            },
            {
                name: "Mastercard Debit",
                network: "Mastercard",
                color: "#EB001B"
            },
            {
                name: "Interac",
                network: "Interac",
                color: "#FDB913"
            },
            {
                name: "TD Debit",
                network: "Interac / Visa Debit",
                color: "#008A3B"
            },
            {
                name: "RBC Debit",
                network: "Interac / Visa Debit",
                color: "#003DA5"
            },
            {
                name: "Scotiabank Debit",
                network: "Interac / Visa Debit",
                color: "#EC111A"
            }
        ]
    }
};
