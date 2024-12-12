import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Pokemon = (props) => {
    const [nivel, setNivel] = useState(1);
    const [nombre, setNombre] = useState("");
    const [imagenFrontUrl, setImagenFrontUrl] = useState();
    const [imagenBackUrl, setImagenBackUrl] = useState();
    const [baseHP, setBaseHP] = useState();
    const [baseAttack, setBaseAttack] = useState();
    const [baseDefense, setBaseDefense] = useState();

    const params = useParams();

    const ID = params.id;
    

    function getStat(nombreStat, arrayStats){
        const filteredArray = arrayStats.filter(s => s.stat.name===nombreStat);
        if (filteredArray.lenth==0){
            return -1;
        }
        return filteredArray[0].base_stat;
    }

    // La sintaxis mas modernilla es async-await
    axios.get("https://pokeapi.co/api/v2/pokemon/"+ ID)
    .then(response => {
        setNombre(response.data.name);
        setImagenFrontUrl(response.data.sprites.front_default);
        setImagenBackUrl(response.data.sprites.back_default);
        setBaseHP(getStat("hp",response.data.stats));
        setBaseAttack(getStat("attack",response.data.stats));
        setBaseDefense(getStat("defense",response.data.stats));
    })


    const onSubirNivel = (event) =>{
        setNivel(n => n +1);
    }
    const onBajarNivel = (event) =>{
        setNivel(n => n - 1);
    }
    
    const calcularHP = () => {
        // TO-DO: Use real formula
        // link 
        // This one is made up
        return baseHP + (nivel * 3); 
    }
    

    const calcularAtaque = () => {
        return baseAttack + (nivel * 2);
    }
    const calcularDefensa = () => {
        return baseDefense + (nivel * 2);
    }

    return <div>
        <img src={imagenFrontUrl}/>
        <img src={imagenBackUrl}/>
        <h1>{nombre}</h1>
        <h2>Nivel: {nivel}</h2>
        <button onClick={onSubirNivel}>Subir nivel</button>
        <button onClick={onBajarNivel}>Bajar nivel</button>
        <p>HP: { calcularHP() }</p>
        <p>Ataque:  {calcularAtaque()}</p>
        <p>Defensa: {calcularDefensa()}</p>
    </div>
}

export default Pokemon;