import React from "react";

export const useRequest = () => {
    const [loading, setLoading] = React.useState(false);

    function beforeSubmit() {
        setLoading(true);
    }

    function afterSubmit() {
        setLoading(false);
    }

    return {
        beforeSubmit,
        afterSubmit,
        loading,
    };
};

export default useRequest;