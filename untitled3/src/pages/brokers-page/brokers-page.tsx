import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import {useDispatch, useSelector} from "react-redux";
import {Broker} from "../../interfaces/broker.interface";
import {addBroker, deleteBroker, setBrokers, updateBroker} from "../../redux/actions";
import {getBrokersFetch, updateBrokerFetch, addBrokerFetch, deleteBrokerFetch} from "./brokers-api";


const BrokersPage: React.FC = () => {
    const dispatch = useDispatch();
    const brokers = useSelector((state: {brokers: Broker[]}) => state.brokers);

    const [selectedBroker, setSelectedBroker] = useState<Broker | null>(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [newBrokerName, setNewBrokerName] = useState('');
    const [newBrokerMoney, setNewBrokerMoney] = useState('');


    useEffect( () => {
       getBrokersFetch()
           .then((brokers) => {
               dispatch(setBrokers(brokers));
           })
           .catch((error) => {
               console.error('Error set brokers:', error.message);
           })

    }, [dispatch]);

    const handleAddClick = () => {
        setAddModalOpen(true);
    }

    const handleAddModalClose = () => {
        setAddModalOpen(false);
        setNewBrokerName('');
        setNewBrokerMoney('');
    }

    const handleEditClick = (broker: Broker) => {
        setSelectedBroker(broker);
        setNewBrokerName(broker.username);
        setNewBrokerMoney(broker.cash);
        setEditModalOpen(true);
    }

    const handleEditModalClose = () => {
        setEditModalOpen(false);
    }

    const handleEditModalSave = async () => {

        if (newBrokerName === '' || newBrokerMoney === '') {
            return;
        }

        if (selectedBroker) {
            const updatedBroker: Broker = {
                userId: selectedBroker.userId,
                username: newBrokerName,
                cash: newBrokerMoney
            }
            updateBrokerFetch(updatedBroker).then(() => {
                dispatch(updateBroker(updatedBroker));
            })
            .catch((error) => {
                console.error('Error update broker:', error.message);
            })

            setEditModalOpen(false);
            setNewBrokerName('');
            setNewBrokerMoney('');
        }
    }

    const handleDeleteClick = async (broker: Broker) => {
        deleteBrokerFetch(broker.userId)
            .then(() => {
                dispatch(deleteBroker(broker.userId));
            })
            .catch((error) => {
                console.error('Error deleting brokers:', error.message);
            })
    }

    const handleAddModalSave = async () => {

        if (newBrokerName === '' || newBrokerMoney === '') {
            return;
        }

        const newBroker: Broker = {
            userId: "0",
            username: newBrokerName,
            cash: newBrokerMoney
        }

        addBrokerFetch(newBroker)
            .then((broker) => {
                dispatch(addBroker(broker));
            })
            .catch((error) => {
                console.error('Error adding brokers:', error.message);
            })

        setAddModalOpen(false);
        setNewBrokerName('');
        setNewBrokerMoney('');
    }

    return (
        <div style={{ margin: "20px" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>Брокеры</h2>
            <button
                style={{
                    padding: "10px",
                    marginBottom: "10px",
                    backgroundColor: "#3498db",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px",
                }}
                onClick={handleAddClick}
            >
                Добавить
            </button>
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "10px",
                }}
            >
                <thead>
                <tr>
                    <th
                        style={{
                            backgroundColor: "#f2f2f2",
                            padding: "10px",
                            textAlign: "left",
                        }}
                    >
                        ID
                    </th>
                    <th
                        style={{
                            backgroundColor: "#f2f2f2",
                            padding: "10px",
                            textAlign: "left",
                        }}
                    >
                        Имя
                    </th>
                    <th
                        style={{
                            backgroundColor: "#f2f2f2",
                            padding: "10px",
                            textAlign: "left",
                        }}
                    >
                        Количество денег
                    </th>
                    <th
                        style={{
                            backgroundColor: "#f2f2f2",
                            padding: "10px",
                            textAlign: "left",
                        }}
                    >
                        Действия
                    </th>
                </tr>
                </thead>
                <tbody>
                {brokers.map((broker) => (
                    <tr key={broker.userId}>
                        <td style={{ padding: "10px" }}>{broker.userId}</td>
                        <td style={{ padding: "10px" }}>{broker.username}</td>
                        <td style={{ padding: "10px" }}>{broker.cash}</td>
                        <td style={{ padding: "10px" }}>
                            <button
                                style={{
                                    backgroundColor: "#27ae60",
                                    color: "#fff",
                                    padding: "5px 10px",
                                    marginRight: "5px",
                                    border: "none",
                                    borderRadius: "3px",
                                    cursor: "pointer",
                                    fontSize: "14px",
                                }}
                                onClick={() => handleEditClick(broker)}
                            >
                                Изменить
                            </button>
                            <button
                                style={{
                                    backgroundColor: "#e74c3c",
                                    color: "#fff",
                                    padding: "5px 10px",
                                    border: "none",
                                    borderRadius: "3px",
                                    cursor: "pointer",
                                    fontSize: "14px",
                                }}
                                onClick={() => handleDeleteClick(broker)}
                            >
                                Удалить
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <Modal isOpen={isAddModalOpen} onRequestClose={handleAddModalClose} style={modalStyle}>
                <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>Добавить брокера</h2>
                <div style={{ marginBottom: "10px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>Имя:</label>
                    <input
                        type="text"
                        value={newBrokerName}
                        style={{ width: "100%", borderColor: newBrokerName.length === 0 ? "blueviolet" : "black" }}
                        onChange={(e) => setNewBrokerName(e.target.value)}
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>Количество денег:</label>
                    <input
                        type="text"
                        value={newBrokerMoney}
                        style={{ width: "100%", borderColor: newBrokerMoney.length === 0 ? "blueviolet" : "black" }}
                        onChange={(e) => setNewBrokerMoney(e.target.value)}
                    />
                </div>

                <div>
                    <button
                        style={{
                            backgroundColor: "#3498db",
                            color: "#fff",
                            padding: "5px 10px",
                            marginRight: "5px",
                            border: "none",
                            borderRadius: "3px",
                            cursor: "pointer",
                            fontSize: "14px",
                        }}
                        onClick={handleAddModalSave}
                    >
                        Добавить
                    </button>
                    <button
                        style={{
                            backgroundColor: "#e74c3c",
                            color: "#fff",
                            padding: "5px 10px",
                            border: "none",
                            borderRadius: "3px",
                            cursor: "pointer",
                            fontSize: "14px",
                        }}
                        onClick={handleAddModalClose}
                    >
                        Отменить
                    </button>
                </div>
            </Modal>

            <Modal isOpen={isEditModalOpen} onRequestClose={handleEditModalClose} style={modalStyle}>
                <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>Изменить данные брокера</h2>
                <div style={{ marginBottom: "10px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>Имя:</label>
                    <input
                        type="text"
                        value={newBrokerName}
                        style={{ width: "100%", borderColor: newBrokerName.length === 0 ? "blueviolet" : "black" }}
                        onChange={(e) => setNewBrokerName(e.target.value)}
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>Количество денег:</label>
                    <input
                        type="text"
                        value={newBrokerMoney}
                        style={{ width: "100%", borderColor: newBrokerMoney.length === 0 ? "blueviolet" : "black" }}
                        onChange={(e) => setNewBrokerMoney(e.target.value)}
                    />
                </div>

                <div>
                    <button
                        style={{
                            backgroundColor: "#27ae60",
                            color: "#fff",
                            padding: "5px 10px",
                            marginRight: "5px",
                            border: "none",
                            borderRadius: "3px",
                            cursor: "pointer",
                            fontSize: "14px",
                        }}
                        onClick={handleEditModalSave}
                    >
                        Изменить
                    </button>
                    <button
                        style={{
                            backgroundColor: "#e74c3c",
                            color: "#fff",
                            padding: "5px 10px",
                            border: "none",
                            borderRadius: "3px",
                            cursor: "pointer",
                            fontSize: "14px",
                        }}
                        onClick={handleEditModalClose}
                    >
                        Отменить
                    </button>
                </div>
            </Modal>
        </div>
    );
};

const modalStyle = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

export default BrokersPage;