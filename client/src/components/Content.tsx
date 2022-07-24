import React, {useEffect, useState, useCallback} from 'react';
import Exchange from './exchange/Exchange';
import Issue from './issue/Issue';

interface ContentViewType {
    view : Number
}


function Content({view} : ContentViewType):React.ReactElement {

    const changeValue = (value:any) => {

    }


    return (
          <div className = "content-view">
            {/* 이 컴포넌트들을 슬라이드 형식으로 만들어야되는데... */}
                <Exchange />
                <Issue />
          </div>
    );
}

export default Content;

