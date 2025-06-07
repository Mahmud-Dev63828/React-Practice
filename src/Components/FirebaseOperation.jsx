import React, { useEffect, useState } from "react";
import {
  ref,
  set,
  get,
  update,
  remove,
  push,
  child,
  Database,
  onValue,
} from "firebase/database";
import { auth, db } from "../../Database/Firebase.config";

const FirebaseOperation = () => {
  const [input, setInput] = useState("");
  const [inputValue, setInputValue] = useState({});
  const [item, setItem] = useState("");

  const handleAdd = () => {
    if (input.trim()) {
      setItem(input);
      setInput("");
      const createData = async () => {
        try {
          await push(ref(db, "input"), {
            value: input,
            age: 30,
          });
        } catch (error) {
          console.log("data save hoite error hoice", error);
        }
      };
      createData();
    }
  };

  // data fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await get(ref(db, "input"));
        if (snapshot.exists()) {
          const inputBlankArr = [];
          snapshot.forEach((item) => {
            inputBlankArr.push({ ...item.val(), input: item.key });
          });
          setInputValue(inputBlankArr);
          // console.log(snapshot.val());
        }
      } catch (error) {
        console.log("data fetch hote problem --->", error);
      }
    };
    fetchData();
  }, []);
  // !wrong way
  // useEffect(() => {
  //   const fetchSingleMsg = async () => {
  //     try {
  //       const singleMsgRef = ref(db, "input");
  //       onValue(singleMsgRef, (snapshot) => {
  //         let msgBlankArr = [];
  //         snapshot.forEach((msg) => {
  //           msgBlankArr.push({ ...msg.val(), msgKey: msg.key });
  //         });
  //         setInputValue(msgBlankArr);
  //       });
  //     } catch (error) {
  //       console.error("error from fetch data", error);
  //     }
  //   };
  //   fetchSingleMsg();
  // }, []);
  // ! right way for onvalue
  useEffect(() => {
    const singleMsgRef = ref(db, "input");

    const unsubscribe = onValue(singleMsgRef, (snapshot) => {
      try {
        let msgBlankArr = [];
        snapshot.forEach((msg) => {
          msgBlankArr.push({ ...msg.val(), msgKey: msg.key });
        });
        setInputValue(msgBlankArr);
      } catch (error) {
        console.error("❌ onValue error:", error);
      }
    });

    // 🔁 Cleanup listener when component unmounts
    return () => unsubscribe();
  }, []);

  const handleDelete = () => {
    setItem("");
  };
  console.log(inputValue);
  const handleUpdate = () => {
    if (input.trim()) {
      setItem(input);
      setInput("");
    }
  };
  useEffect(() => {
    const createData = async () => {
      try {
        await set(ref(db, "user"), {
          name: "mahmud",
          age: 20,
        });
      } catch (error) {
        console.log("data save hoite error hoice", error);
      }
    };
    createData();
  }, []);

  useEffect(() => {
    const createData = async () => {
      try {
        await push(ref(db, "user"), {
          name: "hasan",
          age: 30,
        });
      } catch (error) {
        console.log("data save hoite error hoice", error);
      }
    };
    createData();
  }, []);

  const handleadd = () => {
    createData();
  };
  return (
    <div>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg space-y-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter something..."
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex justify-between gap-2">
          <button
            onClick={handleAdd}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg"
          >
            Add
          </button>
          <button
            onClick={handleUpdate}
            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg"
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default FirebaseOperation;
