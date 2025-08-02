import { useState, useEffect } from 'react';

const useFetch = (url) => {
    // Data, loading state, aur error ke liye states
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Jab bhi 'url' change hoga, yeh effect dobara chalega
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                // API call
                const response = await fetch(url);

                // Agar response OK nahi hai, to error throw karein
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Response ko JSON mein convert karein
                const result = await response.json();

                // State update karein
                setData(result);

            } catch (err) {
                // Agar koi error ho to error state update karein
                setError(err.message);

            } finally {
                // Loading state ko false karein, chahe success ho ya error
                setIsLoading(false);
            }
        };

        // Function ko call karein
        fetchData();

    }, [url]); // Dependency array: sirf 'url' change hone par re-run karein

    return { data, isLoading, error };
};

export const baseUrl = 'http://localhost:3000';

export default useFetch;