import React from 'react';
// SCSS file ko sahi tarah se import kiya gaya hai
import styles from './OrderPage.module.scss';
import useFetch, { baseUrl } from '../../utils/useFetch';

const OrderPage = () => {
    async function getOrders() {
        try {
            const res = await useFetch(`${baseUrl}/api/v1/orders`);
            console.log(res)
        } catch (error) {
            console.log("Error fetching orders:", error);
        }
    }
    return (
        <div className={styles.orderContainer}>
            <h2 className={styles.title}>Your Orders</h2>
            {orders.length === 0 ? (
                <p className={styles.noOrders}>You haven't placed any orders yet.</p>
            ) : (
                <div className={styles.orderList}>
                    {orders.map(order => (
                        <div key={order.id} className={styles.orderCard}>
                            <div className={styles.orderHeader}>
                                <div className={styles.headerInfo}>
                                    <span className={styles.label}>Order ID:</span>
                                    <span className={styles.value}>{order.id}</span>
                                </div>
                                <div className={styles.headerInfo}>
                                    <span className={styles.label}>Order Date:</span>
                                    <span className={styles.value}>{order.date}</span>
                                </div>
                                <div className={styles.headerInfo}>
                                    <span className={styles.label}>Status:</span>
                                    <span className={`${styles.status} ${styles[order.status.toLowerCase()]}`}>{order.status}</span>
                                </div>
                            </div>
                            <ul className={styles.orderItems}>
                                {order.items.map(item => (
                                    <li key={item.id} className={styles.item}>
                                        <span className={styles.itemName}>{item.name}</span>
                                        <span className={styles.itemDetails}>
                                            ${item.price.toFixed(2)} x {item.quantity}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <div className={styles.orderFooter}>
                                <span className={styles.totalLabel}>Total:</span>
                                <span className={styles.totalValue}>${order.total.toFixed(2)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderPage;