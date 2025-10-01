import React from "react";
import cancel from "../../assets/close.png";
import cardg from "../../assets/card.png";

const CardModal = ({onClose}) => {
  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-[#2D2E2ECC] flex justify-center">
      <div className="m-auto w-[555px] h-[358px]  bg-[#ffff] border my-[110px] rounded-3xl">
        <div className="justify-between w-[515px] h-[34px] flex m-[20px]">
          <h1 className="text-[20px] font-bold">Order Details</h1>
          <img onClick={onClose} src={cancel} alt="" className="w-[14px] h-[14px]" />
        </div>

        <p className="ml-[20px] text-[14px] font-medium">Card Number</p>

        <input
          type="No"
          placeholder="0000 0000 0000 0000"
          className="w-[515px] h-[48px] border border-[#C3C7CA] rounded-2xl ml-[20px] mt-[5px] p-[15px]"
        />

        <img
          src={cardg}
          alt=""
          className="w-[20px] h-[16px] ml-[500px] mt-[-32px] text-[#A6A9AC]"
        />

        <div className="flex mt-[35px] m-[20px] gap-[10px]">
          <div>
            {" "}
            <p>Expiry Date</p>{" "}
            <input
              type="text"
              placeholder="MM/YY"
              className="w-[252.5px] h-[48px] border border-[#C3C7CA] rounded-2xl p-[10px] mt-[10px]"
            />
          </div>
          <div className="ml-[2px]">
            <p>CVV</p>{" "}
            <input
              type="text"
              placeholder="123"
              className="w-[252.5px] h-[48px] border border-[#C3C7CA] rounded-2xl p-[10px] mt-[10px]"
            />
          </div>
        </div>

        <div className="m-[20px] flex gap-[10px]">
          <button className="text-[14px] font-bold w-[252.5px] h-[52px] border border-[#DCE0E4] p-auto rounded-2xl">
            Cancel
          </button>
          <button className="text-[18px] font-bold w-[252.5px] h-[52px] border bg-[#FF9A01] border-[#DCE0E4] p-auto rounded-2xl">
            Add Card
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
