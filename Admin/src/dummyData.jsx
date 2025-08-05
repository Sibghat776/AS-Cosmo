export const fetchUsers = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    username: "John Doe",
                    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
                    email: "john@example.com",
                    status: "active",
                    transaction: "$120.00",
                    fullName: "Johnathan Doe",
                    birthDate: "10.12.1990",
                    phone: "+1 234 567 890",
                    address: "New York | USA"
                },
                {
                    id: 2,
                    username: "Jane Smith",
                    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
                    email: "jane@example.com",
                    status: "inactive",
                    transaction: "$80.00",
                    fullName: "Jane Smith",
                    birthDate: "15.04.1992",
                    phone: "+1 987 654 321",
                    address: "Los Angeles | USA"
                }
            ]);
        }, 500);
    });
};
export const productRows = [
    {
        id: 1,
        name: "Apple Airpods",
        img: "https://images.pexels.com/photos/7156881/pexels-photo-7156881.jpeg",
        stock: 123,
        status: "active",
        price: "$120.00",
    },
    {
        id: 2,
        name: "Samsung TV",
        img: "https://images.pexels.com/photos/13024676/pexels-photo-13024676.jpeg",
        stock: 89,
        status: "active",
        price: "$499.00",
    },
];