import { useState } from 'react';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay.jsx';
import Header from '../../components/header/Header';
import './home.css';
import AppDownload from '../../components/AppDownload/AppDownload.jsx';


export default function Home() {
  const [category, setCategory] = useState("All");
  return (
    <div>
      <Header />
      <ExploreMenu category = {category} setCategory = {setCategory} />
      <FoodDisplay category = {category} />
      <AppDownload />
          
    </div>
  )
}
