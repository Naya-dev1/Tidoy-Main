import React from "react";
import success from "../../assets/success.png";

const SuccessModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-[#2D2E2ECC] flex justify-center">
      <div className="bg-white rounded-3xl w-[611px] h-[449.39px]  border border-[#EDF1F5] m-auto my-17">
        <div className="mx-auto mt-[20px]">
          <img src={success} alt="" className="mx-[250px]" />
          <h1 className="mx-[200px] ml-[200px] text-[20px] font-bold ">
            Payment Successful
          </h1>
        </div>

        <div className="mt-[58px]">
          <div className="mb-[4px] flex gap-[350px] mx-[20px] font-bold text-[12px]">
            <p className="font-bold text-[12px] ">
              Villa Family Resort Dago Pakar
            </p>
            <p>Room</p>
          </div>
          <div className="mb-[25px] flex gap-[350px] mx-[20px] text-[12px] text-[#747677] font-normal">
            <p>Dago Pakar, Bandung</p>
            <p>4 room, 2 Guests</p>
          </div>
        </div>

        <div>
          <div className="mb-[4px] flex gap-[400px] mx-[20px] font-bold text-[12px]">
            <p>31 Mar - 1 Apr 2024</p>
            <p>John Doe</p>
          </div>
          <div className="flex gap-[400px] mx-[20px] text-[12px] text-[#747677] font-normal">
            <p>1 Guests</p>
            <p>johndoe@gmail.com</p>
          </div>
        </div>

        <div className="flex mx-[20px] gap-2 mb-[30px]">
          <button
            onClick={onClose}
            className="text-[14px] font-bold w-[200px] h-[52px] border bg-[#FFFF] border-[#DCE0E4] text-[#2D2E2E] p-auto rounded-2xl mt-[60px] "
          >
            Close
          </button>
          <button className="text-[18px] font-bold w-[367px] h-[52px] border bg-[#FF9A01] border-[#DCE0E4] text-[#2D2E2E] p-auto rounded-2xl mt-[60px] ">
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
