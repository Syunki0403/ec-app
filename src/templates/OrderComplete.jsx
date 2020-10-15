import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from "@material-ui/styles";
import { getOrdersHistory } from '../reducks/users/selectors';
import { fetchOrdersHistory } from '../reducks/users/operations';
import { OrderHistoryItem } from '../components/Products/index';
import { GreyButtom } from '../components/UIkit/index';
import { push } from "connected-react-router";

const useStyles = makeStyles((theme) => ({
    orderList: {
        background: theme.palette.grey["100"],
        margin: '0 auto',
        padding: 32,
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        },
        [theme.breakpoints.up('sm')]: {
            width: 768
        }
    }
}));

const OrderComplete = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const orders = getOrdersHistory(selector);

    console.log(orders[0]);

    useEffect(() => {
        dispatch(fetchOrdersHistory());
    }, []);

    const backToHome = useCallback(() => {
        dispatch(push('/'));
    }, []);

    return (
        <section>
            <div className="p-grid__column">
                <h2 style={{ "font-size": "32px" }}>ご注文ありがとうございました</h2>
            </div>
            <div className="module-spacer--medium"></div>
            {orders.length > 0 && (
                <div className={classes.orderList} >
                    <OrderHistoryItem order={orders[0]} />
                </div>
            )}
            <div className="module-spacer--medium"></div>
            <div className="p-grid__column">
                <GreyButtom label={"ショッピングを続ける"} onClick={backToHome} />
            </div>
        </section>
    );
}

export default OrderComplete;