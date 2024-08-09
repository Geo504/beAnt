import { BasicServiceSvg, EducationSvg, EntertainmentSvg, FoodSvg, HealthHeartSvg, HomeCategorySvg, PetSvg, RestaurantSvg, ShoppingBagSvg, TransportationSvg, WorkSvg } from "@/src/components/icons";

const IconClassName = "h-5 w-5 text-muted-foreground";

export const transactionsCategoriesOptions = [
  {
    name: "Basic Service",
    icon: <BasicServiceSvg className={IconClassName} />,
  },
  {
    name: "Education",
    icon: <EducationSvg className={IconClassName} />,
  },
  {
    name: "Entertainment",
    icon: <EntertainmentSvg className={IconClassName} />,
  },
  {
    name: "Food",
    icon: <FoodSvg className={IconClassName} />,
  },
  {
    name: "Healthcare",
    icon: <HealthHeartSvg className={IconClassName} />,
  },
  {
    name: "Home",
    icon: <HomeCategorySvg className={IconClassName} />,
  },
  {
    name: "Pet",
    icon: <PetSvg className={IconClassName} />,
  },
  {
    name: "Restaurant",
    icon: <RestaurantSvg className={IconClassName} />,
  },
  {
    name: "Shopping",
    icon: <ShoppingBagSvg className={IconClassName} />,
  },
  {
    name: "Transportation",
    icon: <TransportationSvg className={IconClassName} />,
  },
  {
    name: "Work",
    icon: <WorkSvg className={IconClassName} />,
  }
]