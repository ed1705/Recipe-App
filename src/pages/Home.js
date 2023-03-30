import '../css/App.css'
import cooklady from '../images/cooklady.jpg'

export default function Home() {
    return <>
    <div className='container--home'>
        <div className='box--home text--home'>
            <h1>Easy & Smart Recipes</h1>
            <p>Spend less time looking for the recipe you want. Here you will find diversity in recipes. No more repeating the same food every day. So, shall we cook?</p> 
        </div>
         <div classname="bhome image--home"> <img src={cooklady}/> </div>
    </div>
    </>
    

}



