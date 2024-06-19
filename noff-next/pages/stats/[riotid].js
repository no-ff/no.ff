import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import axios from 'axios'
import RiotIdInput from '../components/input/RiotIdInput';
import Account from '../components/Account';
import MatchOuter from '../components/MatchOuter';

const StatsPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        gameName: '',
        tagline: '',
        id: '',
    });
    const [playerData, setPlayerData] = useState({});
    const [matchHistory, setMatchHistory] = useState({});
    const [lockInId, setLockInId] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { value } = e.target;
        const findUntil = '#';
        const index = value.indexOf(findUntil);
        setFormData({
            gameName: index !== -1 ? value.substring(0, index) : '',
            tagline: index !== -1 ? value.substring(index + 1) : '',
            id: value,
        });
    }


    useEffect(() => {
        if (router.isReady) {
            const { riotid } = router.query;
            const findUntil = '#';
            const index = riotid.indexOf(findUntil);

            setFormData({
                gameName: index !== -1 ? riotid.substring(0, index) : '',
                tagline: index !== -1 ? riotid.substring(index + 1) : '',
                id: riotid,
            })
            setLockInId(riotid)
            console.log("request is made")
        }
    }, [router.isReady, router.query]);


    useEffect(() => {
        if (lockInId !== ''){
            handleLoad();
        }
        else{
            console.log("no register yet")
        }
    }, [lockInId])


    const handleSubmit = (e) => {
        setMatchHistory({});
        setPlayerData({});
        e.preventDefault(); // Prevent default form submission
        const encoded = formData.id.replace('#', '%23')
        router.push(`/stats/${encoded}`); // Navigate using the form value
    };


    const handleLoad = () => {
        setIsLoading(true); // Start loading

        console.log("lets count")
        if (formData.gameName === '' || formData.tagline === '') {
            alert('Please enter a valid riot id');
            return;
        }
        axios.post('http://127.0.0.1:8000/DisplayStats/load_player_data/', formData)
            .then(response => {
                const player_data = response.data;
                setPlayerData(player_data);
                const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
                if (!history.includes(formData.id)) {
                    history.push(formData.id);
                }
                localStorage.setItem('searchHistory', JSON.stringify(history));
                axios.post('http://127.0.0.1:8000/DisplayStats/add_new_matches/', formData)
                    .then(response => {
                        const matches = response.data['matches'];
                        setMatchHistory(matches);
                        setIsLoading(false); // Stop loading after data is fetched

                    })
                    .catch(error => {
                        console.error('There was an error submitting the form!', error);
                        setIsLoading(false); // Stop loading after data is fetched

                    });
            })
            .catch(error => {
                console.error('There was an error submitting the form !!', error);
                setIsLoading(false); // Stop loading after data is fetched

            });
    }

    const showMore = () => {
        const inp_data = { length: matchHistory.length, riotID: formData.id }
        axios.post('http://127.0.0.1:8000/DisplayStats/show_more_matches/', inp_data)
            .then(response => {
                const matches = response.data;
                setMatchHistory([...matchHistory, ...matches['matches']]);
            })
            .catch(error => {
                console.error('There was an error submitting the form !!', error);
            });
    }

    return (
        <div style={{ height: '100vh' }}>
            <div className="center" style={{ paddingTop: '20vh' }}>
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <RiotIdInput
                        label={<><span>Riot ID:</span><br /></>}
                        name="riotId"
                        value={formData.id}
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                        whileHover={{
                            backgroundColor: "#b89e33",
                            transition: { duration: 0.2 }
                        }}
                        className="submit mt-4 px-2 py-1"
                    >
                        Submit
                    </button>
                </form>
            </div>
            {isLoading ? (
            <div>Loading...</div> // Show loading indicator
        ) : (
            Object.keys(matchHistory).length !== 0 && Object.keys(playerData).length !== 0 && (
                <div>
                    <Account state={playerData} update={handleLoad}/>
                    <div className='flexbox-outer'>
                        <div className='side-by-side'></div>
                        <div className='account-matches'>
                            {matchHistory.map((item) => {
                                return <MatchOuter match={item} player={lockInId} />
                            })}
                            <button onClick={showMore}>Show More</button>
                        </div>
                        <div className='side-by-side'></div>
                    </div>
                </div>
            )
        )}
        </div>
    )
}

export default StatsPage;
