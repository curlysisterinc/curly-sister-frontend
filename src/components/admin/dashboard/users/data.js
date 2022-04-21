import spencerAvatar from "../../../../assets/images/spencer.svg";
import allynAvatar from "../../../../assets/images/allyn.svg";
import rfHairstudio from "../../../../assets/images/rf-hairstudio.svg";
import productRecommendation from "../../../../assets/images/product-recommendation.png";
import flag from "../../../../assets/images/flag.svg";

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
    toggled: true,
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
    toggled: false,
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
    toggled: false,
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
    toggled: false,
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
    toggled: false,
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

export const phoneNumberCountries = [
  {
    id: 1,
    country: "Canada",
    flag: `${flag}`,
    dialingCode: "+1",
    isoAlpha2Code: "CA",
  },
  {
    id: 2,
    country: "United states",
    flag: `${flag}`,
    dialingCode: "+1",
    isoAlpha2Code: "US",
  },
  {
    id: 3,
    country: "Bahamas",
    flag: `${flag}`,
    dialingCode: "+1242",
    isoAlpha2Code: "BS",
  },
  {
    id: 4,
    country: "Anguila",
    flag: `${flag}`,
    dialingCode: "+1246",
    isoAlpha2Code: "AI",
  },
  {
    id: 5,
    country: "Bermuda",
    flag: `${flag}`,
    dialingCode: "+1441",
    isoAlpha2Code: "BM",
  },
  {
    id: 6,
    country: "Egypt",
    flag: `${flag}`,
    dialingCode: "+20",
    isoAlpha2Code: "EG",
  },
];

export const getService = [
  {
    id: 1,
    name: "Service1",
    price: "35",
    time: "30",
    mins: "mins",
    rate: "usd",
  },
  {
    id: 2,
    name: "Service2",
    price: "45",
    time: "60",
    mins: "mins",
    rate: "usd",
  },
  {
    id: 3,
    name: "Service3",
    price: "25",
    time: "30",
    mins: "mins",
    rate: "usd",
  },
];

export const weekList = [
  { id: 1, day: "Mon", selected: true },
  { id: 2, day: "Tue", selected: false },
  { id: 3, day: "Wed", selected: false },
  { id: 4, day: "Thu", selected: false },
  { id: 5, day: "Fri", selected: false },
  { id: 6, day: "Sat", selected: false },
  { id: 7, day: "Sun", selected: false },
];
