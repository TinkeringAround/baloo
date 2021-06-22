import React, {FC} from 'react';

// Store
import {useBaloo} from "../store";

// Components
import Section from "./section";
import Base from "./base";

const Temperature: FC = () => {
    const {temperature} = useBaloo();

    return (
        <Section width="47.5%">
            <Base icon="temperature" value={`${temperature}°C`}/>
        </Section>
    );
};

export default Temperature;
