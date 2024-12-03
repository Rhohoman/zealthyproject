import { Routes, Route } from "react-router-dom";
import { Home, Admin, Data, OnboardingSecond, OnboardingThird } from "../pages";

export const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/onboarding/2" element={<OnboardingSecond />}></Route>
        <Route path="/onboarding/3" element={<OnboardingThird />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/data" element={<Data />}></Route>
        <Route path="*" element={<Home />}></Route>
      </Routes>
    </div>
  );
};
