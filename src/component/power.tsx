import React, {FC} from 'react';

// Store
import {useBaloo} from "../store";

// Components
import Section from "./section";
import Base from "./base";

const Power: FC = () => {
    const {loadCurrent, chargingCurrent, voltage} = useBaloo();
    const power = (chargingCurrent - loadCurrent) * voltage;

    return (
        <Section width="47.5%">
            <Base icon="plug" value={`${power.toFixed(2)}W`}/>
        </Section>
    );
};

export default Power;
