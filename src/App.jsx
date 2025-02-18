import { useRef, useState } from "react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import "./App.css";
import Swal from "sweetalert2";
export default function App() {
  const [phoneName, setNameInput] = useState("");
  const [phonePrice, setPriceInput] = useState(0);
  const [phoneQts, setQtsInput] = useState(0);

  const [phoneIndex, setPhoneIndex] = useState("");
  const [ModelIndex, setModelIndex] = useState(false);
  const [editModalIndex, setEditModalIndex] = useState(false);

  const NameInput = useRef();
  const PriceInput = useRef();
  const QtsInput = useRef();

  const [phones, setPhones] = useState([
    { name: "iphon x", price: 300, qts: 5 },
    { name: "iphon 10", price: 400, qts: 6 },
    { name: "iphon 12", price: 500, qts: 7 },
  ]);
  const TotalAmount = phones.reduce(
    (acc, phones) => acc + phones.price * phones.qts,
    0
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPhone = {
      name: NameInput.current.value,
      price: +PriceInput.current.value,
      qts: +QtsInput.current.value,
    };
    let copyPhones = [...phones];
    copyPhones.push(newPhone);
    Swal.fire({
      icon: "success",
      title: "Phone Added",
      timer: 1200,
    }).then(() => {
      setModelIndex(false);
    });
    setPhones(copyPhones);
  };
  const removeItem = (phoneIndex) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      showDenyButton: true,
      showConfirmButton: true,
      denyButtonText: "No , Don't Delete",
      denyButtonColor: "green",
      confirmButtonText: "Yes , Delete it",
      confirmButtonColor: "red",
    }).then((result) => {
      if (result.isConfirmed) {
        setPhones(phones.filter((el, index) => index !== phoneIndex));
        Swal.fire({
          icon: "success",
          title: "Phone Removed",
          showConfirmButton: false,
          timer: 1200,
        });
      }
    });
  };

  const openPhoneToEdit = (phoneIndex) => {
    setPhoneIndex(phoneIndex);
    let phone = phones[phoneIndex];
    setNameInput(phone.name);
    setPriceInput(phone.price);
    setQtsInput(phone.qts);
    setEditModalIndex(true);
  };

  const handleSave = (event) => {
    event.preventDefault();
    let obj = {
      name: phoneName,
      price: +phonePrice,
      qts: +phoneQts,
    };
    let copyPhones = [...phones];
    copyPhones[phoneIndex] = obj;
    setPhones(copyPhones);
    console.log(copyPhones);
    Swal.fire({
      icon: "success",
      title: "Phone Updated",
      showConfirmButton: false,
      timer: 1200,
    }).then(() => {
      setEditModalIndex(false);
    });
  };

  return (
    <div className="App col-12 container d-flex flex-column align-items-center">
      <h1 className="display-4">Fatora System</h1>
      <button
        onClick={() => setModelIndex(true)}
        className="btn btn-success mb-2"
      >
        show Model
      </button>
      <table className="table table-dark table-bordered table-hover  text-center text-capitalize">
        <thead className="table-active">
          <tr>
            <th>-</th>
            <th>Phones names</th>
            <th>Phones Price</th>
            <th>Phones qts</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {phones.map((el, index) => {
            return (
              <tr key={index}>
                <th>{index + 1}</th>
                <th>{el.name}</th>
                <th>{el.price}</th>
                <th>{el.qts}</th>
                <th>
                  <div className="d-flex align-items-center justify-content-center gap-3">
                    <button
                      onClick={() => removeItem(index)}
                      className="btn btn-danger"
                    >
                      <FaRegTrashAlt />
                    </button>
                    <button
                      className="btn btn-warning text-center text-light"
                      onClick={() => {
                        openPhoneToEdit(index);
                      }}
                    >
                      <FaEdit />
                    </button>
                  </div>
                </th>
              </tr>
            );
          })}
          <tr>
            <td colSpan={6} className="table-active lead">
              total :{TotalAmount}
            </td>
          </tr>
        </tbody>
      </table>

      {ModelIndex == true ? (
        <div
          className="our__modal d-flex justify-content-center align-items-center"
          onClick={() => setModelIndex(false)}
        >
          <form
            className=" model__content col-12 col-md-5 bg-light rounded shadow border p-3 d-flex flex-column gap-2 animate__animated animate__fadeInDown"
            onClick={(event) => event.stopPropagation()}
            onSubmit={handleSubmit}
          >
            <input
              className="form-control "
              type="text"
              placeholder="enter new phone"
              ref={NameInput}
            />
            <input
              className="form-control "
              type="number"
              placeholder="enter new price"
              ref={PriceInput}
            />
            <input
              className="form-control "
              type="number"
              placeholder="enter new qts"
              ref={QtsInput}
            />
            <button className="btn btn-primary"> Add New Phones</button>
          </form>
        </div>
      ) : null}

      {editModalIndex == true ? (
        <div
          className="our__modal d-flex justify-content-center align-items-center"
          onClick={() => setEditModalIndex(false)}
        >
          <form
            className=" model__content col-12 col-md-5 bg-light rounded shadow border p-3 d-flex flex-column gap-2 animate__animated animate__fadeInDown"
            onClick={(event) => event.stopPropagation()}
            onSubmit={handleSave}
          >
            <input
              className="form-control "
              type="text"
              placeholder="enter new phone"
              defaultValue={phoneName}
              onChange={(event) => {
                setNameInput(event.target.value);
              }}
              // id="phoneName"
            />
            <input
              className="form-control "
              type="number"
              placeholder="enter new price"
              defaultValue={phonePrice}
              onChange={(event) => {
                setPriceInput(event.target.value);
              }}
            />
            <input
              className="form-control "
              type="number"
              placeholder="enter new qts"
              defaultValue={phoneQts}
              onChange={(event) => {
                setQtsInput(event.target.value);
              }}
            />
            <button className="btn btn-primary">save Edit</button>
          </form>
        </div>
      ) : null}
    </div>
  );
  s;
}
