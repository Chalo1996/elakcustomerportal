import gleImg from "../assets/funeral-expense.jpg";
import glaImg from "../assets/glaImg.jpg";
import introImage from "../assets/introImage.jpg";
import happyfamily from "../assets/happyfamily.png";
import groupcreditImg from "../assets/groupcredit.png";

const products = [
  {
    title: "Funeral Expense Cover",
    url: "funeral-expense/select-customer-type",
    image: gleImg,
    description:
      "Funeral expense solution is designed to help families deal with the burden of meeting immediate funeral related expenses on the death of a family member.",
  },
  {
    title: "Critical Illness Cover",
    image: introImage,
    url: "critical-illness",
    description:
      "Critical Illness insurance provides comprehensive coverage for against chronic illnesses such as cancer, ensuring you receive the best healthcare possible.",
  },
  {
    title: "Group Life Insurance",
    url: "group-life-assurance",
    image: glaImg,
    description:
      "We offer group life insurance solutions to provide financial security to your employees' families in the event of an unexpected loss.",
  },
  {
    title: "Travel Insurance",
    image: gleImg,
    description:
      "Travel insurance covers you against unexpected events while traveling, such as trip cancellations, lost luggage, medical emergencies, and more.",
  },
  {
    title: "Term Life Insurance",
    image: happyfamily,
    description:
      "Term life insurance is a type of life insurance policy that provides coverage for a specified period during  which if the policyholder dies, a death benefit is paid out to the designated beneficiaries.",
  },
  {
    title: "Auto Insurance",
    image: gleImg,
    description:
      "Auto insurance provides coverage for damages to your vehicle, medical expenses, and liability in case of an accident, ensuring you stay protected on the road.",
  },
  {
    title: "Group Credit Life Insurance",
    image: groupcreditImg,
    url: "group-credit",
    description:
      "A group credit life insurance policy is issued by an insurance company to a creditor institution, such as a bank, covering the lives of the bank's current and future debtors. Unlike other group life plans, the bank is both the policyholder and the beneficiary of the life insurance.",
  },
];

export default products;
