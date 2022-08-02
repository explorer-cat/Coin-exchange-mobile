import './NavigationMenu.css';
import '../../stylesheets/initialization.css'
import '../../stylesheets/palette.css'
import React, { useEffect } from 'react';


//Header 컴포넌트 메게변수 타입을 직접 선언합니다.
interface NavigationProps {
  view : boolean
}

function NavigationMenu({view} : NavigationProps):React.ReactElement {

  //네비게이션 종료 이벤트
  const clickCloseNavigation = (e:Event) => {

  }

  useEffect(() => {
    console.log("NavigationMenu 생성");
    return () => {
      console.log("컴포넌트가 사라졋다")
    }
  })


    return (
      <div className= {view ? "navMenu_content-box navMenu-active" : "navMenu_content-box"}>
      </div>
    );
}

export default NavigationMenu;
