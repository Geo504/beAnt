import { BasicServiceSvg, CircleEmptySvg, EducationSvg, EntertainmentSvg, FoodSvg, HealthHeartSvg, HomeCategorySvg, InvestmentSvg, PetSvg, RestaurantSvg, ShoppingBagSvg, TransportationSvg, WorkSvg } from "@/src/components/icons";

const IconClassName = "h-5 w-5 text-muted-foreground";



export type Category = "Basic Service" | "Education" | "Entertainment" | "Food" | "Healthcare" | "Home" | "Pet" | "Restaurant" | "Shopping" | "Transportation" | "Work" | "Investment" | "Other";

export const categoryIcons: Record<Category, JSX.Element> = {
  "Basic Service": <BasicServiceSvg className={IconClassName} />,
  "Education": <EducationSvg className={IconClassName} />,
  "Entertainment": <EntertainmentSvg className={IconClassName} />,
  "Food": <FoodSvg className={IconClassName} />,
  "Healthcare": <HealthHeartSvg className={IconClassName} />,
  "Home": <HomeCategorySvg className={IconClassName} />,
  "Pet": <PetSvg className={IconClassName} />,
  "Restaurant": <RestaurantSvg className={IconClassName} />,
  "Shopping": <ShoppingBagSvg className={IconClassName} />,
  "Transportation": <TransportationSvg className={IconClassName} />,
  "Work": <WorkSvg className={IconClassName} />,
  "Investment": <InvestmentSvg className={IconClassName} />,
  "Other": <CircleEmptySvg className={IconClassName} />,
};


export const transactionsCategories: Category[] = [
  "Basic Service", "Education", "Entertainment", "Food", "Healthcare", 
  "Home", "Investment", "Pet", "Restaurant", "Shopping", "Transportation", "Work", "Other"
];