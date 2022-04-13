import spencerAvatar from "../../../../assets/images/spencer.svg";
import allynAvatar from "../../../../assets/images/allyn.svg";
import rfHairstudio from "../../../../assets/images/rf-hairstudio.svg";
import productRecommendation from "../../../../assets/images/product-recommendation.png";

export const stylistTypes = [
  {
    id: 1,
    name: "All stylists",
  },
  {
    id: 2,
    name: "Walk-in only",
  },
  {
    id: 3,
    name: "Curly sister stylist",
  },
  {
    id: 4,
    name: "Master stylist",
  },
];

export const users = [
  {
    id: 1,
    selected: false,
    avatar: `${productRecommendation}`,
    name: "All Naturals",
    email: "bookings@allnaturals.com",
    type: "Curly sister stylist",
    location: "333, Fremont Street, SF, CA, 94105, USA",
    status: "active",
  },
  {
    id: 2,
    selected: false,
    avatar: `${spencerAvatar}`,
    name: "Spencer Wright",
    email: "swhair@hey.com",
    type: "Walk-in only",
    location: "2, Hebert Macaulay Way, Yaba, Lagos, 100...",
    status: "inactive",
  },
  {
    id: 3,
    selected: false,
    avatar: `${rfHairstudio}`,
    name: "RF hair studio",
    email: "rfhair@gmail.com",
    type: "Walk-in only",
    location: "546, Mandela Avenue, SF, CA, 92401, USA",
    status: "active",
  },
  {
    id: 4,
    selected: false,
    avatar: `${allynAvatar}`,
    name: "Allyn Antoine",
    email: "ally.antoine@aabeauty.com",
    type: "Master stylist",
    location: "129 Mission Street, SF, CA, 95338, USA",
    status: "inactive",
  },
  {
    id: 5,
    selected: false,
    avatar: `${productRecommendation}`,
    name: "Spencer Wright",
    email: "bookings@allnaturals.com",
    type: "Curly sister stylist",
    location: "333, Fremont Street, SF, CA, 94105, USA",
    status: "active",
  },
];

export const channels = [
  {
    id: 1,
    name: "Website",
  },
  {
    id: 2,
    name: "Instagram",
  },
  {
    id: 3,
    name: "Twitter",
  },
];

export const stylistStatus = [
  {
    id: 1,
    name: "Active",
  },
  {
    id: 2,
    name: "Inactive",
  },
];
