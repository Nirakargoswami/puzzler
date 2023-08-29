import React, { useEffect  } from 'react';

const AdsComponent = () => {
 



    useEffect(() => {

        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        }

        catch (e) {

        }

    },[]);



    return (
        <>
             <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-2684572178236927"
        
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
        </>
    );
};

export default AdsComponent;