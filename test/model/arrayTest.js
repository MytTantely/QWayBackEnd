const anArray = [
    {
        token: {
            value: 12,
            price: 120
        }
    },
    {
        token: {
            value: 23,
            price: 230
        }
    },
    {
        token: {
            value: 34,
            price: 340
        }
    },
    {
        token: {
            value: 45,
            price: 450
        }
    },
    {
        token: {
            value: 56,
            price: 560
        }
    }
]


let newArray = anArray.map(val => val.token );
console.log(newArray);
