import gleImg from "../assets/funeral-expense.jpg";
import glaImg from "../assets/glaImg.png";
import edu from "../assets/edu.png";
import goal from "../assets/goal.png";
import introImage from "../assets/introImage.jpg"
import happyfamily from "../assets/happyfamily.png";


const products = [
  {
    title: "Funeral Expense Cover",
    url: "funeral-expense",
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
    title: "Education Insurance Cover",
    url: "education",
    image: edu,
    description:
      "An education insurance cover is a financial plan ensuring funds for a child's education, providing savings and protection against uncertainties like parent's death or disability.",
  },
  {
    title: "Term Life Insurance",
    image: happyfamily,
    description:
      "Term life insurance is a type of life insurance policy that provides coverage for a specified period during  which if the policyholder dies, a death benefit is paid out to the designated beneficiaries.",
  },
  {
    title: "Goal Based Insurance Cover",
    url: "goal-based",
    image: goal,
    description:
      "Goal-based insurance cover tailors financial protection plans to meet specific life objectives, ensuring personalized coverage for short-term, Medium-term and long-term financial goals.",
  },
];

export default products;


