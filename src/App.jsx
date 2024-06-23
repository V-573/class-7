import { useEffect, useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from 'uuid';
import Timer from "./Timer";


function App() {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(true);
  const [transactions, setTransactions] = useState([
  
  ]);

    // { id: 1, amount: 20, date: new Date(), type: "withdraw" },
    // { id: 2, amount: 154, date: new Date(), type: "withdraw" },
    // { id: 3, amount: 250, date: new Date(), type: "deposit" },
    // { id: 4, amount: 2000, date: new Date(), type: "withdraw" },
    // { id: 5, amount: 650, date: new Date(), type: "deposit" },

   const [showTimer, setShowTimer] = useState(true); // ESTADO PARA MANEJAR EL TIMER

  const STORAGE_DATA = " DATA_TRANSACTION";
  

  // Leer las transacciones del localStorage cuando se carga el componente
  useEffect(() => {
    const storedTransactions = localStorage.getItem(STORAGE_DATA);
    if (storedTransactions) {
      const parsedTransactions = JSON.parse(storedTransactions).map(transaction => ({
        ...transaction,
        date: new Date(transaction.date)
      }));
      setTransactions(parsedTransactions);
    }
  }, []);




  const handleDeleteTransaction = (transaction) => {

    setTransactions ((p) =>{
    const updatedTransactions = p.filter((t) => t.id != transaction.id);
    localStorage.setItem(STORAGE_DATA, JSON.stringify(updatedTransactions));
      return updatedTransactions;
  });

  };

  const handleTransaction = (e) => {
    e.preventDefault();
    const { amount, type } = e.target.elements;
       
    const newTransaction = {
      id: uuidv4(),
      type: type.value,
      amount: amount.value,
      date: new Date(),
    };
    setTransactions(p => {
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
      <div
        style={{
          height: "300px",
          display: "flex",
          flexDirection: "left",
          justifyContent: "left",
          alignItems: "flex-start",
        }}
      >
        <h1> hello </h1>
        <button onClick={handleCount}>add one: {count}</button>
        {show ? <h3>This is a message</h3> : <h3>no esta el message</h3>}
        <button onClick={handleShow}>show message</button>
      </div>

      <div>
        <h2>EJEMPLO 2 CON TRANSACTIONS {showTimer &&  <Timer/> }</h2>
        <button onClick={toggleTimer}>{showTimer ? 'HIDE TIME' : 'SHOW TIMER'}</button>

        <form
        style={{border:"1px solid black", padding:"22px", display:"flex", flexDirection:"column", gap:"15",marginBottom:"30px",}}
         onSubmit={ handleTransaction }
        
        >

         

          <h4 style={{margin:0}}>Create a new transaction</h4>
          <input type="text" placeholder="type the amount" name="amount"/>
          <select name="type">
            <option disabled>Select the type</option>
            <option value="deposit">Deposit</option>
            <option value="withdraw">Withdraw</option>
          </select>
          <button type="submit">Create</button>
        </form>
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
                 <td><button onClick={() => handleDeleteTransaction(transaction)} >DELETE</button></td>
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
