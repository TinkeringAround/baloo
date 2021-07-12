import React, {FC} from 'react';

// Store
import {useBaloo} from "../store";

// Components
import Section from "./section";
import Base from "./base";

const Humidity: FC = () => {
    const {humidity} = useBaloo();

    return (
        <Section width="47.5%">
            <Base icon="humidity" value={`${humidity.toFixed(0)}%`}/>
        </Section>
    );
};

export default Humidity;
