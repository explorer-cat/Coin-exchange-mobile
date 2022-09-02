import '../../../../stylesheets/initialization.css'
import '../../../../stylesheets/palette.css'
import './DetailContent.css'
import CategoryToggle from './ContentCategoryToggle'
import React, {useEffect, useState, useCallback} from 'react';


function DetailContent(): React.ReactElement {
    const [loading, setLoading] = useState(false)


    return (<>
                <CategoryToggle />
          </>

    );
}


export default DetailContent;

