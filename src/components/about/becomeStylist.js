import React from "react";
import becomeStylistImg from "../../assets/images/become-stylist.png";
import becomeProImg from "../../assets/images/become-pro.png";

function BecomeStylistSection() {
  return (
    <>
      {/* own stylist */}
      <div className="bg-white p-10 flex justify-between items-center">
        <img className="mr-16" src={becomeStylistImg} alt="stylist-img" />

        <div>
          <div className="flex items-center">
            <p className="mr-5 uppercase text-gray-200">for everyone</p>
            <hr className="border border-orange-100 w-4/6" />
          </div>
          <h2 className="text-4xl text-gray-400 font-bold my-8">
            Become your own stylist
          </h2>
          <p className="w-9/12 text-gray-200">
            Are you struggling to find the right routine? Have products not been
            able to moisturize your hair? Do you think your natural hair is
            unmanageable? Are you struggling to maintain your child’s hair? We
            will build a <strong> curated plan</strong> for you to maintain your
            own hair. Instead of watching a lifetime of YouTube videos, let us
            build an experience for you.
          </p>
        </div>
      </div>

      {/* pro stylist */}
      <div className="bg-gray-50 p-10 flex justify-between items-center">
        <div>
          <div className="flex items-center">
            <p className="mr-5 uppercase text-gray-200">FOR STYLISTS</p>
            <hr className="border border-orange-100 w-3/4" />
          </div>
          <h2 className="text-4xl text-gray-400 font-bold my-8">
            Become a pro stylist
          </h2>
          <p className=" w-9/12 text-gray-200">
            Can you detangle all types of textured hair? Can you cut hair so
            that the clients curls shine? Are you able to teach customers how to
            maintain their hair in and out of the salon? Let us help you to
            learn to maintain all types of textured hair. Fun Fact:{" "}
            <strong>
              {" "}
              If you gain the trust of a wavy or curly client, they are your
              client for life!
            </strong>
          </p>
        </div>
        <img src={becomeProImg} alt="founder-img" />
      </div>
    </>
  );
}

export default BecomeStylistSection;
