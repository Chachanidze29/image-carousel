import {useState, useRef, useEffect, useCallback} from 'react';
import {flushSync} from 'react-dom';
import './App.css';

export default function CatFriends() {
    const [index, setIndex] = useState(0);
    const selectedRef = useRef(null);

    const handleNextClick = useCallback(()=> {
        flushSync(()=>{
            if (index < catList.length - 1) {
                setIndex(index + 1);
            } else {
                setIndex(0);
            }
        })
        selectedRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'});
    },[index])

    const handlePrevClick = useCallback(()=>{
        flushSync(()=>{
            if (index !== 0) {
                setIndex(index - 1);
            } else {
                setIndex(catList.length-1);
            }
        })
        selectedRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'});
    },[index])

    useEffect(()=>{
        const id = setInterval(handleNextClick,2000);
        return ()=> {
            clearInterval(id);
        }
    },[handleNextClick]);


    return (
        <>
            <h1>Cattos</h1>
            <nav>
                <button className='button left-button' onClick={handlePrevClick}>
                    &#60;
                </button>
                <button className='button right-button' onClick={handleNextClick}>
                    >
                </button>
            </nav>
            <div className='view-port'>
                <div className='container'>
                    {
                        catList.map((cat, i) => (
                            <div className='container-item' ref={index === i ? selectedRef : null} key={cat.id}>
                                <img
                                    className={
                                        index === i ? 'active' : ''
                                    }
                                    src={cat.imageUrl}
                                    alt={'Cat #' + cat.id}
                                />
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}

const catList = [];
for (let i = 0; i < 12; i++) {
    catList.push({
        id: i,
        imageUrl: 'https://placekitten.com/250/200?image=' + i
    });
}

