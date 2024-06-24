import { useEffect, useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import Timer from "./Timer";
import { ContainerPpal, InputPpal } from "./assets/StylePpal";

function App() {
  const [withdraw, setWithdraw] = useState(0)
  const [deposit, setDeposit] = useState(0)
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [showTimer, setShowTimer] = useState(true); // ESTADO PARA MANEJAR EL TIMER
  const STORAGE_DATA = " DATA_TRANSACTION";
  const STORAGE_DEPOSIT = "STORAGED_DEPOSIT";
  const STORAGE_WITHDRAW = "STORAGED_WITHDRAW";

  // Leer las transacciones del localStorage cuando se carga el componente
  useEffect(() => {
    const storedTransactions = localStorage.getItem(STORAGE_DATA);
    if (storedTransactions) {
      const parsedTransactions = JSON.parse(storedTransactions).map(
        (transaction) => ({
          ...transaction,
          date: new Date(transaction.date),
        })
      );

      setTransactions(parsedTransactions);
    }

      const storedDeposit = localStorage.getItem(STORAGE_DEPOSIT);
      const storedWithdraw = localStorage.getItem(STORAGE_WITHDRAW);

      if (storedDeposit) {
        setDeposit(JSON.parse(storedDeposit))
      }
      if (storedWithdraw) {
  setWithdraw(JSON.parse(storedWithdraw))
}

  }, []);





  const handleDeleteTransaction = (transaction) => {
    setTransactions((p) => {
      const updatedTransactions = p.filter((t) => t.id != transaction.id);
      localStorage.setItem(STORAGE_DATA, JSON.stringify(updatedTransactions));
      return updatedTransactions;
    });
  };

  const handleTransaction = (e) => {
    e.preventDefault();
    const { amount, type } = e.target.elements;



    if (type.value === "withdraw") {
      setWithdraw((w) => {
        const updatedWithdraw = w + 1;
        
        localStorage.setItem(STORAGE_WITHDRAW, JSON.stringify(updatedWithdraw));
        return updatedWithdraw;
      });
    } else 
    {
      setDeposit((d) => {
        const updatedDeposit = d + 1;
        localStorage.setItem(STORAGE_DEPOSIT, JSON.stringify(updatedDeposit))
        return updatedDeposit;
      });
     

      }

    const newTransaction = {
      id: uuidv4(),
      type: type.value,
      amount: amount.value,
      date: new Date(),
    };
    setTransactions((p) => {
      const updatedTransactions = [...p, newTransaction];

      localStorage.setItem(STORAGE_DATA, JSON.stringify(updatedTransactions));
      return updatedTransactions;
    });

    
    



  };

  const handleCount = () => {
    setCount((s) => s + 1);
  };

  const handleShow = () => {
    setShow((s) => !s);
  };

  //MANEJADOR DELEVENTO PARA MSTRAR EL TIMER
  const toggleTimer = () => {
    setShowTimer((t) => !t);
  };

  return (
    <>
      <ContainerPpal>
        <h1> hello </h1>
        <button onClick={handleCount}>add one: {count}</button>
        {show ? <h3>This is a message</h3> : <h3>no esta el message</h3>}
        <button onClick={handleShow}>show message</button>
      </ContainerPpal>

      <div>
        <h2>EJEMPLO 2 CON TRANSACTIONS {showTimer && <Timer />}</h2>
        <button onClick={toggleTimer}>
          {showTimer ? "HIDE TIME" : "SHOW TIMER"}
        </button>

        <div style={{display:"flex", flexDirection:"column"}}>
          <span>cantidad de transacciones con deposito: { deposit}</span>
          <span>cantidad de transacciones con retiro: { withdraw}</span>
        </div>

        <InputPpal onSubmit={handleTransaction}>
          <h4>Create a new transaction</h4>
          <input type="text" placeholder="type the amount" name="amount" />
          <select name="type">
            <option disabled>Select the type</option>
            <option value="deposit">Deposit</option>
            <option value="withdraw">Withdraw</option>
          </select>
          <button type="submit">Create</button>
        </InputPpal>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.type}</td>
                <td>{transaction.date.toUTCString()}</td>
                <td>{transaction.amount}</td>
                <td>
                  <button onClick={() => handleDeleteTransaction(transaction)}>
                    DELETE
                  </button>
                </td>
                {/*  usar la funcion flecha garantiza garantiza que la funcion que estoy llamando se ejecute cuando se haga click. Hay que tener encuenta que aca estoy en el renderizado de la app */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
